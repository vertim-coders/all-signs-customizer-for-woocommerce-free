<?php
namespace ASOWP\Api\Admin\Globals_Settings;

use DateTime;
use DateTimeZone;
use WP_Error;
use WP_Poste;
use WP_Query;
use WP_REST_Controller;


/**
 * class for api routes reaching generals settings
 */

class ASOWP_Api_Globals_Settings extends WP_REST_Controller
{
  /**
   * [__construct description]
   */
  public function __construct()
  {
    $this->namespace = 'asowp/v1';
    $this->rest_base = 'globals-settings';
  }
  /**
   * Register the routes
   *
   * @return void
   */

  public function register_route()
  {
    register_rest_route(
      $this->namespace,
      '/' . $this->rest_base . "/product",
      array(
        array(
          'methods' => \WP_REST_Server::EDITABLE,
          'callback' => array($this, 'save_asowp_product'),
          'permission_callback' => array($this, 'get_config_permissions_check'),
        ),
        array(
          'methods' => \WP_REST_Server::READABLE,
          'callback' => array($this, 'get_asowp_product'),
          'permission_callback' => array($this, 'get_config_permissions_check'),
        ),
      )
    );
    /* register_rest_route(
      $this->namespace,
      '/' . $this->rest_base . "/product/checking",
      array(
        array(
          'methods' => \WP_REST_Server::READABLE,
          'callback' => array($this, 'check_product_health'),
          'permission_callback' => array($this, 'get_config_permissions_check'),
        ),
      )
    ); */
    register_rest_route(
      $this->namespace,
      '/' . $this->rest_base . "/config-page",
      array(
        array(
          'methods' => \WP_REST_Server::CREATABLE,
          'callback' => array($this, 'save_config_page'),
          'permission_callback' => array($this, 'get_config_permissions_check'),
        ),
        array(
          'methods' => \WP_REST_Server::READABLE,
          'callback' => array($this, 'get_config_pages'),
          'permission_callback' => array($this, 'get_config_permissions_check'),
        ),
      )
    );
    register_rest_route(
      $this->namespace,
      '/' . $this->rest_base . "/pages",
      array(
        array(
          'methods' => \WP_REST_Server::CREATABLE,
          'callback' => array($this, 'create_new_page'),
          'permission_callback' => array($this, 'get_config_permissions_check'),
        ),
        array(
          'methods' => \WP_REST_Server::READABLE,
          'callback' => array($this, 'get_available_pages'),
          'permission_callback' => array($this, 'get_config_permissions_check'),
        ),
      )
    );
    /* register_rest_route(
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
    ); */
    register_rest_route(
      $this->namespace,
      '/' . $this->rest_base . "/output",
      array(
        array(
          'methods' => \WP_REST_Server::READABLE,
          'callback' => array($this, 'get_output_options_globals_settings'),
          'permission_callback' => array($this, 'get_config_permissions_check'),
        ),
        array(
          'methods' => \WP_REST_Server::EDITABLE,
          'callback' => array($this, 'update_output_options_globals_settings'),
          'permission_callback' => array($this, 'get_config_permissions_check'),
        )
      )
    );
    register_rest_route(
      $this->namespace,
      '/' . $this->rest_base . "/shapes",
      array(
        array(
          'methods' => \WP_REST_Server::READABLE,
          'callback' => array($this, 'get_shapes_options_globals_settings'),
          'permission_callback' => array($this, 'get_config_permissions_check'),
        )
      )
    );
    register_rest_route(
      $this->namespace,
      '/' . $this->rest_base . "/shapes/(?P<shape_id>\d+)",
      array(
        array(
          'methods' => \WP_REST_Server::EDITABLE,
          'callback' => array($this, 'update_shapes_options_globals_settings'),
          'permission_callback' => array($this, 'get_config_permissions_check'),
          'args' => array(
            'shape_id' => array(
              'type' => 'integer',
              'required' => true,
            )
          )
        )
      )
    );

    register_rest_route(
      $this->namespace,
      '/' . $this->rest_base . "/fixing-methods",
      array(
        array(
          'methods' => \WP_REST_Server::READABLE,
          'callback' => array($this, 'get_fixing_methods_options_globals_settings'),
          'permission_callback' => array($this, 'get_config_permissions_check'),
        )
      )
    );
    register_rest_route(
      $this->namespace,
      '/' . $this->rest_base . "/fixing-methods/(?P<fixingMethod_id>\d+)",
      array(
        array(
          'methods' => \WP_REST_Server::EDITABLE,
          'callback' => array($this, 'update_fixing_methods_options_globals_settings'),
          'permission_callback' => array($this, 'get_config_permissions_check'),
          'args' => array(
            'fixingMethod_id' => array(
              'type' => 'integer',
              'required' => true,
            )
          )
        )
      )
    );
    register_rest_route(
      $this->namespace,
      '/' . $this->rest_base . "/borders",
      array(
        array(
          'methods' => \WP_REST_Server::READABLE,
          'callback' => array($this, 'get_borders_options_globals_settings'),
          'permission_callback' => array($this, 'get_config_permissions_check'),
        )
      )
    );
    register_rest_route(
      $this->namespace,
      '/' . $this->rest_base . "/borders/(?P<border_id>\d+)",
      array(
        array(
          'methods' => \WP_REST_Server::EDITABLE,
          'callback' => array($this, 'update_borders_options_globals_settings'),
          'permission_callback' => array($this, 'get_config_permissions_check'),
          'args' => array(
            'border_id' => array(
              'type' => 'integer',
              'required' => true,
            )
          )
        )
      )
    );
  }
  /**
   * Add ASO Product
   * @param \WP_REST_Request $request Full details about the request.
   *
   * @return \WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
   */
  public function save_asowp_product($request)
  {
    $data = json_decode($request->get_body(), true);
    if (!is_array($data)) {
      return rest_ensure_response(["message" => __("ASO Product Pro not found", "all-signs-options-pro")]);
    }

    $has_product = isset($data["product"]);
    $has_auto_update = array_key_exists('auto_update', $data);

    if (!$has_product && !$has_auto_update) {
      return rest_ensure_response(["message" => __("ASO Product Pro not found", "all-signs-options-pro")]);
    }

    if ($has_auto_update) {
      $this->set_auto_update_enabled($this->normalize_bool($data['auto_update']));
    }

    if ($has_product) {
      $product = get_option("asowp_product_pro", false);
      $next_product = sanitize_text_field((string) $data["product"]);

      if (!empty($next_product) && $product != $next_product) {
        update_option("asowp_product_pro", $next_product);
        $this->clear_license_data();
      } elseif (empty($next_product)) {
        delete_option("asowp_product_pro");
        $this->clear_license_data();
      }

      if (isset($data["valid"])) {
        $timestamp = (int) $data["valid"];
        if ($timestamp > 0) {
          $license_data = $this->process_license_validity($timestamp);
          $this->save_license_data_robust($license_data);
        } else {
          $this->clear_license_data();
        }
      }

      if (empty($next_product) && !$has_auto_update) {
        return rest_ensure_response(["message" => __("ASO Product Pro not found", "all-signs-options-pro")]);
      }
    }

    return rest_ensure_response([
      "success" => __("ASO Product Pro saved successfully", "all-signs-options-pro"),
      "auto_update" => $this->get_auto_update_enabled(),
    ]);
  }

