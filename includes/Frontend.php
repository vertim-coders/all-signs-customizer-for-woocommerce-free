<?php
namespace ASOWP;

use ASOWP_Product_Config;

/**
 * Frontend Pages Handler
 */
class ASOWP_Frontend
{

    public function __construct()
    {
        add_shortcode('asowp-configurator', [$this, 'render_asowp_configurator']);
        add_shortcode('asowp-templates', [$this, 'render_asowp_templates']);
    }

    /**
     * Render frontend app
     *
     * @param  array $atts
     * @param  string $content
     *
     * @return string
     */
    public function render_asowp_configurator($atts, $content = '')
    {
        wp_enqueue_style('asowp-frontend', ASOWP_ASSETS . '/css/frontend.css', false, ASOWP_VERSION);
        wp_enqueue_style('asowp-style', ASOWP_ASSETS . '/css/style.css', false, ASOWP_VERSION);
        wp_enqueue_script('asowp-runtime', ASOWP_ASSETS . '/js/runtime.js', [], filemtime(ASOWP_PATH . '/assets/js/runtime.js'), true);
        wp_enqueue_script('asowp-vendor', ASOWP_ASSETS . '/js/vendors.js', [], filemtime(ASOWP_PATH . '/assets/js/vendors.js'), true);
        wp_enqueue_script('asowp-frontend', ASOWP_ASSETS . '/js/frontend.js', ['jquery', 'asowp-vendor', 'asowp-runtime'], filemtime(ASOWP_PATH . '/assets/js/frontend.js'), true);
        extract( // phpcs:ignore
            shortcode_atts(
                array(
                    'productid' => '0',
                    'tplid' => false,
                ),
                $atts,
                'asowp-products'
            )
        );
        ob_start();
        ?>
                <div id="asowp-configurator-loader" style="height:90vh;">
                    <div class="asowp-body">
                        <div class="asowp-main">
                            <div style="width: 100%; height: 10%; margin-top: 10px; display: flex; justify-content: space-between;">
                                <div
                                    style="background: linear-gradient(to right, #a1a1a1, #e4e4e7, #a1a1a1); width: 21.33%; height: 100%;animation: pulseGradient 1.5s ease infinite;">
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
                                <div
                                    style="background: linear-gradient(to right, #a1a1a1, #e4e4e7, #a1a1a1); width: 21.33%; height: 100%;animation: pulseGradient 1.5s ease infinite;">
                                </div>
                            </div>

                            <div style="width: 100%; height: 90%; margin-top: 20px;">
                                <div style="width: 100%; height: 80%; display: flex; justify-content: center; align-items: center;">
                                    <div
                                        style="background: linear-gradient(to right, #a1a1a1, #e4e4e7, #a1a1a1); width: 40%; height: 50%;animation: pulseGradient 1.5s ease infinite;">
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
                        <div class="asowp-sidebar">
                            <div class="asowp-sideBar-option1"> </div>
                            <div class="asowp-sideBar-option2">
                                <div
                                    style="background: linear-gradient(to right, #a1a1a1, #e4e4e7, #a1a1a1); width: 90%; height: 10%; animation: pulseGradient 1.5s ease infinite;">
                                </div>
                                <div
                                    style="background: linear-gradient(to right, #a1a1a1, #e4e4e7, #a1a1a1); width: 90%; height: 10%; margin-top: 20px; animation: pulseGradient 1.5s ease infinite;">
                                </div>
                            </div>
                            <div class="asowp-mobile-options">
                                <div
                                    style="background: linear-gradient(to right, #a1a1a1, #e4e4e7, #a1a1a1); width: 90%; height: 33%; margin-top: 10px; animation: pulseGradient 1.5s ease infinite;">
                                </div>
                                <div
                                    style="background: linear-gradient(to right, #a1a1a1, #e4e4e7, #a1a1a1); width: 90%; height: 33%; margin-top: 10px; animation: pulseGradient 1.5s ease infinite;">
                                </div>
                                <div
                                    style="background: linear-gradient(to right, #a1a1a1, #e4e4e7, #a1a1a1); width: 90%; height: 33%; margin-top: 10px; animation: pulseGradient 1.5s ease infinite;">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <?php
                $product = wc_get_product($productid);
                if ($product) {
                    $meta = get_post_meta($productid, 'product-asowp-metas', true);

                    if (!empty($meta) && isset($meta[$productid]['config-id'])) {
                        $configId = $meta[$productid]['config-id'];
                        if ($configId != 0) {
                            $config = get_post_meta($configId, "asowp-configs-meta", true);
                            $pageSettings = get_option("asowp_config_page", [])["others"];
                            $all_cliparts_groups = get_option("asowp-manages-cliparts", []);
                            $all_fonts = get_option("asowp-manages-fonts", []);
                            $all_shapes = get_option("asowp_all_shapes", []);
                            $all_fixingMethods = get_option("asowp_all_fixingMethods", []);
                            $all_borders = get_option("asowp_all_borders", []);
                            $outputOptions = get_option("asowp_output_options", []);

                            if (is_array($config) && !empty($config)) {
                                $configData = [
                                    'name' => get_post_field('post_title', $configId),
                                    "description" => get_post_field('post_content', $configId),
                                    "icon" => $config["icon"],
                                    "popImg" => $config["popImg"],
                                    "data" => $config["data"]
                                ];
                                $config_fonts = $config["data"]["settings"]["customizerSign"]["text"]["selectedFonts"];
                                $config_cliparts = $config["data"]["settings"]["customizerSign"]["images"]["enableClipart"] == true ? $config["data"]["settings"]["customizerSign"]["images"]["enableClipart"]["selectedClipartGroups"] : [];

                                $visibleFonts = [];
                                foreach ($config_fonts as $font) {
                                    if (isset($all_fonts[$font])) {
                                        $visibleFonts[] = $all_fonts[$font];
                                    }
                                }
                                $this->includes_config_fonts($visibleFonts);
                                $this->include_custom_css($config["data"]["settings"]["themeColors"]["customCSS"]);
                                $visibleCliparts = [];
                                foreach ($config_cliparts as $part) {
                                    if (isset($all_cliparts_groups[$part])) {
                                        $visibleCliparts[] = $all_cliparts_groups[$part];
                                    }
                                }
                                $all_manages = [
                                    "fonts" => $visibleFonts,
                                    "cliparts" => $visibleCliparts,
                                    "borders" => $all_borders,
                                    "pageSettings" => $pageSettings,
                                    "allShapes" => $all_shapes,
                                    "allFixingMethod" => $all_fixingMethods,
                                    "allBorder" => $all_borders,
                                    "outputOptions" => $outputOptions,
                                ];
                                $product_price = $product->get_price();
                                //$price_format  = ncpc_get_price_format();
                                $available_variations = array();
                                if ($product->get_type() === 'variable') {
                                    $available_variations = $product->get_available_variations();
                                }
                                $templates = [];
                                if ($tplid !== false) {
                                    $templates = get_post_meta($configId, "asowp-templates", true);
                                    if (isset($templates[$tplid])) {
                                        $template = $templates[$tplid];
                                        $template["data"] = isset( $template["data_file"]) ? asowp_get_large_data($template["data_file"])  : $template["data"] ;
                                        $product_price = $templates[$tplid]["basePrice"];
                                    } else {
                                        $template = '';
                                    }
                                }
                                $ASO = [
                                    'skin' => $config["data"]["settings"]['themeColors']['skin'],
                                    'productID' => $productid,
                                    'product' => $product,
                                    'currentConfig' => $configData,
                                    "managesData" => $all_manages,
                                    'regularPrice' => trim($product_price) != '' ? $product_price : 0,
                                    'thousandSep' => wc_get_price_thousand_separator(),
                                    'decimalSep' => wc_get_price_decimal_separator(),
                                    'decimals' => wc_get_price_decimals(),
                                    'nbDecimals' => wc_get_price_decimals(),
                                    'currencySymbol' => html_entity_decode(get_woocommerce_currency_symbol()),
                                    'currency_pos' => get_option('woocommerce_currency_pos'),
                                    'variations' => $available_variations,
                                    "fixing_methods_url" => ASOWP_ASSETS . '/images/fixing-methodes',
                                    "borders_url" => ASOWP_ASSETS . '/images/borders',
                                    "templates" => [
                                        "designFromTemplate" => isset($template) && !is_string($template) ? true : false,
                                        "template" => isset($template) && !is_string($template) ? $template : []
                                    ],
                                    "frontend_nonce" => wp_create_nonce('asowp_add_to_cart_after_custom')
                                ];
                                wp_localize_script("asowp-frontend", "asowp_configurator_data", $ASO);
                                wp_localize_script("asowp-frontend", "asowp_data", [
                                    "rest_url" => get_rest_url() . "asowp/v1",
                                    'ajax_url' => esc_url(admin_url('admin-ajax.php')),
                                    "caches" => get_transient('asowp_health-state-checking'),
                                    "page" => "configurator",
                                    "site_url" => urlencode(get_site_url()),
                                    "author" => ASOWP_ID
                                ]);
                                ?>
                                                <div id='asowp-frontend-app' class="asowp-configurator-container">
                                                </div>
                                                <?php
                            }
                        }
                    }
                }
                $content .= ob_get_clean();
                return $content;
    }

