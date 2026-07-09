<?php
/**
 * Plugin bootstrap file.
 *
 * @package All_Signs_Customizer_For_WooCommerce_Free
 */

use ASCWO\ASCWO_Post_Type;

/*
Plugin Name: All Sign Customizer for WooCommerce
Plugin URI: https://signsdesigner.us/
Description: Add a sign configurator to WooCommerce products so customers can design and order custom signs directly from your store.
Requires Plugins: woocommerce
Version: 1.0
Author: Vertim Coders
Author URI: https://vertimcoders.com
License: GPL2
License URI: https://www.gnu.org/licenses/gpl-2.0.html
Text Domain: all-signs-customizer-for-woocommerce
Domain Path: /languages/
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

// Exit if accessed directly.
if (!defined('ABSPATH')) {
    exit;
}

/**
 * All_Signs_Options class
 *
 * @class All_Signs_Options The class that holds the entire All_Signs_Options plugin
 */
final class ASCWO_All_Signs_Options_Pro
{

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
    public function __construct()
    {
        $this->define_constants();
        $this->ascwo_save_output_settings();
        $this->ascwo_save_pages_settings();
        $this->ascwo_define_borders();
        $this->ascwo_define_shapes();
        $this->ascwo_define_fixingMethods();


        register_activation_hook(__FILE__, array($this, 'activate'));
        register_deactivation_hook(__FILE__, array($this, 'deactivate'));

        add_filter('plugin_row_meta', [$this, 'warning_message_for_woocommerce_missing'], 10, 2);
        add_action('admin_init', [$this, 'auto_deactivate_when_woocommerce_is_inactive']);
        add_filter('plugin_action_links', [$this, 'modify_action_links'], 99, 2);
        add_action('plugins_loaded', array($this, 'init_plugin'));
        add_action('admin_notices', [$this, 'check_woocommerce_install_and_version']);
        add_action('admin_notices', [$this, 'check_config_pageselected']);
        add_action('admin_notices', [$this, 'get_not_available_notice']);
        add_action('admin_notices', [$this, 'permalink_notice']);

    }

    /**
     * Add plugin action links in the WordPress plugins screen.
     *
     * @param array  $actions     Existing action links.
     * @param string $plugin_file Current plugin file.
     *
     * @return array
     */
    public function modify_action_links($actions, $plugin_file)
    {
        include_once(ABSPATH . 'wp-admin/includes/plugin.php');
        if ($plugin_file === plugin_basename(__FILE__)) {
            if (is_plugin_active('woocommerce/woocommerce.php')) {
                if (isset($actions['activate'])) {
                    unset($actions['activate']);
                }
                $actions['go_docs'] = sprintf('<a href="%s" style="%s">%s</a>', 'https://docs.signsdesigner.us/docs/ascwo-wp-documentation/', 'color:#35b747;font-weight:bold', __('Go Docs!', 'all-signs-customizer-for-woocommerce'));
            }
        }
        return $actions;
    }

    /**
     * Auto-deactivate the plugin when WooCommerce is unavailable.
     *
     * @return void
     */
    public function auto_deactivate_when_woocommerce_is_inactive()
    {
        if (!is_plugin_active('woocommerce/woocommerce.php') && is_plugin_active(plugin_basename(__FILE__))) {
            deactivate_plugins(plugin_basename(__FILE__));
        }
    }

    /**
     * Show a plugin row notice when WooCommerce is missing.
     *
     * @param array  $plugin_meta Existing plugin row metadata.
     * @param string $plugin_file Current plugin file.
     *
     * @return array
     */
    public function warning_message_for_woocommerce_missing($plugin_meta, $plugin_file)
    {
        if (plugin_basename(__FILE__) === $plugin_file) {
            if (!is_plugin_active('woocommerce/woocommerce.php')) {
                $plugin_meta[] = '<span style="color: red;"><strong>' . esc_html__("This plugin requires WooCommerce to run. Please install or activate WooCommerce.", "all-signs-customizer-for-woocommerce") . '</strong></span>';
            }
        }
        return $plugin_meta;
    }

