<?php
namespace ASOWP\Api\Admin\Required_Options;

use WP_REST_Server;

class ASOWP_Api_Required_Options_Colors extends ASOWP_Api_Required_Options_Base
{
    public function register_routes()
    {
        $config_route = $this->rest_base . '/(?P<config_id>\d+)/required-options';

        register_rest_route(
            $this->namespace,
            $config_route . '/colors',
            array(
                array(
                    'methods' => WP_REST_Server::READABLE,
                    'callback' => array($this, 'get_colors'),
                    'permission_callback' => array($this, 'permissions_check'),
                    'args' => array(
                        'config_id' => array(
                            'type' => 'integer',
                            'required' => true,
                        ),
                    ),
                ),
                array(
                    'methods' => WP_REST_Server::EDITABLE,
                    'callback' => array($this, 'update_colors'),
                    'permission_callback' => array($this, 'permissions_check'),
                    'args' => array(
                        'config_id' => array(
                            'type' => 'integer',
                            'required' => true,
                        ),
                    ),
                ),
            )
        );

        register_rest_route(
            $this->namespace,
            $config_route . '/colors/items',
            array(
                array(
                    'methods' => WP_REST_Server::CREATABLE,
                    'callback' => array($this, 'add_color_item'),
                    'permission_callback' => array($this, 'permissions_check'),
                    'args' => array(
                        'config_id' => array(
                            'type' => 'integer',
                            'required' => true,
                        ),
                    ),
                ),
            )
        );

        register_rest_route(
            $this->namespace,
            $config_route . '/colors/items/(?P<item_id>\d+)',
            array(
                array(
                    'methods' => WP_REST_Server::READABLE,
                    'callback' => array($this, 'get_color_item'),
                    'permission_callback' => array($this, 'permissions_check'),
                    'args' => array(
                        'config_id' => array(
                            'type' => 'integer',
                            'required' => true,
                        ),
                        'item_id' => array(
                            'type' => 'integer',
                            'required' => true,
                        ),
                    ),
                ),
                array(
                    'methods' => WP_REST_Server::EDITABLE,
                    'callback' => array($this, 'update_color_item'),
                    'permission_callback' => array($this, 'permissions_check'),
                    'args' => array(
                        'config_id' => array(
                            'type' => 'integer',
                            'required' => true,
                        ),
                        'item_id' => array(
                            'type' => 'integer',
                            'required' => true,
                        ),
                    ),
                ),
                array(
                    'methods' => WP_REST_Server::DELETABLE,
                    'callback' => array($this, 'delete_color_item'),
                    'permission_callback' => array($this, 'permissions_check'),
                    'args' => array(
                        'config_id' => array(
                            'type' => 'integer',
                            'required' => true,
                        ),
                        'item_id' => array(
                            'type' => 'integer',
                            'required' => true,
                        ),
                    ),
                ),
            )
        );
    }

    public function get_colors($request)
    {
        return $this->get_section($request, 'colors', 'colors');
    }

    public function update_colors($request)
    {
        return $this->update_section($request, 'colors');
    }

    public function get_color_item($request)
    {
        $config_id = absint($request->get_param('config_id'));
        $item_id = absint($request->get_param('item_id'));
        if (!$config_id) {
            return rest_ensure_response(array('success' => false, 'message' => __('No Configuration found', 'all-signs-options-pro')));
        }

        $required_options = $this->get_required_options($config_id);
        $colors = $this->section_item_list($required_options, 'colors');
        if (!isset($colors[$item_id])) {
            return rest_ensure_response(array('success' => false, 'message' => __('Color not found', 'all-signs-options-pro')));
        }

        return rest_ensure_response(array('success' => true, 'data' => array('color' => $colors[$item_id])));
    }

    public function add_color_item($request)
    {
        $config_id = absint($request->get_param('config_id'));
        if (!$config_id) {
            return rest_ensure_response(array('success' => false, 'message' => __('No Configuration found', 'all-signs-options-pro')));
        }

        $payload = json_decode($request->get_body(), true);
        $payload = is_array($payload) ? $payload : array();

        $required_options = $this->get_required_options($config_id);
        $colors_section = $this->section_value($required_options, 'colors', $this->simple_section_default('colors'));
        $colors = $this->section_item_list($required_options, 'colors');
        $colors[] = $payload;
        $colors = $this->ensure_single_default_item($colors);
        $required_options = $this->set_section_items($required_options, 'colors', $this->section_value_with_items($required_options, 'colors', $colors));
        $saved = $this->save_required_options($config_id, $required_options);

        return rest_ensure_response($saved === true
            ? array('success' => true, 'message' => __('Color successfully added', 'all-signs-options-pro'), 'data' => array('color' => end($colors)))
            : array('success' => false, 'message' => __('Color has not been added', 'all-signs-options-pro')));
    }

    public function update_color_item($request)
    {
        $config_id = absint($request->get_param('config_id'));
        $item_id = absint($request->get_param('item_id'));
        if (!$config_id) {
            return rest_ensure_response(array('success' => false, 'message' => __('No Configuration found', 'all-signs-options-pro')));
        }

        $payload = json_decode($request->get_body(), true);
        $payload = is_array($payload) ? $payload : array();

        $required_options = $this->get_required_options($config_id);
        $colors = $this->section_item_list($required_options, 'colors');
        if (!isset($colors[$item_id])) {
            return rest_ensure_response(array('success' => false, 'message' => __('Color not found', 'all-signs-options-pro')));
        }

        $colors[$item_id] = array_merge($colors[$item_id], $payload);
        $colors = $this->ensure_single_default_item($colors);
        $required_options = $this->set_section_items($required_options, 'colors', $this->section_value_with_items($required_options, 'colors', $colors));
        $saved = $this->save_required_options($config_id, $required_options);

        return rest_ensure_response($saved === true
            ? array('success' => true, 'message' => __('Color successfully edited', 'all-signs-options-pro'), 'data' => array('color' => $colors[$item_id]))
            : array('success' => false, 'message' => __('Color has not been edited', 'all-signs-options-pro')));
    }

    public function delete_color_item($request)
    {
        $config_id = absint($request->get_param('config_id'));
        $item_id = absint($request->get_param('item_id'));
        if (!$config_id) {
            return rest_ensure_response(array('success' => false, 'message' => __('No Configuration found', 'all-signs-options-pro')));
        }

        $required_options = $this->get_required_options($config_id);
        $colors = $this->section_item_list($required_options, 'colors');
        if (!isset($colors[$item_id])) {
            return rest_ensure_response(array('success' => false, 'message' => __('Color not found', 'all-signs-options-pro')));
        }

        array_splice($colors, $item_id, 1);
        $colors = $this->ensure_single_default_item($colors);
        $required_options = $this->set_section_items($required_options, 'colors', $this->section_value_with_items($required_options, 'colors', $colors));
        $saved = $this->save_required_options($config_id, $required_options);

        return rest_ensure_response($saved === true
            ? array('success' => true, 'message' => __('Color successfully deleted', 'all-signs-options-pro'), 'data' => array('items' => array_values($colors)))
            : array('success' => false, 'message' => __('Color has not been deleted', 'all-signs-options-pro')));
    }
}
