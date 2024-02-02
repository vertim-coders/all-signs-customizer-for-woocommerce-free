<?php
namespace ASO\Api\Admin;

use WP_Error;
use WP_Post;
use WP_Query;
use WP_REST_Controller;


class ASO_Api_Manage_sizes extends WP_REST_Controller {

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
                    'callback'            => array( $this, 'get_manage_sizes_configs' ),
                    'permission_callback' => array( $this, 'get_config_permissions_check' )
                ),
                array(
                    'methods'             => \WP_REST_Server::CREATABLE,
                    'callback'            => array( $this, 'create_manage_sizes_config_post' ),
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
                    'callback'            => array( $this, 'get_manage_sizes_config_post' ),
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
                    'callback'            => array( $this, 'update_manage_sizes_config_post' ),
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
        register_rest_route(
            $this->namespace,
            '/' . $this->rest_base."/(?P<size_id>\d+)/items",
            array(
                array(
                    'methods'             => \WP_REST_Server::READABLE,
                    'callback'            => array( $this, 'get_manage_sizes_item' ),
                    'permission_callback' => array( $this, 'get_config_permissions_check' ),
                    'args'                => array (
                        'size_id' => array (
                            'type' => 'integer',
                            'required' => true,
                        )
                    ),
                ),
                array(
                    'methods'             => \WP_REST_Server::CREATABLE,
                    'callback'            => array( $this, 'create_manage_sizes_item' ),
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
        register_rest_route(
            $this->namespace,
            '/' . $this->rest_base."/(?P<size_id>\d+)/items/(?P<item_id>\d+)",
            array(
                array(
                    'methods'             => \WP_REST_Server::EDITABLE,
                    'callback'            => array( $this, 'update_manage_sizes_item' ),
                    'permission_callback' => array( $this, 'get_config_permissions_check' ),
                    'args'                => array (
                        'size_id' => array (
                            'type' => 'integer',
                            'required' => true,
                        ),
                        'item_id' => array (
                            'type' => 'integer',
                            'required' => true,
                        )
                    ),
                ),
                array(
                    'methods'             => \WP_REST_Server::DELETABLE,
                    'callback'            => array( $this, 'delete_manage_sizes_item'),
                    'permission_callback' => array( $this, 'get_config_permissions_check' ),
                    'args'                => array (
                        'size_id' => array (
                            'type' => 'integer',
                            'required' => true,
                        ),
                        'item_id' => array (
                            'type' => 'integer',
                            'required' => true,
                        )
                    ),
                )
            )
        );
    }
          /**
     * Create aso product sizes
     * @param \WP_REST_Request $request Full details about the request.
     *
     * @return \WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function create_manage_sizes_config_post ( $request ) {
        $params=json_decode($request->get_body(),true);
        $data = [
            'post_title' => $params["title"],
            'post_type' => 'aso-manages-sizes',
            'post_meta' => [
                "aso-manages-sizes-meta"=>[]
            ],
            'post_status' => 'publish'
        ];
        if(isset($params["data"]) && !empty($params["data"])){
            $post_id = wp_insert_post($data);
            if($post_id != 0 && !is_wp_error($post_id)){
                update_post_meta($post_id,'aso-manages-sizes-meta',$params["data"]);
                return rest_ensure_response( ["success"=>true,"message"=>__("Sizes group  created with success","ASO"),"post_id"=>$post_id] );
            }else{
                return rest_ensure_response(["success"=>false,"message" => "Registration failed"]);
            }            
        }else{
            return rest_ensure_response(["message" => "Registration failed"]);
        }
    }
        /**
     * Get sizes group info for $post id
     * @param \WP_REST_Request $request Full details about the request.
     * @return \WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
  public function get_manage_sizes_config_post($request){
    $id=$request->get_param('size_id');
    if($id!=0) {
        $meta_value = get_post_meta($id, 'aso-manages-sizes-meta', true);
        if(is_array($meta_value) && !empty($meta_value)){

            $post_data = array(
                'id'           => $id,
                'title'        => get_the_title($id),
                'data'         => $meta_value
            );
            return rest_ensure_response($post_data);
        }else{
            return rest_ensure_response(["message" => __("Not sizes group found",'ASO')]);
        }

    }else{
       return rest_ensure_response(["message" => __("Custom ID invalid","ASO")]);
    }
        
        
}
    /**
     * Update of produit size group       
     * @param \WP_REST_Request $request Full details about the request.
     * @return \WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function update_manage_sizes_config_post($request){
        $params=json_decode($request->get_body(),true);
        $post_id = $request->get_param( 'size_id' );
        $args=array(
            'ID'         => $post_id,
            'post_title' => $params["title"],
        );
        
        $updatePosts = wp_update_post($args);
        if(!is_wp_error($updatePosts)){
            return rest_ensure_response(array('success' => true, "message" => __("The sizes group has been updated with success","ASO") ) );
        }
        else{
            return rest_ensure_response(array('success' => false, "message"=>__("Sizes group update failed","") ) );
        }
        
    }

    /**
     * Remove sizes group  from ID in request
     * @param \WP_REST_Request $request Full details about the request.
     *
     * @return $success message if is ok and fail otherwise. 
    */
    public function delete_manage_sizes_config($request){

        $id=$request->get_param( 'size_id' );

        if($id!=0){
            $deletePost = wp_delete_post( $id, true );
            if($deletePost != null && !$deletePost ) {
                return rest_ensure_response(["success"=>true,"message"=>__("The sizes group  was well removed","ASO")]);
            }else{
                return rest_ensure_response(["success"=>false,"message"=>__("Deleting the sizes group  failed","ASO")]);   
            }
        }
        else{
            return rest_ensure_response(["success"=>false,"message"=>__("Deleting the sizes group  failed","ASO")]);
        }
    }

    /**
     * Get all aso sizes with or no per_page,page param in api url
     *
     * @param \WP_REST_Request $request Full details about the request.
     *
     * @return \WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function get_manage_sizes_configs( $request ) {
        
        $args = array(
            'post_type' => 'aso-manages-sizes',
            'post_status' => 'publish',
            'order' => 'DESC',
            'orderby' => 'ID',
            'numberposts' => -1
        );
        
        //displays 6 results per page if per_page is not specified
        $per_page = absint($request->get_param( 'per_page' ));
        if ( ! empty( $per_page ) ) {
            $args['posts_per_page'] = $per_page ;
        } else {
            $per_page = 6;
            $args['posts_per_page'] = 6;
        }

        $oder =  $request->get_param( 'order' );
        if ( ! empty( $oder ) ) {
            $args['order'] = $oder;
        }

        // Make Pagination
        $page = $request->get_param( 'page' );
        if ( ! empty( $page ) ) {
            $args['paged'] = absint( $page );
        }

        // Make search 
        $search_query = $request->get_param( 'search' );
        if ( ! empty( $search_query ) ) {
            $args['s'] = sanitize_text_field( $search_query );
        }

        // Get custom post types using WP_Query
        $query = new WP_Query( $args );
        $total_posts = $query->found_posts;
        $total_pages = ceil($total_posts / $per_page);
        // Check the results and return the response
        $posts_data = array(
            "totalConfigsFound" => $total_posts,
            "totalPages"         => $total_pages,
            "data"               => [],
        );
        if ( $query->have_posts() ) {

            
            while ( $query->have_posts() ) {
                $query->the_post();
                $id=get_the_ID();
                
                $post_data = array(
                    'id'          => $id,
                    'title'       => get_the_title(),
                    "data"        => get_post_meta($id,'aso-manages-sizes',true),
                );
                array_push($posts_data["data"],$post_data);
                //$posts_data["data"][] = $post_data;
                
            }

            return rest_ensure_response( $posts_data );

        } else {
            return rest_ensure_response( $posts_data );
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
     * Create an item in sizes group
     *
     * @param \WP_REST_Request $request Full details about the request.
     *
     * @return \WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    
     public function create_manage_sizes_item($request){
        $size_id = $request->get_param('size_id');
        if($size_id != 0) {
            $new_item = json_decode($request->get_body(),true);
            $meta_value = get_post_meta($size_id, 'aso-manages-sizes-meta', true);
            if(is_array($meta_value) && !empty($meta_value)){
                array_push($meta_value,$new_item);
            }else{
                $meta_value = [];
                array_push($meta_value,$new_item);
            }
            $update = update_post_meta($size_id,'aso-manages-sizes-meta',$meta_value);
            if($update === true){
                return rest_ensure_response(["success"=>true, "message"=>__("Size item successfully added","ASO")]);
            }else{
                return rest_ensure_response(["success"=>false, "message"=>__("Size item has not been added","ASO")]);
            }
        }else{
            return rest_ensure_response(["success"=>false, "message"=>__("Size item has not been added","ASO")]);
        }
    }
    /**
     * get all items in sizes group
     *
     * @param \WP_REST_Request $request Full details about the request.
     *
     * @return \WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    
    public function get_manage_sizes_item($request){
        $size_id = $request->get_param('size_id');
        if($size_id != 0) {
            $meta_value = get_post_meta($size_id, 'aso-manages-sizes-meta', true);
            if(is_array($meta_value) && !empty($meta_value)){
                return rest_ensure_response($meta_value);
            }else{
                return rest_ensure_response([]);
            }
        }else{
            return rest_ensure_response([]);
        }
    }

    /**
     * update all items in sizes group
     *
     * @param \WP_REST_Request $request Full details about the request.
     *
     * @return \WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    
    public function update_manage_sizes_item($request){
        $size_id = $request->get_param('size_id');
        $item_id = $request->get_param('item_id');
        if($size_id != 0) {
            $meta_value = get_post_meta($size_id, 'aso-manages-sizes-meta', true);
            if(is_array($meta_value) && !empty($meta_value)){
                if($meta_value[$item_id]){
                    $meta_value[$item_id] = json_encode($request->get_body(),true);
                    update_post_meta($size_id,'aso-manages-sizes-meta',$meta_value);
                    return rest_ensure_response(["success"=>true,"message"=>__("The update was successfully completed","ASO")]);
                }else{
                    return rest_ensure_response(["success"=>false,"message"=>__("Update failed","ASO")]);
                }
            }else{
                return rest_ensure_response(["success"=>false,"message"=>__("Update failed","ASO")]);
            }
        }else{
            return rest_ensure_response(["success"=>false,"message"=>__("Update failed","ASO")]);
        }
    }

    /**
     * Delete an items in sizes group
     *
     * @param \WP_REST_Request $request Full details about the request.
     *
     * @return \WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    
     public function delete_manage_sizes_item($request){
        $size_id = $request->get_param('size_id');
        $item_id = $request->get_param('item_id');
        if($size_id != 0) {
            $meta_value = get_post_meta($size_id, 'aso-manages-sizes-meta', true);
            if(is_array($meta_value) && !empty($meta_value)){
                if($meta_value[$item_id]){
                    array_splice($meta_value,$item_id,1);
                    update_post_meta($size_id,'aso-manages-sizes-meta',$meta_value);
                    return rest_ensure_response(["success"=>true,"message"=>__("The delete was successfully completed","ASO")]);
                }else{
                    return rest_ensure_response(["success"=>false,"message"=>__("The item delete failed","ASO")]);
                }
            }else{
                return rest_ensure_response(["success"=>false,"message"=>__("The item update failed","ASO")]);
            }
        }else{
            return rest_ensure_response(["success"=>false,"message"=>__("The item update failed","ASO")]);
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