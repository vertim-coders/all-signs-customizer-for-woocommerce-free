<?php
namespace ASO\Api\Admin\Settings;

use WP_Error;
use WP_Post;
use WP_Query;
use WP_REST_Controller;

/**
 * class for api routes reaching custom design settings
 */
class ASO_Api_Theme_color_Settings extends WP_REST_Controller {
    
    /**
     * [__construct description]
     */
    public function __construct() {
        $this->namespace = 'aso/v1';
        $this->rest_base = 'configs/(?P<config_id>\d+)/settings/theme-color';
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
                    'callback'            => array( $this, 'get_theme_color_settings' ),
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
    public function get_theme_color_settings ($request){
        $id = $request->get_param('config_id');
        if($id!=0){
            $post = get_post($id);
            if($post){
                $meta_value = get_post_meta($id, 'aso-configs-meta', true);
                if(empty($meta_value)){
                    return rest_ensure_response(["message" => "No Settings found"]);
                }else{
                    if(isset($meta_value["settings"]["theme_color"])){

                        return rest_ensure_response($meta_value["settings"]["theme_color"]);
                    }
                    return rest_ensure_response(["message" => __("No Theme color Settings found","ASO")]);
                }
            }else{
                return rest_ensure_response(["message" => __(" Theme color ID invalid","ASO")]);
            }
        }else{
            return rest_ensure_response(["message" => __("Theme color ID i nvalid","ASO")]);
        }
    }
}        