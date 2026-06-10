<?php
namespace ASOWP\Support;

class ConfigSchemaNormalizer
{
    public const SCHEMA_VERSION = 2;

    private static $shopify_template = null;

    public static function normalize_meta($meta): array
    {
        $meta = is_array($meta) ? $meta : array();
        $legacy_data = self::legacy_data_from_meta($meta);
        $template = self::shopify_template();

        $settings = self::deep_merge(
            isset($template['settings']) && is_array($template['settings']) ? $template['settings'] : array(),
            self::array_value($legacy_data, 'settings', self::array_value($meta, 'settings', array()))
        );

        $product_type = self::sanitize_product_type(self::first_string(array(
            self::array_value($meta, 'productType'),
            self::array_value($settings, 'productType'),
            self::array_value($settings, 'productFamilySlug'),
            self::array_value($template, 'productType'),
        ), 'signs-panels'));

        $pricing_mode = self::first_string(array(
            self::array_value($meta, 'pricingMode'),
            self::array_value($legacy_data, 'pricingMode'),
            self::array_value($template, 'pricingMode'),
        ), 'frame-fit');

        $material_type = self::sanitize_material_type(self::first_string(array(
            self::array_value($meta, 'materialType'),
            self::array_value($legacy_data, 'materialType'),
            self::array_value($template, 'materialType'),
        ), 'simple'));

        $required_options = self::deep_merge(
            isset($template['requiredOptions']) && is_array($template['requiredOptions']) ? $template['requiredOptions'] : array(),
            self::array_value($meta, 'requiredOptions', self::array_value($legacy_data, 'requiredOptions', array()))
        );
        $required_options = self::repair_required_options_sections($required_options);
        
        // --- NOUVELLE LOGIQUE : Dynamisation des IDs ---
        $slug = function($val) {
            $val = trim($val);
            $val = mb_strtolower($val, 'UTF-8');
            $val = preg_replace('/[^a-z0-9]+/u', '-', $val);
            return trim($val, '-');
        };

        if (isset($required_options['sizes']['items'])) {
            foreach ($required_options['sizes']['items'] as &$s) {
                $descriptor = isset($s['label']) ? $slug($s['label']) : 'custom';
                $s['id'] = 'size-' . $slug($product_type) . '-' . $descriptor;
            }
        }
        if (isset($required_options['colors']['items'])) {
            foreach ($required_options['colors']['items'] as &$c) {
                $name = isset($c['name']) ? $c['name'] : 'item';
                $c['id'] = 'color-' . $slug($product_type) . '-' . $slug($name);
            }
        }
        // ------------------------------------------------

        $meta_additional_options = self::array_value($meta, 'additionalOptions', self::array_value($legacy_data, 'additionalOptions', array()));
        $additional_options = self::deep_merge(
            isset($template['additionalOptions']) && is_array($template['additionalOptions']) ? $template['additionalOptions'] : array(),
            is_array($meta_additional_options) && !self::is_list($meta_additional_options) ? self::remove_numeric_keys($meta_additional_options) : array()
        );

        $legacy_materials = self::resolve_wizard_materials(
            self::array_value($legacy_data, 'materials', array()),
            $settings,
            $product_type,
            $material_type
        );
        if (is_array($legacy_materials) && !empty($legacy_materials)) {
            $additional_options['materials'] = self::normalize_materials_option(
                isset($additional_options['materials']) && is_array($additional_options['materials']) ? $additional_options['materials'] : array(),
                $legacy_materials,
                $material_type
            );
            $legacy_components = self::components_from_legacy_materials($legacy_materials);
            if (!empty($legacy_components)) {
                $additional_options['components'] = self::normalize_components_option(
                    isset($additional_options['components']) && is_array($additional_options['components']) ? $additional_options['components'] : array(),
                    $legacy_components
                );
            }
            $required_options = self::merge_material_options($required_options, $legacy_materials);
        }

        $legacy_additional_options = self::array_value($legacy_data, 'additionalOptions', array());
        $legacy_input_items = self::inputs_from_legacy_additional_options($legacy_additional_options);
        if (!empty($legacy_input_items)) {
            $additional_options['inputs'] = self::normalize_inputs_option(
                isset($additional_options['inputs']) && is_array($additional_options['inputs']) ? $additional_options['inputs'] : array(),
                $legacy_input_items
            );
        }

        if (isset($additional_options['inputs']['items']) && is_array($additional_options['inputs']['items']) && (!empty($additional_options['inputs']['items']) || empty($legacy_input_items))) {
            $additional_options['inputs'] = self::normalize_inputs_option($additional_options['inputs'], $additional_options['inputs']['items']);
        }

        if (isset($additional_options['materials']['items']) && is_array($additional_options['materials']['items'])) {
            $additional_options['materials'] = self::normalize_materials_option($additional_options['materials'], $additional_options['materials']['items'], $material_type);
        }

        if (isset($additional_options['components']['items']) && is_array($additional_options['components']['items'])) {
            $additional_options['components'] = self::normalize_components_option($additional_options['components'], $additional_options['components']['items']);
        }

        $required_options = self::ensure_required_options($required_options, $legacy_materials, $settings, $template);

        return array(
            'schemaVersion' => self::SCHEMA_VERSION,
            'schemaSource' => 'shopify',
            'icon' => self::array_value($meta, 'icon', ''),
            'popImg' => self::array_value($meta, 'popImg', ''),
            'materialType' => $material_type,
            'productType' => $product_type,
            'pricingMode' => $pricing_mode,
            'settings' => $settings,
            'requiredOptions' => $required_options,
            'additionalOptions' => $additional_options,
            'data' => $legacy_data,
        );
    }

