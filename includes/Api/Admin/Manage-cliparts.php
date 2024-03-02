<?php
namespace ASO\Api\Admin;

use WP_Error;
use WP_Post;
use WP_Query;
use WP_REST_Controller;



class ASO_Api_Manage_cliparts extends WP_REST_Controller {

    /**
     * [__construct description]
     */
    public function __construct() {
        $this->namespace = 'aso/v1';
        $this->rest_base = 'manage-cliparts';
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
                    'callback'            => array( $this, 'get_manage_cliparts_configs' ),
                    'permission_callback' => array( $this, 'get_config_permissions_check' )
                ),
                array(
                    'methods'             => \WP_REST_Server::CREATABLE,
                    'callback'            => array( $this, 'create_manage_cliparts_group' ),
                    'permission_callback' => array( $this, 'get_config_permissions_check' ),
                ),
            )
        );
        register_rest_route(
            $this->namespace,
            '/' . $this->rest_base."/(?P<group_id>\d+)",
            array(
                array(
                    'methods'             => \WP_REST_Server::READABLE,
                    'callback'            => array( $this, 'get_manage_cliparts_groups' ),
                    'permission_callback' => array( $this, 'get_config_permissions_check' ),
                    'args'                => array (
                        'group_id' => array (
                            'type' => 'integer',
                            'required' => true,
                        )
                    ),
                ),
                array(
                    'methods'             => \WP_REST_Server::EDITABLE,
                    'callback'            => array( $this, 'update_manage_cliparts_group' ),
                    'permission_callback' => array( $this, 'get_config_permissions_check' ),
                    'args'                => array (
                        'group_id' => array (
                            'type' => 'integer',
                            'required' => true,
                        )
                    ),
                ),
                array(
                    'methods'             => \WP_REST_Server::DELETABLE,
                    'callback'            => array( $this, 'delete_manage_cliparts_group'),
                    'permission_callback' => array( $this, 'get_config_permissions_check' ),
                    'args'                => array (
                        'group_id' => array (
                            'type' => 'integer',
                            'required' => true,
                        )
                    ),
                )
            )
        );
        register_rest_route(
            $this->namespace,
            '/' . $this->rest_base."/(?P<group_id>\d+)/items",
            array(
                array(
                    'methods'             => \WP_REST_Server::READABLE,
                    'callback'            => array( $this, 'get_manage_cliparts_group_cliparts' ),
                    'permission_callback' => array( $this, 'get_config_permissions_check' ),
                    'args'                => array (
                        'group_id' => array (
                            'type' => 'integer',
                            'required' => true,
                        )
                    ),
                ),
                array(
                    'methods'             => \WP_REST_Server::CREATABLE,
                    'callback'            => array( $this, 'create_manage_cliparts_item' ),
                    'permission_callback' => array( $this, 'get_config_permissions_check' ),
                    'args'                => array (
                        'group_id' => array (
                            'type' => 'integer',
                            'required' => true,
                        )
                    ),
                )
            )
        );
        register_rest_route(
            $this->namespace,
            '/' . $this->rest_base."/(?P<group_id>\d+)/items/(?P<clipart_id>\d+)",
            array(
                array(
                    'methods'             => \WP_REST_Server::READABLE,
                    'callback'            => array( $this, 'get_manage_cliparts_item' ),
                    'permission_callback' => array( $this, 'get_config_permissions_check' ),
                    'args'                => array (
                        'group_id' => array (
                            'type' => 'integer',
                            'required' => true,
                        ),
                        'clipart_id' => array (
                            'type' => 'integer',
                            'required' => true,
                        )
                    ),
                ),
                array(
                    'methods'             => \WP_REST_Server::EDITABLE,
                    'callback'            => array( $this, 'update_manage_cliparts_item' ),
                    'permission_callback' => array( $this, 'get_config_permissions_check' ),
                    'args'                => array (
                        'group_id' => array (
                            'type' => 'integer',
                            'required' => true,
                        ),
                        'clipart_id' => array (
                            'type' => 'integer',
                            'required' => true,
                        )
                    ),
                ),
                array(
                    'methods'             => \WP_REST_Server::DELETABLE,
                    'callback'            => array( $this, 'delete_manage_cliparts_item'),
                    'permission_callback' => array( $this, 'get_config_permissions_check' ),
                    'args'                => array (
                        'group_id' => array (
                            'type' => 'integer',
                            'required' => true,
                        ),
                        'clipart_id' => array (
                            'type' => 'integer',
                            'required' => true,
                        )
                    ),
                )
            )
        );
    }
        /**
     * Create aso cliparts groups
     * @param \WP_REST_Request $request Full details about the request.
     *
     * @return \WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function create_manage_cliparts_group ( $request ) {

        $all_groups = get_option("aso-manages-cliparts",[]);
        $req_data=json_decode($request->get_body(),true);
        $clipartsGroup = [
            "title"=>$req_data["title"],
            "description"=>$req_data["description"],
            "cliparts"=>[]
        ];
        array_push($all_groups,$clipartsGroup);
        $update = update_option("aso-manages-cliparts",$all_groups);
        if($update){
            return rest_ensure_response( ["success"=>true,"message"=>__("Cliparts group created with success","ASO")] );
        }else{
            return rest_ensure_response(["success"=>false,"message" => "Registration failed"]);
        }   
    }
    /**
     * Get clipart group info for $post id
     * @param \WP_REST_Request $request Full details about the request.
     * @return \WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function get_manage_cliparts_groups($request){
        $id=$request->get_param('group_id');
        $all_groups = get_option("aso-manages-cliparts",[]);
        if(isset($all_groups[$id])) {
            return rest_ensure_response($all_groups[$id]);
        }else{
            return rest_ensure_response(["message" => __("Not Cliparts data found",'ASO')]);
        }
    }
    /**
     * Update of cliparts group
     * @param \WP_REST_Request $request Full details about the request.
     * @return \WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function update_manage_cliparts_group($request){
        $id=$request->get_param('group_id');
        $all_groups = get_option("aso-manages-cliparts",[]);
        $req_data=json_decode($request->get_body(),true);
        
        if(isset($all_groups[$id])) {
            $all_groups[$id]['title']=$req_data["title"];
            $all_groups[$id]['description']=$req_data["description"];
            $update = update_option("aso-manages-cliparts",$all_groups);
            if($update){
                return rest_ensure_response( ["success"=>true,"message"=>__("Cliparts group updated with success","ASO")] );
            }else{
                return rest_ensure_response(["success"=>false,"message" => "Update failed"]);
            }  
        }else{
            return rest_ensure_response(["message" => __("Not Cliparts data found",'ASO')]);
        }
        
    }

    /**
     * Remove cliparts group from ID in request
     * @param \WP_REST_Request $request Full details about the request.
     *
     * @return $success message if is ok and fail otherwise. 
    */
    public function delete_manage_cliparts_group($request){
        $id=$request->get_param('group_id');
        $all_groups = get_option("aso-manages-cliparts",[]);
        
        if(isset($all_groups[$id])) {
            array_splice($all_groups,$id,1);
            $update = update_option("aso-manages-cliparts",$all_groups);
            if($update){
                return rest_ensure_response( ["success"=>true,"message"=>__("Cliparts group deleted with success","ASO")] );
            }else{
                return rest_ensure_response(["success"=>false,"message" => "Delete failed"]);
            }  
        }else{
            return rest_ensure_response(["message" => __("Not Cliparts data found",'ASO')]);
        }
    }

    /**
     * Get all aso  cliparts with or no per_page,page param in api url
     *
     * @param \WP_REST_Request $request Full details about the request.
     *
     * @return \WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function get_manage_cliparts_configs( $request ) {
        
        $all_groups = get_option("aso-manages-cliparts",[]);
        // Check the results and return the response
        $groups = array(
            "noGroupsFound"      => __("No Cliparts Group Found","ASO"),
            "data"               => $all_groups,
        );
          
        return rest_ensure_response( $groups );
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
     * Create an item in cliparts group
     *
     * @param \WP_REST_Request $request Full details about the request.
     *
     * @return \WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    
    public function create_manage_cliparts_item($request){
        $group_id = $request->get_param('group_id');
        $all_groups = get_option("aso-manages-cliparts",[]);
        if(isset($all_groups[$group_id])) {
            $new_item = json_decode($request->get_body(),true);
            array_push($all_groups[$group_id]["cliparts"],$new_item);
            $update = update_option("aso-manages-cliparts",$all_groups);
            if($update){
                return rest_ensure_response( ["success"=>true,"message"=>__("Cliparts  added with success","ASO")] );
            }else{
                return rest_ensure_response(["success"=>false,"message"=>__("Clipart has not been added","ASO")]);
            }
        }else{
            return rest_ensure_response(["success"=>false, "message"=>__("Clipart has not been added","ASO")]);
        }
    }
    /**
     * get item in cliparts group
     *
     * @param \WP_REST_Request $request Full details about the request.
     *
     * @return \WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    
    public function get_manage_cliparts_item($request){
        $group_id = $request->get_param('group_id');
        $clipart_id = $request->get_param('clipart_id');
        $all_groups = get_option("aso-manages-cliparts",[]);
        if(isset($all_groups[$group_id]["cliparts"][$clipart_id])) {
            return rest_ensure_response( $all_groups[$group_id]["cliparts"][$clipart_id] );
        }else{
            return rest_ensure_response(["success"=>false, "message"=>__("Clipart has not been added","ASO")]);
        }
    }
    /**
     * get all items in cliparts group 
     *
     * @param \WP_REST_Request $request Full details about the request.
     *
     * @return \WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function get_manage_cliparts_group_cliparts ($request) {
        $group_id = $request->get_param('group_id');
        $all_groups = get_option("aso-manages-cliparts",[]);
        if(count($all_groups[ $group_id]["cliparts"])>0) {
            return rest_ensure_response(["groupTitle"=>$all_groups[ $group_id]["title"], "cliparts"=> $all_groups[$group_id]["cliparts"]]);
        }else{
            return rest_ensure_response(["groupTitle"=>$all_groups[ $group_id]["title"],"notFoundMessage"=>__("No cliparts found","ASO")]);
        }
    }

    /**
     * update all items in cliparts group
     *
     * @param \WP_REST_Request $request Full details about the request.
     *
     * @return \WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    
    public function update_manage_cliparts_item($request){
        $group_id = $request->get_param('group_id');
        $clipart_id = $request->get_param('clipart_id');
        $all_groups = get_option("aso-manages-cliparts",[]);
        if(isset($all_groups[$group_id]["cliparts"][$clipart_id])) {
            $update_clipart = json_decode($request->get_body(),true);
            $all_groups[$group_id]["cliparts"][$clipart_id] = $update_clipart;
            $update = update_option("aso-manages-cliparts",$all_groups);
            if($update){
                return rest_ensure_response( ["success"=>true,"message"=>__("Cliparts  updated with success","ASO")] );
            }else{
                return rest_ensure_response(["success"=>false,"message"=>__("Clipart has not been updated","ASO")]);
            }
        }else{
            return rest_ensure_response(["success"=>false, "message"=>__("Clipart has not been updated","ASO")]);
        }
    }

    /**
     * Delete an items in cliparts group
     *
     * @param \WP_REST_Request $request Full details about the request.
     *
     * @return \WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    
     public function delete_manage_cliparts_item($request){
        $group_id = $request->get_param('group_id');
        $clipart_id = $request->get_param('clipart_id');
        $all_groups = get_option("aso-manages-cliparts",[]);
        if(isset($all_groups[$group_id]["cliparts"][$clipart_id])) {
            array_splice($all_groups[$group_id]["cliparts"],$clipart_id,1);
            $update = update_option("aso-manages-cliparts",$all_groups);
            if($update){
                return rest_ensure_response( ["success"=>true,"message"=>__("Cliparts  deleted with success","ASO")] );
            }else{
                return rest_ensure_response(["success"=>false,"message"=>__("Clipart has not been deleted","ASO")]);
            }
        }else{
            return rest_ensure_response(["success"=>false, "message"=>__("Clipart has not been deleted","ASO")]);
        }
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