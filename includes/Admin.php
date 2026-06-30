<?php
/**
 * Admin pages handler.
 *
 * @package ASCWO
 */

namespace ASCWO;

/**
 * Admin Pages Handler
 */
class ASCWO_Admin
{

    public function __construct()
    {
        add_action('admin_menu', [$this, 'admin_menu']);
        add_action('admin_enqueue_scripts', [$this, 'enqueue_product_assets']);
        add_filter('upload_mimes', [$this, 'ascwo_add_custom_mime_types']);
        add_filter('wp_check_filetype_and_ext', [$this, 'ascwo_check_filetype_and_ext'], 99, 5);
        add_action('wp_ajax_ascwo_check_product_health', [$this, 'check_product_health']);
        add_action('wp_ajax_nopriv_ascwo_check_product_health', [$this, 'check_product_health']);
    }

    /**
     * Register the inline data carrier used by the configurator preview module.
     *
     * @return void
     */
    private function enqueue_frontend_data_script()
    {
        if (!wp_script_is('ascwo-frontend-data', 'registered')) {
            wp_register_script('ascwo-frontend-data', false, array(), ASCWO_VERSION, true);
        }

        wp_enqueue_script('ascwo-frontend-data');
    }

    /**
     * Add global data before the configurator preview module executes.
     *
     * @param string $object_name JavaScript global object name.
     * @param array  $data        Data to expose.
     *
     * @return void
     */
    private function add_frontend_inline_data($object_name, array $data)
    {
        $this->enqueue_frontend_data_script();
        wp_add_inline_script(
            'ascwo-frontend-data',
            'window.' . $object_name . ' = ' . wp_json_encode($data) . ';',
            'before'
        );
    }

    /**
     * Register the plugin admin menu and submenus.
     *
     * @return void
     */
    public function admin_menu()
    {
        if (is_plugin_active('woocommerce/woocommerce.php')) {
            $capability = 'manage_options';
            $slug = 'ascwo';

            $hook = add_menu_page(__('All Sign Customizer for WooCommerce', 'all-signs-customizer-for-woocommerce-pro'), __('All Sign Customizer for WooCommerce', 'all-signs-customizer-for-woocommerce-pro'), $capability, $slug, [$this, 'plugin_page'], ASCWO_ASSETS . '/images/im_icon_ascwo.png');
            add_submenu_page($slug, __('Home', 'all-signs-customizer-for-woocommerce-pro'), __('Home', 'all-signs-customizer-for-woocommerce-pro'), $capability, 'admin.php?page=' . $slug . '#/');
            add_submenu_page($slug, __('Configurations', 'all-signs-customizer-for-woocommerce-pro'), __('Configurations', 'all-signs-customizer-for-woocommerce-pro'), $capability, 'admin.php?page=' . $slug . '#/configuration');
            add_submenu_page($slug, __('Request quotes', 'all-signs-customizer-for-woocommerce-pro'), __('Request quotes', 'all-signs-customizer-for-woocommerce-pro'), $capability, 'admin.php?page=' . $slug . '#/request-quotes');
            add_submenu_page($slug, __('Global Settings', 'all-signs-customizer-for-woocommerce-pro'), __('Global Settings', 'all-signs-customizer-for-woocommerce-pro'), $capability, 'admin.php?page=' . $slug . '#/settings/output');
            add_submenu_page($slug, __('Manage Fonts', 'all-signs-customizer-for-woocommerce-pro'), __('Manage Fonts', 'all-signs-customizer-for-woocommerce-pro'), $capability, 'admin.php?page=' . $slug . '#/manage-font');
            add_submenu_page($slug, __('Manage Cliparts', 'all-signs-customizer-for-woocommerce-pro'), __('Manage Cliparts', 'all-signs-customizer-for-woocommerce-pro'), $capability, 'admin.php?page=' . $slug . '#/manage-cliparts');

            add_action('load-' . $hook, [$this, 'init_hooks']);
        }
    }

