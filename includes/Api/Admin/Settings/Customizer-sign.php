<?php
namespace ASCWO\Api\Admin\Settings;

use WP_Error;
use WP_Post;
use WP_Query;
use WP_REST_Controller;

/**
 * class for api routes reaching custom design settings
 */
class ASCWO_Api_Customizer_Sign_Settings extends WP_REST_Controller
{

    /**
     * [__construct description]
     */
    public function __construct()
    {
        $this->namespace = 'ascwo/v1';
        $this->rest_base = 'configs/(?P<config_id>\d+)/settings/customizer-signs';
    }

    private function get_normalized_meta(int $config_id): array
    {
        $meta = get_post_meta($config_id, 'ascwo-configs-meta', true);
        $meta = is_array($meta) ? $meta : array();
        $meta['settings'] = isset($meta['settings']) && is_array($meta['settings']) ? $meta['settings'] : array();
        if (empty($meta['settings']) && isset($meta['data']['settings']) && is_array($meta['data']['settings'])) {
            $meta['settings'] = $meta['data']['settings'];
        }
        return $meta;
    }

    private function get_customizer_sign_from_meta(array $meta): array
    {
        if (isset($meta['settings']['customizerSign']) && is_array($meta['settings']['customizerSign'])) {
            return $meta['settings']['customizerSign'];
        }

        if (isset($meta['data']['settings']['customizerSign']) && is_array($meta['data']['settings']['customizerSign'])) {
            return $meta['data']['settings']['customizerSign'];
        }

        return array();
    }

