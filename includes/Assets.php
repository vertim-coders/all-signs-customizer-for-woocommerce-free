<?php
namespace ASCWO;

/**
 * Scripts and Styles Class
 */
class Assets
{

    function __construct()
    {

        if (is_admin()) {
            add_action('admin_enqueue_scripts', [$this, 'register'], 5);
        } else {
            add_action('wp_enqueue_scripts', [$this, 'register'], 5);
        }
    }

    /**
     * Register our app scripts and styles
     *
     * @return void
     */
    public function register()
    {
        $this->register_scripts($this->get_scripts());
        $this->register_styles($this->get_styles());
    }

    /**
     * Register scripts
     *
     * @param  array $scripts
     *
     * @return void
     */
    private function register_scripts($scripts)
    {
        // Return if JS folder not exists
        if (!is_dir(ASCWO_PATH . '/assets/js')) {
            return;
        }

        foreach ($scripts as $handle => $script) {
            $deps = isset($script['deps']) ? $script['deps'] : false;
            $in_footer = isset($script['in_footer']) ? $script['in_footer'] : false;
            $version = isset($script['version']) ? $script['version'] : ASCWO_VERSION;

            wp_register_script($handle, $script['src'], $deps, $version, $in_footer);
        }
    }

    /**
     * Register styles
     *
     * @param  array $styles
     *
     * @return void
     */
    public function register_styles($styles)
    {
        foreach ($styles as $handle => $style) {
            $deps = isset($style['deps']) ? $style['deps'] : false;

            wp_register_style($handle, $style['src'], $deps, ASCWO_VERSION);
        }
    }

    /**
     * Get all registered scripts
     *
     * @return array
     */
    public function get_scripts()
    {
        // Return if JS folder not exists
        if (!is_dir(ASCWO_PATH . '/assets/js')) {
            return;
        }

        $prefix = defined('SCRIPT_DEBUG') && SCRIPT_DEBUG ? '.min' : '';

        $scripts = [
            'ascwo-runtime' => [
                'src' => ASCWO_ASSETS . '/js/runtime.js',
                'version' => filemtime(ASCWO_PATH . '/assets/js/runtime.js'),
                'in_footer' => true
            ],
            'ascwo-vendor' => [
                'src' => ASCWO_ASSETS . '/js/vendors.js',
                'version' => filemtime(ASCWO_PATH . '/assets/js/vendors.js'),
                'in_footer' => true
            ],
            'ascwo-frontend' => [
                'src' => ASCWO_ASSETS . '/js/frontend.js',
                'deps' => ['jquery', 'ascwo-vendor', 'ascwo-runtime'],
                'version' => filemtime(ASCWO_PATH . '/assets/js/frontend.js'),
                'in_footer' => true
            ],
            'ascwo-admin' => [
                'src' => ASCWO_ASSETS . '/js/admin.js',
                'deps' => ['jquery', 'ascwo-vendor', 'ascwo-runtime'],
                'version' => filemtime(ASCWO_PATH . '/assets/js/admin.js'),
                'in_footer' => true
            ],
            'ascwo-omodal' => [
                'src' => ASCWO_ASSETS . '/utilities/modal.min.js',
                'in_footer' => true
            ],
            'ascwo-fabric' => [
                'src' => ASCWO_ASSETS . '/utilities/fabric.min.js',
                'in_footer' => true
            ],
            'ascwo-paper' => [
                'src' => ASCWO_ASSETS . '/utilities/paper.min.js',
                'in_footer' => true
            ],
            'ascwo-sortable' => [
                'src' => ASCWO_ASSETS . '/utilities/sortable.js',
                'in_footer' => true
            ],
            'ascwo-toast' => [
                'src' => ASCWO_ASSETS . '/utilities/toast.min.js',
                'in_footer' => true
            ],
            'ascwo-tinymce-script' => [
                'src' => includes_url('/js/tinymce/') . 'tinymce.min.js',
                'in_footer' => true
            ],
            'ascwo-product-min' => [
                'src' => ASCWO_ASSETS . '/utilities/ascwo-product-min.js',
                'in_footer' => true
            ]
        ];

        return $scripts;
    }

    /**
     * Get registered styles
     *
     * @return array
     */
    public function get_styles()
    {

        $styles = [
            'ascwo-style' => [
                'src' => ASCWO_ASSETS . '/css/style.css'
            ],
            'ascwo-frontend' => [
                'src' => ASCWO_ASSETS . '/css/frontend.css'
            ],
            'ascwo-admin' => [
                'src' => ASCWO_ASSETS . '/css/admin.css'
            ],
            'ascwo-omodal' => [
                'src' => ASCWO_ASSETS . '/utilities/modal.min.css'
            ],
            'ascwo-toast' => [
                'src' => ASCWO_ASSETS . '/utilities/toast.min.css'
            ],
        ];

        return $styles;
    }

}