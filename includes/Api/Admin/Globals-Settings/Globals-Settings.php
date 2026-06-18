<?php
/**
 * REST controller for global plugin settings.
 *
 * @package ASCWO
 */

namespace ASCWO\Api\Admin\Globals_Settings;

use DateTime;
use DateTimeZone;
use WP_Error;
use WP_Query;
use WP_REST_Controller;


/**
 * class for api routes reaching generals settings
 */

class ASCWO_Api_Globals_Settings extends WP_REST_Controller
{
  /**
   * Register the globals settings REST controller.
   */
  public function __construct()
  {
    $this->namespace = 'ascwo/v1';
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
          'callback' => array($this, 'save_ascwo_product'),
          'permission_callback' => array($this, 'get_config_permissions_check'),
        ),
        array(
          'methods' => \WP_REST_Server::READABLE,
          'callback' => array($this, 'get_ascwo_product'),
          'permission_callback' => array($this, 'get_config_permissions_check'),
        ),
      )
    );
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
      '/' . $this->rest_base . "/shapes/(?P<shape_id>[^/]+)",
      array(
        array(
          'methods' => \WP_REST_Server::EDITABLE,
          'callback' => array($this, 'update_shapes_options_globals_settings'),
          'permission_callback' => array($this, 'get_config_permissions_check'),
          'args' => array(
            'shape_id' => array(
              'type' => 'string',
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
      '/' . $this->rest_base . "/fixing-methods/(?P<fixingMethod_id>[^/]+)",
      array(
        array(
          'methods' => \WP_REST_Server::EDITABLE,
          'callback' => array($this, 'update_fixing_methods_options_globals_settings'),
          'permission_callback' => array($this, 'get_config_permissions_check'),
          'args' => array(
            'fixingMethod_id' => array(
              'type' => 'string',
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
      '/' . $this->rest_base . "/borders/(?P<border_id>[^/]+)",
      array(
        array(
          'methods' => \WP_REST_Server::EDITABLE,
          'callback' => array($this, 'update_borders_options_globals_settings'),
          'permission_callback' => array($this, 'get_config_permissions_check'),
          'args' => array(
            'border_id' => array(
              'type' => 'string',
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
  public function save_ascwo_product($request)
  {
    $data = $request->get_json_params();
    if (!is_array($data)) {
      $data = array();
    }
    if (!is_array($data)) {
      return rest_ensure_response(["message" => __("ASO Product Pro not found", "all-signs-customizer-for-woocommerce-pro")]);
    }

    $has_product = isset($data["product"]);
    $has_auto_update = array_key_exists('auto_update', $data);
    $should_activate_license = !empty($data['activate_license']);

    if (!$has_product && !$has_auto_update) {
      return rest_ensure_response(["message" => __("ASO Product Pro not found", "all-signs-customizer-for-woocommerce-pro")]);
    }

    if ($has_auto_update) {
      $this->set_auto_update_enabled($this->normalize_bool($data['auto_update']));
    }

    if ($has_product) {
      $product = get_option("ascwo_product_pro", false);
      $next_product = sanitize_text_field((string) $data["product"]);

      if (!empty($next_product) && $product !== $next_product) {
        update_option("ascwo_product_pro", $next_product);
        $this->clear_license_data();
      } elseif (empty($next_product)) {
        delete_option("ascwo_product_pro");
        $this->clear_license_data();
      }

      if ($should_activate_license && !empty($next_product)) {
        $activation = $this->activate_remote_license($next_product);

        if (is_wp_error($activation)) {
          return rest_ensure_response([
            "success" => false,
            "message" => $activation->get_error_message(),
            "auto_update" => $this->get_auto_update_enabled(),
          ]);
        }

        if (isset($activation['key'])) {
          $timestamp = (int) $activation['key'];
          if ($timestamp > 0) {
            $license_data = $this->process_license_validity($timestamp);
            $this->save_license_data_robust($license_data);
          } else {
            $this->clear_license_data();
          }
        } elseif (isset($activation['message'])) {
          return rest_ensure_response([
            "success" => false,
            "message" => sanitize_text_field((string) $activation['message']),
            "auto_update" => $this->get_auto_update_enabled(),
          ]);
        }
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
        return rest_ensure_response(["message" => __("ASO Product Pro not found", "all-signs-customizer-for-woocommerce-pro")]);
      }
    }

    return rest_ensure_response([
      "success" => $should_activate_license ? __("Activation successful! Your product is ready to use", "all-signs-customizer-for-woocommerce-pro") : __("ASO Product Pro saved successfully", "all-signs-customizer-for-woocommerce-pro"),
      "message" => $should_activate_license ? __("Activation successful! Your product is ready to use", "all-signs-customizer-for-woocommerce-pro") : __("ASO Product Pro saved successfully", "all-signs-customizer-for-woocommerce-pro"),
      "auto_update" => $this->get_auto_update_enabled(),
    ]);
  }

  /**
   * Activate a license key against the remote server from PHP.
   *
   * This keeps the license check server-side so the browser does not need to
   * hit the remote WP REST endpoint directly and avoids cookie/nonce issues.
   *
   * @param string $product License key.
   *
   * @return array|WP_Error Decoded response data or error.
   */
  private function activate_remote_license($product)
  {
    $site_url = get_site_url();
    $url = add_query_arg(
      array(
        'lcde' => $product,
        'siteurl' => $site_url,
        'vertim' => ASCWO_ID,
      ),
      'https://signsdesigner.us/wp-json/vlc/license/'
    );

    $response = wp_remote_get(
      $url,
      array(
        'timeout' => 8,
        'user-agent' => 'ASCWO/' . ASCWO_VERSION . '; ' . home_url('/'),
      )
    );

    if (is_wp_error($response)) {
      return $response;
    }

    $status_code = (int) wp_remote_retrieve_response_code($response);
    if ($status_code < 200 || $status_code >= 300) {
      return new WP_Error(
        'ascwo_license_http_error',
        wp_remote_retrieve_response_message($response)
      );
    }

    $body = wp_remote_retrieve_body($response);
    if ('' === trim((string) $body)) {
      return new WP_Error('ascwo_license_empty_body', __('Empty response received from the license server.', 'all-signs-customizer-for-woocommerce-pro'));
    }

    $decoded = json_decode($body, true);
    if (!is_array($decoded)) {
      return new WP_Error('ascwo_license_invalid_json', __('Invalid response received from the license server.', 'all-signs-customizer-for-woocommerce-pro'));
    }

    if (isset($decoded['message'])) {
      $decoded['message'] = sanitize_text_field((string) $decoded['message']);
    }

    return $decoded;
  }

  /**
   * Persist the license expiry timestamp returned by the remote checker.
   *
   * The stored payload keeps both the raw timestamp and the site timezone so
   * the admin UI can compare values using server-side time only.
   *
   * @param int|string $timestamp Remote expiry timestamp.
   *
   * @return void
   */
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
      'last_checked' => current_time('mysql'),
      'timezone' => function_exists('wp_timezone_string') ? wp_timezone_string() : get_option('timezone_string', 'UTC'),
    ];
  }

  private function save_license_data_robust($license_data)
  {
    update_option('ascwo_license_data', $license_data);
    wp_cache_delete('ascwo_license_data', 'options');
  }

  private function clear_license_data()
  {
    delete_option('ascwo_license_data');
    wp_cache_delete('ascwo_license_data', 'options');
  }

  /**
   * Get ASO Product
   * @param \WP_REST_Request $request Full details about the request.
   *
   * @return \WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
   */
  public function get_ascwo_product($request)
  {
    $option = get_option("ascwo_product_pro");
    $response = [
      'product' => $option ? $option : '',
      'auto_update' => $this->get_auto_update_enabled(),
    ];

    if (false === $option || empty($option)) {
      $response["message"] = __("No ASO Product Pro available", "all-signs-customizer-for-woocommerce-pro");
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

    return in_array(plugin_basename(ASCWO_FILE), $plugins, true);
  }

  private function set_auto_update_enabled($enabled)
  {
    $plugin = plugin_basename(ASCWO_FILE);
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
    $data = $request->get_json_params();
    if (!is_array($data)) {
      $data = array();
    }
    if (isset($data['configuratorPage'])) {

      $config_page = get_option("ascwo_config_page", []);

      if ($config_page !== $data) {
        update_option("ascwo_config_page", $data);
        return rest_ensure_response(["success" => true, "message" => __("Data updated successfully", "all-signs-customizer-for-woocommerce-pro")]);
      } else {
        return rest_ensure_response(["success" => "same", "message" => __("No change observed", "all-signs-customizer-for-woocommerce-pro")]);
      }
    }
    return rest_ensure_response(["message" => __("Config page not found", "all-signs-customizer-for-woocommerce-pro")]);
  }

  /**
   * Get config page
   * @param \WP_REST_Request $request Full details about the request.
   *
   * @return \WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
   */
  public function get_config_pages()
  {

    $option = get_option("ascwo_config_page");

    if (false === $option || empty($option)) {
      return rest_ensure_response(["message" => __("Config page not found", "all-signs-customizer-for-woocommerce-pro")]);
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
      'post_type' => 'page',
      'post_status' => 'publish',
      'posts_per_page' => -1,
    );

    $existing_pages = get_posts($args);
    $pages = [];
    $pages[] = ["id" => 0, "title" => esc_html_x("None", "none page option", "all-signs-customizer-for-woocommerce-pro")];

    foreach ($existing_pages as $page) {
      $pages[] = ["id" => $page->ID, "title" => esc_html($page->post_title)];
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
    $params = $request->get_json_params();
    if (!is_array($params)) {
      $params = array();
    }
    if (isset($params['title']) && !empty($params['title'])) {

      $new_page = array(
        'post_title' => sanitize_text_field(wp_unslash($params['title'])),
        'post_status' => 'publish',
        'post_type' => 'page'
      );

      $page_id = wp_insert_post($new_page);

      if (!is_wp_error($page_id)) {
        return rest_ensure_response(["id" => $page_id, "message" => __("Page created successfully", "all-signs-customizer-for-woocommerce-pro")]);
      } else {
        return rest_ensure_response(["message" => __("Page was not created", "all-signs-customizer-for-woocommerce-pro")]);
      }

    } else {
      return rest_ensure_response(["message" => __("Page was not created", "all-signs-customizer-for-woocommerce-pro")]);
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
    $outputOptions = get_option("ascwo_output_options", []);
    if (!empty($outputOptions)) {
      return rest_ensure_response($outputOptions);
    }

      return rest_ensure_response(["message" => __("No output options found", "all-signs-customizer-for-woocommerce-pro")]);
  }
  public function update_output_options_globals_settings($request)
  {
    $data = $request->get_json_params();
    if (!is_array($data)) {
      $data = array();
    }
    $outputOptions = get_option("ascwo_output_options", []);
    if ($data !== $outputOptions) {
      $update = update_option("ascwo_output_options", $data);
      if ($update) {
        return rest_ensure_response(array('success' => true, "message" => __("The ouput settings has been updated with success", "all-signs-customizer-for-woocommerce-pro")));
      } else {
        return rest_ensure_response(array('success' => false, "message" => __("The ouput settings update failed", "all-signs-customizer-for-woocommerce-pro")));
      }
    } else {
      return rest_ensure_response(array('success' => "same", "message" => __("No change observed in the ouput settings", "all-signs-customizer-for-woocommerce-pro")));

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
    $all_shapes = get_option("ascwo_all_shapes", []);
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
    $shape = $request->get_json_params();
    if (!is_array($shape)) {
      $shape = array();
    }
    $shape_id = sanitize_text_field((string) $request->get_param('shape_id'));
    $all_shapes = get_option("ascwo_all_shapes", []);
    $shape_index = $this->find_shape_index($all_shapes, $shape_id);
    if ($shape_index !== null) {
      if (!isset($shape['id']) || $shape['id'] === '') {
        $shape['id'] = isset($all_shapes[$shape_index]['id']) ? $all_shapes[$shape_index]['id'] : $shape_id;
      }
      if ($all_shapes[$shape_index] !== $shape) {
        $all_shapes[$shape_index] = $shape;
        $update = update_option("ascwo_all_shapes", $all_shapes);
        if ($update) {
          return rest_ensure_response(array('success' => true, "message" => __("The Shape has been updated with success", "all-signs-customizer-for-woocommerce-pro")));
        } else {
          return rest_ensure_response(array('success' => false, "message" => __("Shape update failed", "all-signs-customizer-for-woocommerce-pro")));
        }
      } else {
        return rest_ensure_response(array('success' => "same", "message" => __("No change observed in shape", "all-signs-customizer-for-woocommerce-pro")));

      }
    } else {
      return rest_ensure_response(["success" => false, "message" => __('Shape not found', "all-signs-customizer-for-woocommerce-pro")]);
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
    $all_fixingMethods = $this->normalize_fixing_methods(get_option("ascwo_all_fixingMethods", []));
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
    $fixingMethod = $request->get_json_params();
    if (!is_array($fixingMethod)) {
      $fixingMethod = array();
    }
    $fixingMethod_id = sanitize_text_field((string) $request->get_param('fixingMethod_id'));
    $all_fixingMethods = $this->normalize_fixing_methods(get_option("ascwo_all_fixingMethods", []));
    $targetIndex = $this->find_fixing_method_index($all_fixingMethods, $fixingMethod_id);
    if ($targetIndex !== null) {
      if (!isset($fixingMethod['id']) || $fixingMethod['id'] === '') {
        $fixingMethod['id'] = $all_fixingMethods[$targetIndex]['id'];
      }
      if ($all_fixingMethods[$targetIndex] !== $fixingMethod) {
        $all_fixingMethods[$targetIndex] = $fixingMethod;
        $update = update_option("ascwo_all_fixingMethods", $all_fixingMethods);
        if ($update) {
          return rest_ensure_response(array('success' => true, "message" => __("The Fixing Method has been updated with success", "all-signs-customizer-for-woocommerce-pro")));
        } else {
          return rest_ensure_response(array('success' => false, "message" => __("FixingMethod update failed", "all-signs-customizer-for-woocommerce-pro")));
        }
      } else {
        return rest_ensure_response(array('success' => "same", "message" => __("No change observed in fixing Method", "all-signs-customizer-for-woocommerce-pro")));
      }
    } else {
      return rest_ensure_response(["success" => false, "message" => __('FixingMethod not found', "all-signs-customizer-for-woocommerce-pro")]);
    }
  }

  private function normalize_fixing_methods($fixingMethods)
  {
    if (!is_array($fixingMethods)) {
      return array();
    }

    $normalized = array();
    foreach (array_values($fixingMethods) as $index => $method) {
      if (!is_array($method)) {
        continue;
      }

      if (!isset($method['id']) || $method['id'] === '') {
        $method['id'] = !empty($method['type'])
          ? sanitize_title((string) $method['type'])
          : sanitize_title((string) ($method['name'] ?? 'fixing-method'));
      }

      $normalized[] = $method;
    }

    return $normalized;
  }

  private function find_fixing_method_index($fixingMethods, string $fixingMethodId)
  {
    foreach ($fixingMethods as $index => $method) {
      $methodId = isset($method['id']) ? (string) $method['id'] : '';
      $methodType = isset($method['type']) ? (string) $method['type'] : '';
      if ($methodId === $fixingMethodId || $methodType === $fixingMethodId) {
        return $index;
      }
    }

    return null;
  }
  /**
   * get all borders function 
   * 
   * @param  \WP_REST_Request $request Full details about the request.
   * @return \WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
   */
  public function get_borders_options_globals_settings($request)
  {
    $all_borders = get_option("ascwo_all_borders", []);
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
    $border = $request->get_json_params();
    if (!is_array($border)) {
      $border = array();
    }
    $border_id = sanitize_text_field((string) $request->get_param('border_id'));
    $all_borders = get_option("ascwo_all_borders", []);
    $border_index = $this->find_border_index($all_borders, $border_id);
    if ($border_index !== null) {
      if (!isset($border['id']) || $border['id'] === '') {
        $border['id'] = isset($all_borders[$border_index]['id']) ? $all_borders[$border_index]['id'] : $border_id;
      }
      if ($all_borders[$border_index] !== $border) {
        $all_borders[$border_index] = $border;
        $update = update_option("ascwo_all_borders", $all_borders);
        if ($update) {
          return rest_ensure_response(array('success' => true, "message" => __("The Border has been updated with success", "all-signs-customizer-for-woocommerce-pro")));
        } else {
          return rest_ensure_response(array('success' => false, "message" => __("Border update failed", "all-signs-customizer-for-woocommerce-pro")));
        }
      } else {
        return rest_ensure_response(array('success' => "same", "message" => __("No change observed in border", "all-signs-customizer-for-woocommerce-pro")));
      }
    } else {
      return rest_ensure_response(["success" => false, "message" => __('Border not found', "all-signs-customizer-for-woocommerce-pro")]);
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
    return current_user_can('manage_options');
  }

  private function find_shape_index($shapes, string $shapeId)
  {
    foreach ($shapes as $index => $shape) {
      if (!is_array($shape)) {
        continue;
      }
      $currentId = isset($shape['id']) ? (string) $shape['id'] : '';
      $currentValue = isset($shape['value']) ? (string) $shape['value'] : '';
      if ($currentId === $shapeId || $currentValue === $shapeId) {
        return $index;
      }
    }

    return null;
  }

  private function find_border_index($borders, string $borderId)
  {
    foreach ($borders as $index => $border) {
      if (!is_array($border)) {
        continue;
      }
      $currentId = isset($border['id']) ? (string) $border['id'] : '';
      $currentValue = isset($border['value']) ? (string) $border['value'] : '';
      if ($currentId === $borderId || $currentValue === $borderId) {
        return $index;
      }
    }

    return null;
  }
}
