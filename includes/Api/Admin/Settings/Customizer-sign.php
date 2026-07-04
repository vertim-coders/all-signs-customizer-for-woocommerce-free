<?php
/**
 * REST controller for customizer sign settings.
 *
 * @package ASCWO
 */

namespace ASCWO\Api\Admin\Settings;

use WP_Post;
use WP_REST_Controller;

/**
 * REST controller for customizer sign settings.
 */
class ASCWO_Api_Customizer_Sign_Settings extends WP_REST_Controller
{

	/**
	 * Constructor.
	 */
	public function __construct()
	{
		$this->namespace = 'ascwo/v1';
		$this->rest_base = 'configs/(?P<config_id>\d+)/settings/customizer-signs';
	}

	/**
	 * Get the stored meta for a config post.
	 *
	 * @param int $config_id Config post ID.
	 * @return array
	 */
	private function get_normalized_meta($config_id)
	{
		$meta = get_post_meta((int) $config_id, 'ascwo-configs-meta', true);
		$meta = is_array($meta) ? $meta : array();
		$meta['data'] = isset($meta['data']) && is_array($meta['data']) ? $meta['data'] : array();

		if (!isset($meta['settings']) || !is_array($meta['settings'])) {
			$meta['settings'] = array();
		}

		if (isset($meta['data']['settings']) && is_array($meta['data']['settings'])) {
			$meta['settings'] = $meta['data']['settings'];
		}

		if (!isset($meta['data']['settings']) || !is_array($meta['data']['settings'])) {
			$meta['data']['settings'] = $meta['settings'];
		}

		return $meta;
	}

	/**
	 * Get the customizer sign section from meta.
	 *
	 * @param array $meta Config meta.
	 * @return array
	 */
	private function get_customizer_sign_from_meta(array $meta)
	{
		if (isset($meta['settings']['customizerSign']) && is_array($meta['settings']['customizerSign'])) {
			return $meta['settings']['customizerSign'];
		}

		if (isset($meta['data']['settings']['customizerSign']) && is_array($meta['data']['settings']['customizerSign'])) {
			return $meta['data']['settings']['customizerSign'];
		}

		return array();
	}

	/**
	 * Persist a customizer sign subsection in both the root and data payloads.
	 *
	 * @param int    $config_id       Config post ID.
	 * @param string $section         Section key.
	 * @param array  $section_options Section data.
	 * @return bool|string
	 */
	private function save_customizer_sign_section($config_id, $section, array $section_options)
	{
		$meta = $this->get_normalized_meta((int) $config_id);

		if (!isset($meta['settings']) || !is_array($meta['settings'])) {
			$meta['settings'] = array();
		}

		if (!isset($meta['settings']['customizerSign']) || !is_array($meta['settings']['customizerSign'])) {
			$meta['settings']['customizerSign'] = array();
		}

		if (!isset($meta['data']) || !is_array($meta['data'])) {
			$meta['data'] = array();
		}

		if (!isset($meta['data']['settings']) || !is_array($meta['data']['settings'])) {
			$meta['data']['settings'] = array();
		}

		if (!isset($meta['data']['settings']['customizerSign']) || !is_array($meta['data']['settings']['customizerSign'])) {
			$meta['data']['settings']['customizerSign'] = array();
		}

		if (
			isset($meta['settings']['customizerSign'][$section])
			&& $meta['settings']['customizerSign'][$section] === $section_options
			&& isset($meta['data']['settings']['customizerSign'][$section])
			&& $meta['data']['settings']['customizerSign'][$section] === $section_options
		) {
			return 'same';
		}

		$meta['settings']['customizerSign'][$section] = $section_options;
		$meta['data']['settings']['customizerSign'][$section] = $section_options;
		unset($meta['settings']);

		return update_post_meta((int) $config_id, 'ascwo-configs-meta', $meta);
	}

	/**
	 * Get a config post if it exists.
	 *
	 * @param int $config_id Config post ID.
	 * @return WP_Post|false
	 */
	private function get_config_post($config_id)
	{
		$config_id = (int) $config_id;

		if (0 === $config_id) {
			return false;
		}

		$post = get_post($config_id);

		return $post instanceof WP_Post ? $post : false;
	}