  private function process_license_validity($timestamp)
  {
    $expiryTimestamp = (int) $timestamp;
    $timezone = function_exists('wp_timezone') ? wp_timezone() : new DateTimeZone('UTC');
    $date = new DateTime("@$expiryTimestamp");
    $date->setTimezone($timezone);

    $secondsUntil = max(0, $expiryTimestamp - time());

    return [
      'timestamp' => $expiryTimestamp,
      'date' => $date->format('Y-m-d H:i:s'),
      'seconds_until' => $secondsUntil,
      'last_checked' => current_time('mysql')
    ];
  }

  private function save_license_data_robust($license_data)
  {
    update_option('asowp_license_data', $license_data);
    wp_cache_delete('asowp_license_data', 'options');
  }

  private function clear_license_data()
  {
    delete_option('asowp_license_data');
    wp_cache_delete('asowp_license_data', 'options');
  }

  /**
   * Get ASO Product
   * @param \WP_REST_Request $request Full details about the request.
   *
   * @return \WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
   */
  public function get_asowp_product($request)
  {
    $option = get_option("asowp_product_pro");
    $response = [
      'product' => $option ? $option : '',
      'auto_update' => $this->get_auto_update_enabled(),
    ];

    if ($option == false || empty($option)) {
      $response["message"] = __("No ASO Product Pro available", "all-signs-options-pro");
      return rest_ensure_response($response);
    } else {
      return rest_ensure_response($response);
    }
  }

  private function get_auto_update_enabled()
  {
    $plugins = get_site_option('auto_update_plugins', []);

    if (!is_array($plugins)) {
      return false;
    }

    return in_array(plugin_basename(ASOWP_FILE), $plugins, true);
  }