    public static function to_shopify_schema($meta): array
    {
        $normalized = self::normalize_meta($meta);
        $template = self::shopify_template();

        $schema = array(
            'settings' => $normalized['settings'],
            'pricingMode' => $normalized['pricingMode'],
            'productType' => $normalized['productType'],
            'materialType' => $normalized['materialType'],
            'requiredOptions' => $normalized['requiredOptions'],
            'additionalOptions' => $normalized['additionalOptions'],
        );

        return self::canonicalize_to_template($schema, $template);
    }

    public static function to_admin_payload(int $id, $meta): array
    {
        $normalized = self::normalize_meta($meta);

        return array(
            'id' => $id,
            'name' => get_the_title($id),
            'description' => get_post_field('post_content', $id),
            'icon' => $normalized['icon'],
            'popImg' => $normalized['popImg'],
            'schemaVersion' => $normalized['schemaVersion'],
            'schemaSource' => $normalized['schemaSource'],
            'pricingMode' => $normalized['pricingMode'],
            'productType' => $normalized['productType'],
            'materialType' => $normalized['materialType'],
            'settings' => $normalized['settings'],
            'requiredOptions' => $normalized['requiredOptions'],
            'additionalOptions' => $normalized['additionalOptions'],
        );
    }

    public static function save_meta(int $post_id, $meta)
    {
        return update_post_meta($post_id, 'asowp-configs-meta', self::normalize_meta($meta));
    }

    private static function shopify_template(): array
    {
        if (self::$shopify_template !== null) {
            return self::$shopify_template;
        }

        $base_path = defined('ASOWP_PATH') ? ASOWP_PATH : dirname(__DIR__, 2);
        $files = array(
            $base_path . '/shopify-json',
            $base_path . '/json-shopify',
        );

        foreach ($files as $file) {
            if (!is_readable($file)) {
                continue;
            }

            $decoded = json_decode((string) file_get_contents($file), true);
            if (is_array($decoded)) {
                self::$shopify_template = $decoded;
                return self::$shopify_template;
            }
        }

        self::$shopify_template = array();
        return self::$shopify_template;
    }

    private static function legacy_data_from_meta(array $meta): array
    {
        $data = self::array_value($meta, 'data', array());
        if (is_array($data)) {
            return $data;
        }
        if (is_string($data) && $data !== '') {
            $decoded = json_decode($data, true);
            if (is_array($decoded)) {
                return $decoded;
            }
        }
        return array();
    }

    private static function merge_material_options(array $required_options, array $materials): array
    {
        foreach ($materials as $material) {
            if (!is_array($material)) {
                continue;
            }

            $map = array(
                'sizes' => 'sizes',
                'colors' => 'colors',
                'shapes' => 'shapes',
                'borders' => 'borders',
                'fixingMethods' => 'fixingMethods',
            );

            foreach ($map as $legacy_key => $target_key) {
                if (self::required_option_has_items(self::array_value($required_options, $target_key, array()))) {
                    continue;
                }

                $option = self::array_value($material, $legacy_key, null);
                if (!is_array($option)) {
                    $material_data = self::array_value($material, 'data', array());
                    $option = self::array_value($material_data, $legacy_key, null);
                }
                if (is_array($option)) {
                    if (!isset($required_options[$target_key]) || !is_array($required_options[$target_key])) {
                        $required_options[$target_key] = array('label' => ucfirst($target_key), 'items' => array());
                    }
                    $required_options[$target_key] = self::merge_legacy_required_option(
                        $required_options[$target_key],
                        $target_key,
                        $option
                    );
                }
            }

            $material_data = self::array_value($material, 'data', array());
            $text = self::array_value($material, 'text', self::array_value($material, 'textImages', self::array_value($material_data, 'textImages', null)));
            if (is_array($text) && isset($required_options['fonts']) && is_array($required_options['fonts']) && !self::required_option_has_items($required_options['fonts'])) {
                $selected_fonts = self::array_value($text, 'selectedFonts', array());
                if (is_array($selected_fonts) && !empty($selected_fonts)) {
                    $required_options['fonts']['items'] = array_values(array_map(function ($font, $index) {
                        return array(
                            'id' => 'font-' . sanitize_key((string) $font),
                            'label' => (string) $font,
                            'isDefault' => $index === 0,
                            'managedFontId' => is_numeric($font) ? (int) $font : null,
                        );
                    }, $selected_fonts, array_keys($selected_fonts)));
                }
            }
        }

        return $required_options;
    }

