<?php
namespace ASO\Api\Admin\Settings;

use WP_Error;
use WP_Post;
use WP_Query;
use WP_REST_Controller;

/**
 * class for api routes reaching language images settings
 */
class ASO_Api_Language_Images_Settings extends WP_REST_Controller {
    
    /**
     * [__construct description]
     */
    public function __construct() {
        $this->namespace = 'aso/v1';
        $this->rest_base = 'configs/(?P<config_id>\d+)/settings/language-images';
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
                    'callback'            => array( $this, 'get_language_images_settings' ),
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
            '/' . $this->rest_base."/main",
            array(
                array(
                    'methods'             => \WP_REST_Server::EDITABLE,
                    'callback'            => array( $this, 'update_main_options_language_images_settings' ),
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
            '/' . $this->rest_base."/customizer-design",
            array(
                array(
                    'methods'             => \WP_REST_Server::EDITABLE,
                    'callback'            => array( $this, 'update_customizer_design_options_language_images_settings' ),
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
            '/' . $this->rest_base."/visualizer",
            array(
                array(
                    'methods'             => \WP_REST_Server::EDITABLE,
                    'callback'            => array( $this, 'update_visualizer_options_language_images_settings' ),
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
                    'callback'            => array( $this, 'update_image_language_images_settings' ),
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
     * Get all language images settings
     * @param \WP_REST_Request $request Full details about the request.
     * @return \WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
    */
    public function get_language_images_settings($request){
        $id = $request->get_param('config_id');
        if($id!=0){
            $post = get_post($id);
            if($post){
                $meta_value = get_post_meta($id, 'aso-configs-meta', true);
                if(empty($meta_value)){
                    return rest_ensure_response(["message" => "No Settings found"]);
                }else{
                    if(isset($meta_value["settings"]["languageImages"])){
                        return rest_ensure_response($meta_value["settings"]["languageImages"]);
                    }
                    return rest_ensure_response(["message" => __("No language Images Settings found","ASO")]);
                }
            }else{
                return rest_ensure_response(["message" => __("Custom ID invalid","ASO")]);
            }
        }else{
            return rest_ensure_response(["message" =>__("Custom ID invalid","ASO")]);
        }
    }
     /**
     * Update Main options of language images settings 
     * @param \WP_REST_Request $request Full details about the request.
     * @return \WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
    */
    public function update_main_options_language_images_settings($request){
        $id = $request->get_param('config_id');
        $main_options = json_decode($request->get_body(),true);
        if($id!=0){
            $post = get_post($id);
            if($post){
                $meta_value = get_post_meta($id, 'aso-configs-meta', true);
                if(empty($meta_value)){
                    $meta_value=array();
                    $meta_value["settings"]["languageImages"]['main'] = $main_options;
                }else{
                    $meta_value["settings"]["languageImages"]['main'] = $main_options;
                }
                $response = update_post_meta($id,'aso-configs-meta',$meta_value);

                if($response){
                    return rest_ensure_response(["success" =>__("Main options in language Images settings added successfully","ASO")]);
                }else{
                    return rest_ensure_response(["message" => __("Add Main options in language Images settings failed","ASO")]);
                }
            }else{
                return rest_ensure_response(["message" => __("Custom ID invalid","ASO")]);
            }
        }else{
            return rest_ensure_response(["message" => __("Custom ID invalid","ASO")]);
        }
    }
     /**
     * Update Customizer design options of language images settings 
     * @param \WP_REST_Request $request Full details about the request.
     * @return \WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
    */
    public function  update_customizer_design_options_language_images_settings($request){
        $id = $request->get_param('config_id');
        $customizer_options = json_decode($request->get_body(),true);
        if($id!=0){
            $post = get_post($id);
            if($post){
                $meta_value = get_post_meta($id, 'aso-configs-meta', true);
                if(empty($meta_value)){
                    $meta_value=array();
                    $meta_value["settings"]["languageImages"]['customizerDesign'] =   $customizer_options;
                }else{
                    $meta_value["settings"]["languageImages"]['customizerDesign'] =   $customizer_options;
                }
                $response = update_post_meta($id,'aso-configs-meta',$meta_value);

                if($response){
                    return rest_ensure_response(["success" => __("Customizer Design options in language Images settings added successfully","ASO")]);
                }else{
                    return rest_ensure_response(["message" => __("Add Customizer Design options in language Images settings failed","ASO")]);
                }
            }else{
                return rest_ensure_response(["message" => __("Custom ID invalid","ASO")]);
            }
        }else{
            return rest_ensure_response(["message" => __("Custom ID invalid","ASO")]);
        }
    }
     /**
     * Update visualizer design options of language images settings 
     * @param \WP_REST_Request $request Full details about the request.
     * @return \WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
    */
    public function update_visualizer_options_language_images_settings ($request){
        $id = $request->get_param('config_id');
        $visualizer_options = json_decode($request->get_body(),true);
        if($id!=0){
            $post = get_post($id);
            if($post){
                $meta_value = get_post_meta($id, 'aso-configs-meta', true);
                if(empty($meta_value)){
                    $meta_value=array();
                    $meta_value["settings"]["languageImages"]['visualizerDesign'] =   $visualizer_options;
                }else{
                    $meta_value["settings"]["languageImages"]['visualizerDesign'] =   $visualizer_options;
                }
                $response = update_post_meta($id,'aso-configs-meta',$meta_value);

                if($response){
                    return rest_ensure_response(["success" => __("Visualizer options in language Images settings added successfully","ASO")]);
                }else{
                    return rest_ensure_response(["message" => __("Add Visualizer options in language Images settings failed","ASO")]);
                }
            }else{
                return rest_ensure_response(["message" => __("Custom ID invalid","ASO")]);
            }
        }else{
            return rest_ensure_response(["message" => __("Custom ID invalid","ASO")]);
        }
    }
     /**
     * Update images options of language images settings 
     * @param \WP_REST_Request $request Full details about the request.
     * @return \WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
    */
    public function update_image_language_images_settings ($request){
        $id = $request->get_param('config_id');
        $image_options = json_decode($request->get_body(),true);
        if($id!=0){
            $post = get_post($id);
            if($post){
                $meta_value = get_post_meta($id, 'aso-configs-meta', true);
                if(empty($meta_value)){
                    $meta_value=array();
                    $meta_value["settings"]["languageImages"]['images'] =   $image_options;
                }else{
                    $meta_value["settings"]["languageImages"]['images'] =   $image_options;
                }
                $response = update_post_meta($id,'aso-configs-meta',$meta_value);

                if($response){
                    return rest_ensure_response(["success" => __("Images options in language Images settings added successfully","ASO")]);
                }else{
                    return rest_ensure_response(["message" => __("Add Images options in language Images settings failed","ASO")]);
                }
            }else{
                return rest_ensure_response(["message" => __("Custom ID invalid","ASO")]);
            }
        }else{
            return rest_ensure_response(["message" => __("Custom ID invalid","ASO")]);
        }
    }
}