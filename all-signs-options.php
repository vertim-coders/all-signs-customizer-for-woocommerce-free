<?php

use ASO\ASO_Design;
use ASO\ASO_Post_Type;
use ASO\ASO_Public;

/*
Plugin Name: All Signs Options
Plugin URI: https://signsdesigner.us/
Description: The ultimate custom sign configurator for woocommerce.
Our custom  signs configurator allows you to extend your business of personalization of  signs by offering you a nice configurator to allow your customers to customize signs in  acrylic, metal, 2D and 3D, thanks to a highly configurable sign product builder.

Version: 1.0
Author: Vertim Coders
Author URI: https://vertimcoders.com
License: GPL2
License URI: https://www.gnu.org/licenses/gpl-2.0.html
Text Domain: ASO
Domain Path: /languages
*/

/**
 * Copyright (c) 2023 Vertim Coders. All rights reserved.
 *
 * Released under the GPL license
 * http://www.opensource.org/licenses/gpl-license.php
 *
 * This is an add-on for WordPress
 * http://wordpress.org/
 * 
 * Inspired by: https://github.com/tareq1988/vue-wp-starter
 *
 * **********************************************************************
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
 * **********************************************************************
 */

// don't call the file directly
if ( !defined( 'ABSPATH' ) ) exit;

/**
 * All_Signs_Options class
 *
 * @class All_Signs_Options The class that holds the entire All_Signs_Options plugin
 */
final class ASO_All_Signs_Options {

    /**
     * Plugin version
     *
     * @var string
     */
    public $version = '1.0';

    /**
     * Holds various class instances
     *
     * @var array
     */
    private $container = array();

    /**
     * Constructor for the All_Signs_Options class
     *
     * Sets up all the appropriate hooks and actions
     * within our plugin.
     */
    public function __construct() {

        $this->define_constants();
        $this->aso_save_output_settings();
        $this->aso_define_borders();
        $this->aso_define_shapes();
        $this->aso_define_fixingMethods();
        register_activation_hook( __FILE__, array( $this, 'activate' ) );
        register_deactivation_hook( __FILE__, array( $this, 'deactivate' ) );

        add_action( 'plugins_loaded', array( $this, 'init_plugin' ) );

        add_action('admin_notices', [$this,'check_woocommerce_install_and_version']);
        add_action('admin_notices', [$this,'check_config_pageselected']);
        add_action( 'admin_notices', [$this, 'get_license_activation_notice'] );
        add_action( 'admin_notices', [$this,'permalink_notice'] );
    }

    /**
     * Initializes the All_Signs_Options() class
     *
     * Checks for an existing All_Signs_Options() instance
     * and if it doesn't find one, creates it.
     */
    public static function init() {
        static $instance = false;

        if ( ! $instance ) {
            $instance = new ASO_All_Signs_Options();
        }

        return $instance;
    }

    /**
     * Magic getter to bypass referencing plugin.
     *
     * @param $prop
     *
     * @return mixed
     */
    public function __get( $prop ) {
        if ( array_key_exists( $prop, $this->container ) ) {
            return $this->container[ $prop ];
        }

        return $this->{$prop};
    }

    /**
     * Magic isset to bypass referencing plugin.
     *
     * @param $prop
     *
     * @return mixed
     */
    public function __isset( $prop ) {
        return isset( $this->{$prop} ) || isset( $this->container[ $prop ] );
    }

    /**
     * Define the constants
     *
     * @return void
     */
    public function define_constants() {
        define( 'ASO_VERSION', $this->version );
        define( 'ASO_FILE', __FILE__ );
        define( 'ASO_PATH', dirname( ASO_FILE ) );
        define( 'ASO_INCLUDES', ASO_PATH . '/includes' );
        define( 'ASO_URL', plugins_url( '', ASO_FILE ) );
        define( 'ASO_ASSETS', ASO_URL . '/assets' );

        $upload_dir = wp_upload_dir();
        $generation_path = $upload_dir['basedir'] . "/ASO/";
        $generation_url = $upload_dir['baseurl'] . "/ASO/";

        define('ASO_IMAGE_PATH', $generation_path . "images");
        define('ASO_IMAGE_URL', $generation_url . "images");

        define('ASO_ORDER_PATH', $generation_path . "ORDERS");
        define('ASO_ORDER_URL', $generation_url . "ORDERS");
    }

