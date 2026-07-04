<?php
/**
 * REST controller for language image settings.
 *
 * @package ASCWO
 */

namespace ASCWO\Api\Admin\Settings;

use WP_Error;
use WP_Post;
use WP_REST_Controller;

/**
 * REST controller for language image settings.
 */
class ASCWO_Api_Language_Images_Settings extends WP_REST_Controller
{

	/**
	 * Constructor.
	 */
	public function __construct()
	{
		$this->namespace = 'ascwo/v1';
		$this->rest_base = 'configs/(?P<config_id>\d+)/settings/language-images';
	}

	/**
	 * Get normalized meta.
	 *
	 * @param int $config_id Config post ID.
	 * @return array
	 */
	private function get_normalized_meta($config_id)
	{
		$meta = get_post_meta((int) $config_id, 'ascwo-configs-meta', true);
		$meta = is_array($meta) ? $meta : array();
		$meta['data'] = isset($meta['data']) && is_array($meta['data']) ? $meta['data'] : array();
		$meta['settings'] = isset($meta['settings']) && is_array($meta['settings']) ? $meta['settings'] : array();
		if (isset($meta['data']['settings']) && is_array($meta['data']['settings'])) {
			$meta['settings'] = $meta['data']['settings'];
		}
		if (!isset($meta['data']['settings']) || !is_array($meta['data']['settings'])) {
			$meta['data']['settings'] = $meta['settings'];
		}

		return $meta;
	}

	/**
	 * Get language images from meta.
	 *
	 * @param array $meta Config meta.
	 * @return array
	 */
	private function get_language_images_from_meta(array $meta)
	{
		return isset($meta['settings']['languageImages']) && is_array($meta['settings']['languageImages']) ? $meta['settings']['languageImages'] : array();
	}

	/**
	 * Save a language images section.
	 *
	 * @param int    $config_id       Config post ID.
	 * @param string $section         Section key.
	 * @param array  $section_options Section options.
	 * @return bool|string
	 */
	private function save_language_images_section($config_id, $section, array $section_options)
	{
		$meta = $this->get_normalized_meta($config_id);

		if (!isset($meta['settings']) || !is_array($meta['settings'])) {
			$meta['settings'] = array();
		}

		if (!isset($meta['settings']['languageImages']) || !is_array($meta['settings']['languageImages'])) {
			$meta['settings']['languageImages'] = array();
		}

		if (isset($meta['settings']['languageImages'][$section]) && $meta['settings']['languageImages'][$section] === $section_options) {
			return 'same';
		}

		$meta['settings']['languageImages'][$section] = $section_options;
		if (!isset($meta['data']) || !is_array($meta['data'])) {
			$meta['data'] = array();
		}
		if (!isset($meta['data']['settings']) || !is_array($meta['data']['settings'])) {
			$meta['data']['settings'] = array();
		}
		if (!isset($meta['data']['settings']['languageImages']) || !is_array($meta['data']['settings']['languageImages'])) {
			$meta['data']['settings']['languageImages'] = array();
		}
		$meta['data']['settings']['languageImages'][$section] = $section_options;
		unset($meta['settings']);

		return update_post_meta((int) $config_id, 'ascwo-configs-meta', $meta);
	}