    private static function resolve_wizard_materials($materials, array $settings, string $product_type, string $material_type): array
    {
        $materials = is_array($materials) ? array_values($materials) : array();
        $selected_ids = self::array_value($settings, 'selectedMaterialIds', array());
        $selected_ids = is_array($selected_ids) ? array_values(array_filter(array_map('strval', $selected_ids))) : array();
        $first_material_is_legacy_standard = self::first_material_is_legacy_standard($materials);

        if (empty($selected_ids) && self::looks_like_legacy_standard_materials($materials)) {
            $selected_ids = self::default_material_ids_for_product_type($product_type);
            $first_material_is_legacy_standard = true;
        }

        if (empty($selected_ids) || !$first_material_is_legacy_standard) {
            return $materials;
        }

        $catalog = self::material_catalog();
        $base_material = isset($materials[0]) && is_array($materials[0]) ? $materials[0] : array();
        $resolved = array();

        foreach ($selected_ids as $index => $material_id) {
            if (!isset($catalog[$material_id])) {
                continue;
            }

            $catalog_material = $catalog[$material_id];
            $image = self::shopify_asset_url($catalog_material['image']);
            $resolved[] = array_merge($base_material, array(
                'name' => $catalog_material['title'],
                'label' => $catalog_material['title'],
                'materialKey' => $material_id,
                'sourceMaterialId' => $material_id,
                'icon' => $image,
                'image' => $image,
                'previewImg' => $image,
                'popImg' => '',
                'popupImg' => '',
                'type' => $material_type,
                'active' => true,
                'isDefault' => $index === 0,
            ));
        }

        foreach (array_slice($materials, 1) as $material) {
            if (is_array($material)) {
                $resolved[] = $material;
            }
        }

        return !empty($resolved) ? $resolved : $materials;
    }

    private static function looks_like_legacy_standard_materials(array $materials): bool
    {
        if (empty($materials)) {
            return true;
        }

        if (count($materials) !== 1 || !is_array($materials[0])) {
            return false;
        }

        $label = strtolower(trim(self::first_string(array(
            self::array_value($materials[0], 'label'),
            self::array_value($materials[0], 'name'),
        ), '')));

        return $label === '' || $label === 'standard' || $label === 'standard material';
    }

    private static function first_material_is_legacy_standard(array $materials): bool
    {
        if (empty($materials) || !is_array($materials[0])) {
            return true;
        }

        $label = strtolower(trim(self::first_string(array(
            self::array_value($materials[0], 'label'),
            self::array_value($materials[0], 'name'),
        ), '')));

        return $label === '' || $label === 'standard' || $label === 'standard material';
    }

    private static function default_material_ids_for_product_type(string $product_type): array
    {
        $normalized = strtolower(trim(str_replace(array('_', ' '), '-', $product_type)));
        if (in_array($normalized, array('sticker', 'stickers'), true)) {
            return array('paper');
        }
        if (in_array($normalized, array('banner', 'banners'), true)) {
            return array('fabric');
        }
        return array('acrylic');
    }

    private static function material_catalog(): array
    {
        return array(
            'acrylic' => array('title' => 'Acrylic', 'image' => 'create-config/materials/signs-panels/acrylic/acrylic.webp'),
            'aluminium' => array('title' => 'Aluminium', 'image' => 'create-config/materials/signs-panels/aluminium/aluminium.webp'),
            'brass' => array('title' => 'Brass', 'image' => 'create-config/materials/signs-panels/brass/brass.webp'),
            'eco-friendly' => array('title' => 'Eco friendly', 'image' => 'create-config/materials/signs-panels/eco-friendly/eco-friendly.webp'),
            'magnet' => array('title' => 'Magnet', 'image' => 'create-config/materials/signs-panels/magnet/magnet.webp'),
            'photo-paper' => array('title' => 'Photo paper', 'image' => 'create-config/materials/signs-panels/photo-paper/01.webp'),
            'plastic' => array('title' => 'Plastic', 'image' => 'create-config/materials/signs-panels/plastic/01.webp'),
            'stainless-steel' => array('title' => 'Stainless steel', 'image' => 'create-config/materials/signs-panels/stainless-steel/stainless-steel.webp'),
            'vinyl' => array('title' => 'Vinyl', 'image' => 'create-config/materials/signs-panels/vinyl/vinyl.webp'),
            'wood' => array('title' => 'Wood', 'image' => 'create-config/materials/signs-panels/wood/wood.webp'),
            'fabric' => array('title' => 'Fabric', 'image' => 'create-config/materials/banners/fabric/fabric.webp'),
            'mesh' => array('title' => 'Mesh', 'image' => 'create-config/materials/banners/mesh/mesh.webp'),
            'banner-vinyl' => array('title' => 'Vinyl', 'image' => 'create-config/materials/banners/vinyl/vinyl.webp'),
            'paper' => array('title' => 'Paper', 'image' => 'create-config/materials/stickers/paper/paper.webp'),
            'pvc' => array('title' => 'PVC', 'image' => 'create-config/materials/stickers/pvc/pvc.webp'),
            'sticker-vinyl' => array('title' => 'Vinyl', 'image' => 'create-config/materials/stickers/vinyl/vinyl.webp'),
            'film' => array('title' => 'Film', 'image' => 'create-config/materials/stickers/film/film.webp'),
        );
    }

