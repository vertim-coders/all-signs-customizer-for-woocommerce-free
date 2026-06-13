<?php
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
     * Register our menu page
     *
     * @return void
     */
    public function admin_menu()
    {
        if (is_plugin_active('woocommerce/woocommerce.php')) {
            global $submenu;

            $capability = 'manage_options';
            $slug = 'ascwo';

            $hook = add_menu_page(__('All Signs Customizer for WooCommerce', "all-signs-customizer-for-woocommerce-pro"), __('All Signs Customizer for WooCommerce', "all-signs-customizer-for-woocommerce-pro"), $capability, $slug, [$this, 'plugin_page'], ASCWO_ASSETS . '/images/im_icon_ascwo.png');

            if (current_user_can($capability)) {
                $submenu[$slug][] = array(__('Home', "all-signs-customizer-for-woocommerce-pro"), $capability, 'admin.php?page=' . $slug . '#/');
                $submenu[$slug][] = array(__('Configurations', "all-signs-customizer-for-woocommerce-pro"), $capability, 'admin.php?page=' . $slug . '#/configuration');
                $submenu[$slug][] = array(__('Request quotes', "all-signs-customizer-for-woocommerce-pro"), $capability, 'admin.php?page=' . $slug . '#/request-quotes');
                $submenu[$slug][] = array(__('Global Settings', "all-signs-customizer-for-woocommerce-pro"), $capability, 'admin.php?page=' . $slug . '#/settings/output');
                $submenu[$slug][] = array(__('Templates', "all-signs-customizer-for-woocommerce-pro"), $capability, 'admin.php?page=' . $slug . '#/templates');
                $submenu[$slug][] = array(__('Manage Fonts', "all-signs-customizer-for-woocommerce-pro"), $capability, 'admin.php?page=' . $slug . '#/manage-font');
                $submenu[$slug][] = array(__('Manage Cliparts', "all-signs-customizer-for-woocommerce-pro"), $capability, 'admin.php?page=' . $slug . '#/manage-cliparts');


            }

            add_action('load-' . $hook, [$this, 'init_hooks']);
        }
    }

    /**
     * Initialize our hooks for the admin page
     *
     * @return void
     */
    public function init_hooks()
    {
        add_action('admin_enqueue_scripts', [$this, 'enqueue_scripts']);
    }

    /**
     * Load scripts and styles for the app
     *
     * @return void
     */
    public function enqueue_scripts()
    {
        if (function_exists('wp_enqueue_editor')) {
            wp_enqueue_editor();
        }

        wp_enqueue_script('ascwo-runtime', ASCWO_ASSETS . '/js/runtime.js', [], ASCWO_VERSION, true);
        wp_enqueue_script('ascwo-vendor', ASCWO_ASSETS . '/js/vendors.js', [], ASCWO_VERSION, true);

        wp_enqueue_style('ascwo-admin', ASCWO_ASSETS . '/css/admin.css', false, ASCWO_VERSION);
        wp_enqueue_style('ascwo-frontend', ASCWO_ASSETS . '/css/frontend.css', false, ASCWO_VERSION);

        wp_enqueue_script('ascwo-admin', ASCWO_ASSETS . '/js/admin.js', ['jquery', 'ascwo-vendor', 'ascwo-runtime', 'wp-i18n', 'editor'], ASCWO_VERSION, true);
        wp_set_script_translations('ascwo-admin', "all-signs-customizer-for-woocommerce-pro");
        wp_enqueue_script('ascwo-fabric', ASCWO_ASSETS . '/utilities/fabric.min.js', [], ASCWO_VERSION, true);
        wp_enqueue_script('ascwo-frontend', ASCWO_ASSETS . '/js/frontend.js', ['jquery', 'ascwo-vendor', 'ascwo-runtime', 'ascwo-fabric'], ASCWO_VERSION, true);

        wp_enqueue_style('ascwo-toast', ASCWO_ASSETS . '/utilities/toast.min.css', false, ASCWO_VERSION);
        wp_enqueue_script('ascwo-toast', ASCWO_ASSETS . '/utilities/toast.min.js', [], ASCWO_VERSION, true);
        wp_enqueue_script('ascwo-sortable', ASCWO_ASSETS . '/utilities/sortable.js', [], ASCWO_VERSION, true);
        wp_enqueue_media();
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

        wp_enqueue_style('ascwo-style', ASCWO_ASSETS . '/css/style.css', false, ASCWO_VERSION);
    }

    /**
     * Render our admin page
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
            "ajax_url" => esc_url(admin_url('admin-ajax.php')),
            "site_url" => urlencode(get_site_url()),
            "caches" => function_exists('ascwo_get_license_cache_timestamp') ? \ascwo_get_license_cache_timestamp() : 0,
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
        );
        wp_localize_script("ascwo-admin", "ascwo_data", $script_data);
        wp_localize_script("ascwo-frontend", "ascwo_data", $script_data);
        wp_localize_script("ascwo-admin", "ascwo_configurator_data", $configurator_data);
        wp_localize_script("ascwo-frontend", "ascwo_configurator_data", $configurator_data);
    }

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
     * Check file type and extension.
     *
     * @param array  $data The data.
     * @param mixed  $file The file.
     * @param string $filename The file name.
     * @param array $mimes The mimes.
     * @param string $real_mime The real mimes.
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
