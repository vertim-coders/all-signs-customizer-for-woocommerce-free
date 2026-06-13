<?php
namespace ASCWO\Api\Admin\Additionals_Options;

require_once __DIR__ . '/Base.php';
require_once __DIR__ . '/Inputs.php';
require_once __DIR__ . '/Materials.php';
require_once __DIR__ . '/Components.php';

class ASCWO_Api_Additional_Options extends ASCWO_Api_Customs_Additionals_Base
{
    public function register_routes()
    {
        (new ASCWO_Api_Additional_Options_Inputs())->register_routes();
        (new ASCWO_Api_Customs_Additionals_Materials())->register_routes();
        (new ASCWO_Api_Customs_Additionals_Components())->register_routes();
    }
}