    private static function shopify_asset_url(string $path): string
    {
        $path = ltrim($path, '/');
        if ($path === '') {
            return '';
        }
        if (preg_match('/^(https?:)?\/\//i', $path) || strpos($path, 'data:') === 0) {
            return $path;
        }

        $base = defined('ASOWP_ASSETS') ? ASOWP_ASSETS : '';
        return rtrim($base, '/') . '/images/shopify/' . $path;
    }

    private static function merge_legacy_required_option(array $target, string $target_key, array $option): array
    {
        $settings = self::array_value($option, 'settings', array());
        if (is_array($settings)) {
            $target['label'] = self::first_string(array(
                self::array_value($settings, 'title'),
                self::array_value($settings, 'label'),
                self::array_value($target, 'label'),
            ), self::option_label($target_key));
            $target['description'] = self::first_string(array(
                self::array_value($settings, 'description'),
                self::array_value($target, 'description'),
            ), '');
        }

        switch ($target_key) {
            case 'sizes':
                $items = self::array_value($option, 'allSizes', $option);
                if (is_array($items)) {
                    $target['items'] = array_values($items);
                }
                if (isset($option['customSize']) && is_array($option['customSize'])) {
                    $target['customSize'] = self::deep_merge(
                        isset($target['customSize']) && is_array($target['customSize']) ? $target['customSize'] : array(),
                        $option['customSize']
                    );
                }
                if (isset($option['thickness']) && is_array($option['thickness'])) {
                    $target['thickness'] = self::deep_merge(
                        isset($target['thickness']) && is_array($target['thickness']) ? $target['thickness'] : array(),
                        $option['thickness']
                    );
                }
                break;
            case 'colors':
                $items = self::array_value($option, 'allColors', $option);
                if (is_array($items)) {
                    $target['items'] = array_values($items);
                }
                if (isset($option['customColors']) && is_array($option['customColors'])) {
                    $target['customColors'] = self::deep_merge(
                        isset($target['customColors']) && is_array($target['customColors']) ? $target['customColors'] : array(),
                        $option['customColors']
                    );
                }
                break;
            case 'borders':
                $items = self::array_value($option, 'items', self::array_value($option, 'allBorders', $option));
                if (is_array($items)) {
                    $target['items'] = self::normalize_border_items($items);
                }
                if (isset($option['settings']) && is_array($option['settings'])) {
                    $target['settings'] = self::deep_merge(
                        isset($target['settings']) && is_array($target['settings']) ? $target['settings'] : array(),
                        $option['settings']
                    );
                }
                break;
            case 'fixingMethods':
                $items = self::array_value($option, 'allFixingMethods', $option);
                if (is_array($items)) {
                    $target['items'] = array_values($items);
                }
                break;
            default:
                $target['items'] = array_values($option);
                break;
        }

        return $target;
    }

    private static function normalize_border_items(array $items): array
    {
        $managed_borders = function_exists('get_option') ? get_option('asowp_all_borders', array()) : array();
        $normalized = array();
        $seen_ids = array();

        foreach (array_values($items) as $index => $item) {
            if (!is_array($item)) {
                continue;
            }

            $manage_border_id = self::array_value($item, 'manageBorderId', null);
            $managed_border = is_array($managed_borders) && $manage_border_id !== null && isset($managed_borders[$manage_border_id])
                ? $managed_borders[$manage_border_id]
                : null;

            $label = self::first_string(array(
                is_array($managed_border) ? self::array_value($managed_border, 'name') : null,
                is_array($managed_border) ? self::array_value($managed_border, 'label') : null,
                self::array_value($item, 'label'),
                self::array_value($item, 'name'),
            ), 'Border ' . ($index + 1));

            $id = self::first_string(array(
                self::array_value($item, 'id'),
            ), '');

            if ($id === '' || isset($seen_ids[$id])) {
                $id_source = $manage_border_id !== null && $manage_border_id !== ''
                    ? 'border-' . $manage_border_id
                    : 'border-' . ($index + 1);
                $id = sanitize_key($id_source);
            }

            if (isset($seen_ids[$id])) {
                $id = sanitize_key($id . '-' . ($index + 1));
            }

            $seen_ids[$id] = true;
            $normalized[] = array_merge($item, array(
                'id' => $id,
                'label' => $label,
                'isDefault' => (bool) self::array_value($item, 'isDefault', $index === 0),
                'excludeSizes' => is_array(self::array_value($item, 'excludeSizes', array())) ? self::array_value($item, 'excludeSizes', array()) : array(),
                'excludeShapes' => is_array(self::array_value($item, 'excludeShapes', array())) ? self::array_value($item, 'excludeShapes', array()) : array(),
                'manageBorderId' => is_numeric($manage_border_id) ? (int) $manage_border_id : 0,
                'additionalPrice' => (float) self::array_value($item, 'additionalPrice', 0),
            ));
        }

        return $normalized;
    }

