<?php
namespace ASO\Api\Admin;

use WP_Error;
use WP_REST_Controller;
use WP_REST_Request;
use WP_REST_Response;

/**
 * REST_API Handler
 */
class ASO_Api_Materials extends WP_REST_Controller {

    /**
     * [__construct description]
     */
    public function __construct() {
        $this->namespace = 'aso/v1';
        $this->rest_base = '/configs';
    }

    /**
     * Register the routes
     *
     * @return void
     */
    public function register_routes() {
        register_rest_route(
            $this->namespace,
            $this->rest_base.'/(?P<config_id>\d+)/materials',
            array(
                array(
                    'methods'             => \WP_REST_Server::READABLE,
                    'callback'            => array( $this, 'get_materials' ),
                    'permission_callback' => array( $this, 'get_permissions_check' ),
                    'args'                => array(
                        'config_id' => array (
                            'type' => 'integer',
                            'required' => true,
                        )
                    ),

                ),
                array(
                    'methods'             => \WP_REST_Server::CREATABLE,
                    'callback'            => array( $this, 'create_materials_item' ),
                    'permission_callback' => array( $this, 'get_permissions_check' ),
                    'args'                => array(
                        'config_id' => array (
                            'type' => 'integer',
                            'required' => true,
                        )
                    ),

                )
            )
        );
        register_rest_route(
            $this->namespace,
            $this->rest_base.'/(?P<config_id>\d+)/materials/(?P<item_id>\d+)',
            array(
                array(
                    'methods'             => \WP_REST_Server::READABLE,
                    'callback'            => array( $this, 'get_materials_item' ),
                    'permission_callback' => array( $this, 'get_permissions_check' ),
                    'args'                => array(
                        'config_id' => array (
                            'type' => 'integer',
                            'required' => true,
                        ),
                        'item_id' => array (
                            'type' => 'integer',
                            'required' => true,
                        )
                    ),

                ),
                array(
                    'methods'             => \WP_REST_Server::CREATABLE,
                    'callback'            => array( $this, 'create_materials_item' ),
                    'permission_callback' => array( $this, 'get_permissions_check' ),
                    'args'                => array(
                        'config_id' => array (
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
    public function get_materials( $request ) {
        $config_id = $request->get_param('config_id');
        if($config_id != 0){
            $meta = get_post_meta($config_id,'aso-configs-meta',true);
            if(is_array($meta) && !empty($meta)){
                $materials = $meta['materials'];
                return rest_ensure_response($materials);
            }else{
                return rest_ensure_response([]);
            }
        }else{
            return rest_ensure_response(["message"=>__("No Materials found","ASO")]);
        }
    }

    /**
     * Create an item in materials.
     *
     * @param WP_REST_Request $request Full details about the request.
     *
     * @return WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function create_materials_item( $request ) {
        $config_id = $request->get_param('config_id');
        if($config_id != 0){
            $meta = get_post_meta($config_id,'aso-configs-meta',true);
            if(is_array($meta) && !empty($meta)){
                $new_item = json_decode($request->get_body(),true);
                if(in_array($new_item['type'],['no-sub-component','with-sub-component'])){
                    if($new_item['type'] === 'no-sub-component'){
                        $item = [
                            "name"=>$new_item['name'],
                            "description"=>$new_item['description'],
                            "icon"=>$new_item['icon'],
                            "popImg"=>$new_item['popImg'],
                            "type"=>$new_item['type'],
                            "data"=>[
                                'sizes'=>[],
                                'borders'=>[],
                                'shapes'=>[],
                                'fixingMethods'=>[],
                                'colors'=>[]
                            ]
                        ];
                        array_push($meta['materials'],$item);
                    }else{
                        $item = [
                            "name"=>$new_item['name'],
                            "description"=>$new_item['description'],
                            "icon"=>$new_item['icon'],
                            "popImg"=>$new_item['popImg'],
                            "type"=>$new_item['type'],
                            "data"=>[]
                        ];
                        array_push($meta['materials'],$item);
                    }
                    $update = update_post_meta($config_id,'aso-configs-meta',$meta);
                    if($update === true){
                        return rest_ensure_response(["success"=>true, "message"=>__("Materiel component successfully added","ASO")]);
                    }else{
                        return rest_ensure_response(["success"=>false, "message"=>__("Materiel component has not been added","ASO")]);
                    }
                }else{
                    return rest_ensure_response(["success"=>false, "message"=>__("Materiel component has not been added","ASO")]);
                }
            }else{
                return rest_ensure_response(["success"=>false, "message"=>__("Materiel component has not been added","ASO")]);
            }
        }else{
            return rest_ensure_response(["message"=>__("No Configuration found","ASO")]);
        }
    }
    /**
     * Update an item in materials.
     *
     * @param WP_REST_Request $request Full details about the request.
     *
     * @return WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function update_materials_item( $request ) {
        $config_id = $request->get_param('config_id');
        $item_id = $request->get_param('item_id');
        if($config_id != 0){
            $meta = get_post_meta($config_id,'aso-configs-meta',true);
            if(is_array($meta) && !empty($meta)){
                $item = json_decode($request->get_body(),true);
                if(isset($meta['materials'][$item_id]) && in_array($item['type'],['no-sub-component','with-sub-component'])){
                    $old_item = $meta['materials'][$item_id];
                    if($old_item !== $item){
                        $old_item["name"] = $item['name'];
                        $old_item["description"] = $item['description'];
                        $old_item["icon"] = $item['icon'];
                        $old_item["popImg"] = $item['popImg'];
                        $meta['materials'][$item_id] = $old_item;
                        $update = update_post_meta($config_id,'aso-configs-meta',$meta);
                        if($update === true){
                            return rest_ensure_response(["success"=>true, "message"=>__("Materiel component successfully edited","ASO")]);
                        }else{
                            return rest_ensure_response(["success"=>false, "message"=>__("Materiel component has not been edited","ASO")]);
                        }
                    }else{
                        return rest_ensure_response(["success"=>"same", "message"=>__("No change was observed","ASO")]);
                    }
                }else{
                    return rest_ensure_response(["success"=>false, "message"=>__("Materiel component has not been edited","ASO")]);
                }
            }else{
                return rest_ensure_response(["success"=>false, "message"=>__("Materiel component has not been edited","ASO")]);
            }
        }else{
            return rest_ensure_response(["message"=>__("No Configuration found","ASO")]);
        }
    }



    /**
     * Retrieves an item in all materials items.
     *
     * @param WP_REST_Request $request Full details about the request.
     *
     * @return WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function get_materials_item( $request ) {
        $config_id = $request->get_param('config_id');
        $item_id = $request->get_param('item_id');
        if($config_id != 0){
            $meta = get_post_meta($config_id,'aso-configs-meta',true);
            if(is_array($meta) && !empty($meta)){
                if($meta['materials'][$item_id]){
                    $item = $meta['materials'][$item_id];
                    return rest_ensure_response($item);
                }else{
                    return rest_ensure_response(["message"=>__("No materials component found","ASO")]);
                }
            }else{                    
                return rest_ensure_response(["message"=>__("No materials component found","ASO")]);
            }
        }else{
            return rest_ensure_response(["message"=>__("No Materials found","ASO")]);
        }
    }

    /**
     * Delete an item in all materials items.
     *
     * @param WP_REST_Request $request Full details about the request.
     *
     * @return WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function delete_materials_item( $request ) {
        $config_id = $request->get_param('config_id');
        $item_id = $request->get_param('item_id');
        if($config_id != 0){
            $meta = get_post_meta($config_id,'aso-configs-meta',true);
            if(is_array($meta) && !empty($meta)){
                if($meta['materials'][$item_id]){
                    array_splice($meta['materials'],$item_id,1);
                    return rest_ensure_response(['success'=>true,"message"=>__("Component successfully deleted","ASO")]);
                }else{
                    return rest_ensure_response(['success'=>false,"message"=>__("No materials component found","ASO")]);
                }
            }else{                    
                return rest_ensure_response(['success'=>false,"message"=>__("No materials component found","ASO")]);
            }
        }else{
            return rest_ensure_response(['success'=>false,"message"=>__("No Materials found","ASO")]);
        }
    }

    /**
     * Checks if a given request has access to read the items.
     *
     * @param  WP_REST_Request $request Full details about the request.
     *
     * @return true|WP_Error True if the request has read access, WP_Error object otherwise.
     */
    public function get_permissions_check( $request ) {
        return true;
    }

    /**
     * Retrieves the query params for the items collection.
     *
     * @return array Collection parameters.
     */
    public function get_collection_params() {
        return [];
    }
}
