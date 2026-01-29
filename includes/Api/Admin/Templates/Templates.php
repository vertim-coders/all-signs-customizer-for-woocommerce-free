<?php
namespace ASOWP\Api\Admin\Templates;

use WP_Error;
use WP_Post;
use WP_Query;
use WP_REST_Controller;

/**
 * class for api routes reaching templates
 */
class ASOWP_Api_Templates extends WP_REST_Controller
{
    private function normalize_show_on_frontend($template, $default = true)
    {
        if (!is_array($template)) {
            return $template;
        }
        if (!array_key_exists('showOnFrontend', $template)) {
            $template['showOnFrontend'] = $default;
            return $template;
        }
        $normalized = filter_var($template['showOnFrontend'], FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE);
        if ($normalized === null) {
            $normalized = (bool) $template['showOnFrontend'];
        }
        $template['showOnFrontend'] = $normalized;
        return $template;
    }

    /**
     * [__construct description]
     */
    public function __construct()
    {
        $this->namespace = 'asowp/v1';
        $this->rest_base = 'templates';
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
                    'callback' => array($this, 'get_all_templates'),
                    'permission_callback' => array($this, 'get_config_permissions_check'),
                ),
            )
        );
        register_rest_route(
            $this->namespace,
            '/' . $this->rest_base . "/(?P<config_id>\d+)",
            array(
                array(
                    'methods' => \WP_REST_Server::CREATABLE,
                    'callback' => array($this, 'create_template'),
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
        register_rest_route(
            $this->namespace,
            '/' . $this->rest_base . "/(?P<config_id>\d+)/(?P<template_id>\d+)",
            array(
                array(
                    'methods' => \WP_REST_Server::READABLE,
                    'callback' => array($this, 'get_template_info'),
                    'permission_callback' => array($this, 'get_config_permissions_check'),
                    'args' => array(
                        'config_id' => array(
                            'type' => 'integer',
                            'required' => true,
                        ),
                        'template_id' => array(
                            'type' => 'integer',
                            'required' => true
                        )
                    ),
                ),
                array(
                    'methods' => \WP_REST_Server::EDITABLE,
                    'callback' => array($this, 'update_template'),
                    'permission_callback' => array($this, 'get_config_permissions_check'),
                    'args' => array(
                        'config_id' => array(
                            'type' => 'integer',
                            'required' => true,
                        ),
                        'template_id' => array(
                            'type' => 'integer',
                            'required' => true
                        )
                    ),
                ),
                array(
                    'methods' => \WP_REST_Server::DELETABLE,
                    'callback' => array($this, 'delete_template'),
                    'permission_callback' => array($this, 'get_config_permissions_check'),
                    'args' => array(
                        'config_id' => array(
                            'type' => 'integer',
                            'required' => true,
                        ),
                        'template_id' => array(
                            'type' => 'integer',
                            'required' => true
                        )
                    ),
                )
            )
        );

    }

    /**
     * Get all templates
     * @param \WP_REST_Request $request Full details about the request.
     * @return \WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */

    public function get_all_templates($request)
    {

        $args = array(
            'post_type' => 'asowp-configs',
            'post_status' => 'publish',
            'order' => 'DESC',
            'orderby' => 'ID',
            'numberposts' => -1
        );
        $search = $request->get_param("s");


        // Get custom post types using WP_Query
        $query = new WP_Query($args);
        $categories = get_option("asowp-templates-categories", []);
        if (count($categories) > 0) {
            $tab = [];
            foreach ($categories as $key => $cat) {
                $tab[] = ["value" => $key, "name" => $cat];
            }
            $categories = $tab;
        }
        $templates = [
            "categories" => $categories,
            "configurations" => [],
            "templates" => [],
        ];
        if ($query->have_posts()) {


            while ($query->have_posts()) {
                $query->the_post();
                $config_id = get_the_ID();
                $meta = get_post_meta($config_id, 'asowp-templates', true);
                if (is_array($meta) && count($meta) > 0) {
                    $tab = [];
                    foreach ($meta as $key => $value) {
                        $value = $this->normalize_show_on_frontend($value);
                        if (!is_array($value)) {
                            continue;
                        }
                        if (!empty($search)) {
                            if (str_contains($search, $value['name'])) {
                                array_push($tab, $value);
                            }
                        } else {
                            array_push($tab, $value);
                        }
                    }
                    array_push($templates["templates"], $tab);

                }
                $post_data = array(
                    'value' => $config_id,
                    'name' => get_the_title(),
                );
                array_push($templates["configurations"], $post_data);
            }

            return rest_ensure_response($templates);

        } else {
            return rest_ensure_response($templates);
        }
    }

    /**
     * Get a templates
     * @param \WP_REST_Request $request Full details about the request.
     * @return \WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */

    public function get_template_info($request)
    {
        $config_id = $request->get_param('config_id');
        $template_id = $request->get_param('template_id');
        if ($config_id != 0) {
            $templates = get_post_meta($config_id, 'asowp-templates', true);

            if (!empty($templates)) {
                if (isset($templates[$template_id])) {
                    $template =  $this->normalize_show_on_frontend($templates[$template_id]);
                    $template["data"] = isset( $template["data_file"]) ? asowp_get_large_data($template["data_file"])  : $template["data"] ;
                    return rest_ensure_response($template);
                } else {
                    return rest_ensure_response(array("message" => __("No template found", "all-signs-options-pro")));
                }
            } else {
                return rest_ensure_response(["message" => __("No data found", "all-signs-options-pro")]);
            }
        } else {
            return rest_ensure_response(["message" => __("template ID invalid", "all-signs-options-pro")]);
        }

    }

    /**
     * Create template
     * @param \WP_REST_Request $request Full details about the request.
     * @return \WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function create_template($request)
    {

        $config_id = $request->get_param('config_id');
        $template_data = json_decode($request->get_body(), true);

        if ($config_id != 0) {
            $post = get_post($config_id);
            if ($post) {
                $template_data = $this->normalize_show_on_frontend($template_data);
                $meta_value = get_post_meta($config_id, 'asowp-templates', true);
                if (!is_array($meta_value)) {
                    $meta_value = [];
                    $meta_value[0] = $template_data;
                } else {
                    array_push($meta_value, $template_data);
                }

                $response = update_post_meta($config_id, 'asowp-templates', $meta_value);

                if ($response) {
                    return rest_ensure_response(["success" => true, "message" => __("Template added successfuly", "all-signs-options-pro")]);
                } else {
                    return rest_ensure_response(["message" => __("Add template failed", "all-signs-options-pro")]);
                }
            } else {
                return rest_ensure_response(["message" => __("Custom ID invalid", "all-signs-options-pro")]);
            }
        } else {
            return rest_ensure_response(["message" => __("Custom ID invalid", "all-signs-options-pro")]);
        }
    }

    /**
     * Update a template
     * @param \WP_REST_Request $request Full details about the request.
     * @return \WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function update_template($request)
    {
        $config_id = $request->get_param('config_id');
        $template_id = $request->get_param('template_id');

        $template = json_decode($request->get_body(), true);
        if ($config_id != 0) {
            $post = get_post($config_id);
            if ($post) {
                $meta_value = get_post_meta($config_id, 'asowp-templates', true);
                if (!empty($meta_value)) {

                    if (isset($meta_value[$template_id])) {
                        if (!array_key_exists('showOnFrontend', $template)) {
                            if (isset($meta_value[$template_id]['showOnFrontend'])) {
                                $template['showOnFrontend'] = $meta_value[$template_id]['showOnFrontend'];
                            } else {
                                $template['showOnFrontend'] = true;
                            }
                        }
                        $template = $this->normalize_show_on_frontend($template);
                        if ($meta_value[$template_id] == $template) {
                            return rest_ensure_response(["success" => "same", "message" => __("No change observed in template", "all-signs-options-pro")]);
                        } else {
                            if(isset( $template["data"]["templateData"]['sign'])) {

                                $data_filename =  isset($template["data_file"]) ? asowp_get_filename_without_extension($template["data_file"])  :  uniqid('asowp-'.$config_id.'-'.$template_id);
                                $template["data_file"] = asowp_save_large_data($template["data"],$data_filename, 'templates');

                                $template["recaps"] =  [
                                    "customPrice" => isset($template["data"]["cartData"]["custom_price"] ) ?
                                        $template["data"]["cartData"]["custom_price"] : "0" ,

                                    "priceType" => isset($template["data"]["templateData"]["price"]['textAfter']) 
                                        ? $template["data"]["templateData"]["price"]['textAfter'] : "",

                                    "size" => isset($template["data"]["cartData"]["sign"]["size"]["value"])?
                                        $template["data"]["cartData"]["sign"]["size"]["value"]["width"]["value"]  . ' x ' .  
                                        $template["data"]["cartData"]["sign"]["size"]["value"]["height"]["value"] : "0mm x 0mm"  
                                ];
                                $template["data"]=[
                                    'templateData'=>[],
                                    'cartData'=>[],
                                ];
                            }
                            $meta_value[$template_id] = $template;
                            $response = update_post_meta($config_id, 'asowp-templates', $meta_value);

                            if ($response || $template["data_file"]) {
                                return rest_ensure_response(["success" => true, "message" => __("Template updated successfully", "all-signs-options-pro")]);
                            } else {
                                return rest_ensure_response(["message" => __("update template failed", "all-signs-options-pro")]);
                            }
                        }
                    } else {
                        return rest_ensure_response(["message" => __("update template failed", "all-signs-options-pro")]);
                    }


                } else {
                    return rest_ensure_response(["message" => __("No template setting found", "all-signs-options-pro")]);
                }

            } else {
                return rest_ensure_response(["message" => __("Custom ID invalid", "all-signs-options-pro")]);
            }
        } else {
            return rest_ensure_response(["message" => __("Custom ID invalid", "all-signs-options-pro")]);
        }
    }

    /**
     * Delete a template
     * @param \WP_REST_Request $request Full details about the request.
     * @return \WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function delete_template($request)
    {
        $config_id = $request->get_param('config_id');
        $template_id = $request->get_param('template_id');
        if ($config_id != 0) {
            $post = get_post($config_id);
            if ($post) {
                $meta_value = get_post_meta($config_id, 'asowp-templates', true);
                if (!empty($meta_value) && isset($meta_value[$template_id])) {

                    array_splice($meta_value, $template_id, 1);
                    $response = update_post_meta($config_id, 'asowp-templates', $meta_value);

                    if ($response) {
                        return rest_ensure_response(["success" => true, "message" => __("Template deleted successfully", "all-signs-options-pro")]);
                    } else {
                        return rest_ensure_response(["message" => __("Delete template failed", "all-signs-options-pro")]);
                    }
                } else {
                    return rest_ensure_response(["message" => __("No template setting found", "all-signs-options-pro")]);
                }

            } else {
                return rest_ensure_response(["message" => __("Custom ID invalid", "all-signs-options-pro")]);
            }
        } else {
            return rest_ensure_response(["message" => __("Custom ID invalid", "all-signs-options-pro")]);
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
        return true;
    }
}
