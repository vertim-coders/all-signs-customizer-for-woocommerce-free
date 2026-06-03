<?php
namespace ASOWP\Api\Admin;

use ASOWP\Support\ConfigSchemaNormalizer;
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
            $normalized = ConfigSchemaNormalizer::normalize_meta($meta);
            $normalized_materials = isset($normalized['additionalOptions']['materials']['items']) && is_array($normalized['additionalOptions']['materials']['items'])
                ? $normalized['additionalOptions']['materials']['items']
                : array();
            if (!empty($normalized_materials)) {
                return rest_ensure_response($normalized_materials);
            }
            if (is_array($meta) && !empty($meta["data"]['materials'])) {
                $forced_type = $this->get_config_forced_material_type($config_id);
                $materials = $meta["data"]['materials'];
                foreach ($materials as $idx => $material) {
                    if (is_array($material)) {
                        $materials[$idx]["type"] = $forced_type;
                        if (!array_key_exists('active', $materials[$idx])) {
                            $materials[$idx]["active"] = true;
                        }
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
                        $material['active'] = isset($new_material['active']) ? (bool)$new_material['active'] : true;
                    } else {
                        // New material added by user - create empty structure with no default data
                        $material = [
                            "name" => isset($new_material['name']) ? $new_material['name'] : (isset($new_material['label']) ? $new_material['label'] : ''),
                            "materialKey" => isset($new_material['materialKey']) ? $new_material['materialKey'] : (isset($new_material['sourceMaterialId']) ? $new_material['sourceMaterialId'] : ''),
                            "sourceMaterialId" => isset($new_material['sourceMaterialId']) ? $new_material['sourceMaterialId'] : (isset($new_material['materialKey']) ? $new_material['materialKey'] : ''),
                            "description" => isset($new_material['description']) ? $new_material['description'] : '',
                            "icon" => isset($new_material['icon']) ? $new_material['icon'] : (isset($new_material['image']) ? $new_material['image'] : ''),
                            "popImg" => isset($new_material['popImg']) ? $new_material['popImg'] : (isset($new_material['popupImg']) ? $new_material['popupImg'] : ''),
                            "type" => 'simple',
                            "active" => true,
                            "isDefault" => isset($new_material['isDefault']) ? (bool) $new_material['isDefault'] : empty($meta["data"]['materials']),
                            "pricingId" => isset($new_material['pricingId']) ? $new_material['pricingId'] : '',
                            "previewImg" => isset($new_material['previewImg']) ? $new_material['previewImg'] : (isset($new_material['icon']) ? $new_material['icon'] : ''),
                            "additionalPrice" => isset($new_material['additionalPrice']) ? (float) $new_material['additionalPrice'] : 0,
                            "excludeComponentIds" => isset($new_material['excludeComponentIds']) && is_array($new_material['excludeComponentIds']) ? $new_material['excludeComponentIds'] : array(),
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
                    if (!empty($material['isDefault'])) {
                        foreach ($meta["data"]['materials'] as $idx => $mat) {
                            if (is_array($mat)) {
                                $meta["data"]['materials'][$idx]["isDefault"] = false;
                            }
                        }
                    }
                    array_push($meta["data"]['materials'], $material);
                } elseif ($forced_type === 'advance') {
                    if (isset($new_material['data']) && is_array($new_material['data'])) {
                        $material = $new_material;
                        $material['type'] = 'advance';
                        $material['active'] = isset($new_material['active']) ? (bool)$new_material['active'] : true;
                    } else {
                        $material = [
                            "name" => isset($new_material['name']) ? $new_material['name'] : (isset($new_material['label']) ? $new_material['label'] : ''),
                            "materialKey" => isset($new_material['materialKey']) ? $new_material['materialKey'] : (isset($new_material['sourceMaterialId']) ? $new_material['sourceMaterialId'] : ''),
                            "sourceMaterialId" => isset($new_material['sourceMaterialId']) ? $new_material['sourceMaterialId'] : (isset($new_material['materialKey']) ? $new_material['materialKey'] : ''),
                            "description" => isset($new_material['description']) ? $new_material['description'] : '',
                            "icon" => isset($new_material['icon']) ? $new_material['icon'] : (isset($new_material['image']) ? $new_material['image'] : ''),
                            "popImg" => isset($new_material['popImg']) ? $new_material['popImg'] : (isset($new_material['popupImg']) ? $new_material['popupImg'] : ''),
                            "type" => 'advance',
                            "active" => true,
                            "isDefault" => isset($new_material['isDefault']) ? (bool) $new_material['isDefault'] : empty($meta["data"]['materials']),
                            "pricingId" => isset($new_material['pricingId']) ? $new_material['pricingId'] : '',
                            "previewImg" => isset($new_material['previewImg']) ? $new_material['previewImg'] : (isset($new_material['icon']) ? $new_material['icon'] : ''),
                            "additionalPrice" => isset($new_material['additionalPrice']) ? (float) $new_material['additionalPrice'] : 0,
                            "excludeComponentIds" => isset($new_material['excludeComponentIds']) && is_array($new_material['excludeComponentIds']) ? $new_material['excludeComponentIds'] : array(),
                            "data" => []
                        ];
                    }
                    if (!empty($material['isDefault'])) {
                        foreach ($meta["data"]['materials'] as $idx => $mat) {
                            if (is_array($mat)) {
                                $meta["data"]['materials'][$idx]["isDefault"] = false;
                            }
                        }
                    }
                    array_push($meta["data"]['materials'], $material);
                }
                    $update = ConfigSchemaNormalizer::save_meta((int) $config_id, $meta);
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
                    $next_active = isset($material['active']) ? (bool)$material['active'] : true;

                    $active_count = 0;
                    foreach ($meta["data"]['materials'] as $idx => $mat) {
                        $is_active = isset($mat['active']) ? (bool)$mat['active'] : true;
                        if ($is_active) {
                            $active_count++;
                        }
                    }
                    $current_active = isset($old_material['active']) ? (bool)$old_material['active'] : true;
                    if ($current_active && !$next_active && $active_count <= 1) {
                        return rest_ensure_response(["success" => false, "message" => __("At least one material must remain active", "all-signs-options-pro")]);
                    }

                    if ($old_material !== $material) {
                        $old_material["name"] = isset($material['name']) ? $material['name'] : (isset($material['label']) ? $material['label'] : '');
                        $old_material["materialKey"] = isset($material['materialKey']) ? $material['materialKey'] : (isset($old_material['materialKey']) ? $old_material['materialKey'] : (isset($material['sourceMaterialId']) ? $material['sourceMaterialId'] : ''));
                        $old_material["sourceMaterialId"] = isset($material['sourceMaterialId']) ? $material['sourceMaterialId'] : (isset($old_material['sourceMaterialId']) ? $old_material['sourceMaterialId'] : (isset($material['materialKey']) ? $material['materialKey'] : ''));
                        $old_material["description"] = isset($material['description']) ? $material['description'] : '';
                        $old_material["icon"] = isset($material['icon']) ? $material['icon'] : (isset($material['image']) ? $material['image'] : '');
                        $old_material["popImg"] = isset($material['popImg']) ? $material['popImg'] : (isset($material['popupImg']) ? $material['popupImg'] : '');
                        $old_material["type"] = $forced_type;
                        $old_material["active"] = $next_active;
                        $old_material["isDefault"] = isset($material['isDefault']) ? (bool) $material['isDefault'] : (isset($old_material['isDefault']) ? (bool) $old_material['isDefault'] : false);
                        $old_material["pricingId"] = isset($material['pricingId']) ? $material['pricingId'] : (isset($old_material['pricingId']) ? $old_material['pricingId'] : '');
                        $old_material["previewImg"] = isset($material['previewImg']) ? $material['previewImg'] : (isset($old_material['previewImg']) ? $old_material['previewImg'] : $old_material["icon"]);
                        $old_material["additionalPrice"] = isset($material['additionalPrice']) ? (float) $material['additionalPrice'] : (isset($old_material['additionalPrice']) ? (float) $old_material['additionalPrice'] : 0);
                        $old_material["excludeComponentIds"] = isset($material['excludeComponentIds']) && is_array($material['excludeComponentIds']) ? $material['excludeComponentIds'] : (isset($old_material['excludeComponentIds']) && is_array($old_material['excludeComponentIds']) ? $old_material['excludeComponentIds'] : array());
                        if ($old_material["isDefault"]) {
                            foreach ($meta["data"]['materials'] as $idx => $mat) {
                                if ($idx !== (int) $material_id && is_array($mat)) {
                                    $meta["data"]['materials'][$idx]["isDefault"] = false;
                                }
                            }
                        }
                        $meta["data"]['materials'][$material_id] = $old_material;
                        $update = ConfigSchemaNormalizer::save_meta((int) $config_id, $meta);
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
                        if (!array_key_exists('active', $material)) {
                            $material["active"] = true;
                        }
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
                    if (count($meta["data"]['materials']) <= 1) {
                        return rest_ensure_response(['success' => false, "message" => __("At least one material must remain", "all-signs-options-pro")]);
                    }

                    $target = $meta["data"]['materials'][$material_id];
                    $target_active = isset($target['active']) ? (bool)$target['active'] : true;
                    $active_remaining = 0;
                    foreach ($meta["data"]['materials'] as $idx => $mat) {
                        if ($idx === (int) $material_id) {
                            continue;
                        }
                        $is_active = isset($mat['active']) ? (bool)$mat['active'] : true;
                        if ($is_active) {
                            $active_remaining++;
                        }
                    }
                    if ($target_active && $active_remaining < 1) {
                        return rest_ensure_response(['success' => false, "message" => __("At least one active material must remain", "all-signs-options-pro")]);
                    }
                    array_splice($meta["data"]['materials'], $material_id, 1);
                    ConfigSchemaNormalizer::save_meta((int) $config_id, $meta);
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
