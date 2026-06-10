<?php
namespace ASOWP\Api\Admin\Additionals_Options;

use WP_REST_Server;

class ASOWP_Api_Customs_Additionals_Components extends ASOWP_Api_Customs_Additionals_Base
{
    public function register_routes()
    {
        $base_route = '/' . $this->rest_base . '/(?P<config_id>\d+)/additional-options/components';

        register_rest_route(
            $this->namespace,
            $base_route,
            array(
                array(
                    'methods' => WP_REST_Server::READABLE,
                    'callback' => array($this, 'get_components'),
                    'permission_callback' => array($this, 'get_config_permissions_check'),
                    'args' => array(
                        'config_id' => array(
                            'type' => 'integer',
                            'required' => true,
                        ),
                    ),
                ),
                array(
                    'methods' => WP_REST_Server::CREATABLE,
                    'callback' => array($this, 'add_component'),
                    'permission_callback' => array($this, 'get_config_permissions_check'),
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
            $base_route . '/items/(?P<component_id>[^/]+)',
            array(
                array(
                    'methods' => WP_REST_Server::READABLE,
                    'callback' => array($this, 'get_component'),
                    'permission_callback' => array($this, 'get_config_permissions_check'),
                    'args' => array(
                        'config_id' => array(
                            'type' => 'integer',
                            'required' => true,
                        ),
                        'component_id' => array(
                            'type' => 'string',
                            'required' => true,
                        ),
                    ),
                ),
                array(
                    'methods' => WP_REST_Server::EDITABLE,
                    'callback' => array($this, 'update_component'),
                    'permission_callback' => array($this, 'get_config_permissions_check'),
                    'args' => array(
                        'config_id' => array(
                            'type' => 'integer',
                            'required' => true,
                        ),
                        'component_id' => array(
                            'type' => 'string',
                            'required' => true,
                        ),
                    ),
                ),
                array(
                    'methods' => WP_REST_Server::DELETABLE,
                    'callback' => array($this, 'delete_component'),
                    'permission_callback' => array($this, 'get_config_permissions_check'),
                    'args' => array(
                        'config_id' => array(
                            'type' => 'integer',
                            'required' => true,
                        ),
                        'component_id' => array(
                            'type' => 'string',
                            'required' => true,
                        ),
                    ),
                ),
            )
        );

        register_rest_route(
            $this->namespace,
            $base_route . '/items/(?P<component_id>[^/]+)/options',
            array(
                array(
                    'methods' => WP_REST_Server::READABLE,
                    'callback' => array($this, 'get_component_options'),
                    'permission_callback' => array($this, 'get_config_permissions_check'),
                    'args' => array(
                        'config_id' => array(
                            'type' => 'integer',
                            'required' => true,
                        ),
                        'component_id' => array(
                            'type' => 'string',
                            'required' => true,
                        ),
                    ),
                ),
                array(
                    'methods' => WP_REST_Server::CREATABLE,
                    'callback' => array($this, 'add_option'),
                    'permission_callback' => array($this, 'get_config_permissions_check'),
                    'args' => array(
                        'config_id' => array(
                            'type' => 'integer',
                            'required' => true,
                        ),
                        'component_id' => array(
                            'type' => 'string',
                            'required' => true,
                        ),
                    ),
                ),
            )
        );

        register_rest_route(
            $this->namespace,
            $base_route . '/items/(?P<component_id>[^/]+)/options/(?P<option_id>[^/]+)',
            array(
                array(
                    'methods' => WP_REST_Server::READABLE,
                    'callback' => array($this, 'get_option'),
                    'permission_callback' => array($this, 'get_config_permissions_check'),
                    'args' => array(
                        'config_id' => array(
                            'type' => 'integer',
                            'required' => true,
                        ),
                        'component_id' => array(
                            'type' => 'string',
                            'required' => true,
                        ),
                        'option_id' => array(
                            'type' => 'string',
                            'required' => true,
                        ),
                    ),
                ),
                array(
                    'methods' => WP_REST_Server::EDITABLE,
                    'callback' => array($this, 'update_option'),
                    'permission_callback' => array($this, 'get_config_permissions_check'),
                    'args' => array(
                        'config_id' => array(
                            'type' => 'integer',
                            'required' => true,
                        ),
                        'component_id' => array(
                            'type' => 'string',
                            'required' => true,
                        ),
                        'option_id' => array(
                            'type' => 'string',
                            'required' => true,
                        ),
                    ),
                ),
                array(
                    'methods' => WP_REST_Server::DELETABLE,
                    'callback' => array($this, 'delete_option'),
                    'permission_callback' => array($this, 'get_config_permissions_check'),
                    'args' => array(
                        'config_id' => array(
                            'type' => 'integer',
                            'required' => true,
                        ),
                        'component_id' => array(
                            'type' => 'string',
                            'required' => true,
                        ),
                        'option_id' => array(
                            'type' => 'string',
                            'required' => true,
                        ),
                    ),
                ),
            )
        );
    }

    private function component_response(array $component): array
    {
        return array(
            'data' => $component,
        );
    }

    private function get_components_items(int $config_id): array
    {
        return $this->get_section_items($config_id, 'components');
    }

    private function save_components_items(int $config_id, array $components)
    {
        return $this->set_section_items($config_id, 'components', $components, 'Additional Components', '');
    }

    private function filter_components_by_material(array $components, $material_id): array
    {
        $material_id = (string) $material_id;
        if ($material_id === '') {
            return array_values($components);
        }

        $filtered = array();
        foreach ($components as $component) {
            if (!is_array($component)) {
                continue;
            }

            $rules = isset($component['rulesByMaterial']) && is_array($component['rulesByMaterial']) ? $component['rulesByMaterial'] : array();
            if (isset($rules[$material_id])) {
                $filtered[] = $component;
                continue;
            }

            if ((string) ($component['materialId'] ?? '') === $material_id) {
                $filtered[] = $component;
                continue;
            }

            if (empty($rules) && empty($material_id)) {
                $filtered[] = $component;
            }
        }

        return array_values($filtered);
    }

    public function get_components($request)
    {
        $config_id = absint($request->get_param('config_id'));
        $material_id = $request->get_param('material_id');
        if (!$config_id) {
            return rest_ensure_response(array('message' => __('Custom ID invalid', 'all-signs-options-pro')));
        }

        $components = $this->get_components_items($config_id);
        $components = $this->filter_components_by_material($components, $material_id);

        if (!empty($components)) {
            return rest_ensure_response(array_values($components));
        }

        return rest_ensure_response(array('message' => __('No additional components found', 'all-signs-options-pro')));
    }

    public function get_component($request)
    {
        $config_id = absint($request->get_param('config_id'));
        $component_id = (string) $request->get_param('component_id');
        $components = $this->get_components_items($config_id);
        $index = $this->find_item_index($components, $component_id);

        if ($config_id && $index !== null && isset($components[$index])) {
            return rest_ensure_response($this->component_response($components[$index]));
        }

        return rest_ensure_response(array('message' => __('No component found', 'all-signs-options-pro')));
    }

    public function add_component($request)
    {
        $config_id = absint($request->get_param('config_id'));
        $material_id = (string) $request->get_param('material_id');
        $payload = json_decode($request->get_body(), true);
        if (!is_array($payload)) {
            $payload = array();
        }

        $components = $this->get_components_items($config_id);
        $payload['id'] = isset($payload['id']) && $payload['id'] !== '' ? (string) $payload['id'] : 'component-' . (count($components) + 1);
        $payload['rulesByMaterial'] = isset($payload['rulesByMaterial']) && is_array($payload['rulesByMaterial']) ? $payload['rulesByMaterial'] : array();
        if ($material_id !== '') {
            $payload['rulesByMaterial'][$material_id] = array('enabled' => true);
        }
        $payload['options'] = isset($payload['options']) && is_array($payload['options']) ? array_values($payload['options']) : array();
        $components[] = $payload;

        $saved = $this->save_components_items($config_id, $components);
        if ($saved === true) {
            return rest_ensure_response(array('success' => true, 'message' => __('Component successfully added', 'all-signs-options-pro')));
        }

        return rest_ensure_response(array('success' => false, 'message' => __('Component has not been added', 'all-signs-options-pro')));
    }

    public function update_component($request)
    {
        $config_id = absint($request->get_param('config_id'));
        $component_id = (string) $request->get_param('component_id');
        $material_id = (string) $request->get_param('material_id');
        $payload = json_decode($request->get_body(), true);
        if (!is_array($payload)) {
            $payload = array();
        }

        $components = $this->get_components_items($config_id);
        $index = $this->find_item_index($components, $component_id);
        if ($index === null) {
            return rest_ensure_response(array('success' => false, 'message' => __('Component not found', 'all-signs-options-pro')));
        }

        $payload['id'] = isset($payload['id']) && $payload['id'] !== '' ? (string) $payload['id'] : (isset($components[$index]['id']) ? $components[$index]['id'] : $component_id);
        $payload['rulesByMaterial'] = isset($payload['rulesByMaterial']) && is_array($payload['rulesByMaterial']) ? $payload['rulesByMaterial'] : (isset($components[$index]['rulesByMaterial']) && is_array($components[$index]['rulesByMaterial']) ? $components[$index]['rulesByMaterial'] : array());
        if ($material_id !== '') {
            $payload['rulesByMaterial'][$material_id] = array('enabled' => true);
        }
        $payload['options'] = isset($payload['options']) && is_array($payload['options']) ? array_values($payload['options']) : array();
        $components[$index] = $payload;

        $saved = $this->save_components_items($config_id, $components);
        if ($saved === true) {
            return rest_ensure_response(array('success' => true, 'message' => __('Component successfully updated', 'all-signs-options-pro')));
        }

        return rest_ensure_response(array('success' => false, 'message' => __('Component has not been updated', 'all-signs-options-pro')));
    }

    public function delete_component($request)
    {
        $config_id = absint($request->get_param('config_id'));
        $component_id = (string) $request->get_param('component_id');
        $components = $this->get_components_items($config_id);
        $index = $this->find_item_index($components, $component_id);

        if ($index === null) {
            return rest_ensure_response(array('success' => false, 'message' => __('Component not found', 'all-signs-options-pro')));
        }

        array_splice($components, $index, 1);
        $saved = $this->save_components_items($config_id, $components);
        if ($saved === true) {
            return rest_ensure_response(array('success' => true, 'message' => __('Component successfully deleted', 'all-signs-options-pro')));
        }

        return rest_ensure_response(array('success' => false, 'message' => __('Component has not been deleted', 'all-signs-options-pro')));
    }

    public function get_component_options($request)
    {
        $config_id = absint($request->get_param('config_id'));
        $component_id = (string) $request->get_param('component_id');
        $components = $this->get_components_items($config_id);
        $index = $this->find_item_index($components, $component_id);

        if ($config_id && $index !== null && isset($components[$index])) {
            return rest_ensure_response($this->component_response($components[$index]));
        }

        return rest_ensure_response(array('message' => __('No component found', 'all-signs-options-pro')));
    }

    public function add_option($request)
    {
        $config_id = absint($request->get_param('config_id'));
        $component_id = (string) $request->get_param('component_id');
        $payload = json_decode($request->get_body(), true);
        if (!is_array($payload)) {
            $payload = array();
        }

        $components = $this->get_components_items($config_id);
        $index = $this->find_item_index($components, $component_id);
        if ($index === null) {
            return rest_ensure_response(array('success' => false, 'message' => __('Component not found', 'all-signs-options-pro')));
        }

        $options = isset($components[$index]['options']) && is_array($components[$index]['options']) ? array_values($components[$index]['options']) : array();
        $payload['id'] = isset($payload['id']) && $payload['id'] !== '' ? (string) $payload['id'] : 'option-' . (count($options) + 1);
        $options[] = $payload;
        $components[$index]['options'] = $options;

        $saved = $this->save_components_items($config_id, $components);
        if ($saved === true) {
            return rest_ensure_response(array('success' => true, 'message' => __('Option successfully added', 'all-signs-options-pro')));
        }

        return rest_ensure_response(array('success' => false, 'message' => __('Option has not been added', 'all-signs-options-pro')));
    }

    public function get_option($request)
    {
        $config_id = absint($request->get_param('config_id'));
        $component_id = (string) $request->get_param('component_id');
        $option_id = (string) $request->get_param('option_id');
        $components = $this->get_components_items($config_id);
        $component_index = $this->find_item_index($components, $component_id);

        if ($component_index === null || !isset($components[$component_index]['options']) || !is_array($components[$component_index]['options'])) {
            return rest_ensure_response(array('message' => __('No component found', 'all-signs-options-pro')));
        }

        $options = array_values($components[$component_index]['options']);
        $option_index = $this->find_item_index($options, $option_id);
        if ($option_index !== null && isset($options[$option_index])) {
            return rest_ensure_response(array('data' => $options[$option_index]));
        }

        return rest_ensure_response(array('message' => __('No option found', 'all-signs-options-pro')));
    }

    public function update_option($request)
    {
        $config_id = absint($request->get_param('config_id'));
        $component_id = (string) $request->get_param('component_id');
        $option_id = (string) $request->get_param('option_id');
        $payload = json_decode($request->get_body(), true);
        if (!is_array($payload)) {
            $payload = array();
        }

        $components = $this->get_components_items($config_id);
        $component_index = $this->find_item_index($components, $component_id);
        if ($component_index === null) {
            return rest_ensure_response(array('success' => false, 'message' => __('Component not found', 'all-signs-options-pro')));
        }

        $options = isset($components[$component_index]['options']) && is_array($components[$component_index]['options']) ? array_values($components[$component_index]['options']) : array();
        $option_index = $this->find_item_index($options, $option_id);
        if ($option_index === null) {
            return rest_ensure_response(array('success' => false, 'message' => __('Option not found', 'all-signs-options-pro')));
        }

        $payload['id'] = isset($payload['id']) && $payload['id'] !== '' ? (string) $payload['id'] : (isset($options[$option_index]['id']) ? $options[$option_index]['id'] : $option_id);
        $options[$option_index] = $payload;
        $components[$component_index]['options'] = $options;

        $saved = $this->save_components_items($config_id, $components);
        if ($saved === true) {
            return rest_ensure_response(array('success' => true, 'message' => __('Option successfully updated', 'all-signs-options-pro')));
        }

        return rest_ensure_response(array('success' => false, 'message' => __('Option has not been updated', 'all-signs-options-pro')));
    }

    public function delete_option($request)
    {
        $config_id = absint($request->get_param('config_id'));
        $component_id = (string) $request->get_param('component_id');
        $option_id = (string) $request->get_param('option_id');

        $components = $this->get_components_items($config_id);
        $component_index = $this->find_item_index($components, $component_id);
        if ($component_index === null) {
            return rest_ensure_response(array('success' => false, 'message' => __('Component not found', 'all-signs-options-pro')));
        }

        $options = isset($components[$component_index]['options']) && is_array($components[$component_index]['options']) ? array_values($components[$component_index]['options']) : array();
        $option_index = $this->find_item_index($options, $option_id);
        if ($option_index === null) {
            return rest_ensure_response(array('success' => false, 'message' => __('Option not found', 'all-signs-options-pro')));
        }

        array_splice($options, $option_index, 1);
        $components[$component_index]['options'] = $options;

        $saved = $this->save_components_items($config_id, $components);
        if ($saved === true) {
            return rest_ensure_response(array('success' => true, 'message' => __('Option successfully deleted', 'all-signs-options-pro')));
        }

        return rest_ensure_response(array('success' => false, 'message' => __('Option has not been deleted', 'all-signs-options-pro')));
    }
}
