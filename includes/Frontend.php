<?php
namespace ASCWO;

use ASCWO_Product_Config;

/**
 * Frontend Pages Handler
 */
class ASCWO_Frontend
{

    public function __construct()
    {
        add_shortcode('ascwo-configurator', [$this, 'render_ascwo_configurator']);
        add_shortcode('ascwo-templates', [$this, 'render_ascwo_templates']);
        add_shortcode('ascwo-products', [$this, 'render_ascwo_products']);
    }

    public function render_ascwo_products($atts, $content = '')
    {
        wp_enqueue_style('ascwo-frontend', ASCWO_ASSETS . '/css/frontend.css', false, ASCWO_VERSION);
        wp_enqueue_style('ascwo-style', ASCWO_ASSETS . '/css/style.css', false, ASCWO_VERSION);

        $atts = shortcode_atts([
            'cols' => '3',
            'ids' => '',
            'limit' => '-1',
            'orderby' => 'date',
            'order' => 'DESC',
        ], $atts, 'ascwo-products');

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
                    'key' => 'product-ascwo-metas',
                    'value' => 'config-id";s:1:"0"',
                    'compare' => 'NOT LIKE',
                ],
            ];
        }

        $products = new \WP_Query($query_args);
        $visible_cards = 0;
        $page_settings = get_option("ascwo_config_page");
        $button_labels = isset($page_settings['buttons']) && is_array($page_settings['buttons']) ? $page_settings['buttons'] : [];
        $customize_label = isset($button_labels['productDesignButton']) && $button_labels['productDesignButton'] !== '' ? $button_labels['productDesignButton'] : __('Customize', 'all-signs-customizer-for-woocommerce-pro');
        $template_label = isset($button_labels['productTemplateButton']) && $button_labels['productTemplateButton'] !== '' ? $button_labels['productTemplateButton'] : __('Templates', 'all-signs-customizer-for-woocommerce-pro');

        ob_start();

        if ($products->have_posts()) {
            ?>
            <div class="ascwo-products-grid" style="--ascwo-products-cols: <?php echo esc_attr($cols); ?>;">
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

                    $ascwo_product = new ASCWO_Product_Config($config_product_id);
                    if (!$ascwo_product->is_ascwo_customizable()) {
                        continue;
                    }

                    $templates = get_post_meta($config_id, 'ascwo-templates', true);
                    if (!is_array($templates)) {
                        $templates = [];
                    }
                    $templates = array_values(array_filter($templates, [$this, 'is_template_visible']));
                    $has_templates = count($templates) > 0;

                    $design_url = $ascwo_product->get_design_page_url();
                    if ($design_url === '') {
                        $design_url = get_permalink($product_id);
                    }
                    $templates_url = $has_templates ? $ascwo_product->get_templates_page_url() : '';

                    $description = $product->get_short_description();
                    if ($description === '') {
                        $description = $product->get_description();
                    }
                    $description = wp_trim_words(wp_strip_all_tags($description), 24, '...');
                    ?>
                    <article class="ascwo-product-card">
                        <a class="ascwo-product-card__image" href="<?php echo esc_url(get_permalink($product_id)); ?>">
                            <?php echo wp_kses_post($product->get_image('large', ['class' => 'ascwo-product-card__img', 'loading' => 'lazy'])); ?>
                        </a>
                        <div class="ascwo-product-card__body">
                            <h3 class="ascwo-product-card__title">
                                <a href="<?php echo esc_url(get_permalink($product_id)); ?>">
                                    <?php echo esc_html($product->get_name()); ?>
                                </a>
                            </h3>
                            <?php if ($description !== '') { ?>
                                <p class="ascwo-product-card__desc"><?php echo esc_html($description); ?></p>
                            <?php } ?>
                            <div class="ascwo-product-card__actions">
                                <a class="ascwo-product-card__btn ascwo-product-card__btn--customize"
                                    href="<?php echo esc_url($design_url); ?>">
                                    <?php echo esc_html($customize_label); ?>
                                </a>
                                <?php if ($has_templates && $templates_url !== '') { ?>
                                    <a class="ascwo-product-card__btn ascwo-product-card__btn--template"
                                        href="<?php echo esc_url($templates_url); ?>">
                                        <?php echo esc_html($template_label); ?>
                                    </a>
                                <?php } else { ?>
                                    <span
                                        class="ascwo-product-card__btn ascwo-product-card__btn--template ascwo-product-card__btn--disabled"
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
            <div class="ascwo-products-empty">
                <?php echo esc_html__('No configurable products found.', 'all-signs-customizer-for-woocommerce-pro'); ?>
            </div>
            <?php
        }

        wp_reset_postdata();

        $content .= ob_get_clean();
        return $content;
    }

    public function render_ascwo_configurator($atts, $content = '')
    {
        extract(shortcode_atts(['productid' => '0', 'tplid' => false], $atts, 'ascwo-products'));

        ob_start();
        $product = wc_get_product($productid);
        if ($product) {
            $meta = get_post_meta($productid, 'product-ascwo-metas', true);

            if (!empty($meta) && isset($meta[$productid]['config-id'])) {
                $configId = $meta[$productid]['config-id'];
                if ($configId != 0) {
                    $config = get_post_meta($configId, "ascwo-configs-meta", true);
                    $page_settings = get_option("ascwo_config_page", []);
                    $pageSettings = isset($page_settings['others']) && is_array($page_settings['others']) ? $page_settings['others'] : [];
                    $all_cliparts_groups = get_option("ascwo-manages-cliparts", []);
                    $all_fonts = get_option("ascwo-manages-fonts", []);
                    $all_shapes = get_option("ascwo_all_shapes", []);
                    $all_fixingMethods = get_option("ascwo_all_fixingMethods", []);
                    $all_borders = get_option("ascwo_all_borders", []);
                    $outputOptions = get_option("ascwo_output_options", []);

                    if (is_array($config) && !empty($config)) {
                        $this->enqueue_frontend_app_assets();
                        ?>
                        <div id="ascwo-configurator-loader" class="ascwo-configurator-skeleton">
                            <div class="ascwo-configurator-skeleton__top">
                                <div class="ascwo-skeleton ascwo-skeleton-pill"></div>
                                <div class="ascwo-skeleton ascwo-skeleton-pill"></div>
                                <div class="ascwo-skeleton ascwo-skeleton-pill"></div>
                                <div class="ascwo-skeleton ascwo-skeleton-pill"></div>
                            </div>
                            <div class="ascwo-configurator-skeleton__main">
                                <div class="ascwo-skeleton ascwo-skeleton-canvas"></div>
                                <div class="ascwo-configurator-skeleton__sidebar">
                                    <div class="ascwo-skeleton ascwo-skeleton-panel"></div>
                                    <div class="ascwo-skeleton ascwo-skeleton-panel"></div>
                                    <div class="ascwo-skeleton ascwo-skeleton-panel"></div>
                                </div>
                            </div>
                            <div class="ascwo-configurator-skeleton__bottom">
                                <div class="ascwo-skeleton ascwo-skeleton-chip"></div>
                                <div class="ascwo-skeleton ascwo-skeleton-chip"></div>
                                <div class="ascwo-skeleton ascwo-skeleton-chip"></div>
                                <div class="ascwo-skeleton ascwo-skeleton-chip"></div>
                                <div class="ascwo-skeleton ascwo-skeleton-chip"></div>
                            </div>
                        </div>
                        <?php
                        $configData = [
                            'name' => get_post_field('post_title', $configId),
                            'description' => get_post_field('post_content', $configId),
                            'icon' => $config['icon'],
                            'popImg' => $config['popImg'],
                            'data' => $frontend_data
                        ];
                        $visibleFonts = ConfigSchemaNormalizer::to_frontend_fonts($config_meta, is_array($all_fonts) ? $all_fonts : []);
                        $enable_clipart = isset($frontend_data['settings']['customizerSign']['images']['enableClipart'])
                            ? $frontend_data['settings']['customizerSign']['images']['enableClipart']
                            : false;
                        $config_cliparts = is_array($enable_clipart) && isset($enable_clipart['selectedClipartGroups']) && is_array($enable_clipart['selectedClipartGroups'])
                            ? $enable_clipart['selectedClipartGroups']
                            : [];

                        $this->includes_config_fonts($visibleFonts);
                        $this->include_custom_css(isset($frontend_data['settings']['themeColors']['customCSS']) ? $frontend_data['settings']['themeColors']['customCSS'] : '');

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
                            $templates = get_post_meta($configId, "ascwo-templates", true);
                            if (isset($templates[$tplid])) {
                                $template = $templates[$tplid];
                                $template['data'] = isset($template['data_file']) ? ascwo_get_large_data($template['data_file']) : $template['data'];
                                $product_price = $templates[$tplid]['basePrice'];
                            } else {
                                $template = '';
                            }
                        }

                        $ASO = [
                            'skin' => isset($frontend_data['settings']['themeColors']['skin']) ? $frontend_data['settings']['themeColors']['skin'] : 'default',
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
                            'fixing_methods_url' => ASCWO_ASSETS . '/images/fixing-methodes',
                            'borders_url' => ASCWO_ASSETS . '/images/borders',
                            'templates' => [
                                'designFromTemplate' => isset($template) && !is_string($template),
                                'template' => isset($template) && !is_string($template) ? $template : []
                            ],
                            'frontend_nonce' => wp_create_nonce('ascwo_add_to_cart_after_custom')
                        ];

                        wp_localize_script('ascwo-frontend', 'ascwo_configurator_data', $ASO);
                        wp_localize_script('ascwo-frontend', 'ascwo_data', [
                            'rest_url' => get_rest_url() . 'ascwo/v1',
                            'ajax_url' => esc_url(admin_url('admin-ajax.php')),
                            'caches' => function_exists('ascwo_get_license_cache_timestamp') ? \ascwo_get_license_cache_timestamp() : 0,
                            'page' => 'configurator',
                            'site_url' => urlencode(get_site_url()),
                            'author' => ASCWO_ID
                        ]);
                        ?>
                                                <div class="ascwo-frontend-app ascwo-configurator-container" data-ascwo-page="configurator"></div>
                                                <?php
                    }
                }
            }
        }

        $content .= ob_get_clean();
        return $content;
    }

    public function render_ascwo_templates($atts, $content = '')
    {
        extract(shortcode_atts(['productid' => '0', 'cols' => '3'], $atts, 'ascwo-products'));

        ob_start();

        $product = wc_get_product($productid);
        if ($product) {
            $meta = get_post_meta($productid, 'product-ascwo-metas', true);
            $product_price = $product->get_price();
            if (!empty($meta) && isset($meta[$productid]['config-id'])) {
                $configId = $meta[$productid]['config-id'];
                if ($configId != 0) {
                    $templates = get_post_meta($configId, 'ascwo-templates', true);
                    if (!is_array($templates)) {
                        $templates = [];
                    }
                    $templates = array_values(array_filter($templates, [$this, 'is_template_visible']));
                    $all_categories = get_option('ascwo-templates-categories', []);
                    $categories = [];
                    foreach ($templates as $template) {
                        if (isset($all_categories[$template['categoryId']])) {
                            $cat = ["value" => $template["categoryId"], "name" => $all_categories[$template["categoryId"]]];
                            if (!in_array($cat, $categories)) {
                                $categories[] = $cat;
                            }
                        }
                    }

                    $ascwo_product = new ASCWO_Product_Config($productid);
                    $page_settings = get_option("ascwo_config_page", []);
                    $this->enqueue_frontend_app_assets();
                    ?>
                                        <div id="ascwo-templates-loader">
                                            <div class="ascwo-templates-skeleton-grid">
                                                <div class="ascwo-skeleton-card">
                                                    <div class="ascwo-skeleton ascwo-skeleton-image"></div>
                                                    <div class="ascwo-skeleton-body">
                                                        <div class="ascwo-skeleton ascwo-skeleton-line ascwo-skeleton-line--lg"></div>
                                                        <div class="ascwo-skeleton ascwo-skeleton-line ascwo-skeleton-line--md"></div>
                                                        <div class="ascwo-skeleton ascwo-skeleton-line ascwo-skeleton-line--sm"></div>
                                                        <div class="ascwo-skeleton ascwo-skeleton-button"></div>
                                                        <div class="ascwo-skeleton ascwo-skeleton-button"></div>
                                                    </div>
                                                </div>
                                                <div class="ascwo-skeleton-card">
                                                    <div class="ascwo-skeleton ascwo-skeleton-image"></div>
                                                    <div class="ascwo-skeleton-body">
                                                        <div class="ascwo-skeleton ascwo-skeleton-line ascwo-skeleton-line--lg"></div>
                                                        <div class="ascwo-skeleton ascwo-skeleton-line ascwo-skeleton-line--md"></div>
                                                        <div class="ascwo-skeleton ascwo-skeleton-line ascwo-skeleton-line--sm"></div>
                                                        <div class="ascwo-skeleton ascwo-skeleton-button"></div>
                                                        <div class="ascwo-skeleton ascwo-skeleton-button"></div>
                                                    </div>
                                                </div>
                                                <div class="ascwo-skeleton-card">
                                                    <div class="ascwo-skeleton ascwo-skeleton-image"></div>
                                                    <div class="ascwo-skeleton-body">
                                                        <div class="ascwo-skeleton ascwo-skeleton-line ascwo-skeleton-line--lg"></div>
                                                        <div class="ascwo-skeleton ascwo-skeleton-line ascwo-skeleton-line--md"></div>
                                                        <div class="ascwo-skeleton ascwo-skeleton-line ascwo-skeleton-line--sm"></div>
                                                        <div class="ascwo-skeleton ascwo-skeleton-button"></div>
                                                        <div class="ascwo-skeleton ascwo-skeleton-button"></div>
                                                    </div>
                                                </div>
                                                <div class="ascwo-skeleton-card">
                                                    <div class="ascwo-skeleton ascwo-skeleton-image"></div>
                                                    <div class="ascwo-skeleton-body">
                                                        <div class="ascwo-skeleton ascwo-skeleton-line ascwo-skeleton-line--lg"></div>
                                                        <div class="ascwo-skeleton ascwo-skeleton-line ascwo-skeleton-line--md"></div>
                                                        <div class="ascwo-skeleton ascwo-skeleton-line ascwo-skeleton-line--sm"></div>
                                                        <div class="ascwo-skeleton ascwo-skeleton-button"></div>
                                                        <div class="ascwo-skeleton ascwo-skeleton-button"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="ascwo-frontend-app ascwo-templates" data-ascwo-page="templates"></div>
                                        <?php
                                        wp_localize_script('ascwo-frontend', 'ascwo_templates', [
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
                                            "frontend_nonce" => wp_create_nonce('ascwo_add_to_cart_after_custom'),
                                            "design_page_url" => $ascwo_product->get_design_page_url(),
                                        ]);
                                        wp_localize_script('ascwo-frontend', 'ascwo_data', [
                                            "rest_url" => get_rest_url() . "ascwo/v1",
                                            'ajax_url' => esc_url(admin_url('admin-ajax.php')),
                                            "caches" => function_exists('ascwo_get_license_cache_timestamp') ? \ascwo_get_license_cache_timestamp() : 0,
                                            "page" => "templates",
                                            "site_url" => urlencode(get_site_url()),
                                            "author" => ASCWO_ID
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
        $meta = get_post_meta($product_id, 'product-ascwo-metas', true);
        if (!is_array($meta) || !isset($meta[$product_id]['config-id'])) {
            return 0;
        }
        return absint($meta[$product_id]['config-id']);
    }

    private function enqueue_frontend_app_assets()
    {
        wp_enqueue_style('ascwo-frontend', ASCWO_ASSETS . '/css/frontend.css', false, ASCWO_VERSION);
        wp_enqueue_style('ascwo-style', ASCWO_ASSETS . '/css/style.css', false, ASCWO_VERSION);
        wp_enqueue_script('ascwo-runtime', ASCWO_ASSETS . '/js/runtime.js', [], filemtime(ASCWO_PATH . '/assets/js/runtime.js'), true);
        wp_enqueue_script('ascwo-vendor', ASCWO_ASSETS . '/js/vendors.js', [], filemtime(ASCWO_PATH . '/assets/js/vendors.js'), true);
        wp_enqueue_script('ascwo-frontend', ASCWO_ASSETS . '/js/frontend.js', ['jquery', 'ascwo-vendor', 'ascwo-runtime', 'wp-i18n'], filemtime(ASCWO_PATH . '/assets/js/frontend.js'), true);
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
        wp_add_inline_style('ascwo-frontend', $inline_style);
        wp_add_inline_style('ascwo-style', $inline_style);
    }

    private function include_custom_css($css)
    {
        wp_add_inline_style('ascwo-frontend', $css);
    }
}