    private static function ensure_required_colors(array $required_options, array $materials, array $settings): array
    {
        $current_items = self::array_value(self::array_value($required_options, 'colors', array()), 'items', array());
        if (is_array($current_items) && !empty($current_items)) {
            return $required_options;
        }

        $material_colors = self::collect_material_option_items($materials, 'colors', 'allColors');
        if (!empty($material_colors)) {
            if (!isset($required_options['colors']) || !is_array($required_options['colors'])) {
                $required_options['colors'] = array('label' => 'Colors', 'items' => array());
            }
            $required_options['colors']['items'] = $material_colors;
            return $required_options;
        }

        $text_colors = self::array_value(
            self::array_value(
                self::array_value($settings, 'customizerSign', array()),
                'text',
                array()
            ),
            'colors',
            array()
        );
        if (is_array($text_colors) && !empty($text_colors)) {
            if (!isset($required_options['colors']) || !is_array($required_options['colors'])) {
                $required_options['colors'] = array('label' => 'Colors', 'items' => array());
            }
            $required_options['colors']['items'] = array_values(array_map(function ($color, $index) {
                return is_array($color) ? array_merge(array(
                    'id' => 'color-' . ($index + 1),
                    'isDefault' => $index === 0,
                ), $color) : array(
                    'id' => 'color-' . ($index + 1),
                    'name' => (string) $color,
                    'isDefault' => $index === 0,
                );
            }, $text_colors, array_keys($text_colors)));
        }

        return $required_options;
    }

    private static function ensure_required_options(array $required_options, array $materials, array $settings, array $template): array
    {
        $template_required = self::array_value($template, 'requiredOptions', array());
        $required_options = self::ensure_required_fonts($required_options, $settings, $template_required);

        $material_option_map = array(
            'sizes' => array('legacy' => 'sizes', 'items' => 'allSizes'),
            'shapes' => array('legacy' => 'shapes', 'items' => 'allShapes'),
            'borders' => array('legacy' => 'borders', 'items' => 'items'),
            'fixingMethods' => array('legacy' => 'fixingMethods', 'items' => 'allFixingMethods'),
        );

        foreach ($material_option_map as $target_key => $definition) {
            if (self::required_option_has_items(self::array_value($required_options, $target_key, array()))) {
                continue;
            }

            $items = self::collect_material_option_items($materials, $definition['legacy'], $definition['items']);
            if (!empty($items)) {
                if (!isset($required_options[$target_key]) || !is_array($required_options[$target_key])) {
                    $required_options[$target_key] = array('label' => self::option_label($target_key), 'items' => array());
                }
                $required_options[$target_key]['items'] = $items;
                continue;
            }

            $required_options = self::fill_required_option_from_template($required_options, $template_required, $target_key);
        }

        $required_options = self::ensure_required_colors($required_options, $materials, $settings);

        if (!self::required_option_has_items(self::array_value($required_options, 'pricing', array()))) {
            $required_options = self::fill_required_option_from_template($required_options, $template_required, 'pricing');
        }

        if (isset($required_options['borders']['items']) && is_array($required_options['borders']['items'])) {
            $required_options['borders']['items'] = self::normalize_border_items($required_options['borders']['items']);
        }
        if (isset($required_options['borders']['allBorders'])) {
            unset($required_options['borders']['allBorders']);
        }

        return $required_options;
    }

    private static function repair_required_options_sections(array $required_options): array
    {
        $item_keys = array(
            'sizes' => 'items',
            'colors' => 'items',
            'shapes' => 'items',
            'borders' => 'items',
            'fixingMethods' => 'items',
            'fonts' => 'items',
            'pricing' => 'priceOptions',
        );

        foreach ($item_keys as $section_key => $items_key) {
            if (!isset($required_options[$section_key]) || !is_array($required_options[$section_key])) {
                continue;
            }

            $section = $required_options[$section_key];
            $items = isset($section[$items_key]) && is_array($section[$items_key])
                ? array_values($section[$items_key])
                : array();

            if (empty($items)) {
                $items = self::collect_items_from_numeric_section_keys($section, $items_key);
            }

            foreach ($section as $key => $value) {
                if (is_int($key) || ctype_digit((string) $key)) {
                    unset($section[$key]);
                }
            }

            $section[$items_key] = array_values($items);
            $required_options[$section_key] = $section;
        }

        return $required_options;
    }

