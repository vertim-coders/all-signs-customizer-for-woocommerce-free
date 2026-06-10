<?php
namespace ASOWP\Api\Admin\Required_Options;

use ASOWP\Support\ConfigSchemaNormalizer;
use WP_REST_Controller;

/**
 * REST API handler for config-level required options.
 */
class ASOWP_Api_Required_Options_Base extends WP_REST_Controller
{
    public function __construct()
    {
        $this->namespace = 'asowp/v1';
        $this->rest_base = '/configs';
    }

    protected function register_components_routes(string $base_route): void
    {
        register_rest_route(
            $this->namespace,
            $base_route . '/components',
            array(
                array(
                    'methods' => \WP_REST_Server::READABLE,
                    'callback' => array($this, 'get_components'),
                    'permission_callback' => array($this, 'permissions_check'),
                    'args' => array(
                        'config_id' => array(
                            'type' => 'integer',
                            'required' => true,
                        ),
                    ),
                ),
                array(
                    'methods' => \WP_REST_Server::CREATABLE,
                    'callback' => array($this, 'create_component'),
                    'permission_callback' => array($this, 'permissions_check'),
                    'args' => array(
                        'config_id' => array(
                            'type' => 'integer',
                            'required' => true,
                        ),
                    ),
                ),
                array(
                    'methods' => \WP_REST_Server::EDITABLE,
                    'callback' => array($this, 'update_components'),
                    'permission_callback' => array($this, 'permissions_check'),
                    'args' => array(
                        'config_id' => array(
                            'type' => 'integer',
                            'required' => true,
                        ),
                    ),
                ),
            )
        );

        register_rest_route(
            $this->namespace,
            $base_route . '/components/(?P<component_id>\d+)',
            array(
                array(
                    'methods' => \WP_REST_Server::READABLE,
                    'callback' => array($this, 'get_component'),
                    'permission_callback' => array($this, 'permissions_check'),
                    'args' => array(
                        'config_id' => array(
                            'type' => 'integer',
                            'required' => true,
                        ),
                        'component_id' => array(
                            'type' => 'integer',
                            'required' => true,
                        ),
                    ),
                ),
                array(
                    'methods' => \WP_REST_Server::EDITABLE,
                    'callback' => array($this, 'update_component'),
                    'permission_callback' => array($this, 'permissions_check'),
                    'args' => array(
                        'config_id' => array(
                            'type' => 'integer',
                            'required' => true,
                        ),
                        'component_id' => array(
                            'type' => 'integer',
                            'required' => true,
                        ),
                    ),
                ),
                array(
                    'methods' => \WP_REST_Server::DELETABLE,
                    'callback' => array($this, 'delete_component'),
                    'permission_callback' => array($this, 'permissions_check'),
                    'args' => array(
                        'config_id' => array(
                            'type' => 'integer',
                            'required' => true,
                        ),
                        'component_id' => array(
                            'type' => 'integer',
                            'required' => true,
                        ),
                    ),
                ),
            )
        );

        register_rest_route(
            $this->namespace,
            $base_route . '/components/(?P<component_id>\d+)/options',
            array(
                array(
                    'methods' => \WP_REST_Server::READABLE,
                    'callback' => array($this, 'get_component_options'),
                    'permission_callback' => array($this, 'permissions_check'),
                    'args' => array(
                        'config_id' => array(
                            'type' => 'integer',
                            'required' => true,
                        ),
                        'component_id' => array(
                            'type' => 'integer',
                            'required' => true,
                        ),
                    ),
                ),
                array(
                    'methods' => \WP_REST_Server::CREATABLE,
                    'callback' => array($this, 'create_option'),
                    'permission_callback' => array($this, 'permissions_check'),
                    'args' => array(
                        'config_id' => array(
                            'type' => 'integer',
                            'required' => true,
                        ),
                        'component_id' => array(
                            'type' => 'integer',
                            'required' => true,
                        ),
                    ),
                ),
            )
        );

        register_rest_route(
            $this->namespace,
            $base_route . '/components/(?P<component_id>\d+)/options/(?P<option_id>\d+)',
            array(
                array(
                    'methods' => \WP_REST_Server::READABLE,
                    'callback' => array($this, 'get_option'),
                    'permission_callback' => array($this, 'permissions_check'),
                    'args' => array(
                        'config_id' => array(
                            'type' => 'integer',
                            'required' => true,
                        ),
                        'component_id' => array(
                            'type' => 'integer',
                            'required' => true,
                        ),
                        'option_id' => array(
                            'type' => 'integer',
                            'required' => true,
                        ),
                    ),
                ),
                array(
                    'methods' => \WP_REST_Server::EDITABLE,
                    'callback' => array($this, 'update_option'),
                    'permission_callback' => array($this, 'permissions_check'),
                    'args' => array(
                        'config_id' => array(
                            'type' => 'integer',
                            'required' => true,
                        ),
                        'component_id' => array(
                            'type' => 'integer',
                            'required' => true,
                        ),
                        'option_id' => array(
                            'type' => 'integer',
                            'required' => true,
                        ),
                    ),
                ),
                array(
                    'methods' => \WP_REST_Server::DELETABLE,
                    'callback' => array($this, 'delete_option'),
                    'permission_callback' => array($this, 'permissions_check'),
                    'args' => array(
                        'config_id' => array(
                            'type' => 'integer',
                            'required' => true,
                        ),
                        'component_id' => array(
                            'type' => 'integer',
                            'required' => true,
                        ),
                        'option_id' => array(
                            'type' => 'integer',
                            'required' => true,
                        ),
                    ),
                ),
            )
        );
    }

    protected function get_meta(int $config_id): array
    {
        $meta = get_post_meta($config_id, 'asowp-configs-meta', true);
        return is_array($meta) ? $meta : array();
    }