    private function save_customizer_sign_section(int $config_id, string $section, array $section_options)
    {
        $meta = $this->get_normalized_meta($config_id);
        if (!isset($meta['settings']) || !is_array($meta['settings'])) {
            $meta['settings'] = array();
        }
        if (!isset($meta['settings']['customizerSign']) || !is_array($meta['settings']['customizerSign'])) {
            $meta['settings']['customizerSign'] = array();
        }
        if (!isset($meta['data']) || !is_array($meta['data'])) {
            $meta['data'] = array();
        }
        if (!isset($meta['data']['settings']) || !is_array($meta['data']['settings'])) {
            $meta['data']['settings'] = array();
        }
        if (!isset($meta['data']['settings']['customizerSign']) || !is_array($meta['data']['settings']['customizerSign'])) {
            $meta['data']['settings']['customizerSign'] = array();
        }

        if (
            isset($meta['settings']['customizerSign'][$section]) && $meta['settings']['customizerSign'][$section] == $section_options
            && isset($meta['data']['settings']['customizerSign'][$section]) && $meta['data']['settings']['customizerSign'][$section] == $section_options
        ) {
            return 'same';
        }

        $meta['settings']['customizerSign'][$section] = $section_options;
        $meta['data']['settings']['customizerSign'][$section] = $section_options;
        return update_post_meta($config_id, 'ascwo-configs-meta', $meta);
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
                    'callback' => array($this, 'get_customizer_sign_settings'),
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
            '/' . $this->rest_base . "/customizer",
            array(
                array(
                    'methods' => \WP_REST_Server::EDITABLE,
                    'callback' => array($this, 'update_customizer_options_customizer_sign_settings'),
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
            '/' . $this->rest_base . "/config-options",
            array(
                array(
                    'methods' => \WP_REST_Server::EDITABLE,
                    'callback' => array($this, 'update_config_options_customizer_sign_settings'),
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
            '/' . $this->rest_base . "/sign-part",
            array(
                array(
                    'methods' => \WP_REST_Server::EDITABLE,
                    'callback' => array($this, 'update_sign_part_customizer_sign_settings'),
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
            '/' . $this->rest_base . "/text",
            array(
                array(
                    'methods' => \WP_REST_Server::EDITABLE,
                    'callback' => array($this, 'update_text_option_customizer_sign_settings'),
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
            '/' . $this->rest_base . "/images",
            array(
                array(
                    'methods' => \WP_REST_Server::EDITABLE,
                    'callback' => array($this, 'updates_image_customizer_sign_settings'),
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
    }
    /**
     * Get all customizer sign settings
     * @param \WP_REST_Request $request Full details about the request.
     * @return \WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function get_customizer_sign_settings($request)
    {
        $id = $request->get_param('config_id');
        if ($id != 0) {
            $post = get_post($id);
            if ($post) {
                $meta_value = $this->get_normalized_meta((int) $id);
                if (empty($meta_value)) {
                    return rest_ensure_response(["success" => false, "message" => __("No Settings found", "all-signs-customizer-for-woocommerce-pro")]);
                } else {
                    $customizer_sign = $this->get_customizer_sign_from_meta($meta_value);
                    if (!empty($customizer_sign)) {
                        return rest_ensure_response($customizer_sign);
                    }
                    return rest_ensure_response(["success" => false, "message" => __("No Customizer Sign Settings found", "all-signs-customizer-for-woocommerce-pro")]);
                }
            } else {
                return rest_ensure_response(["success" => false, "message" => __("Customizer ID invalid", "all-signs-customizer-for-woocommerce-pro")]);
            }
        } else {
            return rest_ensure_response(["success" => false, "message" => __("Customizer ID invalid", "all-signs-customizer-for-woocommerce-pro")]);
        }
    }
    /**
     * Update Customizer options of customizer sign settings
     * @param \WP_REST_Request $request Full details about the request.
     * @return \WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function update_customizer_options_customizer_sign_settings($request)
    {
        $id = $request->get_param('config_id');
        $customizer_options = json_decode($request->get_body(), true);
        if ($id != 0) {
            $post = get_post($id);
            if ($post) {
                $response = $this->save_customizer_sign_section((int) $id, 'customizerOptions', is_array($customizer_options) ? $customizer_options : array());
                if ($response === 'same') {
                    return rest_ensure_response(["success" => "same", "message" => __("No change observed in customizer options in customizer sign settings", "all-signs-customizer-for-woocommerce-pro")]);
                }

                if ($response) {
                    return rest_ensure_response(["success" => true, "message" => __("customizer in customizer sign settings upadted successfully", "all-signs-customizer-for-woocommerce-pro")]);
                } else {
                    return rest_ensure_response(["success" => false, "message" => __("Update customizer in customizer sign settings failed", "all-signs-customizer-for-woocommerce-pro")]);
                }
            } else {
                return rest_ensure_response(["success" => false, "message" => __("Custom ID invalid", "all-signs-customizer-for-woocommerce-pro")]);
            }
        } else {
            return rest_ensure_response(["success" => false, "message" => __("Custom ID invalid", "all-signs-customizer-for-woocommerce-pro")]);
        }
    }

    /**
     * Update Config options order and visibility of customizer sign settings.
     * @param \WP_REST_Request $request Full details about the request.
     * @return \WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function update_config_options_customizer_sign_settings($request)
    {
        $id = $request->get_param('config_id');
        $config_options = json_decode($request->get_body(), true);
        if ($id != 0) {
            $post = get_post($id);
            if ($post) {
                $response = $this->save_customizer_sign_section((int) $id, 'configOptions', is_array($config_options) ? $config_options : array());
                if ($response === 'same') {
                    return rest_ensure_response(["success" => "same", "message" => __("No change observed in config options in customizer sign settings", "all-signs-customizer-for-woocommerce-pro")]);
                }

                if ($response) {
                    return rest_ensure_response(["success" => true, "message" => __("Config options in customizer sign settings updated successfully", "all-signs-customizer-for-woocommerce-pro")]);
                } else {
                    return rest_ensure_response(["success" => false, "message" => __("Update config options in customizer sign settings failed", "all-signs-customizer-for-woocommerce-pro")]);
                }
            } else {
                return rest_ensure_response(["success" => false, "message" => __("Custom ID invalid", "all-signs-customizer-for-woocommerce-pro")]);
            }
        } else {
            return rest_ensure_response(["success" => false, "message" => __("Custom ID invalid", "all-signs-customizer-for-woocommerce-pro")]);
        }
    }
    /**
     * Update Sign part options of customizer sign settings
     * @param \WP_REST_Request $request Full details about the request.
     * @return \WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function update_sign_part_customizer_sign_settings($request)
    {
        $id = $request->get_param('config_id');
        $sign_options = json_decode($request->get_body(), true);
        if ($id != 0) {
            $post = get_post($id);
            if ($post) {
                $response = $this->save_customizer_sign_section((int) $id, 'signPart', is_array($sign_options) ? $sign_options : array());
                if ($response === 'same') {
                    return rest_ensure_response(["success" => "same", "message" => __("No change observed in Sign part in customizer sign settings ", "all-signs-customizer-for-woocommerce-pro")]);
                }
                if ($response) {
                    return rest_ensure_response(["success" => true, "message" => __("Sign part in customizer sign settings upadted successfully", "all-signs-customizer-for-woocommerce-pro")]);
                } else {
                    return rest_ensure_response(["success" => false, "message" => __("Update Sign part in customizer sign settings failed", "all-signs-customizer-for-woocommerce-pro")]);
                }
            } else {
                return rest_ensure_response(["success" => false, "message" => __("Custom ID invalid", "all-signs-customizer-for-woocommerce-pro")]);
            }
        } else {
            return rest_ensure_response(["success" => false, "message" => __("Custom ID invalid", "all-signs-customizer-for-woocommerce-pro")]);
        }
    }
    /**
     * Update Text options of customizer sign settings
     * @param \WP_REST_Request $request Full details about the request.
     * @return \WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function update_text_option_customizer_sign_settings($request)
    {
        $id = $request->get_param('config_id');
        $text_options = json_decode($request->get_body(), true);
        if ($id != 0) {
            $post = get_post($id);
            if ($post) {
                $response = $this->save_customizer_sign_section((int) $id, 'text', is_array($text_options) ? $text_options : array());
                if ($response === 'same') {
                    return rest_ensure_response(["success" => "same", "message" => __("No change observed in Text in customizer sign settings", "all-signs-customizer-for-woocommerce-pro")]);
                }
                if ($response) {
                    return rest_ensure_response(["success" => true, "message" => __("Text in customizer sign settings upadted successfully", "all-signs-customizer-for-woocommerce-pro")]);
                } else {
                    return rest_ensure_response(["success" => false, "message" => __("Update Text in customizer sign settings failed", "all-signs-customizer-for-woocommerce-pro")]);
                }
            } else {
                return rest_ensure_response(["success" => false, "message" => __("Custom ID invalid", "all-signs-customizer-for-woocommerce-pro")]);
            }
        } else {
            return rest_ensure_response(["success" => false, "message" => __("Custom ID invalid", "all-signs-customizer-for-woocommerce-pro")]);
        }
    }
    /**
     * Update   Image options of customizer sign settings
     * @param \WP_REST_Request $request Full details about the request.
     * @return \WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function updates_image_customizer_sign_settings($request)
    {
        $id = $request->get_param('config_id');
        $image_options = json_decode($request->get_body(), true);
        if ($id != 0) {
            $post = get_post($id);
            if ($post) {
                $response = $this->save_customizer_sign_section((int) $id, 'images', is_array($image_options) ? $image_options : array());
                if ($response === 'same') {
                    return rest_ensure_response(["success" => "same", "message" => __("No change observed in image in Customizer sign settings", "all-signs-customizer-for-woocommerce-pro")]);
                }
                if ($response) {
                    return rest_ensure_response(["success" => true, "message" => __("image in Customizer sign settings upadted successfully", "all-signs-customizer-for-woocommerce-pro")]);
                } else {
                    return rest_ensure_response(["success" => false, "message" => __("Update image in Customizer sign settings failed", "all-signs-customizer-for-woocommerce-pro")]);
                }
            } else {
                return rest_ensure_response(["success" => false, "message" => __("Custom ID invalid", "all-signs-customizer-for-woocommerce-pro")]);
            }
        } else {
            return rest_ensure_response(["success" => false, "message" => __("Custom ID invalid", "all-signs-customizer-for-woocommerce-pro")]);
        }
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
