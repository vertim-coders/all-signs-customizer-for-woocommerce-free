<?php
namespace ASOWP\Api\Admin\Additionals_Options;

use WP_REST_Server;

class ASOWP_Api_Customs_Additionals_Materials extends ASOWP_Api_Customs_Additionals_Base
{
    public function register_routes()
    {
        $base_route = '/' . $this->rest_base . '/(?P<config_id>\d+)/additional-options/materials';

        register_rest_route(
            $this->namespace,
            $base_route,
            array(
                array(
                    'methods' => WP_REST_Server::READABLE,
                    'callback' => array($this, 'get_materials'),
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
                    'callback' => array($this, 'add_material'),
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
            $base_route . '/(?P<material_id>[^/]+)',
            array(
                array(
                    'methods' => WP_REST_Server::READABLE,
                    'callback' => array($this, 'get_material'),
                    'permission_callback' => array($this, 'get_config_permissions_check'),
                    'args' => array(
                        'config_id' => array(
                            'type' => 'integer',
                            'required' => true,
                        ),
                        'material_id' => array(
                            'type' => 'string',
                            'required' => true,
                        ),
                    ),
                ),
                array(
                    'methods' => WP_REST_Server::EDITABLE,
                    'callback' => array($this, 'update_material'),
                    'permission_callback' => array($this, 'get_config_permissions_check'),
                    'args' => array(
                        'config_id' => array(
                            'type' => 'integer',
                            'required' => true,
                        ),
                        'material_id' => array(
                            'type' => 'string',
                            'required' => true,
                        ),
                    ),
                ),
                array(
                    'methods' => WP_REST_Server::DELETABLE,
                    'callback' => array($this, 'delete_material'),
                    'permission_callback' => array($this, 'get_config_permissions_check'),
                    'args' => array(
                        'config_id' => array(
                            'type' => 'integer',
                            'required' => true,
                        ),
                        'material_id' => array(
                            'type' => 'string',
                            'required' => true,
                        ),
                    ),
                ),
            )
        );

        register_rest_route(
            $this->namespace,
            $base_route . '/(?P<material_id>[^/]+)/colors',
            array(
                array(
                    'methods' => WP_REST_Server::READABLE,
                    'callback' => array($this, 'get_material_colors'),
                    'permission_callback' => array($this, 'get_config_permissions_check'),
                    'args' => array(
                        'config_id' => array(
                            'type' => 'integer',
                            'required' => true,
                        ),
                        'material_id' => array(
                            'type' => 'string',
                            'required' => true,
                        ),
                    ),
                ),
                array(
                    'methods' => WP_REST_Server::EDITABLE,
                    'callback' => array($this, 'update_material_colors'),
                    'permission_callback' => array($this, 'get_config_permissions_check'),
                    'args' => array(
                        'config_id' => array(
                            'type' => 'integer',
                            'required' => true,
                        ),
                        'material_id' => array(
                            'type' => 'string',
                            'required' => true,
                        ),
                    ),
                ),
            )
        );
    }

    public function get_materials($request)
    {
        $config_id = absint($request->get_param('config_id'));
        if (!$config_id) {
            return rest_ensure_response(array('success' => false, 'message' => __('Custom ID invalid', 'all-signs-options-pro')));
        }

        $materials = $this->get_section_items($config_id, 'materials');
        return rest_ensure_response(array(
            'success' => true,
            'data' => array(
                'materials' => array(
                    'items' => array_values($materials),
                ),
            ),
        ));
    }

    public function get_material($request)
    {
        $config_id = absint($request->get_param('config_id'));
        $material_id = (string) $request->get_param('material_id');
        $materials = $this->get_section_items($config_id, 'materials');
        $index = $this->find_item_index($materials, $material_id);

        if ($config_id && $index !== null && isset($materials[$index])) {
            return rest_ensure_response(array(
                'success' => true,
                'data' => array(
                    'material' => $materials[$index],
                ),
            ));
        }

        return rest_ensure_response(array('success' => false, 'message' => __('No material found', 'all-signs-options-pro')));
    }

    public function add_material($request)
    {
        $config_id = absint($request->get_param('config_id'));
        $payload = json_decode($request->get_body(), true);
        if (!is_array($payload)) {
            $payload = array();
        }

        $materials = $this->get_section_items($config_id, 'materials');
        $payload['id'] = isset($payload['id']) && $payload['id'] !== '' ? (string) $payload['id'] : 'material-' . (count($materials) + 1);
        $materials[] = $payload;

        $saved = $this->set_section_items($config_id, 'materials', $materials, 'Materials', '');
        if ($saved === true) {
            return rest_ensure_response(array(
                'success' => true,
                'message' => __('Material successfully added', 'all-signs-options-pro'),
                'data' => array(
                    'materials' => array(
                        'items' => array_values($materials),
                    ),
                ),
            ));
        }

        return rest_ensure_response(array('success' => false, 'message' => __('Material has not been added', 'all-signs-options-pro')));
    }

    public function update_material($request)
    {
        $config_id = absint($request->get_param('config_id'));
        $material_id = (string) $request->get_param('material_id');
        $payload = json_decode($request->get_body(), true);
        if (!is_array($payload)) {
            $payload = array();
        }

        $materials = $this->get_section_items($config_id, 'materials');
        $index = $this->find_item_index($materials, $material_id);
        if ($index === null) {
            return rest_ensure_response(array('success' => false, 'message' => __('Material not found', 'all-signs-options-pro')));
        }

        $payload['id'] = isset($payload['id']) && $payload['id'] !== '' ? (string) $payload['id'] : (isset($materials[$index]['id']) ? $materials[$index]['id'] : $material_id);
        $materials[$index] = $payload;

        $saved = $this->set_section_items($config_id, 'materials', $materials, 'Materials', '');
        if ($saved === true) {
            return rest_ensure_response(array(
                'success' => true,
                'message' => __('Material successfully updated', 'all-signs-options-pro'),
                'data' => array(
                    'materials' => array(
                        'items' => array_values($materials),
                    ),
                ),
            ));
        }

        return rest_ensure_response(array('success' => false, 'message' => __('Material has not been updated', 'all-signs-options-pro')));
    }

    public function delete_material($request)
    {
        $config_id = absint($request->get_param('config_id'));
        $material_id = (string) $request->get_param('material_id');
        $materials = $this->get_section_items($config_id, 'materials');
        $index = $this->find_item_index($materials, $material_id);

        if ($index === null) {
            return rest_ensure_response(array('success' => false, 'message' => __('Material not found', 'all-signs-options-pro')));
        }

        array_splice($materials, $index, 1);
        $saved = $this->set_section_items($config_id, 'materials', $materials, 'Materials', '');
        if ($saved === true) {
            return rest_ensure_response(array(
                'success' => true,
                'message' => __('Material successfully deleted', 'all-signs-options-pro'),
                'data' => array(
                    'materials' => array(
                        'items' => array_values($materials),
                    ),
                ),
            ));
        }

        return rest_ensure_response(array('success' => false, 'message' => __('Material has not been deleted', 'all-signs-options-pro')));
    }

    public function get_material_colors($request)
    {
        $config_id = absint($request->get_param('config_id'));
        $material_id = (string) $request->get_param('material_id');
        $materials = $this->get_section_items($config_id, 'materials');
        $index = $this->find_item_index($materials, $material_id);
        $material = $index !== null && isset($materials[$index]) ? $materials[$index] : array();

        return rest_ensure_response(array(
            'success' => true,
            'data' => array(
                'colors' => array(
                    'allColors' => $this->resolve_material_colors($material),
                ),
            ),
        ));
    }

    public function update_material_colors($request)
    {
        $config_id = absint($request->get_param('config_id'));
        $material_id = (string) $request->get_param('material_id');
        $payload = json_decode($request->get_body(), true);
        if (!is_array($payload)) {
            $payload = array();
        }

        $materials = $this->get_section_items($config_id, 'materials');
        $index = $this->find_item_index($materials, $material_id);
        if ($index === null) {
            return rest_ensure_response(array('success' => false, 'message' => __('Material not found', 'all-signs-options-pro')));
        }

        $materials[$index]['colors'] = isset($payload['allColors']) && is_array($payload['allColors']) ? array_values($payload['allColors']) : array_values($payload);
        $saved = $this->set_section_items($config_id, 'materials', $materials, 'Materials', '');

        if ($saved === true) {
            return rest_ensure_response(array(
                'success' => true,
                'message' => __('Material colors successfully updated', 'all-signs-options-pro'),
                'data' => array(
                    'colors' => array(
                        'allColors' => $materials[$index]['colors'],
                    ),
                ),
            ));
        }

        return rest_ensure_response(array('success' => false, 'message' => __('Material colors has not been updated', 'all-signs-options-pro')));
    }
}
