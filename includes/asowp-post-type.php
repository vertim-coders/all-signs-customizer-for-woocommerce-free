<?php
namespace ASOWP;
class ASOWP_Post_Type
{
	public function init_hooks()
	{
		add_action('init', array($this, 'register_asowp_post_type'));
		add_action('init', array($this, 'register_asowp_request_quote_post_type'));
		add_action('init', array($this, 'register_asowp_config_meta'));
		add_action('init', array($this, 'register_asowp_config_templates'));

		add_filter('the_content', array($this, 'get_editor_shortcode_handler'));
		add_filter('init', array($this, 'asowp_add_design_page_rewrite_rules'), 99);
		add_filter('init', array($this, 'asowp_add_template_page_rewrite_rules'), 99);
		add_filter('query_vars', array($this, 'asowp_add_query_vars'));
		add_filter('redirect_canonical', array($this, 'prevent_asowp_canonical_redirect'), 10, 2);
		add_action('template_redirect', array($this, 'redirect_if_no_product_id'));
	}

	/**
	 * create post type 
	 */
	public function register_asowp_post_type()
	{

		$labels = array(
			'name' => _x('ASO Configurations', "all-signs-options-pro"),
			'singular_name' => _x('ASO Configurations', "all-signs-options-pro"),
			'add_new' => _x('New ASO configuration', "all-signs-options-pro"),
			'add_new_item' => _x('New ASO configuration', "all-signs-options-pro"),
			'edit_item' => _x('Edit ASO configuration', "all-signs-options-pro"),
			'new_item' => _x('New ASO configuration', "all-signs-options-pro"),
			'view_item' => _x('View ASO configuration', "all-signs-options-pro"),
			'not_found' => _x('No ASO configuration found', "all-signs-options-pro"),
			'not_found_in_trash' => _x('No ASO configuration in the trash', "all-signs-options-pro"),
			'menu_name' => _x('All Signs Options', "all-signs-options-pro"),
			'all_items' => _x('ASO Configurations', "all-signs-options-pro"),
		);

		$args = array(
			'labels' => $labels,
			'hierarchical' => false,
			'description' => 'ASO Configurations',
			'supports' => array('title'),
			'public' => false,
			'show_in_rest' => true,
			'show_ui' => true,
			'show_in_menu' => false,
			'show_in_nav_menus' => false,
			'publicly_queryable' => false,
			'exclude_from_search' => true,
			'has_archive' => false,
			'query_var' => false,
			'can_export' => true,
		);

		register_post_type('asowp-configs', $args);
	}

	public function register_asowp_request_quote_post_type()
	{
		$labels = array(
			'name' => _x('ASO Request Quotes', "all-signs-options-pro"),
			'singular_name' => _x('ASO Request Quote', "all-signs-options-pro"),
			'add_new_item' => _x('New ASO request quote', "all-signs-options-pro"),
			'edit_item' => _x('Edit ASO request quote', "all-signs-options-pro"),
			'not_found' => _x('No ASO request quote found', "all-signs-options-pro"),
			'menu_name' => _x('ASO Request Quotes', "all-signs-options-pro"),
		);

		$args = array(
			'labels' => $labels,
			'hierarchical' => false,
			'description' => 'ASO Request Quotes',
			'supports' => array('title'),
			'public' => false,
			'show_in_rest' => false,
			'show_ui' => false,
			'show_in_menu' => false,
			'show_in_nav_menus' => false,
			'publicly_queryable' => false,
			'exclude_from_search' => true,
			'has_archive' => false,
			'query_var' => false,
			'can_export' => true,
		);

		register_post_type('asowp-request-quote', $args);
	}

	/**
	 * Create meta data of asowp-configs-meta
	 */
	public function register_asowp_config_meta()
	{
		register_meta(
			'asowp-configs',
			'asowp-configs-meta',
			array(
				'show_in_rest' => array(
					'schema' => array(
						'type' => 'array',
						'items' => array(
							'type' => 'array',
							'items' => array(
								'type' => 'mixed'
							)
						)
					)
				),
				'type' => 'array',
				'single' => true,
			)
		);
	}

	/**
	 * Create meta data of asowp-configs-meta
	 */
	public function register_asowp_config_templates()
	{
		register_meta(
			'asowp-configs',
			'asowp-configs-templates',
			array(
				'show_in_rest' => array(
					'schema' => array(
						'type' => 'array',
						'items' => array(
							'type' => 'array',
							'items' => array(
								'type' => 'mixed'
							)
						)
					)
				),
				'type' => 'array',
				'single' => true,
			)
		);
	}

	/**
	 * Add short code on config page
	 */