    protected function get_normalized_meta(int $config_id): array
    {
        return ConfigSchemaNormalizer::normalize_meta($this->get_meta($config_id));
    }

    protected function save_required_options(int $config_id, array $required_options)
    {
        $meta = $this->get_meta($config_id);
        $meta['requiredOptions'] = $required_options;
        $expected = ConfigSchemaNormalizer::normalize_meta($meta);
        ConfigSchemaNormalizer::save_meta($config_id, $meta);

        clean_post_cache($config_id);

        $current_meta = $this->get_normalized_meta($config_id);
        $current_required_options = isset($current_meta['requiredOptions']) && is_array($current_meta['requiredOptions'])
            ? $current_meta['requiredOptions']
            : array();
        $expected_required_options = isset($expected['requiredOptions']) && is_array($expected['requiredOptions'])
            ? $expected['requiredOptions']
            : array();

        return wp_json_encode($current_required_options) === wp_json_encode($expected_required_options);
    }

    protected function save_raw_meta(int $config_id, array $meta)
    {
        global $wpdb;

        $serialized_meta = maybe_serialize($meta);
        $updated = $wpdb->update(
            $wpdb->postmeta,
            array('meta_value' => $serialized_meta),
            array(
                'post_id' => $config_id,
                'meta_key' => 'asowp-configs-meta',
            ),
            array('%s'),
            array('%d', '%s')
        );

        if ($updated === false) {
            return false;
        }

        if ($updated === 0) {
            $existing = $wpdb->get_var(
                $wpdb->prepare(
                    "SELECT meta_value FROM {$wpdb->postmeta} WHERE post_id = %d AND meta_key = %s LIMIT 1",
                    $config_id,
                    'asowp-configs-meta'
                )
            );

            if ($existing === null) {
                $added = add_post_meta($config_id, 'asowp-configs-meta', $meta, true);
                if ($added === false) {
                    return false;
                }
            }
        }

        clean_post_cache($config_id);
        return true;
    }

    protected function get_required_options(int $config_id): array
    {
        $meta = $this->get_normalized_meta($config_id);
        $required_options = isset($meta['requiredOptions']) && is_array($meta['requiredOptions'])
            ? $meta['requiredOptions']
            : array();

        return $required_options;
    }

    protected function section_value(array $required_options, string $section, $default)
    {
        $storage_key = $this->section_storage_key($section);
        return array_key_exists($storage_key, $required_options) ? $required_options[$storage_key] : $default;
    }

    protected function section_storage_key(string $section): string
    {
        $map = array(
            'fixing-methods' => 'fixingMethods',
            'pricing' => 'pricing',
        );

        return isset($map[$section]) ? $map[$section] : $section;
    }

    protected function section_response_key(string $section): string
    {
        $map = array(
            'sizes' => 'sizes',
            'colors' => 'colors',
            'shapes' => 'shapes',
            'fixing-methods' => 'fixingMethods',
            'pricing' => 'pricing',
            'borders' => 'borders',
            'materials' => 'materials',
            'components' => 'components',
            'fonts' => 'fonts',
        );

        return isset($map[$section]) ? $map[$section] : $section;
    }

    protected function section_response_payload(string $section, $value, array $extra = array()): array
    {
        $payload = is_array($value) ? $value : array();
        if (!empty($extra)) {
            $payload = array_merge($payload, $extra);
        }

                        return array(
            'success' => true,
            'data' => array(
                $this->section_response_key($section) => $payload,
            ),
        );
    }

    protected function simple_section_default(string $section)
    {
        switch ($section) {
            case 'sizes':
                return array(
                    'label' => 'Sizes',
                    'description' => '',
                    'customSize' => array(
                        'active' => false,
                        'showPredefinedSizes' => true,
                        'width' => array('label' => 'Width', 'min' => 0, 'max' => 0),
                        'height' => array('label' => 'Height', 'min' => 0, 'max' => 0),
                    ),
                    'thickness' => array('active' => false, 'values' => array(), 'items' => array()),
                    'items' => array(),
                );
            case 'colors':
                return array(
                    'customColors' => array('active' => true, 'label' => 'Custom Colors', 'prevImg' => ''),
                    'items' => array(),
                );
            case 'shapes':
                return array(
                    'label' => 'Shapes',
                    'description' => '',
                    'items' => array(),
                );
            case 'fixing-methods':
                return array(
                    'label' => 'Fixing Methods',
                    'description' => '',
                    'items' => array(),
                );
            case 'borders':
                return array(
                    'label' => 'Borders',
                    'description' => '',
                    'settings' => array(
                        'borderColorsLabel' => 'Borders Colors',
                        'colors' => array(),
                        'enableBorderWidth' => true,
                        'enableBorderColor' => true,
                        'customColorsPrevImg' => '',
                    ),
                    'items' => array(),
                );
            case 'pricing':
                return array(
                    'mode' => '',
                    'label' => 'Pricing',
                    'description' => '',
                    'priceOptions' => array(),
                );
            case 'materials':
                return array(
                    'label' => 'Materials',
                    'description' => '',
                    'items' => array(),
                );
            case 'components':
                                return array(
                    'label' => 'Additional Components',
                    'description' => '',
                    'items' => array(),
                );
            case 'fonts':
                return array(
                    'label' => 'Fonts',
                    'description' => '',
                    'items' => array(),
                );
            default:
                return array();
        }
    }

    protected function get_section_items(array $required_options, string $section): array
    {
        $section_value = $this->section_value($required_options, $section, $this->simple_section_default($section));
        if ($section === 'materials' || $section === 'components') {
            return is_array($section_value) && isset($section_value['items']) && is_array($section_value['items'])
                ? array_values($section_value['items'])
                : array();
        }
        return is_array($section_value) ? $section_value : $this->simple_section_default($section);
    }

