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
                    'callback'            => array( $this, 'save_materials_shapes' ),
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
                    'callback'            => array( $this, 'save_materials_sizes' ),
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
                        'callback'            => array( $this, 'deletable_material_Option' ),
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
    public function save_materials_shapes( $request ) {
        $config_id = $request->get_param('config_id');
        $material_id = $request->get_param('material_id');

        if($config_id != 0){
            $meta_value = get_post_meta($config_id,'aso-configs-meta',true);
            if(is_array($meta_value) && !empty($meta_value)){
                if(isset($meta_value['materials'][$material_id]) && $meta_value['materials'][$material_id]['type'] === "no-sub-component"){
                    $new_shapes = json_decode($request->get_body(),true);
                    if($meta_value['materials'][$material_id]['shapes'] !== $new_shapes){
                        $meta_value['materials'][$material_id]['shapes'] = $new_shapes;
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

    }

    /**
     * Save a collection of sizes.
     *
     * @param WP_REST_Request $request Full details about the request.
     *
     * @return WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function save_materials_sizes( $request ) {
        $config_id = $request->get_param('config_id');
        $material_id = $request->get_param('material_id');

        if($config_id != 0){
            $meta_value = get_post_meta($config_id,'aso-configs-meta',true);
            if(is_array($meta_value) && !empty($meta_value)){
                if(isset($meta_value['materials'][$material_id]) && $meta_value['materials'][$material_id]['type'] === "no-sub-component"){
                    $new_shapes = json_decode($request->get_body(),true);
                    if($meta_value['materials'][$material_id]['sizes'] !== $new_shapes){
                        $meta_value['materials'][$material_id]['sizes'] = $new_shapes;
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
                if(isset($meta_value['materials'][$material_id]) && $meta_value['materials'][$material_id]['type'] === "no-sub-component"){
                    $new_shapes = json_decode($request->get_body(),true);
                    if($meta_value['materials'][$material_id]['borders'] !== $new_shapes){
                        $meta_value['materials'][$material_id]['borders'] = $new_shapes;
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
        
    }
    /**
     * Save a collection of colors.
     *
     * @param WP_REST_Request $request Full details about the request.
     *
     * @return WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function save_materials_colors( $request ) {
        $config_id = $request->get_param('config_id');
        $material_id = $request->get_param('material_id');

        if($config_id != 0){
            $meta_value = get_post_meta($config_id,'aso-configs-meta',true);
            if(is_array($meta_value) && !empty($meta_value)){
                if(isset($meta_value['materials'][$material_id]) && $meta_value['materials'][$material_id]['type'] === "no-sub-component"){
                    $new_shapes = json_decode($request->get_body(),true);
                    if($meta_value['materials'][$material_id]['colors'] !== $new_shapes){
                        $meta_value['materials'][$material_id]['colors'] = $new_shapes;
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

    }
    /**
     * Save a collection of fixingMethods.
     *
     * @param WP_REST_Request $request Full details about the request.
     *
     * @return WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function save_materials_fixingMethods( $request ) {
        $config_id = $request->get_param('config_id');
        $material_id = $request->get_param('material_id');

        if($config_id != 0){
            $meta_value = get_post_meta($config_id,'aso-configs-meta',true);
            if(is_array($meta_value) && !empty($meta_value)){
                if(isset($meta_value['materials'][$material_id]) && $meta_value['materials'][$material_id]['type'] === "no-sub-component"){
                    $new_shapes = json_decode($request->get_body(),true);
                    if($meta_value['materials'][$material_id]['fixingMethods'] !== $new_shapes){
                        $meta_value['materials'][$material_id]['fixingMethods'] = $new_shapes;
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

        
    }
    /**
     * Create material additionnal option.
     *
     * @param WP_REST_Request $request Full details about the request.
     *
     * @return WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function create_materials_additionalOptions ($request) {

    }
    /**
     * Read material additionnal option.
     *
     * @param WP_REST_Request $request Full details about the request.
     *
     * @return WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function  get_materials_additionalOptions ($request) {
        
    }
    /**
     * update material additionnal option.
     *
     * @param WP_REST_Request $request Full details about the request.
     *
     * @return WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function update_materials_additionalOptions ($request) {
        
    }
    /**
     * Delatable material additionnal option.
     *
     * @param WP_REST_Request $request Full details about the request.
     *
     * @return WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function delete_materials_additionalOptions ($request) {
        
    }
    /**
     * Create material option.
     *
     * @param WP_REST_Request $request Full details about the request.
     *
     * @return WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function create_materials_Options ($request) {
        
    }
    /**
     * Read material option.
     *
     * @param WP_REST_Request $request Full details about the request.
     *
     * @return WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function get_materials_Options ($request) {
        
    }
    /**
     * update material option.
     *
     * @param WP_REST_Request $request Full details about the request.
     *
     * @return WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function update_materials_Options ($request) {
        
    }

    /**
     * Delatable material option.
     *
     * @param WP_REST_Request $request Full details about the request.
     *
     * @return WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function deletable_materials_Options($request) {
        
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
