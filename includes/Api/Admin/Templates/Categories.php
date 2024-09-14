<?php
namespace ASOWP\Api\Admin;

use WP_Error;
use WP_Post;
use WP_Query;
use WP_REST_Controller;



class ASOWP_Api_Templates_Categories extends WP_REST_Controller {

    /**
     * [__construct description]
     */
    public function __construct() {
        $this->namespace = 'aso/v1';
        $this->rest_base = 'categories';
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
                    'callback'            => array( $this, 'get_templates_categories' ),
                    'permission_callback' => array( $this, 'get_config_permissions_check' )
                ),
                array(
                    'methods'             => \WP_REST_Server::CREATABLE,
                    'callback'            => array( $this, 'add_category_to_templates_categories' ),
                    'permission_callback' => array( $this, 'get_config_permissions_check' ),
                ),
            )
        );
        register_rest_route(
            $this->namespace,
            '/' . $this->rest_base."/(?P<category_id>[a-zA-Z0-9-_]+)",
            array(
                array(
                    'methods'             => \WP_REST_Server::READABLE,
                    'callback'            => array( $this, 'get_template_category' ),
                    'permission_callback' => array( $this, 'get_config_permissions_check' ),
                    'args'                => array (
                        'category_id' => array (
                            'type' => 'string',
                            'required' => true,
                        )
                    ),
                ),
                array(
                    'methods'             => \WP_REST_Server::EDITABLE,
                    'callback'            => array( $this, 'update_category' ),
                    'permission_callback' => array( $this, 'get_config_permissions_check' ),
                    'args'                => array (
                        'category_id' => array (
                            'type' => 'string',
                            'required' => true,
                        )
                    ),
                ),
                array(
                    'methods'             => \WP_REST_Server::DELETABLE,
                    'callback'            => array( $this, 'delete_templates_categories_config'),
                    'permission_callback' => array( $this, 'get_config_permissions_check' ),
                    'args'                => array (
                        'category_id' => array (
                            'type' => 'string',
                            'required' => true,
                        )
                    ),
                )
            )
        );
    }
       /**
     * Create categories group
     * @param \WP_REST_Request $request Full details about the request.
     *
     * @return \WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function add_category_to_templates_categories ( $request ) {
        $data=$request->get_body();
        $all_categories = get_option("aso-templates-categories",[]);
        $key= uniqid();
        $all_categories[$key]=$data;
        $update = update_option("aso-templates-categories",$all_categories);
        if($update){
            return rest_ensure_response( ["success"=>true,"message"=>__("Category created with success","all-signs-options-pro"),"categories"=>$all_categories,"key"=>$key] );
        }else{
            return rest_ensure_response(["success"=>false,"message" => "Registration failed"]);
        }
    }
    /**
     * Get all categories
     * @param \WP_REST_Request $request Full details about the request.
     * @return \WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function get_templates_categories($request){
        //$update = update_option("aso-templates-categories",[]);
        $all_categories = get_option("aso-templates-categories",[]);
        
        if(count($all_categories) != 0){
            return rest_ensure_response($all_categories);          
        }else{
            return rest_ensure_response(["message"=>__("No Category Found","all-signs-options-pro")]);
        }
    }
    /**
     * Get category info from id
     * @param \WP_REST_Request $request Full details about the request.
     * @return \WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function get_template_category($request){
        $category_id=$request->get_param('category_id');
        $all_categories = get_option("aso-templates-categories",[]);
        if(isset($all_categories[$category_id])){
            return rest_ensure_response($all_categories[$category_id]);      
        }else{
            return rest_ensure_response(["success"=>false,"message"=>__('Category not found',"all-signs-options-pro")]);
        }
        
    }


    /**
     * Update of category from ID
     * @param \WP_REST_Request $request Full details about the request.
     * @return \WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function update_category($request){
        $category=$request->get_body();
        $category_id = $request->get_param( 'category_id' );
        $all_categories = get_option("aso-templates-categories",[]);
        if(isset($all_categories[$category_id])){
            if($all_categories[$category_id] != $category){
                $all_categories[$category_id] = $category;
                $update = update_option("aso-templates-categories",$all_categories);
                if($update){
                    return rest_ensure_response(array('success' => true, "message" => __("The category has been updated with success","all-signs-options-pro"),"categories"=>$all_categories ) );
                }
                else{
                    return rest_ensure_response(array('success' => false, "message"=>__("Category update failed","all-signs-options-pro") ) );
                } 
            }else{
                return rest_ensure_response(array('success' => "same", "message"=>__("No change observed in category","all-signs-options-pro"),"categories"=>$all_categories ) );
            }
        }else{
            return rest_ensure_response(["success"=>false,"message"=>__('Category not found',"all-signs-options-pro")]);
        }
        
    }

    /**
     * Remove aso categories from ID in request
     * @param \WP_REST_Request $request Full details about the request.
     *
     * @return $success message if is ok and fail otherwise. 
    */
    public function delete_templates_categories_config($request){
        $category_id = $request->get_param( 'category_id' );
        $all_categories = get_option("aso-templates-categories",[]);
        if(isset($all_categories[$category_id])){
            unset($all_categories[$category_id]);
            $update = update_option("aso-templates-categories",$all_categories);
            if($update){
                return rest_ensure_response(["success"=>true,"message"=>__("The category was well removed","all-signs-options-pro"),"categories"=>$all_categories]);
            }else{
                return rest_ensure_response(["success"=>false,"message"=>__("Deleting the category failed","all-signs-options-pro")]);   
            }
        }else{
            return rest_ensure_response(["success"=>false,"message"=>__('Category not found',"all-signs-options-pro")]);
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
     * Create an item in category group
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