    protected function section_items_key(string $section): string
    {
        $map = array(
            'sizes' => 'items',
            'colors' => 'items',
            'shapes' => 'items',
            'fixing-methods' => 'items',
            'fonts' => 'items',
            'pricing' => 'priceOptions',
            'borders' => 'items',
        );

        return isset($map[$section]) ? $map[$section] : 'items';
    }

    protected function section_item_list(array $required_options, string $section): array
    {
        $section_value = $this->section_value($required_options, $section, $this->simple_section_default($section));
        if (!is_array($section_value)) {
            return array();
        }

        $key = $this->section_items_key($section);
        return isset($section_value[$key]) && is_array($section_value[$key])
            ? array_values($section_value[$key])
            : array();
    }

    protected function section_value_with_items(array $required_options, string $section, array $items): array
    {
        $section_value = $this->section_value($required_options, $section, $this->simple_section_default($section));
        $items = array_values($items);

        if (!is_array($section_value)) {
            $section_value = $this->simple_section_default($section);
        }

        $section_value[$this->section_items_key($section)] = $items;
        return $section_value;
    }

    protected function ensure_single_default_item(array $items, string $default_key = 'isDefault'): array
    {
        if (empty($items)) {
            return $items;
        }

        $default_index = null;
        foreach ($items as $index => $item) {
            if (!empty($item[$default_key])) {
                $default_index = $index;
                break;
            }
        }

        if ($default_index === null) {
            $default_index = 0;
        }

        foreach ($items as $index => $item) {
            $items[$index][$default_key] = $index === $default_index;
        }

        return $items;
    }

    protected function set_default_section_item($request, string $section, string $response_key, string $not_found_message, string $success_message)
    {
        $config_id = absint($request->get_param('config_id'));
        $item_id = absint($request->get_param('item_id'));
        if (!$config_id) {
            return rest_ensure_response(array('success' => false, 'message' => __('No Configuration found', 'all-signs-options-pro')));
        }

        $required_options = $this->get_required_options($config_id);
        $items = $this->section_item_list($required_options, $section);
        if (!isset($items[$item_id])) {
            return rest_ensure_response(array('success' => false, 'message' => $not_found_message));
        }

        foreach ($items as $index => $item) {
            $items[$index]['isDefault'] = $index === $item_id;
        }

        $required_options = $this->set_section_items($required_options, $section, $this->section_value_with_items($required_options, $section, $items));
        $saved = $this->save_required_options($config_id, $required_options);

        return rest_ensure_response($saved === true
            ? array(
                'success' => true,
                'message' => $success_message,
                'data' => array($response_key => $items[$item_id]),
            )
            : array('success' => false, 'message' => __('Default option has not been updated', 'all-signs-options-pro')));
    }

    protected function section_items_match(array $actual, array $expected): bool
    {
        return json_encode(array_values($actual)) === json_encode(array_values($expected));
    }

    protected function is_list_array(array $value): bool
    {
        if (empty($value)) {
            return true;
        }
        return array_keys($value) === range(0, count($value) - 1);
    }

    protected function set_section_items(array $required_options, string $section, $value): array
    {
        $storage_key = $this->section_storage_key($section);
        $required_options[$storage_key] = $value;
        if ($storage_key !== $section) {
            unset($required_options[$section]);
        }
        return $required_options;
    }

    protected function get_section($request, string $section, ?string $response_key = null, ?callable $response_callback = null)
    {
        $config_id = absint($request->get_param('config_id'));
        if (!$config_id) {
            return rest_ensure_response(array('success' => false, 'message' => __('No Configuration found', 'all-signs-options-pro')));
        }

        $required_options = $this->get_required_options($config_id);
        $value = $this->get_section_items($required_options, $section);
        $response_key = $response_key ? $response_key : $this->section_response_key($section);

        if ($response_callback) {
            $value = call_user_func($response_callback, $config_id, $value, $required_options);
        }

        return rest_ensure_response(array(
            'success' => true,
            'data' => array(
                $response_key => $value,
            ),
        ));
    }

    protected function update_section($request, string $section)
    {
        $config_id = absint($request->get_param('config_id'));
        if (!$config_id) {
            return rest_ensure_response(array('success' => false, 'message' => __('No Configuration found', 'all-signs-options-pro')));
        }

        $payload = json_decode($request->get_body(), true);
        if (!is_array($payload)) {
            $payload = array();
        }

        return $this->update_section_payload($config_id, $section, $payload);
    }

    protected function update_section_payload(int $config_id, string $section, array $payload)
    {
        $required_options = $this->get_required_options($config_id);
        $current = $this->get_section_items($required_options, $section);
        $next_value = $payload;
        if ($this->is_list_array($payload) && $this->section_items_key($section)) {
            $next_value = $this->section_value_with_items($required_options, $section, $payload);
        }
        if ($current === $payload) {
            return rest_ensure_response(array(
                'success' => true,
                'message' => __('No change was observed', 'all-signs-options-pro'),
                'data' => array(
                    $this->section_response_key($section) => $payload,
                ),
            ));
        }

        $required_options = $this->set_section_items($required_options, $section, $next_value);
        $update = $this->save_required_options($config_id, $required_options);

        if ($update === true) {
            return rest_ensure_response(array(
                'success' => true,
                'message' => sprintf(__('Required option %s successfully updated', 'all-signs-options-pro'), $section),
                'data' => array(
                    $this->section_response_key($section) => $next_value,
                ),
            ));
        }

        return rest_ensure_response(array('success' => false, 'message' => sprintf(__('Required option %s has not been updated', 'all-signs-options-pro'), $section)));
    }

