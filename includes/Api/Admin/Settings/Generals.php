<?php
/**
 * REST controller for generals settings.
 *
 * @package ASCWO
 */

namespace ASCWO\Api\Admin\Settings;

use WP_Error;
use WP_Post;
use WP_REST_Controller;

/**
 * REST controller for generals settings.
 */
class ASCWO_Api_General_Settings extends WP_REST_Controller {

	/**
	 * Constructor.
	 */
	public function __construct() {
		$this->namespace = 'ascwo/v1';
		$this->rest_base = 'configs/(?P<config_id>\d+)/settings/generals';
	}
    /**
     * Register the routes
     *
     * @return void
     */
    public function register_routes()
    {
        register_rest_route(
            $this->namespace,
            '/' . $this->rest_base,
            array(
                array(
                    'methods' => \WP_REST_Server::READABLE,
                    'callback' => array($this, 'get_generals_settings'),
                    'permission_callback' => array($this, 'get_permissions_check'),
                    'args' => array(
                        'config_id' => array(
                            'type' => 'integer',
                            'required' => true,
                        )
                    ),
                )
            )
        );
        register_rest_route(
            $this->namespace,
            '/' . $this->rest_base . "/product",
            array(
                array(
                    'methods' => \WP_REST_Server::EDITABLE,
                    'callback' => array($this, 'update_product_options_generals_settings'),
                    'permission_callback' => array($this, 'get_permissions_check'),
                    'args' => array(
                        'config_id' => array(
                            'type' => 'integer',
                            'required' => true,
                        )
                    ),
                )
            )
        );
        register_rest_route(
            $this->namespace,
            '/' . $this->rest_base . "/output",
            array(
                array(
                    'methods' => \WP_REST_Server::EDITABLE,
                    'callback' => array($this, 'update_output_options_generals_settings'),
                    'permission_callback' => array($this, 'get_permissions_check'),
                    'args' => array(
                        'config_id' => array(
                            'type' => 'integer',
                            'required' => true,
                        )
                    ),
                )
            )
        );
        register_rest_route(
            $this->namespace,
            '/' . $this->rest_base . "/mobile",
            array(
                array(
                    'methods' => \WP_REST_Server::EDITABLE,
                    'callback' => array($this, 'update_mobile_options_generals_settings'),
                    'permission_callback' => array($this, 'get_permissions_check'),
                    'args' => array(
                        'config_id' => array(
                            'type' => 'integer',
                            'required' => true,
                        )
                    ),
                )
            )
        );
        register_rest_route(
            $this->namespace,
            '/' . $this->rest_base . "/(?P<section>[a-zA-Z0-9_-]+)",
            array(
                array(
                    'methods' => \WP_REST_Server::EDITABLE,
                    'callback' => array($this, 'update_section_options_generals_settings'),
                    'permission_callback' => array($this, 'get_permissions_check'),
                    'args' => array(
                        'config_id' => array(
                            'type' => 'integer',
                            'required' => true,
                        ),
                        'section' => array(
                            'type' => 'string',
                            'required' => true,
                        )
                    ),
                )
            )
        );
    }

	/**
	 * Get normalized meta.
	 *
	 * @param int $config_id Config post ID.
	 * @return array
	 */
	private function get_normalized_meta( $config_id ) {
		$meta = get_post_meta( (int) $config_id, 'ascwo-configs-meta', true );
		$meta = is_array( $meta ) ? $meta : array();
		$meta['settings'] = isset( $meta['settings'] ) && is_array( $meta['settings'] ) ? $meta['settings'] : array();

		return $meta;
	}

	/**
	 * Get generals settings from meta.
	 *
	 * @param array $meta Config meta.
	 * @return array
	 */
	private function get_generals_from_meta( array $meta ) {
		return isset( $meta['settings']['generals'] ) && is_array( $meta['settings']['generals'] ) ? $meta['settings']['generals'] : array();
	}

