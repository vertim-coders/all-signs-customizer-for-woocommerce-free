<?php
namespace ASO\Api\Admin\components;

use WP_Error;
use WP_REST_Controller;
use WP_REST_Request;
use WP_REST_Response;

/**
 * REST_API Handler
 */
class ASO_components_With_Sub_Component extends WP_REST_Controller {

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
            $this->rest_base.'/(?P<config_id>\d+)/materials/(?P<material_id>\d+)',
            array(
                
                array(
                    'methods'             => \WP_REST_Server::CREATABLE,
                    'callback'            => array( $this, 'create_components_post' ),
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
            $this->rest_base.'/(?P<config_id>\d+)/materials/(?P<material_id>\d+)/(?P<component_id>\d+)',
            array(
                array(
                    'methods'             => \WP_REST_Server::READABLE,
                    'callback'            => array( $this, 'get_components' ),
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
                    'callback'            => array( $this, 'update_components_post' ),
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
                    'callback'            => array( $this, 'delete_components_post' ),
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
            $this->rest_base.'/(?P<config_id>\d+)/materials/(?P<material_id>\d+)/(?P<component_id>\d+)',
            array(
                
                array(
                    'methods'             => \WP_REST_Server::CREATABLE,
                    'callback'            => array( $this, 'create_subcomponents_post' ),
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
            $this->rest_base.'/(?P<config_id>\d+)/materials/(?P<material_id>\d+)/(?P<component_id>\d+)/(?P<option_id>\d+)',
            array(
                array(
                    'methods'             => \WP_REST_Server::READABLE,
                    'callback'            => array( $this, 'get_subcomponents_post' ),
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
                    'callback'            => array( $this, 'update_subcomponents_post' ),
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
                    'callback'            => array( $this, 'delete_subcomponents_item' ),
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

    public function create_components_post( $request ){
        $config_id = $request->get_param('config_id');
        $material_id = $request->get_param('material_id');
        if($config_id != 0){
            $meta = get_post_meta($config_id,'aso-configs-meta',true);
            if(is_array($meta) && !empty($meta)){
                $new_component = json_decode($request->get_body(),true);
                if(in_array( $new_component['type'],['simple','advance'])){
                    $new_component['data'] = [];
                    array_push($meta["materials"][$material_id]['data'],$new_component);
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
     *   get components
     *
     * @param WP_REST_Request $request Full details about the request.
     *
     * @return WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function get_components( $request ){
        $config_id = $request->get_param('config_id');
        $material_id = $request->get_param('material_id');
        $component_id = $request->get_param('component_id');
        if($config_id != 0){
            $meta = get_post_meta($config_id,'aso-configs-meta',true);
            if(is_array($meta) && !empty($meta)){
                if($meta['materials'][$material_id]['data'][$component_id]){
                    $component = $meta['materials'][$material_id]['data'][$component_id];
                    return rest_ensure_response($component);
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
     *   update components
     *
     * @param WP_REST_Request $request Full details about the request.
     *
     * @return WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function update_components_post( $request ){
        $config_id = $request->get_param('config_id');
        $material_id = $request->get_param('material_id');
        $component_id = $request->get_param('component_id');
        if($config_id != 0){
            $meta = get_post_meta($config_id,'aso-configs-meta',true);
            if(is_array($meta) && !empty($meta)){
                $component = json_decode($request->get_body(),true);
                if(isset($meta['materials'][$material_id]) && (isset($meta['materials'][$material_id]['data'][$component_id]) && in_array($component['type'],['simple','advance']))){
                 $old_component = $meta['materials'][$material_id]['data'][$component_id];
                    if($old_component !== $component){
                        $meta['materials'][$material_id] ['data'][$component_id]= $component;
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
    public function delete_components_post( $request ){
        $config_id = $request->get_param('config_id');
        $material_id = $request->get_param('material_id');
        $component_id = $request->get_param('component_id');
        if($config_id != 0){
            $meta = get_post_meta($config_id,'aso-configs-meta',true);
            if(is_array($meta) && !empty($meta)){
                if($meta['materials'][$material_id]['data'][$component_id]){
                    array_splice($meta['materials'][$material_id]['data'],$component_id,1);
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
    public function create_subcomponents_post( $request ){
        $config_id = $request->get_param('config_id');
        $material_id = $request->get_param('material_id');
        $component_id = $request->get_param('component_id');
        if($config_id != 0){
            $meta = get_post_meta($config_id,'aso-configs-meta',true);
            if(is_array($meta) && !empty($meta)){
                $option = json_decode($request->get_body(),true);
                $option = [];
                array_push($meta["materials"][$material_id]['data'][$component_id]['data'],$option);
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
         /**
     *   get  subcomponents
     *
     * @param WP_REST_Request $request Full details about the request.
     *
     * @return WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function get_subcomponents_post( $request ){
        $config_id = $request->get_param('config_id');
        $material_id = $request->get_param('material_id');
        $component_id = $request->get_param('component_id');
        $option_id = $request->get_param('option_id');
        if($config_id != 0){
            $meta = get_post_meta($config_id,'aso-configs-meta',true);
            if(is_array($meta) && !empty($meta)){
                if($meta['materials'][$material_id]['data'][$component_id]){
                    $subcomponent = $meta['materials'][$material_id]['data'][$component_id]['data'][$option_id];
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
    public function update_subcomponents_post ( $request ){
        $config_id = $request->get_param('config_id');
        $material_id = $request->get_param('material_id');
        $component_id = $request->get_param('component_id');
        $option_id = $request->get_param('option_id');
        if($config_id != 0){
            $meta = get_post_meta($config_id,'aso-configs-meta',true);
            if(is_array($meta) && !empty($meta)){
                $subcomponent = json_decode($request->get_body(),true);
                if(isset($meta['materials'][$material_id]) 
                && (isset($meta['materials'][$material_id]['data'][$component_id]) 
                && (isset($meta['materials'][$material_id]['data'][$component_id]['data'][$option_id])))){
                $old_subcomponent = $meta['materials'][$material_id]['data'][$component_id]['data'][$option_id];
                    if($old_subcomponent !== $subcomponent){
                        $meta['materials'][$material_id] ['data'][$component_id]['data'][$option_id] = $subcomponent;
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
     *   create  subcomponents
     *
     * @param WP_REST_Request $request Full details about the request.
     *
     * @return WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function delete_subcomponents_item( $request ){
        $config_id = $request->get_param('config_id');
        $material_id = $request->get_param('material_id');
        $component_id = $request->get_param('component_id');
        $option_id = $request->get_param('option_id');
        if($config_id != 0){
            $meta = get_post_meta($config_id,'aso-configs-meta',true);
            if(is_array($meta) && !empty($meta)){
                if($meta['materials'][$material_id]['data'][$component_id]['data'][$option_id]){
                    array_splice($meta['materials'][$material_id]['data'][$component_id]['data'],$option_id,1);
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
     * Retrieves the query params for the items collection.
     *
     * @return array Collection parameters.
     */
    public function get_collection_params() {
        return [];
    }
}