    protected function sizes_response(int $config_id, $value): array
    {
        $value = is_array($value) ? $value : array();
        $items = array();
        if (isset($value['items']) && is_array($value['items'])) {
            $items = array_values($value['items']);
        }

        if (isset($value['customSize']) && is_array($value['customSize'])) {
            unset($value['customSize']['pricings']);
        }
        unset($value['measurementUnit']);
        $value['label'] = isset($value['label']) ? (string) $value['label'] : 'Sizes';
        $value['description'] = isset($value['description']) ? (string) $value['description'] : '';
        $value['settings'] = array(
            'title' => $value['label'],
            'description' => $value['description'],
        );
        $value['items'] = $items;

        return $value;
    }

    protected function shapes_response(int $config_id, $value): array
    {
        $items = array();
        if (is_array($value) && isset($value['items']) && is_array($value['items'])) {
            $items = array_values(array_map(function ($shape) {
                if (!is_array($shape)) {
                    return array();
                }

                unset($shape['enablePricingBySurface']);
                return $shape;
            }, $value['items']));
        }

        return array(
            'items' => $items,
            'manageShapes' => get_option('asowp_all_shapes', array()),
        );
    }

    protected function fixing_methods_response(int $config_id, $value): array
    {
        $required_options = $this->get_required_options($config_id);
        $sizes = $this->get_section_items($required_options, 'sizes');
        $shapes = $this->get_section_items($required_options, 'shapes');

        return array(
            'items' => is_array($value) && isset($value['items']) && is_array($value['items']) ? array_values($value['items']) : array(),
            'manageFixingMethods' => get_option('asowp_all_fixingMethods', array()),
            'sizes' => isset($sizes['items']) && is_array($sizes['items']) ? $sizes['items'] : array(),
            'shapes' => isset($shapes['items']) && is_array($shapes['items']) ? array_values($shapes['items']) : array(),
        );
    }

    protected function borders_response(int $config_id, $value): array
    {
        $required_options = $this->get_required_options($config_id);
        $sizes = $this->get_section_items($required_options, 'sizes');
        $shapes = $this->get_section_items($required_options, 'shapes');
        $settings = is_array($value) && isset($value['settings']) && is_array($value['settings'])
            ? $value['settings']
            : array();

        return array(
            'settings' => $settings,
            'items' => isset($value['items']) && is_array($value['items']) ? array_values($value['items']) : array(),
            'manageBorders' => get_option('asowp_all_borders', array()),
            'sizes' => isset($sizes['items']) && is_array($sizes['items']) ? $sizes['items'] : array(),
            'shapes' => isset($shapes['items']) && is_array($shapes['items']) ? array_values($shapes['items']) : array(),
        );
    }

    protected function materials_response(int $config_id, $value): array
    {
        return array(
            'items' => is_array($value) && isset($value['items']) && is_array($value['items']) ? array_values($value['items']) : array(),
        );
    }

    protected function get_config_forced_material_type(int $config_id): string
    {
        $normalized = $this->get_normalized_meta($config_id);
        $material_type = self::deep_value($normalized, array('materialType'), 'simple');

        return $material_type === 'advance' ? 'advance' : 'simple';
    }

        protected function normalize_material(array $material, int $index = 0, int $config_id = 0): array
    {
        $forced_type = $config_id ? $this->get_config_forced_material_type($config_id) : null;

        $normalized = array(
            'name' => isset($material['name']) ? $material['name'] : (isset($material['label']) ? $material['label'] : ''),
            'description' => isset($material['description']) ? $material['description'] : '',
            'icon' => isset($material['icon']) ? $material['icon'] : (isset($material['image']) ? $material['image'] : ''),
            'previewImg' => isset($material['previewImg']) ? $material['previewImg'] : (isset($material['icon']) ? $material['icon'] : ''),
            'type' => $forced_type ? $forced_type : (isset($material['type']) ? $material['type'] : 'simple'),
            'active' => isset($material['active']) ? (bool) $material['active'] : true,
            'isDefault' => isset($material['isDefault']) ? (bool) $material['isDefault'] : $index === 0,
            'pricingId' => isset($material['pricingId']) ? $material['pricingId'] : '',
            'additionalPrice' => isset($material['additionalPrice']) ? (float) $material['additionalPrice'] : 0,
            'excludeComponentIds' => isset($material['excludeComponentIds']) && is_array($material['excludeComponentIds']) ? array_values($material['excludeComponentIds']) : array(),
            'materialKey' => isset($material['materialKey']) ? $material['materialKey'] : (isset($material['sourceMaterialId']) ? $material['sourceMaterialId'] : ''),
            'sourceMaterialId' => isset($material['sourceMaterialId']) ? $material['sourceMaterialId'] : (isset($material['materialKey']) ? $material['materialKey'] : ''),
            'data' => isset($material['data']) && is_array($material['data']) ? $material['data'] : array(),
        );

        // Generate Shopify-style id
        if (!isset($material['id']) || empty($material['id'])) {
            $normalized['id'] = $this->generate_material_id($material, $index);
        } else {
            $normalized['id'] = (string) $material['id'];
        }

        return $normalized;
    }

    protected function materials_section_default(): array
    {
        return array(
            'label' => 'Materials',
            'description' => '',
            'items' => array(),
        );
    }

    protected function get_materials_items(array $required_options): array
    {
        $materials = $this->section_value($required_options, 'materials', $this->materials_section_default());

        return is_array($materials) && isset($materials['items']) && is_array($materials['items'])
            ? array_values($materials['items'])
            : array();
    }

    protected function save_materials_items(int $config_id, array $materials)
    {
        $required_options = $this->get_required_options($config_id);
        $required_options['materials'] = array(
            'label' => 'Materials',
            'description' => '',
            'items' => array_values($materials),
        );

        return $this->save_required_options($config_id, $required_options);
    }

