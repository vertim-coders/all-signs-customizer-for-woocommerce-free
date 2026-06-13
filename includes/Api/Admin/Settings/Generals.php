<?php
namespace ASCWO\Api\Admin\Settings;

use WP_Error;
use WP_Post;
use WP_Query;
use WP_REST_Controller;

/**
 * class for api routes reaching generals settings
 */
class ASCWO_Api_General_Settings extends WP_REST_Controller
{

    /**
     * [__construct description]
     */
    public function __construct()
    {
        $this->namespace = 'ascwo/v1';
        $this->rest_base = 'configs/(?P<config_id>\d+)/settings/generals';
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
                    'callback' => array($this, 'get_generals_settings'),
                    'permission_callback' => array($this, 'get_permissions_check'),
                    'args' => array(
                        'config_id' => array(
                            'type' => 'integer',
                            'required' => true,
                        )
                    ),
                )
            )
        );
        register_rest_route(
            $this->namespace,
            '/' . $this->rest_base . "/product",
            array(
                array(
                    'methods' => \WP_REST_Server::EDITABLE,
                    'callback' => array($this, 'update_product_options_generals_settings'),
                    'permission_callback' => array($this, 'get_permissions_check'),
                    'args' => array(
                        'config_id' => array(
                            'type' => 'integer',
                            'required' => true,
                        )
                    ),
                )
            )
        );
        register_rest_route(
            $this->namespace,
            '/' . $this->rest_base . "/output",
            array(
                array(
                    'methods' => \WP_REST_Server::EDITABLE,
                    'callback' => array($this, 'update_output_options_generals_settings'),
                    'permission_callback' => array($this, 'get_permissions_check'),
                    'args' => array(
                        'config_id' => array(
                            'type' => 'integer',
                            'required' => true,
                        )
                    ),
                )
            )
        );
        register_rest_route(
            $this->namespace,
            '/' . $this->rest_base . "/mobile",
            array(
                array(
                    'methods' => \WP_REST_Server::EDITABLE,
                    'callback' => array($this, 'update_mobile_options_generals_settings'),
                    'permission_callback' => array($this, 'get_permissions_check'),
                    'args' => array(
                        'config_id' => array(
                            'type' => 'integer',
                            'required' => true,
                        )
                    ),
                )
            )
        );
        register_rest_route(
            $this->namespace,
            '/' . $this->rest_base . "/(?P<section>[a-zA-Z0-9_-]+)",
            array(
                array(
                    'methods' => \WP_REST_Server::EDITABLE,
                    'callback' => array($this, 'update_section_options_generals_settings'),
                    'permission_callback' => array($this, 'get_permissions_check'),
                    'args' => array(
                        'config_id' => array(
                            'type' => 'integer',
                            'required' => true,
                        ),
                        'section' => array(
                            'type' => 'string',
                            'required' => true,
                        )
                    ),
                )
            )
        );
    }

    private function get_normalized_meta(int $config_id): array
    {
        $meta = get_post_meta($config_id, 'ascwo-configs-meta', true);
        $meta = is_array($meta) ? $meta : array();
        $meta['settings'] = isset($meta['settings']) && is_array($meta['settings']) ? $meta['settings'] : array();
        return $meta;
    }

    private function get_generals_from_meta(array $meta): array
    {
        return isset($meta['settings']['generals']) && is_array($meta['settings']['generals'])
            ? $meta['settings']['generals']
            : array();
    }

    private function save_general_section(int $config_id, string $section, array $section_options)
    {
        $meta = $this->get_normalized_meta($config_id);
        if (!isset($meta['settings']) || !is_array($meta['settings'])) {
            $meta['settings'] = array();
        }
        if (!isset($meta['settings']['generals']) || !is_array($meta['settings']['generals'])) {
            $meta['settings']['generals'] = array();
        }

        if (isset($meta['settings']['generals'][$section]) && $meta['settings']['generals'][$section] == $section_options) {
            return 'same';
        }

        $meta['settings']['generals'][$section] = $section_options;
        return update_post_meta($config_id, 'ascwo-configs-meta', $meta);
    }

    /**
     * Get all generals settings
     * @param \WP_REST_Request $request Full details about the request.
     * @return \WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function get_generals_settings($request)
    {
        $id = $request->get_param('config_id');
        if ($id != 0) {
            $post = get_post($id);
            if ($post) {
                $meta_value = get_post_meta($id, 'ascwo-configs-meta', true);
                if (empty($meta_value)) {
                    return rest_ensure_response(["message" => __("No Settings found", "all-signs-customizer-for-woocommerce-pro")]);
                } else {
                    $generals = $this->get_generals_from_meta($this->get_normalized_meta((int) $id));
                    if (!empty($generals)) {
                        return rest_ensure_response($generals);
                    }
                    return rest_ensure_response(["message" => __("No generals Settings found", "all-signs-customizer-for-woocommerce-pro")]);
                }
            } else {
                return rest_ensure_response(["message" => __("Custom ID invalid", "all-signs-customizer-for-woocommerce-pro")]);
            }
        } else {
            return rest_ensure_response(["message" => __("Custom ID invalid", "all-signs-customizer-for-woocommerce-pro")]);
        }
    }
    /**
     * Update Product options of generals settings
     * @param \WP_REST_Request $request Full details about the request.
     * @return \WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function update_product_options_generals_settings($request)
    {
        $id = $request->get_param('config_id');
        $product_options = json_decode($request->get_body(), true);
        if ($id != 0) {
            $post = get_post($id);
            if ($post) {
                $response = $this->save_general_section((int) $id, 'product', is_array($product_options) ? $product_options : array());

                if ($response === 'same') {
                    return rest_ensure_response(["success" => "same", "message" => __("No change observed in product options in generals settings failed", "all-signs-customizer-for-woocommerce-pro")]);
                }

                if ($response) {
                    return rest_ensure_response(["success" => true, "message" => __("Product options in generals settings updated successfully", "all-signs-customizer-for-woocommerce-pro")]);
                } else {
                    return rest_ensure_response(["success" => false, "message" => __("Update product options in generals settings failed", "all-signs-customizer-for-woocommerce-pro")]);
                }
            } else {
                return rest_ensure_response(["success" => false, "message" => __("Custom ID invalid", "all-signs-customizer-for-woocommerce-pro")]);
            }
        } else {
            return rest_ensure_response(["success" => false, "message" => __("Custom ID invalid", "all-signs-customizer-for-woocommerce-pro")]);
        }
    }

    /**
     * Update Mobile options of generals settings
     * @param \WP_REST_Request $request Full details about the request.
     * @return \WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function update_mobile_options_generals_settings($request)
    {
        $id = $request->get_param('config_id');
        $mobile_options = json_decode($request->get_body(), true);
        if ($id != 0) {
            $post = get_post($id);
            if ($post) {
                $response = $this->save_general_section((int) $id, 'mobile', is_array($mobile_options) ? $mobile_options : array());

                if ($response === 'same') {
                    return rest_ensure_response(["success" => "same", "message" => __("No change observed in mobile options in generals settings failed", "all-signs-customizer-for-woocommerce-pro")]);
                }

                if ($response) {
                    return rest_ensure_response(["success" => true, "message" => __("Mobile options in generals settings updated successfully", "all-signs-customizer-for-woocommerce-pro")]);
                } else {
                    return rest_ensure_response(["success" => false, "message" => __("Update mobile options in generals settings failed", "all-signs-customizer-for-woocommerce-pro")]);
                }
            } else {
                return rest_ensure_response(["success" => false, "message" => __("Custom ID invalid", "all-signs-customizer-for-woocommerce-pro")]);
            }
        } else {
            return rest_ensure_response(["success" => false, "message" => __("Custom ID invalid", "all-signs-customizer-for-woocommerce-pro")]);
        }
    }
    /**
     * Update Output options of generals settings
     * @param \WP_REST_Request $request Full details about the request.
     * @return \WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function update_output_options_generals_settings($request)
    {
        $id = $request->get_param('config_id');
        $output_options = json_decode($request->get_body(), true);
        if ($id != 0) {
            $post = get_post($id);
            if ($post) {
                $response = $this->save_general_section((int) $id, 'output', is_array($output_options) ? $output_options : array());

                if ($response === 'same') {
                    return rest_ensure_response(["success" => "same", "message" => __("No change observed in output options in generals settings failed", "all-signs-customizer-for-woocommerce-pro")]);
                }

                if ($response) {
                    return rest_ensure_response(["success" => true, "message" => __("Output options in generals settings updated successfully", "all-signs-customizer-for-woocommerce-pro")]);
                } else {
                    return rest_ensure_response(["success" => false, "message" => __("Update output options in generals settings failed", "all-signs-customizer-for-woocommerce-pro")]);
                }
            } else {
                return rest_ensure_response(["success" => false, "message" => __("Custom ID invalid", "all-signs-customizer-for-woocommerce-pro")]);
            }
        } else {
            return rest_ensure_response(["success" => false, "message" => __("Custom ID invalid", "all-signs-customizer-for-woocommerce-pro")]);
        }
    }

    /**
     * Update a supported general settings section.
     *
     * @param \WP_REST_Request $request Full details about the request.
     * @return \WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function update_section_options_generals_settings($request)
    {
        $id = $request->get_param('config_id');
        $section = $request->get_param('section');
        $allowed_sections = array(
            'product',
            'output',
            'upload',
            'mobile',
            'mode',
            'uploadDesign',
            'quantityLimits',
            'discount',
            'requestQuote',
            'simpleOptions',
        );

        if (!in_array($section, $allowed_sections, true)) {
            return rest_ensure_response(["success" => false, "message" => __("General settings section invalid", "all-signs-customizer-for-woocommerce-pro")]);
        }

        $section_options = json_decode($request->get_body(), true);

        if ($id == 0) {
            return rest_ensure_response(["success" => false, "message" => __("Custom ID invalid", "all-signs-customizer-for-woocommerce-pro")]);
        }

        $post = get_post($id);
        if (!$post) {
            return rest_ensure_response(["success" => false, "message" => __("Custom ID invalid", "all-signs-customizer-for-woocommerce-pro")]);
        }

        $response = $this->save_general_section((int) $id, $section, is_array($section_options) ? $section_options : array());
        if ($response === 'same') {
            return rest_ensure_response(["success" => "same", "message" => __("No change observed in general settings", "all-signs-customizer-for-woocommerce-pro")]);
        }

        if ($response) {
            return rest_ensure_response(["success" => true, "message" => __("General settings updated successfully", "all-signs-customizer-for-woocommerce-pro")]);
        }

        return rest_ensure_response(["success" => false, "message" => __("Update general settings failed", "all-signs-customizer-for-woocommerce-pro")]);
    }
    /**
     * Checks if a given request has access to read the materials.
     *
     * @param  WP_REST_Request $request Full details about the request.
     *
     * @return true|WP_Error True if the request has read access, WP_Error object otherwise.
     */
    public function get_permissions_check($request)
    {
        return true;
    }
}