    private function aso_save_output_settings(){
        $output_settings = [
            "zipName"=>true,
            "calculateOutput"=>true
        ];
        $have_output_settings = get_option("aso_output_options");
        if($have_output_settings == false){
            update_option("aso_output_options",$output_settings);
        }
    }
    private function aso_define_borders(){
        $borders = [
            [
                'name' => 'None',
                "icon" => ASO_ASSETS.'/images/borders/ic_border_none.svg',
                'value' => 'none'
            ],
            [
                'name' => 'Normal',
                "icon" => ASO_ASSETS.'/images/borders/ic_border_thin.svg',
                'value' => 'normal'
            ],
            [
                'name' => 'Rounded Corners',
                "icon" => ASO_ASSETS.'/images/borders/ic_border_rounded_corners.svg',
                'value' => 'rounded-corners'
            ],
            [
                'name' => 'Old World',
                "icon" => ASO_ASSETS.'/images/borders/ic_border_old_world.svg',
                'value' => 'old-world'
            ]
        ];
        $have_borders = get_option("aso_all_borders");
        if($have_borders == false){
            update_option("aso_all_borders",$borders);
        }else{
            $differenceCles = array_diff_key($borders,$have_borders);
            if(count($differenceCles)>0){
                foreach ($differenceCles as $key => $value) {
                    $have_borders[$key]=$value;
                }
                update_option("aso_all_borders",$have_borders);
            }
        }
    }
    private function aso_define_shapes(){
        $shapes = [
            [
                'name' => 'Oval',
                "icon" => ASO_ASSETS.'/images/shapes/ic_shape_oval.svg',
                'value' => 'oval'
            ],
            [
                'name' => 'Square',
                "icon" => ASO_ASSETS.'/images/shapes/ic_shape_square.svg',
                'value' => 'square'
            ],
            [
                'name' => 'Triangle',
                "icon" => ASO_ASSETS.'/images/shapes/ic_shape_triangle.svg',
                'value' => 'triangle'
            ],
            [
                'name' => 'Rounded Square',
                "icon" => ASO_ASSETS.'/images/shapes/ic_shape_rounded.svg',
                'value' => 'rounded-square'
            ],
            [
                'name' => 'Rotated Square',
                "icon" => ASO_ASSETS.'/images/shapes/ic_shape_rotated_square.svg',
                'value' => 'rotated-square'
            ],
            [
                'name' => 'Turn Left',
                "icon" => ASO_ASSETS.'/images/shapes/ic_shape_turn_left.svg',
                'value' => 'turn-left'
            ],
            [
                'name' => 'Turn Right',
                "icon" => ASO_ASSETS.'/images/shapes/ic_shape_turn_right.svg',
                'value' => 'turn-right'
            ],
            [
                'name' => 'Arrow Left',
                "icon" => ASO_ASSETS.'/images/shapes/ic_shape_arrow_left.svg',
                'value' => 'arrow-left'
            ],
            [
                'name' => 'Arrow Right',
                "icon" => ASO_ASSETS.'/images/shapes/ic_shape_arrow_right.svg',
                'value' => 'arrow-right'
            ],
            [
                'name' => 'Stop',
                "icon" => ASO_ASSETS.'/images/shapes/ic_shape_stop.svg',
                'value' => 'stop'
            ],
            [
                'name' => 'Rounded Top',
                "icon" => ASO_ASSETS.'/images/shapes/ic_shape_rounded_top.svg',
                'value' => 'rounded-top'
            ],
            [
                'name' => 'Rounded Sides',
                "icon" => ASO_ASSETS.'/images/shapes/ic_shape_rounded_sides.svg',
                'value' => 'rounded-sides'
            ]
        ];
       $have_shapes = get_option("aso_all_shapes");
        if($have_shapes == false){
            update_option("aso_all_shapes",$shapes);
        }else{
            $differenceCles = array_diff_key($shapes,$have_shapes);
            if(count($differenceCles)>0){
                foreach ($differenceCles as $key => $value) {
                    $have_shapes[$key]=$value;
                }
                update_option("aso_all_shapes",$have_shapes);
            }
        }
    }
    private function aso_define_fixingMethods(){
        $fixingMethods = [
            [
                'name' => 'None',
                "description"=>"",
                "icon" => ASO_ASSETS.'/images/fixing-methodes/ic_fixmethod_none.svg',
                "popImg"=>"",
                'type' => 'none'
            ],
            [
                'name' => 'Adhesive Tape',
                "description"=>"",
                "icon" => ASO_ASSETS.'/images/fixing-methodes/ic_fixmethod_adhesive_tape.svg',
                "popImg"=>"",
                'type' => 'adhesive-tape'
            ],
            [
                'name' => 'Screw',
                "description"=>"",
                "icon" => ASO_ASSETS.'/images/fixing-methodes/ic_fixmethod_screw.svg',
                "popImg"=>"",
                'type' => 'screw'
            ],
            [
                'name' => 'Screw Cap',
                "description"=>"",
                "icon" => ASO_ASSETS.'/images/fixing-methodes/ic_fixmethod_screw_cap.svg',
                "popImg"=>"",
                'type' => 'screw-cap'
            ],
            [
                'name' => 'Stand Off',
                "description"=>"",
                "icon" => ASO_ASSETS.'/images/fixing-methodes/ic_fixmethod_standoff.svg',
                "popImg"=>"",
                'type' => 'standoff'
            ],
            [
                'name' => 'Hanging',
                "description"=>"",
                "icon" => ASO_ASSETS.'/images/fixing-methodes/ic_fixmethod_hanging.svg',
                "popImg"=>"",
                'type' => 'hanging'
            ],
            [
                'name' => 'Flag',
                "description"=>"",
                "icon" => ASO_ASSETS.'/images/fixing-methodes/ic_fixmethod_flag.svg',
                "popImg"=>"",
                'type' => 'flag'
            ],
            [
                'name' => 'Suction Cup',
                "description"=>"",
                "icon" => ASO_ASSETS.'/images/fixing-methodes/ic_fixmethod_suction_cup.svg',
                "popImg"=>"",
                'type' => 'suction-cup'
            ],
            [
                'name' => 'Table Stand',
                "description"=>"",
                "icon" => ASO_ASSETS.'/images/fixing-methodes/ic_fixmethod_table_stand.svg',
                "popImg"=>"",
                'type' => 'table-stand'
            ],
            [
                'name' => 'Ceiling',
                "description"=>"",
                "icon" => ASO_ASSETS.'/images/fixing-methodes/ic_fixmethod_ceiling.svg',
                "popImg"=>"",
                'type' => 'ceiling'
            ],
            [
                'name' => 'Pole Attachment',
                "description"=>"",
                "icon" => ASO_ASSETS.'/images/fixing-methodes/ic_fixmethod_pole_attachment.svg',
                "popImg"=>"",
                'type' => 'pole-attachment'
            ],
            [
                'name' => 'Cable Labeling',
                "description"=>"",
                "icon" => ASO_ASSETS.'/images/fixing-methodes/ic_fixmethod_cable_label.svg',
                "popImg"=>"",
                'type' => 'cable-labeling'
            ],
            [
                'name' => 'Table Clamp',
                "description"=>"",
                "icon" => ASO_ASSETS.'/images/fixing-methodes/ic_fixmethod_table_clamp.svg',
                "popImg"=>"",
                'type' => 'table-clamp'
            ],
            [
                'name' => 'Base Support',
                "description"=>"",
                "icon" => ASO_ASSETS.'/images/fixing-methodes/ic_fixmethod_base_support.svg',
                "popImg"=>"",
                'type' => 'base-support'
            ],
            [
                'name' => 'Magnetic Strip',
                "description"=>"",
                "icon" => ASO_ASSETS.'/images/fixing-methodes/ic_fixmethod_magnetic_strip.svg',
                "popImg"=>"",
                'type' => 'magnetic-strip'
            ],
            [
                'name' => 'Keyring',
                "description"=>"",
                "icon" => ASO_ASSETS.'/images/fixing-methodes/ic_fixmethod_keyring.svg',
                "popImg"=>"",
                'type' => 'keyring'
            ],
            [
                'name' => 'Sign Holder',
                "description"=>"",
                "icon" => ASO_ASSETS.'/images/fixing-methodes/ic_fixmethod_sign_holder.svg',
                "popImg"=>"",
                'type' => 'sign-holder'
            ],
            [
                'name' => 'Eyelets',
                "description"=>"",
                "icon" => ASO_ASSETS.'/images/fixing-methodes/ic_fixmethod_eyelets.svg',
                "popImg"=>"",
                'type' => 'eyelets'
            ],
            [
                'name' => 'S Hook',
                "description"=>"",
                "icon" => ASO_ASSETS.'/images/fixing-methodes/ic_fixmethod_s_hook.svg',
                "popImg"=>"",
                'type' => 's-hook'
            ],
            [
                'name' => 'Roll Up',
                "description"=>"",
                "icon" => ASO_ASSETS.'/images/fixing-methodes/ic_fixmethod_roll_up.svg',
                "popImg"=>"",
                'type' => 'roll-up'
            ],
        ];
        $have_fixingMethods = get_option("aso_all_fixingMethods");
        if($have_fixingMethods == false){
            update_option("aso_all_fixingMethods",$fixingMethods);
        }else{
            $differenceCles = array_diff_key($fixingMethods,$have_fixingMethods);
            if(count($differenceCles)>0){
                foreach ($differenceCles as $key => $value) {
                    $have_fixingMethods[$key]=$value;
                }
                update_option("aso_all_fixingMethods",$have_fixingMethods);
            }
        }
    }

