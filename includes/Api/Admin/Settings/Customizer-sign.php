<?php
namespace ASO\Api\Admin\Settings;

use WP_Error;
use WP_Post;
use WP_Query;
use WP_REST_Controller;

/**
 * class for api routes reaching custom design settings
 */
class ASO_Api_Customizer_Sign_Settings extends WP_REST_Controller {
    
    /**
     * [__construct description]
     */
    public function __construct() {
        $this->namespace = 'aso/v1';
        $this->rest_base = 'configs/(?P<config_id>\d+)/settings/customizer-signs';
    }
    /**
     * Register the routes
     *
     * @return void
     */
    public function register_routes() {
        register_rest_route(
            $this->namespace,
            '/' . $this->rest_base,
            array(
                array(
                    'methods'             => \WP_REST_Server::READABLE,
                    'callback'            => array( $this, 'get_customizer_sign_settings' ),
                    'permission_callback' => array( $this, 'get_config_permissions_check' ),
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
            '/' . $this->rest_base."/customizer",
            array(
                array(
                    'methods'             => \WP_REST_Server::EDITABLE,
                    'callback'            => array( $this, 'update_customizer_options_customizer_sign_settings' ),
                    'permission_callback' => array( $this, 'get_config_permissions_check' ),
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
            '/' . $this->rest_base."/sign-part",
            array(
                array(
                    'methods'             => \WP_REST_Server::EDITABLE,
                    'callback'            => array( $this, 'update_sign_part_customizer_sign_settings' ),
                    'permission_callback' => array( $this, 'get_config_permissions_check' ),
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
            '/' . $this->rest_base."/text",
            array(
                array(
                    'methods'             => \WP_REST_Server::EDITABLE,
                    'callback'            => array( $this, 'update_text_option_customizer_sign_settings' ),
                    'permission_callback' => array( $this, 'get_config_permissions_check' ),
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
            '/' . $this->rest_base."/image",
            array(
                array(
                    'methods'             => \WP_REST_Server::EDITABLE,
                    'callback'            => array( $this, 'update_image_customizer_sign_settings' ),
                    'permission_callback' => array( $this, 'get_config_permissions_check' ),
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
     * Get all customizer sign settings
     * @param \WP_REST_Request $request Full details about the request.
     * @return \WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
    */
    public function get_customizer_sign_settings($request){
        $id = $request->get_param('config_id');
        if($id!=0){
            $post = get_post($id);
            if($post){
                $meta_value = get_post_meta($id, 'aso-configs-meta', true);
                if(empty($meta_value)){
                    return rest_ensure_response(["message" => "No Settings found"]);
                }else{
                    if(isset($meta_value["settings"]["customizer_sign"])){

                        return rest_ensure_response($meta_value["settings"]["customizer_sign"]);
                    }
                    return rest_ensure_response(["message" => __("No Customizer Sign Settings found","ASO")]);
                }
            }else{
                return rest_ensure_response(["message" => __("Customizer ID invalid","ASO")]);
            }
        }else{
            return rest_ensure_response(["message" => __("Customizer ID invalid","ASO")]);
        }
    }
    /**
     * Update Customizer options of customizer sign settings 
     * @param \WP_REST_Request $request Full details about the request.
     * @return \WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
    */
    public function update_customizer_options_customizer_sign_settings($request){
        $id = $request->get_param('config_id');
        $customizer_options = json_decode($request->get_body(),true);
        if($id!=0){
            $post = get_post($id);
            if($post){
                $meta_value = get_post_meta($id, 'aso-configs-meta', true);
                if(empty($meta_value)){
                    $meta_value=array();
                    $meta_value["settings"]["customizer_sign"]['customizer'] = $customizer_options;
                }else{
                    $meta_value["settings"]["customizer_sign"]['customizer'] = $customizer_options;
                }
                $response = update_post_meta($id,'aso-configs-meta',$meta_value);

                if($response){
                    return rest_ensure_response(["message" => __("customizer in customizer sign settings added successfully","ASO")]);
                }else{
                    return rest_ensure_response(["message" => __("Add customizer in customizer sign settings failed","ASO")]);
                }
            }else{
                return rest_ensure_response(["message" => __("Custom ID invalid","ASO")]);
            }
        }else{
            return rest_ensure_response(["message" => __("Custom ID invalid","ASO")]);
        }
    }
    /**
     * Update Sign part options of customizer sign settings 
     * @param \WP_REST_Request $request Full details about the request.
     * @return \WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
    */
    public function update_sign_part_customizer_sign_settings($request){
        $id = $request->get_param('config_id');
        $sign_options = json_decode($request->get_body(),true);
            if($id!=0){
            $post = get_post($id);
            if($post){
                $meta_value = get_post_meta($id, 'aso-configs-meta', true);
                if(empty($meta_value)){
                    $meta_value=array();
                    $meta_value["settings"]["customizer_sign"]['signPart'] = $sign_options;
                }else{
                    $meta_value["settings"]["customizer_sign"]['signPart'] = $sign_options;
                }
                $response = update_post_meta($id,'aso-configs-meta',$meta_value);
                if($response){
                    return rest_ensure_response(["message" => __("Sign part in customizer sign settings added successfully","ASO")]);
                }else{
                    return rest_ensure_response(["message" => __("Add Sign part in customizer sign settings failed","ASO")]);
                }
            }else{
                return rest_ensure_response(["message" => __("Custom ID invalid","ASO")]);
            }
        }else{  
            return rest_ensure_response(["message" => __("Custom ID invalid","ASO")]);
        }
    }
    /**
     * Update Text options of customizer sign settings 
     * @param \WP_REST_Request $request Full details about the request.
     * @return \WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
    */
    public function update_text_option_customizer_sign_settings ($request){
       $id = $request->get_param('config_id');
       $text_options = json_decode($request->get_body(),true);
       if($id!=0){
          $post = get_post($id);
          if($post){
                $meta_value = get_post_meta($id,'aso-configs-meta',true);
                if(empty($meta_value)){
                   $meta_value=array();
                   $meta_value["settings"]["customizer_sign"]['text'] =$text_options;
                }else{
                   $meta_value["settings"]["customizer_sign"]['text'] =$text_options; 
                }
                $response = update_post_meta($id,'aso-configs-meta',$meta_value);
                if($response){
                    return rest_ensure_response(["message"=>__("Text in customizer sign settings added successfully","ASO")]);
                }else{
                    return rest_ensure_response(["message"=>__("Add Text in customizer sign settings failed","ASO")]);
                }
            }else{
                return rest_ensure_response(["message" => __("Custom ID invalid","ASO")]);
            }
        }else{  
            return rest_ensure_response(["message" => __("Custom ID invalid","ASO")]);
        }
    }
    /**
     * Update   Image options of customizer sign settings 
     * @param \WP_REST_Request $request Full details about the request.
     * @return \WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
    */
    public function update_image_customizer_sign_settings($request){
        $id = $request->get_param('config_id');
        $image_options = json_decode($request->get_body(),true);
        if($id!=0){
            $post = get_post($id);
            if($post){
                $meta_value = get_post_meta($id, 'aso-configs-meta', true);
                if(empty($meta_value)){
                    $meta_value=array();
                    $meta_value["settings"]["customizer_sign"]['image'] = $image_options;
                }else{
                    $meta_value["settings"]["customizer_sign"]['image'] = $image_options;
                }
                $response = update_post_meta($id,'aso-configs-meta',$meta_value);

                if($response){
                    return rest_ensure_response(["message" => __("image in Customizer sign settings added successfully","ASO")]);
                }else{
                    return rest_ensure_response(["message" =>__( "Add image in Customizer sign settings failed","ASO")]);
                }
            }else{
                return rest_ensure_response(["message" => __("Custom ID invalid","ASO")]);
            }
        }else{
            return rest_ensure_response(["message" => __("Custom ID invalid","ASO")]);
        }  
    }
}   