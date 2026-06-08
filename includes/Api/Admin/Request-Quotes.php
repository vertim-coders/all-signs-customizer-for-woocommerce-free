<?php
namespace ASOWP\Api\Admin;

use WP_Error;
use WP_Query;
use WP_REST_Controller;
use WP_REST_Request;
use WP_REST_Response;

class ASOWP_Api_Request_Quotes extends WP_REST_Controller
{
    public function __construct()
    {
        $this->namespace = 'asowp/v1';
        $this->rest_base = 'request-quotes';
    }

    public function register_routes()
    {
        register_rest_route(
            $this->namespace,
            '/' . $this->rest_base,
            array(
                array(
                    'methods' => \WP_REST_Server::READABLE,
                    'callback' => array($this, 'get_request_quotes'),
                    'permission_callback' => array($this, 'admin_permissions_check'),
                ),
                array(
                    'methods' => \WP_REST_Server::CREATABLE,
                    'callback' => array($this, 'create_request_quote'),
                    'permission_callback' => '__return_true',
                ),
            )
        );

        register_rest_route(
            $this->namespace,
            '/' . $this->rest_base . '/(?P<quote_id>\d+)',
            array(
                array(
                    'methods' => \WP_REST_Server::READABLE,
                    'callback' => array($this, 'get_request_quote'),
                    'permission_callback' => array($this, 'admin_permissions_check'),
                ),
                array(
                    'methods' => \WP_REST_Server::EDITABLE,
                    'callback' => array($this, 'update_request_quote'),
                    'permission_callback' => array($this, 'admin_permissions_check'),
                ),
                array(
                    'methods' => \WP_REST_Server::DELETABLE,
                    'callback' => array($this, 'delete_request_quote'),
                    'permission_callback' => array($this, 'admin_permissions_check'),
                ),
            )
        );

        register_rest_route(
            $this->namespace,
            '/' . $this->rest_base . '/(?P<quote_id>\d+)/download/(?P<file_index>\d+)',
            array(
                array(
                    'methods' => \WP_REST_Server::READABLE,
                    'callback' => array($this, 'download_quote_file'),
                    'permission_callback' => array($this, 'admin_permissions_check'),
                ),
            )
        );
    }

    public function admin_permissions_check($request)
    {
        return current_user_can('manage_options');
    }

    public function get_request_quotes($request)
    {
        $query = new WP_Query(array(
            'post_type' => 'asowp-request-quote',
            'post_status' => array('publish', 'private'),
            'posts_per_page' => 100,
            'orderby' => 'date',
            'order' => 'DESC',
            'no_found_rows' => true,
        ));

        $quotes = array();
        foreach ($query->posts as $post) {
            $quotes[] = $this->format_quote((int) $post->ID);
        }

        return rest_ensure_response(array(
            'quotes' => array_values(array_filter($quotes)),
            'totalCount' => count($quotes),
        ));
    }

    public function get_request_quote($request)
    {
        $quote_id = absint($request['quote_id']);
        $quote = $this->format_quote($quote_id);

        if (!$quote) {
            return new WP_Error('asowp_quote_not_found', __('Quote not found', 'all-signs-options-pro'), array('status' => 404));
        }

        return rest_ensure_response($quote);
    }

    public function create_request_quote(WP_REST_Request $request)
    {
        $payload = $this->normalize_request_payload($request);
        $post_id = wp_insert_post(array(
            'post_type' => 'asowp-request-quote',
            'post_status' => 'private',
            'post_title' => $this->build_quote_title($payload),
        ), true);

        if (is_wp_error($post_id)) {
            return $post_id;
        }

        $payload['id'] = (string) $post_id;
        $payload['createdAt'] = current_time('c');
        $payload['files'] = $this->store_uploaded_files($request, (int) $post_id, $payload['files']);

        update_post_meta((int) $post_id, 'asowp-request-quote-payload', $payload);

        return rest_ensure_response(array(
            'success' => true,
            'id' => (int) $post_id,
            'message' => __('Quote request saved', 'all-signs-options-pro'),
            'recap' => $payload['recaps'],
        ));
    }

    public function update_request_quote($request)
    {
        $quote_id = absint($request['quote_id']);
        $payload = $this->get_quote_payload($quote_id);

        if (!$payload) {
            return new WP_Error('asowp_quote_not_found', __('Quote not found', 'all-signs-options-pro'), array('status' => 404));
        }

        $params = $request->get_json_params();
        if (!is_array($params)) {
            $params = $request->get_params();
        }

        $status = isset($params['status']) ? sanitize_text_field((string) $params['status']) : '';
        $intent = isset($params['intent']) ? sanitize_text_field((string) $params['intent']) : '';

        if ($intent === 'mark-notified') {
            $status = 'notified';
        }

        if ($status === '') {
            return new WP_Error('asowp_quote_missing_status', __('Missing quote status', 'all-signs-options-pro'), array('status' => 400));
        }

        $payload['status'] = $status;
        if ($status === 'notified') {
            $payload['notifiedAt'] = current_time('c');
        }

        update_post_meta($quote_id, 'asowp-request-quote-payload', $payload);

        return rest_ensure_response(array(
            'success' => true,
            'quote' => $this->format_quote($quote_id),
        ));
    }

