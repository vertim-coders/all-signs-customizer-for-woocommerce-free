<?php
namespace ASO;
class ASO_Post_Type
{
    public function init_hooks(){
        add_action('init',array($this,'register_aso_post_type'));
        add_action('init',array($this,'register_aso_config_meta'));
        add_action('init',array($this,'register_aso_config_templates'));

        add_filter( 'the_content', array($this,'get_editor_shortcode_handler'));
		add_filter( 'init', array($this,'aso_add_design_page_rewrite_rules'), 99 );
		add_filter( 'init', array($this,'aso_add_template_page_rewrite_rules'), 99 );
		add_filter( 'query_vars', array($this, 'aso_add_query_vars' ));
    }

	/**
	 * create post type 
	 */
    public function register_aso_post_type() {

		$labels = array(
			'name'               => _x( 'ASO Configurations', 'ASO' ),
			'singular_name'      => _x( 'ASO Configurations', 'ASO' ),
			'add_new'            => _x( 'New ASO configuration', 'ASO' ),
			'add_new_item'       => _x( 'New ASO configuration', 'ASO' ),
			'edit_item'          => _x( 'Edit ASO configuration', 'ASO' ),
			'new_item'           => _x( 'New ASO configuration', 'ASO' ),
			'view_item'          => _x( 'View ASO configuration', 'ASO' ),
			'not_found'          => _x( 'No ASO configuration found', 'ASO' ),
			'not_found_in_trash' => _x( 'No ASO configuration in the trash', 'ASO' ),
			'menu_name'          => _x( 'All Signs Options', 'ASO' ),
			'all_items'          => _x( 'ASO Configurations', 'ASO' ),
		);

		$args = array(
			'labels'              => $labels,
			'hierarchical'        => false,
			'description'         => 'ASO Configurations',
			'supports'            => array( 'title' ),
			'public'              => false,
			'show_in_rest' 		  => true,
			'show_ui'             => true,
			'show_in_menu'        => false,
			'show_in_nav_menus'   => false,
			'publicly_queryable'  => false,
			'exclude_from_search' => true,
			'has_archive'         => false,
			'query_var'           => false,
			'can_export'          => true,
		);

		register_post_type( 'aso-configs', $args );
	}

