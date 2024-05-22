<?php
namespace ASO;

/**
 * Admin Pages Handler
 */
class ASO_Admin {

    public function __construct() {
        add_action( 'admin_menu', [ $this, 'admin_menu' ] );
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

        $hook = add_menu_page( __( 'ASO', 'ASO' ), __( 'ASO', 'ASO' ), $capability, $slug, [ $this, 'plugin_page' ], ASO_ASSETS.'/images/im_icon_aso.png' );

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
            <?php wp_localize_script("aso-admin","aso_data",[
                "rest_url"=>$api_url."aso/v1",
                "assets_url"=>ASO_ASSETS,
                "version"=> ASO_VERSION,
                'currencySymbol'     => class_exists( 'WooCommerce' ) ? html_entity_decode(get_woocommerce_currency_symbol()) : '',
                'currency_pos'       => class_exists( 'WooCommerce' ) ? get_option('woocommerce_currency_pos') : ''
            ]);
            wp_localize_script("aso-admin","aso_configurator_data",array(
                "fixing_methods_url"  => ASO_ASSETS.'/images/fixing-methodes',
                "borders_url"  => ASO_ASSETS.'/images/borders',
            ));
            ?>
        </div>
        <?php
    }
}
