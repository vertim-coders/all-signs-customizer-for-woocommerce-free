<?php
namespace ASO\Api\Admin;

use WP_Error;
use WP_Post;
use WP_Query;
use WP_REST_Controller;


class ASO_Api_Manage_colors extends WP_REST_Controller {

    /**
     * [__construct description]
     */
    public function __construct() {
        $this->namespace = 'aso/v1';
        $this->rest_base = 'manage-colors';
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
                    'callback'            => array( $this, 'get_manage_colors' ),
                    'permission_callback' => array( $this, 'get_config_permissions_check' )
                ),
                array(
                    'methods'             => \WP_REST_Server::CREATABLE,
                    'callback'            => array( $this, 'add_color_to_manages_colors' ),
                    'permission_callback' => array( $this, 'get_config_permissions_check' ),
                ),
            )
        );
        register_rest_route(
            $this->namespace,
            '/' . $this->rest_base."/(?P<color_id>\d+)",
            array(
                array(
                    'methods'             => \WP_REST_Server::READABLE,
                    'callback'            => array( $this, 'get_manage_color' ),
                    'permission_callback' => array( $this, 'get_config_permissions_check' ),
                    'args'                => array (
                        'color_id' => array (
                            'type' => 'integer',
                            'required' => true,
                        )
                    ),
                ),
                array(
                    'methods'             => \WP_REST_Server::EDITABLE,
                    'callback'            => array( $this, 'update_color' ),
                    'permission_callback' => array( $this, 'get_config_permissions_check' ),
                    'args'                => array (
                        'color_id' => array (
                            'type' => 'integer',
                            'required' => true,
                        )
                    ),
                ),
                array(
                    'methods'             => \WP_REST_Server::DELETABLE,
                    'callback'            => array( $this, 'delete_manage_colors_config'),
                    'permission_callback' => array( $this, 'get_config_permissions_check' ),
                    'args'                => array (
                        'color_id' => array (
                            'type' => 'integer',
                            'required' => true,
                        )
                    ),
                )
            )
        );
    }
       /**
     * Create colors group
     * @param \WP_REST_Request $request Full details about the request.
     *
     * @return \WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function add_color_to_manages_colors ( $request ) {
        $req_color=json_decode($request->get_body(),true);
        $all_colors = get_option("aso-manages-colors",[]);
        $color_keys = array('title','textColor','backgroundColor','additonalPrice');
        $req_keys = array_keys($req_color);
        $differents_keys = array_diff($color_keys, $req_keys);
        
        if(empty($differents_keys)){
            $color['title']=$req_color['title'];
            $color['textColor']=$req_color['textColor'];
            $color['backgroundColor']=$req_color['backgroundColor'];
            $color['additonalPrice']=$req_color['additonalPrice'];
            array_push($all_colors,$color);
            $update = update_option("aso-manages-colors",$all_colors);
            if($update){
                return rest_ensure_response( ["success"=>true,"message"=>__("color created with success","ASO")] );
            }else{
                return rest_ensure_response(["success"=>false,"message" => __("Registration failed",'ASO')]);
            }
        }else{
            return rest_ensure_response(["success"=>false,"message" => __("Wrongly formatted color data","ASO")]);
        }
    }
    /**
     * Get all colors
     * @param \WP_REST_Request $request Full details about the request.
     * @return \WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function get_manage_colors($request){
        $all_colors = get_option("aso-manages-colors",[]);
        return rest_ensure_response($all_colors);      
        
    }
    /**
     * Get color info for $color id
     * @param \WP_REST_Request $request Full details about the request.
     * @return \WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function get_manage_color($request){
        $color_id=$request->get_param('color_id');
        $all_colors = get_option("aso-manages-colors",[]);
        if($all_colors[$color_id]){
            return rest_ensure_response($all_colors[$color_id]);      
        }else{
            return rest_ensure_response(["message"=>__('Color not found',"ASO")]);
        }
        
    }


    /**
     * Update of colors group
     * @param \WP_REST_Request $request Full details about the request.
     * @return \WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function update_color($request){
        $req_color=json_decode($request->get_body(),true);
        $color_id = $request->get_param( 'color_id' );
        $all_colors = get_option("aso-manages-colors",[]);
        $color_keys = array('title','textColor','backgroundColor','additonalPrice');
        $req_keys = array_keys($req_color);
        $differents_keys = array_diff($color_keys, $req_keys);

        if($all_colors[$color_id]){
            if(empty($differents_keys)){
                $color['title']=$req_color['title'];
                $color['textColor']=$req_color['textColor'];
                $color['backgroundColor']=$req_color['backgroundColor'];
                $color['additonalPrice']=$req_color['additonalPrice'];
                $all_colors[$color_id] = $color;
                $update = update_option("aso-manages-colors",$all_colors);
                if($update){
                    return rest_ensure_response(array('success' => true, "message" => __("The color has been updated with success","ASO") ) );
                }
                else{
                    return rest_ensure_response(array('success' => false, "message"=>__("Color update failed","") ) );
                }   
            }else{
                return rest_ensure_response(["success"=>false,"message" => __("Wrongly formatted color data","ASO")]);
            }
        }else{
            return rest_ensure_response(["success"=>false,"message"=>__('Color not found',"ASO")]);
        }
        
    }

    /**
     * Remove aso colors group from ID in request
     * @param \WP_REST_Request $request Full details about the request.
     *
     * @return $success message if is ok and fail otherwise. 
    */
    public function delete_manage_colors_config($request){
        $color_id = $request->get_param( 'color_id' );
        $all_colors = get_option("aso-manages-colors",[]);
        if($all_colors[$color_id]){
            array_splice($all_colors,$color_id,1);
            $update = update_option("aso-manages-colors",$all_colors);
            if($update){
                return rest_ensure_response(["success"=>true,"message"=>__("The color was well removed","ASO")]);
            }else{
                return rest_ensure_response(["success"=>false,"message"=>__("Deleting the color failed","ASO")]);   
            }
        }else{
            return rest_ensure_response(["success"=>false,"message"=>__('Color not found',"ASO")]);
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
        // If the user is logged in and has the rights to the posts, access to the route is authorized.
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