    protected function normalize_component(array $component, int $index = 0): array
    {
        return array(
            'title' => isset($component['title']) ? $component['title'] : (isset($component['name']) ? $component['name'] : ''),
            'name' => isset($component['name']) ? $component['name'] : (isset($component['label']) ? $component['label'] : ''),
            'description' => isset($component['description']) ? $component['description'] : '',
            'icon' => isset($component['icon']) ? $component['icon'] : '',
            'options' => isset($component['options']) && is_array($component['options']) ? array_values($component['options']) : array(),
            'isDefault' => isset($component['isDefault']) ? (bool) $component['isDefault'] : $index === 0,
        );
    }

    protected function normalize_component_option(array $option, int $index = 0): array
    {
        $option['isDefault'] = isset($option['isDefault']) ? (bool) $option['isDefault'] : $index === 0;
        return $option;
    }

    protected static function deep_value($array, array $path, $default = null)
    {
        $current = $array;
        foreach ($path as $segment) {
            if (!is_array($current) || !array_key_exists($segment, $current)) {
                return $default;
            }
            $current = $current[$segment];
        }
        return $current;
    }

    public function get_materials($request)
    {
        $config_id = absint($request->get_param('config_id'));
        if (!$config_id) {
            return rest_ensure_response(array('success' => false, 'message' => __('No Configuration found', 'all-signs-options-pro')));
        }

        $required_options = $this->get_required_options($config_id);
        $materials = $this->section_value($required_options, 'materials', $this->materials_section_default());

        return rest_ensure_response($this->section_response_payload('materials', $materials));
    }

    public function get_materials_material($request)
    {
        $config_id = absint($request->get_param('config_id'));
        $material_id = absint($request->get_param('material_id'));

        if (!$config_id) {
            return rest_ensure_response(array('message' => __('No Configuration found', 'all-signs-options-pro')));
        }

        $required_options = $this->get_required_options($config_id);
        $materials = $this->get_materials_items($required_options);
        if (!isset($materials[$material_id])) {
            return rest_ensure_response(array('success' => false, 'message' => __('No materials component found', 'all-signs-options-pro')));
        }

        return rest_ensure_response(array(
            'success' => true,
            'data' => array(
                'material' => $this->normalize_material($materials[$material_id], $material_id, $config_id),
            ),
        ));
    }

    public function create_materials_material($request)
    {
        $config_id = absint($request->get_param('config_id'));
        if (!$config_id) {
            return rest_ensure_response(array('message' => __('No Configuration found', 'all-signs-options-pro')));
        }

        $required_options = $this->get_required_options($config_id);
        $materials = $this->get_materials_items($required_options);
        $new_material = json_decode($request->get_body(), true);
        $new_material = is_array($new_material) ? $this->normalize_material($new_material, count($materials), $config_id) : array();

        if (empty($materials)) {
            $new_material['isDefault'] = true;
        } elseif (!array_reduce($materials, function ($carry, $item) {
            return $carry || !empty($item['isDefault']);
        }, false)) {
            $materials[0]['isDefault'] = true;
        }

        $materials[] = $new_material;
        $update = $this->save_materials_items($config_id, $materials);

        return rest_ensure_response($update === true
            ? array(
                'success' => true,
                'message' => __('Materiel component successfully added', 'all-signs-options-pro'),
                'data' => array(
                    'materials' => array(
                        'items' => array_values($materials),
                    ),
                ),
            )
            : array('success' => false, 'message' => __('Materiel component has not been added', 'all-signs-options-pro')));
    }

    public function update_materials_material($request)
    {
        $config_id = absint($request->get_param('config_id'));
        $material_id = absint($request->get_param('material_id'));
        if (!$config_id) {
            return rest_ensure_response(array('message' => __('No Configuration found', 'all-signs-options-pro')));
        }

        $required_options = $this->get_required_options($config_id);
        $materials = $this->get_materials_items($required_options);
        $material = json_decode($request->get_body(), true);
        $material = is_array($material) ? $this->normalize_material($material, $material_id, $config_id) : array();

        if (!isset($materials[$material_id])) {
            return rest_ensure_response(array('success' => false, 'message' => __('Materiel component has not been edited', 'all-signs-options-pro')));
        }

        $old_material = $materials[$material_id];
        if ($old_material === $material) {
            return rest_ensure_response(array('success' => 'same', 'message' => __('No change was observed', 'all-signs-options-pro')));
        }

        $target_active = isset($material['active']) ? (bool) $material['active'] : true;
        $active_count = 0;
        foreach ($materials as $idx => $existing) {
            if ($idx === $material_id) {
                continue;
            }
            if (!empty($existing['active'])) {
                $active_count++;
            }
        }

        $current_active = isset($old_material['active']) ? (bool) $old_material['active'] : true;
        if ($current_active && !$target_active && $active_count <= 0) {
            return rest_ensure_response(array('success' => false, 'message' => __('At least one material must remain active', 'all-signs-options-pro')));
        }

        $materials[$material_id] = array_merge($old_material, $material);
        if (!empty($materials[$material_id]['isDefault'])) {
            foreach ($materials as $idx => $existing) {
                if ($idx !== $material_id) {
                    $materials[$idx]['isDefault'] = false;
                }
            }
        }

        $update = $this->save_materials_items($config_id, $materials);

        return rest_ensure_response($update === true
            ? array(
                'success' => true,
                'message' => __('Materiel component successfully edited', 'all-signs-options-pro'),
                'data' => array(
                    'materials' => array(
                        'items' => array_values($materials),
                    ),
                ),
            )
            : array('success' => false, 'message' => __('Materiel component has not been edited', 'all-signs-options-pro')));
    }