    private static function collect_items_from_numeric_section_keys(array $section, string $items_key): array
    {
        $items = array();
        foreach ($section as $key => $value) {
            if (!(is_int($key) || ctype_digit((string) $key)) || !is_array($value)) {
                continue;
            }

            if (isset($value[$items_key]) && is_array($value[$items_key])) {
                foreach ($value[$items_key] as $item) {
                    if (is_array($item)) {
                        $items[] = $item;
                    }
                }
                continue;
            }

            if (self::is_list($value)) {
                foreach ($value as $item) {
                    if (is_array($item)) {
                        $items[] = $item;
                    }
                }
                continue;
            }

            if (self::looks_like_option_item($value)) {
                $items[] = $value;
            }
        }

        return $items;
    }

    private static function looks_like_option_item(array $value): bool
    {
        foreach (array('id', 'label', 'name', 'shapeId', 'manageBorderId', 'manageFixingMethodId', 'managedFontId', 'customPricing') as $key) {
            if (array_key_exists($key, $value)) {
                return true;
            }
        }
        return false;
    }

    private static function ensure_required_fonts(array $required_options, array $settings, array $template_required): array
    {
        if (self::required_option_has_items(self::array_value($required_options, 'fonts', array()))) {
            return $required_options;
        }

        $selected_fonts = self::array_value(
            self::array_value(
                self::array_value($settings, 'customizerSign', array()),
                'text',
                array()
            ),
            'selectedFonts',
            array()
        );

        if (is_array($selected_fonts) && !empty($selected_fonts)) {
            $managed_fonts = function_exists('get_option') ? get_option('asowp-manages-fonts', array()) : array();
            $items = array();
            foreach (array_values($selected_fonts) as $index => $font_id) {
                $font = is_array($managed_fonts) && isset($managed_fonts[$font_id]) ? $managed_fonts[$font_id] : null;
                $label = self::first_string(array(
                    is_array($font) ? self::array_value($font, 'name') : null,
                    is_array($font) ? self::array_value($font, 'label') : null,
                    is_array($font) ? self::array_value($font, 'family') : null,
                    is_scalar($font_id) ? 'Font ' . (string) $font_id : null,
                ), 'Font ' . ($index + 1));

                $items[] = array(
                    'id' => 'font-' . sanitize_key((string) $font_id),
                    'label' => $label,
                    'isDefault' => $index === 0,
                    'managedFontId' => is_numeric($font_id) ? (int) $font_id : null,
                );
            }

            if (!isset($required_options['fonts']) || !is_array($required_options['fonts'])) {
                $required_options['fonts'] = array('label' => 'Fonts', 'items' => array());
            }
            $required_options['fonts']['items'] = $items;
            return $required_options;
        }

        return self::fill_required_option_from_template($required_options, $template_required, 'fonts');
    }

    private static function fill_required_option_from_template(array $required_options, array $template_required, string $key): array
    {
        $template_option = self::array_value($template_required, $key, array());
        if (!self::required_option_has_items($template_option)) {
            return $required_options;
        }

        $current = self::array_value($required_options, $key, array());
        $required_options[$key] = self::deep_merge(
            is_array($template_option) ? $template_option : array(),
            is_array($current) ? $current : array()
        );

        if (isset($template_option['items']) && is_array($template_option['items']) && empty(self::array_value($required_options[$key], 'items', array()))) {
            $required_options[$key]['items'] = $template_option['items'];
        }

        if (isset($template_option['priceOptions']) && is_array($template_option['priceOptions']) && empty(self::array_value($required_options[$key], 'priceOptions', array()))) {
            $required_options[$key]['priceOptions'] = $template_option['priceOptions'];
        }

        return $required_options;
    }

    private static function required_option_has_items($option): bool
    {
        if (!is_array($option)) {
            return false;
        }

        $items = self::array_value($option, 'items', array());
        if (is_array($items) && !empty($items)) {
            return true;
        }

        $price_options = self::array_value($option, 'priceOptions', array());
        return is_array($price_options) && !empty($price_options);
    }

    private static function collect_material_option_items(array $materials, string $legacy_key, string $items_key): array
    {
        $items = array();
        $seen = array();

        foreach ($materials as $material) {
            if (!is_array($material)) {
                continue;
            }

            $option = self::array_value($material, $legacy_key, null);
            if (!is_array($option)) {
                $material_data = self::array_value($material, 'data', array());
                $option = self::array_value($material_data, $legacy_key, null);
            }
            if (!is_array($option)) {
                continue;
            }

            $option_items = self::array_value($option, $items_key, array());
            if (!is_array($option_items)) {
                continue;
            }

            foreach ($option_items as $item) {
                if (!is_array($item)) {
                    continue;
                }
                $key = sanitize_key((string) self::first_string(array(
                    self::array_value($item, 'id'),
                    self::array_value($item, 'name'),
                    self::array_value($item, 'label'),
                ), 'item-' . count($items)));
                if (isset($seen[$key])) {
                    continue;
                }
                $seen[$key] = true;
                $items[] = $item;
            }
        }

        return $items;
    }

