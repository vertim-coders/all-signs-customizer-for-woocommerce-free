<?php
namespace ASO;

/**
 * Admin Pages Handler
 */
class Admin {

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

        $hook = add_menu_page( __( 'ASO', 'ASO' ), __( 'ASO', 'ASO' ), $capability, $slug, [ $this, 'plugin_page' ], 'dashicons-layout' );

        if ( current_user_can( $capability ) ) {
            $submenu[ $slug ][] = array( __( 'App', 'ASO' ), $capability, 'admin.php?page=' . $slug . '#/' );
            $submenu[ $slug ][] = array( __( 'Options', 'ASO' ), $capability, 'admin.php?page=' . $slug . '#/options' );
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
        wp_enqueue_style( 'aso-style' );
        wp_enqueue_script( 'aso-admin' );
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
                "rest_url"=>$api_url."aso/v1"
            ]);?>
        </div>
        <?php
    }
}