    public function delete_materials_material($request)
    {
        $config_id = absint($request->get_param('config_id'));
        $material_id = absint($request->get_param('material_id'));
        if (!$config_id) {
            return rest_ensure_response(array('success' => false, 'message' => __('No Configuration found', 'all-signs-options-pro')));
        }

        $required_options = $this->get_required_options($config_id);
        $materials = $this->get_materials_items($required_options);

        if (!isset($materials[$material_id])) {
            return rest_ensure_response(array('success' => false, 'message' => __('No materials component found', 'all-signs-options-pro')));
        }

        if (count($materials) <= 1) {
            return rest_ensure_response(array('success' => false, 'message' => __('At least one material must remain', 'all-signs-options-pro')));
        }

        $target_active = isset($materials[$material_id]['active']) ? (bool) $materials[$material_id]['active'] : true;
        $active_remaining = 0;
        foreach ($materials as $idx => $existing) {
            if ($idx === $material_id) {
                continue;
            }
            if (!empty($existing['active'])) {
                $active_remaining++;
            }
        }
        if ($target_active && $active_remaining < 1) {
            return rest_ensure_response(array('success' => false, 'message' => __('At least one active material must remain', 'all-signs-options-pro')));
        }

        array_splice($materials, $material_id, 1);
        $update = $this->save_materials_items($config_id, $materials);

        return rest_ensure_response($update === true
            ? array(
                'success' => true,
                'message' => __('Component successfully deleted', 'all-signs-options-pro'),
                'data' => array(
                    'materials' => array(
                        'items' => array_values($materials),
                    ),
                ),
            )
            : array('success' => false, 'message' => __('Component has not been deleted', 'all-signs-options-pro')));
    }

    public function get_components($request)
    {
        $config_id = absint($request->get_param('config_id'));
        if (!$config_id) {
            return rest_ensure_response(array('success' => false, 'message' => __('No Configuration found', 'all-signs-options-pro')));
        }

        $required_options = $this->get_required_options($config_id);
        $components = $this->get_section_items($required_options, 'components');

        return rest_ensure_response(array(
            'success' => true,
            'data' => array(
                'components' => array(
                    'items' => is_array($components) ? array_values($components) : array(),
                    'manageShapes' => get_option('asowp_all_shapes', array()),
                    'manageFixingMethods' => get_option('asowp_all_fixingMethods', array()),
                ),
            ),
        ));
    }

    public function create_component($request)
    {
        $config_id = absint($request->get_param('config_id'));
        if (!$config_id) {
            return rest_ensure_response(array('success' => false, 'message' => __('No Configuration found', 'all-signs-options-pro')));
        }

        $required_options = $this->get_required_options($config_id);
        $components = $this->get_section_items($required_options, 'components');
        $new_component = json_decode($request->get_body(), true);
        $new_component = is_array($new_component) ? $this->normalize_component($new_component, count($components)) : array();

        if (empty($components)) {
            $new_component['isDefault'] = true;
        } elseif (!array_reduce($components, function ($carry, $item) {
            return $carry || !empty($item['isDefault']);
        }, false)) {
            $components[0]['isDefault'] = true;
        }

        $components[] = $new_component;
        $required_options = $this->set_section_items($required_options, 'components', array('items' => $components, 'label' => 'Additional Components', 'description' => ''));
        $update = $this->save_required_options($config_id, $required_options);

        return rest_ensure_response($update === true
            ? array(
                'success' => true,
                'message' => __('Component successfully added', 'all-signs-options-pro'),
                'data' => array(
                    'components' => array(
                        'items' => array_values($components),
                    ),
                ),
            )
            : array('success' => false, 'message' => __('Component has not been added', 'all-signs-options-pro')));
    }

    public function update_components($request)
    {
        $config_id = absint($request->get_param('config_id'));
        if (!$config_id) {
            return rest_ensure_response(array('success' => false, 'message' => __('No Configuration found', 'all-signs-options-pro')));
        }

        $required_options = $this->get_required_options($config_id);
        $components = json_decode($request->get_body(), true);
        $components = is_array($components) ? array_values($components) : array();
        $current = $this->get_section_items($required_options, 'components');
        if ($current === $components) {
            return rest_ensure_response(array('success' => 'same', 'message' => __('No change observed in components', 'all-signs-options-pro')));
        }

        $required_options = $this->set_section_items($required_options, 'components', array('items' => $components, 'label' => 'Additional Components', 'description' => ''));
        $update = $this->save_required_options($config_id, $required_options);

        return rest_ensure_response($update === true
            ? array(
                'success' => true,
                'message' => __('Components successfully updated', 'all-signs-options-pro'),
                'data' => array(
                    'components' => array(
                        'items' => array_values($components),
                    ),
                ),
            )
            : array('success' => false, 'message' => __('Components have not been updated', 'all-signs-options-pro')));
    }

    public function get_component($request)
    {
        $config_id = absint($request->get_param('config_id'));
        $component_id = absint($request->get_param('component_id'));
        $required_options = $this->get_required_options($config_id);
        $components = $this->get_section_items($required_options, 'components');
        $component = isset($components[$component_id]) ? $components[$component_id] : null;

        if (!$component) {
            return rest_ensure_response(array('success' => false, 'message' => __('No materials component found', 'all-signs-options-pro')));
        }

        return rest_ensure_response(array(
            'success' => true,
            'data' => array(
                'component' => $component,
            ),
        ));
    }

    public function get_component_options($request)
    {
        $config_id = absint($request->get_param('config_id'));
        $component_id = absint($request->get_param('component_id'));
        $required_options = $this->get_required_options($config_id);
        $components = $this->get_section_items($required_options, 'components');
        $component = isset($components[$component_id]) ? $components[$component_id] : null;

        return rest_ensure_response(array(
            'success' => true,
            'data' => array(
                'componentOptions' => array(
                    'manageShapes' => get_option('asowp_all_shapes', array()),
                    'manageFixingMethods' => get_option('asowp_all_fixingMethods', array()),
                    'component' => $component,
                ),
            ),
            'message' => $component ? '' : __('No materials component found', 'all-signs-options-pro'),
        ));
    }