    private function includes_config_fonts($all_fonts)
    {
        foreach ($all_fonts as $font) {
            if (!empty($font['url']) && $font['isGoogleFont']) {
                $font_url = str_replace('http://', '//', $font['url']);
                $this->include_config_ttf_font_style($font['label'], $font_url);
            } elseif (!empty($font['url'])) {
                $this->include_config_ttf_font_style($font['label'], $font['url']);
            }
        }
    }

    private function include_config_ttf_font_style($font_label, $url)
    {
        $font_label = str_replace(" ", "-", $font_label);
        $inline_style = "@font-face {
            font-family: " . esc_html($font_label) . ";
            src: url('" . esc_url($url) . "') format('truetype');
        }";
        wp_add_inline_style('asowp-frontend', $inline_style);
        wp_add_inline_style('asowp-style', $inline_style);
        ?>
            <?php
    }

    public function render_asowp_templates($atts, $content = '')
    {
        wp_enqueue_style('asowp-frontend', ASOWP_ASSETS . '/css/frontend.css', false, ASOWP_VERSION);
        wp_enqueue_style('asowp-style', ASOWP_ASSETS . '/css/style.css', false, ASOWP_VERSION);
        wp_enqueue_script('asowp-runtime', ASOWP_ASSETS . '/js/runtime.js', [], filemtime(ASOWP_PATH . '/assets/js/runtime.js'), true);
        wp_enqueue_script('asowp-vendor', ASOWP_ASSETS . '/js/vendors.js', [], filemtime(ASOWP_PATH . '/assets/js/vendors.js'), true);
        wp_enqueue_script('asowp-frontend', ASOWP_ASSETS . '/js/frontend.js', ['jquery', 'asowp-vendor', 'asowp-runtime'], filemtime(ASOWP_PATH . '/assets/js/frontend.js'), true);
        extract( // phpcs:ignore
            shortcode_atts(
                array(
                    'productid' => '0',
                    "cols" => '3'
                ),
                $atts,
                'asowp-products'
            )
        );
        ob_start();
        ?>
                <div id="asowp-templates-loader">
                    <div class="asowp-grid-container">
                        <div style="display: flex; flex-direction: column; height: 100%;">
                            <div class="asowp-loader-container"
                                style="background: linear-gradient(to right, #a1a1a1, #e4e4e7, #a1a1a1); width: 100%; height: 100%;">
                            </div>
                        </div>
                        <div style="display: flex; flex-direction: column; height: 100%;">
                            <div class="asowp-loader-container"
                                style="background: linear-gradient(to right, #a1a1a1, #e4e4e7, #a1a1a1); width: 100%; height: 100%;">
                            </div>
                        </div>
                        <div style="display: flex; flex-direction: column; height: 100%;">
                            <div class="asowp-loader-container"
                                style="background: linear-gradient(to right, #a1a1a1, #e4e4e7, #a1a1a1); width: 100%; height: 100%;">
                            </div>
                        </div>
                    </div>
                </div>
                <?php
                $product = wc_get_product($productid);
                if ($product) {
                    $meta = get_post_meta($productid, 'product-asowp-metas', true);
                    $product_price = $product->get_price();
                    if (!empty($meta) && isset($meta[$productid]['config-id'])) {
                        $configId = $meta[$productid]['config-id'];
                        if ($configId != 0) {
                            $templates = get_post_meta($configId, "asowp-templates", true);
                            $all_categories = get_option("asowp-templates-categories", []);
                            $categories = [];
                            foreach ($templates as $key=> $template) {
                                if (isset($all_categories[$template["categoryId"]])) {
                                    if (!in_array(["value" => $template["categoryId"], "name" => $all_categories[$template["categoryId"]]], $categories)) {
                                        array_push($categories, ["value" => $template["categoryId"], "name" => $all_categories[$template["categoryId"]]]);
                                    }
                                }

                                $template["data"] = isset( $template["data_file"]) ? asowp_get_large_data($template["data_file"])  : $template["data"] ;
                                $templates[$key] = $template;

                            }
                            $asowp_product = new ASOWP_Product_Config($productid);
                            if (count($templates) > 0) { ?>
                                                <div id='asowp-frontend-app' class="asowp-templates"></div>
                                                <?php
                                                wp_localize_script("asowp-frontend", "asowp_templates", [
                                                    "data" => $templates,
                                                    "categories" => $categories,
                                                    "productId" => $productid,
                                                    "grid_cols" => $cols,
                                                    'regularPrice' => trim($product_price) != '' ? $product_price : 0,
                                                    'thousandSep' => wc_get_price_thousand_separator(),
                                                    'decimalSep' => wc_get_price_decimal_separator(),
                                                    'decimals' => wc_get_price_decimals(),
                                                    'nbDecimals' => wc_get_price_decimals(),
                                                    'currencySymbol' => html_entity_decode(get_woocommerce_currency_symbol()),
                                                    'currency_pos' => get_option('woocommerce_currency_pos'),
                                                    "pageConfigs" => get_option("asowp_config_page"),
                                                    "frontend_nonce" => wp_create_nonce('asowp_add_to_cart_after_custom'),
                                                    "design_page_url" => $asowp_product->get_design_page_url(),
                                                ]);
                                                wp_localize_script("asowp-frontend", "asowp_data", [
                                                    "rest_url" => get_rest_url() . "asowp/v1",
                                                    'ajax_url' => esc_url(admin_url('admin-ajax.php')),
                                                    "caches" => get_transient('asowp_health-state-checking'),
                                                    "page" => "templates",
                                                    "site_url" => urlencode(get_site_url()),
                                                    "author" => ASOWP_ID
                                                ]);
                            }
                        }
                    }
                }
                $content .= ob_get_clean();
                return $content;
    }

    private function include_custom_css($css)
    {
        wp_add_inline_style('asowp-frontend', $css);
    }
}