    /**
     * Initialize the plugin singleton.
     */
    public static function init()
    {
        static $instance = false;

        if (!$instance) {
            $instance = new ASCWO_All_Signs_Options_Pro();
        }

        return $instance;
    }

    /**
     * Magic getter for lazily stored plugin properties.
     *
     * @param string $prop Property name.
     *
     * @return mixed
     */
    public function __get($prop)
    {
        if (array_key_exists($prop, $this->container)) {
            return $this->container[$prop];
        }

        return $this->{$prop};
    }

    /**
     * Magic isset for lazily stored plugin properties.
     *
     * @param string $prop Property name.
     *
     * @return bool
     */
    public function __isset($prop)
    {
        return isset($this->{$prop}) || isset($this->container[$prop]);
    }

    /**
     * Define plugin-wide constants.
     *
     * @return void
     */
    public function define_constants()
    {
        define('ASCWO_VERSION', $this->version);
        define('ASCWO_ID', 7326);
        define('ASCWO_FILE', __FILE__);
        define('ASCWO_PATH', dirname(ASCWO_FILE));
        define('ASCWO_INCLUDES', ASCWO_PATH . '/includes');
        define('ASCWO_URL', plugins_url('', ASCWO_FILE));
        define('ASCWO_ASSETS', ASCWO_URL . '/assets');

        define("ASCWO_CHECK_TRANSIENT_EXPIRATION", 24 * HOUR_IN_SECONDS); // 24 hours
        define("ASCWO_CHECK_TRANSIENT_NAME", "wp_update_check_ascwo_pro");

        $upload_dir = wp_upload_dir();
        $generation_path = $upload_dir['basedir'] . "/ASCWO/";
        $generation_url = $upload_dir['baseurl'] . "/ASCWO/";

        define('ASCWO_IMAGE_PATH', $generation_path . "images");
        define('ASCWO_IMAGE_URL', $generation_url . "images");

        define('ASCWO_ORDER_PATH', $generation_path . "ORDERS");
        define('ASCWO_ORDER_URL', $generation_url . "ORDERS");

        define('ASCWO_DATA_PATH', $generation_path . "data");
        define('ASCWO_DATA_URL', $generation_url . "data");
    }

    /**
     * Seed the default output settings on first install.
     */
    private function ascwo_save_output_settings()
    {
        $output_settings = [
            "zipName" => true,
            "calculateOutput" => true
        ];
        $have_output_settings = get_option("ascwo_output_options");
        if ($have_output_settings === false) {
            update_option("ascwo_output_options", $output_settings);
        }
    }

    /**
     * Seed the default configuration page settings on first install.
     */
    private function ascwo_save_pages_settings()
    {
        $pages_settings = [
            "configuratorPage" => 0,
            "templatePage" => 0,
            "buttons" => [
                "productDesignButton" => 'Customize The Product',
                "productTemplateButton" => 'Design From Example',
                "templateAddToCartButton" => 'Add To Cart',
                "templateDesignButton" => 'Customize',
                "allTemplatesText" => 'All',
                "recapsButtonOnCart" => 'Sign Recaps'
            ],
            "others" => [
                "titleBalise" => 'h1'
            ],
        ];
        $have_pages_settings = get_option("ascwo_config_page");
        if ($have_pages_settings === false) {
            update_option("ascwo_config_page", $pages_settings);
        } else {
            $differenceCles = array_diff_key($pages_settings, $have_pages_settings);
            if (count($differenceCles) > 0) {
                foreach ($differenceCles as $key => $value) {
                    $have_pages_settings[$key] = $value;
                }
                update_option("ascwo_config_page", $have_pages_settings);
            }
        }
    }

