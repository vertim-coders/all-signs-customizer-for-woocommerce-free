<?php
namespace ASO;

use ASO\Api\Admin\ASO_Api_Configs;
use ASO\Api\Admin\ASO_Api_Manage_colors;
use ASO\Api\Admin\ASO_Api_Manage_cliparts;
use ASO\Api\Admin\ASO_Api_Manage_fonts;
use ASO\Api\Admin\ASO_Api_Manage_sizes;
use ASO\Api\Admin\ASO_Api_Materials;
use ASO\Api\Admin\Materials\ASO_Materials_Simple;
use ASO\Api\Admin\Materials\ASO_Materials_Advance;
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
        if ( !class_exists( __NAMESPACE__ . '\Api\Admin\ASO_Api_Manage_colors'  ) ) {
            require_once __DIR__ . '/Api/Admin/Manage-Colors-palettes.php';
        }
        if ( !class_exists( __NAMESPACE__ . '\Api\Admin\ASO_Api_Manage_cliparts'  ) ) {
            require_once __DIR__ . '/Api/Admin/Manage-cliparts.php';
        }
        if ( !class_exists( __NAMESPACE__ . '\Api\Admin\ASO_Api_Manage_fonts'  ) ) {
            require_once __DIR__ . '/Api/Admin/Manage-fonts.php';
        }
        if ( !class_exists( __NAMESPACE__ . '\Api\Admin\ASO_Api_Manage_sizes'  ) ) {
            require_once __DIR__ . '/Api/Admin/Manage-size.php';
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
    }

    /**
     * Register the API routes
     *
     * @return void
     */
    public function register_routes() {
        (new Api\Example())->register_routes();
        (new ASO_Api_Configs())->register_routes();
        (new ASO_Api_Manage_sizes())->register_routes();
        (new ASO_Api_Manage_fonts())->register_routes();
        (new ASO_Api_Manage_colors())->register_routes();
        (new ASO_Api_Manage_cliparts())->register_routes();
        (new ASO_Api_Materials())->register_routes();
        (new ASO_Materials_Simple())->register_routes();
        (new ASO_Materials_Advance())->register_routes();
    }

}
