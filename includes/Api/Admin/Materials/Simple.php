<?php
namespace ASO\Api\Admin\Materials;

use WP_Error;
use WP_REST_Controller;
use WP_REST_Request;
use WP_REST_Response;

/**
 * REST_API Handler
 */
class ASO_Materials_Simple extends WP_REST_Controller {

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
            $this->rest_base.'/(?P<config_id>\d+)/materials/(?P<material_id>\d+)/shapes',
            array(
                array(
                    'methods'             => \WP_REST_Server::EDITABLE,
                    'callback'            => array( $this, 'save_material_shapes' ),
                    'permission_callback' => array( $this, 'get_items_permissions_check' ),
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
                ),
                array(
                    'methods'             => \WP_REST_Server::READABLE,
                    'callback'            => array( $this, 'get_material_shapes' ),
                    'permission_callback' => array( $this, 'get_items_permissions_check' ),
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
                ),  
            )
        );
        register_rest_route(
            $this->namespace,
            $this->rest_base.'/(?P<config_id>\d+)/materials/(?P<material_id>\d+)/sizes',
            array(
                array(
                    'methods'             => \WP_REST_Server::EDITABLE,
                    'callback'            => array( $this, 'save_material_sizes' ),
                    'permission_callback' => array( $this, 'get_items_permissions_check' ),
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
                ),
                array(
                    'methods'             => \WP_REST_Server::READABLE,
                    'callback'            => array( $this, 'get_material_sizes' ),
                    'permission_callback' => array( $this, 'get_items_permissions_check' ),
                    'args'                => array(
                        'config_id' => array (
                            'type' => 'integer',
                            'required' => true,
                        ),
                        'material_id' => array (
                            'type' => 'integer',
                            'required' => true,
                        )
                    )
                )
            )
        );        
        register_rest_route(
            $this->namespace,
            $this->rest_base.'/(?P<config_id>\d+)/materials/(?P<material_id>\d+)/colors',
            array(
                array(
                    'methods'             => \WP_REST_Server::EDITABLE,
                    'callback'            => array( $this, 'save_materials_colors' ),
                    'permission_callback' => array( $this, 'get_items_permissions_check' ),
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
                ),
                array(
                    'methods'             => \WP_REST_Server::READABLE,
                    'callback'            => array( $this, 'get_material_colors' ),
                    'permission_callback' => array( $this, 'get_items_permissions_check' ),
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
            $this->rest_base.'/(?P<config_id>\d+)/materials/(?P<material_id>\d+)/borders',
            array(
                array(
                    'methods'             => \WP_REST_Server::EDITABLE,
                    'callback'            => array( $this, 'save_materials_borders' ),
                    'permission_callback' => array( $this, 'get_items_permissions_check' ),
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
                ),
                array(
                    'methods'             => \WP_REST_Server::READABLE,
                    'callback'            => array( $this, 'get_material_borders' ),
                    'permission_callback' => array( $this, 'get_items_permissions_check' ),
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
                ),
            )
        );       
        register_rest_route(
            $this->namespace,
            $this->rest_base.'/(?P<config_id>\d+)/materials/(?P<material_id>\d+)/fixing-methods',
            array(
                array(
                    'methods'             => \WP_REST_Server::EDITABLE,
                    'callback'            => array( $this, 'save_material_fixingMethods' ),
                    'permission_callback' => array( $this, 'get_items_permissions_check' ),
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
                ),
            )
        );      
        register_rest_route(
            $this->namespace,
            $this->rest_base.'/(?P<config_id>\d+)/materials/(?P<material_id>\d+)/additional-options',
            array(
                array(
                    'methods'             => \WP_REST_Server::READABLE,
                    'callback'            => array( $this, 'get_material_additionalOptions' ),
                    'permission_callback' => array( $this, 'get_items_permissions_check' ),
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
                ),    
                array(
                    'methods'             => \WP_REST_Server::CREATABLE,
                    'callback'            => array( $this, 'create_material_additionalOptions' ),
                    'permission_callback' => array( $this, 'get_items_permissions_check' ),
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
            $this->rest_base.'/(?P<config_id>\d+)/materials/(?P<material_id>\d+)/additional-options/(?P<additional_id>\d+)',
            array(
                array(
                    'methods'             => \WP_REST_Server::READABLE,
                    'callback'            => array( $this, 'get_material_additionalOption' ),
                    'permission_callback' => array( $this, 'get_items_permissions_check' ),
                    'args'                => array(
                        'config_id' => array (
                            'type' => 'integer',
                            'required' => true,
                        ),
                        'material_id' => array (
                            'type' => 'integer',
                            'required' => true,
                        ),
                        'additional_id' => array (
                            'type' => 'integer',
                            'required' => true,
                        )
                    ),
                ),    
                array(
                    'methods'             => \WP_REST_Server::EDITABLE,
                    'callback'            => array( $this, 'update_material_additionalOption' ),
                    'permission_callback' => array( $this, 'get_items_permissions_check' ),
                    'args'                => array(
                        'config_id' => array (
                            'type' => 'integer',
                            'required' => true,
                        ),
                        'material_id' => array (
                            'type' => 'integer',
                            'required' => true,
                        ),
                        'additional_id' => array (
                            'type' => 'integer',
                            'required' => true,
                        )
                    ),
                ),
                array(
                    'methods'             => \WP_REST_Server::DELETABLE,
                    'callback'            => array( $this, 'delete_material_additionalOption' ),
                    'permission_callback' => array( $this, 'get_items_permissions_check' ),
                    'args'                => array(
                        'config_id' => array (
                            'type' => 'integer',
                            'required' => true,
                        ),
                        'material_id' => array (
                            'type' => 'integer',
                            'required' => true,
                        ),
                        'additional_id' => array (
                            'type' => 'integer',
                            'required' => true,
                        )
                    ),
                ),        
            )
        );
        register_rest_route(
            $this->namespace,
            $this->rest_base.'/(?P<config_id>\d+)/materials/(?P<material_id>\d+)/additional-options/(?P<additional_id>\d+)',
            array(
                array(
                    'methods'             => \WP_REST_Server::READABLE,
                    'callback'            => array( $this, 'get_material_Options' ),
                    'permission_callback' => array( $this, 'get_items_permissions_check' ),
                    'args'                => array(
                        'config_id' => array (
                            'type' => 'integer',
                            'required' => true,
                        ),
                        'material_id' => array (
                            'type' => 'integer',
                            'required' => true,
                        ),
                        'additional_id' => array (
                            'type' => 'integer',
                            'required' => true,
                        ) 
                    )
                ),
                array(
                    'methods'             => \WP_REST_Server::CREATABLE,
                    'callback'            => array( $this, 'create_material_Options' ),
                    'permission_callback' => array( $this, 'get_items_permissions_check' ),
                    'args'                => array(
                        'config_id' => array (
                            'type' => 'integer',
                            'required' => true,
                        ),
                        'material_id' => array (
                            'type' => 'integer',
                            'required' => true,
                        ),
                        'additional_id' => array (
                            'type' => 'integer',
                            'required' => true,
                        )
                    ),
                )
            )
        );
        register_rest_route(
            $this->namespace,
            $this->rest_base.'/(?P<config_id>\d+)/materials/(?P<material_id>\d+)/additional-options/(?P<additional_id>\d+)/(?P<option_id>\d+)',
            array(
                array(
                    'methods'             => \WP_REST_Server::READABLE,
                    'callback'            => array( $this, 'get_material_Option' ),
                    'permission_callback' => array( $this, 'get_items_permissions_check' ),
                    'args'                => array(
                        'config_id' => array (
                            'type' => 'integer',
                            'required' => true,
                        ),
                        'material_id' => array (
                            'type' => 'integer',
                            'required' => true,
                        ),
                        'additional_id' => array (
                            'type' => 'integer',
                            'required' => true,
                        ),
                        'option_id' => array (
                            'type' => 'integer',
                            'required' => true,
                        )
                    ),
                    array(
                        'methods'             => \WP_REST_Server::EDITABLE,
                        'callback'            => array( $this, 'update_material_Option' ),
                        'permission_callback' => array( $this, 'get_items_permissions_check' ),
                        'args'                => array(
                            'config_id' => array (
                                'type' => 'integer',
                                'required' => true,
                            ),
                            'material_id' => array (
                                'type' => 'integer',
                                'required' => true,
                            ),
                            'additional_id' => array (
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
                        'callback'            => array( $this, 'delete_material_Option' ),
                        'permission_callback' => array( $this, 'get_items_permissions_check' ),
                        'args'                => array(
                            'config_id' => array (
                                'type' => 'integer',
                                'required' => true,
                            ),
                            'material_id' => array (
                                'type' => 'integer',
                                'required' => true,
                            ),
                            'additional_id' => array (
                                'type' => 'integer',
                                'required' => true,
                            ),
                            'option_id' => array (
                                'type' => 'integer',
                                'required' => true,
                            )
                        ),
                    ),   
                )
            )
        );
    }

    /**
     * Save a collection of shapes.
     *
     * @param WP_REST_Request $request Full details about the request.
     *
     * @return WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function save_material_shapes( $request ) {
        $config_id = $request->get_param('config_id');
        $material_id = $request->get_param('material_id');
        if($config_id != 0){
            $meta_value = get_post_meta($config_id,'aso-configs-meta',true);
            if(is_array($meta_value) && !empty($meta_value)){
                if(isset($meta_value['data']['materials'][$material_id]) && $meta_value['data']['materials'][$material_id]['type'] === "simple"){
                    $new_shapes = json_decode($request->get_body(),true);
                    if($meta_value['data']['materials'][$material_id]['data']['shapes'] !== $new_shapes){
                        $meta_value['data']['materials'][$material_id]['data']['shapes'] = $new_shapes;
                        $update = update_post_meta($config_id,'aso-configs-meta',$meta_value);
                        if($update === true){
                            return rest_ensure_response(["success"=>true, "message"=>__("Materiel component shapes successfully updated","ASO")]);
                        }else{
                            return rest_ensure_response(["success"=>false, "message"=>__("Materiel component shapes has not been updated","ASO")]);
                        }
                    }else{
                        return rest_ensure_response(["success"=>"same", "message"=>__("No change was observed","ASO")]);
                    }
                }else{
                    return rest_ensure_response(["success"=>false, "message"=>__("Materiel component shapes has not been updated","ASO")]);
                }

            }else{
                return rest_ensure_response(["sucess"=>false,"message"=>__("No config data found","ASO")]);
            }
        }else{
            return rest_ensure_response(["sucess"=>false,"message"=>__("No config data found","ASO")]);
        }
    }
    /**
     * Get a collection of shapes.
     *
     * @param WP_REST_Request $request Full details about the request.
     *
     * @return WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function get_material_shapes( $request ){
        $config_id = $request->get_param('config_id');
        $material_id = $request->get_param('material_id');
        if($config_id != 0){
            $meta_value = get_post_meta($config_id,'aso-configs-meta',true);
            if(is_array($meta_value) && !empty($meta_value)){
                if(isset($meta_value['data']['materials'][$material_id])){
                    if($meta_value['data']['materials'][$material_id]['data']['shapes']){
                        return rest_ensure_response($meta_value['data']['materials'][$material_id]['data']['shapes']);
                    }else{
                        return rest_ensure_response(["message"=>__('Shape not found',"ASO")]);
                    }    
                }
                else{
                    return rest_ensure_response(["success"=>false, "message"=>__("Materiel component shapes has not been updated","ASO")]);
                }
            }else{
                return rest_ensure_response(["sucess"=>false,"message"=>__("No config data found","ASO")]);
            }
        }else{
            return rest_ensure_response(["sucess"=>false,"message"=>__("No config data found","ASO")]);
        }        
    }

    /**
     * Save a collection of sizes.
     *
     * @param WP_REST_Request $request Full details about the request.
     *
     * @return WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function save_material_sizes( $request ) {
        $config_id = $request->get_param('config_id');
        $material_id = $request->get_param('material_id');

        if($config_id != 0){
            $meta_value = get_post_meta($config_id,'aso-configs-meta',true);
            if(is_array($meta_value) && !empty($meta_value)){
                if(isset($meta_value['data']['materials'][$material_id]) && $meta_value['data']['materials'][$material_id]['type'] === "simple"){
                    $new_sizes = json_decode($request->get_body(),true);
                    if($meta_value['data']['materials'][$material_id]['data']['sizes'] !== $new_sizes){
                        $meta_value['data']['materials'][$material_id]['data']['sizes'] = $new_sizes;
                        $update = update_post_meta($config_id,'aso-configs-meta',$meta_value);
                        if($update === true){
                            return rest_ensure_response(["success"=>true, "message"=>__("Materiel component sizes successfully updated","ASO")]);
                        }else{
                            return rest_ensure_response(["success"=>false, "message"=>__("Materiel component sizes has not been updated","ASO")]);
                        }
                    }else{
                        return rest_ensure_response(["success"=>"same", "message"=>__("No change was observed","ASO")]);
                    }
                }else{
                    return rest_ensure_response(["success"=>false, "message"=>__("Materiel component sizes has not been updated","ASO")]);
                }

            }else{
                return rest_ensure_response(["sucess"=>false,"message"=>__("No config data found","ASO")]);
            }
        }else{
            return rest_ensure_response(["sucess"=>false,"message"=>__("No config data found","ASO")]);
        }
    }
    /**
     * Get a collection of sizes.
     *
     * @param WP_REST_Request $request Full details about the request.
     *
     * @return WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function get_material_sizes( $request ){
        $config_id = $request->get_param('config_id');
        $material_id = $request->get_param('material_id');
        if($config_id != 0){
            $meta_value = get_post_meta($config_id,'aso-configs-meta',true);
            if(is_array($meta_value) && !empty($meta_value)){
                if(isset($meta_value['data']['materials'][$material_id])){
                    if(isset($meta_value['data']['materials'][$material_id]['data']['sizes']) && !empty($meta_value['data']['materials'][$material_id]['data']['sizes']['allSizes'])){
                        return rest_ensure_response($meta_value['data']['materials'][$material_id]['data']['sizes']);
                    }else{
                        return rest_ensure_response(["message"=>__('Sizes not found',"ASO")]);
                    }    
                }
                else{
                    return rest_ensure_response(["success"=>false, "message"=>__("Materiel ID not Found","ASO")]);
                }
            }else{
                return rest_ensure_response(["sucess"=>false,"message"=>__("No config data found","ASO")]);
            }
        }else{
            return rest_ensure_response(["sucess"=>false,"message"=>__("No config data found","ASO")]);
        }        
    }

    /**
     * Save a collection of borders.
     *
     * @param WP_REST_Request $request Full details about the request.
     *
     * @return WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function save_materials_borders( $request ) {
        $config_id = $request->get_param('config_id');
        $material_id = $request->get_param('material_id');

        if($config_id != 0){
            $meta_value = get_post_meta($config_id,'aso-configs-meta',true);
            if(is_array($meta_value) && !empty($meta_value)){
                if(isset($meta_value['data']['materials'][$material_id]) && $meta_value['data']['materials'][$material_id]['type'] === "simple"){
                    $new_borders = json_decode($request->get_body(),true);
                    if($meta_value['data']['materials'][$material_id]['data']['borders'] !== $new_borders){
                        $meta_value['data']['materials'][$material_id]['data']['borders'] = $new_borders;
                        $update = update_post_meta($config_id,'aso-configs-meta',$meta_value);
                        if($update === true){
                            return rest_ensure_response(["success"=>true, "message"=>__("Materiel component borders successfully updated","ASO")]);
                        }else{
                            return rest_ensure_response(["success"=>false, "message"=>__("Materiel component borders has not been updated","ASO")]);
                        }
                    }else{
                        return rest_ensure_response(["success"=>"same", "message"=>__("No change was observed","ASO")]);
                    }
                }else{
                    return rest_ensure_response(["success"=>false, "message"=>__("Materiel component borders has not been updated","ASO")]);
                }

            }else{
                return rest_ensure_response(["sucess"=>false,"message"=>__("No config data found","ASO")]);
            }
        }else{
            return rest_ensure_response(["sucess"=>false,"message"=>__("No config data found","ASO")]);
        }
    }
    /**
     * Get a collection of borders.
     *
     * @param WP_REST_Request $request Full details about the request.
     *
     * @return WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function get_material_borders( $request ){
        $config_id = $request->get_param('config_id');
        $material_id = $request->get_param('material_id');
        if($config_id != 0){
            $meta_value = get_post_meta($config_id,'aso-configs-meta',true);
            if(is_array($meta_value) && !empty($meta_value)){
                if(isset($meta_value['data']['materials'][$material_id])){
                    if($meta_value['data']['materials'][$material_id]['data']['borders']){
                        return rest_ensure_response($meta_value['data']['materials'][$material_id]['data']['borders']);
                    }else{
                        return rest_ensure_response(["message"=>__('Border not found',"ASO")]);
                    }    
                }
                else{
                    return rest_ensure_response(["success"=>false, "message"=>__("Materiel component borders has not been updated","ASO")]);
                }
            }else{
                return rest_ensure_response(["sucess"=>false,"message"=>__("No config data found","ASO")]);
            }
        }else{
            return rest_ensure_response(["sucess"=>false,"message"=>__("No config data found","ASO")]);
        }        
    }
    /**
     * Save a collection of colors.
     *
     * @param WP_REST_Request $request Full details about the request.
     *
     * @return WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function save_material_colors( $request ) {
        $config_id = $request->get_param('config_id');
        $material_id = $request->get_param('material_id');

        if($config_id != 0){
            $meta_value = get_post_meta($config_id,'aso-configs-meta',true);
            if(is_array($meta_value) && !empty($meta_value)){
                if(isset($meta_value['data']['materials'][$material_id]) && $meta_value['data']['materials'][$material_id]['type'] === "simple"){
                    $new_colors = json_decode($request->get_body(),true);
                    if($meta_value['data']['materials'][$material_id]['data']['colors'] !== $new_colors){
                        $meta_value['data']['materials'][$material_id]['data']['colors'] = $new_colors;
                        $update = update_post_meta($config_id,'aso-configs-meta',$meta_value);
                        if($update === true){
                            return rest_ensure_response(["success"=>true, "message"=>__("Materiel component colors successfully updated","ASO")]);
                        }else{
                            return rest_ensure_response(["success"=>false, "message"=>__("Materiel component colors has not been updated","ASO")]);
                        }
                    }else{
                        return rest_ensure_response(["success"=>"same", "message"=>__("No change was observed","ASO")]);
                    }
                }else{
                    return rest_ensure_response(["success"=>false, "message"=>__("Materiel component colors has not been updated","ASO")]);
                }

            }else{
                return rest_ensure_response(["sucess"=>false,"message"=>__("No config data found","ASO")]);
            }
        }else{
            return rest_ensure_response(["sucess"=>false,"message"=>__("No config data found","ASO")]);
        }
    }
    /**
     * Get a collection of colors.
     *
     * @param WP_REST_Request $request Full details about the request.
     *
     * @return WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function get_material_colors( $request ){
        $config_id = $request->get_param('config_id');
        $material_id = $request->get_param('material_id');
        if($config_id != 0){
            $meta_value = get_post_meta($config_id,'aso-configs-meta',true);
            if(is_array($meta_value) && !empty($meta_value)){
                if(isset($meta_value['data']['materials'][$material_id])){
                    if($meta_value['data']['materials'][$material_id]['data']['colors']){
                        return rest_ensure_response($meta_value['data']['materials'][$material_id]['data']['colors']);
                    }else{
                        return rest_ensure_response(["message"=>__('Color not found',"ASO")]);
                    }    
                }
                else{
                    return rest_ensure_response(["success"=>false, "message"=>__("Materiel component colors has not been updated","ASO")]);
                }
            }else{
                return rest_ensure_response(["sucess"=>false,"message"=>__("No config data found","ASO")]);
            }
        }else{
            return rest_ensure_response(["sucess"=>false,"message"=>__("No config data found","ASO")]);
        }  

    }
    /**
     * Save a collection of fixingMethods.
     *
     * @param WP_REST_Request $request Full details about the request.
     *
     * @return WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function save_material_fixingMethods( $request ) {
        $config_id = $request->get_param('config_id');
        $material_id = $request->get_param('material_id');

        if($config_id != 0){
            $meta_value = get_post_meta($config_id,'aso-configs-meta',true);
            if(is_array($meta_value) && !empty($meta_value)){
                if(isset($meta_value['data']['materials'][$material_id]) && $meta_value['data']['materials'][$material_id]['type'] === "simple"){
                    $new_fixingMethods = json_decode($request->get_body(),true);
                    if($meta_value['data']['materials'][$material_id]['data']['fixingMethods'] !== $new_fixingMethods){
                        $meta_value['data']['materials'][$material_id]['data']['fixingMethods'] = $new_fixingMethods;
                        $update = update_post_meta($config_id,'aso-configs-meta',$meta_value);
                        if($update === true){
                            return rest_ensure_response(["success"=>true, "message"=>__("Materiel component fixingMethods successfully updated","ASO")]);
                        }else{
                            return rest_ensure_response(["success"=>false, "message"=>__("Materiel component fixingMethods has not been updated","ASO")]);
                        }
                    }else{
                        return rest_ensure_response(["success"=>"same", "message"=>__("No change was observed","ASO")]);
                    }
                }else{
                    return rest_ensure_response(["success"=>false, "message"=>__("Materiel component fixingMethods has not been updated","ASO")]);
                }

            }else{
                return rest_ensure_response(["sucess"=>false,"message"=>__("No config data found","ASO")]);
            }
        }else{
            return rest_ensure_response(["sucess"=>false,"message"=>__("No config data found","ASO")]);
        }
    }
    /**
     * Get a collection of fixingMethods.
     *
     * @param WP_REST_Request $request Full details about the request.
     *
     * @return WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function get_material_fixingMethods( $request ){
        $config_id = $request->get_param('config_id');
        $material_id = $request->get_param('material_id');
        if($config_id != 0){
            $meta_value = get_post_meta($config_id,'aso-configs-meta',true);
            if(is_array($meta_value) && !empty($meta_value)){
                if(isset($meta_value['data']['materials'][$material_id])){
                    if($meta_value['data']['materials'][$material_id]['data']['fixingMethods']){
                        return rest_ensure_response($meta_value['data']['materials'][$material_id]['data']['fixingMethods']);
                    }else{
                        return rest_ensure_response(["message"=>__('Fixing Methods not found',"ASO")]);
                    }    
                }
                else{
                    return rest_ensure_response(["success"=>false, "message"=>__("Materiel component fixing Methods has not been updated","ASO")]);
                }
            }else{
                return rest_ensure_response(["sucess"=>false,"message"=>__("No config data found","ASO")]);
            }
        }else{
            return rest_ensure_response(["sucess"=>false,"message"=>__("No config data found","ASO")]);
        }
        
    }
    /**
     * Create material additionnal option.
     *
     * @param WP_REST_Request $request Full details about the request.
     *
     * @return WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function create_material_additionalOptions($request) {
        $config_id = $request->get_param('config_id');
        $material_id = $request->get_param('material_id');
        if ($config_id != 0) {
            $meta = get_post_meta($config_id, 'aso-configs-meta', true);
            if (is_array($meta) && !empty($meta)) {
                $material = json_decode($request->get_body(), true);
                if (isset($meta['materials'][$material_id]) && isset($meta['materials'][$material_id]['additionalOption']) && in_array($material['type'],['simple','advance'])) {
                    $new_additional = json_decode($request->get_body(), true);
                    $additional = [
                        "name" => $new_additional['name'],
                        "description" => $new_additional['description'],
                        "icon" => $new_additional['icon'],
                    ];
                    array_push($meta['materials'][$material_id]['additionalOption'], $additional);
                    $update = update_post_meta($config_id, 'aso-configs-meta', $meta);
                    if ($update === true) {
                        return rest_ensure_response(["success" => true, "message" => __("Material component Additional Option successfully added", "ASO")]);
                    } else {
                        return rest_ensure_response(["success" => false, "message" => __("Material component Additional Option has not been added", "ASO")]);
                    }
                } else {
                    return rest_ensure_response(["success" => false, "message" => __("Additional Option array not found in meta data", "ASO")]);
                }
            } else {
                return rest_ensure_response(["success" => false, "message" => __("Material ID not found in meta data", "ASO")]);
            }
        } else {
            return rest_ensure_response(["success" => false, "message" => __("Invalid configuration ID", "ASO")]);
        }
    } 
    /**
     * Read material additionnal option.
     *
     * @param WP_REST_Request $request Full details about the request.
     *
     * @return WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function  get_material_additionalOptions ($request) {
        $config_id = $request->get_param('config_id');
        $material_id = $request->get_param('material_id');
        if($config_id != 0){
            $meta_value = get_post_meta($config_id,'aso-configs-meta',true);
            if(is_array($meta_value) && !empty($meta_value)){
                if(isset($meta_value['data']['materials'][$material_id])){
                    if($meta_value['data']['materials'][$material_id]['data']['additionalOption']){
                        return rest_ensure_response($meta_value['data']['materials'][$material_id]['data']['additionalOption']);
                    }else{
                        return rest_ensure_response(["message"=>__('Additional Option not found',"ASO")]);
                    }    
                }
                else{
                    return rest_ensure_response(["success"=>false, "message"=>__("Materiel component Additional Option has not been updated","ASO")]);
                }
            }else{
                return rest_ensure_response(["sucess"=>false,"message"=>__("No config data found","ASO")]);
            }
        }else{
            return rest_ensure_response(["sucess"=>false,"message"=>__("No config data found","ASO")]);
        }    
    }
    /**
     * update material additionnal option.
     *
     * @param WP_REST_Request $request Full details about the request.
     *
     * @return WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function update_material_additionalOption ($request) {
        $config_id = $request->get_param('config_id');
        $material_id = $request->get_param('material_id');
        $additional_id = $request->get_param('additional_id');
        if($config_id != 0){
            $meta = get_post_meta($config_id,'aso-configs-meta',true);
            if(is_array($meta) && !empty($meta)){
                $material = json_decode($request->get_body(),true);
                $additional = json_decode($request->get_body(),true);
                if(isset($meta['materials'][$material_id]) && isset($meta['materials'][$material_id]['additionalOption'][$additional_id]) && in_array($material['type'],['simple','advance'])){
                    $old_additional = $meta['materials'][$material_id]['additionalOption'][$additional_id];
                    if($old_additional !== $additional){
                        $old_additional["name"] = $additional['name'];
                        $old_additional["description"] = $additional['description'];
                        $old_additional["icon"] = $additional['icon'];
                        $old_additional["popImg"] = $additional['popImg'];
                        $meta['materials'][$material_id]['additionalOption'][$additional_id] = $old_additional;
                        $update = update_post_meta($config_id,'aso-configs-meta',$meta);
                        if($update === true){
                            return rest_ensure_response(["success"=>true, "message"=>__("Materiel component Additional Option successfully edited","ASO")]);
                        }else{
                            return rest_ensure_response(["success"=>false, "message"=>__("Materiel component Additional Option  has not been edited","ASO")]);
                        }
                    }else{
                        return rest_ensure_response(["success"=>"same", "message"=>__("No change was observed","ASO")]);
                    }
                }else{
                    return rest_ensure_response(["success"=>false, "message"=>__("Materiel component Additional Option  has not been edited","ASO")]);
                }
            }else{
                return rest_ensure_response(["success"=>false, "message"=>__("Materiel component Additional Option  has not been edited","ASO")]);
            }
        }else{
            return rest_ensure_response(["message"=>__("No Configuration found","ASO")]);
        } 
    }
    /**
     * Delatable material additionnal option.
     *
     * @param WP_REST_Request $request Full details about the request.
     *
     * @return WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function delete_material_additionalOption ($request) {
        $config_id = $request->get_param('config_id');
        $material_id = $request->get_param('material_id');
        $additional_id = $request->get_param('additional_id');
        if($config_id != 0){
            $meta = get_post_meta($config_id,'aso-configs-meta',true);
            if(is_array($meta) && !empty($meta)){
                if($meta['materials'][$material_id]['additionalOption'][$additional_id]){
                    array_splice($meta['materials'][$material_id]['additionalOption'],$additional_id,1);
                    return rest_ensure_response(['success'=>true,"message"=>__("Component Additional Option successfully deleted","ASO")]);
                }else{
                    return rest_ensure_response(['success'=>false,"message"=>__("No materials component Additional Option found","ASO")]);
                }
            }else{                    
                return rest_ensure_response(['success'=>false,"message"=>__("No materials component Additional Option found","ASO")]);
            }
        }else{
            return rest_ensure_response(['success'=>false,"message"=>__("No Materials Additional Option found","ASO")]);
        }
        
    }
    /**
     * Create material option.
     *
     * @param WP_REST_Request $request Full details about the request.
     *
     * @return WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function create_material_Options ($request) {
        $config_id = $request->get_param('config_id');
        $material_id = $request->get_param('material_id');
        $additional_id = $request->get_param('additional_id');
        if ($config_id != 0) {
            $meta = get_post_meta($config_id, 'aso-configs-meta', true);
            if (is_array($meta) && !empty($meta)) {
                $material = json_decode($request->get_body(), true);
                if (isset($meta['materials'][$material_id]) && isset($meta['materials'][$material_id]['additionalOption']) && isset($meta['materials'][$material_id]['additionalOption'][$additional_id]['options']) ) {
                    $new_option = json_decode($request->get_body(), true);
                    if ($material['type'] === 'simple') {
                        $option = [
                            "name" => $new_option['name'],
                            "description" => $new_option['description'],
                            "icon" => $new_option['icon'],
                            "image"=>$new_option['image'],
                            "additionalPrice"=>$new_option['additionalPrice'] 
                        ];
                        array_push($meta['materials'][$material_id]['additionalOption'][$additional_id]['options'], $option);
                        $update = update_post_meta($config_id, 'aso-configs-meta', $meta);
                        if ($update === true) {
                            return rest_ensure_response(["success" => true, "message" => __("Material component Option successfully added", "ASO")]);
                        } else {
                            return rest_ensure_response(["success" => false, "message" => __("Material component  Option has not been added", "ASO")]);
                        }
                    } else {
                        return rest_ensure_response(["success" => false, "message" => __(" Option type is not simple", "ASO")]);
                    }
                } else {
                    return rest_ensure_response(["success" => false, "message" => __(" Option array not found in meta data", "ASO")]);
                }
            } else {
                return rest_ensure_response(["success" => false, "message" => __("Material ID not found in meta data", "ASO")]);
            }
        } else {
            return rest_ensure_response(["success" => false, "message" => __("Invalid configuration ID", "ASO")]);
        }  
    }
    /**
     * Read material option.
     *
     * @param WP_REST_Request $request Full details about the request.
     *
     * @return WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function get_material_Options ($request) {
        $config_id = $request->get_param('config_id');
        $material_id = $request->get_param('material_id');
        $additional_id = $request->get_param('additional_id');
        if($config_id != 0){
            $meta_value = get_post_meta($config_id,'aso-configs-meta',true);
            if(is_array($meta_value) && !empty($meta_value)){
                if(isset($meta_value['data']['materials'][$material_id])){
                    if($meta_value['data']['materials'][$material_id]['data']['additionalOption'][$additional_id]['options']){
                        return rest_ensure_response($meta_value['data']['materials'][$material_id]['data']['additionalOption'][$additional_id]['option']);
                    }else{
                        return rest_ensure_response(["message"=>__(' Option not found',"ASO")]);
                    }    
                }
                else{
                    return rest_ensure_response(["success"=>false, "message"=>__("Materiel component  Option has not been updated","ASO")]);
                }
            }else{
                return rest_ensure_response(["sucess"=>false,"message"=>__("No config data found","ASO")]);
            }
        }else{
            return rest_ensure_response(["sucess"=>false,"message"=>__("No config data found","ASO")]);
        } 
    }
    /**
     * update material option.
     *
     * @param WP_REST_Request $request Full details about the request.
     *
     * @return WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function update_material_Option ($request) {
        $config_id = $request->get_param('config_id');
        $material_id = $request->get_param('material_id');
        $additional_id = $request->get_param('additional_id');
        $option_id = $request->get_param('option_id');
        if($config_id != 0){
            $meta = get_post_meta($config_id,'aso-configs-meta',true);
            if(is_array($meta) && !empty($meta)){
                $material = json_decode($request->get_body(),true);
                $option = json_decode($request->get_body(),true);
                if(isset($meta['materials'][$material_id]) && isset($meta['materials'][$material_id]['additionalOption'][$additional_id]) && in_array($material['type'],['simple','advance'])){
                    $old_option = $meta['materials'][$material_id]['additionalOption'][$additional_id]['options'][$option_id];
                    if($old_option !== $option){
                        $old_option["name"] = $option['name'];
                        $old_option["description"] = $option['description'];
                        $old_option["icon"] = $option['icon'];
                        $old_option["popImg"] = $option['popImg'];
                        $meta['materials'][$material_id]['additionalOption'][$additional_id] = $old_option;
                        $update = update_post_meta($config_id,'aso-configs-meta',$meta);
                        if($update === true){
                            return rest_ensure_response(["success"=>true, "message"=>__("Materiel component  Option successfully edited","ASO")]);
                        }else{
                            return rest_ensure_response(["success"=>false, "message"=>__("Materiel component  Option  has not been edited","ASO")]);
                        }
                    }else{
                        return rest_ensure_response(["success"=>"same", "message"=>__("No change was observed","ASO")]);
                    }
                }else{
                    return rest_ensure_response(["success"=>false, "message"=>__("Materiel component Option  has not been edited","ASO")]);
                }
            }else{
                return rest_ensure_response(["success"=>false, "message"=>__("Materiel component  Option  has not been edited","ASO")]);
            }
        }else{
            return rest_ensure_response(["message"=>__("No Configuration found","ASO")]);
        } 
    }

    /**
     * Delatable material option.
     *
     * @param WP_REST_Request $request Full details about the request.
     *
     * @return WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function delete_material_Option ($request) {
        $config_id = $request->get_param('config_id');
        $material_id = $request->get_param('material_id');
        $additional_id = $request->get_param('additional_id');
        $option_id = $request->get_param('additional_id');
        if($config_id != 0){
            $meta = get_post_meta($config_id,'aso-configs-meta',true);
            if(is_array($meta) && !empty($meta)){
                if($meta['materials'][$material_id]['additionalOption'][$additional_id]['options'][$option_id]){
                    array_splice($meta['materials'][$material_id]['additionalOption'][$additional_id]['option'],$option_id,1);
                    return rest_ensure_response(['success'=>true,"message"=>__("Component  Option successfully deleted","ASO")]);
                }else{
                    return rest_ensure_response(['success'=>false,"message"=>__("No materials component  Option found","ASO")]);
                }
            }else{                    
                return rest_ensure_response(['success'=>false,"message"=>__("No materials component Option found","ASO")]);
            }
        }else{
            return rest_ensure_response(['success'=>false,"message"=>__("No Materials Option found","ASO")]);
        }  
    }
    /**
     * Checks if a given request has access to read the items.
     *
     * @param  WP_REST_Request $request Full details about the request.
     *
     * @return true|WP_Error True if the request has read access, WP_Error object otherwise.
     */
    public function get_items_permissions_check( $request ) {
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