    /**
     * Keep only the free-version defaults, preserving stored overrides for those entries.
     *
     * @param array $items    Stored items.
     * @param array $defaults Default items.
     * @param int   $limit    Maximum number of entries.
     *
     * @return array
     */
    private function ascwo_limit_global_items(array $items, array $defaults, int $limit)
    {
        $defaults = array_values(array_slice($defaults, 0, $limit));
        $items = array_values(array_filter($items, 'is_array'));
        $lookup = array();

        foreach ($items as $item) {
            if (isset($item['id']) && $item['id'] !== '') {
                $lookup[(string) $item['id']] = $item;
            }
        }

        $limited = array();
        foreach ($defaults as $default) {
            $default_id = isset($default['id']) ? (string) $default['id'] : '';
            if ($default_id !== '' && isset($lookup[$default_id])) {
                $limited[] = array_replace($default, $lookup[$default_id]);
            } else {
                $limited[] = $default;
            }
        }

        return $limited;
    }
    /**
     * Seed border defaults used by the global settings screens.
     */
    private function ascwo_define_borders()
    {
        $borders = array_slice([
            [
                'id' => 'border-none',
                'name' => 'None',
                "icon" => ASCWO_ASSETS . '/images/borders/ic_border_none.svg',
                'value' => 'none'
            ],
            [
                'id' => 'border-normal',
                'name' => 'Normal',
                "icon" => ASCWO_ASSETS . '/images/borders/ic_border_thin.svg',
                'value' => 'normal'
            ],
            [
                'id' => 'border-rounded-corners',
                'name' => 'Rounded Corners',
                "icon" => ASCWO_ASSETS . '/images/borders/ic_border_rounded_corners.svg',
                'value' => 'rounded-corners'
            ],
            [
                'id' => 'border-old-world',
                'name' => 'Old World',
                "icon" => ASCWO_ASSETS . '/images/borders/ic_border_old_world.svg',
                'value' => 'old-world'
            ]
        ], 0, 2);
        $limited_borders = $this->ascwo_limit_global_items($borders, $borders, 2);
        update_option("ascwo_all_borders", $this->ascwo_limit_global_items((array) get_option("ascwo_all_borders", array()), $limited_borders, 2));
    }
    /**
     * Seed shape defaults used by the global settings screens.
     */
    private function ascwo_define_shapes()
    {
        $shapes = array_slice([
            [
                'id' => 'shape-oval',
                'name' => 'Oval',
                "icon" => ASCWO_ASSETS . '/images/shapes/ic_shape_oval.svg',
                'value' => 'oval'
            ],
            [
                'id' => 'shape-square',
                'name' => 'Square',
                "icon" => ASCWO_ASSETS . '/images/shapes/ic_shape_square.svg',
                'value' => 'square'
            ],
            [
                'id' => 'shape-triangle',
                'name' => 'Triangle',
                "icon" => ASCWO_ASSETS . '/images/shapes/ic_shape_triangle.svg',
                'value' => 'triangle'
            ],
            [
                'id' => 'shape-rounded-square',
                'name' => 'Rounded Square',
                "icon" => ASCWO_ASSETS . '/images/shapes/ic_shape_rounded.svg',
                'value' => 'rounded-square'
            ],
            [
                'id' => 'shape-rotated-square',
                'name' => 'Rotated Square',
                "icon" => ASCWO_ASSETS . '/images/shapes/ic_shape_rotated_square.svg',
                'value' => 'rotated-square'
            ],
            [
                'id' => 'shape-turn-left',
                'name' => 'Turn Left',
                "icon" => ASCWO_ASSETS . '/images/shapes/ic_shape_turn_left.svg',
                'value' => 'turn-left'
            ],
            [
                'id' => 'shape-turn-right',
                'name' => 'Turn Right',
                "icon" => ASCWO_ASSETS . '/images/shapes/ic_shape_turn_right.svg',
                'value' => 'turn-right'
            ],
            [
                'id' => 'shape-arrow-left',
                'name' => 'Arrow Left',
                "icon" => ASCWO_ASSETS . '/images/shapes/ic_shape_arrow_left.svg',
                'value' => 'arrow-left'
            ],
            [
                'id' => 'shape-arrow-right',
                'name' => 'Arrow Right',
                "icon" => ASCWO_ASSETS . '/images/shapes/ic_shape_arrow_right.svg',
                'value' => 'arrow-right'
            ],
            [
                'id' => 'shape-stop',
                'name' => 'Stop',
                "icon" => ASCWO_ASSETS . '/images/shapes/ic_shape_stop.svg',
                'value' => 'stop'
            ],
            [
                'id' => 'shape-rounded-top',
                'name' => 'Rounded Top',
                "icon" => ASCWO_ASSETS . '/images/shapes/ic_shape_rounded_top.svg',
                'value' => 'rounded-top'
            ],
            [
                'id' => 'shape-rounded-sides',
                'name' => 'Rounded Sides',
                "icon" => ASCWO_ASSETS . '/images/shapes/ic_shape_rounded_sides.svg',
                'value' => 'rounded-sides'
            ],
            [
                'id' => 'shape-cut-to-shape',
                'name' => 'Cut To Shape',
                "icon" => ASCWO_ASSETS . '/images/shapes/ic_shape_cut_to_shape.svg',
                'value' => 'cut-to-shape'
            ]
        ], 0, 4);
        $limited_shapes = $this->ascwo_limit_global_items($shapes, $shapes, 4);
        update_option("ascwo_all_shapes", $this->ascwo_limit_global_items((array) get_option("ascwo_all_shapes", array()), $limited_shapes, 4));
    }

