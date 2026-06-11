<?php
namespace ASOWP\Api\Admin\Settings;

use ASOWP\Support\ConfigSchemaNormalizer;
use WP_Error;
use WP_Post;
use WP_Query;
use WP_REST_Controller;

/**
 * class for api routes reaching custom design settings
 */
class ASOWP_Api_Theme_color_Settings extends WP_REST_Controller
{

    /**
     * [__construct description]
     */
    public function __construct()
    {
        $this->namespace = 'asowp/v1';
        $this->rest_base = 'configs/(?P<config_id>\d+)/settings/theme-colors';
    }

    private function get_normalized_meta(int $config_id): array
    {
        $meta = get_post_meta($config_id, 'asowp-configs-meta', true);
        return ConfigSchemaNormalizer::normalize_meta(is_array($meta) ? $meta : array());
    }

    private function get_theme_colors_from_meta(array $meta): array
    {
        return isset($meta['settings']['themeColors']) && is_array($meta['settings']['themeColors'])
            ? $meta['settings']['themeColors']
            : array();
    }

    private function save_theme_colors(int $config_id, array $theme_colors)
    {
        $meta = $this->get_normalized_meta($config_id);
        if (!isset($meta['settings']) || !is_array($meta['settings'])) {
            $meta['settings'] = array();
        }

        $current_theme_colors = $this->get_theme_colors_from_meta($meta);
        if ($current_theme_colors == $theme_colors) {
            return 'same';
        }

        $meta['settings']['themeColors'] = $theme_colors;
        return ConfigSchemaNormalizer::save_meta($config_id, $meta);
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
                    'callback' => array($this, 'get_theme_color_settings'),
                    'permission_callback' => array($this, 'get_permissions_check'),
                    'args' => array(
                        'config_id' => array(
                            'type' => 'integer',
                            'required' => true,
                        )
                    ),
                ),
                array(
                    'methods' => \WP_REST_Server::EDITABLE,
                    'callback' => array($this, 'update_theme_color_settings'),
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
    public function get_theme_color_settings($request)
    {
        $id = $request->get_param('config_id');
        if ($id != 0) {
            $post = get_post($id);
            if ($post) {
                $meta_value = $this->get_normalized_meta((int) $id);
                if (empty($meta_value)) {
                    return rest_ensure_response(["message" => "No Settings found"]);
                } else {
                    $theme_colors = $this->get_theme_colors_from_meta($meta_value);
                    if (!empty($theme_colors)) {
                        return rest_ensure_response($theme_colors);
                    }
                    return rest_ensure_response(["message" => __("No Theme color Settings found", "all-signs-options-pro")]);
                }
            } else {
                return rest_ensure_response(["message" => __(" Theme color ID invalid", "all-signs-options-pro")]);
            }
        } else {
            return rest_ensure_response(["message" => __("Theme color ID i nvalid", "all-signs-options-pro")]);
        }
    }
    public function update_theme_color_settings($request)
    {
        $id = $request->get_param('config_id');
        $theme_colors = json_decode($request->get_body(), true);
        if (!is_array($theme_colors)) {
            $theme_colors = array();
        }
        if ($id != 0) {
            $post = get_post($id);
            if ($post) {
                $response = $this->save_theme_colors((int) $id, $theme_colors);
                if ($response === 'same') {
                    return rest_ensure_response(["success" => "same", "message" => __("No change observed in theme colors", "all-signs-options-pro")]);
                }
                if ($response) {
                    return rest_ensure_response(["success" => true, "message" => __("Theme Colors update successfully settings added successfully", "all-signs-options-pro")]);
                } else {
                    return rest_ensure_response(["success" => false, "message" => __("Add Theme Colors update successfully settings failed", "all-signs-options-pro")]);
                }
            } else {
                return rest_ensure_response(["success" => false, "message" => __(" Theme color ID invalid", "all-signs-options-pro")]);
            }
        } else {
            return rest_ensure_response(["success" => false, "message" => __("Theme color ID i nvalid", "all-signs-options-pro")]);
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