	/**
	 * Register the routes.
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
					'callback' => array($this, 'get_language_images_settings'),
					'permission_callback' => array($this, 'get_permissions_check'),
					'args' => array(
						'config_id' => array(
							'type' => 'integer',
							'required' => true,
						),
					),
				),
			)
		);

		register_rest_route(
			$this->namespace,
			'/' . $this->rest_base . '/main',
			array(
				array(
					'methods' => \WP_REST_Server::EDITABLE,
					'callback' => array($this, 'update_main_options_language_images_settings'),
					'permission_callback' => array($this, 'get_permissions_check'),
					'args' => array(
						'config_id' => array(
							'type' => 'integer',
							'required' => true,
						),
					),
				),
			)
		);

		register_rest_route(
			$this->namespace,
			'/' . $this->rest_base . '/upload-design',
			array(
				array(
					'methods' => \WP_REST_Server::EDITABLE,
					'callback' => array($this, 'update_upload_design_options_language_images_settings'),
					'permission_callback' => array($this, 'get_permissions_check'),
					'args' => array(
						'config_id' => array(
							'type' => 'integer',
							'required' => true,
						),
					),
				),
			)
		);

		register_rest_route(
			$this->namespace,
			'/' . $this->rest_base . '/visualizer',
			array(
				array(
					'methods' => \WP_REST_Server::EDITABLE,
					'callback' => array($this, 'update_visualizer_options_language_images_settings'),
					'permission_callback' => array($this, 'get_permissions_check'),
					'args' => array(
						'config_id' => array(
							'type' => 'integer',
							'required' => true,
						),
					),
				),
			)
		);

		register_rest_route(
			$this->namespace,
			'/' . $this->rest_base . '/images',
			array(
				array(
					'methods' => \WP_REST_Server::EDITABLE,
					'callback' => array($this, 'update_image_language_images_settings'),
					'permission_callback' => array($this, 'get_permissions_check'),
					'args' => array(
						'config_id' => array(
							'type' => 'integer',
							'required' => true,
						),
					),
				),
			)
		);
	}

	/**
	 * Get all language image settings.
	 *
	 * @param \WP_REST_Request $request Full details about the request.
	 * @return \WP_REST_Response|WP_Error
	 */
	public function get_language_images_settings($request)
	{
		$post = get_post((int) $request->get_param('config_id'));
		if (!$post instanceof WP_Post) {
			return rest_ensure_response(
				array(
					'message' => __('Custom ID invalid', 'all-signs-customizer-for-woocommerce'),
				)
			);
		}

		$meta_value = $this->get_normalized_meta((int) $post->ID);
		if (empty($meta_value)) {
			return rest_ensure_response(
				array(
					'message' => __('No Settings found', 'all-signs-customizer-for-woocommerce'),
				)
			);
		}

		$language_images = $this->get_language_images_from_meta($meta_value);
		if (!empty($language_images)) {
			return rest_ensure_response($language_images);
		}

		return rest_ensure_response(
			array(
				'message' => __('No language Images Settings found', 'all-signs-customizer-for-woocommerce'),
			)
		);
	}

	/**
	 * Update main options of language images settings.
	 *
	 * @param \WP_REST_Request $request Full details about the request.
	 * @return \WP_REST_Response|WP_Error
	 */
	public function update_main_options_language_images_settings($request)
	{
		$post = get_post((int) $request->get_param('config_id'));
		if (!$post instanceof WP_Post) {
			return rest_ensure_response(
				array(
					'success' => false,
					'message' => __('Custom ID invalid', 'all-signs-customizer-for-woocommerce'),
				)
			);
		}

		$main_options = $request->get_json_params();
		$main_options = is_array($main_options) ? $main_options : array();
		$response = $this->save_language_images_section((int) $post->ID, 'main', $main_options);

		if ('same' === $response) {
			return rest_ensure_response(
				array(
					'success' => 'same',
					'message' => __('No change observed in main options in language images settings failed', 'all-signs-customizer-for-woocommerce'),
				)
			);
		}

		if ($response) {
			return rest_ensure_response(
				array(
					'success' => true,
					'message' => __('Main options in language images settings updated successfully', 'all-signs-customizer-for-woocommerce'),
				)
			);
		}

		return rest_ensure_response(
			array(
				'success' => false,
				'message' => __('Update main options in language images settings failed', 'all-signs-customizer-for-woocommerce'),
			)
		);
	}

