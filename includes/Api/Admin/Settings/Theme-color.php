<?php
/**
 * REST controller for theme color settings.
 *
 * @package ASCWO
 */

namespace ASCWO\Api\Admin\Settings;

use WP_Error;
use WP_Post;
use WP_REST_Controller;

/**
 * REST controller for theme color settings.
 */
class ASCWO_Api_Theme_color_Settings extends WP_REST_Controller {

	/**
	 * Constructor.
	 */
	public function __construct() {
		$this->namespace = 'ascwo/v1';
		$this->rest_base = 'configs/(?P<config_id>\d+)/settings/theme-colors';
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
		$meta['data'] = isset( $meta['data'] ) && is_array( $meta['data'] ) ? $meta['data'] : array();
		$meta['settings'] = isset( $meta['settings'] ) && is_array( $meta['settings'] ) ? $meta['settings'] : array();
		if ( isset( $meta['data']['settings'] ) && is_array( $meta['data']['settings'] ) ) {
			$meta['settings'] = $meta['data']['settings'];
		}
		if ( ! isset( $meta['data']['settings'] ) || ! is_array( $meta['data']['settings'] ) ) {
			$meta['data']['settings'] = $meta['settings'];
		}

		return $meta;
	}

	/**
	 * Get theme colors from meta.
	 *
	 * @param array $meta Config meta.
	 * @return array
	 */
	private function get_theme_colors_from_meta( array $meta ) {
		return isset( $meta['settings']['themeColors'] ) && is_array( $meta['settings']['themeColors'] ) ? $meta['settings']['themeColors'] : array();
	}

	/**
	 * Save theme colors.
	 *
	 * @param int   $config_id    Config post ID.
	 * @param array $theme_colors Theme colors.
	 * @return bool|string
	 */
	private function save_theme_colors( $config_id, array $theme_colors ) {
		$meta = $this->get_normalized_meta( $config_id );

		if ( ! isset( $meta['settings'] ) || ! is_array( $meta['settings'] ) ) {
			$meta['settings'] = array();
		}

		$current_theme_colors = $this->get_theme_colors_from_meta( $meta );
		if ( $current_theme_colors === $theme_colors ) {
			return 'same';
		}

		$meta['settings']['themeColors'] = $theme_colors;
		if ( ! isset( $meta['data'] ) || ! is_array( $meta['data'] ) ) {
			$meta['data'] = array();
		}
		if ( ! isset( $meta['data']['settings'] ) || ! is_array( $meta['data']['settings'] ) ) {
			$meta['data']['settings'] = array();
		}
		$meta['data']['settings']['themeColors'] = $theme_colors;

		return update_post_meta( (int) $config_id, 'ascwo-configs-meta', $meta );
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
					'methods'             => \WP_REST_Server::READABLE,
					'callback'            => array( $this, 'get_theme_color_settings' ),
					'permission_callback' => array( $this, 'get_permissions_check' ),
					'args'                => array(
						'config_id' => array(
							'type'     => 'integer',
							'required' => true,
						),
					),
				),
				array(
					'methods'             => \WP_REST_Server::EDITABLE,
					'callback'            => array( $this, 'update_theme_color_settings' ),
					'permission_callback' => array( $this, 'get_permissions_check' ),
					'args'                => array(
						'config_id' => array(
							'type'     => 'integer',
							'required' => true,
						),
					),
				),
			)
		);
	}

	/**
	 * Get theme color settings.
	 *
	 * @param \WP_REST_Request $request Full details about the request.
	 * @return \WP_REST_Response|WP_Error
	 */
	public function get_theme_color_settings( $request ) {
		$post = get_post( (int) $request->get_param( 'config_id' ) );
		if ( ! $post instanceof WP_Post ) {
			return rest_ensure_response(
				array(
					'message' => __( 'Theme color ID invalid', 'all-signs-customizer-for-woocommerce-pro' ),
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

		$theme_colors = $this->get_theme_colors_from_meta( $meta_value );
		if ( ! empty( $theme_colors ) ) {
			return rest_ensure_response( $theme_colors );
		}

		return rest_ensure_response(
			array(
				'message' => __( 'No theme color settings found', 'all-signs-customizer-for-woocommerce-pro' ),
			)
		);
	}

	/**
	 * Update theme color settings.
	 *
	 * @param \WP_REST_Request $request Full details about the request.
	 * @return \WP_REST_Response|WP_Error
	 */
	public function update_theme_color_settings( $request ) {
		$post = get_post( (int) $request->get_param( 'config_id' ) );
		if ( ! $post instanceof WP_Post ) {
			return rest_ensure_response(
				array(
					'success' => false,
					'message' => __( 'Theme color ID invalid', 'all-signs-customizer-for-woocommerce-pro' ),
				)
			);
		}

		$theme_colors = $request->get_json_params();
		$theme_colors = is_array( $theme_colors ) ? $theme_colors : array();
		$response     = $this->save_theme_colors( (int) $post->ID, $theme_colors );

		if ( 'same' === $response ) {
			return rest_ensure_response(
				array(
					'success' => 'same',
					'message' => __( 'No change observed in theme colors', 'all-signs-customizer-for-woocommerce-pro' ),
				)
			);
		}

		if ( $response ) {
			return rest_ensure_response(
				array(
					'success' => true,
					'message' => __( 'Theme colors updated successfully', 'all-signs-customizer-for-woocommerce-pro' ),
				)
			);
		}

		return rest_ensure_response(
			array(
				'success' => false,
				'message' => __( 'Update theme colors failed', 'all-signs-customizer-for-woocommerce-pro' ),
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