    public function delete_request_quote($request)
    {
        $quote_id = absint($request['quote_id']);
        if (!$this->is_valid_quote($quote_id)) {
            return new WP_Error('asowp_quote_not_found', __('Quote not found', 'all-signs-options-pro'), array('status' => 404));
        }

        $deleted = wp_delete_post($quote_id, true);
        return rest_ensure_response(array('success' => (bool) $deleted));
    }

    public function download_quote_file($request)
    {
        $quote_id = absint($request['quote_id']);
        $file_index = absint($request['file_index']);
        $payload = $this->get_quote_payload($quote_id);

        if (!$payload || empty($payload['files'][$file_index]) || !is_array($payload['files'][$file_index])) {
            return new WP_Error('asowp_quote_file_not_found', __('Quote file not found', 'all-signs-options-pro'), array('status' => 404));
        }

        $file = $payload['files'][$file_index];
        $path = isset($file['path']) ? wp_normalize_path((string) $file['path']) : '';
        $uploads = wp_get_upload_dir();
        $base_dir = wp_normalize_path($uploads['basedir']);

        if ($path === '' || !file_exists($path) || strpos($path, $base_dir) !== 0) {
            return new WP_Error('asowp_quote_file_not_found', __('Quote file not found', 'all-signs-options-pro'), array('status' => 404));
        }

        $name = isset($file['name']) ? sanitize_file_name((string) $file['name']) : basename($path);
        $type = isset($file['type']) && $file['type'] !== '' ? (string) $file['type'] : 'application/octet-stream';

        nocache_headers();
        header('Content-Type: ' . $type);
        header('Content-Disposition: attachment; filename="' . $name . '"');
        header('Content-Length: ' . filesize($path));
        readfile($path); // phpcs:ignore WordPress.WP.AlternativeFunctions.file_system_read_readfile
        exit;
    }

    private function normalize_request_payload(WP_REST_Request $request): array
    {
        $content_type = isset($_SERVER['CONTENT_TYPE']) ? sanitize_text_field((string) $_SERVER['CONTENT_TYPE']) : '';
        $json = $request->get_json_params();
        $params = is_array($json) ? $json : $request->get_params();

        if (!is_array($params)) {
            $params = array();
        }

        $fields = $this->normalize_fields($params);
        $customer_source = isset($params['customer']) && is_array($params['customer']) ? $params['customer'] : array();
        $customer = array(
            'firstName' => $this->clean_string($params['firstName'] ?? $fields['firstName'] ?? $customer_source['firstName'] ?? ''),
            'lastName' => $this->clean_string($params['lastName'] ?? $fields['lastName'] ?? $customer_source['lastName'] ?? ''),
            'email' => sanitize_email((string) ($params['email'] ?? $fields['email'] ?? $customer_source['email'] ?? '')),
            'phone' => $this->clean_string($params['phone'] ?? $fields['phone'] ?? $customer_source['phone'] ?? ''),
            'message' => sanitize_textarea_field((string) ($params['message'] ?? $fields['message'] ?? $customer_source['message'] ?? '')),
        );

        return array(
            'id' => '',
            'createdAt' => current_time('c'),
            'customer' => $customer,
            'fields' => $fields,
            'files' => isset($params['files']) && is_array($params['files']) ? $params['files'] : array(),
            'recaps' => $this->pick_object($params['recaps'] ?? $fields['recaps'] ?? $params['option']['recaps'] ?? $params['cartData']['recaps'] ?? $params['configuration']['recaps'] ?? null),
            'productType' => $this->clean_string($params['productType'] ?? $fields['productType'] ?? ''),
            'configId' => $this->clean_string($params['configId'] ?? $fields['configId'] ?? ''),
            'previewImg' => esc_url_raw((string) ($params['previewImg'] ?? $fields['previewImg'] ?? '')),
            'svgData' => (string) ($params['svgData'] ?? $fields['svgData'] ?? ''),
            'dxfData' => (string) ($params['dxfData'] ?? $fields['dxfData'] ?? ''),
            'productionFilesFormat' => $this->clean_string($params['productionFilesFormat'] ?? $fields['productionFilesFormat'] ?? ''),
            'productionFiles' => isset($params['productionFiles']) && is_array($params['productionFiles']) ? $params['productionFiles'] : array(),
            'status' => $this->clean_string($params['status'] ?? $fields['status'] ?? 'pending'),
            'notifiedAt' => '',
            'source' => array(
                'contentType' => $content_type,
            ),
        );
    }

