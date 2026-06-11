<?php
namespace ASOWP\Api\Admin\Settings;

use ASOWP\Support\ConfigSchemaNormalizer;
use WP_Error;
use WP_Post;
use WP_Query;
use WP_REST_Controller;

/**
 * class for api routes reaching language images settings
 */
class ASOWP_Api_Language_Images_Settings extends WP_REST_Controller
{

    /**
     * [__construct description]
     */
    public function __construct()
    {
        $this->namespace = 'asowp/v1';
        $this->rest_base = 'configs/(?P<config_id>\d+)/settings/language-images';
    }

    private function get_normalized_meta(int $config_id): array
    {
        $meta = get_post_meta($config_id, 'asowp-configs-meta', true);
        return ConfigSchemaNormalizer::normalize_meta(is_array($meta) ? $meta : array());
    }

    private function get_language_images_from_meta(array $meta): array
    {
        return isset($meta['settings']['languageImages']) && is_array($meta['settings']['languageImages'])
            ? $meta['settings']['languageImages']
            : array();
    }

    private function save_language_images_section(int $config_id, string $section, array $section_options)
    {
        $meta = $this->get_normalized_meta($config_id);
        if (!isset($meta['settings']) || !is_array($meta['settings'])) {
            $meta['settings'] = array();
        }
        if (!isset($meta['settings']['languageImages']) || !is_array($meta['settings']['languageImages'])) {
            $meta['settings']['languageImages'] = array();
        }

        if (isset($meta['settings']['languageImages'][$section]) && $meta['settings']['languageImages'][$section] == $section_options) {
            return 'same';
        }

        $meta['settings']['languageImages'][$section] = $section_options;
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
                    'callback' => array($this, 'get_language_images_settings'),
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
            '/' . $this->rest_base . "/main",
            array(
                array(
                    'methods' => \WP_REST_Server::EDITABLE,
                    'callback' => array($this, 'update_main_options_language_images_settings'),
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
            '/' . $this->rest_base . "/upload-design",
            array(
                array(
                    'methods' => \WP_REST_Server::EDITABLE,
                    'callback' => array($this, 'update_upload_design_options_language_images_settings'),
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
            '/' . $this->rest_base . "/visualizer",
            array(
                array(
                    'methods' => \WP_REST_Server::EDITABLE,
                    'callback' => array($this, 'update_visualizer_options_language_images_settings'),
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
                    'callback' => array($this, 'update_image_language_images_settings'),
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
     * Get all language images settings
     * @param \WP_REST_Request $request Full details about the request.
     * @return \WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function get_language_images_settings($request)
    {
        $id = $request->get_param('config_id');
        if ($id != 0) {
            $post = get_post($id);
            if ($post) {
                $meta_value = $this->get_normalized_meta((int) $id);
                if (empty($meta_value)) {
                    return rest_ensure_response(["message" => "No Settings found"]);
                } else {
                    $language_images = $this->get_language_images_from_meta($meta_value);
                    if (!empty($language_images)) {
                        return rest_ensure_response($language_images);
                    }
                    return rest_ensure_response(["message" => __("No language Images Settings found", "all-signs-options-pro")]);
                }
            } else {
                return rest_ensure_response(["message" => __("Custom ID invalid", "all-signs-options-pro")]);
            }
        } else {
            return rest_ensure_response(["message" => __("Custom ID invalid", "all-signs-options-pro")]);
        }
    }
    /**
     * Update Main options of language images settings
     * @param \WP_REST_Request $request Full details about the request.
     * @return \WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function update_main_options_language_images_settings($request)
    {
        $id = $request->get_param('config_id');
        $main_options = json_decode($request->get_body(), true);
        if ($id != 0) {
            $post = get_post($id);
            if ($post) {
                $response = $this->save_language_images_section((int) $id, 'main', is_array($main_options) ? $main_options : array());
                if ($response === 'same') {
                    return rest_ensure_response(["success" => "same", "message" => __("No change observed in Main options in language Images settings failed", "all-signs-options-pro")]);
                }
                if ($response) {
                    return rest_ensure_response(["success" => true, "message" => __("Main options in language Images settings updated successfully", "all-signs-options-pro")]);
                } else {
                    return rest_ensure_response(["success" => false, "message" => __("Update Main options in language Images settings failed", "all-signs-options-pro")]);
                }
            } else {
                return rest_ensure_response(["success" => false, "message" => __("Custom ID invalid", "all-signs-options-pro")]);
            }
        } else {
            return rest_ensure_response(["success" => false, "message" => __("Custom ID invalid", "all-signs-options-pro")]);
        }
    }
    /**
     * Update upload design options of language images settings
     * @param \WP_REST_Request $request Full details about the request.
     * @return \WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function update_upload_design_options_language_images_settings($request)
    {
        $id = $request->get_param('config_id');
        $customizer_options = json_decode($request->get_body(), true);
        if ($id != 0) {
            $post = get_post($id);
            if ($post) {
                $response = $this->save_language_images_section((int) $id, 'uploadDesign', is_array($customizer_options) ? $customizer_options : array());
                if ($response === 'same') {
                    return rest_ensure_response(["success" => "same", "message" => __("No change observed in Customizer Design options in language Images settings", "all-signs-options-pro")]);
                }
                if ($response) {
                    return rest_ensure_response(["success" => true, "message" => __("Customizer Design options in language Images settings updated successfully", "all-signs-options-pro")]);
                } else {
                    return rest_ensure_response(["success" => false, "message" => __("Update Customizer Design options in language Images settings failed", "all-signs-options-pro")]);
                }
            } else {
                return rest_ensure_response(["success" => false, "message" => __("Custom ID invalid", "all-signs-options-pro")]);
            }
        } else {
            return rest_ensure_response(["success" => false, "message" => __("Custom ID invalid", "all-signs-options-pro")]);
        }
    }
    /**
     * Update visualizer design options of language images settings
     * @param \WP_REST_Request $request Full details about the request.
     * @return \WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function update_visualizer_options_language_images_settings($request)
    {
        $id = $request->get_param('config_id');
        $visualizer_options = json_decode($request->get_body(), true);
        if ($id != 0) {
            $post = get_post($id);
            if ($post) {
                $response = $this->save_language_images_section((int) $id, 'visualizer', is_array($visualizer_options) ? $visualizer_options : array());
                if ($response === 'same') {
                    return rest_ensure_response(["success" => "same", "message" => __("No change observed in Visualizer options in language Images", "all-signs-options-pro")]);
                }
                if ($response) {
                    return rest_ensure_response(["success" => true, "message" => __("Visualizer options in language Images settings updated successfully", "all-signs-options-pro")]);
                } else {
                    return rest_ensure_response(["success" => false, "message" => __("update Visualizer options in language Images settings failed", "all-signs-options-pro")]);
                }
            } else {
                return rest_ensure_response(["success" => false, "message" => __("Custom ID invalid", "all-signs-options-pro")]);
            }
        } else {
            return rest_ensure_response(["success" => false, "message" => __("Custom ID invalid", "all-signs-options-pro")]);
        }
    }
    /**
     * Update images options of language images settings
     * @param \WP_REST_Request $request Full details about the request.
     * @return \WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function update_image_language_images_settings($request)
    {
        $id = $request->get_param('config_id');
        $image_options = json_decode($request->get_body(), true);
        if ($id != 0) {
            $post = get_post($id);
            if ($post) {
                $response = $this->save_language_images_section((int) $id, 'images', is_array($image_options) ? $image_options : array());
                if ($response === 'same') {
                    return rest_ensure_response(["success" => "same", "message" => __("No change observed in Images options in language Images settings", "all-signs-options-pro")]);
                }
                if ($response) {
                    return rest_ensure_response(["success" => true, "message" => __("Images options in language Images settings updated successfully", "all-signs-options-pro")]);
                } else {
                    return rest_ensure_response(["success" => false, "message" => __("Update Images options in language Images settings failed", "all-signs-options-pro")]);
                }
            } else {
                return rest_ensure_response(["success" => false, "message" => __("Custom ID invalid", "all-signs-options-pro")]);
            }
        } else {
            return rest_ensure_response(["success" => false, "message" => __("Custom ID invalid", "all-signs-options-pro")]);
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
