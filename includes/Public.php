<?php
namespace ASCWO;

/**
 * public Pages Handler
 */
class ASCWO_Public
{

    public function __construct()
    {
        add_action('wp_enqueue_scripts', [$this, 'enqueue_public_styles'], 5);
        add_action('wp_enqueue_scripts', [$this, 'render_public'], 20);
    }

    /**
     * Enqueue the shared frontend stylesheet.
     *
     * The plugin uses these base styles across multiple public-facing pieces,
     * so they must be available on the frontend even when the configurator
     * scripts are not loaded.
     */
    public function enqueue_public_styles()
    {
        if (is_admin()) {
            return;
        }

        if (!wp_style_is('ascwo-style', 'registered')) {
            wp_register_style('ascwo-style', ASCWO_ASSETS . '/css/style.css', false, ASCWO_VERSION);
        }

        wp_enqueue_style('ascwo-style');
        $this->add_button_styles_inline();
    }

    /**
     * Render public assets for the configurator on WooCommerce pages.
     *
     * @return void
     */
    public function render_public()
    {
        if (!$this->should_enqueue_public_assets()) {
            return;
        }

        wp_enqueue_style('ascwo-omodal', ASCWO_ASSETS . '/utilities/modal.min.css', false, ASCWO_VERSION);
        wp_enqueue_script('ascwo-omodal', ASCWO_ASSETS . '/utilities/modal.min.js', [], ASCWO_VERSION, true);
        wp_enqueue_script('ascwo-tinymce-script', includes_url('/js/tinymce/') . 'tinymce.min.js', [], ASCWO_VERSION, true);
        wp_enqueue_script('ascwo-product-min', ASCWO_ASSETS . '/utilities/ascwo-product-min.js', ["jquery"], ASCWO_VERSION, true);
    }

    private function should_enqueue_public_assets(): bool
    {
        if (is_admin()) {
            return false;
        }

        if (function_exists('is_woocommerce') && is_woocommerce()) {
            return true;
        }

        if (function_exists('is_cart') && is_cart()) {
            return true;
        }

        if (function_exists('is_checkout') && is_checkout()) {
            return true;
        }

        return false;
    }

    private function add_button_styles_inline()
    {
        $settings = get_option('ascwo_config_page', []);
        $styles = isset($settings['buttonStyles']) && is_array($settings['buttonStyles']) ? $settings['buttonStyles'] : [];
        $map = [
            'productDesign' => [
                'legacy' => 'productDesignCss',
                'selectors' => ['.ascwo-design-product', '.ascwo-product-card__btn--customize'],
            ],
            'recapsButton' => [
                'legacy' => '',
                'selectors' => ['.ascwo-cart-product-preview'],
            ],
        ];

        $inline = '';

        foreach ($map as $key => $config) {
            $legacy = isset($config['legacy']) ? $config['legacy'] : '';
            $selectors = isset($config['selectors']) ? (array) $config['selectors'] : [];
            if (empty($selectors)) {
                continue;
            }
            $css = $this->get_button_css($styles, $key, $legacy);
            if ($css['base'] !== '') {
                $inline .= implode(', ', $selectors) . ' {' . $css['base'] . "}\n";
            }
            if ($css['hover'] !== '') {
                $hover_selectors = array_map(function ($selector) {
                    return $selector . ':hover';
                }, $selectors);
                $inline .= implode(', ', $hover_selectors) . ' {' . $css['hover'] . "}\n";
            }
            if ($css['hover'] !== '' && isset($config['active_selectors'])) {
                $active_selectors = (array) $config['active_selectors'];
                if (!empty($active_selectors)) {
                    $inline .= implode(', ', $active_selectors) . ' {' . $css['hover'] . "}\n";
                }
            }
        }

        if ($inline !== '') {
            wp_add_inline_style('ascwo-style', $inline);
        }
    }

