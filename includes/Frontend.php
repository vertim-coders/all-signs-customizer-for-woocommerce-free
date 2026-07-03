<?php
/**
 * Frontend pages handler.
 *
 * @package ASCWO
 */

namespace ASCWO;

use ASCWO_Product_Config;

/**
 * Frontend Pages Handler
 */
class ASCWO_Frontend
{

    /**
     * Register the public shortcodes used by the plugin.
     */
    public function __construct()
    {
        add_shortcode('ascwo-configurator', [$this, 'render_ascwo_configurator']);
        add_shortcode('ascwo-products', [$this, 'render_ascwo_products']);
    }

    /**
     * Register the inline data carrier used by the configurator module.
     *
     * @return void
     */
    private function enqueue_frontend_data_script()
    {
        if (!wp_script_is('ascwo-frontend-data', 'registered')) {
            wp_register_script('ascwo-frontend-data', false, array(), ASCWO_VERSION, true);
        }

        wp_enqueue_script('ascwo-frontend-data');
    }

    /**
     * Add global data before the configurator module executes.
     *
     * @param string $object_name JavaScript global object name.
     * @param array  $data        Data to expose.
     *
     * @return void
     */
    private function add_frontend_inline_data($object_name, array $data)
    {
        $this->enqueue_frontend_data_script();
        wp_add_inline_script(
            'ascwo-frontend-data',
            'window.' . $object_name . ' = ' . wp_json_encode($data) . ';',
            'before'
        );
    }

    private function normalize_global_asset_url($url)
    {
        $url = is_string($url) ? trim($url) : '';
        if ($url === '' || strpos($url, 'data:') === 0 || strpos($url, 'blob:') === 0) {
            return $url;
        }

        foreach (array('/assets/images/', '/assets/icons/', 'assets/images/', 'assets/icons/') as $marker) {
            $position = strpos($url, $marker);
            if ($position !== false) {
                $asset_path = substr($url, $position);
                $asset_path = ltrim($asset_path, '/');
                $asset_path = preg_replace('#^assets/#', '', $asset_path);
                return trailingslashit(ASCWO_ASSETS) . $asset_path;
            }
        }

        if (preg_match('#^https?://#i', $url)) {
            return $url;
        }

        return trailingslashit(ASCWO_ASSETS) . ltrim($url, '/');
    }

    private function get_normalized_global_icon_items($option_name)
    {
        $items = get_option($option_name, array());
        if (!is_array($items)) {
            return array();
        }

        $changed = false;
        foreach ($items as $index => $item) {
            if (!is_array($item)) {
                continue;
            }

            if ($option_name === 'ascwo_all_fixingMethods' && empty($item['id'])) {
                $slug = !empty($item['type']) ? sanitize_title((string) $item['type']) : sanitize_title((string) ($item['name'] ?? 'fixing-method'));
                $items[$index]['id'] = strpos($slug, 'fixing-') === 0 ? $slug : 'fixing-' . $slug;
                $changed = true;
            }

            if (isset($item['icon'])) {
                $normalized_icon = $this->normalize_global_asset_url($item['icon']);
                if ($normalized_icon !== $item['icon']) {
                    $items[$index]['icon'] = $normalized_icon;
                    $changed = true;
                }
            }

            if (isset($item['url'])) {
                $normalized_url = $this->normalize_global_asset_url($item['url']);
                if ($normalized_url !== $item['url']) {
                    $items[$index]['url'] = $normalized_url;
                    $changed = true;
                }
            }

        }

        if ($changed) {
            update_option($option_name, $items);
        }

        return $items;
    }

    private function normalize_lookup_key($value)
    {
        return sanitize_title((string) $value);
    }

    private function build_managed_lookup(array $items)
    {
        $lookup = array();
        foreach ($items as $index => $item) {
            if (!is_array($item)) {
                continue;
            }
            $keys = array(
                $item['id'] ?? '',
                $item['value'] ?? '',
                $item['type'] ?? '',
                $item['name'] ?? '',
                $item['label'] ?? '',
                (string) $index,
            );
            foreach ($keys as $key) {
                $key = $this->normalize_lookup_key($key);
                if ($key !== '') {
                    $lookup[$key] = $item;
                }
            }
        }
        return $lookup;
    }

