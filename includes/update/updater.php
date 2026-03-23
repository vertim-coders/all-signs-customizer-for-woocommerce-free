<?php

/**
 * REST_API Handler
 */
class ASOWP_Updater
{
	private static $remote_cache = null;
	private const REMOTE_TRANSIENT_KEY = ASOWP_CHECK_TRANSIENT_NAME;
	private const REMOTE_LOCK_TRANSIENT_KEY = ASOWP_CHECK_TRANSIENT_NAME . '_lock';
	private const REMOTE_SUCCESS_TTL = ASOWP_CHECK_TRANSIENT_EXPIRATION;
	private const REMOTE_ERROR_TTL = HOUR_IN_SECONDS;
	private const REMOTE_RATE_LIMIT_TTL = 6 * HOUR_IN_SECONDS;
	private const REMOTE_LOCK_TTL = MINUTE_IN_SECONDS;

	/**
	 * [__construct description]
	 */
	public function __construct()
	{
	}

	public function init_hooks()
	{
		if (!is_admin() && !wp_doing_cron()) {
			return;
		}

		// Define the alternative response for information checking
		add_filter('plugins_api', [$this, 'asowp_plugin_info'], 20, 3);
		// define the alternative API for updating checking
		add_filter('pre_set_site_transient_update_plugins', [$this, 'asowp_push_update']);
	}

	public function asowp_plugin_info($res, $action, $args)
	{
		// do nothing if this is not about getting plugin information
		if ('plugin_information' !== $action) {
			return $res;
		}
		$plugin_slug = explode('/', plugin_basename(ASOWP_FILE))[0];

		// do nothing if it is not our plugin
		if ($plugin_slug !== $args->slug) {
			return $res;
		}
		$remote = $this->get_remote_version_data();

		if (is_object($remote)) {
			if (isset($remote->version) && isset($remote->download_link)) {
				$res = $remote;
			}
		}

		return $res;
	}
	public function asowp_push_update($transient)
	{
		if (!is_object($transient)) {
			$transient = new stdClass();
		}

		if (empty($transient->checked) || !is_array($transient->checked)) {
			return $transient;
		}

		$remote = $this->get_remote_version_data();
		$plugin = plugin_basename(ASOWP_FILE);
		if (is_object($remote)) {
			if (!isset($transient->response) || !is_array($transient->response)) {
				$transient->response = [];
			}

			if (!isset($transient->no_update) || !is_array($transient->no_update)) {
				$transient->no_update = [];
			}

			$res = new stdClass();
			$res->slug = explode('/', $plugin)[0];
			// it could be just YOUR_PLUGIN_SLUG.php if your plugin doesn't have its own directory
			$res->new_version = $remote->version;
			$res->tested = $remote->tested;
			$res->package = $remote->download_link;

			if (
				$remote
				&& version_compare(ASOWP_VERSION, $remote->version, '<')
				&& version_compare($remote->requires, get_bloginfo('version'), '<')
				&& version_compare($remote->requires_php, PHP_VERSION, '<')
			) {
				$transient->response[$plugin] = $res;
				unset($transient->no_update[$plugin]);
			} else {
				$transient->no_update[$plugin] = $res;
				unset($transient->response[$plugin]);
			}
		}

		return $transient;

	}

	private function get_remote_version_data()
	{
		if (self::$remote_cache !== null) {
			return self::$remote_cache;
		}

		$cached = get_site_transient(self::REMOTE_TRANSIENT_KEY);
		if (false !== $cached) {
			self::$remote_cache = $cached;
			return $cached;
		}

		if (get_site_transient(self::REMOTE_LOCK_TRANSIENT_KEY)) {
			self::$remote_cache = array();
			return self::$remote_cache;
		}

		set_site_transient(self::REMOTE_LOCK_TRANSIENT_KEY, 1, self::REMOTE_LOCK_TTL);
		$remote = $this->check_asowp_other_version();
		delete_site_transient(self::REMOTE_LOCK_TRANSIENT_KEY);

		$expiration = is_object($remote) ? self::REMOTE_SUCCESS_TTL : $this->get_error_cache_ttl($remote);
		set_site_transient(self::REMOTE_TRANSIENT_KEY, $remote, $expiration);

		self::$remote_cache = $remote;
		return $remote;
	}

	private function get_error_cache_ttl($remote)
	{
		if (is_array($remote) && isset($remote['status']) && (int) $remote['status'] === 429) {
			return self::REMOTE_RATE_LIMIT_TTL;
		}

		return self::REMOTE_ERROR_TTL;
	}

	private function check_asowp_other_version()
	{
		if (self::$remote_cache !== null) {
			return self::$remote_cache;
		}

		$site_url = get_site_url();
		$purchase_code = get_option("asowp_product_pro");
		if (empty($purchase_code) || !apply_filters('asowp_remote_update_checks_enabled', true)) {
			self::$remote_cache = array(
				'status' => 0,
				'message' => 'disabled',
			);
			return self::$remote_cache;
		}

		$url = 'https://signsdesigner.us/wp-json/vlc/update/?lcde=' . $purchase_code . '&siteurl=' . urlencode($site_url) . "&vertim=" . ASOWP_ID;

		$args = array(
			'timeout' => 8,
			'user-agent' => 'ASOWP/' . ASOWP_VERSION . '; ' . home_url('/'),
		);
		$response = wp_remote_get($url, $args);
		if (is_wp_error($response)) {
			self::$remote_cache = array(
				'status' => 0,
				'message' => $response->get_error_message(),
			);
			return self::$remote_cache;
		}
		$status_code = (int) wp_remote_retrieve_response_code($response);
		if ($status_code < 200 || $status_code >= 300) {
			self::$remote_cache = array(
				'status' => $status_code,
				'message' => wp_remote_retrieve_response_message($response),
			);
			return self::$remote_cache;
		}

		$remote = json_decode($response['body']);
		if (is_object($remote)) {
			if (isset($remote->version) && isset($remote->download_url)) {
				$plugin_slug = explode('/', plugin_basename(ASOWP_FILE))[0];
				$res = new stdClass();
				$res->name = $remote->name;
				$res->slug = $plugin_slug;
				$res->author = $remote->author;
				$res->author_profile = $remote->author_profil;
				$res->version = $remote->version;
				$res->tested = $remote->tested;
				$res->requires = $remote->requires;
				$res->requires_php = $remote->requires_php;
				$res->download_link = $remote->download_url;
				$res->trunk = $remote->download_url;
				$res->last_updated = $remote->last_updated;
				$res->sections = array(
					'description' => $remote->sections->description,
					'installation' => $remote->sections->installation,
					'changelog' => $remote->sections->changelog
					// you can add your custom sections (tabs) here
				);
				// in case you want the screenshots tab, use the following HTML format for its content:
				// <ol><li><a href="IMG_URL" target="_blank"><img src="IMG_URL" alt="CAPTION" /></a><p>CAPTION</p></li></ol>
				/* if( ! empty( $remote->sections->screenshots ) ) {
								$res->sections[ 'screenshots' ] = $remote->sections->screenshots;
							} */

				$res->banners = array(
					'low' => ASOWP_ASSETS . '/images/home/im_home-skin-vue.png',
					'high' => ASOWP_ASSETS . '/images/home/im_home-skin-vue.png'
				);
				self::$remote_cache = $res;
				return $res;
			} else {
				self::$remote_cache = array(
					'status' => $status_code,
					'message' => 'invalid_payload',
				);
				return self::$remote_cache;
			}
		} else {
			self::$remote_cache = array(
				'status' => $status_code,
				'message' => 'invalid_json',
			);
			return self::$remote_cache;
		}
	}



}