    private function ascwo_add_shapes_if_not_exist()
    {
        // Définition des formes par défaut
        $shapes_updated = false;
        $default_shapes = [
            [
                "id" => "shape-cut-to-shape",
                'name' => 'Cut To Shape',
                'icon' => ASCWO_ASSETS . '/images/shapes/ic_shape_cut_to_shape.svg',
                'value' => 'cut-to-shape'
            ]
        ];

        // Récupération des formes existantes
        $existing_shapes = get_option('ascwo_all_shapes', []);

        // 2. Ajout des formes manquantes
        $existing_values = array_column($existing_shapes, 'value');

        foreach ($default_shapes as $default_shape) {
            // Vérification si la forme existe déjà (par sa valeur)
            if (!in_array($default_shape['value'], $existing_values)) {
                $existing_shapes[] = $default_shape;
                $shapes_updated = true;
            }
        }

        // Sauvegarde uniquement si des modifications ont été apportées
        if ($shapes_updated) {
            update_option('ascwo_all_shapes', $existing_shapes);
        }
    }

    /**
     * Seed fixing-method defaults used by the global settings screens.
     */
    private function ascwo_define_fixingMethods()
    {
        $fixingMethods = array_slice([
            [
                'id' => 'fixing-none',
                'name' => 'None',
                "description" => "",
                "icon" => ASCWO_ASSETS . '/images/fixing-methodes/ic_fixmethod_none.svg',
                "popImg" => "",
                'type' => 'none'
            ],
            [
                'id' => 'fixing-adhesive-tape',
                'name' => 'Adhesive Tape',
                "description" => "",
                "icon" => ASCWO_ASSETS . '/images/fixing-methodes/ic_fixmethod_adhesive_tape.svg',
                "popImg" => "",
                'type' => 'adhesive-tape'
            ],
            [
                'id' => 'fixing-screw',
                'name' => 'Screw',
                "description" => "",
                "icon" => ASCWO_ASSETS . '/images/fixing-methodes/ic_fixmethod_screw.svg',
                "popImg" => "",
                'type' => 'screw'
            ],
            [
                'id' => 'fixing-screw-cap',
                'name' => 'Screw Cap',
                "description" => "",
                "icon" => ASCWO_ASSETS . '/images/fixing-methodes/ic_fixmethod_screw_cap.svg',
                "popImg" => "",
                'type' => 'screw-cap'
            ],
            [
                'id' => 'fixing-stand-off',
                'name' => 'Stand Off',
                "description" => "",
                "icon" => ASCWO_ASSETS . '/images/fixing-methodes/ic_fixmethod_standoff.svg',
                "popImg" => "",
                'type' => 'standoff'
            ],
            [
                'id' => 'fixing-hanging',
                'name' => 'Hanging',
                "description" => "",
                "icon" => ASCWO_ASSETS . '/images/fixing-methodes/ic_fixmethod_hanging.svg',
                "popImg" => "",
                'type' => 'hanging'
            ],
            [
                'id' => 'fixing-flag',
                'name' => 'Flag',
                "description" => "",
                "icon" => ASCWO_ASSETS . '/images/fixing-methodes/ic_fixmethod_flag.svg',
                "popImg" => "",
                'type' => 'flag'
            ],
            [
                'id' => 'fixing-suction-cup',
                'name' => 'Suction Cup',
                "description" => "",
                "icon" => ASCWO_ASSETS . '/images/fixing-methodes/ic_fixmethod_suction_cup.svg',
                "popImg" => "",
                'type' => 'suction-cup'
            ],
            [
                'id' => 'fixing-table-stand',
                'name' => 'Table Stand',
                "description" => "",
                "icon" => ASCWO_ASSETS . '/images/fixing-methodes/ic_fixmethod_table_stand.svg',
                "popImg" => "",
                'type' => 'table-stand'
            ],
            [
                'id' => 'fixing-ceiling',
                'name' => 'Ceiling',
                "description" => "",
                "icon" => ASCWO_ASSETS . '/images/fixing-methodes/ic_fixmethod_ceiling.svg',
                "popImg" => "",
                'type' => 'ceiling'
            ],
            [
                'id' => 'fixing-pole-attachment',
                'name' => 'Pole Attachment',
                "description" => "",
                "icon" => ASCWO_ASSETS . '/images/fixing-methodes/ic_fixmethod_pole_attachment.svg',
                "popImg" => "",
                'type' => 'pole-attachment'
            ],
            [
                'id' => 'fixing-cable-labeling',
                'name' => 'Cable Labeling',
                "description" => "",
                "icon" => ASCWO_ASSETS . '/images/fixing-methodes/ic_fixmethod_cable_label.svg',
                "popImg" => "",
                'type' => 'cable-labeling'
            ],
            [
                'id' => 'fixing-table-clamp',
                'name' => 'Table Clamp',
                "description" => "",
                "icon" => ASCWO_ASSETS . '/images/fixing-methodes/ic_fixmethod_table_clamp.svg',
                "popImg" => "",
                'type' => 'table-clamp'
            ],
            [
                'id' => 'fixing-base-support',
                'name' => 'Base Support',
                "description" => "",
                "icon" => ASCWO_ASSETS . '/images/fixing-methodes/ic_fixmethod_base_support.svg',
                "popImg" => "",
                'type' => 'base-support'
            ],
            [
                'id' => 'fixing-magnetic-strip',
                'name' => 'Magnetic Strip',
                "description" => "",
                "icon" => ASCWO_ASSETS . '/images/fixing-methodes/ic_fixmethod_magnetic_strip.svg',
                "popImg" => "",
                'type' => 'magnetic-strip'
            ],
            [
                'id' => 'fixing-keyring',
                'name' => 'Keyring',
                "description" => "",
                "icon" => ASCWO_ASSETS . '/images/fixing-methodes/ic_fixmethod_keyring.svg',
                "popImg" => "",
                'type' => 'keyring'
            ],
            [
                'id' => 'fixing-sign-holder',
                'name' => 'Sign Holder',
                "description" => "",
                "icon" => ASCWO_ASSETS . '/images/fixing-methodes/ic_fixmethod_sign_holder.svg',
                "popImg" => "",
                'type' => 'sign-holder'
            ],
            [
                'id' => 'fixing-eyelets',
                'name' => 'Eyelets',
                "description" => "",
                "icon" => ASCWO_ASSETS . '/images/fixing-methodes/ic_fixmethod_eyelets.svg',
                "popImg" => "",
                'type' => 'eyelets'
            ],
            [
                'id' => 'fixing-s-hook',
                'name' => 'S Hook',
                "description" => "",
                "icon" => ASCWO_ASSETS . '/images/fixing-methodes/ic_fixmethod_s_hook.svg',
                "popImg" => "",
                'type' => 's-hook'
            ],
            [
                'id' => 'fixing-roll-up',
                'name' => 'Roll Up',
                "description" => "",
                "icon" => ASCWO_ASSETS . '/images/fixing-methodes/ic_fixmethod_roll_up.svg',
                "popImg" => "",
                'type' => 'roll-up'
            ],
        ], 0, 5);
        $limited_fixingMethods = $this->ascwo_limit_global_items($fixingMethods, $fixingMethods, 5);
        update_option("ascwo_all_fixingMethods", $this->ascwo_limit_global_items((array) get_option("ascwo_all_fixingMethods", array()), $limited_fixingMethods, 5));
    }