    private function find_managed_item(array $lookup, array $item, array $keys)
    {
        foreach ($keys as $key) {
            if (!isset($item[$key])) {
                continue;
            }
            $lookup_key = $this->normalize_lookup_key($item[$key]);
            if ($lookup_key !== '' && isset($lookup[$lookup_key])) {
                return $lookup[$lookup_key];
            }
        }
        return null;
    }

    private function enrich_component_option_items(array $frontend_data, array $all_fixing_methods, array $all_borders)
    {
        if (!isset($frontend_data['requiredOptions']['components']['items']) || !is_array($frontend_data['requiredOptions']['components']['items'])) {
            return $frontend_data;
        }

        $fixing_lookup = $this->build_managed_lookup($all_fixing_methods);
        $border_lookup = $this->build_managed_lookup($all_borders);

        foreach ($frontend_data['requiredOptions']['components']['items'] as $component_index => $component) {
            if (is_array($component)) {
                $component_preview = (string) ($component['image'] ?? $component['previewImg'] ?? $component['icon'] ?? '');
                if ($component_preview !== '') {
                    $frontend_data['requiredOptions']['components']['items'][$component_index]['image'] = (string) ($component['image'] ?? $component_preview);
                    $frontend_data['requiredOptions']['components']['items'][$component_index]['previewImg'] = (string) ($component['previewImg'] ?? $component_preview);
                    $frontend_data['requiredOptions']['components']['items'][$component_index]['icon'] = (string) ($component['icon'] ?? $component_preview);
                }
            }

            if (!isset($component['options']) || !is_array($component['options'])) {
                continue;
            }

            foreach ($component['options'] as $option_index => $option) {
                if (is_array($option)) {
                    $option_preview = (string) ($option['image'] ?? $option['previewImg'] ?? $option['icon'] ?? '');
                    if ($option_preview !== '') {
                        $frontend_data['requiredOptions']['components']['items'][$component_index]['options'][$option_index]['image'] = (string) ($option['image'] ?? $option_preview);
                        $frontend_data['requiredOptions']['components']['items'][$component_index]['options'][$option_index]['previewImg'] = (string) ($option['previewImg'] ?? $option_preview);
                        $frontend_data['requiredOptions']['components']['items'][$component_index]['options'][$option_index]['icon'] = (string) ($option['icon'] ?? $option_preview);
                    }

                    if (isset($option['fixingMethods']) && is_array($option['fixingMethods']) && !isset($option['fixingMethods']['items'])) {
                        $option['fixingMethods'] = array('items' => array_values($option['fixingMethods']));
                        $frontend_data['requiredOptions']['components']['items'][$component_index]['options'][$option_index]['fixingMethods'] = $option['fixingMethods'];
                    }
                }

                if (isset($option['fixingMethods']['items']) && is_array($option['fixingMethods']['items'])) {
                    foreach ($option['fixingMethods']['items'] as $item_index => $item) {
                        if (!is_array($item)) {
                            continue;
                        }
                        $managed = $this->find_managed_item($fixing_lookup, $item, array('fixingMethodId', 'id', 'value', 'type', 'label', 'name'));
                        if (is_array($managed)) {
                            $managed_preview = (string) ($managed['icon'] ?? $managed['previewImg'] ?? $managed['url'] ?? $managed['image'] ?? '');
                            $item['fixingMethodId'] = (string) ($managed['id'] ?? $item['fixingMethodId'] ?? $item['id'] ?? '');
                            $item['label'] = !empty($item['label']) ? (string) $item['label'] : (string) ($managed['name'] ?? $managed['label'] ?? '');
                            $item['name'] = !empty($item['name']) ? (string) $item['name'] : (string) ($managed['name'] ?? $managed['label'] ?? '');
                            $item['description'] = !empty($item['description']) ? (string) $item['description'] : (string) ($managed['description'] ?? '');
                            $item['type'] = (string) ($managed['type'] ?? $item['type'] ?? $managed['value'] ?? '');
                            $item['icon'] = $managed_preview !== '' ? $managed_preview : (string) ($item['icon'] ?? $item['previewImg'] ?? $item['url'] ?? '');
                            $item['previewImg'] = $item['icon'];
                            $item['url'] = $item['icon'];
                            $item['fixing'] = $managed;
                        }
                        $frontend_data['requiredOptions']['components']['items'][$component_index]['options'][$option_index]['fixingMethods']['items'][$item_index] = $item;
                    }
                }

                if (isset($option['borders']['items']) && is_array($option['borders']['items'])) {
                    foreach ($option['borders']['items'] as $item_index => $item) {
                        if (!is_array($item)) {
                            continue;
                        }
                        $managed = $this->find_managed_item($border_lookup, $item, array('borderId', 'id', 'value', 'type', 'label', 'name'));
                        if (is_array($managed)) {
                            $managed_preview = (string) ($managed['icon'] ?? $managed['previewImg'] ?? $managed['url'] ?? $managed['image'] ?? '');
                            $item['borderId'] = (string) ($managed['id'] ?? $item['borderId'] ?? $item['id'] ?? '');
                            $item['value'] = (string) ($managed['value'] ?? $item['value'] ?? $managed['id'] ?? '');
                            $item['icon'] = $managed_preview !== '' ? $managed_preview : (string) ($item['icon'] ?? $item['previewImg'] ?? $item['url'] ?? '');
                            $item['previewImg'] = $item['icon'];
                            $item['url'] = $item['icon'];
                            $item['border'] = $managed;
                        }
                        $frontend_data['requiredOptions']['components']['items'][$component_index]['options'][$option_index]['borders']['items'][$item_index] = $item;
                    }
                }
            }
        }

        return $frontend_data;
    }

