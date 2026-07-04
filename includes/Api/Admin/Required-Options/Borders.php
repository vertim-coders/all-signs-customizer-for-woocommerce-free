<?php
namespace ASCWO\Api\Admin\Required_Options;

use WP_REST_Server;

class ASCWO_Api_Required_Options_Borders extends ASCWO_Api_Required_Options_Base
{
    public function register_routes()
    {
        $config_route = $this->rest_base . '/(?P<config_id>\d+)/required-options';

        register_rest_route(
            $this->namespace,
            $config_route . '/borders',
            array(
                array(
                    'methods' => WP_REST_Server::READABLE,
                    'callback' => array($this, 'get_borders'),
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
                    'callback' => array($this, 'update_borders'),
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
            $config_route . '/borders/items',
            array(
                array(
                    'methods' => WP_REST_Server::CREATABLE,
                    'callback' => array($this, 'add_border_item'),
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
            $config_route . '/borders/items/(?P<item_id>[^/]+)',
            array(
                array(
                    'methods' => WP_REST_Server::READABLE,
                    'callback' => array($this, 'get_border_item'),
                    'permission_callback' => array($this, 'permissions_check'),
                    'args' => array(
                        'config_id' => array(
                            'type' => 'integer',
                            'required' => true,
                        ),
                        'item_id' => array(
                            'type' => 'string',
                            'required' => true,
                        ),
                    ),
                ),
                array(
                    'methods' => WP_REST_Server::EDITABLE,
                    'callback' => array($this, 'update_border_item'),
                    'permission_callback' => array($this, 'permissions_check'),
                    'args' => array(
                        'config_id' => array(
                            'type' => 'integer',
                            'required' => true,
                        ),
                        'item_id' => array(
                            'type' => 'string',
                            'required' => true,
                        ),
                    ),
                ),
                array(
                    'methods' => WP_REST_Server::DELETABLE,
                    'callback' => array($this, 'delete_border_item'),
                    'permission_callback' => array($this, 'permissions_check'),
                    'args' => array(
                        'config_id' => array(
                            'type' => 'integer',
                            'required' => true,
                        ),
                        'item_id' => array(
                            'type' => 'string',
                            'required' => true,
                        ),
                    ),
                ),
            )
        );

        register_rest_route(
            $this->namespace,
            $config_route . '/borders/items/(?P<item_id>[^/]+)/default',
            array(
                array(
                    'methods' => WP_REST_Server::EDITABLE,
                    'callback' => array($this, 'set_default_border_item'),
                    'permission_callback' => array($this, 'permissions_check'),
                    'args' => array(
                        'config_id' => array(
                            'type' => 'integer',
                            'required' => true,
                        ),
                        'item_id' => array(
                            'type' => 'string',
                            'required' => true,
                        ),
                    ),
                ),
            )
        );
    }

    public function get_borders($request)
    {
        $config_id = absint($request->get_param('config_id'));
        if (!$config_id) {
            return rest_ensure_response(array('success' => false, 'message' => __('No Configuration found', 'all-signs-customizer-for-woocommerce')));
        }

        $required_options = $this->get_required_options($config_id);
        $value = $this->get_section_items($required_options, 'borders');

        return rest_ensure_response(array(
            'success' => true,
            'data' => array(
                'borders' => $this->borders_response($config_id, $value),
            ),
        ));
    }

    public function update_borders($request)
    {
        return $this->update_section($request, 'borders');
    }

    public function set_default_border_item($request)
    {
        return $this->set_default_section_item(
            $request,
            'borders',
            'border',
            __('Border not found', 'all-signs-customizer-for-woocommerce'),
            __('Default border successfully updated', 'all-signs-customizer-for-woocommerce')
        );
    }

    public function get_border_item($request)
    {
        $config_id = absint($request->get_param('config_id'));
        $item_id = sanitize_text_field((string) $request->get_param('item_id'));
        if (!$config_id) {
            return rest_ensure_response(array('success' => false, 'message' => __('No Configuration found', 'all-signs-customizer-for-woocommerce')));
        }

        $required_options = $this->get_required_options($config_id);
        $borders = $this->section_item_list($required_options, 'borders');
        $item_index = $this->find_section_item_index_by_id($borders, $item_id);
        if ($item_index === null) {
            return rest_ensure_response(array('success' => false, 'message' => __('Border not found', 'all-signs-customizer-for-woocommerce')));
        }

        return rest_ensure_response(array('success' => true, 'data' => array('border' => $borders[$item_index])));
    }

    public function add_border_item($request)
    {
        $config_id = absint($request->get_param('config_id'));
        if (!$config_id) {
            return rest_ensure_response(array('success' => false, 'message' => __('No Configuration found', 'all-signs-customizer-for-woocommerce')));
        }

        $payload = $request->get_json_params();
        $payload = is_array($payload) ? $payload : array();

        // Generate stable item id
        if (!isset($payload['id']) || empty($payload['id'])) {
            $payload['id'] = $this->generate_border_id($payload);
        }

        $required_options = $this->get_required_options($config_id);
        $borders = $this->section_item_list($required_options, 'borders');
        $payload['isDefault'] = isset($payload['isDefault']) ? (bool) $payload['isDefault'] : empty($borders);
        $borders[] = $payload;
        $borders = $this->ensure_single_default_item($borders);
        $required_options = $this->set_section_items($required_options, 'borders', $this->section_value_with_items($required_options, 'borders', $borders));
        $saved = $this->save_required_options($config_id, $required_options);

        return rest_ensure_response($saved === true
            ? array('success' => true, 'message' => __('Border successfully added', 'all-signs-customizer-for-woocommerce'), 'data' => array('border' => end($borders)))
            : array('success' => false, 'message' => __('Border has not been added', 'all-signs-customizer-for-woocommerce')));
    }

    public function update_border_item($request)
    {
        $config_id = absint($request->get_param('config_id'));
        $item_id = sanitize_text_field((string) $request->get_param('item_id'));
        if (!$config_id) {
            return rest_ensure_response(array('success' => false, 'message' => __('No Configuration found', 'all-signs-customizer-for-woocommerce')));
        }

        $payload = $request->get_json_params();
        $payload = is_array($payload) ? $payload : array();

        $required_options = $this->get_required_options($config_id);
        $borders = $this->section_item_list($required_options, 'borders');
        $item_index = $this->find_section_item_index_by_id($borders, $item_id);
        if ($item_index === null) {
            return rest_ensure_response(array('success' => false, 'message' => __('Border not found', 'all-signs-customizer-for-woocommerce')));
        }

        $borders[$item_index] = array_merge($borders[$item_index], $payload);
        $borders = $this->ensure_single_default_item($borders);
        $required_options = $this->set_section_items($required_options, 'borders', $this->section_value_with_items($required_options, 'borders', $borders));
        $saved = $this->save_required_options($config_id, $required_options);

        return rest_ensure_response($saved === true
            ? array('success' => true, 'message' => __('Border successfully edited', 'all-signs-customizer-for-woocommerce'), 'data' => array('border' => $borders[$item_index]))
            : array('success' => false, 'message' => __('Border has not been edited', 'all-signs-customizer-for-woocommerce')));
    }

    public function delete_border_item($request)
    {
        $config_id = absint($request->get_param('config_id'));
        $item_id = sanitize_text_field((string) $request->get_param('item_id'));
        if (!$config_id) {
            return rest_ensure_response(array('success' => false, 'message' => __('No Configuration found', 'all-signs-customizer-for-woocommerce')));
        }

        $required_options = $this->get_required_options($config_id);
        $borders = $this->section_item_list($required_options, 'borders');
        $item_index = $this->find_section_item_index_by_id($borders, $item_id);
        if ($item_index === null) {
            return rest_ensure_response(array('success' => false, 'message' => __('Border not found', 'all-signs-customizer-for-woocommerce')));
        }

        array_splice($borders, $item_index, 1);
        $borders = $this->ensure_single_default_item($borders);
        $required_options = $this->set_section_items($required_options, 'borders', $this->section_value_with_items($required_options, 'borders', $borders));
        $saved = $this->save_required_options($config_id, $required_options);

        return rest_ensure_response($saved === true
            ? array('success' => true, 'message' => __('Border successfully deleted', 'all-signs-customizer-for-woocommerce'), 'data' => array('items' => array_values($borders)))
            : array('success' => false, 'message' => __('Border has not been deleted', 'all-signs-customizer-for-woocommerce')));
    }
}
