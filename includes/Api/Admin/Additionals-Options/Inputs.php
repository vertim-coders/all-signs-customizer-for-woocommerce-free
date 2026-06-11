<?php
namespace ASOWP\Api\Admin\Additionals_Options;

use WP_Error;
use WP_Post;
use WP_Query;

/**
 * class for api routes reaching additional options inputs
 */
class ASOWP_Api_Additional_Options_Inputs extends ASOWP_Api_Customs_Additionals_Base
{
    /**
     * [__construct description]
     */
    public function __construct()
    {
        $this->namespace = 'asowp/v1';
        $this->rest_base = 'configs/(?P<config_id>\d+)/additional-options/inputs';
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
                    'callback' => array($this, 'get_all_inputs'),
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
                    'callback' => array($this, 'add_input_to_inputs_setting'),
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
                    'callback' => array($this, 'update_inputs'),
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
            '/' . $this->rest_base . "/update",
            array(
                array(
                    'methods' => \WP_REST_Server::EDITABLE,
                    'callback' => array($this, 'update_inputs'),
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
            '/' . $this->rest_base . "/items/(?P<input_id>\d+)",
            array(
                array(
                    'methods' => \WP_REST_Server::READABLE,
                    'callback' => array($this, 'get_input_info'),
                    'permission_callback' => array($this, 'get_config_permissions_check'),
                    'args' => array(
                        'config_id' => array(
                            'type' => 'integer',
                            'required' => true,
                        ),
                        'input_id' => array(
                            'type' => 'integer',
                            'required' => true
                        )
                    ),
                ),
                array(
                    'methods' => \WP_REST_Server::EDITABLE,
                    'callback' => array($this, 'update_input_in_inputs_setting'),
                    'permission_callback' => array($this, 'get_config_permissions_check'),
                    'args' => array(
                        'config_id' => array(
                            'type' => 'integer',
                            'required' => true,
                        ),
                        'input_id' => array(
                            'type' => 'integer',
                            'required' => true
                        )
                    ),
                ),
                array(
                    'methods' => \WP_REST_Server::DELETABLE,
                    'callback' => array($this, 'delete_input_in_inputs_setting'),
                    'permission_callback' => array($this, 'get_config_permissions_check'),
                    'args' => array(
                        'config_id' => array(
                            'type' => 'integer',
                            'required' => true,
                        ),
                        'input_id' => array(
                            'type' => 'integer',
                            'required' => true
                        )
                    ),
                )
            )
        );

    }

    private function get_inputs_section($meta_value): array
    {
        if (!is_array($meta_value)) {
            return array();
        }

        $additional_options = $meta_value['additionalOptions'] ?? null;
        if (is_array($additional_options) && isset($additional_options['inputs']) && is_array($additional_options['inputs'])) {
            return $additional_options['inputs'];
        }

        $data_additional_options = $meta_value['data']['additionalOptions'] ?? null;
        if (is_array($data_additional_options)) {
            if (isset($data_additional_options['inputs']) && is_array($data_additional_options['inputs'])) {
                return $data_additional_options['inputs'];
            }
        }

        return array();
    }

    private function get_inputs_from_meta($meta_value): array
    {
        $section = $this->get_inputs_section($meta_value);

        if (isset($section['items']) && is_array($section['items'])) {
            return array_values($section['items']);
        }

        if (array_keys($section) === range(0, count($section) - 1)) {
            return array_values($section);
        }

        return array();
    }

    private function ensure_inputs_section($meta_value): array
    {
        $meta_value = is_array($meta_value) ? $meta_value : array();
        if (!isset($meta_value['additionalOptions']) || !is_array($meta_value['additionalOptions'])) {
            $meta_value['additionalOptions'] = array();
        }

        $section = $this->get_inputs_section($meta_value);
        if (empty($section)) {
            $section = array(
                'label' => __('Inputs', 'all-signs-options-pro'),
                'description' => '',
                'items' => array(),
            );
        }

        if (isset($section['items']) && !is_array($section['items'])) {
            $section['items'] = array();
        }

        if (!isset($section['label'])) {
            $section['label'] = __('Inputs', 'all-signs-options-pro');
        }

        if (!isset($section['description'])) {
            $section['description'] = '';
        }

        $meta_value['additionalOptions']['inputs'] = $section;
        return $meta_value;
    }

    /**
     * Get all input additionals of aso configuration ID
     * @param \WP_REST_Request $request Full details about the request.
     * @return \WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */

    public function get_all_inputs($request)
    {
        $id = $request->get_param('config_id');
        if ($id != 0) {
            $meta_value = get_post_meta($id, 'asowp-configs-meta', true);

            if (!empty($meta_value)) {
                $inputs_options = $this->get_inputs_from_meta($meta_value);
                if (count($inputs_options) > 0) {
                    return rest_ensure_response($inputs_options);
                }
                return rest_ensure_response(["message" => __("No Additonal Inputs found", "all-signs-options-pro")]);
            } else {
                return rest_ensure_response(["message" => __("No Additonal Inputs found", "all-signs-options-pro")]);
            }
        } else {
            return rest_ensure_response(["message" => __("Inputs ID invalid", "all-signs-options-pro")]);
        }

    }

    /**
     * Get a input additional with ID of aso configuration ID
     * @param \WP_REST_Request $request Full details about the request.
     * @return \WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */

    public function get_input_info($request)
    {
        $id = $request->get_param('config_id');
        $input_id = $request->get_param('input_id');
        if ($id != 0) {
            $meta_value = get_post_meta($id, 'asowp-configs-meta', true);

            if (!empty($meta_value)) {
                $inputs = $this->get_inputs_from_meta($meta_value);

                if (isset($inputs[$input_id])) {
                    return rest_ensure_response($inputs[$input_id]);
                }
                return rest_ensure_response(array("message" => __("No input found", "all-signs-options-pro")));

            } else {
                return rest_ensure_response(["message" => __("No data found", "all-signs-options-pro")]);
            }
        } else {
            return rest_ensure_response(["message" => __("Inputs ID invalid", "all-signs-options-pro")]);
        }

    }

    /**
     * Add input in input configuration
     * @param \WP_REST_Request $request Full details about the request.
     * @return \WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function add_input_to_inputs_setting($request)
    {

        $id = $request->get_param('config_id');
        $input = json_decode($request->get_body(), true);

        if ($id != 0) {
            $post = get_post($id);
            if ($post) {
                $meta_value = get_post_meta($id, 'asowp-configs-meta', true);
                $meta_value = $this->ensure_inputs_section($meta_value);
                $meta_value["additionalOptions"]["inputs"]["items"][] = $input;

                $response = $this->save_meta((int) $id, $meta_value);

                if ($response) {
                    return rest_ensure_response(["success" => true, "message" => __("Option added successfuly", "all-signs-options-pro")]);
                } else {
                    return rest_ensure_response(["message" => __("Add option failed", "all-signs-options-pro")]);
                }
            } else {
                return rest_ensure_response(["message" => __("Input ID invalid", "all-signs-options-pro")]);
            }
        } else {
            return rest_ensure_response(["message" => __("Input ID invalid", "all-signs-options-pro")]);
        }
    }
    public function update_inputs($request)
    {

        $id = $request->get_param('config_id');
        $inputs = json_decode($request->get_body(), true);

        if ($id != 0) {
            $post = get_post($id);
            if ($post) {
                $meta_value = get_post_meta($id, 'asowp-configs-meta', true);
                    $meta_value = $this->ensure_inputs_section($meta_value);
                    $current_inputs = $meta_value["additionalOptions"]["inputs"]["items"] ?? array();
                    if ($current_inputs == $inputs) {
                        return rest_ensure_response(["success" => "same", "message" => __("No change observe on additionnals options", "all-signs-options-pro")]);
                    } else {
                        $meta_value["additionalOptions"]["inputs"]["items"] = array_values(is_array($inputs) ? $inputs : array());

                    $response = $this->save_meta((int) $id, $meta_value);

                    if ($response) {
                        return rest_ensure_response(["success" => true, "message" => __("Additonnals Option successfully sorted", "all-signs-options-pro")]);
                    } else {
                        return rest_ensure_response(["message" => __("Additonnals Option sort failed", "all-signs-options-pro")]);
                    }
                }
            } else {
                return rest_ensure_response(["message" => __("Input ID invalid", "all-signs-options-pro")]);
            }
        } else {
            return rest_ensure_response(["message" => __("Input ID invalid", "all-signs-options-pro")]);
        }
    }

    /**
     * Update a input in the input configuration
     * @param \WP_REST_Request $request Full details about the request.
     * @return \WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function update_input_in_inputs_setting($request)
    {
        $id = $request->get_param('config_id');
        $input_id = $request->get_param('input_id');

        $input = json_decode($request->get_body(), true);
        if ($id != 0) {
            $post = get_post($id);
            if ($post) {
                $meta_value = get_post_meta($id, 'asowp-configs-meta', true);
                if (!empty($meta_value)) {
                    $meta_value = $this->ensure_inputs_section($meta_value);
                    $inputs = $meta_value["additionalOptions"]["inputs"]["items"] ?? array();

                    if (isset($inputs[$input_id])) {
                        if ($inputs[$input_id] == $input) {
                            return rest_ensure_response(["success" => true, "message" => __("No change observed in option", "all-signs-options-pro")]);
                        } else {
                            $inputs[$input_id] = $input;
                            $meta_value["additionalOptions"]["inputs"]["items"] = array_values($inputs);
                            $response = $this->save_meta((int) $id, $meta_value);

                            if ($response) {
                                return rest_ensure_response(["success" => true, "message" => __("Option updated successfully", "all-signs-options-pro")]);
                            } else {
                                return rest_ensure_response(["message" => __("update input additional failed", "all-signs-options-pro")]);
                            }
                        }
                    } else {
                        return rest_ensure_response(["message" => __("update input additional failed", "all-signs-options-pro")]);
                    }


                } else {
                    return rest_ensure_response(["message" => __("No input additional setting found", "all-signs-options-pro")]);
                }

            } else {
                return rest_ensure_response(["message" => __("Input ID invalid", "all-signs-options-pro")]);
            }
        } else {
            return rest_ensure_response(["message" => __("Input ID invalid", "all-signs-options-pro")]);
        }
    }

    /**
     * Delete a input in the input configuration
     * @param \WP_REST_Request $request Full details about the request.
     * @return \WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function delete_input_in_inputs_setting($request)
    {
        $id = $request->get_param('config_id');
        $input_id = $request->get_param('input_id');
        if ($id != 0) {
            $post = get_post($id);
            if ($post) {
                $meta_value = get_post_meta($id, 'asowp-configs-meta', true);
                $meta_value = $this->ensure_inputs_section($meta_value);
                if (!empty($meta_value["additionalOptions"]["inputs"]["items"])) {
                    $inputs = $meta_value["additionalOptions"]["inputs"]["items"];

                    array_splice($inputs, $input_id, 1);

                    $meta_value["additionalOptions"]["inputs"]["items"] = array_values($inputs);

                    $response = $this->save_meta((int) $id, $meta_value);

                    if ($response) {
                        return rest_ensure_response(["success" => true, "message" => __("Option deleted successfully", "all-signs-options-pro")]);
                    } else {
                        return rest_ensure_response(["message" => __("delete input additional failed", "all-signs-options-pro")]);
                    }
                } else {
                    return rest_ensure_response(["message" => __("No input setting found", "all-signs-options-pro")]);
                }

            } else {
                return rest_ensure_response(["message" => __("Input ID invalid", "all-signs-options-pro")]);
            }
        } else {
            return rest_ensure_response(["message" => __("Input ID invalid", "all-signs-options-pro")]);
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
