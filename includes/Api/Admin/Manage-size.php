<?php
namespace ASO\Api\Admin;

use WP_Error;
use WP_Post;
use WP_Query;
use WP_REST_Controller;


class ASO_Api_Manage_Sizes extends WP_REST_Controller {

    /**
     * [__construct description]
     */
    public function __construct() {
        $this->namespace = 'aso/v1';
        $this->rest_base = 'manage-sizes';
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
                    'callback'            => array( $this, 'get_manage_sizes' ),
                    'permission_callback' => array( $this, 'get_config_permissions_check' )
                ),
                array(
                    'methods'             => \WP_REST_Server::CREATABLE,
                    'callback'            => array( $this, 'add_size_to_manages_sizes' ),
                    'permission_callback' => array( $this, 'get_config_permissions_check' ),
                ),
            )
        );
        register_rest_route(
            $this->namespace,
            '/' . $this->rest_base."/(?P<size_id>\d+)",
            array(
                array(
                    'methods'             => \WP_REST_Server::READABLE,
                    'callback'            => array( $this, 'get_manage_size' ),
                    'permission_callback' => array( $this, 'get_config_permissions_check' ),
                    'args'                => array (
                        'size_id' => array (
                            'type' => 'integer',
                            'required' => true,
                        )
                    ),
                ),
                array(
                    'methods'             => \WP_REST_Server::EDITABLE,
                    'callback'            => array( $this, 'update_size' ),
                    'permission_callback' => array( $this, 'get_config_permissions_check' ),
                    'args'                => array (
                        'size_id' => array (
                            'type' => 'integer',
                            'required' => true,
                        )
                    ),
                ),
                array(
                    'methods'             => \WP_REST_Server::DELETABLE,
                    'callback'            => array( $this, 'delete_manage_sizes_config'),
                    'permission_callback' => array( $this, 'get_config_permissions_check' ),
                    'args'                => array (
                        'size_id' => array (
                            'type' => 'integer',
                            'required' => true,
                        )
                    ),
                )
            )
        );
    }
       /**
     * Create sizes group
     * @param \WP_REST_Request $request Full details about the request.
     *
     * @return \WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function add_size_to_manages_sizes ( $request ) {
        $req_size=json_decode($request->get_body(),true);
        $all_sizes = get_option("aso-manages-sizes",[]);
        $size_keys = array('width','height','thickness');
        $req_keys = array_keys($req_size);

        $differents_keys = array_diff($size_keys, $req_keys);

        if(empty($differents_keys)){
            $size['title']=$req_size['width']+'x'+$req_size['height'];
            $size['width']=$req_size['width'];
            $size['height']=$req_size['height'];
            $size['thickness']['active']=$req_size['thickness']['active'];
            $size['thickness']['value']=$req_size['thickness']['value'];
            if($req_size['thickness']['active'] == true){
                $size['title']+='_thick';
            }
            array_push($all_sizes,$size);
            $update = update_option("aso-manages-sizes",$all_sizes);
            if($update){
                return rest_ensure_response( ["success"=>true,"message"=>__("Size created with success","ASO")] );
            }else{
                return rest_ensure_response(["success"=>false,"message" => __("Registration failed",'ASO')]);
            }
        }else{
            return rest_ensure_response(["success"=>false,"message" => __("Wrongly formatted size data","ASO")]);
        }
    }
    /**
     * Get all sizes
     * @param \WP_REST_Request $request Full details about the request.
     * @return \WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function get_manage_sizes($request){
        $all_sizes = get_option("aso-manages-sizes",[]);
        return rest_ensure_response($all_sizes);      
        
    }
    /**
     * Get size info for $size id
     * @param \WP_REST_Request $request Full details about the request.
     * @return \WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function get_manage_size($request){
        $size_id=$request->get_param('size_id');
        $all_sizes = get_option("aso-manages-sizes",[]);
        if($all_sizes[$size_id]){
            return rest_ensure_response($all_sizes[$size_id]);      
        }else{
            return rest_ensure_response(["message"=>__('Size not found',"ASO")]);
        }
        
    }


    /**
     * Update of sizes group
     * @param \WP_REST_Request $request Full details about the request.
     * @return \WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function update_size($request){
        $req_size=json_decode($request->get_body(),true);
        $size_id = $request->get_param( 'size_id' );
        $all_sizes = get_option("aso-manages-sizes",[]);
        $size_keys = array('title','width','height','thickness');
        $req_keys = array_keys($req_size);
        $differents_keys = array_diff($size_keys, $req_keys);

        if($all_sizes[$size_id]){
            if(empty($differents_keys)){
                $size['title']=$req_size['width']+'x'+$req_size['height'];
                $size['width']=$req_size['width'];
                $size['height']=$req_size['height'];
                $size['thickness']['active']=$req_size['thickness']['active'];
                $size['thickness']['value']=$req_size['thickness']['value'];
                if($req_size['thickness']['active'] == true){
                    $size['title']+='_thick';
                }
                $all_sizes[$size_id] = $size;
                $update = update_option("aso-manages-sizes",$all_sizes);
                if($update){
                    return rest_ensure_response(array('success' => true, "message" => __("The size has been updated with success","ASO") ) );
                }
                else{
                    return rest_ensure_response(array('success' => false, "message"=>__("Size update failed","") ) );
                }   
            }else{
                return rest_ensure_response(["success"=>false,"message" => __("Wrongly formatted size data","ASO")]);
            }
        }else{
            return rest_ensure_response(["success"=>false,"message"=>__('Size not found',"ASO")]);
        }
        
    }

    /**
     * Remove aso sizes group from ID in request
     * @param \WP_REST_Request $request Full details about the request.
     *
     * @return $success message if is ok and fail otherwise. 
    */
    public function delete_manage_sizes_config($request){
        $size_id = $request->get_param( 'size_id' );
        $all_sizes = get_option("aso-manages-sizes",[]);
        if($all_sizes[$size_id]){
            array_splice($all_sizes,$size_id,1);
            $update = update_option("aso-manages-sizes",$all_sizes);
            if($update){
                return rest_ensure_response(["success"=>true,"message"=>__("The size was well removed","ASO")]);
            }else{
                return rest_ensure_response(["success"=>false,"message"=>__("Deleting the size failed","ASO")]);   
            }
        }else{
            return rest_ensure_response(["success"=>false,"message"=>__('Size not found',"ASO")]);
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
     * Create an item in size group
     *
     * @param \WP_REST_Request $request Full details about the request.
     *
     * @return \WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */

    /**
     * Retrieves the query params for the items collection.
     *
     * @return array Collection parameters.
     */
    public function get_collection_params() {
            return [];
    }
}
