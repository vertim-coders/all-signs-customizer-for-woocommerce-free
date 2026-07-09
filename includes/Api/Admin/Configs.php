<?php
namespace ASCWO\Api\Admin;

use WP_Error;
use WP_Post;
use WP_Query;
use WP_REST_Controller;

/**
 * REST API handler for configurations.
 */
class ASCWO_Api_Configs extends WP_REST_Controller
{
    /**
     * Get a config post by ID.
     *
     * @param int $config_id Config post ID.
     * @return WP_Post|false
     */
    private function get_config_post_by_id($config_id)
    {
        $config_id = (int) $config_id;
        if (0 === $config_id) {
            return false;
        }

        $post = get_post($config_id);
        return $post instanceof WP_Post ? $post : false;
    }

    /**
     * Get the request body as an array.
     *
     * @param \WP_REST_Request $request Request object.
     * @return array
     */
    private function get_request_data($request)
    {
        $data = $request->get_json_params();
        return is_array($data) ? $data : array();
    }

    private function get_config_count(): int
    {
        $query = new WP_Query(array(
            'post_type' => 'ascwo-configs',
            'post_status' => 'publish',
            'posts_per_page' => 1,
            'fields' => 'ids',
            'no_found_rows' => false,
        ));

        return (int) $query->found_posts;
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
        if ($post->post_type !== 'ascwo-configs') {
            return false;
        }
        if ($post->post_status !== 'publish') {
            return false;
        }
        return true;
    }

    private function normalize_global_asset_url($url): string
    {
        $url = is_string($url) ? trim($url) : '';
        if ($url === '' || strpos($url, 'data:') === 0 || strpos($url, 'blob:') === 0) {
            return $url;
        }

        foreach (array('/assets/images/', '/assets/icons/', 'assets/images/', 'assets/icons/') as $marker) {
            $position = strpos($url, $marker);
            if ($position !== false) {
                $asset_path = substr($url, $position);
                $asset_path = ltrim($asset_path, '/');
                $asset_path = preg_replace('#^assets/#', '', $asset_path);
                return trailingslashit(ASCWO_ASSETS) . $asset_path;
            }
        }

        if (preg_match('#^https?://#i', $url)) {
            return $url;
        }

        return trailingslashit(ASCWO_ASSETS) . ltrim($url, '/');
    }

    private function get_normalized_global_icon_items(string $option_name): array
    {
        $items = get_option($option_name, array());
        if (!is_array($items)) {
            return array();
        }

        $changed = false;
        foreach ($items as $index => $item) {
            if (!is_array($item)) {
                continue;
            }

            if (isset($item['icon'])) {
                $normalized_icon = $this->normalize_global_asset_url($item['icon']);
                if ($normalized_icon !== $item['icon']) {
                    $items[$index]['icon'] = $normalized_icon;
                    $changed = true;
                }
            }

            if (isset($item['url'])) {
                $normalized_url = $this->normalize_global_asset_url($item['url']);
                if ($normalized_url !== $item['url']) {
                    $items[$index]['url'] = $normalized_url;
                    $changed = true;
                }
            }

            $prefix = null;
            if ($option_name === 'ascwo_all_shapes') {
                $prefix = 'shape';
            } elseif ($option_name === 'ascwo_all_borders') {
                $prefix = 'border';
            }

            if ($prefix !== null && (!isset($items[$index]['id']) || $items[$index]['id'] === '')) {
                $label = isset($item['label']) ? (string) $item['label'] : '';
                $name = isset($item['name']) ? (string) $item['name'] : '';
                $value = isset($item['value']) ? (string) $item['value'] : '';
                $items[$index]['id'] = $prefix . '-' . sanitize_title($label ?: $name ?: $value ?: ('item-' . ($index + 1)));
                $changed = true;
            }
        }

        if ($changed) {
            update_option($option_name, $items);
        }

        return $items;
    }

    private function sanitize_config_data($value)
    {
        if (is_array($value)) {
            $clean = array();
            foreach ($value as $key => $item) {
                $clean[$key] = $this->sanitize_config_data($item);
            }
            return $clean;
        }
        return $value;
    }

    private function sanitize_material_type($value): string
    {
        $value = sanitize_text_field((string) $value);
        $allowed = array('simple');
        if (in_array($value, $allowed, true)) {
            return $value;
        }
        return 'simple';
    }

