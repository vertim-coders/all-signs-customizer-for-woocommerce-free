<?php
namespace ASO\Api\Admin\Materials;

use WP_Error;
use WP_REST_Controller;
use WP_REST_Request;
use WP_REST_Response;

/**
 * REST_API Handler
 */
class ASO_Materials_Advance extends WP_REST_Controller {

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
            $this->rest_base.'/(?P<config_id>\d+)/materials/(?P<material_id>\d+)/components',
            array(
                array(
                    'methods'             => \WP_REST_Server::CREATABLE,
                    'callback'            => array( $this, 'create_component' ),
                    'permission_callback' => array( $this, 'get_permissions_check' ),
                    'args'                => array(
                        'config_id' => array (
                            'type' => 'integer',
                            'required' => true,
                        ),
                        'material_id' => array (
                            'type' => 'integer',
                            'required' => true,
                        )
                    ),
                )
            )
        );
        register_rest_route(
            $this->namespace,
            $this->rest_base.'/(?P<config_id>\d+)/materials/(?P<material_id>\d+)/components/update',
            array(
                array(
                    'methods'             => \WP_REST_Server::EDITABLE,
                    'callback'            => array( $this, 'update_components' ),
                    'permission_callback' => array( $this, 'get_permissions_check' ),
                    'args'                => array(
                        'config_id' => array (
                            'type' => 'integer',
                            'required' => true,
                        ),
                        'material_id' => array (
                            'type' => 'integer',
                            'required' => true,
                        )
                    ),
                )
            )
        );
        register_rest_route(
            $this->namespace,
            $this->rest_base.'/(?P<config_id>\d+)/materials/(?P<material_id>\d+)/components/(?P<component_id>\d+)',
            array(
                array(
                    'methods'             => \WP_REST_Server::READABLE,
                    'callback'            => array( $this, 'get_component' ),
                    'permission_callback' => array( $this, 'get_permissions_check' ),
                    'args'                => array(
                        'config_id' => array (
                            'type' => 'integer',
                            'required' => true,
                        ),
                        'material_id' => array (
                            'type' => 'integer',
                            'required' => true,
                        ),
                        'component_id' => array (
                            'type' => 'integer',
                            'required' => true,
                        )
                    )  
                ),
                array(
                    'methods'             => \WP_REST_Server::EDITABLE,
                    'callback'            => array( $this, 'update_component' ),
                    'permission_callback' => array( $this, 'get_permissions_check' ),
                    'args'                => array(
                        'config_id' => array (
                            'type' => 'integer',
                            'required' => true,
                        ),
                        'material_id' => array (
                            'type' => 'integer',
                            'required' => true,
                        ),
                        'component_id' => array (
                            'type' => 'integer',
                            'required' => true,
                        )
                    ),
                ), 
                array(
                    'methods'             => \WP_REST_Server::DELETABLE,
                    'callback'            => array( $this, 'delete_component' ),
                    'permission_callback' => array( $this, 'get_permissions_check' ),
                    'args'                => array(
                        'config_id' => array (
                            'type' => 'integer',
                            'required' => true,
                        ),
                        'material_id' => array (
                            'type' => 'integer',
                            'required' => true,
                        ),
                        'component_id' => array (
                            'type' => 'integer',
                            'required' => true,
                        )
                    ),
                )
            )
        );       
        register_rest_route(
            $this->namespace,
            $this->rest_base.'/(?P<config_id>\d+)/materials/(?P<material_id>\d+)/components/(?P<component_id>\d+)/new-option',
            array(
                
                array(
                    'methods'             => \WP_REST_Server::CREATABLE,
                    'callback'            => array( $this, 'create_option' ),
                    'permission_callback' => array( $this, 'get_permissions_check' ),
                    'args'                => array(
                        'config_id' => array (
                            'type' => 'integer',
                            'required' => true,
                        ),
                        'material_id' => array (
                            'type' => 'integer',
                            'required' => true,
                        ),
                        'component_id' => array (
                            'type' => 'integer',
                            'required' => true,
                        )
                    ),
                )
            )
        );
        register_rest_route(
            $this->namespace,
            $this->rest_base.'/(?P<config_id>\d+)/materials/(?P<material_id>\d+)/components/(?P<component_id>\d+)/(?P<option_id>\d+)',
            array(
                array(
                    'methods'             => \WP_REST_Server::READABLE,
                    'callback'            => array( $this, 'get_option' ),
                    'permission_callback' => array( $this, 'get_permissions_check' ),
                    'args'                => array(
                        'config_id' => array (
                            'type' => 'integer',
                            'required' => true,
                        ),
                        'material_id' => array (
                            'type' => 'integer',
                            'required' => true,
                        ),
                        'component_id' => array (
                            'type' => 'integer',
                            'required' => true,
                        ),
                        'option_id' => array (
                            'type' => 'integer',
                            'required' => true,
                        )
                    ),
                ),
                array(
                    'methods'             => \WP_REST_Server::EDITABLE,
                    'callback'            => array( $this, 'update_option' ),
                    'permission_callback' => array( $this, 'get_permissions_check' ),
                    'args'                => array(
                        'config_id' => array (
                            'type' => 'integer',
                            'required' => true,
                        ),
                        'material_id' => array (
                            'type' => 'integer',
                            'required' => true,
                        ),
                        'component_id' => array (
                            'type' => 'integer',
                            'required' => true,
                        ),
                        'option_id' => array (
                            'type' => 'integer',
                            'required' => true,
                        )
                    ),
                ), 
                array(
                    'methods'             => \WP_REST_Server::DELETABLE,
                    'callback'            => array( $this, 'delete_option' ),
                    'permission_callback' => array( $this, 'get_permissions_check' ),
                    'args'                => array(
                        'config_id' => array (
                            'type' => 'integer',
                            'required' => true,
                        ),
                        'material_id' => array (
                            'type' => 'integer',
                            'required' => true,
                        ),
                        'component_id' => array (
                            'type' => 'integer',
                            'required' => true,
                        ),
                        'option_id' => array (
                            'type' => 'integer',
                            'required' => true,
                        )
                    ),
                )
            )
        );
    }

    public function create_component( $request ){
        $config_id = $request->get_param('config_id');
        $material_id = $request->get_param('material_id');
        if($config_id != 0){
            $meta = get_post_meta($config_id,'aso-configs-meta',true);
            if(is_array($meta) && !empty($meta)){
                $new_component = json_decode($request->get_body(),true);
                if(count($meta['data']["materials"][$material_id]['data'])>0){
                    $i=0;
                    $hasDefault=false;
                    while ($i<count($meta['data']["materials"][$material_id]['data'])) {
                        if($meta['data']["materials"][$material_id]['data'][$i]["isDefault"]){
                            $hasDefault = true;
                        }
                        $i++;
                    }
                    if(!$hasDefault){
                        $meta['data']["materials"][$material_id]['data'][0]["isDefault"]=true;
                    }
                    array_push($meta['data']["materials"][$material_id]['data'],$new_component);
                }else{
                    $new_component["isDefault"]=true;
                    $meta['data']["materials"][$material_id]['data'][0]=$new_component;
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
            return rest_ensure_response(["message"=>__("No Configuration found","ASO")]);
        }
        
    }
    public function update_components( $request ){
        $config_id = $request->get_param('config_id');
        $material_id = $request->get_param('material_id');
        if($config_id != 0){
            $meta = get_post_meta($config_id,'aso-configs-meta',true);
            if(is_array($meta) && !empty($meta)){
                $components = json_decode($request->get_body(),true);
                if($meta['data']["materials"][$material_id]['data'] != $components) {
                    $meta['data']["materials"][$material_id]['data']=$components;
                    $update = update_post_meta($config_id,'aso-configs-meta',$meta);
                    if($update === true){
                        return rest_ensure_response(["success"=>true, "message"=>__("Materiel component successfully added","ASO")]);
                    }else{
                        return rest_ensure_response(["success"=>false, "message"=>__("Materiel component has not been added","ASO")]);
                    }
                }else{
                    return rest_ensure_response(["success"=>"same", "message"=>__("No change observed in components","ASO")]);
                }
                
            }else{
                return rest_ensure_response(["success"=>false, "message"=>__("Materiel component has not been added","ASO")]);
            }
        }else{
            return rest_ensure_response(["message"=>__("No Configuration found","ASO")]);
        }
        
    }
      /**
     *   get material advance component
     *
     * @param WP_REST_Request $request Full details about the request.
     *
     * @return WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function get_component( $request ){
        $config_id = $request->get_param('config_id');
        $material_id = $request->get_param('material_id');
        $component_id = $request->get_param('component_id');
        $have_fixingMethods = get_option("aso_all_fixingMethods");
        $have_shapes = get_option("aso_all_shapes");
        if($config_id != 0){
            $meta = get_post_meta($config_id,'aso-configs-meta',true);
            if(is_array($meta) && !empty($meta)){
                if(isset($meta['data']['materials'][$material_id]['data'][$component_id])){
                    return rest_ensure_response(["manageShapes"=>$have_shapes,"manageFixingMethods"=>$have_fixingMethods,"component"=>$meta['data']['materials'][$material_id]['data'][$component_id],"message"=>__("No Material Component Options Found","ASO")]);
                }else{
                    return rest_ensure_response(["manageShapes"=>$have_shapes,"manageFixingMethods"=>$have_fixingMethods,"message"=>__("No materials component found","ASO")]);
                }
            }else{                    
                return rest_ensure_response(["manageShapes"=>$have_shapes,"manageFixingMethods"=>$have_fixingMethods,"message"=>__("No materials component found","ASO")]);
            }
        }else{
            return rest_ensure_response(["manageShapes"=>$have_shapes,"manageFixingMethods"=>$have_fixingMethods,"message"=>__("No Materials found","ASO")]);
        }
    }
  
      /**
     *   update components
     *
     * @param WP_REST_Request $request Full details about the request.
     *
     * @return WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function update_component( $request ){
        $config_id = $request->get_param('config_id');
        $material_id = $request->get_param('material_id');
        $component_id = $request->get_param('component_id');
        if($config_id != 0){
            $meta = get_post_meta($config_id,'aso-configs-meta',true);
            if(is_array($meta) && !empty($meta)){
                $component = json_decode($request->get_body(),true);
                if(isset($meta['data']['materials'][$material_id]) && isset($meta['data']['materials'][$material_id]['data'][$component_id]) ){
                 $old_component = $meta['data']['materials'][$material_id]['data'][$component_id];
                    if($old_component !== $component){
                        $meta['data']['materials'][$material_id] ['data'][$component_id]= $component;
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
     *   delete components
     *
     * @param WP_REST_Request $request Full details about the request.
     *
     * @return WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function delete_component( $request ){
        $config_id = $request->get_param('config_id');
        $material_id = $request->get_param('material_id');
        $component_id = $request->get_param('component_id');
        if($config_id != 0){
            $meta = get_post_meta($config_id,'aso-configs-meta',true);
            if(is_array($meta) && !empty($meta)){
                if($meta['data']['materials'][$material_id]['data'][$component_id]){
                    array_splice($meta['data']['materials'][$material_id]['data'],$component_id,1);
                    $update = update_post_meta($config_id,'aso-configs-meta',$meta);
                    if($update === true)
                        return rest_ensure_response(['success'=>true,"message"=>__("Component successfully deleted","ASO")]);
                    else
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
     *   create  subcomponents
     *
     * @param WP_REST_Request $request Full details about the request.
     *
     * @return WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function create_option( $request ){
        $config_id = $request->get_param('config_id');
        $material_id = $request->get_param('material_id');
        $component_id = $request->get_param('component_id');
        if($config_id != 0){
            $meta = get_post_meta($config_id,'aso-configs-meta',true);
            if(is_array($meta) && !empty($meta)){
                $option = json_decode($request->get_body(),true);
                if(count($meta['data']["materials"][$material_id]['data'][$component_id]['options'])>0){
                    $i=0;
                    $hasDefault=false;
                    while ($i<count($meta['data']["materials"][$material_id]['data'][$component_id]['options'])) {
                        if($meta['data']["materials"][$material_id]['data'][$component_id]['options'][$i]["isDefault"]){
                            $hasDefault = true;
                        }
                        $i++;
                    }
                    if(!$hasDefault){
                        $meta['data']["materials"][$material_id]['data'][$component_id]['options'][0]["isDefault"]=true;
                    }
                    array_push($meta['data']["materials"][$material_id]['data'][$component_id]['options'],$option);
                }else{
                    $option["isDefault"]=true;
                    $meta['data']["materials"][$material_id]['data'][$component_id]['options'][0]=$option;
                }
                $update = update_post_meta($config_id,'aso-configs-meta',$meta);
                if($update === true){
                    return rest_ensure_response(["success"=>true, "message"=>__("Materiel component option successfully added","ASO")]);
                }else{
                    return rest_ensure_response(["success"=>false, "message"=>__("Materiel component option has not been added","ASO")]);
                }
                
            }else{
                return rest_ensure_response(["success"=>false, "message"=>__("Materiel component has not been added","ASO")]);
            }
        }else{
            return rest_ensure_response(["message"=>__("No Configuration found","ASO")]);
        } 
    }
         /**
     *   get  subcomponents
     *
     * @param WP_REST_Request $request Full details about the request.
     *
     * @return WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function get_option( $request ){
        $config_id = $request->get_param('config_id');
        $material_id = $request->get_param('material_id');
        $component_id = $request->get_param('component_id');
        $option_id = $request->get_param('option_id');
        if($config_id != 0){
            $meta = get_post_meta($config_id,'aso-configs-meta',true);
            if(is_array($meta) && !empty($meta)){
                if($meta['data']['materials'][$material_id]['data'][$component_id]){
                    $subcomponent = $meta['data']['materials'][$material_id]['data'][$component_id]['options'][$option_id];
                    return rest_ensure_response($subcomponent);
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
     *   create  subcomponents
     *
     * @param WP_REST_Request $request Full details about the request.
     *
     * @return WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function update_option ( $request ){
        $config_id = $request->get_param('config_id');
        $material_id = $request->get_param('material_id');
        $component_id = $request->get_param('component_id');
        $option_id = $request->get_param('option_id');
        if($config_id != 0){
            $meta = get_post_meta($config_id,'aso-configs-meta',true);
            if(is_array($meta) && !empty($meta)){
                $subcomponent = json_decode($request->get_body(),true);
                if(isset($meta['data']['materials'][$material_id]) 
                && (isset($meta['data']['materials'][$material_id]['data'][$component_id]) 
                && isset($meta['data']['materials'][$material_id]['data'][$component_id]["options"][$option_id]))){
                $old_subcomponent = $meta['data']['materials'][$material_id]['data'][$component_id]["options"][$option_id];
                    if($old_subcomponent !== $subcomponent){
                        $meta['data']['materials'][$material_id] ['data'][$component_id]["options"][$option_id] = $subcomponent;
                        $update = update_post_meta($config_id,'aso-configs-meta',$meta);
                        if($update === true){
                            return rest_ensure_response(["success"=>true, "message"=>__("Materiel component option successfully edited","ASO")]);
                        }else{
                            return rest_ensure_response(["success"=>false, "message"=>__("Materiel component option has not been edited","ASO")]);
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
     *   create  subcomponents
     *
     * @param WP_REST_Request $request Full details about the request.
     *
     * @return WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function delete_option( $request ){
        $config_id = $request->get_param('config_id');
        $material_id = $request->get_param('material_id');
        $component_id = $request->get_param('component_id');
        $option_id = $request->get_param('option_id');
        if($config_id != 0){
            $meta = get_post_meta($config_id,'aso-configs-meta',true);
            if(is_array($meta) && !empty($meta)){
                if($meta['data']['materials'][$material_id]['data'][$component_id]["options"][$option_id]){
                    array_splice($meta['data']['materials'][$material_id]['data'][$component_id]["options"],$option_id,1);
                    $update = update_post_meta($config_id,'aso-configs-meta',$meta);
                    if($update === true)
                        return rest_ensure_response(['success'=>true,"message"=>__("Material Component option successfully deleted","ASO")]);
                    else
                        return rest_ensure_response(['success'=>false,"message"=>__("Material Component option has not been deleted","ASO")]);
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
     * Checks if a given request has access to read the materials.
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