	/**
	 * Save a generals section.
	 *
	 * @param int    $config_id       Config post ID.
	 * @param string $section         Section key.
	 * @param array  $section_options Section options.
	 * @return bool|string
	 */
	private function save_general_section( $config_id, $section, array $section_options ) {
		$meta = $this->get_normalized_meta( $config_id );

		if ( ! isset( $meta['settings'] ) || ! is_array( $meta['settings'] ) ) {
			$meta['settings'] = array();
		}

		if ( ! isset( $meta['settings']['generals'] ) || ! is_array( $meta['settings']['generals'] ) ) {
			$meta['settings']['generals'] = array();
		}

		if ( isset( $meta['settings']['generals'][ $section ] ) && $meta['settings']['generals'][ $section ] === $section_options ) {
			return 'same';
		}

		$meta['settings']['generals'][ $section ] = $section_options;

		return update_post_meta( (int) $config_id, 'ascwo-configs-meta', $meta );
	}

	/**
	 * Get config post.
	 *
	 * @param int $config_id Config post ID.
	 * @return WP_Post|false
	 */
	private function get_config_post( $config_id ) {
		$config_id = (int) $config_id;
		if ( 0 === $config_id ) {
			return false;
		}

		$post = get_post( $config_id );

		return $post instanceof WP_Post ? $post : false;
	}

	/**
	 * Get request body as array.
	 *
	 * @param \WP_REST_Request $request Request object.
	 * @return array
	 */
	private function get_request_data( $request ) {
		$data = $request->get_json_params();

		return is_array( $data ) ? $data : array();
	}

	/**
	 * Get all generals settings.
	 *
	 * @param \WP_REST_Request $request Full details about the request.
	 * @return \WP_REST_Response|WP_Error
	 */
	public function get_generals_settings( $request ) {
		$post = $this->get_config_post( $request->get_param( 'config_id' ) );

		if ( false === $post ) {
			return rest_ensure_response(
				array(
					'message' => __( 'Custom ID invalid', 'all-signs-customizer-for-woocommerce-pro' ),
				)
			);
		}

		$meta_value = $this->get_normalized_meta( (int) $post->ID );
		if ( empty( $meta_value ) ) {
			return rest_ensure_response(
				array(
					'message' => __( 'No Settings found', 'all-signs-customizer-for-woocommerce-pro' ),
				)
			);
		}

		$generals = $this->get_generals_from_meta( $meta_value );
		if ( ! empty( $generals ) ) {
			return rest_ensure_response( $generals );
		}

		return rest_ensure_response(
			array(
				'message' => __( 'No generals Settings found', 'all-signs-customizer-for-woocommerce-pro' ),
			)
		);
	}
	/**
	 * Update product options.
	 *
	 * @param \WP_REST_Request $request Full details about the request.
	 * @return \WP_REST_Response|WP_Error
	 */
	public function update_product_options_generals_settings( $request ) {
		$post = $this->get_config_post( $request->get_param( 'config_id' ) );

		if ( false === $post ) {
			return rest_ensure_response(
				array(
					'success' => false,
					'message' => __( 'Custom ID invalid', 'all-signs-customizer-for-woocommerce-pro' ),
				)
			);
		}

		$product_options = $this->get_request_data( $request );
		$response        = $this->save_general_section( (int) $post->ID, 'product', $product_options );

		if ( 'same' === $response ) {
			return rest_ensure_response(
				array(
					'success' => 'same',
					'message' => __( 'No change observed in product options in generals settings failed', 'all-signs-customizer-for-woocommerce-pro' ),
				)
			);
		}

		if ( $response ) {
			return rest_ensure_response(
				array(
					'success' => true,
					'message' => __( 'Product options in generals settings updated successfully', 'all-signs-customizer-for-woocommerce-pro' ),
				)
			);
		}

		return rest_ensure_response(
			array(
				'success' => false,
				'message' => __( 'Update product options in generals settings failed', 'all-signs-customizer-for-woocommerce-pro' ),
			)
		);
	}

