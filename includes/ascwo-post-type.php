<?php
namespace ASCWO;
class ASCWO_Post_Type
{
	public function init_hooks()
	{
		add_action('init', array($this, 'register_ascwo_post_type'));
		add_action('init', array($this, 'register_ascwo_request_quote_post_type'));
		add_action('init', array($this, 'register_ascwo_config_meta'));
		add_action('init', array($this, 'register_ascwo_config_templates'));

		add_filter('the_content', array($this, 'get_editor_shortcode_handler'));
		add_filter('init', array($this, 'ascwo_add_design_page_rewrite_rules'), 99);
		add_filter('init', array($this, 'ascwo_add_template_page_rewrite_rules'), 99);
		add_filter('query_vars', array($this, 'ascwo_add_query_vars'));
		add_filter('redirect_canonical', array($this, 'prevent_ascwo_canonical_redirect'), 10, 2);
		add_action('template_redirect', array($this, 'redirect_if_no_product_id'));
	}

	/**
	 * create post type 
	 */
	public function register_ascwo_post_type()
	{

		$labels = array(
			'name' => _x('ASO Configurations', "all-signs-customizer-for-woocommerce-pro"),
			'singular_name' => _x('ASO Configurations', "all-signs-customizer-for-woocommerce-pro"),
			'add_new' => _x('New ASO configuration', "all-signs-customizer-for-woocommerce-pro"),
			'add_new_item' => _x('New ASO configuration', "all-signs-customizer-for-woocommerce-pro"),
			'edit_item' => _x('Edit ASO configuration', "all-signs-customizer-for-woocommerce-pro"),
			'new_item' => _x('New ASO configuration', "all-signs-customizer-for-woocommerce-pro"),
			'view_item' => _x('View ASO configuration', "all-signs-customizer-for-woocommerce-pro"),
			'not_found' => _x('No ASO configuration found', "all-signs-customizer-for-woocommerce-pro"),
			'not_found_in_trash' => _x('No ASO configuration in the trash', "all-signs-customizer-for-woocommerce-pro"),
			'menu_name' => _x('All Sign Customizer for WooCommerce', "all-signs-customizer-for-woocommerce-pro"),
			'all_items' => _x('ASO Configurations', "all-signs-customizer-for-woocommerce-pro"),
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

		register_post_type('ascwo-configs', $args);
	}

	public function register_ascwo_request_quote_post_type()
	{
		$labels = array(
			'name' => _x('ASO Request Quotes', "all-signs-customizer-for-woocommerce-pro"),
			'singular_name' => _x('ASO Request Quote', "all-signs-customizer-for-woocommerce-pro"),
			'add_new_item' => _x('New ASO request quote', "all-signs-customizer-for-woocommerce-pro"),
			'edit_item' => _x('Edit ASO request quote', "all-signs-customizer-for-woocommerce-pro"),
			'not_found' => _x('No ASO request quote found', "all-signs-customizer-for-woocommerce-pro"),
			'menu_name' => _x('ASO Request Quotes', "all-signs-customizer-for-woocommerce-pro"),
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

		register_post_type('ascwo-request-quote', $args);
	}

	/**
	 * Create meta data of ascwo-configs-meta
	 */
	public function register_ascwo_config_meta()
	{
		register_meta(
			'ascwo-configs',
			'ascwo-configs-meta',
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
	 * Create meta data of ascwo-configs-meta
	 */
	public function register_ascwo_config_templates()
	{
		register_meta(
			'ascwo-configs',
			'ascwo-configs-templates',
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
		$page_settings = get_option("ascwo_config_page");
		$design_product_id = $this->get_design_product_id_from_request();
		$template_product_id = $this->get_template_product_id_from_request();
		$design_template_id = is_array($design_product_id) ? $design_product_id['template_id'] : '';
		$design_product_id = is_array($design_product_id) ? $design_product_id['product_id'] : $design_product_id;
		$template_template_id = is_array($template_product_id) ? $template_product_id['template_id'] : '';
		$template_product_id = is_array($template_product_id) ? $template_product_id['product_id'] : $template_product_id;
		if ($design_product_id && !isset($wp_query->query_vars['ascwo-product-id'])) {
			$wp_query->query_vars['ascwo-product-id'] = $design_product_id;
		}
		if (!empty($design_template_id) && !isset($wp_query->query_vars['ascwo-tplid'])) {
			$wp_query->query_vars['ascwo-tplid'] = $design_template_id;
		}
		if ($template_product_id && !isset($wp_query->query_vars['ascwo-product-id'])) {
			$wp_query->query_vars['ascwo-product-id'] = $template_product_id;
		}
		if (!empty($template_template_id) && !isset($wp_query->query_vars['ascwo-tplid'])) {
			$wp_query->query_vars['ascwo-tplid'] = $template_template_id;
		}
		if ((get_the_ID() == $page_settings["configuratorPage"]) && is_page($page_settings["configuratorPage"])) {
			if (!isset($wp_query->query_vars['ascwo-product-id'])) {
				ob_start();
				?>
				<div class="ascwo-config-page-error">
					<div class="ascwo-config-page-error-title">
						<?php echo esc_html__("All Sign Customizer for WooCommerce Warning", "all-signs-customizer-for-woocommerce-pro") ?>
					</div>
					<div>
						<p>
							<?php echo esc_html__("You are trying to access the personalization page without the personalized button of a product to be personalized. 
						This page should only be accessible using one of the customization buttons. 
						If you don't like this procedure, don't define this page as a personalization page and use the short code to display the configurator.", "all-signs-customizer-for-woocommerce-pro"); ?>
						</p>
					</div>
				</div>
				<?php
				$content .= ob_get_clean();
			} else {
				if (isset($wp_query->query_vars['ascwo-tplid'])) {
					$content .= do_shortcode("[ascwo-configurator productid='" . $wp_query->query_vars['ascwo-product-id'] . "' tplid='" . $wp_query->query_vars['ascwo-tplid'] . "']");
				} else {
					$content .= do_shortcode("[ascwo-configurator productid='" . $wp_query->query_vars['ascwo-product-id'] . "']");
				}
			}
		}
		return $content;
	}

	public function redirect_if_no_product_id()
	{
		global $wp_query;
		$page_settings = get_option("ascwo_config_page");

		// If no configuration page is set, or the setting is invalid, do nothing.
		if (empty($page_settings) || !is_array($page_settings) || !isset($page_settings["configuratorPage"]) || empty($page_settings["configuratorPage"])) {
			return;
		}

		$design_product_id = $this->get_design_product_id_from_request();
		if ($design_product_id) {
			$design_template_id = is_array($design_product_id) ? $design_product_id['template_id'] : '';
			$design_product_id = is_array($design_product_id) ? $design_product_id['product_id'] : $design_product_id;
			if (!isset($wp_query->query_vars['ascwo-product-id'])) {
				$wp_query->query_vars['ascwo-product-id'] = $design_product_id;
			}
			if (!empty($design_template_id) && !isset($wp_query->query_vars['ascwo-tplid'])) {
				$wp_query->query_vars['ascwo-tplid'] = $design_template_id;
			}
			return;
		}

		// Check if we are on the configurator page and if no product ID is set
		if (is_page($page_settings["configuratorPage"]) && !isset($wp_query->query_vars['ascwo-product-id'])) {

			$product_id_to_redirect = 0;

			$args = array(
				'post_type' => 'product',
				'posts_per_page' => -1,
				'meta_query' => array(
					array(
						'key' => 'product-ascwo-metas',
						'compare' => 'EXISTS',
					),
				),
				'fields' => 'ids',
			);
			$products = new \WP_Query($args);

			if ($products->have_posts()) {
				foreach ($products->posts as $product_id) {
					$meta = get_post_meta($product_id, 'product-ascwo-metas', true);
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
					$redirect_url .= 'ascwo-design/' . $product_id_to_redirect . '/';
				} else {
					$redirect_url = add_query_arg('ascwo-product-id', $product_id_to_redirect, $redirect_url);
				}

				wp_redirect($redirect_url);
				exit;
			}
		}
	}

	private function get_design_product_id_from_request()
	{
		return $this->get_product_id_from_request_segment('ascwo-design');
	}

	private function get_template_product_id_from_request()
	{
		return $this->get_product_id_from_request_segment('ascwo-templates');
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

	public function prevent_ascwo_canonical_redirect($redirect_url, $requested_url)
	{
		$path = trim((string) wp_parse_url((string) $requested_url, PHP_URL_PATH), '/');
		if (
			preg_match('#(?:^|/)ascwo-design/[^/]+(?:/[^/]+)?/?$#', $path)
			|| preg_match('#(?:^|/)ascwo-templates/[^/]+(?:/[^/]+)?/?$#', $path)
		) {
			return false;
		}

		return $redirect_url;
	}

	public function ascwo_add_query_vars($a_vars)
	{
		$a_vars[] = 'ascwo-product-id';
		$a_vars[] = 'ascwo-tplid';
		$a_vars[] = 'edit';
		$a_vars[] = 'design-index';
		$a_vars[] = 'vcid';
		return $a_vars;
	}

	public function ascwo_add_design_page_rewrite_rules()
	{
		global $wp_rewrite;
		$page_settings = get_option("ascwo_config_page");
		if (!empty($page_settings) && $page_settings != false) {
			$ascwo_page_id = $page_settings["configuratorPage"];
			$ascwo_page = get_post($ascwo_page_id);
			if (is_object($ascwo_page)) {
				$slug = trim(get_page_uri($ascwo_page->ID), '/');
				$match_slug = '(?:index\.php/)?' . preg_quote($slug, '#');


				add_rewrite_rule(
					$match_slug . '/ascwo-design/([^/]+)/([^/]+)/?$',
					'index.php?pagename=' . $slug . '&ascwo-product-id=$matches[1]&ascwo-tplid=$matches[2]',
					'top'
				);


				add_rewrite_rule(
					$match_slug . '/ascwo-design/([^/]+)/?$',
					'index.php?pagename=' . $slug . '&ascwo-product-id=$matches[1]',
					'top'
				);
			}
		}
		$wp_rewrite->flush_rules(false);

	}

	public function ascwo_add_template_page_rewrite_rules()
	{
		global $wp_rewrite;
		$wp_rewrite->flush_rules(false);
	}


}
