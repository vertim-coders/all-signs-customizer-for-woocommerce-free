<?php
namespace ASOWP\Api\Admin;

use WP_Error;
use WP_Post;
use WP_Query;
use WP_REST_Controller;

/**
 * REST_API Handler
 */
class ASOWP_Api_Configs extends WP_REST_Controller
{
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

    private function sanitize_config_data($value)
    {
        if (is_array($value)) {
            $clean = array();
            foreach ($value as $key => $item) {
                if ($key === 'id') {
                    continue;
                }
                $clean[$key] = $this->sanitize_config_data($item);
            }
            return $clean;
        }
        return $value;
    }

    private function sanitize_material_type($value): string
    {
        $value = sanitize_text_field((string) $value);
        $allowed = array('simple', 'advance', 'layers');
        if (in_array($value, $allowed, true)) {
            return $value;
        }
        return 'simple';
    }

    private function get_product_assigned_config_id(int $product_id): int
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
            $this->clear_product_config_id($product_id, $config_id);
            return 0;
        }

        return $config_id;
    }

    private function set_product_config_id(int $product_id, int $config_id): void
    {
        $meta_key = 'product-asowp-metas';
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
                    'key' => 'product-asowp-metas',
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
        $this->namespace = 'asowp/v1';
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
                    'permission_callback' => array($this, 'get_config_permissions_check'),
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
                    'permission_callback' => array($this, 'get_config_permissions_check'),
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
        $params = json_decode($request->get_body(), true);
        $product_ids = array();
        if (isset($params['product_ids']) && is_array($params['product_ids'])) {
            $product_ids = $params['product_ids'];
        }
        if (isset($params["data"])) {
            $params["data"] = $this->sanitize_config_data($params["data"]);
        }
        $material_type = isset($params['materialType']) ? $this->sanitize_material_type($params['materialType']) : 'simple';
        $data = [
            'post_title' => $params["name"],
            'post_content' => $params["description"],
            'post_type' => 'asowp-configs',
            'post_meta' => [
                "asowp-configs-meta" => [],
                "asowp-templates" => [],
            ],
            'post_status' => 'publish'
        ];
        if (isset($params["data"]) && !empty($params["data"])) {
            $post_id = wp_insert_post($data);
            if ($post_id != 0 && !is_wp_error($post_id)) {
                $data = [
                    "icon" => $params["icon"],
                    "popImg" => $params["popImg"],
                    "materialType" => $material_type,
                    "data" => $params["data"]
                ];
                update_post_meta($post_id, 'asowp-configs-meta', $data);
                update_post_meta($post_id, "asowp-templates", []);
                if (!empty($product_ids)) {
                    $conflicts = $this->sync_config_products((int) $post_id, $product_ids);
                    if (!empty($conflicts)) {
                        return rest_ensure_response([
                            "success" => false,
                            "message" => __("Some products are already assigned to another configuration.", "all-signs-options-pro"),
                            "conflicts" => $conflicts,
                        ]);
                    }
                }
                return rest_ensure_response(["success" => true, "message" => __("Configuration created with success", "all-signs-options-pro"), "post_id" => $post_id]);
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
        $id = $request->get_param('config_id');
        if ($id != 0) {
            $meta_value = get_post_meta($id, 'asowp-configs-meta', true);
            if (is_array($meta_value) && !empty($meta_value)) {
                $material_type = isset($meta_value['materialType']) ? $this->sanitize_material_type($meta_value['materialType']) : 'simple';

                $post_data = array(
                    'id' => $id,
                    'name' => get_the_title($id),
                    "description" => get_post_field('post_content', $id),
                    "icon" => $meta_value['icon'],
                    "popImg" => $meta_value['popImg'],
                    "materialType" => $material_type,
                    'data' => $meta_value["data"]
                );
                return rest_ensure_response($post_data);
            } else {
                return rest_ensure_response(["message" => __("Not ASO Config Post", "all-signs-options-pro")]);
            }

        } else {
            return rest_ensure_response(["message" => __("Custom ID invalid", "all-signs-options-pro")]);
        }


    }

    public function get_preview_config_data($request)
    {
        $configId = $request->get_param('config_id');
        $config = get_post_meta($configId, "asowp-configs-meta", true);
        $material_type = isset($config['materialType']) ? $this->sanitize_material_type($config['materialType']) : 'simple';
        $pageSettings = get_option("asowp_config_page", [])["others"];
        $all_cliparts_groups = get_option("asowp-manages-cliparts", []);
        $all_fonts = get_option("asowp-manages-fonts", []);
        $all_shapes = get_option("asowp_all_shapes", []);
        $all_fixingMethods = get_option("asowp_all_fixingMethods", []);
        $all_borders = get_option("asowp_all_borders", []);
        $outputOptions = get_option("asowp_output_options", []);
        $configData = [
            'name' => get_post_field('post_title', $configId),
            "description" => get_post_field('post_content', $configId),
            "icon" => $config["icon"],
            "popImg" => $config["popImg"],
            "materialType" => $material_type,
            "data" => $config["data"]
        ];
        $config_fonts = $config["data"]["settings"]["customizerSign"]["text"]["selectedFonts"];
        $config_cliparts = $config["data"]["settings"]["customizerSign"]["images"]["enableClipart"] == true ? $config["data"]["settings"]["customizerSign"]["images"]["enableClipart"]["selectedClipartGroups"] : [];

        $visibleFonts = [];
        foreach ($config_fonts as $font) {
            if (isset($all_fonts[$font])) {
                $visibleFonts[] = $all_fonts[$font];
            }
        }
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
            "allFixingMethod" => $all_fixingMethods,
            "allBorder" => $all_borders,
            "outputOptions" => $outputOptions,
        ];

        $preview_data = array(
            'skin' => $config["data"]["settings"]['themeColors']['skin'],
            'currentConfig' => $configData,
            "managesData" => $all_manages,
            'regularPrice' => 0,
            'thousandSep' => wc_get_price_thousand_separator(),
            'decimalSep' => wc_get_price_decimal_separator(),
            'decimals' => wc_get_price_decimals(),
            'nbDecimals' => wc_get_price_decimals(),
            'currencySymbol' => html_entity_decode(get_woocommerce_currency_symbol()),
            'currency_pos' => get_option('woocommerce_currency_pos'),
            "fixing_methods_url" => ASOWP_ASSETS . '/images/fixing-methodes',
            "borders_url" => ASOWP_ASSETS . '/images/borders',
            "frontend_nonce" => wp_create_nonce('asowp_add_to_cart_after_custom')
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
        $params = json_decode($request->get_body(), true);
        $post_id = $request->get_param('config_id');
        if (isset($params["data"])) {
            $params["data"] = $this->sanitize_config_data($params["data"]);
        }
        $existing_post = get_post($post_id);
        $existing_meta = get_post_meta($post_id, 'asowp-configs-meta', true);
        $args = array(
            'ID' => $post_id,
            'post_title' => isset($params["name"]) ? $params["name"] : ($existing_post ? $existing_post->post_title : ''),
            'post_content' => isset($params["description"]) ? $params["description"] : ($existing_post ? $existing_post->post_content : ''),
        );

        $updatePosts = wp_update_post($args);
        $meta = get_post_meta($post_id, 'asowp-configs-meta', true);
        if (!is_wp_error($updatePosts)) {
            $material_type = isset($params['materialType'])
                ? $this->sanitize_material_type($params['materialType'])
                : (isset($meta['materialType']) ? $this->sanitize_material_type($meta['materialType']) : 'simple');
            $data = [
                "icon" => isset($params["icon"]) ? $params["icon"] : (is_array($existing_meta) && isset($existing_meta["icon"]) ? $existing_meta["icon"] : ''),
                "popImg" => isset($params["popImg"]) ? $params["popImg"] : (is_array($existing_meta) && isset($existing_meta["popImg"]) ? $existing_meta["popImg"] : ''),
                "materialType" => $material_type,
                "data" => isset($params["data"]) ? $params["data"] : $meta['data']
            ];
            update_post_meta($post_id, 'asowp-configs-meta', $data);
            if (isset($params['product_ids']) && is_array($params['product_ids'])) {
                $conflicts = $this->sync_config_products((int) $post_id, $params['product_ids']);
                if (!empty($conflicts)) {
                    return rest_ensure_response(array(
                        'success' => false,
                        "message" => __("Some products are already assigned to another configuration.", "all-signs-options-pro"),
                        "conflicts" => $conflicts,
                    ));
                }
            }
            return rest_ensure_response(array('success' => true, "message" => __("The configuration has been updated with success", "all-signs-options-pro")));
        } else {
            return rest_ensure_response(array('success' => false, "message" => __("Configuration update failed", "all-signs-options-pro")));
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

        $id = $request->get_param('config_id');

        if ($id != 0) {
            // Detach all products assigned to this config.
            $assigned_products = $this->get_products_assigned_to_config((int) $id);
            foreach ($assigned_products as $product_id) {
                $this->set_product_config_id((int) $product_id, 0);
            }

            $deletePost = wp_delete_post($id, true);
            if ($deletePost != null && $deletePost != false) {
                return rest_ensure_response(["success" => true, "message" => __("The configuration was well removed", "all-signs-options-pro")]);
            } else {
                return rest_ensure_response(["success" => false, "message" => __("Deleting the configuration failed", "all-signs-options-pro")]);
            }
        } else {
            return rest_ensure_response(["success" => false, "message" => __("Deleting the configuration failed", "all-signs-options-pro")]);
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
            'post_type' => 'asowp-configs',
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
                $meta = get_post_meta($id, 'asowp-configs-meta', true);
                $material_type = isset($meta['materialType']) ? $this->sanitize_material_type($meta['materialType']) : 'simple';
                $post_data = array(
                    'id' => $id,
                    'name' => get_the_title(),
                    "description" => get_post_field('post_content', $id),
                    "icon" => $meta["icon"],
                    "popImg" => $meta["popImg"],
                    "materialType" => $material_type,
                    "data" => $meta["data"]
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
        // If the user is logged in and has the rights to the posts, access to the route is authorized.
        return true;
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
