<?php
namespace ASOWP\Api\Admin\Required_Options;

use WP_REST_Server;

class ASOWP_Api_Required_Options_Pricings extends ASOWP_Api_Required_Options_Base
{
    public function register_routes()
    {
        $config_route = $this->rest_base . '/(?P<config_id>\d+)/required-options';

        register_rest_route(
            $this->namespace,
            $config_route . '/pricings',
            array(
                array(
                    'methods' => WP_REST_Server::READABLE,
                    'callback' => array($this, 'get_pricing'),
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
                    'callback' => array($this, 'update_pricing'),
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
            $config_route . '/pricings/items',
            array(
                array(
                    'methods' => WP_REST_Server::CREATABLE,
                    'callback' => array($this, 'add_pricing_item'),
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
            $config_route . '/pricings/items/(?P<item_id>\d+)',
            array(
                array(
                    'methods' => WP_REST_Server::READABLE,
                    'callback' => array($this, 'get_pricing_item'),
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
                    'callback' => array($this, 'update_pricing_item'),
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
                    'callback' => array($this, 'delete_pricing_item'),
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

    private function pricing_section_default(): array
    {
        return array(
            'mode' => '',
            'label' => 'Pricing',
            'description' => '',
            'priceOptions' => array(),
        );
    }

    private function normalize_pricing_item(array $item, int $index = 0): array
    {
        $id = isset($item['id']) && $item['id'] !== '' ? (string) $item['id'] : 'pricing-' . ($index + 1);
        $custom_pricing = isset($item['customPricing']) && is_array($item['customPricing']) ? $item['customPricing'] : array();
        $range = array();
        if (isset($custom_pricing['range']) && is_array($custom_pricing['range'])) {
            foreach (array_values($custom_pricing['range']) as $range_item) {
                $range_item = is_array($range_item) ? $range_item : array();
                $range[] = array(
                    'length' => isset($range_item['length']) ? $range_item['length'] : 0,
                    'surface' => isset($range_item['surface']) ? $range_item['surface'] : (isset($range_item['size']) ? $range_item['size'] : 0),
                    'basePrice' => isset($range_item['basePrice']) ? $range_item['basePrice'] : 0,
                    'charPrice' => isset($range_item['charPrice']) ? $range_item['charPrice'] : 0,
                    'shippingPrice' => isset($range_item['shippingPrice']) ? $range_item['shippingPrice'] : 0,
                    'widthModifier' => isset($range_item['widthModifier']) ? $range_item['widthModifier'] : 0,
                    'heightModifier' => isset($range_item['heightModifier']) ? $range_item['heightModifier'] : 0,
                );
            }
        }

        $type = isset($custom_pricing['type']) && in_array($custom_pricing['type'], array('unit', 'range'), true)
            ? $custom_pricing['type']
            : (!empty($range) ? 'range' : 'unit');

        return array(
            'id' => $id,
            'label' => isset($item['label']) ? (string) $item['label'] : '',
            'customPricing' => array(
                'type' => $type,
                'unit' => isset($custom_pricing['unit']) && is_array($custom_pricing['unit']) ? $custom_pricing['unit'] : array('surface' => 0, 'basePrice' => 0, 'charPrice' => 0),
                'range' => $range,
                'shippingMethod' => isset($custom_pricing['shippingMethod']) && $custom_pricing['shippingMethod'] === 'per-weight' ? 'per-weight' : 'per-surface',
                'divisorVolumetric' => isset($custom_pricing['divisorVolumetric']) ? $custom_pricing['divisorVolumetric'] : 5000,
                'rangePricingPerUnit' => !empty($custom_pricing['rangePricingPerUnit']),
            ),
        );
    }

    private function get_pricing_items(array $required_options): array
    {
        $pricing = $this->section_value($required_options, 'pricing', $this->pricing_section_default());
        if (is_array($pricing) && isset($pricing['priceOptions']) && is_array($pricing['priceOptions'])) {
            $items = array_values($pricing['priceOptions']);
        } else {
            $items = array();
        }
        $normalized = array();

        foreach ($items as $index => $item) {
            $normalized[] = $this->normalize_pricing_item(is_array($item) ? $item : array(), $index);
        }

        return $normalized;
    }

    private function find_pricing_item_index(array $items, int $item_id): ?int
    {
        return isset($items[$item_id]) ? $item_id : null;
    }

    private function save_pricing_items(int $config_id, array $items)
    {
        $required_options = $this->get_required_options($config_id);
        $normalized_items = array();

        foreach (array_values($items) as $index => $item) {
            $normalized_items[] = $this->normalize_pricing_item(is_array($item) ? $item : array(), $index);
        }

        $pricing = $this->section_value($required_options, 'pricing', $this->pricing_section_default());
        if (!is_array($pricing)) {
            $pricing = $this->pricing_section_default();
        }
        $pricing['priceOptions'] = $normalized_items;
        unset($pricing['items']);
        $required_options['pricing'] = $pricing;
        unset($required_options['pricings']);

        return $this->save_required_options($config_id, $required_options);
    }

    private function pricing_items_match(array $actual, array $expected): bool
    {
        return $this->section_items_match($actual, $expected);
    }

    public function get_pricing($request)
    {
        $config_id = absint($request->get_param('config_id'));
        if (!$config_id) {
            return rest_ensure_response(array('success' => false, 'message' => __('No Configuration found', 'all-signs-options-pro')));
        }

        $required_options = $this->get_required_options($config_id);
        $value = $this->section_value($required_options, 'pricing', $this->pricing_section_default());
        if (is_array($value)) {
            $value['priceOptions'] = $this->get_pricing_items($required_options);
            unset($value['items']);
        }

        return rest_ensure_response($this->section_response_payload('pricing', $value));
    }

    public function update_pricing($request)
    {
        $config_id = absint($request->get_param('config_id'));
        if (!$config_id) {
            return rest_ensure_response(array('success' => false, 'message' => __('No Configuration found', 'all-signs-options-pro')));
        }

        $payload = json_decode($request->get_body(), true);
        $payload = is_array($payload) ? $payload : array();
        $items = isset($payload['priceOptions']) && is_array($payload['priceOptions'])
            ? $payload['priceOptions']
            : array();

        $pricing = array_merge($this->pricing_section_default(), $payload);
        $pricing['priceOptions'] = array();
        foreach (array_values($items) as $index => $item) {
            $pricing['priceOptions'][] = $this->normalize_pricing_item(is_array($item) ? $item : array(), $index);
        }
        unset($pricing['items']);

        $required_options = $this->get_required_options($config_id);
        $required_options['pricing'] = $pricing;
        unset($required_options['pricings']);
        $saved = $this->save_required_options($config_id, $required_options);

        return rest_ensure_response($saved === true
            ? array('success' => true, 'message' => __('Pricing successfully saved', 'all-signs-options-pro'), 'data' => array('pricing' => $pricing))
            : array('success' => false, 'message' => __('Pricing has not been saved', 'all-signs-options-pro')));
    }

    public function get_pricing_item($request)
    {
        $config_id = absint($request->get_param('config_id'));
        $item_id = absint($request->get_param('item_id'));
        if (!$config_id) {
            return rest_ensure_response(array('success' => false, 'message' => __('No Configuration found', 'all-signs-options-pro')));
        }

        $required_options = $this->get_required_options($config_id);
        $items = $this->get_pricing_items($required_options);
        $found_index = $this->find_pricing_item_index($items, $item_id);
        if ($found_index !== null) {
            return rest_ensure_response(array('success' => true, 'data' => array('pricing' => $items[$found_index])));
        }

        return rest_ensure_response(array('success' => false, 'message' => __('Pricing not found', 'all-signs-options-pro')));
    }

    public function add_pricing_item($request)
    {
        $config_id = absint($request->get_param('config_id'));
        if (!$config_id) {
            return rest_ensure_response(array('success' => false, 'message' => __('No Configuration found', 'all-signs-options-pro')));
        }

        $payload = json_decode($request->get_body(), true);
        $payload = is_array($payload) ? $payload : array();

        $required_options = $this->get_required_options($config_id);
        $items = $this->get_pricing_items($required_options);
        $items[] = $this->normalize_pricing_item($payload, count($items));
        $saved = $this->save_pricing_items($config_id, $items);

        return rest_ensure_response($saved === true
            ? array('success' => true, 'message' => __('Pricing successfully added', 'all-signs-options-pro'), 'data' => array('pricing' => end($items)))
            : array('success' => false, 'message' => __('Pricing has not been added', 'all-signs-options-pro')));
    }

    public function update_pricing_item($request)
    {
        $config_id = absint($request->get_param('config_id'));
        $item_id = absint($request->get_param('item_id'));
        if (!$config_id) {
            return rest_ensure_response(array('success' => false, 'message' => __('No Configuration found', 'all-signs-options-pro')));
        }

        $payload = json_decode($request->get_body(), true);
        $payload = is_array($payload) ? $payload : array();

        $required_options = $this->get_required_options($config_id);
        $items = $this->get_pricing_items($required_options);
        $updated_index = $this->find_pricing_item_index($items, $item_id);

        if ($updated_index === null) {
            return rest_ensure_response(array('success' => false, 'message' => __('Pricing not found', 'all-signs-options-pro')));
        }

        $payload['id'] = isset($items[$updated_index]['id']) ? $items[$updated_index]['id'] : 'pricing-' . ($updated_index + 1);
        $items[$updated_index] = $this->normalize_pricing_item($payload, $updated_index);
        $saved = $this->save_pricing_items($config_id, $items);
        return rest_ensure_response($saved === true
            ? array('success' => true, 'message' => __('Pricing successfully edited', 'all-signs-options-pro'), 'data' => array('pricing' => $items[$updated_index]))
            : array('success' => false, 'message' => __('Pricing has not been edited', 'all-signs-options-pro')));
    }

    public function delete_pricing_item($request)
    {
        $config_id = absint($request->get_param('config_id'));
        $item_id = absint($request->get_param('item_id'));
        if (!$config_id) {
            return rest_ensure_response(array('success' => false, 'message' => __('No Configuration found', 'all-signs-options-pro')));
        }

        $required_options = $this->get_required_options($config_id);
        $items = $this->get_pricing_items($required_options);
        $found_index = $this->find_pricing_item_index($items, $item_id);
        if ($found_index === null) {
            return rest_ensure_response(array('success' => false, 'message' => __('Pricing not found', 'all-signs-options-pro')));
        }

        array_splice($items, $found_index, 1);
        $saved = $this->save_pricing_items($config_id, $items);
        return rest_ensure_response($saved === true
            ? array('success' => true, 'message' => __('Pricing successfully deleted', 'all-signs-options-pro'), 'data' => array('items' => array_values($items)))
            : array('success' => false, 'message' => __('Pricing has not been deleted', 'all-signs-options-pro')));
    }
}