    /**
     * Update Mobile options of generals settings
     * @param \WP_REST_Request $request Full details about the request.
     * @return \WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
	public function update_mobile_options_generals_settings( $request ) {
		$post = $this->get_config_post( $request->get_param( 'config_id' ) );

		if ( false === $post ) {
			return rest_ensure_response(
				array(
					'success' => false,
					'message' => __( 'Custom ID invalid', 'all-signs-customizer-for-woocommerce-pro' ),
				)
			);
		}

		$mobile_options = $this->get_request_data( $request );
		$response       = $this->save_general_section( (int) $post->ID, 'mobile', $mobile_options );

		if ( 'same' === $response ) {
			return rest_ensure_response(
				array(
					'success' => 'same',
					'message' => __( 'No change observed in mobile options in generals settings failed', 'all-signs-customizer-for-woocommerce-pro' ),
				)
			);
		}

		if ( $response ) {
			return rest_ensure_response(
				array(
					'success' => true,
					'message' => __( 'Mobile options in generals settings updated successfully', 'all-signs-customizer-for-woocommerce-pro' ),
				)
			);
		}

		return rest_ensure_response(
			array(
				'success' => false,
				'message' => __( 'Update mobile options in generals settings failed', 'all-signs-customizer-for-woocommerce-pro' ),
			)
		);
	}
    /**
     * Update Output options of generals settings
     * @param \WP_REST_Request $request Full details about the request.
     * @return \WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
	public function update_output_options_generals_settings( $request ) {
		$post = $this->get_config_post( $request->get_param( 'config_id' ) );

		if ( false === $post ) {
			return rest_ensure_response(
				array(
					'success' => false,
					'message' => __( 'Custom ID invalid', 'all-signs-customizer-for-woocommerce-pro' ),
				)
			);
		}

		$output_options = $this->get_request_data( $request );
		$response       = $this->save_general_section( (int) $post->ID, 'output', $output_options );

		if ( 'same' === $response ) {
			return rest_ensure_response(
				array(
					'success' => 'same',
					'message' => __( 'No change observed in output options in generals settings failed', 'all-signs-customizer-for-woocommerce-pro' ),
				)
			);
		}

		if ( $response ) {
			return rest_ensure_response(
				array(
					'success' => true,
					'message' => __( 'Output options in generals settings updated successfully', 'all-signs-customizer-for-woocommerce-pro' ),
				)
			);
		}

		return rest_ensure_response(
			array(
				'success' => false,
				'message' => __( 'Update output options in generals settings failed', 'all-signs-customizer-for-woocommerce-pro' ),
			)
		);
	}

    /**
     * Update a supported general settings section.
     *
     * @param \WP_REST_Request $request Full details about the request.
     * @return \WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
	public function update_section_options_generals_settings( $request ) {
		$section         = (string) $request->get_param( 'section' );
		$allowed_sections = array(
			'product',
			'output',
			'upload',
			'mobile',
			'mode',
			'uploadDesign',
			'quantityLimits',
			'discount',
			'requestQuote',
			'simpleOptions',
		);

		if ( ! in_array( $section, $allowed_sections, true ) ) {
			return rest_ensure_response(
				array(
					'success' => false,
					'message' => __( 'General settings section invalid', 'all-signs-customizer-for-woocommerce-pro' ),
				)
			);
		}

		$post = $this->get_config_post( $request->get_param( 'config_id' ) );
		if ( false === $post ) {
			return rest_ensure_response(
				array(
					'success' => false,
					'message' => __( 'Custom ID invalid', 'all-signs-customizer-for-woocommerce-pro' ),
				)
			);
		}

		$section_options = $this->get_request_data( $request );
		$response        = $this->save_general_section( (int) $post->ID, $section, $section_options );

		if ( 'same' === $response ) {
			return rest_ensure_response(
				array(
					'success' => 'same',
					'message' => __( 'No change observed in general settings', 'all-signs-customizer-for-woocommerce-pro' ),
				)
			);
		}

		if ( $response ) {
			return rest_ensure_response(
				array(
					'success' => true,
					'message' => __( 'General settings updated successfully', 'all-signs-customizer-for-woocommerce-pro' ),
				)
			);
		}

		return rest_ensure_response(
			array(
				'success' => false,
				'message' => __( 'Update general settings failed', 'all-signs-customizer-for-woocommerce-pro' ),
			)
		);
	}

	/**
	 * Permission check.
	 *
	 * @param \WP_REST_Request $request Request object.
	 * @return bool
	 */
	public function get_permissions_check( $request ) {
		return current_user_can( 'manage_options' );
	}
}