    /**
     * Load the plugin after all plugins are loaded
     *
     * @return void
     */
    public function init_plugin()
    {
        $this->includes();
        $this->init_hooks();
    }

    /**
     * Placeholder for activation function
     *
     * Nothing being called here yet.
     */
    public function activate()
    {
        if (is_plugin_active('woocommerce/woocommerce.php')) {

            $installed = get_option('ASCWO_installed');

            if (!$installed) {
                update_option('ASCWO_installed', time());
            }

            update_option('ASCWO_version', ASCWO_VERSION);

        }
    }

    /**
     * Placeholder for deactivation function
     *
     * Nothing being called here yet.
     */
    public function deactivate()
    {
    }

    /**
     * Include the required files
     *
     * @return void
     */
    public function includes()
    {

        //require_once ASCWO_INCLUDES . '/Assets.php';

        if ($this->is_request('admin')) {
            require_once ASCWO_INCLUDES . '/Admin.php';
        }

        if ($this->is_request('frontend')) {
            require_once ASCWO_INCLUDES . '/Frontend.php';
        }

        if ($this->is_request('ajax')) {
            // require_once ASCWO_INCLUDES . '/class-ajax.php';
        }

        require_once ASCWO_INCLUDES . '/Api.php';
        require_once ASCWO_INCLUDES . '/ascwo-post-type.php';
        require_once ASCWO_INCLUDES . '/ascwo-design.php';
        require_once ASCWO_INCLUDES . '/ascwo-product-config.php';
        require_once ASCWO_INCLUDES . '/Functions.php';
        require_once ASCWO_INCLUDES . '/Public.php';
    }

