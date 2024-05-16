<?php
namespace ASO;

/**
 * Frontend Pages Handler
 */
class ASO_Frontend {

    public function __construct() {
        add_shortcode( 'aso-configurator', [ $this, 'render_aso_frontend' ] );
    }

    /**
     * Render frontend app
     *
     * @param  array $atts
     * @param  string $content
     *
     * @return string
     */
    public function render_aso_frontend( $atts, $content = '' ) {
        wp_enqueue_style( 'aso-frontend', ASO_ASSETS . '/css/frontend.css',false,ASO_VERSION);
        wp_enqueue_style( 'aso-style',ASO_ASSETS . '/css/style.css',false,ASO_VERSION );
        wp_enqueue_script( 'aso-frontend' );
        // wp_enqueue_script( 'aso-editor-script' );
        wp_enqueue_script( 'aso-fabric' );
        extract( // phpcs:ignore
			shortcode_atts(
				array(
					'productid' => '0'
				),
				$atts,
                'aso-products'
			)
		);
        ob_start();
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
                        
                        $ASO = array(
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
                            "frontend_nonce"      => wp_create_nonce('aso_add_to_cart_after_custom')
                        );
                        ?>
                        <div id='aso-frontend-app'></div>
                        <?php 
                        $this->includes_config_fonts($visibleFonts);
                        wp_localize_script("aso-product-min","aso_configurator_data",$ASO);
                        wp_localize_script("aso-frontend","aso_configurator_data",$ASO);
                        wp_localize_script("aso-product-min","aso_data",[
                            "rest_url"=>get_rest_url()."aso/v1"
                        ]);
                        wp_localize_script("aso-frontend","aso_data",[
                            "rest_url"=>get_rest_url()."aso/v1"
                        ]);
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
}
