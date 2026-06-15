<?php
/**
 * REST controller for managed fonts.
 *
 * @package ASCWO
 */

namespace ASCWO\Api\Admin;

use WP_Error;
use WP_REST_Controller;

/**
 * REST controller for managed fonts.
 */
class ASCWO_Api_Manage_fonts extends WP_REST_Controller {

	/**
	 * Constructor.
	 */
	public function __construct() {
		$this->namespace = 'ascwo/v1';
		$this->rest_base = 'manage-fonts';
	}

	/**
	 * Register the routes.
	 *
	 * @return void
	 */
	public function register_routes() {
        register_rest_route(
            $this->namespace,
            '/' . $this->rest_base,
            array(
                array(
                    'methods' => \WP_REST_Server::READABLE,
                    'callback' => array($this, 'get_manage_fonts'),
                    'permission_callback' => array( $this, 'get_config_permissions_check' ),
                ),
                array(
                    'methods' => \WP_REST_Server::CREATABLE,
                    'callback' => array( $this, 'add_font_to_manages_fonts' ),
                    'permission_callback' => array( $this, 'get_config_permissions_check' ),
                ),
            )
        );
        register_rest_route(
            $this->namespace,
            '/' . $this->rest_base . '/(?P<font_id>\d+)',
            array(
                array(
                    'methods' => \WP_REST_Server::READABLE,
                    'callback' => array( $this, 'get_manage_font' ),
                    'permission_callback' => array( $this, 'get_config_permissions_check' ),
                    'args' => array(
                        'font_id' => array(
                            'type' => 'integer',
                            'required' => true,
                        )
                    ),
                ),
                array(
                    'methods' => \WP_REST_Server::EDITABLE,
                    'callback' => array( $this, 'update_font' ),
                    'permission_callback' => array( $this, 'get_config_permissions_check' ),
                    'args' => array(
                        'font_id' => array(
                            'type' => 'integer',
                            'required' => true,
                        )
                    ),
                ),
                array(
                    'methods' => \WP_REST_Server::DELETABLE,
                    'callback' => array( $this, 'delete_manage_fonts_config' ),
                    'permission_callback' => array( $this, 'get_config_permissions_check' ),
                    'args' => array(
                        'font_id' => array(
                            'type' => 'integer',
                            'required' => true,
                        )
                    ),
                )
            )
        );
    }
	/**
	 * Get the stored fonts collection.
	 *
	 * @return array
	 */
	private function get_fonts_collection() {
		$all_fonts = get_option( 'ascwo-manages-fonts', array() );

		return is_array( $all_fonts ) ? array_values( $all_fonts ) : array();
	}

	/**
	 * Create fonts group.
	 *
	 * @param \WP_REST_Request $request Full details about the request.
	 * @return \WP_REST_Response|WP_Error
	 */
	public function add_font_to_manages_fonts( $request ) {
		$data      = $request->get_json_params();
		$data      = is_array( $data ) ? $data : array();
		$all_fonts = $this->get_fonts_collection();

		if ( ! empty( $data['many'] ) && ! empty( $data['fonts'] ) && is_array( $data['fonts'] ) ) {
			foreach ( $data['fonts'] as $font ) {
				$all_fonts[] = $font;
			}
		} elseif ( ! empty( $data['font'] ) ) {
			$all_fonts[] = $data['font'];
		} else {
			return rest_ensure_response(
				array(
					'success' => false,
					'message' => __( 'Registration failed', 'all-signs-customizer-for-woocommerce-pro' ),
				)
			);
		}

		$update = update_option( 'ascwo-manages-fonts', $all_fonts );

		if ( $update ) {
			return rest_ensure_response(
				array(
					'success' => true,
					'message' => __( 'Font created with success', 'all-signs-customizer-for-woocommerce-pro' ),
				)
			);
		}

		return rest_ensure_response(
			array(
				'success' => false,
				'message' => __( 'Registration failed', 'all-signs-customizer-for-woocommerce-pro' ),
			)
		);
	}

