<?php
namespace ASO\Api\Admin;

use WP_Error;
use WP_Post;
use WP_Query;
use WP_REST_Controller;


class ASO_Api_Configs_Color_palette extends WP_REST_Controller {

    /**
     * [__construct description]
     */
    public function __construct() {
        $this->namespace = 'aso/v1';
        $this->rest_base = 'Color_palette_configs';
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
                    'callback'            => array( $this, 'get_color_palette_configs' ),
                    'permission_callback' => array( $this, 'get_config_permissions_check' )
                ),
                array(
                    'methods'             => \WP_REST_Server::CREATABLE,
                    'callback'            => array( $this, 'create_color_palette_config_post' ),
                    'permission_callback' => array( $this, 'get_config_permissions_check' ),
                ),
            )
        );
        register_rest_route(
            $this->namespace,
            '/' . $this->rest_base."/(?P<config_id>\d+)",
            array(
                array(
                    'methods'             => \WP_REST_Server::READABLE,
                    'callback'            => array( $this, 'get_color_palette_config_post' ),
                    'permission_callback' => array( $this, 'get_config_permissions_check' ),
                    'args'                => array (
                        'config_id' => array (
                            'type' => 'integer',
                            'required' => true,
                        )
                    ),
                ),
                array(
                    'methods'             => \WP_REST_Server::EDITABLE,
                    'callback'            => array( $this, 'update_color_palette_config_post' ),
                    'permission_callback' => array( $this, 'get_config_permissions_check' ),
                    'args'                => array (
                        'config_id' => array (
                            'type' => 'integer',
                            'required' => true,
                        )
                    ),
                ),
                array(
                    'methods'             => \WP_REST_Server::DELETABLE,
                    'callback'            => array( $this, 'delete_color_palette_config'),
                    'permission_callback' => array( $this, 'get_config_permissions_check' ),
                    'args'                => array (
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
     * Create ncpc product configuration
     * @param \WP_REST_Request $request Full details about the request.
     *
     * @return \WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function create_color_palette_config_post ( $request ) {
        $params=json_decode($request->get_body(),true);
        $data = [
            'post_title' => $params["title"],
            'post_type' => 'aso-colors-palette',
            'post_meta' => [
                "aso-colors-palette-meta"=>[]
            ],
            'post_status' => 'publish'
        ];
        $post_id = wp_insert_post($data);
        if($post_id != 0 && !is_wp_error($post_id)){
            if(isset($params["data"]) && !empty($params["data"])){
                $data = [
                    "data" =>$params["data"]
                ];
                update_post_meta($post_id,'aso-colors-palette-meta',$data);
                return rest_ensure_response( ["success"=>true,"message"=>__("Configuration created with success","ASO"),"post_id"=>$post_id] );
            }else{
                return rest_ensure_response(["success"=>false,"message" => "Registration failed"]);
            }            
        }else{
            return rest_ensure_response(["message" => "Registration failed"]);
        }
    }
        /**
     * Get config info for $post id
     * @param \WP_REST_Request $request Full details about the request.
     * @return \WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
  public function get_color_palette_config_post($request){
    $id=$request->get_param('config_id');
    if($id!=0) {
        $meta_value = get_post_meta($id, 'aso-colors-palette-meta', true);
        if(is_array($meta_value) && !empty($meta_value)){

            $post_data = array(
                'id'           => $id,
                'title'        => get_the_title($id),
                'data' => $meta_value["data"]
                );
                return rest_ensure_response($post_data);
        }else{
            return rest_ensure_response(["message" => __("Not ASO Config Post",'ASO')]);
        }

    }else{
       return rest_ensure_response(["message" => __("Custom ID invalid","ASO")]);
    }
        
        
}
    /**
     * Update of ncpc produit configuration
     * @param \WP_REST_Request $request Full details about the request.
     * @return \WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function update_color_palette_config_post($request){
        $params=json_decode($request->get_body(),true);
        $post_id = $request->get_param( 'config_id' );
        $args=array(
            'ID'         => $post_id,
            'post_title' => $params["title"],
        );
        
        $updatePosts = wp_update_post($args);
        if(!is_wp_error($updatePosts)){
            $data = [
            
                "data" =>$params["data"]
            ];
            update_post_meta($post_id,'aso-colors-palette-meta',$data);
            return rest_ensure_response(array('success' => true, "message" => __("The configuration has been updated with success","ASO") ) );
        }
        else{
            return rest_ensure_response(array('success' => false, "message"=>__("Configuration update failed","") ) );
        }
        
    }

    /**
     * Remove ncpc configuration from ID in request
     * @param \WP_REST_Request $request Full details about the request.
     *
     * @return $success message if is ok and fail otherwise. 
    */
    public function delete_color_palette_config($request){

        $id=$request->get_param( 'config_id' );

        if($id!=0){
            $deletePost = wp_delete_post( $id, true );
            if($deletePost != null && !$deletePost ) {
                return rest_ensure_response(["success"=>true,"message"=>__("The configuration was well removed","ASO")]);
            }else{
                return rest_ensure_response(["success"=>false,"message"=>__("Deleting the configuration failed","ASO")]);   
            }
        }
        else{
            return rest_ensure_response(["success"=>false,"message"=>__("Deleting the configuration failed","ASO")]);
        }
    }

    /**
     * Get all ncpc produits configurations with or no per_page,page param in api url
     *
     * @param \WP_REST_Request $request Full details about the request.
     *
     * @return \WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function get_color_palette_configs ( $request ) {
        
        $args = array(
            'post_type' => 'aso-colors-palette',
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
                    "data"        => get_post_meta($id,'aso-colors-palette',true),
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
     * Retrieves the query params for the items collection.
     *
     * @return array Collection parameters.
     */
    public function get_collection_params() {
            return [];
    }
}