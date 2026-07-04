<?php
/**
 * REST controller for managed cliparts.
 *
 * @package ASCWO
 */

namespace ASCWO\Api\Admin;

use WP_Error;
use WP_REST_Controller;

/**
 * REST controller for managed cliparts.
 */
class ASCWO_Api_Manage_cliparts extends WP_REST_Controller
{

	/**
	 * Constructor.
	 */
	public function __construct()
	{
		$this->namespace = 'ascwo/v1';
		$this->rest_base = 'manage-cliparts';
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
					'callback' => array($this, 'get_manage_cliparts_configs'),
					'permission_callback' => array($this, 'get_config_permissions_check'),
				),
				array(
					'methods' => \WP_REST_Server::CREATABLE,
					'callback' => array($this, 'create_manage_cliparts_group'),
					'permission_callback' => array($this, 'get_config_permissions_check'),
				),
			)
		);
		register_rest_route(
			$this->namespace,
			'/' . $this->rest_base . '/(?P<group_id>\d+)',
			array(
				array(
					'methods' => \WP_REST_Server::READABLE,
					'callback' => array($this, 'get_manage_cliparts_groups'),
					'permission_callback' => array($this, 'get_config_permissions_check'),
					'args' => array(
						'group_id' => array(
							'type' => 'integer',
							'required' => true,
						)
					),
				),
				array(
					'methods' => \WP_REST_Server::EDITABLE,
					'callback' => array($this, 'update_manage_cliparts_group'),
					'permission_callback' => array($this, 'get_config_permissions_check'),
					'args' => array(
						'group_id' => array(
							'type' => 'integer',
							'required' => true,
						)
					),
				),
				array(
					'methods' => \WP_REST_Server::DELETABLE,
					'callback' => array($this, 'delete_manage_cliparts_group'),
					'permission_callback' => array($this, 'get_config_permissions_check'),
					'args' => array(
						'group_id' => array(
							'type' => 'integer',
							'required' => true,
						)
					),
				)
			)
		);
		register_rest_route(
			$this->namespace,
			'/' . $this->rest_base . '/(?P<group_id>\d+)/items',
			array(
				array(
					'methods' => \WP_REST_Server::READABLE,
					'callback' => array($this, 'get_manage_cliparts_group_cliparts'),
					'permission_callback' => array($this, 'get_config_permissions_check'),
					'args' => array(
						'group_id' => array(
							'type' => 'integer',
							'required' => true,
						)
					),
				),
				array(
					'methods' => \WP_REST_Server::CREATABLE,
					'callback' => array($this, 'create_manage_cliparts_item'),
					'permission_callback' => array($this, 'get_config_permissions_check'),
					'args' => array(
						'group_id' => array(
							'type' => 'integer',
							'required' => true,
						)
					),
				)
			)
		);
		register_rest_route(
			$this->namespace,
			'/' . $this->rest_base . '/(?P<group_id>\d+)/items/(?P<clipart_id>\d+)',
			array(
				array(
					'methods' => \WP_REST_Server::READABLE,
					'callback' => array($this, 'get_manage_cliparts_item'),
					'permission_callback' => array($this, 'get_config_permissions_check'),
					'args' => array(
						'group_id' => array(
							'type' => 'integer',
							'required' => true,
						),
						'clipart_id' => array(
							'type' => 'integer',
							'required' => true,
						)
					),
				),
				array(
					'methods' => \WP_REST_Server::EDITABLE,
					'callback' => array($this, 'update_manage_cliparts_item'),
					'permission_callback' => array($this, 'get_config_permissions_check'),
					'args' => array(
						'group_id' => array(
							'type' => 'integer',
							'required' => true,
						),
						'clipart_id' => array(
							'type' => 'integer',
							'required' => true,
						)
					),
				),
				array(
					'methods' => \WP_REST_Server::DELETABLE,
					'callback' => array($this, 'delete_manage_cliparts_item'),
					'permission_callback' => array($this, 'get_config_permissions_check'),
					'args' => array(
						'group_id' => array(
							'type' => 'integer',
							'required' => true,
						),
						'clipart_id' => array(
							'type' => 'integer',
							'required' => true,
						)
					),
				)
			)
		);
	}
	/**
	 * Get the stored cliparts collection.
	 *
	 * @return array
	 */
	private function get_cliparts_collection()
	{
		$all_groups = get_option('ascwo-manages-cliparts', array());

		return is_array($all_groups) ? array_values($all_groups) : array();
	}

	/**
	 * Create aso cliparts groups.
	 *
	 * @param \WP_REST_Request $request Full details about the request.
	 * @return \WP_REST_Response|WP_Error
	 */
	public function create_manage_cliparts_group($request)
	{
		$all_groups = $this->get_cliparts_collection();
		$req_data = $request->get_json_params();
		$req_data = is_array($req_data) ? $req_data : array();

		$cliparts_group = array(
			'title' => isset($req_data['title']) ? sanitize_text_field(wp_unslash($req_data['title'])) : '',
			'description' => isset($req_data['description']) ? sanitize_textarea_field(wp_unslash($req_data['description'])) : '',
			'cliparts' => array(),
		);

		$all_groups[] = $cliparts_group;
		$update = update_option('ascwo-manages-cliparts', $all_groups);

		if ($update) {
			return rest_ensure_response(
				array(
					'success' => true,
					'message' => __('Cliparts group created with success', 'all-signs-customizer-for-woocommerce'),
				)
			);
		}

		return rest_ensure_response(
			array(
				'success' => false,
				'message' => __('Registration failed', 'all-signs-customizer-for-woocommerce'),
			)
		);
	}

	/**
	 * Get clipart group info for the given group ID.
	 *
	 * @param \WP_REST_Request $request Full details about the request.
	 * @return \WP_REST_Response|WP_Error
	 */
	public function get_manage_cliparts_groups($request)
	{
		$id = (int) $request->get_param('group_id');
		$all_groups = $this->get_cliparts_collection();

		if (isset($all_groups[$id])) {
			return rest_ensure_response($all_groups[$id]);
		}

		return rest_ensure_response(
			array(
				'message' => __('Not Cliparts data found', 'all-signs-customizer-for-woocommerce'),
			)
		);
	}

	/**
	 * Update a cliparts group.
	 *
	 * @param \WP_REST_Request $request Full details about the request.
	 * @return \WP_REST_Response|WP_Error
	 */
	public function update_manage_cliparts_group($request)
	{
		$id = (int) $request->get_param('group_id');
		$all_groups = $this->get_cliparts_collection();
		$req_data = $request->get_json_params();
		$req_data = is_array($req_data) ? $req_data : array();

		if (!isset($all_groups[$id])) {
			return rest_ensure_response(
				array(
					'message' => __('Not Cliparts data found', 'all-signs-customizer-for-woocommerce'),
				)
			);
		}

		$current_title = isset($all_groups[$id]['title']) ? $all_groups[$id]['title'] : '';
		$current_description = isset($all_groups[$id]['description']) ? $all_groups[$id]['description'] : '';
		$new_title = isset($req_data['title']) ? sanitize_text_field(wp_unslash($req_data['title'])) : '';
		$new_description = isset($req_data['description']) ? sanitize_textarea_field(wp_unslash($req_data['description'])) : '';

		if ($current_title === $new_title && $current_description === $new_description) {
			return rest_ensure_response(
				array(
					'success' => 'same',
					'message' => __('No change observed in clipart group', 'all-signs-customizer-for-woocommerce'),
				)
			);
		}

		$all_groups[$id]['title'] = $new_title;
		$all_groups[$id]['description'] = $new_description;
		$update = update_option('ascwo-manages-cliparts', $all_groups);

		if ($update) {
			return rest_ensure_response(
				array(
					'success' => true,
					'message' => __('Cliparts group updated with success', 'all-signs-customizer-for-woocommerce'),
				)
			);
		}

		return rest_ensure_response(
			array(
				'success' => false,
				'message' => __('Update failed', 'all-signs-customizer-for-woocommerce'),
			)
		);
	}

	/**
	 * Remove a cliparts group by ID.
	 *
	 * @param \WP_REST_Request $request Full details about the request.
	 * @return \WP_REST_Response|WP_Error
	 */
	public function delete_manage_cliparts_group($request)
	{
		$id = (int) $request->get_param('group_id');
		$all_groups = $this->get_cliparts_collection();

		if (!isset($all_groups[$id])) {
			return rest_ensure_response(
				array(
					'message' => __('Not Cliparts data found', 'all-signs-customizer-for-woocommerce'),
				)
			);
		}

		array_splice($all_groups, $id, 1);
		$update = update_option('ascwo-manages-cliparts', $all_groups);

		if ($update) {
			return rest_ensure_response(
				array(
					'success' => true,
					'message' => __('Cliparts group deleted with success', 'all-signs-customizer-for-woocommerce'),
				)
			);
		}

		return rest_ensure_response(
			array(
				'success' => false,
				'message' => __('Delete Cliparts group failed', 'all-signs-customizer-for-woocommerce'),
			)
		);
	}

	/**
	 * Get all cliparts groups.
	 *
	 * @param \WP_REST_Request $request Full details about the request.
	 * @return \WP_REST_Response|WP_Error
	 */
	public function get_manage_cliparts_configs($request)
	{
		$all_groups = $this->get_cliparts_collection();

		return rest_ensure_response(
			array(
				'noGroupsFound' => __('No Cliparts Group Found', 'all-signs-customizer-for-woocommerce'),
				'data' => $all_groups,
			)
		);
	}

	/**
	 * Checks if a given request has access to read the items.
	 *
	 * @param \WP_REST_Request $request Full details about the request.
	 * @return true|WP_Error
	 */
	public function get_config_permissions_check($request)
	{
		return current_user_can('manage_options');
	}

	/**
	 * Create an item in cliparts group.
	 *
	 * @param \WP_REST_Request $request Full details about the request.
	 * @return \WP_REST_Response|WP_Error
	 */
	public function create_manage_cliparts_item($request)
	{
		$group_id = (int) $request->get_param('group_id');
		$all_groups = $this->get_cliparts_collection();

		if (!isset($all_groups[$group_id])) {
			return rest_ensure_response(
				array(
					'success' => false,
					'message' => __('Clipart has not been added', 'all-signs-customizer-for-woocommerce'),
				)
			);
		}

		$new_items = $request->get_json_params();
		$new_items = is_array($new_items) ? $new_items : array();

		foreach ($new_items as $item) {
			$all_groups[$group_id]['cliparts'][] = $item;
		}

		$update = update_option('ascwo-manages-cliparts', $all_groups);

		if ($update) {
			return rest_ensure_response(
				array(
					'success' => true,
					'message' => __('Cliparts added with success', 'all-signs-customizer-for-woocommerce'),
				)
			);
		}

		return rest_ensure_response(
			array(
				'success' => false,
				'message' => __('Clipart has not been added', 'all-signs-customizer-for-woocommerce'),
			)
		);
	}

	/**
	 * Get a clipart item in a cliparts group.
	 *
	 * @param \WP_REST_Request $request Full details about the request.
	 * @return \WP_REST_Response|WP_Error
	 */
	public function get_manage_cliparts_item($request)
	{
		$group_id = (int) $request->get_param('group_id');
		$clipart_id = (int) $request->get_param('clipart_id');
		$all_groups = $this->get_cliparts_collection();

		if (isset($all_groups[$group_id]['cliparts'][$clipart_id])) {
			return rest_ensure_response($all_groups[$group_id]['cliparts'][$clipart_id]);
		}

		return rest_ensure_response(
			array(
				'success' => false,
				'message' => __('Clipart has not been added', 'all-signs-customizer-for-woocommerce'),
			)
		);
	}

	/**
	 * Get all items in a cliparts group.
	 *
	 * @param \WP_REST_Request $request Full details about the request.
	 * @return \WP_REST_Response|WP_Error
	 */
	public function get_manage_cliparts_group_cliparts($request)
	{
		$group_id = (int) $request->get_param('group_id');
		$all_groups = $this->get_cliparts_collection();

		if (!isset($all_groups[$group_id])) {
			return rest_ensure_response(
				array(
					'groupTitle' => '',
					'notFoundMessage' => __('No cliparts found', 'all-signs-customizer-for-woocommerce'),
				)
			);
		}

		$cliparts = isset($all_groups[$group_id]['cliparts']) && is_array($all_groups[$group_id]['cliparts']) ? $all_groups[$group_id]['cliparts'] : array();

		if (!empty($cliparts)) {
			return rest_ensure_response(
				array(
					'groupTitle' => isset($all_groups[$group_id]['title']) ? $all_groups[$group_id]['title'] : '',
					'cliparts' => $cliparts,
				)
			);
		}

		return rest_ensure_response(
			array(
				'groupTitle' => isset($all_groups[$group_id]['title']) ? $all_groups[$group_id]['title'] : '',
				'notFoundMessage' => __('No cliparts found', 'all-signs-customizer-for-woocommerce'),
			)
		);
	}

	/**
	 * Update a clipart item.
	 *
	 * @param \WP_REST_Request $request Full details about the request.
	 * @return \WP_REST_Response|WP_Error
	 */
	public function update_manage_cliparts_item($request)
	{
		$group_id = (int) $request->get_param('group_id');
		$clipart_id = (int) $request->get_param('clipart_id');
		$all_groups = $this->get_cliparts_collection();

		if (!isset($all_groups[$group_id]['cliparts'][$clipart_id])) {
			return rest_ensure_response(
				array(
					'success' => false,
					'message' => __('Clipart has not been updated', 'all-signs-customizer-for-woocommerce'),
				)
			);
		}

		$update_clipart = $request->get_json_params();
		$update_clipart = is_array($update_clipart) ? $update_clipart : array();

		if ($all_groups[$group_id]['cliparts'][$clipart_id] === $update_clipart) {
			return rest_ensure_response(
				array(
					'success' => 'same',
					'message' => __('No change observed in clipart', 'all-signs-customizer-for-woocommerce'),
				)
			);
		}

		$all_groups[$group_id]['cliparts'][$clipart_id] = $update_clipart;
		$update = update_option('ascwo-manages-cliparts', $all_groups);

		if ($update) {
			return rest_ensure_response(
				array(
					'success' => true,
					'message' => __('Cliparts updated with success', 'all-signs-customizer-for-woocommerce'),
				)
			);
		}

		return rest_ensure_response(
			array(
				'success' => false,
				'message' => __('Clipart has not been updated', 'all-signs-customizer-for-woocommerce'),
			)
		);
	}

	/**
	 * Delete a clipart item.
	 *
	 * @param \WP_REST_Request $request Full details about the request.
	 * @return \WP_REST_Response|WP_Error
	 */
	public function delete_manage_cliparts_item($request)
	{
		$group_id = (int) $request->get_param('group_id');
		$clipart_id = (int) $request->get_param('clipart_id');
		$all_groups = $this->get_cliparts_collection();

		if (!isset($all_groups[$group_id]['cliparts'][$clipart_id])) {
			return rest_ensure_response(
				array(
					'success' => false,
					'message' => __('Clipart has not been deleted', 'all-signs-customizer-for-woocommerce'),
				)
			);
		}

		array_splice($all_groups[$group_id]['cliparts'], $clipart_id, 1);
		$update = update_option('ascwo-manages-cliparts', $all_groups);

		if ($update) {
			return rest_ensure_response(
				array(
					'success' => true,
					'message' => __('Cliparts deleted with success', 'all-signs-customizer-for-woocommerce'),
				)
			);
		}

		return rest_ensure_response(
			array(
				'success' => false,
				'message' => __('Clipart has not been deleted', 'all-signs-customizer-for-woocommerce'),
			)
		);
	}

	/**
	 * Retrieves the query params for the items collection.
	 *
	 * @return array
	 */
	public function get_collection_params()
	{
		return array();
	}
}
