<?php
namespace ASCWO\Api\Admin\Required_Options;

use WP_REST_Server;

class ASCWO_Api_Required_Options_FixingMethods extends ASCWO_Api_Required_Options_Base
{
    public function register_routes()
    {
        $config_route = $this->rest_base . '/(?P<config_id>\d+)/required-options';

        register_rest_route(
            $this->namespace,
            $config_route . '/fixing-methods',
            array(
                array(
                    'methods' => WP_REST_Server::READABLE,
                    'callback' => array($this, 'get_fixing_methods'),
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
                    'callback' => array($this, 'update_fixing_methods'),
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
            $config_route . '/fixing-methods/items',
            array(
                array(
                    'methods' => WP_REST_Server::CREATABLE,
                    'callback' => array($this, 'add_fixing_method_item'),
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
            $config_route . '/fixing-methods/items/(?P<item_id>\d+)',
            array(
                array(
                    'methods' => WP_REST_Server::READABLE,
                    'callback' => array($this, 'get_fixing_method_item'),
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
                    'callback' => array($this, 'update_fixing_method_item'),
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
                    'callback' => array($this, 'delete_fixing_method_item'),
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
            $config_route . '/fixing-methods/items/(?P<item_id>\d+)/default',
            array(
                array(
                    'methods' => WP_REST_Server::EDITABLE,
                    'callback' => array($this, 'set_default_fixing_method_item'),
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

    public function get_fixing_methods($request)
    {
        $config_id = absint($request->get_param('config_id'));
        if (!$config_id) {
            return rest_ensure_response(array('success' => false, 'message' => __('No Configuration found', 'all-signs-customizer-for-woocommerce-pro')));
        }

        $required_options = $this->get_required_options($config_id);
        $value = $this->get_section_items($required_options, 'fixing-methods');

        return rest_ensure_response(array(
            'success' => true,
            'data' => array(
                'fixingMethods' => $this->fixing_methods_response($config_id, $value),
            ),
        ));
    }

    public function update_fixing_methods($request)
    {
        return $this->update_section($request, 'fixing-methods');
    }

    public function set_default_fixing_method_item($request)
    {
        return $this->set_default_section_item(
            $request,
            'fixing-methods',
            'fixingMethod',
            __('Fixing method not found', 'all-signs-customizer-for-woocommerce-pro'),
            __('Default fixing method successfully updated', 'all-signs-customizer-for-woocommerce-pro')
        );
    }

    public function get_fixing_method_item($request)
    {
        $config_id = absint($request->get_param('config_id'));
        $item_id = absint($request->get_param('item_id'));
        if (!$config_id) {
            return rest_ensure_response(array('success' => false, 'message' => __('No Configuration found', 'all-signs-customizer-for-woocommerce-pro')));
        }

        $required_options = $this->get_required_options($config_id);
        $items = $this->section_item_list($required_options, 'fixing-methods');
        if (!isset($items[$item_id])) {
            return rest_ensure_response(array('success' => false, 'message' => __('Fixing method not found', 'all-signs-customizer-for-woocommerce-pro')));
        }

        return rest_ensure_response(array('success' => true, 'data' => array('fixingMethod' => $items[$item_id])));
    }

    public function add_fixing_method_item($request)
    {
        $config_id = absint($request->get_param('config_id'));
        if (!$config_id) {
            return rest_ensure_response(array('success' => false, 'message' => __('No Configuration found', 'all-signs-customizer-for-woocommerce-pro')));
        }

        $payload = $request->get_json_params();
        $payload = is_array($payload) ? $payload : array();

        // Generate stable item id
        if (!isset($payload['id']) || empty($payload['id'])) {
            $payload['id'] = $this->generate_fixing_method_id($payload);
        }

        $required_options = $this->get_required_options($config_id);
        $items = $this->section_item_list($required_options, 'fixing-methods');
        $payload['isDefault'] = isset($payload['isDefault']) ? (bool) $payload['isDefault'] : empty($items);
        $items[] = $payload;
        $items = $this->ensure_single_default_item($items);
        $required_options = $this->set_section_items($required_options, 'fixing-methods', $this->section_value_with_items($required_options, 'fixing-methods', $items));
        $saved = $this->save_required_options($config_id, $required_options);

        return rest_ensure_response($saved === true
            ? array('success' => true, 'message' => __('Fixing method successfully added', 'all-signs-customizer-for-woocommerce-pro'), 'data' => array('fixingMethod' => end($items)))
            : array('success' => false, 'message' => __('Fixing method has not been added', 'all-signs-customizer-for-woocommerce-pro')));
    }

    public function update_fixing_method_item($request)
    {
        $config_id = absint($request->get_param('config_id'));
        $item_id = absint($request->get_param('item_id'));
        if (!$config_id) {
            return rest_ensure_response(array('success' => false, 'message' => __('No Configuration found', 'all-signs-customizer-for-woocommerce-pro')));
        }

        $payload = $request->get_json_params();
        $payload = is_array($payload) ? $payload : array();

        $required_options = $this->get_required_options($config_id);
        $items = $this->section_item_list($required_options, 'fixing-methods');
        if (!isset($items[$item_id])) {
            return rest_ensure_response(array('success' => false, 'message' => __('Fixing method not found', 'all-signs-customizer-for-woocommerce-pro')));
        }

        $items[$item_id] = array_merge($items[$item_id], $payload);
        $items = $this->ensure_single_default_item($items);
        $required_options = $this->set_section_items($required_options, 'fixing-methods', $this->section_value_with_items($required_options, 'fixing-methods', $items));
        $saved = $this->save_required_options($config_id, $required_options);

        return rest_ensure_response($saved === true
            ? array('success' => true, 'message' => __('Fixing method successfully edited', 'all-signs-customizer-for-woocommerce-pro'), 'data' => array('fixingMethod' => $items[$item_id]))
            : array('success' => false, 'message' => __('Fixing method has not been edited', 'all-signs-customizer-for-woocommerce-pro')));
    }

    public function delete_fixing_method_item($request)
    {
        $config_id = absint($request->get_param('config_id'));
        $item_id = absint($request->get_param('item_id'));
        if (!$config_id) {
            return rest_ensure_response(array('success' => false, 'message' => __('No Configuration found', 'all-signs-customizer-for-woocommerce-pro')));
        }

        $required_options = $this->get_required_options($config_id);
        $items = $this->section_item_list($required_options, 'fixing-methods');
        if (!isset($items[$item_id])) {
            return rest_ensure_response(array('success' => false, 'message' => __('Fixing method not found', 'all-signs-customizer-for-woocommerce-pro')));
        }

        array_splice($items, $item_id, 1);
        $items = $this->ensure_single_default_item($items);
        $required_options = $this->set_section_items($required_options, 'fixing-methods', $this->section_value_with_items($required_options, 'fixing-methods', $items));
        $saved = $this->save_required_options($config_id, $required_options);

        return rest_ensure_response($saved === true
            ? array('success' => true, 'message' => __('Fixing method successfully deleted', 'all-signs-customizer-for-woocommerce-pro'), 'data' => array('items' => array_values($items)))
            : array('success' => false, 'message' => __('Fixing method has not been deleted', 'all-signs-customizer-for-woocommerce-pro')));
    }
}
