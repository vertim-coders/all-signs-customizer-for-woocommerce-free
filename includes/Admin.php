<?php
namespace ASO;

/**
 * Admin Pages Handler
 */
class ASO_Admin {

    public function __construct() {
        add_action( 'admin_menu', [ $this, 'admin_menu' ] );
        add_filter( 'upload_mimes', [$this, 'aso_add_custom_mime_types'] );
        add_filter( 'wp_check_filetype_and_ext', [$this, 'aso_check_filetype_and_ext'], 99, 5 );
		add_action( 'wp_ajax_aso_check_product_health', [$this, 'check_product_health' ]);
		add_action( 'wp_ajax_nopriv_aso_check_product_health', [$this, 'check_product_health' ]);
    }

    /**
     * Register our menu page
     *
     * @return void
     */
    public function admin_menu() {
        global $submenu;

        $capability = 'manage_options';
        $slug       = 'aso';

        $hook = add_menu_page( __( 'All Signs Options', 'ASO' ), __( 'All Signs Options', 'ASO' ), $capability, $slug, [ $this, 'plugin_page' ], ASO_ASSETS.'/images/im_icon_aso.png' );

        if ( current_user_can( $capability ) ) {
            $submenu[ $slug ][] = array( __( 'Configurations', 'ASO' ), $capability, 'admin.php?page=' . $slug . '#/' );
            $submenu[ $slug ][] = array( __( 'Global Settings', 'ASO' ), $capability, 'admin.php?page=' . $slug . '#/global-settings/license' );
        }

        add_action( 'load-' . $hook, [ $this, 'init_hooks'] );
    }

    /**
     * Initialize our hooks for the admin page
     *
     * @return void
     */
    public function init_hooks() {
        add_action( 'admin_enqueue_scripts', [ $this, 'enqueue_scripts' ] );
    }

    /**
     * Load scripts and styles for the app
     *
     * @return void
     */
    public function enqueue_scripts() {
        wp_enqueue_style( 'aso-admin' );
        wp_enqueue_style( 'aso-frontend' );
        wp_enqueue_script( 'aso-admin' );
        wp_enqueue_script( 'aso-frontend' );
        wp_enqueue_script( 'aso-fabric' );
        wp_enqueue_style('aso-toast');
        wp_enqueue_script('aso-toast');
        wp_enqueue_script( 'aso-sortable' );
        wp_enqueue_media();
    }

    /**
     * Render our admin page
     *
     * @return void
     */
    public function plugin_page() {
        $api_url = get_rest_url(); ?>
        <div class="wrap">
            <div id="aso-admin-app"></div>
        </div>
        <?php wp_localize_script("aso-admin","aso_data",[
            "rest_url"=>$api_url."aso/v1",
            "ajax_url"=>esc_url(admin_url('admin-ajax.php')),
            "site_url"=>get_site_url(),
            "product"=>get_option("aso_product_pro", ''),
            "assets_url"=>ASO_ASSETS,
            "page"=>"admin",
            "version"=> ASO_VERSION,
            'currencySymbol'     => class_exists( 'WooCommerce' ) ? html_entity_decode(get_woocommerce_currency_symbol()) : '',
            'currency_pos'       => class_exists( 'WooCommerce' ) ? get_option('woocommerce_currency_pos') : ''
        ]);
        wp_localize_script("aso-admin","aso_configurator_data",array(
            "fixing_methods_url"  => ASO_ASSETS.'/images/fixing-methodes',
            "borders_url"  => ASO_ASSETS.'/images/borders',
        ));
    }

    public function aso_add_custom_mime_types( $mimes ) {
		return array_merge(
			$mimes,
			array(
				'svg' => 'image/svg+xml',
				'ttf' => 'application/x-font-ttf',
				'woff2' => 'application/x-font-woff2',
				'woff' => 'application/x-font-woff',
				'otf' => 'application/x-font-otf',
				'icc' => 'application/vnd.iccprofile',
			)
		);
	}

    /**
	 * Check file type and extension.
	 *
	 * @param array  $data The data.
	 * @param mixed  $file The file.
	 * @param string $filename The file name.
	 * @param array $mimes The mimes.
	 * @param string $real_mime The real mimes.
	 * @return array
	 */
	public function aso_check_filetype_and_ext( $data, $file, $filename, $mimes, $real_mime ) {
		if ( ! empty( $data['ext'] ) && ! empty( $data['type'] ) ) {
			return $data;
		}

			$wp_file_type = wp_check_filetype( $filename, $mimes );

		// Check for the file type you want to enable, e.g. 'svg'.
		if ( 'ttf' === $wp_file_type['ext'] ) {
			$data['ext']  = 'ttf';
			$data['type'] = 'font/ttf';
		}

		if ( 'otf' === $wp_file_type['ext'] ) {
			$data['ext']  = 'otf';
			$data['type'] = 'font/otf';
		}

		if ( 'woff' === $wp_file_type['ext'] ) {
			$data['ext']  = 'woff';
			$data['type'] = 'font/woff';
		}

		if ( 'woff2' === $wp_file_type['ext'] ) {
			$data['ext']  = 'woff2';
			$data['type'] = 'font/woff2';
		}

		if ( 'svg' === $wp_file_type['svg'] ) {
			$data['ext']  = 'svg';
			$data['type'] = 'image/svg+xml';
		}

		return $data;
	}
}