    /**
     * Initialize the hooks
     *
     * @return void
     */
    public function init_hooks()
    {

        add_action('init', array($this, 'init_classes'));

        (new ASCWO_Post_Type())->init_hooks();
        (new ASCWO_Product_Config())->init_hooks();
        (new ASCWO_Design())->init_hooks();

        // Localize our plugin
        add_action('init', array($this, 'localization_setup'));
    }

    /**
     * Instantiate the required classes
     *
     * @return void
     */
    public function init_classes()
    {

        if ($this->is_request('admin')) {
            $this->container['admin'] = new ASCWO\ASCWO_Admin();
        }

        if ($this->is_request('frontend')) {
            $this->container['frontend'] = new ASCWO\ASCWO_Frontend();
        }

        if ($this->is_request('ajax')) {
            // $this->container['ajax'] =  new ASCWO\Ajax();
        }

        $this->container['api'] = new ASCWO\Api();
        $this->container['public'] = new ASCWO\ASCWO_Public();
        //$this->container['assets'] = new ASCWO\Assets();
    }

    /**
     * Initialize plugin for localization
     *
     * @uses load_plugin_textdomain()
     */
    public function localization_setup()
    {
        load_plugin_textdomain("all-signs-customizer-for-woocommerce", false, dirname(plugin_basename(__FILE__)) . '/languages/');
    }

    /**
     * What type of request is this?
     *
     * @param  string $type admin, ajax, cron or frontend.
     *
     * @return bool
     */
    private function is_request($type)
    {
        switch ($type) {
            case 'admin':
                return is_admin();

            case 'ajax':
                return defined('DOING_AJAX');

            case 'rest':
                return defined('REST_REQUEST');

            case 'cron':
                return defined('DOING_CRON');

            case 'frontend':
                return (!is_admin() || defined('DOING_AJAX')) && !defined('DOING_CRON');
        }
    }

