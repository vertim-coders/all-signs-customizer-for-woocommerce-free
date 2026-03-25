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
        add_shortcode('asowp-products', [$this, 'render_asowp_products']);
    }

    public function render_asowp_products($atts, $content = '')
    {
        wp_enqueue_style('asowp-frontend', ASOWP_ASSETS . '/css/frontend.css', false, ASOWP_VERSION);
        wp_enqueue_style('asowp-style', ASOWP_ASSETS . '/css/style.css', false, ASOWP_VERSION);

        $atts = shortcode_atts([
            'cols' => '3',
            'ids' => '',
            'limit' => '-1',
            'orderby' => 'date',
            'order' => 'DESC',
        ], $atts, 'asowp-products');

        $cols = absint($atts['cols']);
        if ($cols < 1) {
            $cols = 1;
        }
        if ($cols > 6) {
            $cols = 6;
        }

        $limit = intval($atts['limit']);
        if ($limit === 0) {
            $limit = -1;
        }

        $ids = array_filter(array_map('absint', preg_split('/[,\s]+/', (string) $atts['ids'])));

        $query_args = [
            'post_type' => 'product',
            'post_status' => 'publish',
            'posts_per_page' => $limit,
            'orderby' => sanitize_key($atts['orderby']),
            'order' => strtoupper($atts['order']) === 'ASC' ? 'ASC' : 'DESC',
            'no_found_rows' => true,
            'ignore_sticky_posts' => true,
            'update_post_meta_cache' => false,
            'update_post_term_cache' => false,
        ];

        if (!empty($ids)) {
            $query_args['post__in'] = $ids;
            $query_args['orderby'] = 'post__in';
        } else {
            $query_args['meta_query'] = [
                [
                    'key' => 'product-asowp-metas',
                    'value' => 'config-id";s:1:"0"',
                    'compare' => 'NOT LIKE',
                ],
            ];
        }

        $products = new \WP_Query($query_args);
        $visible_cards = 0;
        $page_settings = get_option("asowp_config_page");
        $button_labels = isset($page_settings['buttons']) && is_array($page_settings['buttons']) ? $page_settings['buttons'] : [];
        $customize_label = isset($button_labels['productDesignButton']) && $button_labels['productDesignButton'] !== '' ? $button_labels['productDesignButton'] : __('Customize', 'all-signs-options-pro');
        $template_label = isset($button_labels['productTemplateButton']) && $button_labels['productTemplateButton'] !== '' ? $button_labels['productTemplateButton'] : __('Templates', 'all-signs-options-pro');

        ob_start();

        if ($products->have_posts()) {
            ?>
            <div class="asowp-products-grid" style="--asowp-products-cols: <?php echo esc_attr($cols); ?>;">
                <?php
                while ($products->have_posts()) {
                    $products->the_post();
                    $product_id = get_the_ID();
                    $product = wc_get_product($product_id);
                    if (!$product) {
                        continue;
                    }

                    $config_id = $this->get_product_config_id($product_id);
                    $config_product_id = $product_id;

                    if (!$config_id && $product->is_type('variable')) {
                        foreach ($product->get_children() as $variation_id) {
                            $config_id = $this->get_product_config_id($variation_id);
                            if ($config_id) {
                                $config_product_id = $variation_id;
                                break;
                            }
                        }
                    }

                    if (!$config_id || !get_post($config_id)) {
                        continue;
                    }

                    $asowp_product = new ASOWP_Product_Config($config_product_id);
                    if (!$asowp_product->is_asowp_customizable()) {
                        continue;
                    }

                    $templates = get_post_meta($config_id, 'asowp-templates', true);
                    if (!is_array($templates)) {
                        $templates = [];
                    }
                    $templates = array_values(array_filter($templates, [$this, 'is_template_visible']));
                    $has_templates = count($templates) > 0;

                    $design_url = $asowp_product->get_design_page_url();
                    if ($design_url === '') {
                        $design_url = get_permalink($product_id);
                    }
                    $templates_url = $has_templates ? $asowp_product->get_templates_page_url() : '';

                    $description = $product->get_short_description();
                    if ($description === '') {
                        $description = $product->get_description();
                    }
                    $description = wp_trim_words(wp_strip_all_tags($description), 24, '...');
                    ?>
                    <article class="asowp-product-card">
                        <a class="asowp-product-card__image" href="<?php echo esc_url(get_permalink($product_id)); ?>">
                            <?php echo wp_kses_post($product->get_image('large', ['class' => 'asowp-product-card__img', 'loading' => 'lazy'])); ?>
                        </a>
                        <div class="asowp-product-card__body">
                            <h3 class="asowp-product-card__title">
                                <a href="<?php echo esc_url(get_permalink($product_id)); ?>">
                                    <?php echo esc_html($product->get_name()); ?>
                                </a>
                            </h3>
                            <?php if ($description !== '') { ?>
                                <p class="asowp-product-card__desc"><?php echo esc_html($description); ?></p>
                            <?php } ?>
                            <div class="asowp-product-card__actions">
                                <a class="asowp-product-card__btn asowp-product-card__btn--customize"
                                    href="<?php echo esc_url($design_url); ?>">
                                    <?php echo esc_html($customize_label); ?>
                                </a>
                                <?php if ($has_templates && $templates_url !== '') { ?>
                                    <a class="asowp-product-card__btn asowp-product-card__btn--template"
                                        href="<?php echo esc_url($templates_url); ?>">
                                        <?php echo esc_html($template_label); ?>
                                    </a>
                                <?php } else { ?>
                                    <span
                                        class="asowp-product-card__btn asowp-product-card__btn--template asowp-product-card__btn--disabled"
                                        aria-disabled="true">
                                        <?php echo esc_html($template_label); ?>
                                    </span>
                                <?php } ?>
                            </div>
                        </div>
                    </article>
                    <?php
                    $visible_cards++;
                }
                ?>
            </div>
            <?php
        }

        if ($visible_cards === 0) {
            ?>
            <div class="asowp-products-empty">
                <?php echo esc_html__('No configurable products found.', 'all-signs-options-pro'); ?>
            </div>
            <?php
        }

        wp_reset_postdata();

        $content .= ob_get_clean();
        return $content;
    }

    public function render_asowp_configurator($atts, $content = '')
    {
        extract(shortcode_atts(['productid' => '0', 'tplid' => false], $atts, 'asowp-products'));

        ob_start();
        $product = wc_get_product($productid);
        if ($product) {
            $meta = get_post_meta($productid, 'product-asowp-metas', true);

            if (!empty($meta) && isset($meta[$productid]['config-id'])) {
                $configId = $meta[$productid]['config-id'];
                if ($configId != 0) {
                    $config = get_post_meta($configId, "asowp-configs-meta", true);
                    $page_settings = get_option("asowp_config_page", []);
                    $pageSettings = isset($page_settings['others']) && is_array($page_settings['others']) ? $page_settings['others'] : [];
                    $all_cliparts_groups = get_option("asowp-manages-cliparts", []);
                    $all_fonts = get_option("asowp-manages-fonts", []);
                    $all_shapes = get_option("asowp_all_shapes", []);
                    $all_fixingMethods = get_option("asowp_all_fixingMethods", []);
                    $all_borders = get_option("asowp_all_borders", []);
                    $outputOptions = get_option("asowp_output_options", []);

                    if (is_array($config) && !empty($config)) {
                        $this->enqueue_frontend_app_assets();
                        ?>
                        <div id="asowp-configurator-loader" class="asowp-configurator-skeleton">
                            <div class="asowp-configurator-skeleton__top">
                                <div class="asowp-skeleton asowp-skeleton-pill"></div>
                                <div class="asowp-skeleton asowp-skeleton-pill"></div>
                                <div class="asowp-skeleton asowp-skeleton-pill"></div>
                                <div class="asowp-skeleton asowp-skeleton-pill"></div>
                            </div>
                            <div class="asowp-configurator-skeleton__main">
                                <div class="asowp-skeleton asowp-skeleton-canvas"></div>
                                <div class="asowp-configurator-skeleton__sidebar">
                                    <div class="asowp-skeleton asowp-skeleton-panel"></div>
                                    <div class="asowp-skeleton asowp-skeleton-panel"></div>
                                    <div class="asowp-skeleton asowp-skeleton-panel"></div>
                                </div>
                            </div>
                            <div class="asowp-configurator-skeleton__bottom">
                                <div class="asowp-skeleton asowp-skeleton-chip"></div>
                                <div class="asowp-skeleton asowp-skeleton-chip"></div>
                                <div class="asowp-skeleton asowp-skeleton-chip"></div>
                                <div class="asowp-skeleton asowp-skeleton-chip"></div>
                                <div class="asowp-skeleton asowp-skeleton-chip"></div>
                            </div>
                        </div>
                        <?php
                        $configData = [
                            'name' => get_post_field('post_title', $configId),
                            'description' => get_post_field('post_content', $configId),
                            'icon' => $config['icon'],
                            'popImg' => $config['popImg'],
                            'data' => $config['data']
                        ];
                        $config_fonts = $config['data']['settings']['customizerSign']['text']['selectedFonts'];
                        $config_cliparts = $config['data']['settings']['customizerSign']['images']['enableClipart'] == true ? $config['data']['settings']['customizerSign']['images']['enableClipart']['selectedClipartGroups'] : [];

                        $visibleFonts = [];
                        foreach ($config_fonts as $font) {
                            if (isset($all_fonts[$font])) {
                                $visibleFonts[] = $all_fonts[$font];
                            }
                        }

                        $this->includes_config_fonts($visibleFonts);
                        $this->include_custom_css($config['data']['settings']['themeColors']['customCSS']);

                        $visibleCliparts = [];
                        foreach ($config_cliparts as $part) {
                            if (isset($all_cliparts_groups[$part])) {
                                $visibleCliparts[] = $all_cliparts_groups[$part];
                            }
                        }

                        $all_manages = [
                            'fonts' => $visibleFonts,
                            'cliparts' => $visibleCliparts,
                            'borders' => $all_borders,
                            'pageSettings' => $pageSettings,
                            'allShapes' => $all_shapes,
                            'allFixingMethod' => $all_fixingMethods,
                            'allBorder' => $all_borders,
                            'outputOptions' => $outputOptions,
                        ];

                        $product_price = $product->get_price();

                        $templates = [];
                        if ($tplid !== false) {
                            $templates = get_post_meta($configId, "asowp-templates", true);
                            if (isset($templates[$tplid])) {
                                $template = $templates[$tplid];
                                $template['data'] = isset($template['data_file']) ? asowp_get_large_data($template['data_file']) : $template['data'];
                                $product_price = $templates[$tplid]['basePrice'];
                            } else {
                                $template = '';
                            }
                        }

                        $ASO = [
                            'skin' => $config['data']['settings']['themeColors']['skin'],
                            'productID' => $productid,
                            'currentConfig' => $configData,
                            'managesData' => $all_manages,
                            'regularPrice' => trim($product_price) !== '' ? $product_price : 0,
                            'thousandSep' => wc_get_price_thousand_separator(),
                            'decimalSep' => wc_get_price_decimal_separator(),
                            'decimals' => wc_get_price_decimals(),
                            'nbDecimals' => wc_get_price_decimals(),
                            'currencySymbol' => html_entity_decode(get_woocommerce_currency_symbol()),
                            'currency_pos' => get_option('woocommerce_currency_pos'),
                            'fixing_methods_url' => ASOWP_ASSETS . '/images/fixing-methodes',
                            'borders_url' => ASOWP_ASSETS . '/images/borders',
                            'templates' => [
                                'designFromTemplate' => isset($template) && !is_string($template),
                                'template' => isset($template) && !is_string($template) ? $template : []
                            ],
                            'frontend_nonce' => wp_create_nonce('asowp_add_to_cart_after_custom')
                        ];

                        wp_localize_script('asowp-frontend', 'asowp_configurator_data', $ASO);
                        wp_localize_script('asowp-frontend', 'asowp_data', [
                            'rest_url' => get_rest_url() . 'asowp/v1',
                            'ajax_url' => esc_url(admin_url('admin-ajax.php')),
                            'caches' => function_exists('asowp_get_license_cache_timestamp') ? \asowp_get_license_cache_timestamp() : 0,
                            'page' => 'configurator',
                            'site_url' => urlencode(get_site_url()),
                            'author' => ASOWP_ID
                        ]);
                        ?>
                        <div class="asowp-frontend-app asowp-configurator-container" data-asowp-page="configurator"></div>
                        <?php
                    }
                }
            }
        }

        $content .= ob_get_clean();
        return $content;
    }

    public function render_asowp_templates($atts, $content = '')
    {
        extract(shortcode_atts(['productid' => '0', 'cols' => '3'], $atts, 'asowp-products'));

        ob_start();

        $product = wc_get_product($productid);
        if ($product) {
            $meta = get_post_meta($productid, 'product-asowp-metas', true);
            $product_price = $product->get_price();
            if (!empty($meta) && isset($meta[$productid]['config-id'])) {
                $configId = $meta[$productid]['config-id'];
                if ($configId != 0) {
                    $templates = get_post_meta($configId, 'asowp-templates', true);
                    if (!is_array($templates)) {
                        $templates = [];
                    }
                    $templates = array_values(array_filter($templates, [$this, 'is_template_visible']));
                    $all_categories = get_option('asowp-templates-categories', []);
                    $categories = [];
                    foreach ($templates as $template) {
                        if (isset($all_categories[$template['categoryId']])) {
                            $cat = ["value" => $template["categoryId"], "name" => $all_categories[$template["categoryId"]]];
                            if (!in_array($cat, $categories)) {
                                $categories[] = $cat;
                            }
                        }
                    }

                    $asowp_product = new ASOWP_Product_Config($productid);
                    $page_settings = get_option("asowp_config_page", []);
                    $this->enqueue_frontend_app_assets();
                    ?>
                    <div id="asowp-templates-loader">
                        <div class="asowp-templates-skeleton-grid">
                            <div class="asowp-skeleton-card">
                                <div class="asowp-skeleton asowp-skeleton-image"></div>
                                <div class="asowp-skeleton-body">
                                    <div class="asowp-skeleton asowp-skeleton-line asowp-skeleton-line--lg"></div>
                                    <div class="asowp-skeleton asowp-skeleton-line asowp-skeleton-line--md"></div>
                                    <div class="asowp-skeleton asowp-skeleton-line asowp-skeleton-line--sm"></div>
                                    <div class="asowp-skeleton asowp-skeleton-button"></div>
                                    <div class="asowp-skeleton asowp-skeleton-button"></div>
                                </div>
                            </div>
                            <div class="asowp-skeleton-card">
                                <div class="asowp-skeleton asowp-skeleton-image"></div>
                                <div class="asowp-skeleton-body">
                                    <div class="asowp-skeleton asowp-skeleton-line asowp-skeleton-line--lg"></div>
                                    <div class="asowp-skeleton asowp-skeleton-line asowp-skeleton-line--md"></div>
                                    <div class="asowp-skeleton asowp-skeleton-line asowp-skeleton-line--sm"></div>
                                    <div class="asowp-skeleton asowp-skeleton-button"></div>
                                    <div class="asowp-skeleton asowp-skeleton-button"></div>
                                </div>
                            </div>
                            <div class="asowp-skeleton-card">
                                <div class="asowp-skeleton asowp-skeleton-image"></div>
                                <div class="asowp-skeleton-body">
                                    <div class="asowp-skeleton asowp-skeleton-line asowp-skeleton-line--lg"></div>
                                    <div class="asowp-skeleton asowp-skeleton-line asowp-skeleton-line--md"></div>
                                    <div class="asowp-skeleton asowp-skeleton-line asowp-skeleton-line--sm"></div>
                                    <div class="asowp-skeleton asowp-skeleton-button"></div>
                                    <div class="asowp-skeleton asowp-skeleton-button"></div>
                                </div>
                            </div>
                            <div class="asowp-skeleton-card">
                                <div class="asowp-skeleton asowp-skeleton-image"></div>
                                <div class="asowp-skeleton-body">
                                    <div class="asowp-skeleton asowp-skeleton-line asowp-skeleton-line--lg"></div>
                                    <div class="asowp-skeleton asowp-skeleton-line asowp-skeleton-line--md"></div>
                                    <div class="asowp-skeleton asowp-skeleton-line asowp-skeleton-line--sm"></div>
                                    <div class="asowp-skeleton asowp-skeleton-button"></div>
                                    <div class="asowp-skeleton asowp-skeleton-button"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="asowp-frontend-app asowp-templates" data-asowp-page="templates"></div>
                    <?php
                    wp_localize_script('asowp-frontend', 'asowp_templates', [
                        "data" => $templates,
                        "categories" => $categories,
                        "productId" => $productid,
                        "grid_cols" => $cols,
                        'regularPrice' => trim($product_price) !== '' ? $product_price : 0,
                        'thousandSep' => wc_get_price_thousand_separator(),
                        'decimalSep' => wc_get_price_decimal_separator(),
                        'decimals' => wc_get_price_decimals(),
                        'nbDecimals' => wc_get_price_decimals(),
                        'currencySymbol' => html_entity_decode(get_woocommerce_currency_symbol()),
                        'currency_pos' => get_option('woocommerce_currency_pos'),
                        "buttons" => isset($page_settings['buttons']) && is_array($page_settings['buttons']) ? $page_settings['buttons'] : [],
                        "frontend_nonce" => wp_create_nonce('asowp_add_to_cart_after_custom'),
                        "design_page_url" => $asowp_product->get_design_page_url(),
                    ]);
                    wp_localize_script('asowp-frontend', 'asowp_data', [
                        "rest_url" => get_rest_url() . "asowp/v1",
                        'ajax_url' => esc_url(admin_url('admin-ajax.php')),
                        "caches" => function_exists('asowp_get_license_cache_timestamp') ? \asowp_get_license_cache_timestamp() : 0,
                        "page" => "templates",
                        "site_url" => urlencode(get_site_url()),
                        "author" => ASOWP_ID
                    ]);
                }
            }
        }

        $content .= ob_get_clean();
        return $content;
    }

    private function is_template_visible($template)
    {
        if (!is_array($template)) {
            return false;
        }
        if (!array_key_exists('showOnFrontend', $template)) {
            return true;
        }
        $visible = filter_var($template['showOnFrontend'], FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE);
        if ($visible === null) {
            $visible = (bool) $template['showOnFrontend'];
        }
        return $visible;
    }

    private function get_product_config_id($product_id)
    {
        $meta = get_post_meta($product_id, 'product-asowp-metas', true);
        if (!is_array($meta) || !isset($meta[$product_id]['config-id'])) {
            return 0;
        }
        return absint($meta[$product_id]['config-id']);
    }

    private function enqueue_frontend_app_assets()
    {
        wp_enqueue_style('asowp-frontend', ASOWP_ASSETS . '/css/frontend.css', false, ASOWP_VERSION);
        wp_enqueue_style('asowp-style', ASOWP_ASSETS . '/css/style.css', false, ASOWP_VERSION);
        wp_enqueue_script('asowp-runtime', ASOWP_ASSETS . '/js/runtime.js', [], filemtime(ASOWP_PATH . '/assets/js/runtime.js'), true);
        wp_enqueue_script('asowp-vendor', ASOWP_ASSETS . '/js/vendors.js', [], filemtime(ASOWP_PATH . '/assets/js/vendors.js'), true);
        wp_enqueue_script('asowp-frontend', ASOWP_ASSETS . '/js/frontend.js', ['jquery', 'asowp-vendor', 'asowp-runtime', 'wp-i18n'], filemtime(ASOWP_PATH . '/assets/js/frontend.js'), true);
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
    }

    private function include_custom_css($css)
    {
        wp_add_inline_style('asowp-frontend', $css);
    }
}