    private function get_managed_fixing_methods(): array
    {
        $methods = get_option("ascwo_all_fixingMethods", []);
        if (!is_array($methods)) {
            return array();
        }

        $normalized = array();
        foreach (array_values($methods) as $method) {
            if (!is_array($method)) {
                continue;
            }
            if (!isset($method['id']) || $method['id'] === '') {
                $slug = !empty($method['type']) ? sanitize_title((string) $method['type']) : sanitize_title((string) ($method['name'] ?? 'fixing-method'));
                $method['id'] = strpos($slug, 'fixing-') === 0 ? $slug : 'fixing-' . $slug;
            }
            if (isset($method['icon'])) {
                $method['icon'] = $this->normalize_global_asset_url($method['icon']);
            }
            if (isset($method['url'])) {
                $method['url'] = $this->normalize_global_asset_url($method['url']);
            }
            $normalized[] = $method;
        }

        return $normalized;
    }

    private function normalize_lookup_key($value): string
    {
        return sanitize_title((string) $value);
    }

    private function build_managed_lookup(array $items): array
    {
        $lookup = array();
        foreach ($items as $index => $item) {
            if (!is_array($item)) {
                continue;
            }
            $keys = array(
                $item['id'] ?? '',
                $item['value'] ?? '',
                $item['type'] ?? '',
                $item['name'] ?? '',
                $item['label'] ?? '',
                (string) $index,
            );
            foreach ($keys as $key) {
                $key = $this->normalize_lookup_key($key);
                if ($key !== '') {
                    $lookup[$key] = $item;
                }
            }
        }
        return $lookup;
    }

    private function find_managed_item(array $lookup, array $item, array $keys)
    {
        foreach ($keys as $key) {
            if (!isset($item[$key])) {
                continue;
            }
            $lookup_key = $this->normalize_lookup_key($item[$key]);
            if ($lookup_key !== '' && isset($lookup[$lookup_key])) {
                return $lookup[$lookup_key];
            }
        }
        return null;
    }

    private function enrich_component_option_items(array $frontend_data, array $all_fixing_methods, array $all_borders): array
    {
        if (!isset($frontend_data['requiredOptions']['components']['items']) || !is_array($frontend_data['requiredOptions']['components']['items'])) {
            return $frontend_data;
        }

        $fixing_lookup = $this->build_managed_lookup($all_fixing_methods);
        $border_lookup = $this->build_managed_lookup($all_borders);

        foreach ($frontend_data['requiredOptions']['components']['items'] as $component_index => $component) {
            if (is_array($component)) {
                $component_preview = (string) ($component['image'] ?? $component['previewImg'] ?? $component['icon'] ?? '');
                if ($component_preview !== '') {
                    $frontend_data['requiredOptions']['components']['items'][$component_index]['image'] = (string) ($component['image'] ?? $component_preview);
                    $frontend_data['requiredOptions']['components']['items'][$component_index]['previewImg'] = (string) ($component['previewImg'] ?? $component_preview);
                    $frontend_data['requiredOptions']['components']['items'][$component_index]['icon'] = (string) ($component['icon'] ?? $component_preview);
                }
            }

            if (!isset($component['options']) || !is_array($component['options'])) {
                continue;
            }

            foreach ($component['options'] as $option_index => $option) {
                if (is_array($option)) {
                    $option_preview = (string) ($option['image'] ?? $option['previewImg'] ?? $option['icon'] ?? '');
                    if ($option_preview !== '') {
                        $frontend_data['requiredOptions']['components']['items'][$component_index]['options'][$option_index]['image'] = (string) ($option['image'] ?? $option_preview);
                        $frontend_data['requiredOptions']['components']['items'][$component_index]['options'][$option_index]['previewImg'] = (string) ($option['previewImg'] ?? $option_preview);
                        $frontend_data['requiredOptions']['components']['items'][$component_index]['options'][$option_index]['icon'] = (string) ($option['icon'] ?? $option_preview);
                    }

                    if (isset($option['fixingMethods']) && is_array($option['fixingMethods']) && !isset($option['fixingMethods']['items'])) {
                        $option['fixingMethods'] = array('items' => array_values($option['fixingMethods']));
                        $frontend_data['requiredOptions']['components']['items'][$component_index]['options'][$option_index]['fixingMethods'] = $option['fixingMethods'];
                    }
                }

                if (isset($option['fixingMethods']['items']) && is_array($option['fixingMethods']['items'])) {
                    foreach ($option['fixingMethods']['items'] as $item_index => $item) {
                        if (!is_array($item)) {
                            continue;
                        }
                        $managed = $this->find_managed_item($fixing_lookup, $item, array('fixingMethodId', 'id', 'value', 'type', 'label', 'name'));
                        if (is_array($managed)) {
                            $managed_preview = (string) ($managed['icon'] ?? $managed['previewImg'] ?? $managed['url'] ?? $managed['image'] ?? '');
                            $item['fixingMethodId'] = (string) ($managed['id'] ?? $item['fixingMethodId'] ?? $item['id'] ?? '');
                            $item['label'] = !empty($item['label']) ? (string) $item['label'] : (string) ($managed['name'] ?? $managed['label'] ?? '');
                            $item['name'] = !empty($item['name']) ? (string) $item['name'] : (string) ($managed['name'] ?? $managed['label'] ?? '');
                            $item['description'] = !empty($item['description']) ? (string) $item['description'] : (string) ($managed['description'] ?? '');
                            $item['type'] = (string) ($managed['type'] ?? $item['type'] ?? $managed['value'] ?? '');
                            $item['icon'] = $managed_preview !== '' ? $managed_preview : (string) ($item['icon'] ?? $item['previewImg'] ?? $item['url'] ?? '');
                            $item['previewImg'] = $item['icon'];
                            $item['url'] = $item['icon'];
                            $item['fixing'] = $managed;
                        }
                        $frontend_data['requiredOptions']['components']['items'][$component_index]['options'][$option_index]['fixingMethods']['items'][$item_index] = $item;
                    }
                }

                if (isset($option['borders']['items']) && is_array($option['borders']['items'])) {
                    foreach ($option['borders']['items'] as $item_index => $item) {
                        if (!is_array($item)) {
                            continue;
                        }
                        $managed = $this->find_managed_item($border_lookup, $item, array('borderId', 'id', 'value', 'type', 'label', 'name'));
                        if (is_array($managed)) {
                            $managed_preview = (string) ($managed['icon'] ?? $managed['previewImg'] ?? $managed['url'] ?? $managed['image'] ?? '');
                            $item['borderId'] = (string) ($managed['id'] ?? $item['borderId'] ?? $item['id'] ?? '');
                            $item['value'] = (string) ($managed['value'] ?? $item['value'] ?? $managed['id'] ?? '');
                            $item['icon'] = $managed_preview !== '' ? $managed_preview : (string) ($item['icon'] ?? $item['previewImg'] ?? $item['url'] ?? '');
                            $item['previewImg'] = $item['icon'];
                            $item['url'] = $item['icon'];
                            $item['border'] = $managed;
                        }
                        $frontend_data['requiredOptions']['components']['items'][$component_index]['options'][$option_index]['borders']['items'][$item_index] = $item;
                    }
                }
            }
        }

        return $frontend_data;
    }

