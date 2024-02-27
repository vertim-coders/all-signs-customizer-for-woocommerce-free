<?php
namespace ASO\Api\Admin\Settings;

use WP_Error;
use WP_Post;
use WP_Query;
use WP_REST_Controller;

/**
 * class for api routes reaching generals settings
 */
class ASO_Api_General_Settings extends WP_REST_Controller {
    
    /**
     * [__construct description]
     */
    public function __construct() {
        $this->namespace = 'aso/v1';
        $this->rest_base = 'configs/(?P<config_id>\d+)/settings/generals';
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
                    'callback'            => array( $this, 'get_generals_settings' ),
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
            '/' . $this->rest_base."/product",
            array(
                array(
                    'methods'             => \WP_REST_Server::EDITABLE,
                    'callback'            => array( $this, 'update_product_options_generals_settings' ),
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
            '/' . $this->rest_base."/output",
            array(
                array(
                    'methods'             => \WP_REST_Server::EDITABLE,
                    'callback'            => array( $this, 'update_output_options_generals_settings' ),
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
            '/' . $this->rest_base."/mobile",
            array(
                array(
                    'methods'             => \WP_REST_Server::EDITABLE,
                    'callback'            => array( $this, 'update_mobile_options_generals_settings' ),
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
     * Get all generals settings
     * @param \WP_REST_Request $request Full details about the request.
     * @return \WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
    */
    public function get_generals_settings($request){
        $id = $request->get_param('config_id');
        if($id!=0){
            $post = get_post($id);
            if($post){
                $meta_value = get_post_meta($id, 'aso-configs-meta', true);
                if(empty($meta_value)){
                    return rest_ensure_response(["message" => __("No Settings found","ASO")]);
                }else{
                    if(isset($meta_value["settings"]["generals"])){
                        return rest_ensure_response($meta_value["settings"]["generals"]);
                    }
                    return rest_ensure_response(["message" => __("No generals Settings found","ASO")]);
                }
            }else{
                return rest_ensure_response(["message" =>__("Custom ID invalid","ASO")]);
            }
        }else{
            return rest_ensure_response(["message" => __("Custom ID invalid","ASO")]);
        }
    }
     /**
     * Update Product options of generals settings 
     * @param \WP_REST_Request $request Full details about the request.
     * @return \WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
    */
    public function update_product_options_generals_settings ($request){
        $id = $request->get_param('config_id');
        $product_options = json_decode($request->get_body(),true);
        if($id!=0){
            $post = get_post($id);
            if($post){
                $meta_value = get_post_meta($id, 'aso-configs-meta', true);
                if(empty($meta_value)){
                    $meta_value=array();
                    $meta_value["settings"]["generals"]['product'] = $product_options;
                }else{
                    $meta_value["settings"]["generals"]['product'] = $product_options;
                }
                $response = update_post_meta($id,'aso-configs-meta',$meta_value);

                if($response){
                    return rest_ensure_response(["success" => __("Product options in generals settings added successfully","ASO")]);
                }else{
                    return rest_ensure_response(["message" => __("Add product options in generals settings failed","ASO")]);
                }
            }else{
                return rest_ensure_response(["message" => __("Custom ID invalid","ASO")]);
            }
        }else{
            return rest_ensure_response(["message" => __("Custom ID invalid","ASO")]);
        }
    }

    /**
     * Update Mobile options of generals settings 
     * @param \WP_REST_Request $request Full details about the request.
     * @return \WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
    */
    public function update_mobile_options_generals_settings($request){
        $id = $request->get_param('config_id');
        $mobile_options = json_decode($request->get_body(),true);
        if($id!=0){
            $post = get_post($id);
            if($post){
                $meta_value = get_post_meta($id, 'aso-configs-meta', true);
                if(empty($meta_value)){
                    $meta_value=array();
                    $meta_value["settings"]["generals"]['mobile'] = $mobile_options;
                }else{
                    $meta_value["settings"]["generals"]['mobile'] = $mobile_options;
                }
                $response = update_post_meta($id,'aso-configs-meta',$meta_value);

                if($response){
                    return rest_ensure_response(["success" => __("Mobile options in generals settings added successfully","ASO")]);
                }else{
                    return rest_ensure_response(["message" => __("Add mobile options in generals settings failed","ASO")]);
                }
            }else{
                return rest_ensure_response(["message" => __("Custom ID invalid","ASO")]);
            }
        }else{
            return rest_ensure_response(["message" => __("Custom ID invalid","ASO")]);
        }
    }
    /**
     * Update Output options of generals settings 
     * @param \WP_REST_Request $request Full details about the request.
     * @return \WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
    */
    public function update_output_options_generals_settings($request){
        $id = $request->get_param('config_id');
        $output_options=json_decode($request->get_body(),true);
        if($id!=0){
            $post=get_post($id);
            if($post){
                $meta_value = get_post_meta($id, 'aso-configs-meta', true); 
                if(empty($meta_value)){
                    $meta_value =array();
                    $meta_value ["settings"]["generals"]['output']=$output_options;    
                }
                else{
                    $meta_value ["settings"]["generals"]['output']=$output_options;
                }
                $response= update_post_meta($id,'aso-configs-meta',$meta_value);
                if($response){
                    return rest_ensure_response(["success" => __("Output options in generals settings added successfully","ASO")]);
                }else{
                    return rest_ensure_response(["message" => __("Add output options in generals settings failed","ASO")]);
                }
            }else{
                return rest_ensure_response(["message" => __("Custom ID invalid","ASO")]);
            }
        }else{
            return rest_ensure_response(["message" => __("Custom ID invalid","ASO")]);
        }
    }
}

   