    private static function option_label(string $key): string
    {
        $labels = array(
            'sizes' => 'Sizes',
            'colors' => 'Colors',
            'shapes' => 'Shapes',
            'borders' => 'Borders',
            'fixingMethods' => 'Fixing Methods',
        );
        return isset($labels[$key]) ? $labels[$key] : ucfirst($key);
    }

    private static function normalize_materials_option(array $option, array $materials, string $material_type): array
    {
        $option['label'] = isset($option['label']) ? $option['label'] : 'Materials';
        $option['description'] = isset($option['description']) ? $option['description'] : '';
        $items = array();

        foreach (array_values($materials) as $index => $material) {
            if (!is_array($material)) {
                continue;
            }
            $label = self::first_string(array(
                self::array_value($material, 'label'),
                self::array_value($material, 'name'),
            ), 'Material');
            $image = self::first_string(array(
                self::array_value($material, 'image'),
                self::array_value($material, 'icon'),
                self::array_value($material, 'previewImg'),
            ), '');

            $items[] = array(
                'id' => self::first_string(array(
                    self::array_value($material, 'id'),
                    self::array_value($material, 'materialKey'),
                    self::array_value($material, 'sourceMaterialId'),
                ), 'material-' . ($index + 1)),
                'type' => self::sanitize_material_type(self::first_string(array(self::array_value($material, 'type')), $material_type)),
                'image' => $image,
                'label' => $label,
                'active' => self::array_value($material, 'active', true) ? true : false,
                'popupImg' => self::first_string(array(self::array_value($material, 'popImg'), self::array_value($material, 'popupImg')), ''),
                'isDefault' => (bool) self::array_value($material, 'isDefault', $index === 0),
                'pricingId' => self::first_string(array(self::array_value($material, 'pricingId')), ''),
                'popupImage' => self::first_string(array(self::array_value($material, 'popupImage')), ''),
                'previewImg' => self::first_string(array(self::array_value($material, 'previewImg'), $image), ''),
                'description' => self::first_string(array(self::array_value($material, 'description')), ''),
                'sourceIndex' => $index,
                'materialKey' => self::first_string(array(self::array_value($material, 'materialKey'), self::array_value($material, 'sourceMaterialId')), ''),
                'additionalPrice' => (float) self::array_value($material, 'additionalPrice', 0),
                'excludeComponentIds' => self::array_value($material, 'excludeComponentIds', array()),
            );
        }

        $option['items'] = $items;
        return $option;
    }

    private static function normalize_inputs_option(array $option, array $inputs): array
    {
        $option['label'] = isset($option['label']) ? $option['label'] : 'Inputs';
        $option['description'] = isset($option['description']) ? $option['description'] : '';
        $option['items'] = array_values(array_filter(array_map(function ($input, $index) {
            if (!is_array($input)) {
                return null;
            }
            return array(
                'id' => self::first_string(array(self::array_value($input, 'id')), 'input-' . ($index + 1)),
                'type' => self::first_string(array(self::array_value($input, 'type')), 'text'),
                'label' => self::first_string(array(self::array_value($input, 'label'), self::array_value($input, 'name')), 'Input'),
                'price' => self::array_value($input, 'price', array('type' => 'none', 'value' => 0)),
                'inputs' => self::array_value($input, 'inputs', array()),
                'default' => self::array_value($input, 'default', ''),
                'popupImg' => self::first_string(array(self::array_value($input, 'popupImg'), self::array_value($input, 'popImg')), ''),
                'description' => self::first_string(array(self::array_value($input, 'description')), ''),
            );
        }, $inputs, array_keys($inputs))));

        return $option;
    }

    private static function inputs_from_legacy_additional_options($legacy_additional_options): array
    {
        if (!is_array($legacy_additional_options)) {
            return array();
        }

        $inputs = array();
        foreach ($legacy_additional_options as $item) {
            if (!is_array($item)) {
                continue;
            }

            $section_label = strtolower((string) self::array_value($item, 'label', ''));
            if (isset($item['items']) && is_array($item['items']) && in_array($section_label, array('inputs', 'input'), true)) {
                foreach ($item['items'] as $input_item) {
                    if (is_array($input_item)) {
                        $inputs[] = $input_item;
                    }
                }
                continue;
            }

            if (isset($item['type']) && isset($item['label'])) {
                $inputs[] = $item;
            }
        }

        return $inputs;
    }

    private static function components_from_legacy_materials(array $materials): array
    {
        $components = array();
        foreach (array_values($materials) as $material_index => $material) {
            if (!is_array($material)) {
                continue;
            }
            $data = self::array_value($material, 'data', array());
            if (!is_array($data)) {
                continue;
            }
            $material_id = self::first_string(array(self::array_value($material, 'id')), 'material-' . ($material_index + 1));
            $candidate_components = self::is_list($data) ? $data : self::array_value($data, 'components', array());
            if (empty($candidate_components)) {
                $candidate_components = self::array_value($data, 'additionalOptions', array());
            }
            if (!is_array($candidate_components)) {
                continue;
            }
            foreach (array_values($candidate_components) as $component_index => $component) {
                if (!is_array($component)) {
                    continue;
                }
                $component['rulesByMaterial'] = self::array_value($component, 'rulesByMaterial', array(
                    $material_id => array('enabled' => true),
                ));
                $component['id'] = self::first_string(array(
                    self::array_value($component, 'id'),
                ), 'additional-component-' . sanitize_key((string) self::first_string(array(
                    self::array_value($component, 'title'),
                    self::array_value($component, 'name'),
                ), 'component-' . ($component_index + 1))));
                $components[] = $component;
            }
        }
        return $components;
    }

