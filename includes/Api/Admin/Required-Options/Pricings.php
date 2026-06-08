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
            $config_route . '/pricings/items/(?P<item_id>[^/]+)',
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
                            'type' => 'string',
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
                            'type' => 'string',
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
                            'type' => 'string',
                            'required' => true,
                        ),
                    ),
                ),
            )
        );
    }

    private function normalize_pricing_item(array $item, int $index = 0): array
    {
        $id = isset($item['id']) && $item['id'] !== '' ? (string) $item['id'] : 'pricing-' . ($index + 1);
        $custom_pricing = isset($item['customPricing']) && is_array($item['customPricing']) ? $item['customPricing'] : array();

        return array(
            'id' => $id,
            'label' => isset($item['label']) ? (string) $item['label'] : '',
            'customPricing' => array(
                'rangePricingPerUnit' => !empty($custom_pricing['rangePricingPerUnit']),
                'shippingMethod' => isset($custom_pricing['shippingMethod']) && $custom_pricing['shippingMethod'] === 'per-weight' ? 'per-weight' : 'per-surface',
                'divisorVolumetric' => isset($custom_pricing['divisorVolumetric']) ? $custom_pricing['divisorVolumetric'] : 5000,
                'unit' => isset($custom_pricing['unit']) && is_array($custom_pricing['unit']) ? $custom_pricing['unit'] : array('surface' => 0, 'basePrice' => 0, 'charPrice' => 0),
                'range' => isset($custom_pricing['range']) && is_array($custom_pricing['range']) ? array_values($custom_pricing['range']) : array(),
            ),
        );
    }

    private function get_pricing_items(array $required_options): array
    {
        $items = $this->section_item_list($required_options, 'pricings');
        $normalized = array();

        foreach ($items as $index => $item) {
            $normalized[] = $this->normalize_pricing_item(is_array($item) ? $item : array(), $index);
        }

        return $normalized;
    }

    private function find_pricing_item_index(array $items, string $item_id): ?int
    {
        foreach ($items as $index => $item) {
            $candidate_id = isset($item['id']) ? (string) $item['id'] : (string) $index;
            if ($candidate_id === $item_id || (string) $index === $item_id) {
                return $index;
            }
        }

        return null;
    }

    private function save_pricing_items(int $config_id, array $items)
    {
        $required_options = $this->get_required_options($config_id);
        $normalized_items = array();

        foreach (array_values($items) as $index => $item) {
            $normalized_items[] = $this->normalize_pricing_item(is_array($item) ? $item : array(), $index);
        }

        $required_options = $this->set_section_items($required_options, 'pricings', $this->section_value_with_items($required_options, 'pricings', $normalized_items));
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
        $value = $this->section_value($required_options, 'pricings', $this->simple_section_default('pricings'));
        if (is_array($value)) {
            $value['items'] = $this->get_pricing_items($required_options);
        }

        return rest_ensure_response($this->section_response_payload('pricings', $value));
    }

    public function update_pricing($request)
    {
        return $this->update_section($request, 'pricings');
    }

    public function get_pricing_item($request)
    {
        $config_id = absint($request->get_param('config_id'));
        $item_id = (string) $request->get_param('item_id');
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
        $item_id = (string) $request->get_param('item_id');
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

        $payload['id'] = isset($items[$updated_index]['id']) ? $items[$updated_index]['id'] : $item_id;
        $items[$updated_index] = $this->normalize_pricing_item($payload, $updated_index);
        $saved = $this->save_pricing_items($config_id, $items);
        return rest_ensure_response($saved === true
            ? array('success' => true, 'message' => __('Pricing successfully edited', 'all-signs-options-pro'), 'data' => array('pricing' => $items[$updated_index]))
            : array('success' => false, 'message' => __('Pricing has not been edited', 'all-signs-options-pro')));
    }

    public function delete_pricing_item($request)
    {
        $config_id = absint($request->get_param('config_id'));
        $item_id = (string) $request->get_param('item_id');
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