	/**
	 * Get JSON request body as array.
	 *
	 * @param \WP_REST_Request $request Full details about the request.
	 * @return array
	 */
	private function get_request_data($request)
	{
		$data = $request->get_json_params();

		return is_array($data) ? $data : array();
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
					'callback' => array($this, 'get_customizer_sign_settings'),
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
			'/' . $this->rest_base . "/customizer",
			array(
				array(
					'methods' => \WP_REST_Server::EDITABLE,
					'callback' => array($this, 'update_customizer_options_customizer_sign_settings'),
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
			'/' . $this->rest_base . "/config-options",
			array(
				array(
					'methods' => \WP_REST_Server::EDITABLE,
					'callback' => array($this, 'update_config_options_customizer_sign_settings'),
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
			'/' . $this->rest_base . "/sign-part",
			array(
				array(
					'methods' => \WP_REST_Server::EDITABLE,
					'callback' => array($this, 'update_sign_part_customizer_sign_settings'),
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
			'/' . $this->rest_base . "/text",
			array(
				array(
					'methods' => \WP_REST_Server::EDITABLE,
					'callback' => array($this, 'update_text_option_customizer_sign_settings'),
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
			'/' . $this->rest_base . "/images",
			array(
				array(
					'methods' => \WP_REST_Server::EDITABLE,
					'callback' => array($this, 'updates_image_customizer_sign_settings'),
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
	}
	/**
	 * Get all customizer sign settings.
	 *
	 * @param \WP_REST_Request $request Full details about the request.
	 * @return \WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
	 */
	public function get_customizer_sign_settings($request)
	{
		$id = (int) $request->get_param('config_id');
		$post = $this->get_config_post($id);

		if (false === $post) {
			return rest_ensure_response(
				array(
					'success' => false,
					'message' => __('Customizer ID invalid', 'all-signs-customizer-for-woocommerce'),
				)
			);
		}

		$meta_value = $this->get_normalized_meta($id);

		if (empty($meta_value)) {
			return rest_ensure_response(
				array(
					'success' => false,
					'message' => __('No Settings found', 'all-signs-customizer-for-woocommerce'),
				)
			);
		}

		$customizer_sign = $this->get_customizer_sign_from_meta($meta_value);

		if (!empty($customizer_sign)) {
			return rest_ensure_response($customizer_sign);
		}

		return rest_ensure_response(
			array(
				'success' => false,
				'message' => __('No Customizer Sign Settings found', 'all-signs-customizer-for-woocommerce'),
			)
		);
	}

	/**
	 * Update customizer options of customizer sign settings.
	 *
	 * @param \WP_REST_Request $request Full details about the request.
	 * @return \WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
	 */
	public function update_customizer_options_customizer_sign_settings($request)
	{
		$id = (int) $request->get_param('config_id');
		$customizer_options = $this->get_request_data($request);
		$post = $this->get_config_post($id);

		if (false === $post) {
			return rest_ensure_response(
				array(
					'success' => false,
					'message' => __('Custom ID invalid', 'all-signs-customizer-for-woocommerce'),
				)
			);
		}

		$response = $this->save_customizer_sign_section($id, 'customizerOptions', $customizer_options);

		if ('same' === $response) {
			return rest_ensure_response(
				array(
					'success' => 'same',
					'message' => __('No change observed in customizer options in customizer sign settings', 'all-signs-customizer-for-woocommerce'),
				)
			);
		}

		if ($response) {
			return rest_ensure_response(
				array(
					'success' => true,
					'message' => __('Customizer in customizer sign settings updated successfully', 'all-signs-customizer-for-woocommerce'),
				)
			);
		}

		return rest_ensure_response(
			array(
				'success' => false,
				'message' => __('Update customizer in customizer sign settings failed', 'all-signs-customizer-for-woocommerce'),
			)
		);
	}

	/**
	 * Update config options order and visibility of customizer sign settings.
	 *
	 * @param \WP_REST_Request $request Full details about the request.
	 * @return \WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
	 */
	public function update_config_options_customizer_sign_settings($request)
	{
		$id = (int) $request->get_param('config_id');
		$config_options = $this->get_request_data($request);
		$post = $this->get_config_post($id);

		if (false === $post) {
			return rest_ensure_response(
				array(
					'success' => false,
					'message' => __('Custom ID invalid', 'all-signs-customizer-for-woocommerce'),
				)
			);
		}

		$response = $this->save_customizer_sign_section($id, 'configOptions', $config_options);

		if ('same' === $response) {
			return rest_ensure_response(
				array(
					'success' => 'same',
					'message' => __('No change observed in config options in customizer sign settings', 'all-signs-customizer-for-woocommerce'),
				)
			);
		}

		if ($response) {
			return rest_ensure_response(
				array(
					'success' => true,
					'message' => __('Config options in customizer sign settings updated successfully', 'all-signs-customizer-for-woocommerce'),
				)
			);
		}

		return rest_ensure_response(
			array(
				'success' => false,
				'message' => __('Update config options in customizer sign settings failed', 'all-signs-customizer-for-woocommerce'),
			)
		);
	}

	/**
	 * Update sign part options of customizer sign settings.
	 *
	 * @param \WP_REST_Request $request Full details about the request.
	 * @return \WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
	 */
	public function update_sign_part_customizer_sign_settings($request)
	{
		$id = (int) $request->get_param('config_id');
		$sign_options = $this->get_request_data($request);
		$post = $this->get_config_post($id);

		if (false === $post) {
			return rest_ensure_response(
				array(
					'success' => false,
					'message' => __('Custom ID invalid', 'all-signs-customizer-for-woocommerce'),
				)
			);
		}

		$response = $this->save_customizer_sign_section($id, 'signPart', $sign_options);

		if ('same' === $response) {
			return rest_ensure_response(
				array(
					'success' => 'same',
					'message' => __('No change observed in sign part in customizer sign settings', 'all-signs-customizer-for-woocommerce'),
				)
			);
		}

		if ($response) {
			return rest_ensure_response(
				array(
					'success' => true,
					'message' => __('Sign part in customizer sign settings updated successfully', 'all-signs-customizer-for-woocommerce'),
				)
			);
		}

		return rest_ensure_response(
			array(
				'success' => false,
				'message' => __('Update sign part in customizer sign settings failed', 'all-signs-customizer-for-woocommerce'),
			)
		);
	}

	/**
	 * Update text options of customizer sign settings.
	 *
	 * @param \WP_REST_Request $request Full details about the request.
	 * @return \WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
	 */
	public function update_text_option_customizer_sign_settings($request)
	{
		$id = (int) $request->get_param('config_id');
		$text_options = $this->get_request_data($request);
		$post = $this->get_config_post($id);

		if (false === $post) {
			return rest_ensure_response(
				array(
					'success' => false,
					'message' => __('Custom ID invalid', 'all-signs-customizer-for-woocommerce'),
				)
			);
		}

		$response = $this->save_customizer_sign_section($id, 'text', $text_options);

		if ('same' === $response) {
			return rest_ensure_response(
				array(
					'success' => 'same',
					'message' => __('No change observed in text in customizer sign settings', 'all-signs-customizer-for-woocommerce'),
				)
			);
		}

		if ($response) {
			return rest_ensure_response(
				array(
					'success' => true,
					'message' => __('Text in customizer sign settings updated successfully', 'all-signs-customizer-for-woocommerce'),
				)
			);
		}

		return rest_ensure_response(
			array(
				'success' => false,
				'message' => __('Update text in customizer sign settings failed', 'all-signs-customizer-for-woocommerce'),
			)
		);
	}

	/**
	 * Update image options of customizer sign settings.
	 *
	 * @param \WP_REST_Request $request Full details about the request.
	 * @return \WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
	 */
	public function updates_image_customizer_sign_settings($request)
	{
		$id = (int) $request->get_param('config_id');
		$image_options = $this->get_request_data($request);
		$post = $this->get_config_post($id);

		if (false === $post) {
			return rest_ensure_response(
				array(
					'success' => false,
					'message' => __('Custom ID invalid', 'all-signs-customizer-for-woocommerce'),
				)
			);
		}

		$response = $this->save_customizer_sign_section($id, 'images', $image_options);

		if ('same' === $response) {
			return rest_ensure_response(
				array(
					'success' => 'same',
					'message' => __('No change observed in image in customizer sign settings', 'all-signs-customizer-for-woocommerce'),
				)
			);
		}

		if ($response) {
			return rest_ensure_response(
				array(
					'success' => true,
					'message' => __('Image in customizer sign settings updated successfully', 'all-signs-customizer-for-woocommerce'),
				)
			);
		}

		return rest_ensure_response(
			array(
				'success' => false,
				'message' => __('Update image in customizer sign settings failed', 'all-signs-customizer-for-woocommerce'),
			)
		);
	}

	/**
	 * Checks if a given request has access to read the materials.
	 *
	 * @param \WP_REST_Request $request Full details about the request.
	 * @return true|WP_Error True if the request has read access, WP_Error object otherwise.
	 */
	public function get_permissions_check($request)
	{
		return true;
	}
}