    private static function normalize_components_option(array $option, array $components): array
    {
        $option['label'] = isset($option['label']) ? $option['label'] : 'Additional Components';
        $option['description'] = isset($option['description']) ? $option['description'] : '';
        $option['items'] = array_values(array_filter(array_map(function ($component, $index) {
            if (!is_array($component)) {
                return null;
            }
            return array(
                'id' => self::first_string(array(self::array_value($component, 'id')), 'additional-component-' . ($index + 1)),
                'icon' => self::first_string(array(self::array_value($component, 'icon')), ''),
                'title' => self::first_string(array(self::array_value($component, 'title'), self::array_value($component, 'name')), 'Component'),
                'options' => is_array(self::array_value($component, 'options', array())) ? array_values(self::array_value($component, 'options', array())) : array(),
                'description' => self::first_string(array(self::array_value($component, 'description')), ''),
                'rulesByMaterial' => is_array(self::array_value($component, 'rulesByMaterial', array())) ? self::array_value($component, 'rulesByMaterial', array()) : array(),
            );
        }, $components, array_keys($components))));

        return $option;
    }

    private static function canonicalize_to_template($value, $template, string $path = '')
    {
        if (self::is_dynamic_map_path($path)) {
            return is_array($value) ? $value : (is_array($template) ? $template : array());
        }

        if (is_array($template) && self::is_list($template)) {
            if (!is_array($value)) {
                return $template;
            }
            if (empty($template)) {
                return array_values($value);
            }
            $item_template = $template[0];
            return array_values(array_map(function ($item) use ($item_template, $path) {
                return self::canonicalize_to_template(
                    $item,
                    $item_template,
                    $path . '[]'
                );
            }, self::is_list($value) ? $value : array_values($value)));
        }

        if (is_array($template)) {
            $value = is_array($value) ? $value : array();
            $result = array();
            foreach ($template as $key => $template_value) {
                $result[$key] = self::canonicalize_to_template(
                    array_key_exists($key, $value) ? $value[$key] : $template_value,
                    $template_value,
                    $path === '' ? (string) $key : $path . '.' . $key
                );
            }
            return $result;
        }

        return $value;
    }

    private static function is_dynamic_map_path(string $path): bool
    {
        return in_array($path, array(
            'additionalOptions.inputs.items[].inputs',
            'additionalOptions.components.items[].rulesByMaterial',
        ), true);
    }

    private static function deep_merge(array $base, $override): array
    {
        if (!is_array($override)) {
            return $base;
        }
        foreach ($override as $key => $value) {
            if (is_array($value) && isset($base[$key]) && is_array($base[$key]) && !self::is_list($value)) {
                $base[$key] = self::deep_merge($base[$key], $value);
            } else {
                $base[$key] = $value;
            }
        }
        return $base;
    }

    private static function remove_numeric_keys(array $value): array
    {
        $result = array();
        foreach ($value as $key => $item) {
            if (is_int($key) || ctype_digit((string) $key)) {
                continue;
            }
            $result[$key] = is_array($item) ? self::remove_numeric_keys($item) : $item;
        }
        return $result;
    }

    private static function array_value($array, $key, $default = null)
    {
        return is_array($array) && array_key_exists($key, $array) ? $array[$key] : $default;
    }

    private static function first_string(array $values, string $fallback): string
    {
        foreach ($values as $value) {
            if (is_string($value) && trim($value) !== '') {
                return trim($value);
            }
        }
        return $fallback;
    }

    private static function is_list(array $value): bool
    {
        if ($value === array()) {
            return true;
        }
        return array_keys($value) === range(0, count($value) - 1);
    }

    private static function sanitize_material_type($value): string
    {
        $value = sanitize_text_field((string) $value);
        return in_array($value, array('simple', 'advance', 'layers'), true) ? $value : 'simple';
    }

    private static function sanitize_product_type($value): string
    {
        $value = strtolower(trim(str_replace(array('_', ' '), '-', sanitize_text_field((string) $value))));
        $map = array(
            'signboard' => 'signs-panels',
            'signboards' => 'signs-panels',
            'signs-panel' => 'signs-panels',
            'signs-panels' => 'signs-panels',
            'signs-and-panels' => 'signs-panels',
            'banner' => 'banners',
            'banners' => 'banners',
            'sticker' => 'stickers',
            'stickers' => 'stickers',
        );

        return isset($map[$value]) ? $map[$value] : 'signs-panels';
    }
}
