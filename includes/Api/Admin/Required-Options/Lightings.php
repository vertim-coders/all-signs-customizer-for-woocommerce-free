<?php
namespace ASCWO\Api\Admin\Required_Options;

use WP_REST_Server;

class ASCWO_Api_Required_Options_Lightings extends ASCWO_Api_Required_Options_Base
{
    public function register_routes()
    {
        $config_route = $this->rest_base . '/(?P<config_id>\d+)/required-options';

        register_rest_route(
            $this->namespace,
            $config_route . '/lightings',
            array(
                array(
                    'methods' => WP_REST_Server::READABLE,
                    'callback' => array($this, 'get_lightings'),
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
                    'callback' => array($this, 'update_lightings'),
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
            $config_route . '/lightings/items',
            array(
                array(
                    'methods' => WP_REST_Server::CREATABLE,
                    'callback' => array($this, 'add_lighting_item'),
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
            $config_route . '/lightings/items/(?P<item_id>\d+)',
            array(
                array(
                    'methods' => WP_REST_Server::READABLE,
                    'callback' => array($this, 'get_lighting_item'),
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
                    'callback' => array($this, 'update_lighting_item'),
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
                    'callback' => array($this, 'delete_lighting_item'),
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
            $config_route . '/lightings/items/(?P<item_id>\d+)/default',
            array(
                array(
                    'methods' => WP_REST_Server::EDITABLE,
                    'callback' => array($this, 'set_default_lighting_item'),
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

    public function get_lightings($request)
    {
        return $this->get_section($request, 'lightings', 'lightings');
    }

    public function update_lightings($request)
    {
        return $this->update_section($request, 'lightings');
    }

    public function set_default_lighting_item($request)
    {
        return $this->set_default_section_item(
            $request,
            'lightings',
            'lighting',
            __('Lighting not found', 'all-signs-customizer-for-woocommerce-pro'),
            __('Default lighting successfully updated', 'all-signs-customizer-for-woocommerce-pro')
        );
    }

    public function get_lighting_item($request)
    {
        $config_id = absint($request->get_param('config_id'));
        $item_id = absint($request->get_param('item_id'));
        if (!$config_id) {
            return rest_ensure_response(array('success' => false, 'message' => __('No Configuration found', 'all-signs-customizer-for-woocommerce-pro')));
        }

        $required_options = $this->get_required_options($config_id);
        $items = $this->section_item_list($required_options, 'lightings');
        if (!isset($items[$item_id])) {
            return rest_ensure_response(array('success' => false, 'message' => __('Lighting not found', 'all-signs-customizer-for-woocommerce-pro')));
        }

        return rest_ensure_response(array('success' => true, 'data' => array('lighting' => $this->sanitize_lighting_item($items[$item_id]))));
    }

    public function add_lighting_item($request)
    {
        $config_id = absint($request->get_param('config_id'));
        if (!$config_id) {
            return rest_ensure_response(array('success' => false, 'message' => __('No Configuration found', 'all-signs-customizer-for-woocommerce-pro')));
        }

        $payload = $request->get_json_params();
        $payload = is_array($payload) ? $payload : array();

        if (!isset($payload['id']) || empty($payload['id'])) {
            $payload['id'] = $this->generate_lighting_id($payload);
        }

        $required_options = $this->get_required_options($config_id);
        $items = $this->section_item_list($required_options, 'lightings');
        $payload['isDefault'] = isset($payload['isDefault']) ? (bool) $payload['isDefault'] : empty($items);
        $items[] = $this->sanitize_lighting_item($payload);
        $items = $this->ensure_single_default_item($items);
        $required_options = $this->set_section_items($required_options, 'lightings', $this->section_value_with_items($required_options, 'lightings', $items));
        $saved = $this->save_required_options($config_id, $required_options);

        return rest_ensure_response($saved === true
            ? array('success' => true, 'message' => __('Lighting successfully added', 'all-signs-customizer-for-woocommerce-pro'), 'data' => array('lighting' => end($items)))
            : array('success' => false, 'message' => __('Lighting has not been added', 'all-signs-customizer-for-woocommerce-pro')));
    }

    public function update_lighting_item($request)
    {
        $config_id = absint($request->get_param('config_id'));
        $item_id = absint($request->get_param('item_id'));
        if (!$config_id) {
            return rest_ensure_response(array('success' => false, 'message' => __('No Configuration found', 'all-signs-customizer-for-woocommerce-pro')));
        }

        $payload = $request->get_json_params();
        $payload = is_array($payload) ? $payload : array();

        $required_options = $this->get_required_options($config_id);
        $items = $this->section_item_list($required_options, 'lightings');
        if (!isset($items[$item_id])) {
            return rest_ensure_response(array('success' => false, 'message' => __('Lighting not found', 'all-signs-customizer-for-woocommerce-pro')));
        }

        $items[$item_id] = $this->sanitize_lighting_item(array_merge($items[$item_id], $payload));
        $items = $this->ensure_single_default_item($items);
        $required_options = $this->set_section_items($required_options, 'lightings', $this->section_value_with_items($required_options, 'lightings', $items));
        $saved = $this->save_required_options($config_id, $required_options);

        return rest_ensure_response($saved === true
            ? array('success' => true, 'message' => __('Lighting successfully edited', 'all-signs-customizer-for-woocommerce-pro'), 'data' => array('lighting' => $items[$item_id]))
            : array('success' => false, 'message' => __('Lighting has not been edited', 'all-signs-customizer-for-woocommerce-pro')));
    }

    public function delete_lighting_item($request)
    {
        $config_id = absint($request->get_param('config_id'));
        $item_id = absint($request->get_param('item_id'));
        if (!$config_id) {
            return rest_ensure_response(array('success' => false, 'message' => __('No Configuration found', 'all-signs-customizer-for-woocommerce-pro')));
        }

        $required_options = $this->get_required_options($config_id);
        $items = $this->section_item_list($required_options, 'lightings');
        if (!isset($items[$item_id])) {
            return rest_ensure_response(array('success' => false, 'message' => __('Lighting not found', 'all-signs-customizer-for-woocommerce-pro')));
        }

        array_splice($items, $item_id, 1);
        $items = $this->ensure_single_default_item($items);
        $required_options = $this->set_section_items($required_options, 'lightings', $this->section_value_with_items($required_options, 'lightings', $items));
        $saved = $this->save_required_options($config_id, $required_options);

        return rest_ensure_response($saved === true
            ? array('success' => true, 'message' => __('Lighting successfully deleted', 'all-signs-customizer-for-woocommerce-pro'), 'data' => array('items' => array_values($items)))
            : array('success' => false, 'message' => __('Lighting has not been deleted', 'all-signs-customizer-for-woocommerce-pro')));
    }

    private function sanitize_lighting_item(array $lighting): array
    {
        $hex = isset($lighting['hexCode']) ? sanitize_hex_color($lighting['hexCode']) : '';
        if (!$hex) {
            $hex = '#ffcf5a';
        }

        return array(
            'id' => isset($lighting['id']) && $lighting['id'] !== '' ? sanitize_key($lighting['id']) : $this->generate_lighting_id($lighting),
            'label' => isset($lighting['label']) ? sanitize_text_field($lighting['label']) : '',
            'hexCode' => $hex,
            'isDefault' => isset($lighting['isDefault']) ? (bool) $lighting['isDefault'] : false,
            'additionalPrice' => isset($lighting['additionalPrice']) ? (float) $lighting['additionalPrice'] : 0,
        );
    }
}
