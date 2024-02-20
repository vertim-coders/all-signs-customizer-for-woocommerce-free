<?php
namespace ASO\Api\Admin\Globals_Settings;

use WP_Error;
use WP_Poste;
use WP_Query;
use WP_REST_Controller;


/**
 * class for api routes reaching generals settings
*/

class ASO_Api_Globals_Settings extends WP_REST_Controller {
   
  /**
   * [__construct description]
  */
  public function __construct(){
    $this->namespace = 'aso/v1';
    $this->rest_base = 'globals-settings';
    }
  /**
    * Register the routes
    *
    * @return void
    */
  
  public function register_route(){
    register_rest_route(
      $this->namespace,
      '/' . $this->rest_base."/licence/(?<plugin>\S+)",
      array(
        array(
          'methods'             => \WP_REST_Server::CREATABLE,
          'callback'            => array( $this, 'save_license' ),
          'permission_callback' => array( $this, 'get_config_permissions_check' ),
          'args'                => array (
            'plugin' => array (
            'type' => 'string',
            'required' => true,
            )
          ),
        ),
        array(
          'methods'             => \WP_REST_Server::READABLE,
          'callback'            => array( $this, 'get_license' ),
          'permission_callback' => array( $this, 'get_config_permissions_check' ),
          'args'                => array (
            'plugin' => array (
              'type' => 'string',
              'required' => true,
            )
          ),
        ),
      )
    );
    register_rest_route(
      $this->namespace,
      '/' . $this->rest_base."/config-page",
      array(
        array(
          'methods'             => \WP_REST_Server::CREATABLE,
          'callback'            => array( $this, 'save_config_page' ),
          'permission_callback' => array( $this, 'get_config_permissions_check' ),
        ),
        array(
          'methods'             => \WP_REST_Server::READABLE,
          'callback'            => array( $this, 'get_config_page' ),
          'permission_callback' => array( $this, 'get_config_permissions_check' ),
        ),
      )
    );
  register_rest_route(
      $this->namespace,
      '/' . $this->rest_base."/pages",
      array(
        array(
          'methods'             => \WP_REST_Server::CREATABLE,
          'callback'            => array( $this, 'create_new_page' ),
          'permission_callback' => array( $this, 'get_config_permissions_check' ),
        ),
        array(
          'methods'             => \WP_REST_Server::READABLE,
          'callback'            => array( $this, 'get_available_pages' ),
          'permission_callback' => array( $this, 'get_config_permissions_check' ),
        ),
      )
    );
    register_rest_route(
      $this->namespace,
      '/' . $this->rest_base."/template-page",
      array(
        array(
          'methods'             => \WP_REST_Server::CREATABLE,
          'callback'            => array( $this, 'save_config_theme' ),
          'permission_callback' => array( $this, 'get_config_permissions_check' ),
        ),
        array(
          'methods'             => \WP_REST_Server::READABLE,
          'callback'            => array( $this, 'get_config_theme' ),
          'permission_callback' => array( $this, 'get_config_permissions_check' ),
        ),
      )
    );
    register_rest_route(
      $this->namespace,
      '/' . $this->rest_base."/output",
      array(
        array(
          'methods'             => \WP_REST_Server::EDITABLE,
          'callback'            => array( $this, 'update_output_options_globals_settings' ),
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
      '/' . $this->rest_base."/shapes",
      array(
        array(
          'methods'             => \WP_REST_Server::READABLE,
          'callback'            => array( $this, 'get_shapes' ),
          'permission_callback' => array( $this, 'get_config_permissions_check' ),
        ),
        array(
          'methods'             => \WP_REST_Server::EDITABLE,
          'callback'            => array( $this, 'update_shapes' ),
          'permission_callback' => array( $this, 'get_config_permissions_check' ),
        ),
        array(
          'methods'             => \WP_REST_Server::CREATABLE,
          'callback'            => array( $this, 'save_shapes' ),
          'permission_callback' => array( $this, 'get_config_permissions_check' ),
        )
      )
    );
  
    register_rest_route(
      $this->namespace,
      '/' . $this->rest_base."/fixing-methods",
      array(
        array(
          'methods'             => \WP_REST_Server::READABLE,
          'callback'            => array( $this, 'get_fixing_methods' ),
          'permission_callback' => array( $this, 'get_config_permissions_check' ),
        ),
        array(
          'methods'             => \WP_REST_Server::EDITABLE,
          'callback'            => array( $this, 'update_fixing_methods' ),
          'permission_callback' => array( $this, 'get_config_permissions_check' ),
        ),
        array(
          'methods'             => \WP_REST_Server::CREATABLE,
          'callback'            => array( $this, 'save_fixing_methods' ),
          'permission_callback' => array( $this, 'get_config_permissions_check' ),
        )
      )
    );
    register_rest_route(
      $this->namespace,
      '/' . $this->rest_base."/borders",
      array(
        array(
          'methods'             => \WP_REST_Server::READABLE,
          'callback'            => array( $this, 'get_borders' ),
          'permission_callback' => array( $this, 'get_config_permissions_check' ),
        ),
        array(
          'methods'             => \WP_REST_Server::EDITABLE,
          'callback'            => array( $this, 'update_borders' ),
          'permission_callback' => array( $this, 'get_config_permissions_check' ),
        ),
        array(
          'methods'             => \WP_REST_Server::CREATABLE,
          'callback'            => array( $this, 'save_borders' ),
          'permission_callback' => array( $this, 'get_config_permissions_check' ),
        )
        
      )
    );
  }
  /**
   * Add license key
   * @param \WP_REST_Request $request Full details about the request.
   *
   * @return \WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
   */
  public function save_license( $request ) {
    $plugin = $request->get_param('plugin');
    $params=json_decode($request->get_body());
    if(isset($params->license) && !empty($params->license)){
      if(isset($plugin)){
        if($plugin === "pro"){
          $option = update_option("aso_pro_license",$params->license);
        }else if($plugin === "advanced"){
          $option = update_option("aso_advanced_license",$params->license);
        }else{
          $option = update_option("aso_starter_license",$params->license);
        }
      }
      if($option){
        return rest_ensure_response(["success" => __("License key added successfully","ASO")]);
      }else{
        return rest_ensure_response(["message" => __("Adding license key failed","ASO")]);
      }
    }
    return rest_ensure_response(["message" => __("License key not found","ASO")]);
  }

  /**
   * Get license key
   * @param \WP_REST_Request $request Full details about the request.
   *
   * @return \WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
   */
  public function get_license( $request ) {
    $plugin = $request->get_param('plugin');
    if($plugin === "pro"){
      $option = get_option("aso_pro_license");
    }else if($plugin === "advanced"){
      $option = get_option("aso_advanced_license");
    }else{
      $option = get_option("aso_starter_license");
    }
  
    if($option==false || empty($option) ){
      return rest_ensure_response(["message" => __("No license available","ASO")]);
    }else{
      return rest_ensure_response(['licenseKey'=>$option]);
    }
  }
  /**
     * Add config page
     * @param \WP_REST_Request $request Full details about the request.
     *
     * @return \WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function save_config_page( $request ) {
      $params=json_decode($request->get_body());
      if(isset($params->configPage)){
          $option = update_option("aso_config_page",$params->configPage);
          if($option){
              return rest_ensure_response(["success" => __("Config page added successfully","ASO")]);
          }else{
              return rest_ensure_response(["message" => __("Adding Config page failed","ASO")]);
          }
      }
      return rest_ensure_response(["message" => __("Config page not found","ASO")]);
  }

  /**
   * Get config page
   * @param \WP_REST_Request $request Full details about the request.
   *
   * @return \WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
   */
  public function get_config_page() {

    $option = get_option("aso_config_page");
    
    if($option == false || empty($option) ){
        return rest_ensure_response(["message" => __("Config page not found","ASO")]);
    }else{
        return rest_ensure_response($option);
    }
  }

  /**
   * Show all published pages
   *  @param  \WP_REST_Request $request Full details about the request.
   * @return \WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
   */
  function get_available_pages() {
    $args = array(
        'post_type' => 'page', // Type de contenu "page"
        'post_status' => 'publish', // Statut "publié"
        'posts_per_page' => -1, // Tous les articles (-1 pour afficher tous les articles)
    );

    $existing_pages = get_posts($args);

    $pages[0] = esc_html_x("None","ASO");
    
    foreach ($existing_pages as $page) {
        $pages[$page->ID] = $page->post_title;
    }

    return rest_ensure_response($pages);
  }

  /**
   * Add new page 
   * 
   * @param  \WP_REST_Request $request Full details about the request.
   * @return \WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
   */
  function create_new_page($request) {
    $params=json_decode($request->get_body());
    if(isset($params->title)){
      
      $new_page = array(
        'post_title' => $params->title,
        'post_status' => 'publish', 
        'post_type' => 'page'
      );
  
      $page_id = wp_insert_post($new_page);
      
      if($page_id){
        return rest_ensure_response($page_id);
      }else{
        return rest_ensure_response(["message"=>__("Page was not created","ASO")]);
      }

    }else{
      return rest_ensure_response(["message"=>__("Page was not created","ASO")]);
    } 
  }
  /**
   * Output function 
   * 
   * @param  \WP_REST_Request $request Full details about the request.
   * @return \WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
   */
  public function update_output_options_globals_settings($request){
    $params=json_decode($request->get_body());
  }
   /**
   * get all shapes function 
   * 
   * @param  \WP_REST_Request $request Full details about the request.
   * @return \WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
   */
  public function get_shapes($request){
    $all_shapes = get_option("aso-all-shapes",[]);
    return rest_ensure_response($all_shapes);  
  }
    /**
   * Update all shape function 
   * 
   * @param  \WP_REST_Request $request Full details about the request.
   * @return \WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
   */
  public function update_shapes($request){
    $shape_id=$request->get_param('shape_id');
    $all_shapes= json_decode($request->get_body());
    if($all_shapes[$shape_id]){
      return rest_ensure_response($all_shapes[$shape_id]);      
    }else{
      return rest_ensure_response(["success"=>false,"message"=>__('Shape not found',"ASO")]);
    }
    
  }
   /**
   * Save all shape function 
   * 
   * @param  \WP_REST_Request $request Full details about the request.
   * @return \WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
   */
  public function save_shapes($request){
    $shape_id=$request->get_param('shape_id');
    $all_shapes= json_decode($request->get_body());
    if(isset($all_shapes[$shape_id])){
      $save = get_option("aso_all_shapes");
      if($save){
          return rest_ensure_response(["success" => __(" Shapes added successfully","ASO")]);
      }else{
          return rest_ensure_response(["message" => __("Adding Shapes failed","ASO")]);
      }
    }else{
      return rest_ensure_response(["success"=>false,"message"=>__('Shapes not found',"ASO")]);
    }   
    
    
  }
   /**
   * get all fixing methods function 
   * 
   * @param  \WP_REST_Request $request Full details about the request.
   * @return \WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
   */
  public function get_fixing_methods($request){
    $all_fixingMethods = get_option("aso-all-fixingMethods",[]);
    return rest_ensure_response($all_fixingMethods);  
    
  }
    /**
   * Update all fixing method function 
   * 
   * @param  \WP_REST_Request $request Full details about the request.
   * @return \WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
   */
  public function update_fixing_methods($request){
    $fixingMethod_id=$request->get_param('fixingMethod_id');
    $all_fixingMethods= json_decode($request->get_body());
    if($all_fixingMethods[$fixingMethod_id]){
      return rest_ensure_response($all_fixingMethods[$fixingMethod_id]);      
    }else{
      return rest_ensure_response(["success"=>false,"message"=>__('fixing Method not found',"ASO")]);
    }
  }
  /**
   * save all fixing methods function 
   * 
   * @param  \WP_REST_Request $request Full details about the request.
   * @return \WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
   */
  public function save_fixing_methods($request){
    $fixingMethod_id=$request->get_param('fixingMethod_id');
    $all_fixingMethods= json_decode($request->get_body());
    if(isset($all_fixingMethods[$fixingMethod_id])){
      $save = get_option("aso_all_fixingMethods");
      if($save){
          return rest_ensure_response(["success" => __(" Fixing Methods added successfully","ASO")]);
      }else{
          return rest_ensure_response(["message" => __("Adding Fixing Methods failed","ASO")]);
      }
    }else{
      return rest_ensure_response(["success"=>false,"message"=>__('Fixing Methods not found',"ASO")]);
    }   
  }
   /**
   * get all borders function 
   * 
   * @param  \WP_REST_Request $request Full details about the request.
   * @return \WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
   */
  public function get_borders($request){
    $all_borders = get_option("aso-all-borders",[]);
    return rest_ensure_response($all_borders);     
  }
    /**
   * Update all border function 
   * 
   * @param  \WP_REST_Request $request Full details about the request.
   * @return \WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
   */
  public function update_borders($request){
    $border_id=$request->get_param('border_id');
    $all_borders= json_decode($request->get_body());
    if($all_borders[$border_id]){
      return rest_ensure_response($all_borders[$border_id]);      
    }else{
      return rest_ensure_response(["success"=>false,"message"=>__('Border not found',"ASO")]);
    } 
  }
   /**
   * get all borders function 
   * 
   * @param  \WP_REST_Request $request Full details about the request.
   * @return \WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
   */
  public function save_borders($request){
    $border_id=$request->get_param('border_id'); 
    $all_borders= json_decode($request->get_body()); 
    if(isset($all_borders[$border_id])){
      $save = get_option("aso_all_border");
      if($save){
          return rest_ensure_response(["success" => __(" Border added successfully","ASO")]);
      }else{
          return rest_ensure_response(["message" => __("Adding Border failed","ASO")]);
      }
    }else{
      return rest_ensure_response(["success"=>false,"message"=>__('Border not found',"ASO")]);
    }   
  }
}

