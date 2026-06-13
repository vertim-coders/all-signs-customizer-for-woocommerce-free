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
			'menu_name' => _x('All Signs Customizer for WooCommerce', "all-signs-customizer-for-woocommerce-pro"),
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
		if ((get_the_ID() == $page_settings["configuratorPage"]) && is_page($page_settings["configuratorPage"])) {
			if (!isset($wp_query->query_vars['ascwo-product-id'])) {
				ob_start();
				?>
				<div class="ascwo-config-page-error">
					<div class="ascwo-config-page-error-title">
						<?php echo esc_html__("All Signs Customizer for WooCommerce Warning", "all-signs-customizer-for-woocommerce-pro") ?>
					</div>
					<div>
						<p><?php echo esc_html__("You are trying to access the personalization page without the personalized button of a product to be personalized. 
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
		} elseif (get_the_ID() == $page_settings["templatePage"] && is_page($page_settings["templatePage"])) {
			if (!isset($wp_query->query_vars['ascwo-product-id'])) {
				ob_start();
				?>
				<div class="ascwo-config-page-error">
					<div class="ascwo-config-page-error-title">
						<?php echo esc_html__("All Signs Customizer for WooCommerce Warning", "all-signs-customizer-for-woocommerce-pro") ?>
					</div>
					<div>
						<p><?php echo esc_html__("You are trying to access the template page without a product to customize. 
						This page should only be accessible by using one of the template buttons. 
						If you don't like this procedure, don't define this page as a template page and use the short code for template.", "all-signs-customizer-for-woocommerce-pro"); ?>
						</p>
					</div>
				</div>
				<?php
				$content .= ob_get_clean();
			} else {
				$content .= do_shortcode("[ascwo-templates productid='" . $wp_query->query_vars['ascwo-product-id'] . "']");
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
				$raw_slug = get_permalink($ascwo_page->ID);
				$home_url = home_url('/');
				$slug = trim(str_replace($home_url, '', $raw_slug), '/');


				add_rewrite_rule(
					$slug . '/ascwo-design/([^/]+)/([^/]+)/?$',
					'index.php?pagename=' . $slug . '&ascwo-product-id=$matches[1]&ascwo-tplid=$matches[2]',
					'top'
				);


				add_rewrite_rule(
					$slug . '/ascwo-design/([^/]+)/?$',
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
		$page_settings = get_option("ascwo_config_page");
		if (!empty($page_settings) && $page_settings != false) {
			$ascwo_page_id = $page_settings["templatePage"];
			$ascwo_page = get_post($ascwo_page_id);
			if (is_object($ascwo_page)) {
				$raw_slug = get_permalink($ascwo_page->ID);
				$home_url = home_url('/');
				$slug = trim(str_replace($home_url, '', $raw_slug), '/');

				add_rewrite_rule(
					$slug . '/ascwo-templates/([^/]+)/([^/]+)/?$',
					'index.php?pagename=' . $slug . '&ascwo-product-id=$matches[1]&ascwo-tplid=$matches[2]',
					'top'
				);

				add_rewrite_rule(
					$slug . '/ascwo-templates/([^/]+)/?$',
					'index.php?pagename=' . $slug . '&ascwo-product-id=$matches[1]',
					'top'
				);
			}
		}
		$wp_rewrite->flush_rules(false);
	}


}
