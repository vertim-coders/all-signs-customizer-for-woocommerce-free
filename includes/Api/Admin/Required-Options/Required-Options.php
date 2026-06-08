<?php
namespace ASOWP\Api\Admin\Required_Options;

require_once __DIR__ . '/Base.php';

foreach (array(
    'Sizes.php',
    'Colors.php',
    'Shapes.php',
    'FixingMethods.php',
    'Pricings.php',
    'Borders.php',
    'Components.php',
    'Fonts.php',
) as $file) {
    $path = __DIR__ . '/' . $file;
    if (file_exists($path)) {
        require_once $path;
    }
}

class ASOWP_Api_Required_Options extends ASOWP_Api_Required_Options_Base
{
    public function register_routes()
    {
        (new ASOWP_Api_Required_Options_Sizes())->register_routes();
        (new ASOWP_Api_Required_Options_Colors())->register_routes();
        (new ASOWP_Api_Required_Options_Shapes())->register_routes();
        (new ASOWP_Api_Required_Options_FixingMethods())->register_routes();
        (new ASOWP_Api_Required_Options_Pricings())->register_routes();
        (new ASOWP_Api_Required_Options_Borders())->register_routes();
        (new ASOWP_Api_Required_Options_Components())->register_routes();
        (new ASOWP_Api_Required_Options_Fonts())->register_routes();
    }
}