    public function check_config_pageselected()
    {
        if (class_exists('WooCommerce')) {
            $PageSettings = get_option('ascwo_config_page', []);
            if (count($PageSettings) === 0) {
                ?>
                <div class="notice notice-warning ascwo-notice-nux is-dismissible">
                    <span class="ascwo-icon">
                        <img src="<?php echo esc_url(ASCWO_ASSETS . '/images/im_ascwo-icon2.png') ?>" alt="" width="250" />
                    </span>
                    <div>
                        <h2><?php esc_html_e("Customization Page not found", "all-signs-customizer-for-woocommerce") ?></h2>
                        <p>
                            <?php
                            echo wp_kses_post(
                                sprintf(
                                    __('To display the configurator on a page without a short code, please select the page on which it should be displayed. Click <a href="%s">here</a>', 'all-signs-customizer-for-woocommerce'),
                                    esc_url(admin_url('admin.php?page=ascwo#/global-settings/configuration-page'))
                                )
                            );
                            ?>
                        </p>
                    </div>
                </div>
                <?php
            } else {

                if ((!get_post_status($PageSettings["configuratorPage"]) && $PageSettings["configuratorPage"] !== 0) || $PageSettings["configuratorPage"] === 0) {
                    ?>
                    <div class="notice notice-warning ascwo-notice-nux is-dismissible">
                        <span class="ascwo-icon">
                            <img src="<?php echo esc_url(ASCWO_ASSETS . '/images/im_ascwo-icon2.png') ?>" alt="" width="250" />
                        </span>
                        <div>
                            <h2><?php esc_html_e("Customization Page not found", "all-signs-customizer-for-woocommerce") ?></h2>
                            <p>
                                <?php
                                echo wp_kses_post(
                                    sprintf(
                                        __('Configuration page is not defined for ASO plugin. Click <a href="%s">here</a>', 'all-signs-customizer-for-woocommerce'),
                                        esc_url(admin_url('admin.php?page=ascwo#/global-settings/configuration-page'))
                                    )
                                );
                                ?>
                            </p>
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
    public function check_woocommerce_install_and_version($version = '3.4.0')
    {
        if (class_exists('WooCommerce')) {
            global $woocommerce;
            if (version_compare($woocommerce->version, $version, '<')) {
                ?>
                <div class="notice notice-info ascwo-notice-nux is-dismissible">
                    <span class="ascwo-icon">
                        <img src="<?php echo esc_url(ASCWO_ASSETS . '/images/im_ascwo-icon2.png') ?>" alt="" width="250" />
                    </span>
                    <div>
                        <h2><?php esc_html_e("Welcome to All Sign Customizer for WooCommerce. Let's get you started !!!", "all-signs-customizer-for-woocommerce") ?>
                        </h2>
                        <p><?php esc_html_e('To avoid performance problems we recommend at least version 3.4 of Woocommerce.', "all-signs-customizer-for-woocommerce"); ?>
                        </p>
                        <p><?php $this->install_plugin_button('woocommerce', 'woocommerce.php', 'WooCommerce', array(), __('WooCommerce activated', "all-signs-customizer-for-woocommerce"), __('Activate WooCommerce', "all-signs-customizer-for-woocommerce"), __('Install WooCommerce', "all-signs-customizer-for-woocommerce")); ?>
                        </p>
                    </div>
                </div>
                <?php
            }
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
    public static function install_plugin_button($plugin_slug, $plugin_file, $plugin_name, $classes = array(), $activated = '', $activate = '', $install = '')
    {
        if (current_user_can('install_plugins') && current_user_can('activate_plugins')) {
            if (is_plugin_active($plugin_slug . '/' . $plugin_file)) {
                // The plugin is already active.
                $button = array(
                    'message' => esc_attr__('Activated', "all-signs-customizer-for-woocommerce"),
                    'url' => '#',
                    'classes' => array('storefront-button', 'disabled'),
                );

                if ('' !== $activated) {
                    $button['message'] = esc_attr($activated);
                }
            } elseif (self::is_plugin_installed($plugin_slug)) {
                $url = self::is_plugin_installed($plugin_slug);

                // The plugin exists but isn't activated yet.
                $button = array(
                    'message' => esc_attr__('Activate', "all-signs-customizer-for-woocommerce"),
                    'url' => $url,
                    'classes' => array('activate-now'),
                );

                if ('' !== $activate) {
                    $button['message'] = esc_attr($activate);
                }
            }

            if (!empty($classes)) {
                $button['classes'] = array_merge($button['classes'], $classes);
            }
            if (isset($button) && is_array($button)) {

                $button['classes'] = implode(' ', $button['classes']);

                ?>
                <span class="plugin-card-<?php echo esc_attr($plugin_slug); ?>">
                    <a href="<?php echo esc_url($button['url']); ?>" class="<?php echo esc_attr($button['classes']); ?>"
                        data-originaltext="<?php echo esc_attr($button['message']); ?>"
                        data-name="<?php echo esc_attr($plugin_name); ?>" data-slug="<?php echo esc_attr($plugin_slug); ?>"
                        aria-label="<?php echo esc_attr($button['message']); ?>"><?php echo esc_html($button['message']); ?></a>
                </span>
                <?php echo /* translators: conjunction of two alternative options user can choose (in missing plugin admin notice). Example: "Activate WooCommerce or learn more" */ esc_html__('or', "all-signs-customizer-for-woocommerce"); ?>
                <a href="https://docs.signsdesigner.us"
                    target="_blank"><?php esc_html_e('learn more', "all-signs-customizer-for-woocommerce"); ?></a>
                <?php
            }
        }
    }
    /**
     * Return an activation URL when the target plugin directory exists.
     *
     * @param string $plugin_slug Plugin directory and main file path.
     *
     * @return string|false
     */
    private static function is_plugin_installed($plugin_slug)
    {
        $plugin_path = WP_PLUGIN_DIR . '/' . ltrim($plugin_slug, '/');
        if (!is_dir($plugin_path)) {
            return false;
        }

        $plugins = get_plugins('/' . ltrim($plugin_slug, '/'));
        if (empty($plugins)) {
            return false;
        }

        $keys = array_keys($plugins);
        $plugin_file = $plugin_slug . '/' . $keys[0];
        $url = wp_nonce_url(
            add_query_arg(
                array(
                    'action' => 'activate',
                    'plugin' => $plugin_file,
                ),
                esc_url_raw(admin_url('plugins.php'))
            ),
            'activate-plugin_' . $plugin_file
        );

        return $url;
    }

    /**
     * 
     */
    public function permalink_notice()
    {
        if (is_plugin_active('woocommerce/woocommerce.php')) {

            $current_permalink_structure = get_option('permalink_structure');

            if ($current_permalink_structure !== '/%postname%/') { ?>

                <div class="notice notice-warning ascwo-notice-nux is-dismissible">
                    <span class="ascwo-icon">
                        <img src='<?php echo esc_url(ASCWO_ASSETS . '/images/im_ascwo-icon2.png') ?>' alt="" width="250" />
                    </span>
                    <div>
                        <h2><?php esc_html_e('We recommend setting your permalinks to "/%postname%/" to improve natural SEO.w! 🤘', "all-signs-customizer-for-woocommerce") ?>
                        </h2>
                        <p><?php esc_html_e('To do this, go to', "all-signs-customizer-for-woocommerce") ?> <a
                                href="<?php echo esc_url(admin_url('options-permalink.php')); ?>"><?php esc_html_e('Settings > Permanent links', 'all-signs-customizer-for-woocommerce'); ?></a>
                        </p>
                    </div>
                </div>
                <?php
            }
        }
    }

    /**
     * Get product activation notice.
     *
     * @return void
     */
    public function get_not_available_notice()
    {
        return;
    }
} // All_Signs_Options

$ASO = ASCWO_All_Signs_Options_Pro::init();
