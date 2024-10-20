<?php
namespace ASOWP\Api\Admin\Additionals_Options;

use WP_Error;
use WP_Post;
use WP_Query;
use WP_REST_Controller;

/**
 * class for api routes reaching custom additionals
 */
class ASOWP_Api_Customs_Additionals extends WP_REST_Controller
{
    /**
     * [__construct description]
     */
    public function __construct()
    {
        $this->namespace = 'aso/v1';
        $this->rest_base = 'configs/(?P<config_id>\d+)/custom-additionals';
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
                    'callback' => array($this, 'get_all_custom_additionals'),
                    'permission_callback' => array($this, 'get_config_permissions_check'),
                    'args' => array(
                        'config_id' => array(
                            'type' => 'integer',
                            'required' => true,
                        )
                    ),
                ),
                array(
                    'methods' => \WP_REST_Server::CREATABLE,
                    'callback' => array($this, 'add_custom_additional_to_custom_additionals_setting'),
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
            '/' . $this->rest_base . "/update",
            array(
                array(
                    'methods' => \WP_REST_Server::EDITABLE,
                    'callback' => array($this, 'update_custom_additionals'),
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
            '/' . $this->rest_base . "/(?P<custom_additional_id>\d+)",
            array(
                array(
                    'methods' => \WP_REST_Server::READABLE,
                    'callback' => array($this, 'get_custom_additional_info'),
                    'permission_callback' => array($this, 'get_config_permissions_check'),
                    'args' => array(
                        'config_id' => array(
                            'type' => 'integer',
                            'required' => true,
                        ),
                        'custom_additional_id' => array(
                            'type' => 'integer',
                            'required' => true
                        )
                    ),
                ),
                array(
                    'methods' => \WP_REST_Server::EDITABLE,
                    'callback' => array($this, 'update_custom_additional_in_custom_additionals_setting'),
                    'permission_callback' => array($this, 'get_config_permissions_check'),
                    'args' => array(
                        'config_id' => array(
                            'type' => 'integer',
                            'required' => true,
                        ),
                        'custom_additional_id' => array(
                            'type' => 'integer',
                            'required' => true
                        )
                    ),
                ),
                array(
                    'methods' => \WP_REST_Server::DELETABLE,
                    'callback' => array($this, 'delete_custom_additional_in_custom_additionals_setting'),
                    'permission_callback' => array($this, 'get_config_permissions_check'),
                    'args' => array(
                        'config_id' => array(
                            'type' => 'integer',
                            'required' => true,
                        ),
                        'custom_additional_id' => array(
                            'type' => 'integer',
                            'required' => true
                        )
                    ),
                )
            )
        );

    }

    /**
     * Get all custom additionals of aso configuration ID
     * @param \WP_REST_Request $request Full details about the request.
     * @return \WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */

    public function get_all_custom_additionals($request)
    {
        $id = $request->get_param('config_id');
        if ($id != 0) {
            $meta_value = get_post_meta($id, 'asowp-configs-meta', true);

            if (!empty($meta_value)) {
                //$meta_value["data"]["additionalOptions"] = [];
                //update_post_meta($id,'asowp-configs-meta',$meta_value);

                if (isset($meta_value["data"]["additionalOptions"]) && count($meta_value["data"]["additionalOptions"]) > 0) {
                    $custom_additionals_options = $meta_value["data"]["additionalOptions"];
                    return rest_ensure_response($custom_additionals_options);
                }
                return rest_ensure_response(["message" => __("No Additonal Options found", "all-signs-options-pro")]);
            } else {
                return rest_ensure_response(["message" => __("No Additonal Options found", "all-signs-options-pro")]);
            }
        } else {
            return rest_ensure_response(["message" => __("Custom ID invalid", "all-signs-options-pro")]);
        }

    }

    /**
     * Get a custom additional with ID of aso configuration ID
     * @param \WP_REST_Request $request Full details about the request.
     * @return \WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */

    public function get_custom_additional_info($request)
    {
        $id = $request->get_param('config_id');
        $custom_additional_id = $request->get_param('custom_additional_id');
        if ($id != 0) {
            $meta_value = get_post_meta($id, 'asowp-configs-meta', true);

            if (!empty($meta_value)) {

                if (isset($meta_value["data"]["additionalOptions"])) {
                    $custom_additionals = $meta_value["data"]["additionalOptions"];

                    if (isset($custom_additionals[$custom_additional_id])) {
                        return rest_ensure_response($custom_additionals[$custom_additional_id]);
                    }
                    return rest_ensure_response(array("message" => __("No custom found", "all-signs-options-pro")));
                } else {
                    return rest_ensure_response(array("message" => __("No custom found", "all-signs-options-pro")));
                }


            } else {
                return rest_ensure_response(["message" => __("No data found", "all-signs-options-pro")]);
            }
        } else {
            return rest_ensure_response(["message" => __("Custom ID invalid", "all-signs-options-pro")]);
        }

    }

    /**
     * Add custom in custom configuration
     * @param \WP_REST_Request $request Full details about the request.
     * @return \WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function add_custom_additional_to_custom_additionals_setting($request)
    {

        $id = $request->get_param('config_id');
        $custom_additional = json_decode($request->get_body(), true);

        if ($id != 0) {
            $post = get_post($id);
            if ($post) {
                $meta_value = get_post_meta($id, 'asowp-configs-meta', true);
                if (empty($meta_value)) {
                    $meta_value["data"]["additionalOptions"][0] = $custom_additional;
                } else {
                    if (isset($meta_value["data"]["additionalOptions"])) {
                        $custom_additionals = $meta_value["data"]["additionalOptions"];

                        array_push($custom_additionals, $custom_additional);

                        $meta_value["data"]["additionalOptions"] = $custom_additionals;
                    } else {
                        $meta_value["data"]["additionalOptions"][0] = $custom_additional;
                    }
                }

                $response = update_post_meta($id, 'asowp-configs-meta', $meta_value);

                if ($response) {
                    return rest_ensure_response(["success" => true, "message" => __("Option added successfuly", "all-signs-options-pro")]);
                } else {
                    return rest_ensure_response(["message" => __("Add option failed", "all-signs-options-pro")]);
                }
            } else {
                return rest_ensure_response(["message" => __("Custom ID invalid", "all-signs-options-pro")]);
            }
        } else {
            return rest_ensure_response(["message" => __("Custom ID invalid", "all-signs-options-pro")]);
        }
    }
    public function update_custom_additionals($request)
    {

        $id = $request->get_param('config_id');
        $custom_additionals = json_decode($request->get_body(), true);

        if ($id != 0) {
            $post = get_post($id);
            if ($post) {
                $meta_value = get_post_meta($id, 'asowp-configs-meta', true);
                if ($meta_value["data"]["additionalOptions"] == $custom_additionals) {
                    return rest_ensure_response(["success" => "same", "message" => __("No change observe on additionnals options", "all-signs-options-pro")]);
                } else {
                    $meta_value["data"]["additionalOptions"] = $custom_additionals;

                    $response = update_post_meta($id, 'asowp-configs-meta', $meta_value);

                    if ($response) {
                        return rest_ensure_response(["success" => true, "message" => __("Additonnals Option successfully sorted", "all-signs-options-pro")]);
                    } else {
                        return rest_ensure_response(["message" => __("Additonnals Option sort failed", "all-signs-options-pro")]);
                    }
                }
            } else {
                return rest_ensure_response(["message" => __("Custom ID invalid", "all-signs-options-pro")]);
            }
        } else {
            return rest_ensure_response(["message" => __("Custom ID invalid", "all-signs-options-pro")]);
        }
    }

    /**
     * Update a custom in the custom configuration
     * @param \WP_REST_Request $request Full details about the request.
     * @return \WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function update_custom_additional_in_custom_additionals_setting($request)
    {
        $id = $request->get_param('config_id');
        $custom_additional_id = $request->get_param('custom_additional_id');

        $custom_additional = json_decode($request->get_body(), true);
        if ($id != 0) {
            $post = get_post($id);
            if ($post) {
                $meta_value = get_post_meta($id, 'asowp-configs-meta', true);
                if (!empty($meta_value)) {
                    $custom_additionals = $meta_value["data"]["additionalOptions"];

                    if (isset($custom_additionals[$custom_additional_id])) {
                        if ($custom_additionals[$custom_additional_id] == $custom_additional) {
                            return rest_ensure_response(["success" => true, "message" => __("No change observed in option", "all-signs-options-pro")]);
                        } else {
                            $custom_additionals[$custom_additional_id] = $custom_additional;
                            $meta_value["data"]["additionalOptions"] = $custom_additionals;
                            $response = update_post_meta($id, 'asowp-configs-meta', $meta_value);

                            if ($response) {
                                return rest_ensure_response(["success" => true, "message" => __("Option updated successfully", "all-signs-options-pro")]);
                            } else {
                                return rest_ensure_response(["message" => __("update custom additional failed", "all-signs-options-pro")]);
                            }
                        }
                    } else {
                        return rest_ensure_response(["message" => __("update custom additional failed", "all-signs-options-pro")]);
                    }


                } else {
                    return rest_ensure_response(["message" => __("No custom additional setting found", "all-signs-options-pro")]);
                }

            } else {
                return rest_ensure_response(["message" => __("Custom ID invalid", "all-signs-options-pro")]);
            }
        } else {
            return rest_ensure_response(["message" => __("Custom ID invalid", "all-signs-options-pro")]);
        }
    }

    /**
     * Delete a custom in the custom configuration
     * @param \WP_REST_Request $request Full details about the request.
     * @return \WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function delete_custom_additional_in_custom_additionals_setting($request)
    {
        $id = $request->get_param('config_id');
        $custom_additional_id = $request->get_param('custom_additional_id');
        if ($id != 0) {
            $post = get_post($id);
            if ($post) {
                $meta_value = get_post_meta($id, 'asowp-configs-meta', true);
                if (!empty($meta_value["data"]["additionalOptions"])) {
                    $custom_additionals = $meta_value["data"]["additionalOptions"];

                    array_splice($custom_additionals, $custom_additional_id, 1);

                    $meta_value["data"]["additionalOptions"] = $custom_additionals;

                    $response = update_post_meta($id, 'asowp-configs-meta', $meta_value);

                    if ($response) {
                        return rest_ensure_response(["success" => true, "message" => __("Option deleted successfully", "all-signs-options-pro")]);
                    } else {
                        return rest_ensure_response(["message" => __("delete custom additional failed", "all-signs-options-pro")]);
                    }
                } else {
                    return rest_ensure_response(["message" => __("No custom setting found", "all-signs-options-pro")]);
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