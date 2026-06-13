<?php
namespace ASCWO\Api\Admin\Required_Options;

use WP_REST_Server;

class ASCWO_Api_Required_Options_Sizes extends ASCWO_Api_Required_Options_Base
{
    public function register_routes()
    {
        $config_route = $this->rest_base . '/(?P<config_id>\d+)/required-options';

        register_rest_route(
            $this->namespace,
            $config_route . '/sizes',
            array(
                array(
                    'methods' => WP_REST_Server::READABLE,
                    'callback' => array($this, 'get_sizes'),
                    'permission_callback' => array($this, 'permissions_check'),
                    'args' => array(
                        'config_id' => array(
                            'type' => 'integer',
                            'required' => true,
                        ),
                    ),
                ),
                array(
                    'methods' => WP_REST_Server::EDITABLE,
                    'callback' => array($this, 'update_sizes'),
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
            $config_route . '/sizes/items',
            array(
                array(
                    'methods' => WP_REST_Server::CREATABLE,
                    'callback' => array($this, 'add_size_item'),
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
            $config_route . '/sizes/items/(?P<item_id>\d+)',
            array(
                array(
                    'methods' => WP_REST_Server::READABLE,
                    'callback' => array($this, 'get_size_item'),
                    'permission_callback' => array($this, 'permissions_check'),
                    'args' => array(
                        'config_id' => array(
                            'type' => 'integer',
                            'required' => true,
                        ),
                        'item_id' => array(
                            'type' => 'integer',
                            'required' => true,
                        ),
                    ),
                ),
                array(
                    'methods' => WP_REST_Server::EDITABLE,
                    'callback' => array($this, 'update_size_item'),
                    'permission_callback' => array($this, 'permissions_check'),
                    'args' => array(
                        'config_id' => array(
                            'type' => 'integer',
                            'required' => true,
                        ),
                        'item_id' => array(
                            'type' => 'integer',
                            'required' => true,
                        ),
                    ),
                ),
                array(
                    'methods' => WP_REST_Server::DELETABLE,
                    'callback' => array($this, 'delete_size_item'),
                    'permission_callback' => array($this, 'permissions_check'),
                    'args' => array(
                        'config_id' => array(
                            'type' => 'integer',
                            'required' => true,
                        ),
                        'item_id' => array(
                            'type' => 'integer',
                            'required' => true,
                        ),
                    ),
                ),
            )
        );

        register_rest_route(
            $this->namespace,
            $config_route . '/sizes/items/(?P<item_id>\d+)/default',
            array(
                array(
                    'methods' => WP_REST_Server::EDITABLE,
                    'callback' => array($this, 'set_default_size_item'),
                    'permission_callback' => array($this, 'permissions_check'),
                    'args' => array(
                        'config_id' => array(
                            'type' => 'integer',
                            'required' => true,
                        ),
                        'item_id' => array(
                            'type' => 'integer',
                            'required' => true,
                        ),
                    ),
                ),
            )
        );
    }

    public function get_sizes($request)
    {
        $config_id = absint($request->get_param('config_id'));
        if (!$config_id) {
            return rest_ensure_response(array('success' => false, 'message' => __('No Configuration found', 'all-signs-customizer-for-woocommerce-pro')));
        }

        $required_options = $this->get_required_options($config_id);
        $value = $this->get_section_items($required_options, 'sizes');

        return rest_ensure_response($this->sizes_response($config_id, $value));
    }

    public function update_sizes($request)
    {
        $config_id = absint($request->get_param('config_id'));
        if (!$config_id) {
            return rest_ensure_response(array('success' => false, 'message' => __('No Configuration found', 'all-signs-customizer-for-woocommerce-pro')));
        }

        $payload = json_decode($request->get_body(), true);
        $payload = is_array($payload) ? $payload : array();
        $settings = isset($payload['settings']) && is_array($payload['settings']) ? $payload['settings'] : array();

        if (isset($settings['title'])) {
            $payload['label'] = (string) $settings['title'];
        } elseif (!isset($payload['label'])) {
            $payload['label'] = 'Sizes';
        }

        if (isset($settings['description'])) {
            $payload['description'] = (string) $settings['description'];
        } elseif (!isset($payload['description'])) {
            $payload['description'] = '';
        }

        unset($payload['settings']);

        return $this->update_section_payload($config_id, 'sizes', $payload);
    }

    private function normalize_size_item(array $item, int $index = 0, int $config_id = 0): array
    {
        $productType = '';
        if ($config_id > 0) {
            $meta = $this->get_normalized_meta($config_id);
            $productType = isset($meta['productType']) ? (string) $meta['productType'] : '';
        }

        return array(
            'id' => $this->generate_size_id($item, $productType),
            'isDefault' => isset($item['isDefault']) ? (bool) $item['isDefault'] : $index === 0,
            'label' => isset($item['label']) ? (string) $item['label'] : '',
            'width' => isset($item['width']) ? $item['width'] : 0,
            'height' => isset($item['height']) ? $item['height'] : 0,
            'startPriceAtChar' => isset($item['startPriceAtChar']) ? $item['startPriceAtChar'] : 1,
            'textNumber' => isset($item['textNumber']) ? $item['textNumber'] : 0,
            'maxTextChar' => isset($item['maxTextChar']) ? $item['maxTextChar'] : -1,
            'minCharText' => isset($item['minCharText']) ? $item['minCharText'] : 0,
            'charPrice' => isset($item['charPrice']) ? $item['charPrice'] : 0,
            'basePrice' => isset($item['basePrice']) ? $item['basePrice'] : 0,
        );
    }

    private function size_items_match(array $actual, array $expected): bool
    {
        $normalized_actual = array();
        foreach (array_values($actual) as $index => $item) {
            $normalized_actual[] = $this->normalize_size_item(is_array($item) ? $item : array(), $index);
        }

        $normalized_expected = array();
        foreach (array_values($expected) as $index => $item) {
            $normalized_expected[] = $this->normalize_size_item(is_array($item) ? $item : array(), $index);
        }

        return json_encode($normalized_actual) === json_encode($normalized_expected);
    }

    public function get_size_item($request)
    {
        $config_id = absint($request->get_param('config_id'));
        $item_id = absint($request->get_param('item_id'));
        if (!$config_id) {
            return rest_ensure_response(array('success' => false, 'message' => __('No Configuration found', 'all-signs-customizer-for-woocommerce-pro')));
        }

        $required_options = $this->get_required_options($config_id);
        $sizes = $this->section_item_list($required_options, 'sizes');

        if (!isset($sizes[$item_id])) {
            return rest_ensure_response(array('success' => false, 'message' => __('Size not found', 'all-signs-customizer-for-woocommerce-pro')));
        }

        return rest_ensure_response(array(
            'success' => true,
            'data' => array(
                'size' => $this->normalize_size_item($sizes[$item_id], $item_id, $config_id),
            ),
        ));
    }

    public function add_size_item($request)
    {
        $config_id = absint($request->get_param('config_id'));
        if (!$config_id) {
            return rest_ensure_response(array('success' => false, 'message' => __('No Configuration found', 'all-signs-customizer-for-woocommerce-pro')));
        }

        $payload = json_decode($request->get_body(), true);
        $payload = is_array($payload) ? $payload : array();

        $required_options = $this->get_required_options($config_id);
        $sizes_section = $this->section_value($required_options, 'sizes', $this->simple_section_default('sizes'));
        $sizes = $this->section_item_list($required_options, 'sizes');
        $sizes[] = $this->normalize_size_item($payload, count($sizes), $config_id);
        $sizes = $this->ensure_single_default_item($sizes);
        $sizes_section = $this->section_value_with_items($required_options, 'sizes', $sizes);
        $required_options = $this->set_section_items($required_options, 'sizes', $sizes_section);

        $saved = $this->save_required_options($config_id, $required_options);

        return rest_ensure_response($saved === true
            ? array(
                'success' => true,
                'message' => __('Size successfully added', 'all-signs-customizer-for-woocommerce-pro'),
                'data' => array('size' => end($sizes)),
            )
            : array('success' => false, 'message' => __('Size has not been added', 'all-signs-customizer-for-woocommerce-pro')));
    }

    public function update_size_item($request)
    {
        $config_id = absint($request->get_param('config_id'));
        $item_id = absint($request->get_param('item_id'));
        if (!$config_id) {
            return rest_ensure_response(array('success' => false, 'message' => __('No Configuration found', 'all-signs-customizer-for-woocommerce-pro')));
        }

        $payload = json_decode($request->get_body(), true);
        $payload = is_array($payload) ? $this->normalize_size_item($payload, $item_id, $config_id) : array();

        $required_options = $this->get_required_options($config_id);
        $sizes = $this->section_item_list($required_options, 'sizes');
        if (!isset($sizes[$item_id])) {
            return rest_ensure_response(array('success' => false, 'message' => __('Size not found', 'all-signs-customizer-for-woocommerce-pro')));
        }

        if ($sizes[$item_id] === $payload) {
            return rest_ensure_response(array('success' => 'same', 'message' => __('No change was observed', 'all-signs-customizer-for-woocommerce-pro')));
        }

        $sizes[$item_id] = $payload;
        $sizes = $this->ensure_single_default_item($sizes);
        $required_options = $this->set_section_items($required_options, 'sizes', $this->section_value_with_items($required_options, 'sizes', $sizes));
        $saved = $this->save_required_options($config_id, $required_options);

        return rest_ensure_response($saved === true
            ? array(
                'success' => true,
                'message' => __('Size successfully edited', 'all-signs-customizer-for-woocommerce-pro'),
                'data' => array('size' => $sizes[$item_id]),
            )
            : array('success' => false, 'message' => __('Size has not been edited', 'all-signs-customizer-for-woocommerce-pro')));
    }

    public function delete_size_item($request)
    {
        $config_id = absint($request->get_param('config_id'));
        $item_id = absint($request->get_param('item_id'));
        if (!$config_id) {
            return rest_ensure_response(array('success' => false, 'message' => __('No Configuration found', 'all-signs-customizer-for-woocommerce-pro')));
        }

        $required_options = $this->get_required_options($config_id);
        $sizes = $this->section_item_list($required_options, 'sizes');
        if (!isset($sizes[$item_id])) {
            return rest_ensure_response(array('success' => false, 'message' => __('Size not found', 'all-signs-customizer-for-woocommerce-pro')));
        }

        array_splice($sizes, $item_id, 1);
        $sizes = $this->ensure_single_default_item($sizes);
        $required_options = $this->set_section_items($required_options, 'sizes', $this->section_value_with_items($required_options, 'sizes', $sizes));
        $saved = $this->save_required_options($config_id, $required_options);

        return rest_ensure_response($saved === true
            ? array(
                'success' => true,
                'message' => __('Size successfully deleted', 'all-signs-customizer-for-woocommerce-pro'),
                'data' => array('items' => array_values($sizes)),
            )
            : array('success' => false, 'message' => __('Size has not been deleted', 'all-signs-customizer-for-woocommerce-pro')));
    }

    public function set_default_size_item($request)
    {
        $config_id = absint($request->get_param('config_id'));
        $item_id = absint($request->get_param('item_id'));
        if (!$config_id) {
            return rest_ensure_response(array('success' => false, 'message' => __('No Configuration found', 'all-signs-customizer-for-woocommerce-pro')));
        }

        $required_options = $this->get_required_options($config_id);
        $sizes = $this->section_item_list($required_options, 'sizes');
        if (!isset($sizes[$item_id])) {
            return rest_ensure_response(array('success' => false, 'message' => __('Size not found', 'all-signs-customizer-for-woocommerce-pro')));
        }

        foreach ($sizes as $index => $size) {
            $sizes[$index]['isDefault'] = $index === $item_id;
        }

        $required_options = $this->set_section_items($required_options, 'sizes', $this->section_value_with_items($required_options, 'sizes', $sizes));
        $saved = $this->save_required_options($config_id, $required_options);

        return rest_ensure_response($saved === true
            ? array(
                'success' => true,
                'message' => __('Default size successfully updated', 'all-signs-customizer-for-woocommerce-pro'),
                'data' => array('size' => $sizes[$item_id]),
            )
            : array('success' => false, 'message' => __('Size has not been edited', 'all-signs-customizer-for-woocommerce-pro')));
    }
}