    /**
	 * Create meta data of aso-configs-meta
	*/
	public function register_aso_config_meta(){
		register_meta(
			'aso-configs',
			'aso-configs-meta',
			array(
				'show_in_rest' => array(
					'schema' => array(
						'type'  => 'array',
						'items' => array(
							'type'  => 'array',
							'items' => array(
								'type'        => 'mixed'
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
	 * Create meta data of aso-configs-meta
	*/
	public function register_aso_config_templates(){
		register_meta(
			'aso-configs',
			'aso-configs-templates',
			array(
				'show_in_rest' => array(
					'schema' => array(
						'type'  => 'array',
						'items' => array(
							'type'  => 'array',
							'items' => array(
								'type'        => 'mixed'
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

	public function get_editor_shortcode_handler( $content ) {
		global $wp_query;
		$page_settings = get_option("aso_config_page");
		if ( (get_the_ID() == $page_settings["configuratorPage"]) && is_page($page_settings["configuratorPage"]) ){
			if(!isset( $wp_query->query_vars['aso-product-id'] )){
				ob_start();
				?>
				<div class="aso-config-page-error">
					<div class="aso-config-page-error-title">
						<?php echo esc_html__("All Signs Options Warning","ASO") ?>
					</div>
					<div>				
						<p><?php echo esc_html__( "You are trying to access the personalization page without the personalized button of a product to be personalized. 
						This page should only be accessible using one of the customization buttons. 
						If you don't like this procedure, don't define this page as a personalization page and use the short code to display the configurator.", 'ASO' );?></p>
					</div>
				</div>
				<?php
				$content .= ob_get_clean();
			}else{
				if(isset($wp_query->query_vars['aso-tplid'])){
					$content .= do_shortcode("[aso-configurator productid='".$wp_query->query_vars['aso-product-id']."' tplid='".$wp_query->query_vars['aso-tplid']."']");		
				}else{
					$content .= do_shortcode("[aso-configurator productid='".$wp_query->query_vars['aso-product-id']."']");		
				}				
			}
		}elseif ( get_the_ID() == $page_settings["templatePage"] && is_page($page_settings["templatePage"]) ) {
			if(!isset( $wp_query->query_vars['aso-product-id'] )){
				ob_start();
				?>
				<div class="aso-config-page-error">
					<div class="aso-config-page-error-title">
						<?php echo esc_html__("All Signs Options Warning","ASO") ?>
					</div>
					<div>				
						<p><?php echo esc_html__( "You are trying to access the template page without a product to customize. 
						This page should only be accessible by using one of the template buttons. 
						If you don't like this procedure, don't define this page as a template page and use the short code for template.", 'ASO' );?></p>
					</div>
				</div>
				<?php
				$content .= ob_get_clean();
			}else{
				$content .= do_shortcode("[aso-templates productid='".$wp_query->query_vars['aso-product-id']."']");
			}
		}
		return $content;
	}
	public function aso_add_query_vars( $a_vars ) {
		$a_vars[] = 'aso-product-id';
		$a_vars[] = 'aso-tplid';
		$a_vars[] = 'edit';
		$a_vars[] = 'design-index';
		$a_vars[] = 'vcid';
		return $a_vars;
	}
	/*public function aso_add_design_page_rewrite_rules( $param ) {
		
		global $wp_rewrite;
		$page_settings = get_option("aso_config_page");
		if ( !empty($page_settings) && $page_settings != false ) {
			$aso_page_id = $page_settings["configuratorPage"];
		} else {
			$aso_page_id = false;
		}

		// if ( function_exists( 'icl_object_id' ) ) {
		// 	$aso_page_id = icl_object_id( $aso_page_id, 'page', false, ICL_LANGUAGE_CODE );
		// } 
		$aso_page = get_post( $aso_page_id );
		if ( is_object( $aso_page ) ) {
			$raw_slug = get_permalink( $aso_page->ID );
			$home_url = home_url( '/' );
			$slug     = str_replace( $home_url, '', $raw_slug );
			// If the slug does not have the trailing slash, we get 404 (ex postname = /%postname%)
			$sep = '';
			if ( substr( $slug, -1 ) != '/' ) {
				$sep = '/';
			}
			add_rewrite_rule(
					// The regex to match the incoming URL
				$slug . $sep . 'aso-design' . '/([^/]+)/?$',
				// The resulting internal URL: `index.php` because we still use WordPress
					// `pagename` because we use this WordPress page
					// `designer_slug` because we assign the first captured regex part to this variable
					'index.php?pagename=' . $slug . '&aso-product-id=$matches[1]',
				// This is a rather specific URL, so we add it to the top of the list
					// Otherwise, the "catch-all" rules at the bottom (for pages and attachments) will "win"
					'top'
			);
			add_rewrite_rule(
					// The regex to match the incoming URL
				$slug . $sep . 'aso-design' . '/([^/]+)/([^/]+)/?$',
				// The resulting internal URL: `index.php` because we still use WordPress
					// `pagename` because we use this WordPress page
					// `designer_slug` because we assign the first captured regex part to this variable
					'index.php?pagename=' . $slug . '&aso-product-id=$matches[1]&aso-tplid=$matches[2]',
				// This is a rather specific URL, so we add it to the top of the list
					// Otherwise, the "catch-all" rules at the bottom (for pages and attachments) will "win"
					'top'
			);
			add_rewrite_rule(
					// The regex to match the incoming URL
				$slug . $sep . 'aso-edit' . '/([^/]+)/([^/]+)/?$',
				// The resulting internal URL: `index.php` because we still use WordPress
					// `pagename` because we use this WordPress page
					// `designer_slug` because we assign the first captured regex part to this variable
					'index.php?pagename=' . $slug . '&aso-product-id=$matches[1]&edit=$matches[2]',
				// This is a rather specific URL, so we add it to the top of the list
					// Otherwise, the "catch-all" rules at the bottom (for pages and attachments) will "win"
					'top'
			);
			add_rewrite_rule(
					// The regex to match the incoming URL
				$slug . $sep . 'aso-saved-design' . '/([^/]+)/([^/]+)/?$',
				// The resulting internal URL: `index.php` because we still use WordPress
					// `pagename` because we use this WordPress page
					// `designer_slug` because we assign the first captured regex part to this variable
					'index.php?pagename=' . $slug . '&aso-product-id=$matches[1]&design-index=$matches[2]',
				// This is a rather specific URL, so we add it to the top of the list
					// Otherwise, the "catch-all" rules at the bottom (for pages and attachments) will "win"
					'top'
			);

			$wp_rewrite->flush_rules( false );
		}
	}*/

	/*public function aso_add_template_page_rewrite_rules( $param ) {
		
		global $wp_rewrite;
		$page_settings = get_option("aso_config_page");
		if ( !empty($page_settings) && $page_settings != false ) {
			$aso_page_id = $page_settings["templatePage"];
		} else {
			$aso_page_id = false;
		}

		// if ( function_exists( 'icl_object_id' ) ) {
		// 	$aso_page_id = icl_object_id( $aso_page_id, 'page', false, ICL_LANGUAGE_CODE );
		// }
		$aso_page = get_post( $aso_page_id );
		if ( is_object( $aso_page ) ) {
			$raw_slug = get_permalink( $aso_page->ID );
			$home_url = home_url( '/' );
			$slug     = str_replace( $home_url, '', $raw_slug );
			// If the slug does not have the trailing slash, we get 404 (ex postname = /%postname%)
			$sep = '';
			if ( substr( $slug, -1 ) != '/' ) {
				$sep = '/';
			}
			add_rewrite_rule(
				// The regex to match the incoming URL
				$slug . $sep . 'aso-templates' . '/([^/]+)/?$',
				// The resulting internal URL: `index.php` because we still use WordPress
				// `pagename` because we use this WordPress page
				'index.php?pagename=' . $slug . '&aso-product-id=$matches[1]',
				// This is a rather specific URL, so we add it to the top of the list
				// Otherwise, the "catch-all" rules at the bottom (for pages and attachments) will "win"
				'top'
			);
			add_rewrite_rule(
					// The regex to match the incoming URL
				$slug . $sep . 'aso-templates' . '/([^/]+)/([^/]+)/?$',
				// The resulting internal URL: `index.php` because we still use WordPress
					// `pagename` because we use this WordPress page
					'index.php?pagename=' . $slug . '&aso-product-id=$matches[1]&tpl=$matches[2]',
				// This is a rather specific URL, so we add it to the top of the list
					// Otherwise, the "catch-all" rules at the bottom (for pages and attachments) will "win"
					'top'
			);
			add_rewrite_rule(
					// The regex to match the incoming URL
				$slug . $sep . 'aso-templates' . '/([^/]+)/([^/]+)/?$',
				// The resulting internal URL: `index.php` because we still use WordPress
					// `pagename` because we use this WordPress page
					'index.php?pagename=' . $slug . '&aso-product-id=$matches[1]&vcid=$matches[2]',
				// This is a rather specific URL, so we add it to the top of the list
					// Otherwise, the "catch-all" rules at the bottom (for pages and attachments) will "win"
					'top'
			);

			$wp_rewrite->flush_rules( false );
		}
	} */

	public function aso_add_design_page_rewrite_rules() {
		global $wp_rewrite;
		$page_settings = get_option("aso_config_page");
		if (!empty($page_settings) && $page_settings != false) {
			$aso_page_id = $page_settings["configuratorPage"];
			$aso_page = get_post($aso_page_id);
			if (is_object($aso_page)) {
				$raw_slug = get_permalink($aso_page->ID);
				$home_url = home_url('/');
				$slug = trim(str_replace($home_url, '', $raw_slug), '/');
				
				// Règle pour URL avec aso-tplid
				add_rewrite_rule(
					$slug . '/aso-design/([^/]+)/([^/]+)/?$',
					'index.php?pagename=' . $slug . '&aso-product-id=$matches[1]&aso-tplid=$matches[2]',
					'top'
				);
	
				// Règle pour URL sans aso-tplid
				add_rewrite_rule(
					$slug . '/aso-design/([^/]+)/?$',
					'index.php?pagename=' . $slug . '&aso-product-id=$matches[1]',
					'top'
				);
			}
		}
		$wp_rewrite->flush_rules(false);
	}
	
	public function aso_add_template_page_rewrite_rules() {
		global $wp_rewrite;
		$page_settings = get_option("aso_config_page");
		if (!empty($page_settings) && $page_settings != false) {
			$aso_page_id = $page_settings["templatePage"];
			$aso_page = get_post($aso_page_id);
			if (is_object($aso_page)) {
				$raw_slug = get_permalink($aso_page->ID);
				$home_url = home_url('/');
				$slug = trim(str_replace($home_url, '', $raw_slug), '/');
				
				// Règle pour URL avec aso-tplid
				add_rewrite_rule(
					$slug . '/aso-templates/([^/]+)/([^/]+)/?$',
					'index.php?pagename=' . $slug . '&aso-product-id=$matches[1]&aso-tplid=$matches[2]',
					'top'
				);
	
				// Règle pour URL sans aso-tplid
				add_rewrite_rule(
					$slug . '/aso-templates/([^/]+)/?$',
					'index.php?pagename=' . $slug . '&aso-product-id=$matches[1]',
					'top'
				);
			}
		}
		$wp_rewrite->flush_rules(false);
	}
	
	
}
