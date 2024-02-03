<?php
namespace ASO\Api\Admin\Materials;

use WP_Error;
use WP_REST_Controller;
use WP_REST_Request;
use WP_REST_Response;

/**
 * REST_API Handler
 */
class ASO_Materials_With_Sub_Component_Advance extends WP_REST_Controller {

    /**
     * [__construct description]
     */
    public function __construct() {
        $this->namespace = 'aso/v1';
        $this->rest_base = '/subcomponents';
    }

    /**
     * Register the routes
     *
     * @return void
     */
    public function register_routes() {
        register_rest_route(
            $this->namespace,
            $this->rest_base.'/(?P<config_id>\d+)/materials/(?P<material_id>\d+)/(?P<item_id>\d+)/subcomponent',
            array(
                array(
                    'methods'             => \WP_REST_Server::READABLE,
                    'callback'            => array( $this, 'get_subcomponent' ),
                    'permission_callback' => array( $this, 'get_permissions_check' ),
                    'args'                => array(
                        'subcomponent_id' => array (
                            'type' => 'integer',
                            'required' => true,
                        )
                    ),

                ),
                array(
                    'methods'             => \WP_REST_Server::CREATABLE,
                    'callback'            => array( $this, 'create_subcomponent_item' ),
                    'permission_callback' => array( $this, 'get_permissions_check' ),
                    'args'                => array(
                        'subcomponent_id' => array (
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
                    'callback'            => array( $this, 'get_subcomponent_item' ),
                    'permission_callback' => array( $this, 'get_permissions_check' ),
                    'args'                => array(  'config_id' => array (
                        'type' => 'integer',
                        'required' => true,
                    ),
                    'material_id' => array (
                        'type' => 'integer',
                        'required' => true,
                    ),
                    'item_id' => array (
                        'type' => 'integer',
                        'required' => true,
                    ),
                    'subcomponent_id' => array (
                        'type' => 'integer',
                        'required' => true,
                    )
                    ),

                ),
                array(
                    'methods'             => \WP_REST_Server::CREATABLE,
                    'callback'            => array( $this, 'create_subcomponent_item' ),
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
                        'item_id' => array (
                            'type' => 'integer',
                            'required' => true,
                        ),
                        'subcomponent_id' => array (
                            'type' => 'integer',
                            'required' => true,
                        )
                    ),
                )
            )
        );
    }    
}    