    public function update_component($request)
    {
        $config_id = absint($request->get_param('config_id'));
        $component_id = absint($request->get_param('component_id'));
        $required_options = $this->get_required_options($config_id);
        $components = $this->get_section_items($required_options, 'components');
        $component = json_decode($request->get_body(), true);
        $component = is_array($component) ? $this->normalize_component($component, $component_id) : array();

        if (!isset($components[$component_id])) {
            return rest_ensure_response(array('success' => false, 'message' => __('Materiel component has not been edited', 'all-signs-options-pro')));
        }

        if ($components[$component_id] === $component) {
            return rest_ensure_response(array('success' => 'same', 'message' => __('No change was observed', 'all-signs-options-pro')));
        }

        $components[$component_id] = $component;
        $required_options = $this->set_section_items($required_options, 'components', array('items' => $components, 'label' => 'Additional Components', 'description' => ''));
        $update = $this->save_required_options($config_id, $required_options);

        return rest_ensure_response($update === true
            ? array(
                'success' => true,
                'message' => __('Component successfully edited', 'all-signs-options-pro'),
                'data' => array(
                    'components' => array(
                        'items' => array_values($components),
                    ),
                ),
            )
            : array('success' => false, 'message' => __('Component has not been edited', 'all-signs-options-pro')));
    }

    public function delete_component($request)
    {
        $config_id = absint($request->get_param('config_id'));
        $component_id = absint($request->get_param('component_id'));
        $required_options = $this->get_required_options($config_id);
        $components = $this->get_section_items($required_options, 'components');

        if (!isset($components[$component_id])) {
            return rest_ensure_response(array('success' => false, 'message' => __('No materials component found', 'all-signs-options-pro')));
        }

        array_splice($components, $component_id, 1);
        $required_options = $this->set_section_items($required_options, 'components', array('items' => $components, 'label' => 'Additional Components', 'description' => ''));
        $update = $this->save_required_options($config_id, $required_options);

        return rest_ensure_response($update === true
            ? array(
                'success' => true,
                'message' => __('Component successfully deleted', 'all-signs-options-pro'),
                'data' => array(
                    'components' => array(
                        'items' => array_values($components),
                    ),
                ),
            )
            : array('success' => false, 'message' => __('Component has not been deleted', 'all-signs-options-pro')));
    }

    public function create_option($request)
    {
        $config_id = absint($request->get_param('config_id'));
        $component_id = absint($request->get_param('component_id'));
        $required_options = $this->get_required_options($config_id);
        $components = $this->get_section_items($required_options, 'components');
        $option = json_decode($request->get_body(), true);
        $option = is_array($option) ? $this->normalize_component_option($option, 0) : array();

        if (!isset($components[$component_id])) {
            return rest_ensure_response(array('success' => false, 'message' => __('No materials component found', 'all-signs-options-pro')));
        }

        if (!isset($components[$component_id]['options']) || !is_array($components[$component_id]['options'])) {
            $components[$component_id]['options'] = array();
        }

        if (empty($components[$component_id]['options'])) {
            $option['isDefault'] = true;
        } elseif (!array_reduce($components[$component_id]['options'], function ($carry, $item) {
            return $carry || !empty($item['isDefault']);
        }, false)) {
            $components[$component_id]['options'][0]['isDefault'] = true;
        }

        $components[$component_id]['options'][] = $option;
        $required_options = $this->set_section_items($required_options, 'components', array('items' => $components, 'label' => 'Additional Components', 'description' => ''));
        $update = $this->save_required_options($config_id, $required_options);

        return rest_ensure_response($update === true
            ? array(
                'success' => true,
                'message' => __('Component option successfully added', 'all-signs-options-pro'),
                'data' => array(
                    'componentOptions' => array(
                        'component' => $components[$component_id],
                        'manageShapes' => get_option('asowp_all_shapes', array()),
                        'manageFixingMethods' => get_option('asowp_all_fixingMethods', array()),
                    ),
                ),
            )
            : array('success' => false, 'message' => __('Component option has not been added', 'all-signs-options-pro')));
    }

    public function get_option($request)
    {
        $config_id = absint($request->get_param('config_id'));
        $component_id = absint($request->get_param('component_id'));
        $option_id = absint($request->get_param('option_id'));
        $required_options = $this->get_required_options($config_id);
        $components = $this->get_section_items($required_options, 'components');

        if (!isset($components[$component_id]['options'][$option_id])) {
            return rest_ensure_response(array('message' => __('No materials component found', 'all-signs-options-pro')));
        }

        return rest_ensure_response(array(
            'success' => true,
            'data' => array(
                'option' => $components[$component_id]['options'][$option_id],
            ),
        ));
    }