	/**
	 * Get all fonts.
	 *
	 * @param \WP_REST_Request $request Full details about the request.
	 * @return \WP_REST_Response|WP_Error
	 */
	public function get_manage_fonts( $request ) {
		$all_fonts = $this->get_fonts_collection();

		if ( ! empty( $all_fonts ) ) {
			return rest_ensure_response( $all_fonts );
		}

		return rest_ensure_response(
			array(
				'message' => __( 'No Fonts Found', 'all-signs-customizer-for-woocommerce-pro' ),
			)
		);
	}

	/**
	 * Get font info from id.
	 *
	 * @param \WP_REST_Request $request Full details about the request.
	 * @return \WP_REST_Response|WP_Error
	 */
	public function get_manage_font( $request ) {
		$font_id   = (int) $request->get_param( 'font_id' );
		$all_fonts = $this->get_fonts_collection();

		if ( isset( $all_fonts[ $font_id ] ) ) {
			return rest_ensure_response( $all_fonts[ $font_id ] );
		}

		return rest_ensure_response(
			array(
				'success' => false,
				'message' => __( 'Font not found', 'all-signs-customizer-for-woocommerce-pro' ),
			)
		);
	}

	/**
	 * Update a font by ID.
	 *
	 * @param \WP_REST_Request $request Full details about the request.
	 * @return \WP_REST_Response|WP_Error
	 */
	public function update_font( $request ) {
		$font      = $request->get_json_params();
		$font      = is_array( $font ) ? $font : array();
		$font_id   = (int) $request->get_param( 'font_id' );
		$all_fonts = $this->get_fonts_collection();

		if ( ! isset( $all_fonts[ $font_id ] ) ) {
			return rest_ensure_response(
				array(
					'success' => false,
					'message' => __( 'Font not found', 'all-signs-customizer-for-woocommerce-pro' ),
				)
			);
		}

		if ( $all_fonts[ $font_id ] === $font ) {
			return rest_ensure_response(
				array(
					'success' => 'same',
					'message' => __( 'No change observed in font', 'all-signs-customizer-for-woocommerce-pro' ),
				)
			);
		}

		$all_fonts[ $font_id ] = $font;
		$update                = update_option( 'ascwo-manages-fonts', $all_fonts );

		if ( $update ) {
			return rest_ensure_response(
				array(
					'success' => true,
					'message' => __( 'The font has been updated with success', 'all-signs-customizer-for-woocommerce-pro' ),
				)
			);
		}

		return rest_ensure_response(
			array(
				'success' => false,
				'message' => __( 'Font update failed', 'all-signs-customizer-for-woocommerce-pro' ),
			)
		);
	}

	/**
	 * Remove a font from the managed collection.
	 *
	 * @param \WP_REST_Request $request Full details about the request.
	 * @return \WP_REST_Response|WP_Error
	 */
	public function delete_manage_fonts_config( $request ) {
		$font_id   = (int) $request->get_param( 'font_id' );
		$all_fonts = $this->get_fonts_collection();

		if ( ! isset( $all_fonts[ $font_id ] ) ) {
			return rest_ensure_response(
				array(
					'success' => false,
					'message' => __( 'Font not found', 'all-signs-customizer-for-woocommerce-pro' ),
				)
			);
		}

		array_splice( $all_fonts, $font_id, 1 );
		$update = update_option( 'ascwo-manages-fonts', $all_fonts );

		if ( $update ) {
			return rest_ensure_response(
				array(
					'success' => true,
					'message' => __( 'The font was well removed', 'all-signs-customizer-for-woocommerce-pro' ),
				)
			);
		}

		return rest_ensure_response(
			array(
				'success' => false,
				'message' => __( 'Deleting the font failed', 'all-signs-customizer-for-woocommerce-pro' ),
			)
		);
	}

	/**
	 * Checks if a given request has access to read the items.
	 *
	 * @param \WP_REST_Request $request Full details about the request.
	 * @return true|WP_Error
	 */
	public function get_config_permissions_check( $request ) {
		return current_user_can( 'manage_options' );
	}

	/**
	 * Retrieves the query params for the items collection.
	 *
	 * @return array
	 */
	public function get_collection_params() {
		return array();
	}
}