    /**
     * Register the scripts for the plugin admin shell.
     *
     * @return void
     */
    public function init_hooks()
    {
        add_action('admin_enqueue_scripts', [$this, 'enqueue_scripts']);
    }

    /**
     * Enqueue the plugin admin assets.
     *
     * @return void
     */
    public function enqueue_scripts()
    {
        if (function_exists('wp_enqueue_editor')) {
            wp_enqueue_editor();
        }

        wp_enqueue_script('ascwo-runtime', ASCWO_ASSETS . '/js/runtime.js', [], $this->asset_version('/assets/js/runtime.js'), true);
        wp_enqueue_script('ascwo-vendor', ASCWO_ASSETS . '/js/vendors.js', [], $this->asset_version('/assets/js/vendors.js'), true);

        wp_enqueue_style('ascwo-admin', ASCWO_ASSETS . '/css/admin.css', false, $this->asset_version('/assets/css/admin.css'));
        wp_enqueue_style('ascwo-frontend', ASCWO_ASSETS . '/css/frontend.css', false, $this->asset_version('/assets/css/frontend.css'));

        wp_enqueue_script('ascwo-admin', ASCWO_ASSETS . '/js/admin.js', ['jquery', 'ascwo-vendor', 'ascwo-runtime', 'wp-i18n', 'editor'], $this->asset_version('/assets/js/admin.js'), true);
        wp_set_script_translations('ascwo-admin', 'all-signs-customizer-for-woocommerce-pro');
        wp_enqueue_script('ascwo-fabric', ASCWO_ASSETS . '/utilities/fabric.min.js', [], $this->asset_version('/assets/utilities/fabric.min.js'), true);
        $this->enqueue_frontend_data_script();
        if (function_exists('wp_enqueue_script_module')) {
            wp_enqueue_script_module('ascwo-frontend', ASCWO_ASSETS . '/js/frontend.js', array(), $this->asset_version('/assets/js/frontend.js'), array('in_footer' => true));
        } else {
            wp_enqueue_script('ascwo-frontend', ASCWO_ASSETS . '/js/frontend.js', ['jquery', 'ascwo-vendor', 'ascwo-runtime', 'ascwo-fabric'], $this->asset_version('/assets/js/frontend.js'), true);
            wp_script_add_data('ascwo-frontend', 'type', 'module');
        }

        wp_enqueue_style('ascwo-toast', ASCWO_ASSETS . '/utilities/toast.min.css', false, $this->asset_version('/assets/utilities/toast.min.css'));
        wp_enqueue_script('ascwo-toast', ASCWO_ASSETS . '/utilities/toast.min.js', [], $this->asset_version('/assets/utilities/toast.min.js'), true);
        wp_enqueue_script('ascwo-sortable', ASCWO_ASSETS . '/utilities/sortable.js', [], $this->asset_version('/assets/utilities/sortable.js'), true);
        wp_enqueue_media();
    }

    private function asset_version(string $relative_path): string
    {
        $path = ASCWO_PATH . $relative_path;
        return file_exists($path) ? (string) filemtime($path) : ASCWO_VERSION;
    }

    /**
     * Load lightweight admin styles on WooCommerce product screens.
     *
     * This keeps product-list/product-edit UI styling available without
     * reintroducing the old global frontend-style leak across wp-admin.
     *
     * @return void
     */
    public function enqueue_product_assets()
    {
        $screen = function_exists('get_current_screen') ? get_current_screen() : null;
        if (!$screen) {
            return;
        }

        $is_product_screen = $screen->post_type === 'product'
            || in_array($screen->id, ['edit-product', 'product'], true);

        if (!$is_product_screen) {
            return;
        }

        if (!wp_style_is('ascwo-style', 'registered')) {
            wp_register_style('ascwo-style', ASCWO_ASSETS . '/css/style.css', false, ASCWO_VERSION);
        }

        wp_enqueue_style('ascwo-style');
    }

