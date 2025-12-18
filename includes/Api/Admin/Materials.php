<?php
namespace ASOWP\Api\Admin;

use WP_Error;
use WP_REST_Controller;
use WP_REST_Request;
use WP_REST_Response;

/**
 * REST_API Handler
 */
class ASOWP_Api_Materials extends WP_REST_Controller
{
    private function get_config_forced_material_type($config_id)
    {
        $meta = get_post_meta($config_id, 'asowp-configs-meta', true);
        $material_type = (is_array($meta) && isset($meta['materialType'])) ? $meta['materialType'] : 'simple';

        return $material_type === 'advance' ? 'advance' : 'simple';
    }

    /**
     * [__construct description]
     */
    public function __construct()
    {
        $this->namespace = 'asowp/v1';
        $this->rest_base = '/configs';
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
            $this->rest_base . '/(?P<config_id>\d+)/materials',
            array(
                array(
                    'methods' => \WP_REST_Server::READABLE,
                    'callback' => array($this, 'get_materials'),
                    'permission_callback' => array($this, 'get_permissions_check'),
                    'args' => array(
                        'config_id' => array(
                            'type' => 'integer',
                            'required' => true,
                        )
                    ),

                ),
                array(
                    'methods' => \WP_REST_Server::CREATABLE,
                    'callback' => array($this, 'create_materials_material'),
                    'permission_callback' => array($this, 'get_permissions_check'),
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
            $this->rest_base . '/(?P<config_id>\d+)/materials/(?P<material_id>\d+)',
            array(
                array(
                    'methods' => \WP_REST_Server::READABLE,
                    'callback' => array($this, 'get_materials_material'),
                    'permission_callback' => array($this, 'get_permissions_check'),
                    'args' => array(
                        'config_id' => array(
                            'type' => 'integer',
                            'required' => true,
                        ),
                        'material_id' => array(
                            'type' => 'integer',
                            'required' => true,
                        )
                    ),

                ),
                array(
                    'methods' => \WP_REST_Server::EDITABLE,
                    'callback' => array($this, 'update_materials_material'),
                    'permission_callback' => array($this, 'get_permissions_check'),
                    'args' => array(
                        'config_id' => array(
                            'type' => 'integer',
                            'required' => true,
                        ),
                        'material_id' => array(
                            'type' => 'integer',
                            'required' => true,
                        )
                    ),

                ),
                array(
                    'methods' => \WP_REST_Server::DELETABLE,
                    'callback' => array($this, 'delete_materials_material'),
                    'permission_callback' => array($this, 'get_permissions_check'),
                    'args' => array(
                        'config_id' => array(
                            'type' => 'integer',
                            'required' => true,
                        )
                    ),

                )
            )
        );
    }

    /**
     * Retrieves a collection of materials.
     *
     * @param WP_REST_Request $request Full details about the request.
     *
     * @return WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function get_materials($request)
    {
        $config_id = $request->get_param('config_id');
        if ($config_id != 0) {
            $meta = get_post_meta($config_id, 'asowp-configs-meta', true);
            if (is_array($meta) && !empty($meta["data"]['materials'])) {
                $forced_type = $this->get_config_forced_material_type($config_id);
                $materials = $meta["data"]['materials'];
                foreach ($materials as $idx => $material) {
                    if (is_array($material)) {
                        $materials[$idx]["type"] = $forced_type;
                    }
                }
                return rest_ensure_response($materials);
            } else {
                return rest_ensure_response(["message" => __("No Materials found", "all-signs-options-pro")]);
            }
        } else {
            return rest_ensure_response(["message" => __("No Materials found", "all-signs-options-pro")]);
        }
    }

    /**
     * Create an material in materials.
     *
     * @param WP_REST_Request $request Full details about the request.
     *
     * @return WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function create_materials_material($request)
    {
        $config_id = $request->get_param('config_id');
        if ($config_id != 0) {
            $meta = get_post_meta($config_id, 'asowp-configs-meta', true);
            if (is_array($meta["data"]["materials"])) {
                $new_material = json_decode($request->get_body(), true);
                $forced_type = $this->get_config_forced_material_type($config_id);
                if ($forced_type === 'simple') {
                    if (isset($new_material['data']) && is_array($new_material['data'])) {
                        // Material with existing data (like default material from config creation)
                        $material = $new_material;
                        $material['type'] = 'simple';
                    } else {
                        // New material added by user - create empty structure with no default data
                        $material = [
                            "name" => $new_material['name'],
                            "description" => $new_material['description'],
                            "icon" => $new_material['icon'],
                            "popImg" => $new_material['popImg'],
                            "type" => 'simple',
                            "data" => [
                                    'sizes' => [
                                        "customSize" => [
                                            "active" => false,
                                            "width" => [
                                                "label" => 'Width',
                                                "min" => 0,
                                                "max" => 0
                                            ],
                                            "height" => [
                                                "label" => 'Height',
                                                "min" => 0,
                                                "max" => 0
                                            ]
                                        ],
                                        "thickness" => [
                                            "active" => false,
                                            "values" => []
                                        ],
                                        "allSizes" => []
                                    ],
                                    'borders' => [
                                        "settings" => [
                                            "borderColorsLabel" => "Borders Colors",
                                            "colors" => [],
                                            "enableBorderWidth" => false,
                                            "enableBorderColor" => false,
                                            "customColorsPrevImg" => ""
                                        ],
                                        "allBorders" => [],
                                    ],
                                    'shapes' => [],
                                    "textImages" => ["enableText" => true, "enableImage" => true],
                                    'fixingMethods' => [],
                                    'colors' => [
                                        "customColors" => [
                                            "active" => false,
                                            "label" => "Custom Colors",
                                            "prevImg" => "",
                                        ],
                                        "allColors" => []
                                    ],
                                    "additionalOptions" => []
                                ]
                            ];
                    }
                    array_push($meta["data"]['materials'], $material);
                } elseif ($forced_type === 'advance') {
                    if (isset($new_material['data']) && is_array($new_material['data'])) {
                        $material = $new_material;
                        $material['type'] = 'advance';
                    } else {
                        $material = [
                            "name" => $new_material['name'],
                            "description" => $new_material['description'],
                            "icon" => $new_material['icon'],
                            "popImg" => $new_material['popImg'],
                            "type" => 'advance',
                            "data" => []
                        ];
                    }
                    array_push($meta["data"]['materials'], $material);
                }
                    $update = update_post_meta($config_id, 'asowp-configs-meta', $meta);
                    if ($update === true) {
                        return rest_ensure_response(["success" => true, "message" => __("Materiel component successfully added", "all-signs-options-pro")]);
                    } else {
                        return rest_ensure_response(["success" => false, "message" => __("Materiel component has not been added", "all-signs-options-pro")]);
                    }
            } else {
                return rest_ensure_response(["success" => false, "message" => __("Materiel component has not been added", "all-signs-options-pro")]);
            }
        } else {
            return rest_ensure_response(["message" => __("No Configuration found", "all-signs-options-pro")]);
        }
    }
    /**
     * Update an material in materials.
     *
     * @param WP_REST_Request $request Full details about the request.
     *
     * @return WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function update_materials_material($request)
    {
        $config_id = $request->get_param('config_id');
        $material_id = $request->get_param('material_id');
        if ($config_id != 0) {
            $meta = get_post_meta($config_id, 'asowp-configs-meta', true);
            if (is_array($meta) && !empty($meta)) {
                $material = json_decode($request->get_body(), true);
                if (isset($meta["data"]['materials'][$material_id])) {
                    $forced_type = $this->get_config_forced_material_type($config_id);
                    $old_material = $meta["data"]['materials'][$material_id];
                    if ($old_material !== $material) {
                        $old_material["name"] = $material['name'];
                        $old_material["description"] = $material['description'];
                        $old_material["icon"] = $material['icon'];
                        $old_material["popImg"] = $material['popImg'];
                        $old_material["type"] = $forced_type;
                        $meta["data"]['materials'][$material_id] = $old_material;
                        $update = update_post_meta($config_id, 'asowp-configs-meta', $meta);
                        if ($update === true) {
                            return rest_ensure_response(["success" => true, "message" => __("Materiel component successfully edited", "all-signs-options-pro")]);
                        } else {
                            return rest_ensure_response(["success" => false, "message" => __("Materiel component has not been edited", "all-signs-options-pro")]);
                        }
                    } else {
                        return rest_ensure_response(["success" => "same", "message" => __("No change was observed", "all-signs-options-pro")]);
                    }
                } else {
                    return rest_ensure_response(["success" => false, "message" => __("Materiel component has not been edited", "all-signs-options-pro")]);
                }
            } else {
                return rest_ensure_response(["success" => false, "message" => __("Materiel component has not been edited", "all-signs-options-pro")]);
            }
        } else {
            return rest_ensure_response(["message" => __("No Configuration found", "all-signs-options-pro")]);
        }
    }



    /**
     * Retrieves an material in all materials materials.
     *
     * @param WP_REST_Request $request Full details about the request.
     *
     * @return WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function get_materials_material($request)
    {
        $config_id = $request->get_param('config_id');
        $material_id = $request->get_param('material_id');
        if ($config_id != 0) {
            $meta = get_post_meta($config_id, 'asowp-configs-meta', true);
            if (is_array($meta) && !empty($meta)) {
                if ($meta["data"]['materials'][$material_id]) {
                    $material = $meta["data"]['materials'][$material_id];
                    if (is_array($material)) {
                        $material["type"] = $this->get_config_forced_material_type($config_id);
                    }
                    return rest_ensure_response($material);
                } else {
                    return rest_ensure_response(["message" => __("No materials component found", "all-signs-options-pro")]);
                }
            } else {
                return rest_ensure_response(["message" => __("No materials component found", "all-signs-options-pro")]);
            }
        } else {
            return rest_ensure_response(["message" => __("No Materials found", "all-signs-options-pro")]);
        }
    }

    /**
     * Delete an material in all materials materials.
     *
     * @param WP_REST_Request $request Full details about the request.
     *
     * @return WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function delete_materials_material($request)
    {
        $config_id = $request->get_param('config_id');
        $material_id = $request->get_param('material_id');
        if ($config_id != 0) {
            $meta = get_post_meta($config_id, 'asowp-configs-meta', true);
            if (is_array($meta) && !empty($meta)) {
                if ($meta["data"]['materials'][$material_id]) {
                    array_splice($meta["data"]['materials'], $material_id, 1);
                    update_post_meta($config_id, "asowp-configs-meta", $meta);
                    return rest_ensure_response(['success' => true, "message" => __("Component successfully deleted", "all-signs-options-pro")]);
                } else {
                    return rest_ensure_response(['success' => false, "message" => __("No materials component found", "all-signs-options-pro")]);
                }
            } else {
                return rest_ensure_response(['success' => false, "message" => __("No materials component found", "all-signs-options-pro")]);
            }
        } else {
            return rest_ensure_response(['success' => false, "message" => __("No Materials found", "all-signs-options-pro")]);
        }
    }

    /**
     * Checks if a given request has access to read the materials.
     *
     * @param  WP_REST_Request $request Full details about the request.
     *
     * @return true|WP_Error True if the request has read access, WP_Error object otherwise.
     */
    public function get_permissions_check($request)
    {
        return true;
    }


    /**
     * Retrieves the query params for the materials collection.
     *
     * @return array Collection parameters.
     */
    public function get_collection_params()
    {
        return [];
    }
}
