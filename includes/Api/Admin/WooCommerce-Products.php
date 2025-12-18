<?php
namespace ASOWP\Api\Admin;

use WP_Error;
use WP_Query;
use WP_REST_Controller;

/**
 * REST API: WooCommerce products helpers.
 */
class ASOWP_Api_WooCommerce_Products extends WP_REST_Controller
{

    public function __construct()
    {
        $this->namespace = 'asowp/v1';
        $this->rest_base = 'woocommerce-products';
    }

    public function register_routes()
    {
        register_rest_route(
            $this->namespace,
            '/' . $this->rest_base . '/unassigned',
            array(
                array(
                    'methods' => \WP_REST_Server::READABLE,
                    'callback' => array($this, 'get_unassigned_products'),
                    'permission_callback' => array($this, 'permissions_check'),
                    'args' => array(
                        'search' => array(
                            'type' => 'string',
                            'required' => false,
                        ),
                        'include_variations' => array(
                            'type' => 'boolean',
                            'required' => false,
                            'default' => true,
                        ),
                        'page' => array(
                            'type' => 'integer',
                            'required' => false,
                            'default' => 1,
                        ),
                        'per_page' => array(
                            'type' => 'integer',
                            'required' => false,
                            'default' => 50,
                        ),
                        'config_id' => array(
                            'type' => 'integer',
                            'required' => false,
                        ),
                    ),
                ),
            )
        );
    }

    public function permissions_check($request)
    {
        return true;
    }

    private function is_valid_config_id(int $config_id): bool
    {
        if (!$config_id) {
            return false;
        }
        $post = get_post($config_id);
        if (!$post) {
            return false;
        }
        if ($post->post_type !== 'asowp-configs') {
            return false;
        }
        if ($post->post_status !== 'publish') {
            return false;
        }
        return true;
    }

    private function cleanup_invalid_assignment(int $product_id, int $config_id): void
    {
        if (!$config_id) {
            return;
        }
        if ($this->is_valid_config_id($config_id)) {
            return;
        }

        $meta_key = 'product-asowp-metas';
        $meta = get_post_meta($product_id, $meta_key, true);
        if (!is_array($meta)) {
            return;
        }
        if (!isset($meta[$product_id]) || !is_array($meta[$product_id])) {
            return;
        }
        if (!isset($meta[$product_id]['config-id'])) {
            return;
        }
        if (absint($meta[$product_id]['config-id']) !== $config_id) {
            return;
        }

        $meta[$product_id]['config-id'] = 0;
        update_post_meta($product_id, $meta_key, $meta);
    }

    private function get_assigned_config_id(int $product_id): int
    {
        $meta = get_post_meta($product_id, 'product-asowp-metas', true);
        if (!is_array($meta)) {
            return 0;
        }
        if (!isset($meta[$product_id]) || !is_array($meta[$product_id])) {
            return 0;
        }
        if (!isset($meta[$product_id]['config-id'])) {
            return 0;
        }

        $config_id = absint($meta[$product_id]['config-id']);
        if (!$config_id) {
            return 0;
        }

        if (!$this->is_valid_config_id($config_id)) {
            $this->cleanup_invalid_assignment($product_id, $config_id);
            return 0;
        }

        return $config_id;
    }

    private function format_product(int $product_id): array
    {
        $product = function_exists('wc_get_product') ? wc_get_product($product_id) : null;
        $title = $product ? $product->get_formatted_name() : get_the_title($product_id);
        $type = $product ? $product->get_type() : get_post_type($product_id);
        $parent_id = $product ? absint($product->get_parent_id()) : absint(wp_get_post_parent_id($product_id));
        $sku = $product ? $product->get_sku() : '';

        return array(
            'id' => $product_id,
            'title' => $title,
            'type' => $type,
            'parent_id' => $parent_id,
            'sku' => $sku,
        );
    }

    public function get_unassigned_products($request)
    {
        if (!function_exists('wc_get_product')) {
            return new WP_Error(
                'asowp_woocommerce_missing',
                __('WooCommerce is required to list products.', 'all-signs-options-pro'),
                array('status' => 400)
            );
        }

        $include_variations = (bool) $request->get_param('include_variations');
        $page = max(1, absint($request->get_param('page')));
        $per_page = max(1, min(200, absint($request->get_param('per_page'))));
        $search = sanitize_text_field((string) $request->get_param('search'));
        $config_id = absint($request->get_param('config_id'));

        $post_types = array('product');
        if ($include_variations) {
            $post_types[] = 'product_variation';
        }

        $query_args = array(
            'post_type' => $post_types,
            'post_status' => array('publish', 'private'),
            'posts_per_page' => -1,
            'fields' => 'ids',
            'orderby' => 'ID',
            'order' => 'DESC',
        );
        if (!empty($search)) {
            $query_args['s'] = $search;
        }

        $query = new WP_Query($query_args);
        $ids = array_map('absint', $query->posts);

        $result_ids = array();
        foreach ($ids as $product_id) {
            $assigned = $this->get_assigned_config_id($product_id);

            if ($assigned === 0) {
                $result_ids[] = $product_id;
                continue;
            }

            if ($config_id && $assigned === $config_id) {
                $result_ids[] = $product_id;
            }
        }

        $total = count($result_ids);
        $total_pages = (int) ceil($total / $per_page);
        $offset = ($page - 1) * $per_page;
        $paged_ids = array_slice($result_ids, $offset, $per_page);

        $data = array();
        foreach ($paged_ids as $product_id) {
            $item = $this->format_product($product_id);
            $item['assigned_config_id'] = $this->get_assigned_config_id($product_id);
            $data[] = $item;
        }

        return rest_ensure_response(
            array(
                'total' => $total,
                'totalPages' => $total_pages,
                'data' => $data,
            )
        );
    }
}