  private function set_auto_update_enabled($enabled)
  {
    $plugin = plugin_basename(ASOWP_FILE);
    $plugins = get_site_option('auto_update_plugins', []);

    if (!is_array($plugins)) {
      $plugins = [];
    }

    if ($enabled) {
      if (!in_array($plugin, $plugins, true)) {
        $plugins[] = $plugin;
      }
    } else {
      $plugins = array_values(array_filter($plugins, function ($item) use ($plugin) {
        return $item !== $plugin;
      }));
    }

    update_site_option('auto_update_plugins', $plugins);
  }

  private function normalize_bool($value)
  {
    if (is_bool($value)) {
      return $value;
    }

    if (is_numeric($value)) {
      return ((int) $value) === 1;
    }

    if (is_string($value)) {
      $normalized = strtolower(trim($value));
      return in_array($normalized, ['1', 'true', 'yes', 'on'], true);
    }

    return !empty($value);
  }
  /**
   * Add config page
   * @param \WP_REST_Request $request Full details about the request.
   *
   * @return \WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
   */
  public function save_config_page($request)
  {
    $data = json_decode($request->get_body(), true);
    if (isset($data['configuratorPage'])) {

      $config_page = get_option("asowp_config_page", []);

      if ($config_page != $data) {
        update_option("asowp_config_page", $data);
        return rest_ensure_response(["success" => true, "message" => __("Data updated successfully", "all-signs-options-pro")]);
      } else {
        return rest_ensure_response(["success" => "same", "message" => __("No change observed", "all-signs-options-pro")]);
      }
    }
    return rest_ensure_response(["message" => __("Config page not found", "all-signs-options-pro")]);
  }

  /**
   * Get config page
   * @param \WP_REST_Request $request Full details about the request.
   *
   * @return \WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
   */
  public function get_config_pages()
  {

    $option = get_option("asowp_config_page");

    if ($option == false || empty($option)) {
      return rest_ensure_response(["message" => __("Config page not found", "all-signs-options-pro")]);
    } else {
      return rest_ensure_response($option);
    }
  }

  /**
   * Show all published pages
   *  @param  \WP_REST_Request $request Full details about the request.
   * @return \WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
   */
  function get_available_pages()
  {
    $args = array(
      'post_type' => 'page', // Type de contenu "page"
      'post_status' => 'publish', // Statut "publié"
      'posts_per_page' => -1, // Tous les articles (-1 pour afficher tous les articles)
    );

    $existing_pages = get_posts($args);
    $pages = [];
    $pages[] = ["id" => 0, "title" => esc_html_x("None", "all-signs-options-pro")];

    foreach ($existing_pages as $page) {
      $pages[] = ["id" => $page->ID, "title" => $page->post_title];
    }

    return rest_ensure_response($pages);
  }