    /**
     * Render the products shortcode output.
     *
     * @param array|string $atts    Shortcode attributes.
     * @param string       $content Optional shortcode content.
     *
     * @return string
     */
    public function render_ascwo_products($atts, $content = '')
    {
        wp_enqueue_style('ascwo-frontend', ASCWO_ASSETS . '/css/frontend.css', false, ASCWO_VERSION);
        wp_enqueue_style('ascwo-style', ASCWO_ASSETS . '/css/style.css', false, ASCWO_VERSION);

        $atts = shortcode_atts(
            array(
                'cols' => '3',
                'ids' => '',
                'limit' => '-1',
                'orderby' => 'date',
                'order' => 'DESC',
            ),
            $atts,
            'ascwo-products'
        );

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

        $query_args = array(
            'post_type' => 'product',
            'post_status' => 'publish',
            'posts_per_page' => $limit,
            'orderby' => sanitize_key($atts['orderby']),
            'order' => 'ASC' === strtoupper($atts['order']) ? 'ASC' : 'DESC',
            'no_found_rows' => true,
            'ignore_sticky_posts' => true,
            'update_post_meta_cache' => false,
            'update_post_term_cache' => false,
        );

        if (!empty($ids)) {
            $query_args['post__in'] = $ids;
            $query_args['orderby'] = 'post__in';
        } else {
            $query_args['meta_query'] = array(
                array(
                    'key' => 'product-ascwo-metas',
                    'value' => 'config-id";s:1:"0"',
                    'compare' => 'NOT LIKE',
                ),
            );
        }

        $products = new \WP_Query($query_args);
        $visible_cards = 0;
        $page_settings = get_option('ascwo_config_page');
        $button_labels = isset($page_settings['buttons']) && is_array($page_settings['buttons']) ? $page_settings['buttons'] : [];
        $customize_label = isset($button_labels['productDesignButton']) && $button_labels['productDesignButton'] !== '' ? $button_labels['productDesignButton'] : __('Start Designing', 'all-signs-customizer-for-woocommerce-pro');

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

                    $design_url = $ascwo_product->get_design_page_url();
                    if ($design_url === '') {
                        $design_url = get_permalink($product_id);
                    }

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

    /**
     * Render the configurator shortcode output.
     *
     * @param array|string $atts    Shortcode attributes.
     * @param string       $content Optional shortcode content.
     *
     * @return string
     */
    public function render_ascwo_configurator($atts, $content = '')
    {
        $atts = shortcode_atts(
            array(
                'productid' => '0',
                'tplid' => false,
            ),
            $atts,
            'ascwo-products'
        );
        $productid = absint($atts['productid']);
        $tplid = false !== $atts['tplid'] && '' !== $atts['tplid'] ? absint($atts['tplid']) : false;

        ob_start();
        $product = wc_get_product($productid);
        if ($product) {
            $meta = get_post_meta($productid, 'product-ascwo-metas', true);

            if (!empty($meta) && isset($meta[$productid]['config-id'])) {
                $configId = $meta[$productid]['config-id'];
                if (0 !== (int) $configId) {
                    $config = get_post_meta($configId, 'ascwo-configs-meta', true);
                    $page_settings = get_option('ascwo_config_page', array());
                    $pageSettings = isset($page_settings['others']) && is_array($page_settings['others']) ? $page_settings['others'] : [];
                    $all_cliparts_groups = get_option('ascwo-manages-cliparts', array());
                    $all_fonts = get_option('ascwo-manages-fonts', array());
                    $all_shapes = $this->get_normalized_global_icon_items('ascwo_all_shapes');
                    $all_fixingMethods = $this->get_normalized_global_icon_items('ascwo_all_fixingMethods');
                    $all_borders = $this->get_normalized_global_icon_items('ascwo_all_borders');
                    $outputOptions = get_option('ascwo_output_options', array());

                    if (is_array($config) && !empty($config)) {
                        $config_meta = $config;
                        $frontend_data = isset($config['data']) && is_array($config['data']) ? $config['data'] : array();
                        $frontend_data = $this->enrich_component_option_items($frontend_data, $all_fixingMethods, $all_borders);
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
                        $configData = array(
                            'name' => get_post_field('post_title', $configId),
                            'description' => get_post_field('post_content', $configId),
                            'icon' => isset($config['icon']) ? $config['icon'] : '',
                            'popImg' => isset($config['popImg']) ? $config['popImg'] : '',
                            'materialType' => isset($config['materialType']) ? $config['materialType'] : '',
                            'productFamily' => isset($config['productFamily']) ? $config['productFamily'] : '',
                            'productType' => isset($config['productType']) ? $config['productType'] : '',
                            'pricingMode' => isset($config['pricingMode']) ? $config['pricingMode'] : '',
                            'data' => isset($frontend_data) ? $frontend_data : array(),
                        );
                        $visibleFonts = isset($config['requiredOptions']['fonts']['items']) && is_array($config['requiredOptions']['fonts']['items'])
                            ? $config['requiredOptions']['fonts']['items']
                            : (is_array($all_fonts) ? $all_fonts : array());
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
                            'allFixingMethods' => $all_fixingMethods,
                            'allBorders' => $all_borders,
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

                        $ASO = array(
                            'skin' => isset($frontend_data['settings']['themeColors']['skin']) ? $frontend_data['settings']['themeColors']['skin'] : 'default',
                            'productID' => $productid,
                            'currentConfig' => $configData,
                            'managesData' => $all_manages,
                            'regularPrice' => trim($product_price) !== '' ? $product_price : 0,
                            'thousandSep' => wc_get_price_thousand_separator(),
                            'decimalSep' => wc_get_price_decimal_separator(),
                            'decimals' => wc_get_price_decimals(),
                            'nbDecimals' => wc_get_price_decimals(),
                            'site_url' => get_site_url(),
                            'currencySymbol' => html_entity_decode(get_woocommerce_currency_symbol()),
                            'currency_pos' => get_option('woocommerce_currency_pos'),
                            'fixing_methods_url' => ASCWO_ASSETS . '/images/fixing-methodes',
                            'borders_url' => ASCWO_ASSETS . '/images/borders',
                            "filters_url" => ASCWO_ASSETS . '/images/filters',
                            'templates' => array(
                                'designFromTemplate' => isset($template) && !is_string($template),
                                'template' => isset($template) && !is_string($template) ? $template : array(),
                            ),
                            'frontend_nonce' => wp_create_nonce('ascwo_add_to_cart_after_custom')
                        );

                        $this->add_frontend_inline_data('ascwo_configurator_data', $ASO);
                        $this->add_frontend_inline_data('ascwo_data', array(
                            'rest_url' => get_rest_url() . 'ascwo/v1',
                            'ajax_url' => esc_url_raw(admin_url('admin-ajax.php')),
                            "caches" => function_exists('ascwo_get_license_cache_timestamp') ? \ascwo_get_license_cache_timestamp() : 0,
                            "license_status" => function_exists('ascwo_get_license_status') ? \ascwo_get_license_status() : array(),
                            "site_timezone" => function_exists('wp_timezone_string') ? wp_timezone_string() : get_option('timezone_string', 'UTC'),
                            'page' => 'configurator',
                            'site_url' => esc_url_raw(get_site_url()),
                            'author' => ASCWO_ID,
                        ));
                        ?>
                        <!--
                        <div id="ascwo-configurator-loader" class="aso-bg-loader" aria-hidden="true">
                            <div class="aso-configurator-loader">
                                <div class="aso-configurator-skeleton">
                                    <div class="aso-configurator-skeleton__header"></div>
                                    <div class="aso-configurator-skeleton__grid"></div>
                                </div>
                            </div>
                        </div>
                        -->
                        <div id="ascwo-frontend-app" class="ascwo-frontend-app ascwo-configurator-container" data-ascwo-page="configurator">
                        </div>
                        <?php
                    }
                }
            }
        }

        $content .= ob_get_clean();
        return $content;
    }

    /**
     * Get the config ID attached to a product.
     *
     * @param int $product_id Product ID.
     *
     * @return int
     */
    private function get_product_config_id($product_id)
    {
        $meta = get_post_meta($product_id, 'product-ascwo-metas', true);
        if (!is_array($meta) || !isset($meta[$product_id]['config-id'])) {
            return 0;
        }
        return absint($meta[$product_id]['config-id']);
    }

    /**
     * Enqueue the frontend app assets.
     *
     * @return void
     */
    private function enqueue_frontend_app_assets()
    {
        wp_enqueue_style('ascwo-frontend', ASCWO_ASSETS . '/css/frontend.css', false, ASCWO_VERSION);
        wp_enqueue_style('ascwo-style', ASCWO_ASSETS . '/css/style.css', false, ASCWO_VERSION);
        wp_enqueue_script('ascwo-runtime', ASCWO_ASSETS . '/js/runtime.js', [], ASCWO_VERSION, true);
        wp_enqueue_script('ascwo-vendor', ASCWO_ASSETS . '/js/vendors.js', [], ASCWO_VERSION, true);
        wp_enqueue_script('ascwo-fabric', ASCWO_ASSETS . '/utilities/fabric.min.js', [], ASCWO_VERSION, true);
        $this->enqueue_frontend_data_script();

        if (function_exists('wp_enqueue_script_module')) {
            wp_enqueue_script_module('ascwo-frontend', ASCWO_ASSETS . '/js/frontend.js', array(), ASCWO_VERSION, array('in_footer' => true));
            return;
        }

        wp_enqueue_script('ascwo-frontend', ASCWO_ASSETS . '/js/frontend.js', ['jquery', 'ascwo-vendor', 'ascwo-runtime', 'wp-i18n'], ASCWO_VERSION, true);
        wp_script_add_data('ascwo-frontend', 'type', 'module');
    }

    /**
     * Include config fonts used by the frontend UI.
     *
     * @param array $all_fonts Font definitions.
     *
     * @return void
     */
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

    /**
     * Inject an inline @font-face declaration.
     *
     * @param string $font_label Font family label.
     * @param string $url        Font URL.
     *
     * @return void
     */
    private function include_config_ttf_font_style($font_label, $url)
    {
        $font_label = str_replace(' ', '-', $font_label);
        $inline_style = "@font-face {\n            font-family: " . esc_attr($font_label) . ";\n            src: url('" . esc_url_raw($url) . "') format('truetype');\n        }";
        wp_add_inline_style('ascwo-frontend', $inline_style);
        wp_add_inline_style('ascwo-style', $inline_style);
    }

    /**
     * Add custom CSS to the frontend shell.
     *
     * @param string $css CSS content.
     *
     * @return void
     */
    private function include_custom_css($css)
    {
        wp_add_inline_style('ascwo-frontend', $css);
    }
}
