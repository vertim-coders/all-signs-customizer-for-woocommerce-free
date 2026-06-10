<?php
namespace ASOWP\Api\Admin\Required_Options;

use WP_REST_Server;

class ASOWP_Api_Required_Options_Shapes extends ASOWP_Api_Required_Options_Base
{
    public function register_routes()
    {
        $config_route = $this->rest_base . '/(?P<config_id>\d+)/required-options';

        register_rest_route(
            $this->namespace,
            $config_route . '/shapes',
            array(
                array(
                    'methods' => WP_REST_Server::READABLE,
                    'callback' => array($this, 'get_shapes'),
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
                    'callback' => array($this, 'update_shapes'),
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
            $config_route . '/shapes/items',
            array(
                array(
                    'methods' => WP_REST_Server::CREATABLE,
                    'callback' => array($this, 'add_shape_item'),
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
            $config_route . '/shapes/items/(?P<item_id>\d+)',
            array(
                array(
                    'methods' => WP_REST_Server::READABLE,
                    'callback' => array($this, 'get_shape_item'),
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
                    'callback' => array($this, 'update_shape_item'),
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
                    'callback' => array($this, 'delete_shape_item'),
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

        register_rest_route(
            $this->namespace,
            $config_route . '/shapes/items/(?P<item_id>\d+)/default',
            array(
                array(
                    'methods' => WP_REST_Server::EDITABLE,
                    'callback' => array($this, 'set_default_shape_item'),
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

    public function get_shapes($request)
    {
        $config_id = absint($request->get_param('config_id'));
        if (!$config_id) {
            return rest_ensure_response(array('success' => false, 'message' => __('No Configuration found', 'all-signs-options-pro')));
        }

        $required_options = $this->get_required_options($config_id);
        $value = $this->get_section_items($required_options, 'shapes');

        return rest_ensure_response(array(
            'success' => true,
            'data' => array(
                'shapes' => $this->shapes_response($config_id, $value),
            ),
        ));
    }

    public function update_shapes($request)
    {
        return $this->update_section($request, 'shapes');
    }

    public function set_default_shape_item($request)
    {
        return $this->set_default_section_item(
            $request,
            'shapes',
            'shape',
            __('Shape not found', 'all-signs-options-pro'),
            __('Default shape successfully updated', 'all-signs-options-pro')
        );
    }

    public function get_shape_item($request)
    {
        $config_id = absint($request->get_param('config_id'));
        $item_id = absint($request->get_param('item_id'));
        if (!$config_id) {
            return rest_ensure_response(array('success' => false, 'message' => __('No Configuration found', 'all-signs-options-pro')));
        }

        $required_options = $this->get_required_options($config_id);
        $shapes = $this->section_item_list($required_options, 'shapes');
        if (!isset($shapes[$item_id])) {
            return rest_ensure_response(array('success' => false, 'message' => __('Shape not found', 'all-signs-options-pro')));
        }

        return rest_ensure_response(array('success' => true, 'data' => array('shape' => $shapes[$item_id])));
    }

        public function add_shape_item($request)
    {
        $config_id = absint($request->get_param('config_id'));
        if (!$config_id) {
            return rest_ensure_response(array('success' => false, 'message' => __('No Configuration found', 'all-signs-options-pro')));
        }

        $payload = json_decode($request->get_body(), true);
        $payload = is_array($payload) ? $payload : array();

        // Generate Shopify-style id
        if (!isset($payload['id']) || empty($payload['id'])) {
            $payload['id'] = $this->generate_shape_id($payload);
        }

        $required_options = $this->get_required_options($config_id);
        $shapes = $this->section_item_list($required_options, 'shapes');
        $payload['isDefault'] = isset($payload['isDefault']) ? (bool) $payload['isDefault'] : empty($shapes);
        $shapes[] = $payload;
        $shapes = $this->ensure_single_default_item($shapes);
        $required_options = $this->set_section_items($required_options, 'shapes', $this->section_value_with_items($required_options, 'shapes', $shapes));
        $saved = $this->save_required_options($config_id, $required_options);

        return rest_ensure_response($saved === true
            ? array('success' => true, 'message' => __('Shape successfully added', 'all-signs-options-pro'), 'data' => array('shape' => end($shapes)))
            : array('success' => false, 'message' => __('Shape has not been added', 'all-signs-options-pro')));
    }

    public function update_shape_item($request)
    {
        $config_id = absint($request->get_param('config_id'));
        $item_id = absint($request->get_param('item_id'));
        if (!$config_id) {
            return rest_ensure_response(array('success' => false, 'message' => __('No Configuration found', 'all-signs-options-pro')));
        }

        $payload = json_decode($request->get_body(), true);
        $payload = is_array($payload) ? $payload : array();

        $required_options = $this->get_required_options($config_id);
        $shapes = $this->section_item_list($required_options, 'shapes');
        if (!isset($shapes[$item_id])) {
            return rest_ensure_response(array('success' => false, 'message' => __('Shape not found', 'all-signs-options-pro')));
        }

        $shapes[$item_id] = array_merge($shapes[$item_id], $payload);
        $shapes = $this->ensure_single_default_item($shapes);
        $required_options = $this->set_section_items($required_options, 'shapes', $this->section_value_with_items($required_options, 'shapes', $shapes));
        $saved = $this->save_required_options($config_id, $required_options);

        return rest_ensure_response($saved === true
            ? array('success' => true, 'message' => __('Shape successfully edited', 'all-signs-options-pro'), 'data' => array('shape' => $shapes[$item_id]))
            : array('success' => false, 'message' => __('Shape has not been edited', 'all-signs-options-pro')));
    }

    public function delete_shape_item($request)
    {
        $config_id = absint($request->get_param('config_id'));
        $item_id = absint($request->get_param('item_id'));
        if (!$config_id) {
            return rest_ensure_response(array('success' => false, 'message' => __('No Configuration found', 'all-signs-options-pro')));
        }

        $required_options = $this->get_required_options($config_id);
        $shapes = $this->section_item_list($required_options, 'shapes');
        if (!isset($shapes[$item_id])) {
            return rest_ensure_response(array('success' => false, 'message' => __('Shape not found', 'all-signs-options-pro')));
        }

        array_splice($shapes, $item_id, 1);
        $shapes = $this->ensure_single_default_item($shapes);
        $required_options = $this->set_section_items($required_options, 'shapes', $this->section_value_with_items($required_options, 'shapes', $shapes));
        $saved = $this->save_required_options($config_id, $required_options);

        return rest_ensure_response($saved === true
            ? array('success' => true, 'message' => __('Shape successfully deleted', 'all-signs-options-pro'), 'data' => array('items' => array_values($shapes)))
            : array('success' => false, 'message' => __('Shape has not been deleted', 'all-signs-options-pro')));
    }
}
