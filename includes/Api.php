<?php
namespace ASOWP;

use ASOWP\Api\Admin\Additionals_Options\ASOWP_Api_Customs_Additionals;
use ASOWP\Api\Admin\ASOWP_Api_Configs;
use ASOWP\Api\Admin\ASOWP_Api_GoogleFonts;
use ASOWP\Api\Admin\ASOWP_Api_Manage_colors;
use ASOWP\Api\Admin\ASOWP_Api_Manage_cliparts;
use ASOWP\Api\Admin\ASOWP_Api_Manage_fonts;
use ASOWP\Api\Admin\ASOWP_Api_Manage_sizes;
use ASOWP\Api\Admin\ASOWP_Api_Materials;
use ASOWP\Api\Admin\ASOWP_Api_Templates_Categories;
use ASOWP\Api\Admin\ASOWP_Api_WooCommerce_Products;
use ASOWP\Api\Admin\ASOWP_Api_Home_Stats;
use ASOWP\Api\Admin\Globals_Settings\ASOWP_Api_Globals_Settings;
use ASOWP\Api\Admin\Materials\ASOWP_Materials_Simple;
use ASOWP\Api\Admin\Materials\ASOWP_Materials_Advance;
use ASOWP\Api\Admin\Settings\ASOWP_Api_Customizer_Sign_Settings;
use ASOWP\Api\Admin\Settings\ASOWP_Api_General_Settings;
use ASOWP\Api\Admin\Settings\ASOWP_Api_Language_Images_Settings;
use ASOWP\Api\Admin\Settings\ASOWP_Api_Theme_color_Settings;
use ASOWP\Api\Admin\Templates\ASOWP_Api_Templates;
use WP_REST_Controller;

/**
 * REST_API Handler
 */
class Api extends WP_REST_Controller {

    /**
     * [__construct description]
     */
    public function __construct() {
        $this->includes();

        add_action( 'rest_api_init', [ $this, 'register_routes' ] );
    }

    /**
     * Include the controller classes
     *
     * @return void
     */
    private function includes() {
        if ( !class_exists( __NAMESPACE__ . '\Api\Admin\ASOWP_Api_Configs'  ) ) {
            require_once __DIR__ . '/Api/Admin/Configs.php';
        }
        if ( !class_exists( __NAMESPACE__ . '\Api\Admin\ASOWP_Api_GoogleFonts'  ) ) {
            require_once __DIR__ . '/Api/Admin/googleFonts.php';
        }
        if ( !class_exists( __NAMESPACE__ . '\Api\Admin\ASOWP_Api_Manage_cliparts'  ) ) {
            require_once __DIR__ . '/Api/Admin/Manage-cliparts.php';
        }
        if ( !class_exists( __NAMESPACE__ . '\Api\Admin\ASOWP_Api_Manage_fonts'  ) ) {
            require_once __DIR__ . '/Api/Admin/Manage-fonts.php';
        }
        if ( !class_exists( __NAMESPACE__ . '\Api\Admin\ASOWP_Api_Materials'  ) ) {
            require_once __DIR__ . '/Api/Admin/Materials.php';
        }
        if ( !class_exists( __NAMESPACE__ . '\Api\Admin\ASOWP_Api_WooCommerce_Products'  ) ) {
            require_once __DIR__ . '/Api/Admin/WooCommerce-Products.php';
        }
        if ( !class_exists( __NAMESPACE__ . '\Api\Admin\ASOWP_Api_Home_Stats'  ) ) {
            require_once __DIR__ . '/Api/Admin/Home-Stats.php';
        }
        if ( !class_exists( __NAMESPACE__ . '\Api\Admin\Materials\ASOWP_Api_Materials_Simple'  ) ) {
            require_once __DIR__ . '/Api/Admin/Materials/Simple.php';
        }
        if ( !class_exists( __NAMESPACE__ . '\Api\Admin\Materials\ASOWP_Api_Materials_Advance'  ) ) {
            require_once __DIR__ . '/Api/Admin/Materials/Advance.php';
        }
        if ( !class_exists( __NAMESPACE__ . '\Api\Admin\Globals_Settings'  ) ) {
            require_once __DIR__ . '/Api/Admin/Globals-Settings/Globals-Settings.php';
        }
        if ( !class_exists( __NAMESPACE__ . '\Api\Admin\Additionals_Options\ASOWP_Api_Customs_Additionals'  ) ) {
            require_once __DIR__ . '/Api/Admin/Additionals-Options/Custom-additionals.php';
        }
        if(!class_exists( __NAMESPACE__ .'Api\Admin\Settings\ASOWP_Api_Customizer_Sign_Settings')){
            require_once __DIR__ . '/Api/Admin/Settings/Customizer-sign.php';
        }
        if(!class_exists( __NAMESPACE__ .'Api\Admin\Settings\ASOWP_Api_General_Settings')){
            require_once __DIR__ . '/Api/Admin/Settings/Generals.php';
        }
        if(!class_exists( __NAMESPACE__ .'Api\Admin\Settings\ASOWP_Api_Language_Images_Settings')){
            require_once __DIR__ . '/Api/Admin/Settings/Language-Image.php';
        }
        if(!class_exists( __NAMESPACE__ .'Api\Admin\Settings\ASOWP_Api_Theme_color_Settings')){
            require_once __DIR__ . '/Api/Admin/Settings/Theme-color.php';
        }
        if(!class_exists( __NAMESPACE__ .'Api\Admin\ASOWP_Api_Templates_Categories')){
            require_once __DIR__ . '/Api/Admin/Templates/Categories.php';
        }
        if(!class_exists( __NAMESPACE__ .'Api\Admin\ASOWP_Api_Templates_Categories')){
            require_once __DIR__ . '/Api/Admin/Templates/Templates.php';
        }
    }

    /**
     * Register the API routes
     *
     * @return void
     */
    public function register_routes() {
        (new ASOWP_Api_Configs())->register_routes();
        (new ASOWP_Api_Manage_fonts())->register_routes();
        (new ASOWP_Api_Manage_cliparts())->register_routes();
        (new ASOWP_Api_Materials())->register_routes();
        (new ASOWP_Api_WooCommerce_Products())->register_routes();
        (new ASOWP_Api_Home_Stats())->register_routes();
        (new ASOWP_Materials_Simple())->register_routes();
        (new ASOWP_Materials_Advance())->register_routes();
        (new ASOWP_Api_GoogleFonts())->register_routes();
        (new ASOWP_Api_Customs_Additionals())->register_routes();
        (new ASOWP_Api_Globals_Settings())->register_route();
        (new ASOWP_Api_General_Settings())->register_routes();
        (new ASOWP_Api_Customizer_Sign_Settings())->register_routes();
        (new ASOWP_Api_Language_Images_Settings())->register_routes();
        (new ASOWP_Api_Theme_color_Settings())->register_routes();
        (new ASOWP_Api_Templates_Categories())->register_routes();
        (new ASOWP_Api_Templates())->register_routes();
    }

}