    private function normalize_fields(array $params): array
    {
        $fields = isset($params['fields']) && is_array($params['fields']) ? $params['fields'] : array();
        $reserved = array_flip(array(
            'fields',
            'files',
            'customer',
            'recaps',
            'option',
            'cartData',
            'configuration',
            'data',
            'productType',
            'configId',
            'previewImg',
            'svgData',
            'dxfData',
            'productionFilesFormat',
            'productionFiles',
            'status',
            'source',
        ));

        foreach ($params as $key => $value) {
            if (isset($reserved[$key]) || array_key_exists($key, $fields)) {
                continue;
            }
            $fields[$key] = is_scalar($value) ? sanitize_text_field((string) $value) : $value;
        }

        return $fields;
    }

    private function store_uploaded_files(WP_REST_Request $request, int $quote_id, array $existing_files): array
    {
        $files = array();
        foreach ($existing_files as $file) {
            if (is_array($file) && !empty($file['name'])) {
                $files[] = array(
                    'field' => $this->clean_string($file['field'] ?? ''),
                    'name' => sanitize_file_name((string) $file['name']),
                    'type' => $this->clean_string($file['type'] ?? ''),
                    'size' => absint($file['size'] ?? 0),
                    'path' => $this->clean_string($file['path'] ?? ''),
                    'url' => esc_url_raw((string) ($file['url'] ?? '')),
                );
            }
        }

        $uploaded_files = $request->get_file_params();
        if (empty($uploaded_files)) {
            return $files;
        }

        require_once ABSPATH . 'wp-admin/includes/file.php';

        foreach ($uploaded_files as $field => $file) {
            $normalized = $this->normalize_file_array($file);
            foreach ($normalized as $item) {
                if (empty($item['tmp_name']) || !is_uploaded_file($item['tmp_name'])) {
                    continue;
                }

                $upload = wp_handle_upload($item, array('test_form' => false));
                if (!is_array($upload) || isset($upload['error'])) {
                    continue;
                }

                $files[] = array(
                    'field' => sanitize_key((string) $field),
                    'name' => sanitize_file_name((string) $item['name']),
                    'type' => sanitize_text_field((string) ($upload['type'] ?? $item['type'] ?? '')),
                    'size' => absint(filesize($upload['file'])),
                    'path' => wp_normalize_path((string) $upload['file']),
                    'url' => esc_url_raw((string) $upload['url']),
                );
            }
        }

        return $files;
    }

    private function normalize_file_array(array $file): array
    {
        if (!isset($file['name']) || !is_array($file['name'])) {
            return array($file);
        }

        $files = array();
        foreach ($file['name'] as $index => $name) {
            $files[] = array(
                'name' => $name,
                'type' => $file['type'][$index] ?? '',
                'tmp_name' => $file['tmp_name'][$index] ?? '',
                'error' => $file['error'][$index] ?? 0,
                'size' => $file['size'][$index] ?? 0,
            );
        }
        return $files;
    }

    private function build_quote_title(array $payload): string
    {
        $customer = $payload['customer'];
        $name = trim(($customer['firstName'] ?? '') . ' ' . ($customer['lastName'] ?? ''));
        if ($name === '') {
            $name = $customer['email'] ?? '';
        }
        if ($name === '') {
            $name = __('Anonymous customer', 'all-signs-options-pro');
        }

        return sprintf(__('Request quote - %s', 'all-signs-options-pro'), $name);
    }

    private function format_quote(int $quote_id)
    {
        if (!$this->is_valid_quote($quote_id)) {
            return null;
        }

        $payload = $this->get_quote_payload($quote_id);
        if (!$payload) {
            return null;
        }

        $post = get_post($quote_id);
        $payload['id'] = (string) $quote_id;
        $payload['createdAt'] = $payload['createdAt'] ?? get_post_time('c', true, $post);
        $payload['date'] = mysql2date(get_option('date_format') . ' ' . get_option('time_format'), $post->post_date);
        $payload['downloadBaseUrl'] = rest_url($this->namespace . '/' . $this->rest_base . '/' . $quote_id . '/download/');

        return $payload;
    }

    private function get_quote_payload(int $quote_id)
    {
        if (!$this->is_valid_quote($quote_id)) {
            return null;
        }

        $payload = get_post_meta($quote_id, 'asowp-request-quote-payload', true);
        return is_array($payload) ? $payload : null;
    }

    private function is_valid_quote(int $quote_id): bool
    {
        if (!$quote_id) {
            return false;
        }
        $post = get_post($quote_id);
        return $post && $post->post_type === 'asowp-request-quote';
    }

    private function pick_object($value)
    {
        return is_array($value) ? $value : null;
    }

    private function clean_string($value): string
    {
        return sanitize_text_field((string) $value);
    }
}