    /**
     * Render the plugin admin application root.
     *
     * @return void
     */
    public function plugin_page()
    {
        $api_url = get_rest_url(); ?>
        <div class="wrap">
            <div id="ascwo-admin-app"></div>
        </div>
        <?php $script_data = [
            "rest_url" => $api_url . "ascwo/v1",
            "rest_nonce" => wp_create_nonce('wp_rest'),
            "ajax_url" => esc_url_raw(admin_url('admin-ajax.php')),
            "site_url" => esc_url_raw(get_site_url()),
            "caches" => function_exists('ascwo_get_license_cache_timestamp') ? \ascwo_get_license_cache_timestamp() : 0,
            "license_status" => function_exists('ascwo_get_license_status') ? \ascwo_get_license_status() : array(),
            "site_timezone" => function_exists('wp_timezone_string') ? wp_timezone_string() : get_option('timezone_string', 'UTC'),
            "author" => ASCWO_ID,
            "assets_url" => ASCWO_ASSETS,
            "page" => "admin",
            "version" => ASCWO_VERSION,
            'currencySymbol' => class_exists('WooCommerce') ? html_entity_decode(get_woocommerce_currency_symbol()) : '',
            'currency_pos' => class_exists('WooCommerce') ? get_option('woocommerce_currency_pos') : ''
        ];

        $configurator_data = array(
            "fixing_methods_url" => ASCWO_ASSETS . '/images/fixing-methodes',
            "borders_url" => ASCWO_ASSETS . '/images/borders',
            "filters_url" => ASCWO_ASSETS . '/images/filters',
        );
        wp_localize_script("ascwo-admin", "ascwo_data", $script_data);
        wp_localize_script("ascwo-admin", "ascwo_configurator_data", $configurator_data);
        $this->add_frontend_inline_data('ascwo_data', $script_data);
        $this->add_frontend_inline_data('ascwo_configurator_data', $configurator_data);
    }

    /**
     * Allow the media uploader to handle the asset formats used by the plugin.
     *
     * @param array<string, string> $mimes Registered mime types.
     *
     * @return array<string, string>
     */
    public function ascwo_add_custom_mime_types($mimes)
    {
        return array_merge(
            $mimes,
            array(
                'svg' => 'image/svg+xml',
                'ttf' => 'application/x-font-ttf',
                'woff' => 'application/x-font-woff',
                'otf' => 'application/x-font-otf',
                'icc' => 'application/vnd.iccprofile',
            )
        );
    }

    /**
     * Validate the file type and extension for uploaded plugin assets.
     *
     * @param array  $data       File data from WordPress.
     * @param mixed  $file       File path or upload payload.
     * @param string $filename   File name.
     * @param array  $mimes      Allowed mime types.
     * @param string $real_mime  Detected mime type.
     *
     * @return array
     */
    public function ascwo_check_filetype_and_ext($data, $file, $filename, $mimes, $real_mime)
    {
        if (!empty($data['ext']) && !empty($data['type'])) {
            return $data;
        }

        $wp_file_type = wp_check_filetype($filename, $mimes);

        // Check for the file type you want to enable, e.g. 'svg'.
        if ('ttf' === $wp_file_type['ext']) {
            $data['ext'] = 'ttf';
            $data['type'] = 'font/ttf';
        }

        if ('otf' === $wp_file_type['ext']) {
            $data['ext'] = 'otf';
            $data['type'] = 'font/otf';
        }

        if ('woff' === $wp_file_type['ext']) {
            $data['ext'] = 'woff';
            $data['type'] = 'font/woff';
        }

        if ('woff2' === $wp_file_type['ext']) {
            $data['ext'] = 'woff2';
            $data['type'] = 'font/woff2';
        }

        if ('svg' === $wp_file_type['svg']) {
            $data['ext'] = 'svg';
            $data['type'] = 'image/svg+xml';
        }

        return $data;
    }
}