	/**
	 * Update upload design options of language images settings.
	 *
	 * @param \WP_REST_Request $request Full details about the request.
	 * @return \WP_REST_Response|WP_Error
	 */
	public function update_upload_design_options_language_images_settings($request)
	{
		$post = get_post((int) $request->get_param('config_id'));
		if (!$post instanceof WP_Post) {
			return rest_ensure_response(
				array(
					'success' => false,
					'message' => __('Custom ID invalid', 'all-signs-customizer-for-woocommerce'),
				)
			);
		}

		$customizer_options = $request->get_json_params();
		$customizer_options = is_array($customizer_options) ? $customizer_options : array();
		$response = $this->save_language_images_section((int) $post->ID, 'uploadDesign', $customizer_options);

		if ('same' === $response) {
			return rest_ensure_response(
				array(
					'success' => 'same',
					'message' => __('No change observed in customizer design options in language images settings', 'all-signs-customizer-for-woocommerce'),
				)
			);
		}

		if ($response) {
			return rest_ensure_response(
				array(
					'success' => true,
					'message' => __('Customizer design options in language images settings updated successfully', 'all-signs-customizer-for-woocommerce'),
				)
			);
		}

		return rest_ensure_response(
			array(
				'success' => false,
				'message' => __('Update customizer design options in language images settings failed', 'all-signs-customizer-for-woocommerce'),
			)
		);
	}

	/**
	 * Update visualizer options of language images settings.
	 *
	 * @param \WP_REST_Request $request Full details about the request.
	 * @return \WP_REST_Response|WP_Error
	 */
	public function update_visualizer_options_language_images_settings($request)
	{
		$post = get_post((int) $request->get_param('config_id'));
		if (!$post instanceof WP_Post) {
			return rest_ensure_response(
				array(
					'success' => false,
					'message' => __('Custom ID invalid', 'all-signs-customizer-for-woocommerce'),
				)
			);
		}

		$visualizer_options = $request->get_json_params();
		$visualizer_options = is_array($visualizer_options) ? $visualizer_options : array();
		$response = $this->save_language_images_section((int) $post->ID, 'visualizer', $visualizer_options);

		if ('same' === $response) {
			return rest_ensure_response(
				array(
					'success' => 'same',
					'message' => __('No change observed in visualizer options in language images', 'all-signs-customizer-for-woocommerce'),
				)
			);
		}

		if ($response) {
			return rest_ensure_response(
				array(
					'success' => true,
					'message' => __('Visualizer options in language images settings updated successfully', 'all-signs-customizer-for-woocommerce'),
				)
			);
		}

		return rest_ensure_response(
			array(
				'success' => false,
				'message' => __('Update visualizer options in language images settings failed', 'all-signs-customizer-for-woocommerce'),
			)
		);
	}

	/**
	 * Update images options of language images settings.
	 *
	 * @param \WP_REST_Request $request Full details about the request.
	 * @return \WP_REST_Response|WP_Error
	 */
	public function update_image_language_images_settings($request)
	{
		$post = get_post((int) $request->get_param('config_id'));
		if (!$post instanceof WP_Post) {
			return rest_ensure_response(
				array(
					'success' => false,
					'message' => __('Custom ID invalid', 'all-signs-customizer-for-woocommerce'),
				)
			);
		}

		$image_options = $request->get_json_params();
		$image_options = is_array($image_options) ? $image_options : array();
		$response = $this->save_language_images_section((int) $post->ID, 'images', $image_options);

		if ('same' === $response) {
			return rest_ensure_response(
				array(
					'success' => 'same',
					'message' => __('No change observed in images options in language images settings', 'all-signs-customizer-for-woocommerce'),
				)
			);
		}

		if ($response) {
			return rest_ensure_response(
				array(
					'success' => true,
					'message' => __('Images options in language images settings updated successfully', 'all-signs-customizer-for-woocommerce'),
				)
			);
		}

		return rest_ensure_response(
			array(
				'success' => false,
				'message' => __('Update images options in language images settings failed', 'all-signs-customizer-for-woocommerce'),
			)
		);
	}

	/**
	 * Permission check.
	 *
	 * @param \WP_REST_Request $request Request object.
	 * @return bool
	 */
	public function get_permissions_check($request)
	{
		return current_user_can('manage_options');
	}
}