    /**
     * Load the plugin after all plugins are loaded
     *
     * @return void
     */
    public function init_plugin() {
        $this->includes();
        $this->init_hooks();
    }

    /**
     * Placeholder for activation function
     *
     * Nothing being called here yet.
     */
    public function activate() {

        $installed = get_option( 'ASO_installed' );

        if ( ! $installed ) {
            update_option( 'ASO_installed', time() );
        }

        update_option( 'ASO_version', ASO_VERSION );
    }

    /**
     * Placeholder for deactivation function
     *
     * Nothing being called here yet.
     */
    public function deactivate() {

    }

    /**
     * Include the required files
     *
     * @return void
     */
    public function includes() {

        require_once ASO_INCLUDES . '/Assets.php';

        if ( $this->is_request( 'admin' ) ) {
            require_once ASO_INCLUDES . '/Admin.php';
        }
        
        if ( $this->is_request( 'frontend' ) ) {
            require_once ASO_INCLUDES . '/Frontend.php';
        }
        
        if ( $this->is_request( 'ajax' ) ) {
            // require_once ASO_INCLUDES . '/class-ajax.php';
        }
        
        require_once ASO_INCLUDES . '/Api.php';
        require_once ASO_INCLUDES . '/aso-post-type.php';
        require_once ASO_INCLUDES . '/aso-design.php';
        require_once ASO_INCLUDES . '/aso-product-config.php';
        require_once ASO_INCLUDES.'/Functions.php';
        require_once ASO_INCLUDES . '/Public.php';
    }

