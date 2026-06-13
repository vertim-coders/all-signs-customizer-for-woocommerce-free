<?php
namespace ASCWO;

use ASCWO\Api\Admin\Additionals_Options\ASCWO_Api_Additional_Options;
use ASCWO\Api\Admin\ASCWO_Api_Configs;
use ASCWO\Api\Admin\ASCWO_Api_GoogleFonts;
use ASCWO\Api\Admin\ASCWO_Api_Manage_colors;
use ASCWO\Api\Admin\ASCWO_Api_Manage_cliparts;
use ASCWO\Api\Admin\ASCWO_Api_Manage_fonts;
use ASCWO\Api\Admin\ASCWO_Api_Manage_sizes;
use ASCWO\Api\Admin\ASCWO_Api_Templates_Categories;
use ASCWO\Api\Admin\ASCWO_Api_WooCommerce_Products;
use ASCWO\Api\Admin\ASCWO_Api_Home_Stats;
use ASCWO\Api\Admin\ASCWO_Api_Request_Quotes;
use ASCWO\Api\Admin\Globals_Settings\ASCWO_Api_Globals_Settings;
use ASCWO\Api\Admin\Required_Options\ASCWO_Api_Required_Options;
use ASCWO\Api\Admin\Settings\ASCWO_Api_Customizer_Sign_Settings;
use ASCWO\Api\Admin\Settings\ASCWO_Api_General_Settings;
use ASCWO\Api\Admin\Settings\ASCWO_Api_Language_Images_Settings;
use ASCWO\Api\Admin\Settings\ASCWO_Api_Theme_color_Settings;
use ASCWO\Api\Admin\Templates\ASCWO_Api_Templates;
use WP_REST_Controller;

/**
 * REST_API Handler
 */
class Api extends WP_REST_Controller
{

    /**
     * [__construct description]
     */
    public function __construct()
    {
        $this->includes();

        add_action('rest_api_init', [$this, 'register_routes']);
    }

    /**
     * Include the controller classes
     *
     * @return void
     */
    private function includes()
    {
        if (!class_exists(__NAMESPACE__ . '\Api\Admin\ASCWO_Api_Configs')) {
            require_once __DIR__ . '/Api/Admin/Configs.php';
        }
        if (!class_exists(__NAMESPACE__ . '\Api\Admin\ASCWO_Api_GoogleFonts')) {
            require_once __DIR__ . '/Api/Admin/googleFonts.php';
        }
        if (!class_exists(__NAMESPACE__ . '\Api\Admin\ASCWO_Api_Manage_cliparts')) {
            require_once __DIR__ . '/Api/Admin/Manage-cliparts.php';
        }
        if (!class_exists(__NAMESPACE__ . '\Api\Admin\ASCWO_Api_Manage_fonts')) {
            require_once __DIR__ . '/Api/Admin/Manage-fonts.php';
        }
        if (!class_exists(__NAMESPACE__ . '\Api\Admin\ASCWO_Api_WooCommerce_Products')) {
            require_once __DIR__ . '/Api/Admin/WooCommerce-Products.php';
        }
        if (!class_exists(__NAMESPACE__ . '\Api\Admin\ASCWO_Api_Home_Stats')) {
            require_once __DIR__ . '/Api/Admin/Home-Stats.php';
        }
        if (!class_exists(__NAMESPACE__ . '\Api\Admin\ASOWP_Api_Request_Quotes')) {
            require_once __DIR__ . '/Api/Admin/Request-Quotes.php';
        }
        if (!class_exists(__NAMESPACE__ . '\Api\Admin\Required_Options\ASOWP_Api_Required_Options')) {
            require_once __DIR__ . '/Api/Admin/Required-Options/Required-Options.php';
        }
        if (!class_exists(__NAMESPACE__ . '\Api\Admin\Globals_Settings')) {
            require_once __DIR__ . '/Api/Admin/Globals-Settings/Globals-Settings.php';
        }
        if (!class_exists(__NAMESPACE__ . '\Api\Admin\Additionals_Options\ASCWO_Api_Additional_Options')) {
            require_once __DIR__ . '/Api/Admin/Additionals-Options/Additional-Options.php';
        }
        if (!class_exists(__NAMESPACE__ . 'Api\Admin\Settings\ASCWO_Api_Customizer_Sign_Settings')) {
            require_once __DIR__ . '/Api/Admin/Settings/Customizer-sign.php';
        }
        if (!class_exists(__NAMESPACE__ . 'Api\Admin\Settings\ASCWO_Api_General_Settings')) {
            require_once __DIR__ . '/Api/Admin/Settings/Generals.php';
        }
        if (!class_exists(__NAMESPACE__ . 'Api\Admin\Settings\ASCWO_Api_Language_Images_Settings')) {
            require_once __DIR__ . '/Api/Admin/Settings/Language-Image.php';
        }
        if (!class_exists(__NAMESPACE__ . 'Api\Admin\Settings\ASCWO_Api_Theme_color_Settings')) {
            require_once __DIR__ . '/Api/Admin/Settings/Theme-color.php';
        }
        if (!class_exists(__NAMESPACE__ . 'Api\Admin\ASCWO_Api_Templates_Categories')) {
            require_once __DIR__ . '/Api/Admin/Templates/Categories.php';
        }
        if (!class_exists(__NAMESPACE__ . 'Api\Admin\ASCWO_Api_Templates_Categories')) {
            require_once __DIR__ . '/Api/Admin/Templates/Templates.php';
        }
    }

    /**
     * Register the API routes
     *
     * @return void
     */
    public function register_routes()
    {
        (new ASOWP_Api_Configs())->register_routes();
        (new ASOWP_Api_Manage_fonts())->register_routes();
        (new ASOWP_Api_Manage_cliparts())->register_routes();
        (new ASOWP_Api_WooCommerce_Products())->register_routes();
        (new ASOWP_Api_Home_Stats())->register_routes();
        (new ASOWP_Api_Request_Quotes())->register_routes();
        (new ASOWP_Api_Required_Options())->register_routes();
        (new ASOWP_Api_GoogleFonts())->register_routes();
        (new ASOWP_Api_Additional_Options())->register_routes();
        (new ASOWP_Api_Globals_Settings())->register_route();
        (new ASOWP_Api_General_Settings())->register_routes();
        (new ASOWP_Api_Customizer_Sign_Settings())->register_routes();
        (new ASOWP_Api_Language_Images_Settings())->register_routes();
        (new ASOWP_Api_Theme_color_Settings())->register_routes();
        (new ASOWP_Api_Templates_Categories())->register_routes();
        (new ASOWP_Api_Templates())->register_routes();
    }

}
