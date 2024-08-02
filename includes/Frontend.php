<?php
namespace ASO;

use ASO_Product_Config;

/**
 * Frontend Pages Handler
 */
class ASO_Frontend {

    public function __construct() {
        add_shortcode( 'aso-configurator', [ $this, 'render_aso_configurator' ] );
        add_shortcode( 'aso-templates', [ $this, 'render_aso_templates' ] );
    }

    /**
     * Render frontend app
     *
     * @param  array $atts
     * @param  string $content
     *
     * @return string
     */
    public function render_aso_configurator( $atts, $content = '' ) {
        wp_enqueue_style( 'aso-frontend', ASO_ASSETS . '/css/frontend.css',false,ASO_VERSION);
        wp_enqueue_style( 'aso-style',ASO_ASSETS . '/css/style.css',false,ASO_VERSION );
        wp_enqueue_style('aso-toast');
        wp_enqueue_script('aso-toast');
        extract( // phpcs:ignore
			shortcode_atts(
				array(
					'productid' => '0',
                    'tplid'=>false,
				),
				$atts,
                'aso-products'
			)
		);
        ob_start();
        ?> 
        <div id="aso-configurator-loader" style="height:90vh;">
            <div style="display: flex; flex: 1;width: 100%; height: 100%">
                <div
                    style="display: flex; flex-direction: column; width: 92%; height: 100%; margin-left: 10px; margin-right: 10px;">
                    <div style="width: 100%; height: 10%; margin-top: 10px; display: flex; justify-content: space-between;">
                        <div style="background: linear-gradient(to right, #a1a1a1, #e4e4e7, #a1a1a1); width: 21.33%; height: 100%;animation: pulseGradient 1.5s ease infinite;">
                        </div>
                        <div style="width: 31.33%; height: 100%; display: flex; justify-content: space-between;">
                            <div
                                style="background: linear-gradient(to right, #a1a1a1, #e4e4e7, #a1a1a1); width: 21.33%; height: 100%;animation: pulseGradient 1.5s ease infinite;">
                            </div>
                            <div
                                style="background: linear-gradient(to right, #a1a1a1, #e4e4e7, #a1a1a1); width: 21.33%; height: 100%;animation: pulseGradient 1.5s ease infinite;">
                            </div>
                            <div
                                style="background: linear-gradient(to right, #a1a1a1, #e4e4e7, #a1a1a1); width: 21.33%; height: 100%;animation: pulseGradient 1.5s ease infinite;">
                            </div>
                        </div>
                        <div style="background: linear-gradient(to right, #a1a1a1, #e4e4e7, #a1a1a1); width: 21.33%; height: 100%;animation: pulseGradient 1.5s ease infinite;">
                        </div>
                    </div>

                    <div style="width: 100%; height: 90%; margin-top: 20px;">
                        <div style="width: 100%; height: 80%; display: flex; justify-content: center; align-items: center;">
                            <div style="background: linear-gradient(to right, #a1a1a1, #e4e4e7, #a1a1a1); width: 40%; height: 50%;animation: pulseGradient 1.5s ease infinite;">
                            </div>
                        </div>

                        <div
                            style="width: 100%; height: 20%; display: flex; justify-items: center; justify-content: center; align-items: center;">
                            <div
                                style="background: linear-gradient(to right, #a1a1a1, #e4e4e7, #a1a1a1); width: 7%; height: 60%; margin-left: 5px; margin-right: 5px;animation: pulseGradient 1.5s ease infinite;">
                            </div>
                            <div
                                style="background: linear-gradient(to right, #a1a1a1, #e4e4e7, #a1a1a1); width: 7%; height: 60%; margin-left: 5px; margin-right: 5px;animation: pulseGradient 1.5s ease infinite;">
                            </div>
                            <div
                                style="animation: pulseGradient 1.5s ease infinite; background: linear-gradient(to right, #a1a1a1, #e4e4e7, #a1a1a1); width: 7%; height: 60%; margin-left: 5px; margin-right: 5px;">
                            </div>
                            <div
                                style="animation: pulseGradient 1.5s ease infinite; background: linear-gradient(to right, #a1a1a1, #e4e4e7, #a1a1a1); width: 7%; height: 60%; margin-left: 5px; margin-right: 5px;">
                            </div>
                            <div
                                style="animation: pulseGradient 1.5s ease infinite; background: linear-gradient(to right, #a1a1a1, #e4e4e7, #a1a1a1); width: 7%; height: 60%; margin-left: 5px; margin-right: 5px;">
                            </div>
                            <div
                                style="animation: pulseGradient 1.5s ease infinite; background: linear-gradient(to right, #a1a1a1, #e4e4e7, #a1a1a1); width: 7%; height: 60%; margin-left: 5px; margin-right: 5px;">
                            </div>
                        </div>
                    </div>
                </div>
                <div style="display: flex; flex-direction: column; width: 8%; height: 100%; margin-left: 20px; margin-right: 20px;">
                    <div
                        style="background: linear-gradient(to right, #a1a1a1, #e4e4e7, #a1a1a1); width: 100%; height: 10%; margin-top: 10px; animation: pulseGradient 1.5s ease infinite;">
                    </div>
                    <div
                        style="width: 100%; height: 90%; display: flex; flex-direction: column; justify-items: center; justify-content: center; align-items: center;">
                        <div
                            style="background: linear-gradient(to right, #a1a1a1, #e4e4e7, #a1a1a1); width: 90%; height: 10%; animation: pulseGradient 1.5s ease infinite;">
                        </div>
                        <div
                            style="background: linear-gradient(to right, #a1a1a1, #e4e4e7, #a1a1a1); width: 90%; height: 10%; margin-top: 20px; animation: pulseGradient 1.5s ease infinite;">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <?php
        $product =wc_get_product($productid);
        if($product){
            $meta = get_post_meta($productid,'product-aso-metas',true);
                
            if(!empty($meta) && isset($meta[$productid]['config-id'])){
                $configId = $meta[$productid]['config-id'];
                if($configId !=0){
                    $config = get_post_meta($configId,"aso-configs-meta",true);
                    $pageSettings = get_option("aso_config_page",[])["others"];
                    $all_cliparts_groups = get_option("aso-manages-cliparts",[]);
                    $all_fonts = get_option("aso-manages-fonts",[]);
                    $all_shapes = get_option("aso_all_shapes",[]);
                    $all_fixingMethods = get_option("aso_all_fixingMethods",[]);
                    $all_borders = get_option("aso_all_borders",[]);
                    $outputOptions = get_option("aso_output_options",[]);
                    
                    if(is_array($config) && !empty($config)){
                        $configData = [
                            'name'       => get_post_field('post_title', $configId),
                            "description" => get_post_field('post_content', $configId),
                            "icon"        => $config["icon"],
                            "popImg"      => $config["popImg"],
                            "data"        => $config["data"]
                        ];
                        $config_fonts = $config["data"]["settings"]["customizerSign"]["text"]["selectedFonts"];
                        $config_cliparts =$config["data"]["settings"]["customizerSign"]["images"]["enableClipart"] == true ? $config["data"]["settings"]["customizerSign"]["images"]["enableClipart"]["selectedClipartGroups"] : [];
                        
                        $visibleFonts = [];
                        foreach ( $config_fonts as $font ) {
                            if(isset($all_fonts[$font])){
                                $visibleFonts[]=$all_fonts[$font];
                            }
                        }
                        $this->includes_config_fonts($visibleFonts);
                        $this->include_custom_css($config["data"]["settings"]["themeColors"]["customCSS"]);
                        $visibleCliparts = [];
                        foreach ( $config_cliparts as $part ) {
                            if(isset($all_cliparts_groups[$part])){
                                $visibleCliparts[]=$all_cliparts_groups[$part];
                            }
                        }
                        $all_manages = [
                            "fonts"=>$visibleFonts,
                            "cliparts"=>$visibleCliparts,
                            "borders"=>$all_borders,
                            "pageSettings" => $pageSettings,
                            "allShapes" => $all_shapes,
                            "allFixingMethod" => $all_fixingMethods,
                            "allBorder" => $all_borders,
                            "outputOptions" => $outputOptions,
                        ];
                        $product_price   = $product->get_price();
                        //$price_format  = ncpc_get_price_format();
                        $available_variations = array();
                        if ( $product->get_type() === 'variable' ) {
                            $available_variations = $product->get_available_variations();
                        }
                        $templates = [];
                        if($tplid !== false){
                           $templates =  get_post_meta($configId,"aso-templates",true);
                           if(isset($templates[$tplid])){
                                $template = $templates[$tplid];
                                $product_price = $templates[$tplid]["basePrice"];
                           }else{
                                $template = '';
                           }
                        }
                        $ASO = [
                            'skin' => $config["data"]["settings"]['themeColors']['skin'],
                            'productID' => $productid,
                            'product'   => $product,
                            'currentConfig' => $configData,
                            "managesData" =>$all_manages,
                            'regularPrice'       => trim($product_price) != '' ? $product_price : 0 ,
                            'thousandSep'        => wc_get_price_thousand_separator(),
                            'decimalSep'         => wc_get_price_decimal_separator(),
                            'decimals'           => wc_get_price_decimals(),
                            'nbDecimals'         => wc_get_price_decimals(),
                            'currencySymbol'     => html_entity_decode(get_woocommerce_currency_symbol()),
                            'currency_pos'       => get_option('woocommerce_currency_pos'),
                            'variations'          => $available_variations,
                            "fixing_methods_url"  => ASO_ASSETS.'/images/fixing-methodes',
                            "borders_url"  => ASO_ASSETS.'/images/borders',
                            "templates"    =>[
                                "designFromTemplate"=>isset($template) && !is_string($template) ? true : false,
                                "template"=>isset($template) && !is_string($template) ?  $template : []
                            ],
                            "frontend_nonce"      => wp_create_nonce('aso_add_to_cart_after_custom')
                        ];
                        wp_enqueue_script( 'aso-frontend',ASO_ASSETS . '/js/frontend.js',[ 'jquery', 'aso-vendor', 'aso-runtime' ],true,filemtime( ASO_PATH . '/assets/js/frontend.js' ) );
                        wp_enqueue_script( 'aso-frontend');
                        wp_localize_script("aso-frontend","aso_configurator_data",$ASO);
                        wp_localize_script("aso-frontend","aso_data",[
                            "rest_url"=>get_rest_url()."aso/v1",
                            'ajax_url' => esc_url(admin_url('admin-ajax.php')),
                            "page"=>"configurator",
                            "site_url"=>urlencode(get_site_url()),
                            "author"=>ASO_ID
                        ]);
                        ?>
                        <div id='aso-frontend-app' class="aso-configurator-container">
                        </div>
                        <?php 
                    }
                }
            }
        }
        $content.= ob_get_clean();
        return $content;
    }