	public function get_editor_shortcode_handler($content)
	{
		global $wp_query;
		$page_settings = get_option("asowp_config_page");
		$design_product_id = $this->get_design_product_id_from_request();
		$template_product_id = $this->get_template_product_id_from_request();
		$design_template_id = is_array($design_product_id) ? $design_product_id['template_id'] : '';
		$design_product_id = is_array($design_product_id) ? $design_product_id['product_id'] : $design_product_id;
		$template_template_id = is_array($template_product_id) ? $template_product_id['template_id'] : '';
		$template_product_id = is_array($template_product_id) ? $template_product_id['product_id'] : $template_product_id;
		if ($design_product_id && !isset($wp_query->query_vars['asowp-product-id'])) {
			$wp_query->query_vars['asowp-product-id'] = $design_product_id;
		}
		if (!empty($design_template_id) && !isset($wp_query->query_vars['asowp-tplid'])) {
			$wp_query->query_vars['asowp-tplid'] = $design_template_id;
		}
		if ($template_product_id && !isset($wp_query->query_vars['asowp-product-id'])) {
			$wp_query->query_vars['asowp-product-id'] = $template_product_id;
		}
		if (!empty($template_template_id) && !isset($wp_query->query_vars['asowp-tplid'])) {
			$wp_query->query_vars['asowp-tplid'] = $template_template_id;
		}
		if ((get_the_ID() == $page_settings["configuratorPage"]) && is_page($page_settings["configuratorPage"])) {
			if (!isset($wp_query->query_vars['asowp-product-id'])) {
				ob_start();
				?>
				<div class="asowp-config-page-error">
					<div class="asowp-config-page-error-title">
						<?php echo esc_html__("All Signs Options Warning", "all-signs-options-pro") ?>
					</div>
					<div>
						<p><?php echo esc_html__("You are trying to access the personalization page without the personalized button of a product to be personalized. 
						This page should only be accessible using one of the customization buttons. 
						If you don't like this procedure, don't define this page as a personalization page and use the short code to display the configurator.", "all-signs-options-pro"); ?>
						</p>
					</div>
				</div>
				<?php
				$content .= ob_get_clean();
			} else {
				if (isset($wp_query->query_vars['asowp-tplid'])) {
					$content .= do_shortcode("[asowp-configurator productid='" . $wp_query->query_vars['asowp-product-id'] . "' tplid='" . $wp_query->query_vars['asowp-tplid'] . "']");
				} else {
					$content .= do_shortcode("[asowp-configurator productid='" . $wp_query->query_vars['asowp-product-id'] . "']");
				}
			}
		} elseif (get_the_ID() == $page_settings["templatePage"] && is_page($page_settings["templatePage"])) {
			if (!isset($wp_query->query_vars['asowp-product-id'])) {
				ob_start();
				?>
				<div class="asowp-config-page-error">
					<div class="asowp-config-page-error-title">
						<?php echo esc_html__("All Signs Options Warning", "all-signs-options-pro") ?>
					</div>
					<div>
						<p><?php echo esc_html__("You are trying to access the template page without a product to customize. 
						This page should only be accessible by using one of the template buttons. 
						If you don't like this procedure, don't define this page as a template page and use the short code for template.", "all-signs-options-pro"); ?>
						</p>
					</div>
				</div>
				<?php
				$content .= ob_get_clean();
			} else {
				$content .= do_shortcode("[asowp-templates productid='" . $wp_query->query_vars['asowp-product-id'] . "']");
			}
		}
		return $content;
	}

	public function redirect_if_no_product_id()
	{
		global $wp_query;
		$page_settings = get_option("asowp_config_page");

		// If no configuration page is set, or the setting is invalid, do nothing.
		if (empty($page_settings) || !is_array($page_settings) || !isset($page_settings["configuratorPage"]) || empty($page_settings["configuratorPage"])) {
			return;
		}

		$design_product_id = $this->get_design_product_id_from_request();
		if ($design_product_id) {
			$design_template_id = is_array($design_product_id) ? $design_product_id['template_id'] : '';
			$design_product_id = is_array($design_product_id) ? $design_product_id['product_id'] : $design_product_id;
			if (!isset($wp_query->query_vars['asowp-product-id'])) {
				$wp_query->query_vars['asowp-product-id'] = $design_product_id;
			}
			if (!empty($design_template_id) && !isset($wp_query->query_vars['asowp-tplid'])) {
				$wp_query->query_vars['asowp-tplid'] = $design_template_id;
			}
			return;
		}

		// Check if we are on the configurator page and if no product ID is set
		if (is_page($page_settings["configuratorPage"]) && !isset($wp_query->query_vars['asowp-product-id'])) {

			$product_id_to_redirect = 0;

			$args = array(
				'post_type' => 'product',
				'posts_per_page' => -1,
				'meta_query' => array(
					array(
						'key' => 'product-asowp-metas',
						'compare' => 'EXISTS',
					),
				),
				'fields' => 'ids',
			);
			$products = new \WP_Query($args);

			if ($products->have_posts()) {
				foreach ($products->posts as $product_id) {
					$meta = get_post_meta($product_id, 'product-asowp-metas', true);
					if (is_array($meta) && isset($meta[$product_id]['config-id']) && !empty($meta[$product_id]['config-id'])) {
						$product_id_to_redirect = $product_id;
						break;
					}
				}
			}
			wp_reset_postdata();

			if ($product_id_to_redirect > 0) {
				$redirect_url = get_permalink($page_settings["configuratorPage"]);
				if (get_option('permalink_structure')) {
					if (substr($redirect_url, -1) !== '/') {
						$redirect_url .= '/';
					}
					$redirect_url .= 'asowp-design/' . $product_id_to_redirect . '/';
				} else {
					$redirect_url = add_query_arg('asowp-product-id', $product_id_to_redirect, $redirect_url);
				}

				wp_redirect($redirect_url);
				exit;
			}
		}
	}

	private function get_design_product_id_from_request()
	{
		return $this->get_product_id_from_request_segment('asowp-design');
	}

	private function get_template_product_id_from_request()
	{
		return $this->get_product_id_from_request_segment('asowp-templates');
	}

	private function get_product_id_from_request_segment($segment)
	{
		$request_uri = isset($_SERVER['REQUEST_URI']) ? (string) wp_unslash($_SERVER['REQUEST_URI']) : '';
		$path = trim((string) wp_parse_url($request_uri, PHP_URL_PATH), '/');
		if ($path === '') {
			return 0;
		}

		$pattern = '#(?:^|/)' . preg_quote($segment, '#') . '/([^/]+)(?:/([^/]+))?/?$#';
		if (!preg_match($pattern, $path, $matches)) {
			return 0;
		}

		$product_id = absint($matches[1] ?? 0);
		if (!$product_id) {
			return 0;
		}

		if (!empty($matches[2])) {
			return array(
				'product_id' => $product_id,
				'template_id' => sanitize_text_field($matches[2]),
			);
		}

		return $product_id;
	}

	public function prevent_asowp_canonical_redirect($redirect_url, $requested_url)
	{
		$path = trim((string) wp_parse_url((string) $requested_url, PHP_URL_PATH), '/');
		if (
			preg_match('#(?:^|/)asowp-design/[^/]+(?:/[^/]+)?/?$#', $path)
			|| preg_match('#(?:^|/)asowp-templates/[^/]+(?:/[^/]+)?/?$#', $path)
		) {
			return false;
		}

		return $redirect_url;
	}
	
	public function asowp_add_query_vars($a_vars)
	{
		$a_vars[] = 'asowp-product-id';
		$a_vars[] = 'asowp-tplid';
		$a_vars[] = 'edit';
		$a_vars[] = 'design-index';
		$a_vars[] = 'vcid';
		return $a_vars;
	}

	public function asowp_add_design_page_rewrite_rules()
	{
		global $wp_rewrite;
		$page_settings = get_option("asowp_config_page");
		if (!empty($page_settings) && $page_settings != false) {
			$asowp_page_id = $page_settings["configuratorPage"];
			$asowp_page = get_post($asowp_page_id);
			if (is_object($asowp_page)) {
				$slug = trim(get_page_uri($asowp_page->ID), '/');
				$match_slug = '(?:index\.php/)?' . preg_quote($slug, '#');


				add_rewrite_rule(
					$match_slug . '/asowp-design/([^/]+)/([^/]+)/?$',
					'index.php?pagename=' . $slug . '&asowp-product-id=$matches[1]&asowp-tplid=$matches[2]',
					'top'
				);


				add_rewrite_rule(
					$match_slug . '/asowp-design/([^/]+)/?$',
					'index.php?pagename=' . $slug . '&asowp-product-id=$matches[1]',
					'top'
				);
			}
		}
		$wp_rewrite->flush_rules(false);

	}

	public function asowp_add_template_page_rewrite_rules()
	{
		global $wp_rewrite;
		$page_settings = get_option("asowp_config_page");
		if (!empty($page_settings) && $page_settings != false) {
			$asowp_page_id = $page_settings["templatePage"];
			$asowp_page = get_post($asowp_page_id);
			if (is_object($asowp_page)) {
				$slug = trim(get_page_uri($asowp_page->ID), '/');
				$match_slug = '(?:index\.php/)?' . preg_quote($slug, '#');

				add_rewrite_rule(
					$match_slug . '/asowp-templates/([^/]+)/([^/]+)/?$',
					'index.php?pagename=' . $slug . '&asowp-product-id=$matches[1]&asowp-tplid=$matches[2]',
					'top'
				);

				add_rewrite_rule(
					$match_slug . '/asowp-templates/([^/]+)/?$',
					'index.php?pagename=' . $slug . '&asowp-product-id=$matches[1]',
					'top'
				);
			}
		}
		$wp_rewrite->flush_rules(false);
	}


}