    /**
     * Initialize the hooks
     *
     * @return void
     */
    public function init_hooks() {

        add_action( 'init', array( $this, 'init_classes' ) );

        (new ASO_Post_Type())->init_hooks();
        (new ASO_Product_Config())->init_hooks();
        (new ASO_Design())->init_hooks();
        
        // Localize our plugin
        add_action( 'init', array( $this, 'localization_setup' ) );
    }

    /**
     * Instantiate the required classes
     *
     * @return void
     */
    public function init_classes() {

        if ( $this->is_request( 'admin' ) ) {
            $this->container['admin'] = new ASO\ASO_Admin();
        }

        if ( $this->is_request( 'frontend' ) ) {
            $this->container['frontend'] = new ASO\ASO_Frontend();
        }

        if ( $this->is_request( 'ajax' ) ) {
            // $this->container['ajax'] =  new ASO\Ajax();
        }

        $this->container['api'] = new ASO\Api();
        $this->container['public'] = new ASO\ASO_Public();
        $this->container['assets'] = new ASO\Assets();
    }

    /**
     * Initialize plugin for localization
     *
     * @uses load_plugin_textdomain()
     */
    public function localization_setup() {
        load_plugin_textdomain( 'ASO', false, dirname( plugin_basename( __FILE__ ) ) . '/languages/' );
    }

    /**
     * What type of request is this?
     *
     * @param  string $type admin, ajax, cron or frontend.
     *
     * @return bool
     */
    private function is_request( $type ) {
        switch ( $type ) {
            case 'admin' :
                return is_admin();

            case 'ajax' :
                return defined( 'DOING_AJAX' );

            case 'rest' :
                return defined( 'REST_REQUEST' );

            case 'cron' :
                return defined( 'DOING_CRON' );

            case 'frontend' :
                return ( ! is_admin() || defined( 'DOING_AJAX' ) ) && ! defined( 'DOING_CRON' );
        }
    }

