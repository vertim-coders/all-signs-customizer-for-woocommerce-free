<?php
namespace ASO;

use ASO\Api\Admin\Additionals_Options\ASO_Api_Customs_Additionals;
use ASO\Api\Admin\ASO_Api_Configs;
use ASO\Api\Admin\ASO_Api_GoogleFonts;
use ASO\Api\Admin\ASO_Api_Manage_colors;
use ASO\Api\Admin\ASO_Api_Manage_cliparts;
use ASO\Api\Admin\ASO_Api_Manage_fonts;
use ASO\Api\Admin\ASO_Api_Manage_sizes;
use ASO\Api\Admin\ASO_Api_Materials;
use ASO\Api\Admin\Globals_Settings\ASO_Api_Globals_Settings;
use ASO\Api\Admin\Materials\ASO_Materials_Simple;
use ASO\Api\Admin\Materials\ASO_Materials_Advance;
use ASO\Api\Admin\Settings\ASO_Api_Customizer_Sign_Settings;
use ASO\Api\Admin\Settings\ASO_Api_General_Settings;
use ASO\Api\Admin\Settings\ASO_Api_Language_Images_Settings;
use ASO\Api\Admin\Settings\ASO_Api_Theme_color_Settings;
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
        if ( !class_exists( __NAMESPACE__ . '\Api\Example'  ) ) {
            require_once __DIR__ . '/Api/Example.php';
        }
        if ( !class_exists( __NAMESPACE__ . '\Api\Admin\ASO_Api_Configs'  ) ) {
            require_once __DIR__ . '/Api/Admin/Configs.php';
        }
        if ( !class_exists( __NAMESPACE__ . '\Api\Admin\ASO_Api_GoogleFonts'  ) ) {
            require_once __DIR__ . '/Api/Admin/googleFonts.php';
        }
        if ( !class_exists( __NAMESPACE__ . '\Api\Admin\ASO_Api_Manage_cliparts'  ) ) {
            require_once __DIR__ . '/Api/Admin/Manage-cliparts.php';
        }
        if ( !class_exists( __NAMESPACE__ . '\Api\Admin\ASO_Api_Manage_fonts'  ) ) {
            require_once __DIR__ . '/Api/Admin/Manage-fonts.php';
        }
        if ( !class_exists( __NAMESPACE__ . '\Api\Admin\ASO_Api_Materials'  ) ) {
            require_once __DIR__ . '/Api/Admin/Materials.php';
        }
        if ( !class_exists( __NAMESPACE__ . '\Api\Admin\Materials\ASO_Api_Materials_Simple'  ) ) {
            require_once __DIR__ . '/Api/Admin/Materials/Simple.php';
        }
        if ( !class_exists( __NAMESPACE__ . '\Api\Admin\Materials\ASO_Api_Materials_Advance'  ) ) {
            require_once __DIR__ . '/Api/Admin/Materials/Advance.php';
        }
        if ( !class_exists( __NAMESPACE__ . '\Api\Admin\Globals_Settings'  ) ) {
            require_once __DIR__ . '/Api/Admin/Globals-Settings/Globals-Settings.php';
        }
        if ( !class_exists( __NAMESPACE__ . '\Api\Admin\Additionals_Options\ASO_Api_Customs_Additionals'  ) ) {
            require_once __DIR__ . '/Api/Admin/Additionals-Options/Custom-additionals.php';
        }
        if(!class_exists( __NAMESPACE__ .'ASO\Api\Admin\Settings\ASO_Api_Customizer_Sign_Settings')){
            require_once __DIR__ . '/Api/Admin/Settings/Customizer-sign.php';
        }
        if(!class_exists( __NAMESPACE__ .'ASO\Api\Admin\Settings\ASO_Api_General_Settings')){
            require_once __DIR__ . '/Api/Admin/Settings/Generals.php';
        }
        if(!class_exists( __NAMESPACE__ .'ASO\Api\Admin\Settings\ASO_Api_Language_Images_Settings')){
            require_once __DIR__ . '/Api/Admin/Settings/Language-Image.php';
        }
        if(!class_exists( __NAMESPACE__ .'ASO\Api\Admin\Settings\ASO_Api_Theme_color_Settings')){
            require_once __DIR__ . '/Api/Admin/Settings/Theme-color.php';
        }
    }

    /**
     * Register the API routes
     *
     * @return void
     */
    public function register_routes() {
        (new Api\Example())->register_routes();
        (new ASO_Api_Configs())->register_routes();
        (new ASO_Api_Manage_fonts())->register_routes();
        (new ASO_Api_Manage_cliparts())->register_routes();
        (new ASO_Api_Materials())->register_routes();
        (new ASO_Materials_Simple())->register_routes();
        (new ASO_Materials_Advance())->register_routes();
        (new ASO_Api_GoogleFonts())->register_routes();
        (new ASO_Api_Customs_Additionals())->register_routes();
        (new ASO_Api_Globals_Settings())->register_route();
        (new ASO_Api_General_Settings())->register_routes();
        (new ASO_Api_Customizer_Sign_Settings())->register_routes();
        (new ASO_Api_Language_Images_Settings())->register_routes();
        (new ASO_Api_Theme_color_Settings())->register_routes();
    }

}