    private function includes_config_fonts($all_fonts) {
        foreach ( $all_fonts as $font ) {
            if ( ! empty( $font['url'] ) && $font['isGoogleFont'] ) {
                 $font_url   = str_replace( 'http://', '//', $font['url'] );
                 $this->include_config_ttf_font_style($font['label'],$font_url);
            } elseif ( ! empty( $font['url'] ) ) {
                $this->include_config_ttf_font_style($font['label'],$font['url']);
            }
        }
    }
    
    private function include_config_ttf_font_style( $font_label,$url ) {
        $font_label = str_replace(" ", "-", $font_label);
        $inline_style = "@font-face {
            font-family: ".esc_html( $font_label).";
            src: url('".esc_url($url)."') format('truetype');
        }";
        wp_add_inline_style( 'aso-frontend', $inline_style );
        wp_add_inline_style( 'aso-style', $inline_style );
        ?>
        <?php
    }

    public function render_aso_templates ($atts, $content=''){
        wp_enqueue_style( 'aso-frontend', ASO_ASSETS . '/css/frontend.css',false,ASO_VERSION);
        wp_enqueue_style( 'aso-style',ASO_ASSETS . '/css/style.css',false,ASO_VERSION );
        wp_enqueue_script( 'aso-frontend',ASO_ASSETS . '/js/frontend.js',[ 'jquery', 'aso-vendor', 'aso-runtime' ],true,filemtime( ASO_PATH . '/assets/js/frontend.js' ) );
        wp_enqueue_script( 'aso-frontend');
        extract( // phpcs:ignore
			shortcode_atts(
				array(
					'productid' => '0',
                    "cols"      =>  '3'
				),
				$atts,
                'aso-products'
			)
		);
        ob_start();
        ?> 
        <div id="aso-templates-loader" style="width:100%; height:50vh;">
            <div style="display: grid; 
                grid-template-columns: repeat(3, 1fr); 
                grid-gap: 10px; 
                padding: 10px; 
                width: 100%; 
                height: 100%"
            >
                <div 
                    style="display: flex; flex-direction: column; height: 100%;">
                    <div class="aso-loader-container"
                        style="background: linear-gradient(to right, #a1a1a1, #e4e4e7, #a1a1a1); width: 100%; height: 100%;">
                    </div>
                </div>
                <div 
                    style="display: flex; flex-direction: column; height: 100%;">
                    <div class="aso-loader-container"
                        style="background: linear-gradient(to right, #a1a1a1, #e4e4e7, #a1a1a1); width: 100%; height: 100%;">
                    </div>
                </div>
                <div 
                    style="display: flex; flex-direction: column; height: 100%;">
                    <div class="aso-loader-container"
                        style="background: linear-gradient(to right, #a1a1a1, #e4e4e7, #a1a1a1); width: 100%; height: 100%;">
                    </div>
                </div>
            </div>
        </div>
        <?php
        $product =wc_get_product($productid);
        if($product){
            $meta = get_post_meta($productid,'product-aso-metas',true);
                
            if(!empty($meta) && isset($meta[$productid]['config-id'])){
                $configId = $meta[$productid]['config-id'];
                if($configId !=0){
                    $templates = get_post_meta($configId,"aso-templates",true);
                    $all_categories = get_option("aso-templates-categories",[]);
                    $categories = [];
                    foreach ($templates as $template) {
                        if(isset($all_categories[$template["categoryId"]])){
                            if(!in_array(["value"=>$template["categoryId"],"name"=>$all_categories[$template["categoryId"]]],$categories)){
                                array_push($categories,["value"=>$template["categoryId"],"name"=>$all_categories[$template["categoryId"]]]);
                            }
                        }
                    }
                    $aso_product = new ASO_Product_Config($productid);
                    if(count($templates)>0){ ?>
                        <div id='aso-frontend-app' class="aso-templates"></div>
                        <?php
                        wp_localize_script("aso-frontend","aso_templates",[
                            "data"=>$templates,
                            "categories"=>$categories,
                            "productId"=>$productid,
                            "grid_cols"=>$cols,
                            "pageConfigs"=>get_option("aso_config_page"),
                            "frontend_nonce"      => wp_create_nonce('aso_add_to_cart_after_custom'),
                            "design_page_url"=>$aso_product->get_design_page_url(),
                            "currencySymbol"=>html_entity_decode(get_woocommerce_currency_symbol())
                        ]);
                        wp_localize_script("aso-frontend","aso_data",[
                            "rest_url"=>get_rest_url()."aso/v1",
                            'ajax_url' => esc_url(admin_url('admin-ajax.php')),
                            "page"=>"templates",
                            "site_url"=>urlencode(get_site_url()),
                            "author"=>ASO_ID
                        ]);
                    }
                }
            }
        }
        $content.= ob_get_clean();
        return $content;
    }

    private function include_custom_css( $css){
        wp_add_inline_style( 'aso-frontend', $css );
        wp_add_inline_style( 'aso-style', $css );
    }
}