    public function check_config_pageselected() {
        if ( class_exists( 'WooCommerce' ) ) {
            $PageSettings = get_option('aso_config_page',[]);
            if ( count($PageSettings) == 0 ) {
                ?>
                <div class="notice notice-warning aso-notice-nux is-dismissible">
                    <span class="aso-icon">
                        <img src="<?php echo esc_url(ASO_ASSETS.'/images/im_aso-icon2.png')?>" alt="" width="250"/>
                    </span>
                    <div>
                        <h2><?php esc_html_e( "Customization Page not found", 'ASO' ) ?></h2>
                        <p><?php _e( 'To display the configurator on a page without a short code, please select the page on which it should be displayed. Click <a href="admin.php?page=aso#/global-settings/configuration-page">here</a>', 'ASO' ); ?></p>
                    </div>
                </div>
                <?php
            }else{
                
                if((!get_post_status($PageSettings["configuratorPage"]) && $PageSettings["configuratorPage"] != 0) || $PageSettings["configuratorPage"]==0){
                    ?>
                    <div class="notice notice-warning aso-notice-nux is-dismissible">
                        <span class="aso-icon">
                            <img src="<?php echo esc_url(ASO_ASSETS.'/images/im_aso-icon2.png')?>" alt="" width="250"/>
                        </span>
                        <div>
                            <h2><?php esc_html_e( "Customization Page not found", 'ASO' ) ?></h2>
                            <p><?php _e( 'Configuration page is not defined for ASO plugin. Click <a href="admin.php?page=aso#/global-settings/configuration-page">here</a>', 'ASO' ); ?></p>
                        </div>
                    </div>
                    <?php
                }
            }
        }
    }
    /**
     * Check if Woocommerce is installed
     */
    public function check_woocommerce_install_and_version($version = '3.4.0') {
        if ( class_exists( 'WooCommerce' ) ) {
            global $woocommerce;
            if ( version_compare( $woocommerce->version, $version, '<' ) ) {
                ?>
                <div class="notice notice-info aso-notice-nux is-dismissible">
                    <span class="aso-icon">
                        <img src="<?php echo esc_url(ASO_ASSETS.'/images/im_aso-icon2.png')?>" alt="" width="250"/>
                    </span>
                    <div>
                        <h2><?php esc_html_e( "Welcome to All Signs Options. Let's get you started !!!", 'ASO' ) ?></h2>
						<p><?php esc_html_e( 'To avoid performance problems we recommend at least version 3.4 of Woocommerce.', 'ASO' ); ?></p>
                        <p><?php $this->install_plugin_button( 'woocommerce', 'woocommerce.php', 'WooCommerce', array(), __( 'WooCommerce activated', 'ASO' ), __( 'Activate WooCommerce', 'ASO' ), __( 'Install WooCommerce', 'ASO' ) ); ?></p>
                    </div>
                </div>
                <?php
            }
            
        }else {
            ?>
            <div class="notice notice-info aso-notice-nux is-dismissible">
                <span class="aso-icon">
                    <img src="<?php echo esc_url(ASO_ASSETS.'/images/im_aso-icon2.png')?>" alt="" width="250"/>
                </span>
                <div>
                    <h2><?php esc_html_e( "Welcome to All Signs Options. Let's get you started !!!", 'ASO' ) ?></h2>
                    <p><?php esc_html_e( 'To enable eCommerce features you need to install or activate the WooCommerce plugin.', 'ASO' ); ?></p>
                    <p><?php $this->install_plugin_button( 'woocommerce', 'woocommerce.php', 'WooCommerce', array(), __( 'WooCommerce activated', 'ASO' ), __( 'Activate WooCommerce', 'ASO' ), __( 'Install WooCommerce', 'ASO' ) ); ?></p>
                </div>
            </div>
            <?php
        }
    }