  /**
   * Add new page 
   * 
   * @param  \WP_REST_Request $request Full details about the request.
   * @return \WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
   */
  function create_new_page($request)
  {
    $params = json_decode($request->get_body());
    if (isset($params->title) && !empty($params->title)) {

      $new_page = array(
        'post_title' => $params->title,
        'post_status' => 'publish',
        'post_type' => 'page'
      );

      $page_id = wp_insert_post($new_page);

      if (!is_wp_error($page_id)) {
        return rest_ensure_response(["id" => $page_id, "message" => __("Page created successfully", "all-signs-options-pro")]);
      } else {
        return rest_ensure_response(["message" => __("Page was not created", "all-signs-options-pro")]);
      }

    } else {
      return rest_ensure_response(["message" => __("Page was not created", "all-signs-options-pro")]);
    }
  }
  /**
   * Output functions 
   * 
   * @param  \WP_REST_Request $request Full details about the request.
   * @return \WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
   */
  public function get_output_options_globals_settings($request)
  {
    $outputOptions = get_option("asowp_output_options", []);
    if (count($outputOptions) > 0)
      return rest_ensure_response($outputOptions);
    else
      return rest_ensure_response(["message" => __("No output options found", "all-signs-options-pro")]);
  }
  public function update_output_options_globals_settings($request)
  {
    $data = json_decode($request->get_body(), true);
    $outputOptions = get_option("asowp_output_options", []);
    if ($data != $outputOptions) {
      $update = update_option("asowp_output_options", $data);
      if ($update) {
        return rest_ensure_response(array('success' => true, "message" => __("The ouput settings has been updated with success", "all-signs-options-pro")));
      } else {
        return rest_ensure_response(array('success' => false, "message" => __("The ouput settings update failed", "all-signs-options-pro")));
      }
    } else {
      return rest_ensure_response(array('success' => "same", "message" => __("No change observed in the ouput settings", "all-signs-options-pro")));

    }
  }
  /**
   * get all shapes function 
   * 
   * @param  \WP_REST_Request $request Full details about the request.
   * @return \WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
   */
  public function get_shapes_options_globals_settings($request)
  {
    $all_shapes = get_option("asowp_all_shapes", []);
    return rest_ensure_response($all_shapes);
  }
  /**
   * Update all shape function 
   * 
   * @param  \WP_REST_Request $request Full details about the request.
   * @return \WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
   */
  public function update_shapes_options_globals_settings($request)
  {
    $shape = json_decode($request->get_body(), true);
    $shape_id = $request->get_param('shape_id');
    $all_shapes = get_option("asowp_all_shapes", []);
    ;
    if ($all_shapes[$shape_id]) {
      if ($all_shapes[$shape_id] != $shape) {
        $all_shapes[$shape_id] = $shape;
        $update = update_option("asowp_all_shapes", $all_shapes);
        if ($update) {
          return rest_ensure_response(array('success' => true, "message" => __("The Shape has been updated with success", "all-signs-options-pro")));
        } else {
          return rest_ensure_response(array('success' => false, "message" => __("Shape update failed", "all-signs-options-pro")));
        }
      } else {
        return rest_ensure_response(array('success' => "same", "message" => __("No change observed in shape", "all-signs-options-pro")));

      }
    } else {
      return rest_ensure_response(["success" => false, "message" => __('Shape not found', "all-signs-options-pro")]);
    }
  }
  /**
   * get all fixing methods function 
   * 
   * @param  \WP_REST_Request $request Full details about the request.
   * @return \WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
   */
  public function get_fixing_methods_options_globals_settings($request)
  {
    $all_fixingMethods = get_option("asowp_all_fixingMethods", []);
    return rest_ensure_response($all_fixingMethods);
  }
  /**
   * Update all fixing method function 
   * 
   * @param  \WP_REST_Request $request Full details about the request.
   * @return \WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
   */
  public function update_fixing_methods_options_globals_settings($request)
  {
    $fixingMethod = json_decode($request->get_body(), true);
    $fixingMethod_id = $request->get_param('fixingMethod_id');
    $all_fixingMethods = get_option("asowp_all_fixingMethods", []);
    if ($all_fixingMethods[$fixingMethod_id]) {
      if ($all_fixingMethods[$fixingMethod_id] != $fixingMethod) {
        $all_fixingMethods[$fixingMethod_id] = $fixingMethod;
        $update = update_option("asowp_all_fixingMethods", $all_fixingMethods);
        if ($update) {
          return rest_ensure_response(array('success' => true, "message" => __("The Fixing Method has been updated with success", "all-signs-options-pro")));
        } else {
          return rest_ensure_response(array('success' => false, "message" => __("FixingMethod update failed", "all-signs-options-pro")));
        }
      } else {
        return rest_ensure_response(array('success' => "same", "message" => __("No change observed in fixing Method", "all-signs-options-pro")));
      }
    } else {
      return rest_ensure_response(["success" => false, "message" => __('FixingMethod not found', "all-signs-options-pro")]);
    }
  }
  /**
   * get all borders function 
   * 
   * @param  \WP_REST_Request $request Full details about the request.
   * @return \WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
   */
  public function get_borders_options_globals_settings($request)
  {
    $all_borders = get_option("asowp_all_borders", []);
    return rest_ensure_response($all_borders);
  }
  /**
   * Update all border function 
   * 
   * @param  \WP_REST_Request $request Full details about the request.
   * @return \WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
   */
  public function update_borders_options_globals_settings($request)
  {
    $border = json_decode($request->get_body(), true);
    $border_id = $request->get_param('border_id');
    $all_borders = get_option("asowp_all_borders", []);
    ;
    if ($all_borders[$border_id]) {
      if ($all_borders[$border_id] != $border) {
        $all_borders[$border_id] = $border;
        $update = update_option("asowp_all_borders", $all_borders);
        if ($update) {
          return rest_ensure_response(array('success' => true, "message" => __("The Border has been updated with success", "all-signs-options-pro")));
        } else {
          return rest_ensure_response(array('success' => false, "message" => __("Border update failed", "all-signs-options-pro")));
        }
      } else {
        return rest_ensure_response(array('success' => "same", "message" => __("No change observed in border", "all-signs-options-pro")));
      }
    } else {
      return rest_ensure_response(["success" => false, "message" => __('Border not found', "all-signs-options-pro")]);
    }
  }
  /**
   * Checks if a given request has access to read the items.
   *
   * @param  WP_REST_Request $request Full details about the request.
   *
   * @return true|WP_Error True if the request has read access, WP_Error object otherwise.
   */
  public function get_config_permissions_check($request)
  {
    return true;
  }
}