    private function get_button_css(array $styles, string $key, string $legacy_key): array
    {
        $base = '';
        $hover = '';

        $style = isset($styles[$key]) && is_array($styles[$key]) ? $styles[$key] : [];
        $legacy = isset($styles[$legacy_key]) ? trim((string) $styles[$legacy_key]) : '';
        $use_custom = isset($style['useCustomCss']) ? (bool) $style['useCustomCss'] : false;
        $custom_css = isset($style['customCss']) ? trim((string) $style['customCss']) : '';

        if ($use_custom && $custom_css !== '') {
            return ['base' => $custom_css, 'hover' => ''];
        }

        if ($legacy !== '') {
            $base = $legacy;
        } elseif (isset($style['fields']) && is_array($style['fields'])) {
            $base = $this->build_css_from_fields($style['fields']);
        }

        if (isset($style['hover']) && is_array($style['hover'])) {
            $hover = $this->build_hover_css($style['hover']);
        }

        return ['base' => $base, 'hover' => $hover];
    }

    private function build_css_from_fields(array $fields): string
    {
        $css = [];
        $background = $this->sanitize_css_value($fields['background'] ?? '');
        $color = $this->sanitize_css_value($fields['color'] ?? '');
        $border_color = $this->sanitize_css_value($fields['borderColor'] ?? '');
        $border_width = $this->normalize_unit_value($fields['borderWidth'] ?? '');
        $border_style = $this->sanitize_css_value($fields['borderStyle'] ?? 'solid');
        $border_radius = $this->normalize_unit_value($fields['borderRadius'] ?? '');
        $padding_y = $this->normalize_unit_value($fields['paddingY'] ?? '');
        $padding_x = $this->normalize_unit_value($fields['paddingX'] ?? '');
        $font_size = $this->normalize_unit_value($fields['fontSize'] ?? '');
        $font_weight = $this->sanitize_css_value($fields['fontWeight'] ?? '');
        $text_transform = $this->sanitize_css_value($fields['textTransform'] ?? '');

        if ($background !== '') {
            $css[] = "background: {$background} !important";
        }
        if ($color !== '') {
            $css[] = "color: {$color} !important";
        }
        if ($border_width !== '' || $border_color !== '') {
            $width = $border_width !== '' ? $border_width : '0';
            $style = $border_style !== '' ? $border_style : 'solid';
            $color = $border_color !== '' ? $border_color : 'transparent';
            $css[] = "border: {$width} {$style} {$color} !important";
        }
        if ($border_radius !== '') {
            $css[] = "border-radius: {$border_radius} !important";
        }
        if ($padding_y !== '' || $padding_x !== '') {
            $py = $padding_y !== '' ? $padding_y : '0';
            $px = $padding_x !== '' ? $padding_x : $py;
            $css[] = "padding: {$py} {$px} !important";
        }
        if ($font_size !== '') {
            $css[] = "font-size: {$font_size} !important";
        }
        if ($font_weight !== '') {
            $css[] = "font-weight: {$font_weight} !important";
        }
        if ($text_transform !== '') {
            $css[] = "text-transform: {$text_transform} !important";
        }

        $css[] = "text-decoration: none !important";

        return implode('; ', $css) . ';';
    }

    private function build_hover_css(array $fields): string
    {
        $css = [];
        $background = $this->sanitize_css_value($fields['background'] ?? '');
        $color = $this->sanitize_css_value($fields['color'] ?? '');
        $border_color = $this->sanitize_css_value($fields['borderColor'] ?? '');

        if ($background !== '') {
            $css[] = "background: {$background} !important";
        }
        if ($color !== '') {
            $css[] = "color: {$color} !important";
        }
        if ($border_color !== '') {
            $css[] = "border-color: {$border_color} !important";
        }

        return implode('; ', $css) . ($css ? ';' : '');
    }

    private function normalize_unit_value($value, string $default_unit = 'px'): string
    {
        $value = trim((string) $value);
        if ($value === '') {
            return '';
        }
        if (preg_match('/^-?\d+(\.\d+)?$/', $value)) {
            return $value . $default_unit;
        }
        return $value;
    }

    private function sanitize_css_value($value): string
    {
        return trim(wp_strip_all_tags((string) $value));
    }
}