    /**
     * Output a button that will install or activate a plugin if it doesn't exist, or display a disabled button if the
     * plugin is already activated.
     *
     * @param string $plugin_slug The plugin slug.
     * @param string $plugin_file The plugin file.
     * @param string $plugin_name The plugin name.
     * @param array $classes CSS classes.
     * @param string $activated Button activated text.
     * @param string $activate Button activate text.
     * @param string $install Button install text.
     */
    public static function install_plugin_button( $plugin_slug, $plugin_file, $plugin_name, $classes = array(), $activated = '', $activate = '', $install = '' ) {
        if ( current_user_can( 'install_plugins' ) && current_user_can( 'activate_plugins' ) ) {
            if ( is_plugin_active( $plugin_slug . '/' . $plugin_file ) ) {
                // The plugin is already active.
                $button = array(
                    'message' => esc_attr__( 'Activated', 'ASO' ),
                    'url'     => '#',
                    'classes' => array( 'storefront-button', 'disabled' ),
                );

                if ( '' !== $activated ) {
                    $button['message'] = esc_attr( $activated );
                }
            } elseif ( self::is_plugin_installed( $plugin_slug ) ) {
                $url = self::is_plugin_installed( $plugin_slug );

                // The plugin exists but isn't activated yet.
                $button = array(
                    'message' => esc_attr__( 'Activate', 'ASO' ),
                    'url'     => $url,
                    'classes' => array( 'activate-now' ),
                );

                if ( '' !== $activate ) {
                    $button['message'] = esc_attr( $activate );
                }
            } 

            if ( ! empty( $classes ) ) {
                $button['classes'] = array_merge( $button['classes'], $classes );
            }
            if(isset($button) && is_array($button)) {

            $button['classes'] = implode( ' ', $button['classes'] );

            ?>
            <span class="plugin-card-<?php echo esc_attr( $plugin_slug ); ?>">
                <a href="<?php echo esc_url( $button['url'] ); ?>" class="<?php echo esc_attr( $button['classes'] ); ?>" data-originaltext="<?php echo esc_attr( $button['message'] ); ?>" data-name="<?php echo esc_attr( $plugin_name ); ?>" data-slug="<?php echo esc_attr( $plugin_slug ); ?>" aria-label="<?php echo esc_attr( $button['message'] ); ?>"><?php echo esc_html( $button['message'] ); ?></a>
            </span> <?php echo /* translators: conjunction of two alternative options user can choose (in missing plugin admin notice). Example: "Activate WooCommerce or learn more" */ esc_html__( 'or', 'ASO' ); ?>
            <a href="https://docs.signsdesigner.us" target="_blank"><?php esc_html_e( 'learn more', 'ASO' ); ?></a>
            <?php
            }
        }
    }
    private static function is_plugin_installed( $plugin_slug ) {
        $plugin_folders = plugins_url();
        if ( $plugin_folders . '/' . $plugin_slug ) {
            $plugins = get_plugins( '/' . $plugin_slug );
            if ( ! empty( $plugins ) ) {
                $keys        = array_keys( $plugins );
                $plugin_file = $plugin_slug . '/' . $keys[0];
                $url         = wp_nonce_url(
                    add_query_arg(
                        array(
                            'action' => 'activate',
                            'plugin' => $plugin_file,
                        ),
                        admin_url( 'plugins.php' )
                    ),
                    'activate-plugin_' . $plugin_file
                );
                return $url;
            }
        }
        return false;
    }

    /**
     * 
     */
    public function permalink_notice() {

        $current_permalink_structure = get_option( 'permalink_structure' );
        
        if ( $current_permalink_structure !== '/%postname%/' ) { ?>
        
            <div class="notice notice-warning aso-notice-nux is-dismissible">
                <span class="aso-icon">
                    <img src='<?php echo esc_url(ASO_ASSETS.'/images/im_aso-icon2.png')?>' alt="" width="250"/>
                </span>
                <div>
                    <h2><?php esc_html_e( 'We recommend setting your permalinks to "/%postname%/" to improve natural SEO.w! 🤘', 'ASO' ) ?></h2>
                    <p><?php esc_html_e( 'To do this, go to',"ASO")?> <a href="<?php echo admin_url('options-permalink.php')?>"><?php echo esc_html_e("Settings > Permanent links","ASO")?></a></p>
                </div>
            </div>
      <?php  }
    
    }

    /**
	 * Get licence activation notice.
	 *
	 * @return void
	 */
    public function get_license_activation_notice() {

        if ( class_exists( 'WooCommerce' ) ) {
            $aso_settings = get_option("aso_pro_license");
            

            if ( empty( $aso_settings ) ) {
                ?>
                    <div class="notice notice-warning aso-licence-warning">
                        <p><b>All Signs Options Pro: </b><?php _e( "No license key found in the settings. Please click <a href='admin.php?page=aso#/global-settings/license'>here</a> to define one.", 'ASO' ); ?></p>
                    </div>
                <?php
            } else {
                if(empty(get_option( 'aso_pro_activate_license')) || get_option( 'aso_pro_activate_license') == false){ ?>
                    <div class="notice notice-error aso-licence-warning" style="display:none!important">
                        <p><b>All Signs Options Pro: </b><?php _e( 'You have not yet activated your license or your license is not valid. Please activate it in order to get the plugin working.', 'ASO' ); ?></p>
                        <a href='admin.php?page=aso#/global-settings/license'><?php echo _e("Go to activate","ASO")?></a>
                        <div id="aso-license-message"></div>
                    </div>
            <?php }
            }
        }
	}

} // All_Signs_Options

$ASO = ASO_All_Signs_Options::init();