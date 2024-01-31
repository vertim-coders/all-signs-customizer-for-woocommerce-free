<?php
namespace ASO;
class ASO_Post_Type
{
    public function init_hooks(){
        add_action('init',array($this,'register_aso_post_type'));
        add_action('init',array($this,'register_aso_config_meta'));

		add_action('init',array($this,'register_aso_manage_fonts'));
		add_action('init',array($this,'register_aso_manage_fonts_meta'));

		add_action('init',array($this,'register_aso_manage_cliparts'));
		add_action('init',array($this,'register_aso_manage_cliparts_meta'));

		add_action('init',array($this,'register_aso_color_palette'));
		add_action('init',array($this,'register_aso_color_palette_meta'));

		add_action('init',array($this,'register_aso_manage_size'));
		add_action('init',array($this,'register_aso_manage_size_meta'));

        add_filter( 'the_content', array($this,'get_editor_shortcode_handler'));
		add_filter( 'init', array($this,'aso_add_rewrite_rules'), 99 );
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
	 * create post type manage fonts
	 */
	public function register_aso_manage_fonts() {
		
		$labels = array(
			'name'               => _x( 'ASO Manage fonts', 'ASO' ),
			'singular_name'      => _x( 'ASO Manage fonts', 'ASO' ),
			'add_new'            => _x( 'New ASO manage fonts', 'ASO' ),
			'add_new_item'       => _x( 'New ASO manage fonts', 'ASO' ),
			'edit_item'          => _x( 'Edit ASO manage fonts', 'ASO' ),
			'new_item'           => _x( 'New ASO manage fonts', 'ASO' ),
			'view_item'          => _x( 'View ASO manage fonts', 'ASO' ),
			'not_found'          => _x( 'No ASO manage fonts', 'ASO' ),
			'not_found_in_trash' => _x( 'No ASO manage fonts in the trash', 'ASO' ),
			'menu_name'          => _x( 'All Signs Options', 'ASO' ),
			'all_items'          => _x( 'ASO Manage fonts', 'ASO' ),
		);

		$args = array(
			'labels'              => $labels,
			'hierarchical'        => false,
			'description'         => 'ASO Manage fonts',
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

		register_post_type( 'aso-manages-fonts', $args );

	}
	 /**
	 * Create meta data of aso-manages-fonts-meta
	*/
	public function register_aso_manage_fonts_meta(){
		register_meta(
			'aso-manages-fonts',
			'aso-manages-fonts-meta',
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
	 * create post type manage cliparts
	 */
	public function register_aso_manage_cliparts() {
		
		$labels = array(
			'name'               => _x( 'ASO Manage cliparts', 'ASO' ),
			'singular_name'      => _x( 'ASO Manage cliparts', 'ASO' ),
			'add_new'            => _x( 'New ASO manage cliparts', 'ASO' ),
			'add_new_item'       => _x( 'New ASO manage cliparts', 'ASO' ),
			'edit_item'          => _x( 'Edit ASO manage cliparts', 'ASO' ),
			'new_item'           => _x( 'New ASO manage cliparts', 'ASO' ),
			'view_item'          => _x( 'View ASO manage cliparts', 'ASO' ),
			'not_found'          => _x( 'No ASO manage cliparts', 'ASO' ),
			'not_found_in_trash' => _x( 'No ASO manage cliparts in the trash', 'ASO' ),
			'menu_name'          => _x( 'All Signs Options', 'ASO' ),
			'all_items'          => _x( 'ASO Manage cliparts', 'ASO' ),
		);

		$args = array(
			'labels'              => $labels,
			'hierarchical'        => false,
			'description'         => 'ASO Manage cliparts',
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

		register_post_type( 'aso-manages-cliparts', $args );

	}
	 /**
	 * Create meta data of aso-manages-cliparts-meta
	*/
	public function register_aso_manage_cliparts_meta(){
		register_meta(
			'aso-manages-cliparts',
			'aso-manages-cliparts-meta',
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
	 * create post type color palette
	 */
	public function register_aso_color_palette() {
		
		$labels = array(
			'name'               => _x( 'ASO Color palette', 'ASO' ),
			'singular_name'      => _x( 'ASO  Color palette', 'ASO' ),
			'add_new'            => _x( 'New ASO   color palette', 'ASO' ),
			'add_new_item'       => _x( 'New ASO color palette', 'ASO' ),
			'edit_item'          => _x( 'Edit ASO color palette', 'ASO' ),
			'new_item'           => _x( 'New ASO color palette', 'ASO' ),
			'view_item'          => _x( 'View ASO color palette', 'ASO' ),
			'not_found'          => _x( 'No ASO color palette', 'ASO' ),
			'not_found_in_trash' => _x( 'No ASO color palette in the trash', 'ASO' ),
			'menu_name'          => _x( 'All Signs Options', 'ASO' ),
			'all_items'          => _x( 'ASO Color palette', 'ASO' ),
		);

		$args = array(
			'labels'              => $labels,
			'hierarchical'        => false,
			'description'         => 'ASO Color palette',
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

		register_post_type( 'aso-colors-palette', $args );

	}
	/**
	 * Create meta data of aso-color-palette-meta
	*/
	public function register_aso_color_palette_meta(){
		register_meta(
			'aso-colors-palette',
			'aso-colors-palette-meta',
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
	 * create post type manage size
	 */
	public function register_aso_manage_size() {
		
		$labels = array(
			'name'               => _x( 'ASO Manage size', 'ASO' ),
			'singular_name'      => _x( 'ASO Manage size', 'ASO' ),
			'add_new'            => _x( 'New ASO manage size', 'ASO' ),
			'add_new_item'       => _x( 'New ASO manage size', 'ASO' ),
			'edit_item'          => _x( 'Edit ASO manage size', 'ASO' ),
			'new_item'           => _x( 'New ASO manage size', 'ASO' ),
			'view_item'          => _x( 'View ASO manage size', 'ASO' ),
			'not_found'          => _x( 'No ASO manage size', 'ASO' ),
			'not_found_in_trash' => _x( 'No ASO manage size in the trash', 'ASO' ),
			'menu_name'          => _x( 'All Signs Options', 'ASO' ),
			'all_items'          => _x( 'ASO Manage size', 'ASO' ),
		);

		$args = array(
			'labels'              => $labels,
			'hierarchical'        => false,
			'description'         => 'ASO Manage size',
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

		register_post_type( 'aso-manages-size', $args );

	}
	 /**
	 * Create meta data of aso-manages-fonts-meta
	*/
	public function register_aso_manage_size_meta(){
		register_meta(
			'aso-manages-sizes',
			'aso-manages-sizes-meta',
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
		$config_page_id = get_option("aso_editor_page");
		if ( get_the_ID() == $config_page_id && !isset( $wp_query->query_vars['product-id'] ) ) {
					ob_start();
		?>
		<div class="config-page-error">
			<div>				
				<p><?=esc_html__( "You are trying to access the personalization page without a product to personalize or your permalink is not on postname.", 'NCPC' );?></p>
				<p><?=esc_html__( "This page should only be accessed using one of the customization buttons.", 'NCPC' );?></p>
			</div>
		</div>
		<?php			
				
					$content .= ob_get_clean();
		}elseif ( isset( $wp_query->query_vars['product-id'] ) ) {
			$productid = $wp_query->query_vars['product-id'];

			if( is_page($config_page_id) ) {
				$content .= do_shortcode("[aso-configurator]");
			}
		}
		return $content;
	}
	public function aso_add_query_vars( $a_vars ) {
		$a_vars[] = 'product-id';
		$a_vars[] = 'tpl';
		$a_vars[] = 'edit';
		$a_vars[] = 'design-index';
		$a_vars[] = 'vcid';
		return $a_vars;
	}
	public function aso_add_rewrite_rules( $param ) {
		global $wp_rewrite;
		$option = get_option("aso_editor_page");
		if ( !empty($option) && $option != false ) {
			$aso_page_id = $option;
		} else {
			$aso_page_id = false;
		}

		if ( function_exists( 'icl_object_id' ) ) {
			$aso_page_id = icl_object_id( $aso_page_id, 'page', false, ICL_LANGUAGE_CODE );
		}
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
				$slug . $sep . 'design' . '/([^/]+)/?$',
				// The resulting internal URL: `index.php` because we still use WordPress
					// `pagename` because we use this WordPress page
					// `designer_slug` because we assign the first captured regex part to this variable
					'index.php?pagename=' . $slug . '&product-id=$matches[1]',
				// This is a rather specific URL, so we add it to the top of the list
					// Otherwise, the "catch-all" rules at the bottom (for pages and attachments) will "win"
					'top'
			);
			add_rewrite_rule(
					// The regex to match the incoming URL
				$slug . $sep . 'design' . '/([^/]+)/([^/]+)/?$',
				// The resulting internal URL: `index.php` because we still use WordPress
					// `pagename` because we use this WordPress page
					// `designer_slug` because we assign the first captured regex part to this variable
					'index.php?pagename=' . $slug . '&product-id=$matches[1]&tpl=$matches[2]',
				// This is a rather specific URL, so we add it to the top of the list
					// Otherwise, the "catch-all" rules at the bottom (for pages and attachments) will "win"
					'top'
			);
			add_rewrite_rule(
					// The regex to match the incoming URL
				$slug . $sep . 'edit' . '/([^/]+)/([^/]+)/?$',
				// The resulting internal URL: `index.php` because we still use WordPress
					// `pagename` because we use this WordPress page
					// `designer_slug` because we assign the first captured regex part to this variable
					'index.php?pagename=' . $slug . '&product-id=$matches[1]&edit=$matches[2]',
				// This is a rather specific URL, so we add it to the top of the list
					// Otherwise, the "catch-all" rules at the bottom (for pages and attachments) will "win"
					'top'
			);
			add_rewrite_rule(
					// The regex to match the incoming URL
				$slug . $sep . 'ordered-design' . '/([^/]+)/([^/]+)/?$',
				// The resulting internal URL: `index.php` because we still use WordPress
					// `pagename` because we use this WordPress page
					// `designer_slug` because we assign the first captured regex part to this variable
					'index.php?pagename=' . $slug . '&product-id=$matches[1]&vcid=$matches[2]',
				// This is a rather specific URL, so we add it to the top of the list
					// Otherwise, the "catch-all" rules at the bottom (for pages and attachments) will "win"
					'top'
			);

			add_rewrite_rule(
					// The regex to match the incoming URL
				$slug . $sep . 'saved-design' . '/([^/]+)/([^/]+)/?$',
				// The resulting internal URL: `index.php` because we still use WordPress
					// `pagename` because we use this WordPress page
					// `designer_slug` because we assign the first captured regex part to this variable
					'index.php?pagename=' . $slug . '&product-id=$matches[1]&design-index=$matches[2]',
				// This is a rather specific URL, so we add it to the top of the list
					// Otherwise, the "catch-all" rules at the bottom (for pages and attachments) will "win"
					'top'
			);

			$wp_rewrite->flush_rules( false );
		}
	}
}
