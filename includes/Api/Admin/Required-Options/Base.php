<?php
namespace ASCWO\Api\Admin\Required_Options;

use WP_REST_Controller;

/**
 * REST API handler for config-level required options.
 */
class ASCWO_Api_Required_Options_Base extends WP_REST_Controller
{
    public function __construct()
    {
        $this->namespace = 'ascwo/v1';
        $this->rest_base = '/configs';
    }

    protected function normalize_global_asset_url($url): string
    {
        $url = is_string($url) ? trim($url) : '';
        if ($url === '') {
            return '';
        }

        if (strpos($url, 'data:') === 0 || strpos($url, 'blob:') === 0) {
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

    protected function get_normalized_global_icon_items(string $option_name): array
    {
        $items = get_option($option_name, array());
        if (!is_array($items)) {
            return array();
        }

        $changed = false;
        foreach ($items as $index => $item) {
            if (!is_array($item) || !isset($item['icon'])) {
                continue;
            }
            $normalized_icon = $this->normalize_global_asset_url($item['icon']);
            if ($normalized_icon !== $item['icon']) {
                $items[$index]['icon'] = $normalized_icon;
                $changed = true;
            }

            $prefix = null;
            if ($option_name === 'ascwo_all_shapes') {
                $prefix = 'shape';
            } elseif ($option_name === 'ascwo_all_borders') {
                $prefix = 'border';
            }

            if ($prefix !== null && (!isset($items[$index]['id']) || $items[$index]['id'] === '')) {
                $label = isset($item['label']) ? (string) $item['label'] : '';
                $name = isset($item['name']) ? (string) $item['name'] : '';
                $value = isset($item['value']) ? (string) $item['value'] : '';
                $items[$index]['id'] = $prefix . '-' . $this->slugify($label ?: $name ?: $value ?: ('item-' . ($index + 1)), 'item');
                $changed = true;
            }
        }

        if ($changed) {
            update_option($option_name, $items);
        }

        return $items;
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
            $base_route . '/components/(?P<component_id>[^/]+)',
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
                            'type' => 'string',
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
                            'type' => 'string',
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
                            'type' => 'string',
                            'required' => true,
                        ),
                    ),
                ),
            )
        );

        register_rest_route(
            $this->namespace,
            $base_route . '/components/(?P<component_id>[^/]+)/options',
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
                            'type' => 'string',
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
                            'type' => 'string',
                            'required' => true,
                        ),
                    ),
                ),
            )
        );

        register_rest_route(
            $this->namespace,
            $base_route . '/components/(?P<component_id>[^/]+)/options/(?P<option_id>[^/]+)',
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
                            'type' => 'string',
                            'required' => true,
                        ),
                        'option_id' => array(
                            'type' => 'string',
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
                            'type' => 'string',
                            'required' => true,
                        ),
                        'option_id' => array(
                            'type' => 'string',
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
                            'type' => 'string',
                            'required' => true,
                        ),
                        'option_id' => array(
                            'type' => 'string',
                            'required' => true,
                        ),
                    ),
                ),
            )
        );
    }

    protected function get_meta(int $config_id): array
    {
        $meta = get_post_meta($config_id, 'ascwo-configs-meta', true);
        return is_array($meta) ? $meta : array();
    }

    protected function get_normalized_meta(int $config_id): array
    {
        $meta = $this->get_meta($config_id);
        $meta['data'] = isset($meta['data']) && is_array($meta['data']) ? $meta['data'] : array();
        $meta['requiredOptions'] = isset($meta['requiredOptions']) && is_array($meta['requiredOptions']) ? $meta['requiredOptions'] : array();
        if (isset($meta['data']['requiredOptions']) && is_array($meta['data']['requiredOptions'])) {
            $meta['requiredOptions'] = $meta['data']['requiredOptions'];
        }
        if (!isset($meta['data']['requiredOptions']) || !is_array($meta['data']['requiredOptions'])) {
            $meta['data']['requiredOptions'] = $meta['requiredOptions'];
        }
        return $meta;
    }

    protected function save_required_options(int $config_id, array $required_options)
    {
        $meta = $this->get_meta($config_id);
        if (!isset($meta['data']) || !is_array($meta['data'])) {
            $meta['data'] = array();
        }
        $meta['data']['requiredOptions'] = $required_options;
        unset($meta['requiredOptions']);
        $this->save_raw_meta($config_id, $meta);

        clean_post_cache($config_id);

        $current_required_options = $this->get_required_options($config_id);

        return wp_json_encode($current_required_options) === wp_json_encode($required_options);
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
                'meta_key' => 'ascwo-configs-meta',
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
                    'ascwo-configs-meta'
                )
            );

            if ($existing === null) {
                $added = add_post_meta($config_id, 'ascwo-configs-meta', $meta, true);
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
            'pricing' => 'pricings',
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
            'pricing' => 'pricings',
            'borders' => 'borders',
            'materials' => 'materials',
            'components' => 'components',
            'fonts' => 'fonts',
            'lightings' => 'lightings',
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
                    'label' => 'Pricings',
                    'description' => '',
                    'items' => array(),
                );
            case 'materials':
                return array(
                    'label' => 'Materials',
                    'description' => '',
                    'items' => array(),
                );
            case 'components':
                return array(
                    'label' => 'Components',
                    'description' => 'Choose your design',
                    'settings' => array(
                        'label' => 'Components',
                        'description' => 'Choose your design',
                        'behavior' => 'show-options-directly',
                        'showTabWhenSingleItem' => true,
                    ),
                    'items' => array(),
                );
            case 'fonts':
                return array(
                    'label' => 'Fonts',
                    'description' => '',
                    'items' => array(),
                );
            case 'lightings':
                return array(
                    'label' => 'Lighting',
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
            'pricing' => 'items',
            'borders' => 'items',
            'lightings' => 'items',
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
        $item_id = sanitize_text_field((string) $request->get_param('item_id'));
        if (!$config_id) {
            return rest_ensure_response(array('success' => false, 'message' => __('No Configuration found', 'all-signs-customizer-for-woocommerce-pro')));
        }

        $required_options = $this->get_required_options($config_id);
        $items = $this->section_item_list($required_options, $section);
        $item_index = $this->find_section_item_index_by_id($items, $item_id);
        if ($item_index === null) {
            return rest_ensure_response(array('success' => false, 'message' => $not_found_message));
        }

        foreach ($items as $index => $item) {
            $items[$index]['isDefault'] = $index === $item_index;
        }

        $required_options = $this->set_section_items($required_options, $section, $this->section_value_with_items($required_options, $section, $items));
        $saved = $this->save_required_options($config_id, $required_options);

        return rest_ensure_response($saved === true
            ? array(
                'success' => true,
                'message' => $success_message,
                'data' => array($response_key => $items[$item_index]),
            )
            : array('success' => false, 'message' => __('Default option has not been updated', 'all-signs-customizer-for-woocommerce-pro')));
    }

    protected function find_section_item_index_by_id(array $items, string $item_id, array $keys = array('id', 'value'))
    {
        $item_id = sanitize_text_field((string) $item_id);
        if ($item_id === '') {
            return null;
        }

        foreach ($items as $index => $item) {
            if (!is_array($item)) {
                continue;
            }

            foreach ($keys as $key) {
                if (!isset($item[$key])) {
                    continue;
                }

                if (sanitize_text_field((string) $item[$key]) === $item_id) {
                    return $index;
                }
            }
        }

        return null;
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
            return rest_ensure_response(array('success' => false, 'message' => __('No Configuration found', 'all-signs-customizer-for-woocommerce-pro')));
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
            return rest_ensure_response(array('success' => false, 'message' => __('No Configuration found', 'all-signs-customizer-for-woocommerce-pro')));
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
                'message' => __('No change was observed', 'all-signs-customizer-for-woocommerce-pro'),
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
                'message' => sprintf(__('Required option %s successfully updated', 'all-signs-customizer-for-woocommerce-pro'), $section),
                'data' => array(
                    $this->section_response_key($section) => $next_value,
                ),
            ));
        }

        return rest_ensure_response(array('success' => false, 'message' => sprintf(__('Required option %s has not been updated', 'all-signs-customizer-for-woocommerce-pro'), $section)));
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
            'manageShapes' => $this->get_normalized_global_icon_items('ascwo_all_shapes'),
        );
    }

    protected function fixing_methods_response(int $config_id, $value): array
    {
        $required_options = $this->get_required_options($config_id);
        $sizes = $this->get_section_items($required_options, 'sizes');
        $shapes = $this->get_section_items($required_options, 'shapes');
        $manage_fixing_methods = $this->get_manage_fixing_methods();
        $items = is_array($value) && isset($value['items']) && is_array($value['items']) ? array_values($value['items']) : array();

        return array(
            'items' => array_values(array_map(function ($item) use ($manage_fixing_methods) {
                return is_array($item) ? $this->normalize_required_fixing_method_item($item, $manage_fixing_methods) : array();
            }, $items)),
            'manageFixingMethods' => $manage_fixing_methods,
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
            'manageBorders' => $this->get_normalized_global_icon_items('ascwo_all_borders'),
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

        // Generate stable item id
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

    protected function get_materials_items(array $additional_options): array
    {
        $materials = array_key_exists('materials', $additional_options) && is_array($additional_options['materials'])
            ? $additional_options['materials']
            : $this->materials_section_default();

        return is_array($materials) && isset($materials['items']) && is_array($materials['items'])
            ? array_values($materials['items'])
            : array();
    }

    protected function save_materials_items(int $config_id, array $materials)
    {
        $meta = $this->get_meta($config_id);
        $additional_options = isset($meta['additionalOptions']) && is_array($meta['additionalOptions'])
            ? $meta['additionalOptions']
            : array();

        $additional_options['materials'] = array(
            'label' => 'Materials',
            'description' => '',
            'items' => array_values($materials),
        );

        $meta['additionalOptions'] = $additional_options;
        return $this->save_raw_meta($config_id, $meta);
    }

    protected function normalize_component(array $component, int $index = 0): array
    {
        $label = isset($component['label']) ? $component['label'] : (isset($component['title']) ? $component['title'] : (isset($component['name']) ? $component['name'] : ''));

        return array(
            'id' => isset($component['id']) && $component['id'] !== '' ? (string) $component['id'] : 'component-' . ($index + 1),
            'label' => $label,
            'title' => isset($component['title']) ? $component['title'] : $label,
            'name' => isset($component['name']) ? $component['name'] : $label,
            'description' => isset($component['description']) ? $component['description'] : '',
            'icon' => isset($component['icon']) ? $component['icon'] : '',
            'options' => isset($component['options']) && is_array($component['options']) ? array_values($component['options']) : array(),
            'isDefault' => isset($component['isDefault']) ? (bool) $component['isDefault'] : $index === 0,
        );
    }

    protected function normalize_components_settings(array $settings = array(), array $section = array()): array
    {
        $defaults = $this->simple_section_default('components');
        $default_settings = isset($defaults['settings']) && is_array($defaults['settings'])
            ? $defaults['settings']
            : array();

        $label = isset($section['label']) && $section['label'] !== ''
            ? (string) $section['label']
            : (isset($settings['label']) && $settings['label'] !== '' ? (string) $settings['label'] : (string) ($default_settings['label'] ?? 'Designs'));
        $description = isset($section['description']) && $section['description'] !== ''
            ? (string) $section['description']
            : (isset($settings['description']) && $settings['description'] !== '' ? (string) $settings['description'] : (string) ($default_settings['description'] ?? 'Choose your design'));

        return array(
            'label' => $label,
            'description' => $description,
            'behavior' => isset($settings['behavior']) && $settings['behavior'] === 'choose-before-customization'
                ? 'choose-before-customization'
                : 'show-options-directly',
            'showTabWhenSingleItem' => isset($settings['showTabWhenSingleItem'])
                ? (bool) $settings['showTabWhenSingleItem']
                : !isset($default_settings['showTabWhenSingleItem']) || (bool) $default_settings['showTabWhenSingleItem'],
        );
    }

    protected function get_components_section(array $required_options): array
    {
        $default = $this->simple_section_default('components');
        $stored = $this->section_value($required_options, 'components', $default);
        $stored = is_array($stored) ? $stored : $default;

        $stored_items = isset($stored['items']) && is_array($stored['items'])
            ? array_values($stored['items'])
            : array();
        $items = array();
        foreach ($stored_items as $index => $component) {
            if (is_array($component)) {
                $items[] = $this->normalize_component($component, $index);
            }
        }
        $settings = $this->normalize_components_settings(
            isset($stored['settings']) && is_array($stored['settings']) ? $stored['settings'] : array(),
            $stored
        );

        return array(
            'label' => isset($stored['label']) && $stored['label'] !== '' ? (string) $stored['label'] : $settings['label'],
            'description' => isset($stored['description']) ? (string) $stored['description'] : $settings['description'],
            'settings' => $settings,
            'items' => $items,
        );
    }

    protected function save_components_section(int $config_id, array $required_options, array $section)
    {
        $items = isset($section['items']) && is_array($section['items'])
            ? array_values($section['items'])
            : array();
        $settings = $this->normalize_components_settings(
            isset($section['settings']) && is_array($section['settings']) ? $section['settings'] : array(),
            $section
        );

        $payload = array(
            'label' => isset($section['label']) && $section['label'] !== '' ? (string) $section['label'] : $settings['label'],
            'description' => isset($section['description']) ? (string) $section['description'] : $settings['description'],
            'settings' => $settings,
            'items' => $items,
        );

        $required_options = $this->set_section_items($required_options, 'components', $payload);
        return $this->save_required_options($config_id, $required_options);
    }

    protected function normalize_component_option(array $option, int $index = 0): array
    {
        $option['isDefault'] = isset($option['isDefault']) ? (bool) $option['isDefault'] : $index === 0;
        return $option;
    }

    protected function component_options_response(int $config_id, array $required_options, $component): array
    {
        return array(
            'componentOptions' => array(
                'manageShapes' => $this->get_normalized_global_icon_items('ascwo_all_shapes'),
                'manageFixingMethods' => $this->get_normalized_global_icon_items('ascwo_all_fixingMethods'),
                'manageBorders' => $this->get_normalized_global_icon_items('ascwo_all_borders'),
                'requiredOptions' => array(
                    'sizes' => isset($required_options['sizes']) && is_array($required_options['sizes']) ? $required_options['sizes'] : array('items' => array()),
                    'colors' => isset($required_options['colors']) && is_array($required_options['colors']) ? $required_options['colors'] : array('items' => array()),
                    'shapes' => isset($required_options['shapes']) && is_array($required_options['shapes']) ? $required_options['shapes'] : array('items' => array()),
                    'fixingMethods' => isset($required_options['fixingMethods']) && is_array($required_options['fixingMethods']) ? $required_options['fixingMethods'] : array('items' => array()),
                    'borders' => isset($required_options['borders']) && is_array($required_options['borders']) ? $required_options['borders'] : array('items' => array()),
                    'lightings' => isset($required_options['lightings']) && is_array($required_options['lightings']) ? $required_options['lightings'] : array('items' => array()),
                    'fonts' => isset($required_options['fonts']) && is_array($required_options['fonts']) ? $required_options['fonts'] : array('items' => array()),
                    'pricings' => isset($required_options['pricings']) && is_array($required_options['pricings']) ? $required_options['pricings'] : array('items' => array()),
                ),
                'component' => $component,
            ),
        );
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
            return rest_ensure_response(array('success' => false, 'message' => __('No Configuration found', 'all-signs-customizer-for-woocommerce-pro')));
        }

        $meta = $this->get_meta($config_id);
        $additional_options = isset($meta['additionalOptions']) && is_array($meta['additionalOptions'])
            ? $meta['additionalOptions']
            : array();
        $materials = array_key_exists('materials', $additional_options) && is_array($additional_options['materials'])
            ? $additional_options['materials']
            : $this->materials_section_default();

        return rest_ensure_response($this->section_response_payload('materials', $materials));
    }

    public function get_materials_material($request)
    {
        $config_id = absint($request->get_param('config_id'));
        $material_id = sanitize_text_field((string) $request->get_param('material_id'));

        if (!$config_id) {
            return rest_ensure_response(array('message' => __('No Configuration found', 'all-signs-customizer-for-woocommerce-pro')));
        }

        $meta = $this->get_meta($config_id);
        $additional_options = isset($meta['additionalOptions']) && is_array($meta['additionalOptions'])
            ? $meta['additionalOptions']
            : array();
        $materials = $this->get_materials_items($additional_options);
        $material_index = $this->find_section_item_index_by_id($materials, $material_id);
        if ($material_index === null) {
            return rest_ensure_response(array('success' => false, 'message' => __('No materials component found', 'all-signs-customizer-for-woocommerce-pro')));
        }

        return rest_ensure_response(array(
            'success' => true,
            'data' => array(
                'material' => $this->normalize_material($materials[$material_index], $material_index, $config_id),
            ),
        ));
    }

    public function create_materials_material($request)
    {
        $config_id = absint($request->get_param('config_id'));
        if (!$config_id) {
            return rest_ensure_response(array('message' => __('No Configuration found', 'all-signs-customizer-for-woocommerce-pro')));
        }

        $meta = $this->get_meta($config_id);
        $additional_options = isset($meta['additionalOptions']) && is_array($meta['additionalOptions'])
            ? $meta['additionalOptions']
            : array();
        $materials = $this->get_materials_items($additional_options);
        $new_material = json_decode($request->get_body(), true);
        $new_material = is_array($new_material) ? $this->normalize_material($new_material, count($materials), $config_id) : array();

        if (empty($materials)) {
            $new_material['isDefault'] = true;
        } elseif (
            !array_reduce($materials, function ($carry, $item) {
                return $carry || !empty($item['isDefault']);
            }, false)
        ) {
            $materials[0]['isDefault'] = true;
        }

        $materials[] = $new_material;
        $update = $this->save_materials_items($config_id, $materials);

        return rest_ensure_response($update === true
            ? array(
                'success' => true,
                'message' => __('Materiel component successfully added', 'all-signs-customizer-for-woocommerce-pro'),
                'data' => array(
                    'materials' => array(
                        'items' => array_values($materials),
                    ),
                ),
            )
            : array('success' => false, 'message' => __('Materiel component has not been added', 'all-signs-customizer-for-woocommerce-pro')));
    }

    public function update_materials_material($request)
    {
        $config_id = absint($request->get_param('config_id'));
        $material_id = sanitize_text_field((string) $request->get_param('material_id'));
        if (!$config_id) {
            return rest_ensure_response(array('message' => __('No Configuration found', 'all-signs-customizer-for-woocommerce-pro')));
        }

        $meta = $this->get_meta($config_id);
        $additional_options = isset($meta['additionalOptions']) && is_array($meta['additionalOptions'])
            ? $meta['additionalOptions']
            : array();
        $materials = $this->get_materials_items($additional_options);
        $material = json_decode($request->get_body(), true);
        $material = is_array($material) ? $this->normalize_material($material, 0, $config_id) : array();

        $material_index = $this->find_section_item_index_by_id($materials, $material_id);
        if ($material_index === null) {
            return rest_ensure_response(array('success' => false, 'message' => __('Materiel component has not been edited', 'all-signs-customizer-for-woocommerce-pro')));
        }

        $old_material = $materials[$material_index];
        if ($old_material === $material) {
            return rest_ensure_response(array('success' => 'same', 'message' => __('No change was observed', 'all-signs-customizer-for-woocommerce-pro')));
        }

        $target_active = isset($material['active']) ? (bool) $material['active'] : true;
        $active_count = 0;
        foreach ($materials as $idx => $existing) {
            if ($idx === $material_index) {
                continue;
            }
            if (!empty($existing['active'])) {
                $active_count++;
            }
        }

        $current_active = isset($old_material['active']) ? (bool) $old_material['active'] : true;
        if ($current_active && !$target_active && $active_count <= 0) {
            return rest_ensure_response(array('success' => false, 'message' => __('At least one material must remain active', 'all-signs-customizer-for-woocommerce-pro')));
        }

        $materials[$material_index] = array_merge($old_material, $material);
        if (!empty($materials[$material_index]['isDefault'])) {
            foreach ($materials as $idx => $existing) {
                if ($idx !== $material_index) {
                    $materials[$idx]['isDefault'] = false;
                }
            }
        }

        $update = $this->save_materials_items($config_id, $materials);

        return rest_ensure_response($update === true
            ? array(
                'success' => true,
                'message' => __('Materiel component successfully edited', 'all-signs-customizer-for-woocommerce-pro'),
                'data' => array(
                    'materials' => array(
                        'items' => array_values($materials),
                    ),
                ),
            )
            : array('success' => false, 'message' => __('Materiel component has not been edited', 'all-signs-customizer-for-woocommerce-pro')));
    }

    public function delete_materials_material($request)
    {
        $config_id = absint($request->get_param('config_id'));
        $material_id = sanitize_text_field((string) $request->get_param('material_id'));
        if (!$config_id) {
            return rest_ensure_response(array('success' => false, 'message' => __('No Configuration found', 'all-signs-customizer-for-woocommerce-pro')));
        }

        $meta = $this->get_meta($config_id);
        $additional_options = isset($meta['additionalOptions']) && is_array($meta['additionalOptions'])
            ? $meta['additionalOptions']
            : array();
        $materials = $this->get_materials_items($additional_options);
        $material_index = $this->find_section_item_index_by_id($materials, $material_id);

        if ($material_index === null) {
            return rest_ensure_response(array('success' => false, 'message' => __('No materials component found', 'all-signs-customizer-for-woocommerce-pro')));
        }

        if (count($materials) <= 1) {
            return rest_ensure_response(array('success' => false, 'message' => __('At least one material must remain', 'all-signs-customizer-for-woocommerce-pro')));
        }

        $target_active = isset($materials[$material_index]['active']) ? (bool) $materials[$material_index]['active'] : true;
        $active_remaining = 0;
        foreach ($materials as $idx => $existing) {
            if ($idx === $material_index) {
                continue;
            }
            if (!empty($existing['active'])) {
                $active_remaining++;
            }
        }
        if ($target_active && $active_remaining < 1) {
            return rest_ensure_response(array('success' => false, 'message' => __('At least one active material must remain', 'all-signs-customizer-for-woocommerce-pro')));
        }

        array_splice($materials, $material_index, 1);
        $update = $this->save_materials_items($config_id, $materials);

        return rest_ensure_response($update === true
            ? array(
                'success' => true,
                'message' => __('Component successfully deleted', 'all-signs-customizer-for-woocommerce-pro'),
                'data' => array(
                    'materials' => array(
                        'items' => array_values($materials),
                    ),
                ),
            )
            : array('success' => false, 'message' => __('Component has not been deleted', 'all-signs-customizer-for-woocommerce-pro')));
    }

    public function get_components($request)
    {
        $config_id = absint($request->get_param('config_id'));
        if (!$config_id) {
            return rest_ensure_response(array('success' => false, 'message' => __('No Configuration found', 'all-signs-customizer-for-woocommerce-pro')));
        }

        $required_options = $this->get_required_options($config_id);
        $components_section = $this->get_components_section($required_options);

        return rest_ensure_response(array(
            'success' => true,
            'data' => array(
                'components' => array_merge($components_section, array(
                    'manageShapes' => $this->get_normalized_global_icon_items('ascwo_all_shapes'),
                    'manageFixingMethods' => $this->get_normalized_global_icon_items('ascwo_all_fixingMethods'),
                )),
            ),
        ));
    }

    public function create_component($request)
    {
        $config_id = absint($request->get_param('config_id'));
        if (!$config_id) {
            return rest_ensure_response(array('success' => false, 'message' => __('No Configuration found', 'all-signs-customizer-for-woocommerce-pro')));
        }

        $required_options = $this->get_required_options($config_id);
        $components_section = $this->get_components_section($required_options);
        $components = $components_section['items'];
        $new_component = json_decode($request->get_body(), true);
        $new_component = is_array($new_component) ? $this->normalize_component($new_component, count($components)) : array();

        if (empty($components)) {
            $new_component['isDefault'] = true;
        } elseif (
            !array_reduce($components, function ($carry, $item) {
                return $carry || !empty($item['isDefault']);
            }, false)
        ) {
            $components[0]['isDefault'] = true;
        }

        $components[] = $new_component;
        $components_section['items'] = $components;
        $update = $this->save_components_section($config_id, $required_options, $components_section);

        return rest_ensure_response($update === true
            ? array(
                'success' => true,
                'message' => __('Component successfully added', 'all-signs-customizer-for-woocommerce-pro'),
                'data' => array(
                    'components' => array_merge($components_section, array(
                        'items' => array_values($components),
                    )),
                ),
            )
            : array('success' => false, 'message' => __('Component has not been added', 'all-signs-customizer-for-woocommerce-pro')));
    }

    public function update_components($request)
    {
        $config_id = absint($request->get_param('config_id'));
        if (!$config_id) {
            return rest_ensure_response(array('success' => false, 'message' => __('No Configuration found', 'all-signs-customizer-for-woocommerce-pro')));
        }

        $required_options = $this->get_required_options($config_id);
        $current_section = $this->get_components_section($required_options);
        $payload = json_decode($request->get_body(), true);
        $next_section = $current_section;

        if (is_array($payload) && $this->is_list_array($payload)) {
            $next_section['items'] = array_values(array_map(array($this, 'normalize_component'), $payload, array_keys(array_values($payload))));
        } elseif (is_array($payload)) {
            $raw_items = isset($payload['items']) && is_array($payload['items']) ? array_values($payload['items']) : array();
            $normalized_items = array();
            foreach ($raw_items as $index => $component) {
                $normalized_items[] = is_array($component) ? $this->normalize_component($component, $index) : array();
            }
            $next_section['items'] = $normalized_items;
            if (array_key_exists('label', $payload)) {
                $next_section['label'] = (string) $payload['label'];
            }
            if (array_key_exists('description', $payload)) {
                $next_section['description'] = (string) $payload['description'];
            }
            if (isset($payload['settings']) && is_array($payload['settings'])) {
                $next_section['settings'] = $this->normalize_components_settings($payload['settings'], $next_section);
            } else {
                $next_section['settings'] = $this->normalize_components_settings(array(), $next_section);
            }
        }

        $next_section['items'] = $this->ensure_single_default_item($next_section['items'], 'isDefault');

        if ($current_section === $next_section) {
            return rest_ensure_response(array('success' => 'same', 'message' => __('No change observed in components', 'all-signs-customizer-for-woocommerce-pro')));
        }

        $update = $this->save_components_section($config_id, $required_options, $next_section);

        return rest_ensure_response($update === true
            ? array(
                'success' => true,
                'message' => __('Components successfully updated', 'all-signs-customizer-for-woocommerce-pro'),
                'data' => array(
                    'components' => $next_section,
                ),
            )
            : array('success' => false, 'message' => __('Components have not been updated', 'all-signs-customizer-for-woocommerce-pro')));
    }

    public function get_component($request)
    {
        $config_id = absint($request->get_param('config_id'));
        $component_id = sanitize_text_field((string) $request->get_param('component_id'));
        $required_options = $this->get_required_options($config_id);
        $components = $this->get_components_section($required_options)['items'];
        $component_index = $this->find_section_item_index_by_id($components, $component_id);
        $component = $component_index !== null ? $components[$component_index] : null;

        if (!$component) {
            return rest_ensure_response(array('success' => false, 'message' => __('No materials component found', 'all-signs-customizer-for-woocommerce-pro')));
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
        $component_id = sanitize_text_field((string) $request->get_param('component_id'));
        $required_options = $this->get_required_options($config_id);
        $components_section = $this->get_components_section($required_options);
        $components = $components_section['items'];
        $component_index = $this->find_section_item_index_by_id($components, $component_id);
        $component = $component_index !== null ? $components[$component_index] : null;

        return rest_ensure_response(array(
            'success' => true,
            'data' => $this->component_options_response($config_id, $required_options, $component),
            'message' => $component ? '' : __('No component found', 'all-signs-customizer-for-woocommerce-pro'),
        ));
    }

    public function update_component($request)
    {
        $config_id = absint($request->get_param('config_id'));
        $component_id = sanitize_text_field((string) $request->get_param('component_id'));
        $required_options = $this->get_required_options($config_id);
        $components_section = $this->get_components_section($required_options);
        $components = $components_section['items'];
        $component = json_decode($request->get_body(), true);
        $component = is_array($component) ? $this->normalize_component($component, 0) : array();

        $component_index = $this->find_section_item_index_by_id($components, $component_id);
        if ($component_index === null) {
            return rest_ensure_response(array('success' => false, 'message' => __('Materiel component has not been edited', 'all-signs-customizer-for-woocommerce-pro')));
        }

        if ($components[$component_index] === $component) {
            return rest_ensure_response(array('success' => 'same', 'message' => __('No change was observed', 'all-signs-customizer-for-woocommerce-pro')));
        }

        $component['id'] = isset($components[$component_index]['id']) ? $components[$component_index]['id'] : $component_id;
        $components[$component_index] = $component;
        $components_section['items'] = $this->ensure_single_default_item($components, 'isDefault');
        $update = $this->save_components_section($config_id, $required_options, $components_section);

        return rest_ensure_response($update === true
            ? array(
                'success' => true,
                'message' => __('Component successfully edited', 'all-signs-customizer-for-woocommerce-pro'),
                'data' => array(
                    'components' => $components_section,
                ),
            )
            : array('success' => false, 'message' => __('Component has not been edited', 'all-signs-customizer-for-woocommerce-pro')));
    }

    public function delete_component($request)
    {
        $config_id = absint($request->get_param('config_id'));
        $component_id = sanitize_text_field((string) $request->get_param('component_id'));
        $required_options = $this->get_required_options($config_id);
        $components_section = $this->get_components_section($required_options);
        $components = $components_section['items'];

        $component_index = $this->find_section_item_index_by_id($components, $component_id);
        if ($component_index === null) {
            return rest_ensure_response(array('success' => false, 'message' => __('No materials component found', 'all-signs-customizer-for-woocommerce-pro')));
        }

        array_splice($components, $component_index, 1);
        $components_section['items'] = $this->ensure_single_default_item($components, 'isDefault');
        $update = $this->save_components_section($config_id, $required_options, $components_section);

        return rest_ensure_response($update === true
            ? array(
                'success' => true,
                'message' => __('Component successfully deleted', 'all-signs-customizer-for-woocommerce-pro'),
                'data' => array(
                    'components' => $components_section,
                ),
            )
            : array('success' => false, 'message' => __('Component has not been deleted', 'all-signs-customizer-for-woocommerce-pro')));
    }

    public function create_option($request)
    {
        $config_id = absint($request->get_param('config_id'));
        $component_id = sanitize_text_field((string) $request->get_param('component_id'));
        $required_options = $this->get_required_options($config_id);
        $components_section = $this->get_components_section($required_options);
        $components = $components_section['items'];
        $option = json_decode($request->get_body(), true);
        $option = is_array($option) ? $this->normalize_component_option($option, 0) : array();

        $component_index = $this->find_section_item_index_by_id($components, $component_id);
        if ($component_index === null) {
            return rest_ensure_response(array('success' => false, 'message' => __('No materials component found', 'all-signs-customizer-for-woocommerce-pro')));
        }

        if (!isset($components[$component_index]['options']) || !is_array($components[$component_index]['options'])) {
            $components[$component_index]['options'] = array();
        }

        if (empty($components[$component_index]['options'])) {
            $option['isDefault'] = true;
        } elseif (
            !array_reduce($components[$component_index]['options'], function ($carry, $item) {
                return $carry || !empty($item['isDefault']);
            }, false)
        ) {
            $components[$component_index]['options'][0]['isDefault'] = true;
        }

        $components[$component_index]['options'][] = $option;
        $components_section['items'] = $components;
        $update = $this->save_components_section($config_id, $required_options, $components_section);

        return rest_ensure_response($update === true
            ? array(
                'success' => true,
                'message' => __('Component option successfully added', 'all-signs-customizer-for-woocommerce-pro'),
                'data' => $this->component_options_response($config_id, $required_options, $components[$component_index]),
            )
            : array('success' => false, 'message' => __('Component option has not been added', 'all-signs-customizer-for-woocommerce-pro')));
    }

    public function get_option($request)
    {
        $config_id = absint($request->get_param('config_id'));
        $component_id = sanitize_text_field((string) $request->get_param('component_id'));
        $option_id = sanitize_text_field((string) $request->get_param('option_id'));
        $required_options = $this->get_required_options($config_id);
        $components = $this->get_components_section($required_options)['items'];
        $component_index = $this->find_section_item_index_by_id($components, $component_id);

        if ($component_index === null || !isset($components[$component_index]['options'])) {
            return rest_ensure_response(array('message' => __('No materials component found', 'all-signs-customizer-for-woocommerce-pro')));
        }

        $option_index = $this->find_section_item_index_by_id($components[$component_index]['options'], $option_id);
        if ($option_index === null) {
            return rest_ensure_response(array('message' => __('No materials component found', 'all-signs-customizer-for-woocommerce-pro')));
        }

        return rest_ensure_response(array(
            'success' => true,
            'data' => array(
                'option' => $components[$component_index]['options'][$option_index],
            ),
        ));
    }

    public function update_option($request)
    {
        $config_id = absint($request->get_param('config_id'));
        $component_id = sanitize_text_field((string) $request->get_param('component_id'));
        $option_id = sanitize_text_field((string) $request->get_param('option_id'));
        $required_options = $this->get_required_options($config_id);
        $components_section = $this->get_components_section($required_options);
        $components = $components_section['items'];
        $option = json_decode($request->get_body(), true);
        $option = is_array($option) ? $this->normalize_component_option($option, 0) : array();

        $component_index = $this->find_section_item_index_by_id($components, $component_id);
        if ($component_index === null) {
            return rest_ensure_response(array('success' => false, 'message' => __('Materiel component option has not been edited', 'all-signs-customizer-for-woocommerce-pro')));
        }

        $option_index = $this->find_section_item_index_by_id($components[$component_index]['options'] ?? array(), $option_id);
        if ($option_index === null) {
            return rest_ensure_response(array('success' => false, 'message' => __('Materiel component option has not been edited', 'all-signs-customizer-for-woocommerce-pro')));
        }

        if ($components[$component_index]['options'][$option_index] === $option) {
            return rest_ensure_response(array('success' => 'same', 'message' => __('No change was observed', 'all-signs-customizer-for-woocommerce-pro')));
        }

        $option['id'] = isset($components[$component_index]['options'][$option_index]['id']) ? $components[$component_index]['options'][$option_index]['id'] : $option_id;
        $components[$component_index]['options'][$option_index] = $option;
        $components_section['items'] = $components;
        $update = $this->save_components_section($config_id, $required_options, $components_section);

        return rest_ensure_response($update === true
            ? array(
                'success' => true,
                'message' => __('Component option successfully edited', 'all-signs-customizer-for-woocommerce-pro'),
                'data' => $this->component_options_response($config_id, $required_options, $components[$component_index]),
            )
            : array('success' => false, 'message' => __('Component option has not been edited', 'all-signs-customizer-for-woocommerce-pro')));
    }

    public function delete_option($request)
    {
        $config_id = absint($request->get_param('config_id'));
        $component_id = sanitize_text_field((string) $request->get_param('component_id'));
        $option_id = sanitize_text_field((string) $request->get_param('option_id'));
        $required_options = $this->get_required_options($config_id);
        $components_section = $this->get_components_section($required_options);
        $components = $components_section['items'];
        $component_index = $this->find_section_item_index_by_id($components, $component_id);

        if ($component_index === null || !isset($components[$component_index]['options'])) {
            return rest_ensure_response(array('success' => false, 'message' => __('No materials component found', 'all-signs-customizer-for-woocommerce-pro')));
        }

        $option_index = $this->find_section_item_index_by_id($components[$component_index]['options'], $option_id);
        if ($option_index === null) {
            return rest_ensure_response(array('success' => false, 'message' => __('No materials component found', 'all-signs-customizer-for-woocommerce-pro')));
        }

        array_splice($components[$component_index]['options'], $option_index, 1);
        $components_section['items'] = $components;
        $update = $this->save_components_section($config_id, $required_options, $components_section);

        return rest_ensure_response($update === true
            ? array(
                'success' => true,
                'message' => __('Material Component option successfully deleted', 'all-signs-customizer-for-woocommerce-pro'),
                'data' => $this->component_options_response($config_id, $required_options, $components[$component_index]),
            )
            : array('success' => false, 'message' => __('Material Component option has not been deleted', 'all-signs-customizer-for-woocommerce-pro')));
    }

    // ===== Stable ID generation =====

    protected function get_manage_fixing_methods(): array
    {
        $fixingMethods = get_option('ascwo_all_fixingMethods', array());
        if (!is_array($fixingMethods)) {
            return array();
        }

        $normalized = array();
        foreach (array_values($fixingMethods) as $method) {
            if (!is_array($method)) {
                continue;
            }

            if (!isset($method['id']) || $method['id'] === '') {
                $method['id'] = $this->normalize_fixing_method_manage_id(!empty($method['type'])
                    ? (string) $method['type']
                    : (string) ($method['name'] ?? 'fixing-method'));
            }

            $normalized[] = $method;
        }

        return $normalized;
    }

    protected function find_manage_fixing_method(array $fixing_method, array $manage_fixing_methods): ?array
    {
        $keys = array_filter(array_map(function ($value) {
            return $this->slugify($value, '');
        }, array(
            $fixing_method['fixingMethodId'] ?? '',
            $fixing_method['id'] ?? '',
            $fixing_method['type'] ?? '',
            $fixing_method['label'] ?? '',
            $fixing_method['name'] ?? '',
        )));

        foreach ($manage_fixing_methods as $method) {
            if (!is_array($method)) {
                continue;
            }

            $managed_keys = array_filter(array_map(function ($value) {
                return $this->slugify($value, '');
            }, array(
                $method['id'] ?? '',
                $method['value'] ?? '',
                $method['type'] ?? '',
                $method['label'] ?? '',
                $method['name'] ?? '',
            )));

            if (array_intersect($keys, $managed_keys)) {
                return $method;
            }
        }

        return null;
    }

    protected function normalize_required_fixing_method_item(array $fixing_method, array $manage_fixing_methods = array()): array
    {
        $manage_fixing_methods = !empty($manage_fixing_methods) ? $manage_fixing_methods : $this->get_manage_fixing_methods();
        $managed = $this->find_manage_fixing_method($fixing_method, $manage_fixing_methods);

        if (!is_array($managed)) {
            return $fixing_method;
        }

        $label = (string) ($managed['name'] ?? $managed['label'] ?? $fixing_method['label'] ?? '');
        $preview = (string) ($managed['icon'] ?? $managed['previewImg'] ?? $managed['url'] ?? $managed['image'] ?? '');

        $fixing_method['fixingMethodId'] = (string) ($managed['id'] ?? $fixing_method['fixingMethodId'] ?? '');
        $fixing_method['label'] = !empty($fixing_method['label']) ? (string) $fixing_method['label'] : $label;
        $fixing_method['name'] = !empty($fixing_method['name']) ? (string) $fixing_method['name'] : $label;
        $fixing_method['description'] = !empty($fixing_method['description']) ? (string) $fixing_method['description'] : (string) ($managed['description'] ?? '');
        $fixing_method['type'] = !empty($fixing_method['type']) ? (string) $fixing_method['type'] : (string) ($managed['type'] ?? $managed['value'] ?? '');

        if ($preview !== '') {
            $fixing_method['icon'] = (string) ($fixing_method['icon'] ?? $preview);
            $fixing_method['previewImg'] = (string) ($fixing_method['previewImg'] ?? $preview);
        }

        return $fixing_method;
    }

    protected function ensure_unique_item_id(array $items, string $base_id): string
    {
        $base_id = $this->slugify($base_id, 'item');
        $candidate = $base_id;
        $index = 2;

        while ($this->find_section_item_index_by_id($items, $candidate, array('id')) !== null) {
            $candidate = $base_id . '-' . $index;
            $index++;
        }

        return $candidate;
    }

    protected function slugify($value, $fallback = 'item'): string
    {
        $value = is_string($value) || is_numeric($value) ? (string) $value : '';
        $value = trim($value);
        $value = mb_strtolower($value, 'UTF-8');
        $value = preg_replace('/[^a-z0-9]+/u', '-', $value);
        $value = trim($value, '-');

        return $value !== '' ? $value : $fallback;
    }

    protected function normalize_fixing_method_manage_id($value): string
    {
        $slug = $this->slugify($value, 'fixing-method');
        return strpos($slug, 'fixing-') === 0 ? $slug : 'fixing-' . $slug;
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
        if (is_string($methodId) && strpos($methodId, 'fixing-') === 0) {
            return $this->slugify($methodId, 'fixing-method');
        }

        return $this->normalize_fixing_method_manage_id($methodId ?: $name ?: 'method');
    }

    protected function generate_shape_id(array $shape): string
    {
        $shapeId = isset($shape['shapeId']) ? $shape['shapeId'] : '';
        $name = isset($shape['name']) ? (string) $shape['name'] : '';

        return 'shape-' . $this->slugify($shapeId ?: $name ?: 'shape', 'shape');
    }

    protected function generate_border_id(array $border): string
    {
        $borderId = isset($border['borderId']) ? $border['borderId'] : (isset($border['id']) ? $border['id'] : '');
        $name = isset($border['name']) ? (string) $border['name'] : '';

        return $this->slugify($borderId ?: $name ?: 'border', 'border');
    }

    protected function generate_font_id(array $font, int $index): string
    {
        $label = isset($font['label']) ? (string) $font['label'] : '';
        $fontId = isset($font['managedFontId']) ? $font['managedFontId'] : '';

        return 'font-' . $this->slugify($label ?: $fontId ?: "f-{$index}", "f-{$index}");
    }

    protected function generate_lighting_id(array $lighting): string
    {
        $label = isset($lighting['label']) ? (string) $lighting['label'] : '';
        $hex = isset($lighting['hexCode']) ? (string) $lighting['hexCode'] : '';

        return 'lighting-' . $this->slugify($label ?: $hex ?: 'lighting', 'lighting');
    }

    protected function generate_additional_input_id(array $option): string
    {
        $title = isset($option['title']) ? (string) $option['title'] : '';
        $name = isset($option['name']) ? (string) $option['name'] : '';

        return 'additional-input-' . $this->slugify($title ?: $name ?: 'input', 'input');
    }

    public function permissions_check($request)
    {
        return current_user_can('manage_options');
    }

    public function get_collection_params()
    {
        return array();
    }
}