    private function pick_config_payload_section(array $params, array $data_payload, string $key, $default = array())
    {
        if (isset($params[$key]) && $params[$key] !== array()) {
            return $params[$key];
        }
        if (isset($data_payload[$key]) && $data_payload[$key] !== array()) {
            return $data_payload[$key];
        }
        return $default;
    }

    private function get_product_assigned_config_id(int $product_id): int
    {
        $meta = get_post_meta($product_id, 'product-ascwo-metas', true);
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
            $this->clear_product_config_id($product_id, $config_id);
            return 0;
        }

        return $config_id;
    }

    private function set_product_config_id(int $product_id, int $config_id): void
    {
        $meta_key = 'product-ascwo-metas';
        $meta = get_post_meta($product_id, $meta_key, true);
        if (!is_array($meta)) {
            $meta = array();
        }
        if (!isset($meta[$product_id]) || !is_array($meta[$product_id])) {
            $meta[$product_id] = array();
        }
        $meta[$product_id]['config-id'] = $config_id;
        update_post_meta($product_id, $meta_key, $meta);
    }

    private function clear_product_config_id(int $product_id, int $config_id): void
    {
        $meta_key = 'product-ascwo-metas';
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

        // Keep the meta structure but mark as "no config" explicitly.
        $meta[$product_id]['config-id'] = 0;
        update_post_meta($product_id, $meta_key, $meta);
    }

    private function get_products_assigned_to_config(int $config_id): array
    {
        $args = array(
            'post_type' => array('product', 'product_variation'),
            'post_status' => array('publish', 'private'),
            'posts_per_page' => -1,
            'fields' => 'ids',
            'meta_query' => array(
                array(
                    'key' => 'product-ascwo-metas',
                    'compare' => 'EXISTS',
                ),
            ),
        );
        $query = new WP_Query($args);
        $ids = array_map('absint', $query->posts);

        $assigned = array();
        foreach ($ids as $product_id) {
            if ($this->get_product_assigned_config_id($product_id) === $config_id) {
                $assigned[] = $product_id;
            }
        }
        return $assigned;
    }

    private function sync_config_products(int $config_id, array $product_ids): array
    {
        $product_ids = array_values(array_unique(array_filter(array_map('absint', $product_ids))));

        $conflicts = array();
        foreach ($product_ids as $product_id) {
            $assigned = $this->get_product_assigned_config_id($product_id);
            if ($assigned && $assigned !== $config_id) {
                $conflicts[] = $product_id;
            }
        }
        if (!empty($conflicts)) {
            return $conflicts;
        }

        $currently_assigned = $this->get_products_assigned_to_config($config_id);
        $to_detach = array_diff($currently_assigned, $product_ids);
        foreach ($to_detach as $product_id) {
            $this->clear_product_config_id((int) $product_id, $config_id);
        }

        foreach ($product_ids as $product_id) {
            $this->set_product_config_id($product_id, $config_id);
        }

        return array();
    }

    /**
     * [__construct description]
     */
    public function __construct()
    {
        $this->namespace = 'ascwo/v1';
        $this->rest_base = 'configs';
    }


    /**
     * Register the routes
     *
     * @return void
     */
    public function register_routes()
    {
        register_rest_route(
            $this->namespace,
            '/' . $this->rest_base,
            array(
                array(
                    'methods' => \WP_REST_Server::READABLE,
                    'callback' => array($this, 'get_configs'),
                    'permission_callback' => array($this, 'get_config_permissions_check')
                ),
                array(
                    'methods' => \WP_REST_Server::CREATABLE,
                    'callback' => array($this, 'create_config_post'),
                    'permission_callback' => array($this, 'get_config_permissions_check'),
                ),
            )
        );
        register_rest_route(
            $this->namespace,
            '/' . $this->rest_base . "/(?P<config_id>\d+)/preview",
            array(
                array(
                    'methods' => \WP_REST_Server::READABLE,
                    'callback' => array($this, 'get_preview_config_data'),
                    'permission_callback' => '__return_true',
                    'args' => array(
                        'config_id' => array(
                            'type' => 'integer',
                            'required' => true,
                        )
                    ),
                ),
            )
        );
        register_rest_route(
            $this->namespace,
            '/' . $this->rest_base . "/(?P<config_id>\d+)",
            array(
                array(
                    'methods' => \WP_REST_Server::READABLE,
                    'callback' => array($this, 'get_config_post'),
                    'permission_callback' => '__return_true',
                    'args' => array(
                        'config_id' => array(
                            'type' => 'integer',
                            'required' => true,
                        )
                    ),
                ),
                array(
                    'methods' => \WP_REST_Server::EDITABLE,
                    'callback' => array($this, 'update_config_post'),
                    'permission_callback' => array($this, 'get_config_permissions_check'),
                    'args' => array(
                        'config_id' => array(
                            'type' => 'integer',
                            'required' => true,
                        )
                    ),
                ),
                array(
                    'methods' => \WP_REST_Server::DELETABLE,
                    'callback' => array($this, 'delete_config'),
                    'permission_callback' => array($this, 'get_config_permissions_check'),
                    'args' => array(
                        'config_id' => array(
                            'type' => 'integer',
                            'required' => true,
                        )
                    ),
                )
            )
        );
    }



    /**
     * Create ASo product configuration
     * @param \WP_REST_Request $request Full details about the request.
     *
     * @return \WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function create_config_post($request)
    {
        if ($this->get_config_count() >= 1) {
            return rest_ensure_response(array(
                'success' => false,
                'message' => __('Only one configuration is allowed in the free version.', 'all-signs-customizer-for-woocommerce'),
            ));
        }

        $params = $this->get_request_data($request);
        $product_ids = array();
        if (isset($params['product_ids']) && is_array($params['product_ids'])) {
            $product_ids = $params['product_ids'];
        }
        $data_payload = isset($params["data"]) && is_array($params["data"]) ? $this->sanitize_config_data($params["data"]) : array();
        $material_type = isset($params['materialType']) ? $this->sanitize_material_type($params['materialType']) : 'simple';
        if (!$material_type && isset($data_payload['materialType'])) {
            $material_type = $this->sanitize_material_type($data_payload['materialType']);
        }
        $settings = $this->pick_config_payload_section($params, $data_payload, 'settings', array());
        $required_options = $this->pick_config_payload_section($params, $data_payload, 'requiredOptions', array());
        $additional_options = $this->pick_config_payload_section($params, $data_payload, 'additionalOptions', array());
        $product_type = isset($params['productType']) ? $params['productType'] : (isset($data_payload['productType']) ? $data_payload['productType'] : 'signs-panels');
        $product_family = isset($params['productFamily']) ? sanitize_text_field(wp_unslash($params['productFamily'])) : (isset($data_payload['productFamily']) ? sanitize_text_field((string) $data_payload['productFamily']) : '');
        $pricing_mode = isset($params['pricingMode']) ? $params['pricingMode'] : (isset($data_payload['pricingMode']) ? $data_payload['pricingMode'] : 'frame-fit');
        $data = array(
            'post_title' => isset($params['name']) ? sanitize_text_field(wp_unslash($params['name'])) : '',
            'post_content' => isset($params['description']) ? sanitize_textarea_field(wp_unslash($params['description'])) : '',
            'post_type' => 'ascwo-configs',
            'post_status' => 'publish',
        );
        if (!empty($data_payload) || !empty($required_options) || !empty($additional_options) || !empty($settings)) {
            $post_id = wp_insert_post($data);
            if ($post_id != 0 && !is_wp_error($post_id)) {
                $meta = array(
                    "icon" => isset($params["icon"]) ? $params["icon"] : '',
                    "popImg" => isset($params["popImg"]) ? $params["popImg"] : '',
                    "materialType" => $material_type,
                    "productFamily" => $product_family,
                    "productType" => $product_type,
                    "pricingMode" => $pricing_mode,
                    "settings" => is_array($settings) ? $settings : array(),
                    "requiredOptions" => is_array($required_options) ? $required_options : array(),
                    "additionalOptions" => is_array($additional_options) ? $additional_options : array(),
                    "data" => $data_payload,
                );
                update_post_meta((int) $post_id, 'ascwo-configs-meta', $meta);
                if (!empty($product_ids)) {
                    $conflicts = $this->sync_config_products((int) $post_id, $product_ids);
                    if (!empty($conflicts)) {
                        return rest_ensure_response([
                            "success" => false,
                            "message" => __("Some products are already assigned to another configuration.", "all-signs-customizer-for-woocommerce"),
                            "conflicts" => $conflicts,
                        ]);
                    }
                }
                return rest_ensure_response(["success" => true, "message" => __("Configuration created with success", "all-signs-customizer-for-woocommerce"), "post_id" => $post_id]);
            } else {
                return rest_ensure_response(["success" => false, "message" => "Registration failed"]);
            }
        } else {
            return rest_ensure_response(["message" => "Registration failed"]);
        }
    }
    /**
     * Get config info for $post id
     * @param \WP_REST_Request $request Full details about the request.
     * @return \WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function get_config_post($request)
    {
        $id = (int) $request->get_param('config_id');
        if ($id !== 0) {
            $meta_value = get_post_meta($id, 'ascwo-configs-meta', true);
            if (is_array($meta_value) && !empty($meta_value)) {
                $data = isset($meta_value['data']) && is_array($meta_value['data']) ? $meta_value['data'] : array();
                $response = array(
                    'id' => (int) $id,
                    'name' => get_the_title($id),
                    'description' => get_post_field('post_content', $id),
                    'icon' => isset($data['icon']) ? $data['icon'] : (isset($meta_value['icon']) ? $meta_value['icon'] : ''),
                    'popImg' => isset($data['popImg']) ? $data['popImg'] : (isset($meta_value['popImg']) ? $meta_value['popImg'] : ''),
                    'materialType' => isset($data['materialType']) ? $data['materialType'] : (isset($meta_value['materialType']) ? $meta_value['materialType'] : 'simple'),
                    'productType' => isset($data['productType']) ? $data['productType'] : (isset($meta_value['productType']) ? $meta_value['productType'] : ''),
                    'productFamily' => isset($data['productFamily']) ? $data['productFamily'] : (isset($meta_value['productFamily']) ? $meta_value['productFamily'] : ''),
                    'pricingMode' => isset($data['pricingMode']) ? $data['pricingMode'] : (isset($meta_value['pricingMode']) ? $meta_value['pricingMode'] : ''),
                    'data' => $data,
                );

                return rest_ensure_response($response);
            } else {
                return rest_ensure_response(["message" => __("Not ASO Config Post", "all-signs-customizer-for-woocommerce")]);
            }

        } else {
            return rest_ensure_response(["message" => __("Custom ID invalid", "all-signs-customizer-for-woocommerce")]);
        }


    }

    public function get_preview_config_data($request)
    {
        $configId = (int) $request->get_param('config_id');
        $config = get_post_meta($configId, "ascwo-configs-meta", true);
        $config = is_array($config) ? $config : array();
        $frontend_data = isset($config['data']) && is_array($config['data']) ? $config['data'] : array();
        $material_type = isset($frontend_data['materialType']) ? $this->sanitize_material_type($frontend_data['materialType']) : (isset($config['materialType']) ? $this->sanitize_material_type($config['materialType']) : 'simple');
        $pageSettings = get_option("ascwo_config_page", [])["others"];
        $all_cliparts_groups = get_option("ascwo-manages-cliparts", []);
        $all_fonts = get_option("ascwo-manages-fonts", []);
        $all_shapes = $this->get_normalized_global_icon_items("ascwo_all_shapes");
        $all_fixingMethods = $this->get_managed_fixing_methods();
        $all_borders = $this->get_normalized_global_icon_items("ascwo_all_borders");
        $outputOptions = get_option("ascwo_output_options", []);
        $frontend_data = $this->enrich_component_option_items($frontend_data, $all_fixingMethods, $all_borders);
        $configData = array(
            'name' => get_post_field('post_title', $configId),
            'description' => get_post_field('post_content', $configId),
            'icon' => isset($frontend_data['icon']) ? $frontend_data['icon'] : (isset($config['icon']) ? $config['icon'] : ''),
            'popImg' => isset($frontend_data['popImg']) ? $frontend_data['popImg'] : (isset($config['popImg']) ? $config['popImg'] : ''),
            'materialType' => $material_type,
            'productFamily' => isset($frontend_data['productFamily']) ? $frontend_data['productFamily'] : (isset($config['productFamily']) ? $config['productFamily'] : ''),
            'productType' => isset($frontend_data['productType']) ? $frontend_data['productType'] : (isset($config['productType']) ? $config['productType'] : ''),
            'pricingMode' => isset($frontend_data['pricingMode']) ? $frontend_data['pricingMode'] : (isset($config['pricingMode']) ? $config['pricingMode'] : ''),
            'data' => $frontend_data,
        );
        $visibleFonts = isset($frontend_data['requiredOptions']['fonts']['items']) && is_array($frontend_data['requiredOptions']['fonts']['items'])
            ? $frontend_data['requiredOptions']['fonts']['items']
            : (is_array($all_fonts) ? $all_fonts : array());
        $enable_clipart = isset($frontend_data['settings']['customizerSign']['images']['enableClipart'])
            ? $frontend_data['settings']['customizerSign']['images']['enableClipart']
            : false;
        $config_cliparts = is_array($enable_clipart) && isset($enable_clipart["selectedClipartGroups"]) && is_array($enable_clipart["selectedClipartGroups"])
            ? $enable_clipart["selectedClipartGroups"]
            : [];

        $visibleCliparts = [];
        foreach ($config_cliparts as $part) {
            if (isset($all_cliparts_groups[$part])) {
                $visibleCliparts[] = $all_cliparts_groups[$part];
            }
        }
        $all_manages = [
            "fonts" => $visibleFonts,
            "cliparts" => $visibleCliparts,
            "borders" => $all_borders,
            "pageSettings" => $pageSettings,
            "allShapes" => $all_shapes,
            "allFixingMethods" => $all_fixingMethods,
            "allBorders" => $all_borders,
            "outputOptions" => $outputOptions,
        ];

        $preview_data = array(
            'skin' => isset($frontend_data['settings']['themeColors']['skin']) ? $frontend_data['settings']['themeColors']['skin'] : (isset($config['settings']['themeColors']['skin']) ? $config['settings']['themeColors']['skin'] : 'default'),
            'productID' => '',
            'product' => array(),
            'currentConfig' => $configData,
            'managesData' => $all_manages,
            'regularPrice' => 0,
            'thousandSep' => wc_get_price_thousand_separator(),
            'decimalSep' => wc_get_price_decimal_separator(),
            'decimals' => wc_get_price_decimals(),
            'nbDecimals' => wc_get_price_decimals(),
            'site_url' => get_site_url(),
            'currencySymbol' => html_entity_decode(get_woocommerce_currency_symbol()),
            'currency_pos' => get_option('woocommerce_currency_pos'),
            'variations' => array(),
            'fixing_methods_url' => ASCWO_ASSETS . '/images/fixing-methodes',
            "filters_url" => ASCWO_ASSETS . '/images/filters',
            'borders_url' => ASCWO_ASSETS . '/images/borders',
            'frontend_nonce' => wp_create_nonce('ascwo_add_to_cart_after_custom'),
        );
        return rest_ensure_response($preview_data);
    }
    /**
     * Update of ASO produit configuration
     * @param \WP_REST_Request $request Full details about the request.
     * @return \WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */

    public function update_config_post($request)
    {
        $params = $this->get_request_data($request);
        $post_id = (int) $request->get_param('config_id');
        $data_payload = isset($params["data"]) && is_array($params["data"]) ? $this->sanitize_config_data($params["data"]) : array();
        $existing_post = $this->get_config_post_by_id($post_id);
        $existing_meta = get_post_meta($post_id, 'ascwo-configs-meta', true);
        $args = array(
            'ID' => $post_id,
            'post_title' => isset($params["name"]) ? $params["name"] : ($existing_post ? $existing_post->post_title : ''),
            'post_content' => isset($params["description"]) ? $params["description"] : ($existing_post ? $existing_post->post_content : ''),
        );

        $updatePosts = wp_update_post($args);
        $meta = get_post_meta($post_id, 'ascwo-configs-meta', true);
        if (!is_wp_error($updatePosts)) {
            $existing_data = isset($meta['data']) && is_array($meta['data']) ? $meta['data'] : array();
            if (!empty($data_payload)) {
                $existing_data = array_merge($existing_data, $data_payload);
            }

            $existing_data['settings'] = isset($params["settings"]) && is_array($params["settings"])
                ? $params["settings"]
                : (isset($existing_data["settings"]) && is_array($existing_data["settings"]) ? $existing_data["settings"] : array());
            $existing_data['requiredOptions'] = isset($params["requiredOptions"]) && is_array($params["requiredOptions"])
                ? $params["requiredOptions"]
                : (isset($existing_data["requiredOptions"]) && is_array($existing_data["requiredOptions"]) ? $existing_data["requiredOptions"] : array());
            $existing_data['additionalOptions'] = isset($params["additionalOptions"]) && is_array($params["additionalOptions"])
                ? $params["additionalOptions"]
                : (isset($existing_data["additionalOptions"]) && is_array($existing_data["additionalOptions"]) ? $existing_data["additionalOptions"] : array());
            $existing_data['materialType'] = isset($params['materialType'])
                ? $this->sanitize_material_type($params['materialType'])
                : (isset($existing_data['materialType']) ? $this->sanitize_material_type($existing_data['materialType']) : 'simple');
            $existing_data['productFamily'] = isset($params['productFamily'])
                ? sanitize_text_field(wp_unslash($params['productFamily']))
                : (isset($existing_data['productFamily']) ? sanitize_text_field((string) $existing_data['productFamily']) : '');
            $existing_data['productType'] = isset($params["productType"]) ? $params["productType"] : (isset($existing_data["productType"]) ? $existing_data["productType"] : null);
            $existing_data['pricingMode'] = isset($params["pricingMode"]) ? $params["pricingMode"] : (isset($existing_data["pricingMode"]) ? $existing_data["pricingMode"] : null);
            $existing_data['icon'] = isset($params["icon"]) ? $params["icon"] : (isset($existing_data["icon"]) ? $existing_data["icon"] : '');
            $existing_data['popImg'] = isset($params["popImg"]) ? $params["popImg"] : (isset($existing_data["popImg"]) ? $existing_data["popImg"] : '');

            $data = array(
                'icon' => $existing_data['icon'],
                'popImg' => $existing_data['popImg'],
                'materialType' => $existing_data['materialType'],
                'productFamily' => $existing_data['productFamily'],
                'productType' => $existing_data['productType'],
                'pricingMode' => $existing_data['pricingMode'],
                'data' => $existing_data,
            );
            update_post_meta((int) $post_id, 'ascwo-configs-meta', $data);
            if (isset($params['product_ids']) && is_array($params['product_ids'])) {
                $conflicts = $this->sync_config_products((int) $post_id, $params['product_ids']);
                if (!empty($conflicts)) {
                    return rest_ensure_response(array(
                        'success' => false,
                        "message" => __("Some products are already assigned to another configuration.", "all-signs-customizer-for-woocommerce"),
                        "conflicts" => $conflicts,
                    ));
                }
            }
            return rest_ensure_response(array('success' => true, "message" => __("The configuration has been updated with success", "all-signs-customizer-for-woocommerce")));
        } else {
            return rest_ensure_response(array('success' => false, "message" => __("Configuration update failed", "all-signs-customizer-for-woocommerce")));
        }

    }

    /**
     * Remove ASO configuration from ID in request
     * @param \WP_REST_Request $request Full details about the request.
     *
     * @return $success message if is ok and fail otherwise. 
     */
    public function delete_config($request)
    {

        $id = (int) $request->get_param('config_id');

        if ($id !== 0) {
            // Detach all products assigned to this config.
            $assigned_products = $this->get_products_assigned_to_config((int) $id);
            foreach ($assigned_products as $product_id) {
                $this->set_product_config_id((int) $product_id, 0);
            }

            $deletePost = wp_delete_post($id, true);
            if ($deletePost != null && $deletePost != false) {
                return rest_ensure_response(["success" => true, "message" => __("The configuration was well removed", "all-signs-customizer-for-woocommerce")]);
            } else {
                return rest_ensure_response(["success" => false, "message" => __("Deleting the configuration failed", "all-signs-customizer-for-woocommerce")]);
            }
        } else {
            return rest_ensure_response(["success" => false, "message" => __("Deleting the configuration failed", "all-signs-customizer-for-woocommerce")]);
        }
    }

    /**
     * Get all aso produits configurations with or no per_page,page param in api url
     *
     * @param \WP_REST_Request $request Full details about the request.
     *
     * @return \WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */

    public function get_configs($request)
    {

        $args = array(
            'post_type' => 'ascwo-configs',
            'post_status' => 'publish',
            'order' => 'DESC',
            'orderby' => 'ID',
            'numberposts' => -1
        );

        //displays 6 results per page if per_page is not specified
        $per_page = absint($request->get_param('per_page'));
        if (!empty($per_page)) {
            $args['posts_per_page'] = $per_page;
        } else {
            $per_page = 6;
            $args['posts_per_page'] = 6;
        }

        $oder = $request->get_param('order');
        if (!empty($oder)) {
            $args['order'] = $oder;
        }

        // Make Pagination
        $page = $request->get_param('page');
        if (!empty($page)) {
            $args['paged'] = absint($page);
        }

        // Make search 
        $search_query = $request->get_param('search');
        if (!empty($search_query)) {
            $args['s'] = sanitize_text_field($search_query);
        }

        // Get custom post types using WP_Query
        $query = new WP_Query($args);
        $total_posts = $query->found_posts;
        $total_pages = ceil($total_posts / $per_page);
        // Check the results and return the response
        $posts_data = array(
            "totalConfigsFound" => $total_posts,
            "totalPages" => $total_pages,
            "data" => [],
        );
        if ($query->have_posts()) {


            while ($query->have_posts()) {
                $query->the_post();
                $id = get_the_ID();
                $meta = get_post_meta($id, 'ascwo-configs-meta', true);
                $meta = is_array($meta) ? $meta : array();
                $data = isset($meta['data']) && is_array($meta['data']) ? $meta['data'] : array();
                $post_data = array_merge(
                    array(
                        'id' => (int) $id,
                        'name' => get_the_title($id),
                        'description' => get_post_field('post_content', $id),
                    ),
                    array(
                        'icon' => isset($data['icon']) ? $data['icon'] : (isset($meta['icon']) ? $meta['icon'] : ''),
                        'popImg' => isset($data['popImg']) ? $data['popImg'] : (isset($meta['popImg']) ? $meta['popImg'] : ''),
                        'materialType' => isset($data['materialType']) ? $data['materialType'] : (isset($meta['materialType']) ? $meta['materialType'] : 'simple'),
                        'productType' => isset($data['productType']) ? $data['productType'] : (isset($meta['productType']) ? $meta['productType'] : ''),
                        'productFamily' => isset($data['productFamily']) ? $data['productFamily'] : (isset($meta['productFamily']) ? $meta['productFamily'] : ''),
                        'pricingMode' => isset($data['pricingMode']) ? $data['pricingMode'] : (isset($meta['pricingMode']) ? $meta['pricingMode'] : ''),
                        'data' => $data,
                    )
                );
                array_push($posts_data["data"], $post_data);
                //$posts_data["data"][] = $post_data;

            }

            return rest_ensure_response($posts_data);

        } else {
            return rest_ensure_response($posts_data);
        }
    }


    /**
     * Checks if a given request has access to read the items.
     *
     * @param  \WP_REST_Request $request Full details about the request.
     *
     * @return true|WP_Error True if the request has read access, WP_Error object otherwise.
     */
    public function get_config_permissions_check($request)
    {
        return current_user_can('manage_options');
    }

    /**
     * Retrieves the query params for the items collection.
     *
     * @return array Collection parameters.
     */
    public function get_collection_params()
    {
        return [];
    }
}
