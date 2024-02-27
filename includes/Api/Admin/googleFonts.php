<?php
namespace ASO\Api\Admin;

use WP_Error;
use WP_Post;
use WP_Query;
use WP_REST_Controller;

/**
 * REST_API Handler
 */
class ASO_Api_GoogleFonts extends WP_REST_Controller {

    /**
     * [__construct description]
     */
    public function __construct() {
        $this->namespace = 'aso/v1';
        $this->rest_base = 'google-fonts';
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
                    'callback'            => array( $this, 'get_google_fonts' ),
                    'permission_callback' => array( $this, 'get_config_permissions_check' )
                ),
            )
        );
    }

    /**
     * GEt Google fonts
     * @param \WP_REST_Request $request Full details about the request.
     *
     * @return \WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function get_google_fonts( $request ) {
        $json = file_get_contents(ASO_INCLUDES.'/Api/Admin/google-fonts.json');
        if($json){
            $json = json_decode($json);
            return rest_ensure_response($json->items);
        } else {
            return rest_ensure_response([]);
        }
    }    

    /**
     * Checks if a given request has access to read the items.
     *
     * @param  \WP_REST_Request $request Full details about the request.
     *
     * @return true|WP_Error True if the request has read access, WP_Error object otherwise.
     */
    public function get_config_permissions_check( $request ) {
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
