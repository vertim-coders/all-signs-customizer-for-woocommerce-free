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
Text Domain: textdomain
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
        $this->aso_define_borders();
        $this->aso_define_shapes();
        $this->aso_define_fixingMethods();
        register_activation_hook( __FILE__, array( $this, 'activate' ) );
        register_deactivation_hook( __FILE__, array( $this, 'deactivate' ) );

        add_action( 'plugins_loaded', array( $this, 'init_plugin' ) );
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

        define('ASO_IMAGE_PATH', $generation_path . "image");
        define('ASO_IMAGE_URL', $generation_url . "image");

        define('ASO_ORDER_PATH', $generation_path . "ORDER");
        define('ASO_ORDER_URL', $generation_url . "ORDER");
    }

    private function aso_define_borders(){
        $borders = [
            [
                'name' => 'None',
                "icon" => "",
                'value' => 'none'
            ],
            [
                'name' => 'Normal',
                "icon" => "",
                'value' => 'normal'
            ],
            [
                'name' => 'Old World',
                "icon" => "",
                'value' => 'old-world'
            ]
        ];
        $have_borders = get_option("aso_all_borders");
        if($have_borders == false){
            update_option("aso_all_borders",$borders);
        }
    }
    private function aso_define_shapes(){
        $shapes = [
            [
                'name' => 'Oval',
                "icon" => "",
                'value' => 'oval'
            ],
            [
                'name' => 'Square',
                "icon" => "",
                'value' => 'square'
            ],
            [
                'name' => 'Triangle',
                "icon" => "",
                'value' => 'triangle'
            ],
            [
                'name' => 'Rounded Square',
                "icon" => "",
                'value' => 'rounded-square'
            ],
            [
                'name' => 'Rotated Square',
                "icon" => "",
                'value' => 'rotated-square'
            ],
            [
                'name' => 'Turn Left',
                "icon" => "",
                'value' => 'turn-left'
            ],
            [
                'name' => 'Turn Right',
                "icon" => "",
                'value' => 'turn-right'
            ],
            [
                'name' => 'Arrow Left',
                'value' => 'arrow-left'
            ],
            [
                'name' => 'Arrow Right',
                "icon" => "",
                'value' => 'arrow-right'
            ],
            [
                'name' => 'Stop',
                "icon" => "",
                'value' => 'stop'
            ],
            [
                'name' => 'Rounded Top',
                "icon" => "",
                'value' => 'rounded-top'
            ],
            [
                'name' => 'Rounded Sides',
                "icon" => "",
                'value' => 'rounded-sides'
            ]
        ];
        $have_shapes = get_option("aso_all_shapes");
        if($have_shapes == false){
            update_option("aso_all_shapes",$shapes);
        }
    }
    private function aso_define_fixingMethods(){
        $fixingMethods = [
            [
                'name' => 'None',
                "description"=>"",
                "icon" => "",
                "popImg"=>"",
                'type' => 'none'
            ],
            [
                'name' => 'Screw',
                "description"=>"",
                "icon" => "",
                "popImg"=>"",
                'type' => 'screw'
            ],
            [
                'name' => 'Screw Cap',
                "description"=>"",
                "icon" => "",
                "popImg"=>"",
                'type' => 'screw-cap'
            ],
            [
                'name' => 'Stand Off',
                "description"=>"",
                "icon" => "",
                "popImg"=>"",
                'type' => 'standoff'
            ],
            [
                'name' => 'Hanging',
                "description"=>"",
                "icon" => "",
                "popImg"=>"",
                'type' => 'hanging'
            ],
            [
                'name' => 'Flag',
                "description"=>"",
                "icon" => "",
                "popImg"=>"",
                'type' => 'flag'
            ],
            [
                'name' => 'Suction Cup',
                "description"=>"",
                "icon" => "",
                "popImg"=>"",
                'type' => 'suction-cup'
            ],
            [
                'name' => 'Table Stand',
                "description"=>"",
                "icon" => "",
                "popImg"=>"",
                'type' => 'table-stand'
            ],
            [
                'name' => 'Ceiling',
                "description"=>"",
                "icon" => "",
                "popImg"=>"",
                'type' => 'ceiling'
            ],
            [
                'name' => 'Pole Attachment',
                "description"=>"",
                "icon" => "",
                "popImg"=>"",
                'type' => 'pole-attachment'
            ],
            [
                'name' => 'Cable Labeling',
                "description"=>"",
                "icon" => "",
                "popImg"=>"",
                'type' => 'cable-labeling'
            ],
            [
                'name' => 'Table Clamp',
                "description"=>"",
                "icon" => "",
                "popImg"=>"",
                'type' => 'table-clamp'
            ],
            [
                'name' => 'Base Support',
                "description"=>"",
                "icon" => "",
                "popImg"=>"",
                'type' => 'base-support'
            ],
        ];
        $have_fixingMethods = get_option("aso_all_fixingMethods");
        if($have_fixingMethods == false){
            update_option("aso_all_fixingMethods",$fixingMethods);
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
        
        require_once ASO_INCLUDES . '/Public.php';
        require_once ASO_INCLUDES . '/Api.php';
        require_once ASO_INCLUDES . '/aso-post-type.php';
        require_once ASO_INCLUDES . '/aso-design.php';
        require_once ASO_INCLUDES . '/aso-product-config.php';
        require_once ASO_INCLUDES.'/Functions.php';
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
        (new ASO_Public())->init_hooks();
        
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

} // All_Signs_Options

$ASO = ASO_All_Signs_Options::init();