    public function update_option($request)
    {
        $config_id = absint($request->get_param('config_id'));
        $component_id = absint($request->get_param('component_id'));
        $option_id = absint($request->get_param('option_id'));
        $required_options = $this->get_required_options($config_id);
        $components = $this->get_section_items($required_options, 'components');
        $option = json_decode($request->get_body(), true);
        $option = is_array($option) ? $this->normalize_component_option($option, $option_id) : array();

        if (!isset($components[$component_id]['options'][$option_id])) {
            return rest_ensure_response(array('success' => false, 'message' => __('Materiel component option has not been edited', 'all-signs-options-pro')));
        }

        if ($components[$component_id]['options'][$option_id] === $option) {
            return rest_ensure_response(array('success' => 'same', 'message' => __('No change was observed', 'all-signs-options-pro')));
        }

        $components[$component_id]['options'][$option_id] = $option;
        $required_options = $this->set_section_items($required_options, 'components', array('items' => $components, 'label' => 'Additional Components', 'description' => ''));
        $update = $this->save_required_options($config_id, $required_options);

        return rest_ensure_response($update === true
            ? array(
                'success' => true,
                'message' => __('Component option successfully edited', 'all-signs-options-pro'),
                'data' => array(
                    'componentOptions' => array(
                        'component' => $components[$component_id],
                        'manageShapes' => get_option('asowp_all_shapes', array()),
                        'manageFixingMethods' => get_option('asowp_all_fixingMethods', array()),
                    ),
                ),
            )
            : array('success' => false, 'message' => __('Component option has not been edited', 'all-signs-options-pro')));
    }

    public function delete_option($request)
    {
        $config_id = absint($request->get_param('config_id'));
        $component_id = absint($request->get_param('component_id'));
        $option_id = absint($request->get_param('option_id'));
        $required_options = $this->get_required_options($config_id);
        $components = $this->get_section_items($required_options, 'components');

        if (!isset($components[$component_id]['options'][$option_id])) {
            return rest_ensure_response(array('success' => false, 'message' => __('No materials component found', 'all-signs-options-pro')));
        }

        array_splice($components[$component_id]['options'], $option_id, 1);
        $required_options = $this->set_section_items($required_options, 'components', array('items' => $components, 'label' => 'Additional Components', 'description' => ''));
        $update = $this->save_required_options($config_id, $required_options);

        return rest_ensure_response($update === true
            ? array(
                'success' => true,
                'message' => __('Material Component option successfully deleted', 'all-signs-options-pro'),
                'data' => array(
                    'componentOptions' => array(
                        'component' => $components[$component_id],
                        'manageShapes' => get_option('asowp_all_shapes', array()),
                        'manageFixingMethods' => get_option('asowp_all_fixingMethods', array()),
                    ),
                ),
            )
            : array('success' => false, 'message' => __('Material Component option has not been deleted', 'all-signs-options-pro')));
    }

        // ===== Shopify-style ID generation =====

    protected function slugify($value, $fallback = 'item'): string
    {
        $value = is_string($value) || is_numeric($value) ? (string) $value : '';
        $value = trim($value);
        $value = mb_strtolower($value, 'UTF-8');
        $value = preg_replace('/[^a-z0-9]+/u', '-', $value);
        $value = trim($value, '-');

        return $value !== '' ? $value : $fallback;
    }

    protected function generate_size_id(array $size, string $productType = ''): string
    {
        $label = isset($size['label']) ? (string) $size['label'] : '';
        $prefix = !empty($productType) ? $this->slugify($productType, 'size') : 'size';
        
        // Use label as descriptor
        $descriptor = !empty($label) ? $this->slugify($label, 'size') : 'custom';
        
        return 'size-' . $prefix . '-' . $descriptor;
    }

    protected function generate_color_id(array $color, string $productType = ''): string
    {
        $name = isset($color['name']) ? (string) $color['name'] : '';
        $label = isset($color['label']) ? (string) $color['label'] : '';
        $codeHex = isset($color['pattern']['codeHex']) ? (string) $color['pattern']['codeHex'] : '';
        if ($codeHex === '' && isset($color['textColor']['codeHex'])) {
            $codeHex = (string) $color['textColor']['codeHex'];
        }
        $fallback = $name ?: $label ?: $codeHex ?: 'color';

        $type = !empty($productType) ? $this->slugify($productType, 'color') : 'item';

        return 'color-' . $type . '-' . $this->slugify($fallback, 'color');
    }

    protected function generate_material_id(array $material, int $index): string
    {
        $name = isset($material['name']) ? (string) $material['name'] : '';
        $id = isset($material['id']) ? (string) $material['id'] : '';

        return 'material-' . $this->slugify($name ?: $id ?: "m-{$index}", "m-{$index}");
    }

    protected function generate_fixing_method_id(array $fixingMethod): string
    {
        $methodId = isset($fixingMethod['fixingMethodId']) ? $fixingMethod['fixingMethodId'] : '';
        $name = isset($fixingMethod['name']) ? (string) $fixingMethod['name'] : '';

        return 'fixing-method-' . $this->slugify($methodId ?: $name ?: 'method', 'method');
    }

    protected function generate_shape_id(array $shape): string
    {
        $shapeId = isset($shape['shapeId']) ? $shape['shapeId'] : '';
        $name = isset($shape['name']) ? (string) $shape['name'] : '';

        return 'shape-' . $this->slugify($shapeId ?: $name ?: 'shape', 'shape');
    }

    protected function generate_border_id(array $border): string
    {
        $borderId = isset($border['manageBorderId']) ? $border['manageBorderId'] : '';
        $name = isset($border['name']) ? (string) $border['name'] : '';

        return 'border-' . $this->slugify($borderId ?: $name ?: 'border', 'border');
    }

    protected function generate_font_id(array $font, int $index): string
    {
        $label = isset($font['label']) ? (string) $font['label'] : '';
        $fontId = isset($font['managedFontId']) ? $font['managedFontId'] : '';

        return 'font-' . $this->slugify($label ?: $fontId ?: "f-{$index}", "f-{$index}");
    }

    protected function generate_additional_input_id(array $option): string
    {
        $title = isset($option['title']) ? (string) $option['title'] : '';
        $name = isset($option['name']) ? (string) $option['name'] : '';

        return 'additional-input-' . $this->slugify($title ?: $name ?: 'input', 'input');
    }

    public function permissions_check($request)
    {
        return true;
    }

    public function get_collection_params()
    {
        return array();
    }
}
