<?php
namespace ASOWP\Api\Admin\Required_Options;

use WP_REST_Server;

class ASOWP_Api_Required_Options_Fonts extends ASOWP_Api_Required_Options_Base
{
    public function register_routes()
    {
        $config_route = $this->rest_base . '/(?P<config_id>\d+)/required-options';

        register_rest_route(
            $this->namespace,
            $config_route . '/fonts',
            array(
                array(
                    'methods' => WP_REST_Server::READABLE,
                    'callback' => array($this, 'get_fonts'),
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
                    'callback' => array($this, 'update_fonts'),
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
            $config_route . '/fonts/items',
            array(
                array(
                    'methods' => WP_REST_Server::CREATABLE,
                    'callback' => array($this, 'add_font_item'),
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
            $config_route . '/fonts/items/(?P<item_id>\d+)',
            array(
                array(
                    'methods' => WP_REST_Server::EDITABLE,
                    'callback' => array($this, 'update_font_item'),
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
                    'callback' => array($this, 'delete_font_item'),
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
            $config_route . '/fonts/items/(?P<item_id>\d+)/default',
            array(
                array(
                    'methods' => WP_REST_Server::EDITABLE,
                    'callback' => array($this, 'set_default_font_item'),
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

    public function get_fonts($request)
    {
        $config_id = absint($request->get_param('config_id'));
        if (!$config_id) {
            return rest_ensure_response(array('success' => false, 'message' => __('No Configuration found', 'all-signs-options-pro')));
        }

        $required_options = $this->get_required_options($config_id);
        $value = $this->get_section_items($required_options, 'fonts');

        return rest_ensure_response($this->fonts_response($config_id, $value));
    }

    protected function fonts_response(int $config_id, $value): array
    {
        $value = is_array($value) ? $value : array();
        $items = isset($value['items']) && is_array($value['items']) ? array_values($value['items']) : array();
        $value['label'] = isset($value['label']) ? (string) $value['label'] : 'Fonts';
        $value['description'] = isset($value['description']) ? (string) $value['description'] : '';

        $font_ids = array();
        foreach ($items as $item) {
            if (isset($item['managedFontId']) && $item['managedFontId'] !== null) {
                $font_ids[] = (int) $item['managedFontId'];
            }
        }

        return array(
            'success' => true,
            'data' => array(
                'fonts' => array(
                    'label' => $value['label'],
                    'description' => $value['description'],
                    'items' => $font_ids,
                    'fontItems' => $items,
                ),
            ),
        );
    }

    public function update_fonts($request)
    {
        $config_id = absint($request->get_param('config_id'));
        if (!$config_id) {
            return rest_ensure_response(array('success' => false, 'message' => __('No Configuration found', 'all-signs-options-pro')));
        }

        $payload = json_decode($request->get_body(), true);
        $payload = is_array($payload) ? $payload : array();

        return $this->update_section_payload($config_id, 'fonts', $payload);
    }

    public function add_font_item($request)
    {
        $config_id = absint($request->get_param('config_id'));
        if (!$config_id) {
            return rest_ensure_response(array('success' => false, 'message' => __('No Configuration found', 'all-signs-options-pro')));
        }

        $payload = json_decode($request->get_body(), true);
        $font_id = isset($payload['font_id']) && is_numeric($payload['font_id']) ? (int) $payload['font_id'] : null;
        if ($font_id === null) {
            return rest_ensure_response(array('success' => false, 'message' => __('Font not found', 'all-signs-options-pro')));
        }

        $required_options = $this->get_required_options($config_id);
        $items = $this->section_item_list($required_options, 'fonts');

        $new_item = $this->normalize_font_item($font_id, count($items));
        $items[] = $new_item;
        $items = $this->ensure_single_default_item($items);

        $required_options = $this->set_section_items($required_options, 'fonts', $this->section_value_with_items($required_options, 'fonts', $items));
        $saved = $this->save_required_options($config_id, $required_options);

        return rest_ensure_response($saved === true
            ? array(
                'success' => true,
                'message' => __('Font successfully added', 'all-signs-options-pro'),
                'data' => array('font' => end($items)),
            )
            : array('success' => false, 'message' => __('Font has not been added', 'all-signs-options-pro')));
    }

    public function update_font_item($request)
    {
        $config_id = absint($request->get_param('config_id'));
        $item_id = absint($request->get_param('item_id'));
        if (!$config_id) {
            return rest_ensure_response(array('success' => false, 'message' => __('No Configuration found', 'all-signs-options-pro')));
        }

        $payload = json_decode($request->get_body(), true);
        $payload = is_array($payload) ? $payload : array();
        $position = isset($payload['position']) ? max(0, absint($payload['position'])) : null;

        $required_options = $this->get_required_options($config_id);
        $items = $this->section_item_list($required_options, 'fonts');

        if (!isset($items[$item_id])) {
            return rest_ensure_response(array('success' => false, 'message' => __('Font not found', 'all-signs-options-pro')));
        }

        if ($position !== null) {
            $font_item = $items[$item_id];
            array_splice($items, $item_id, 1);
            if ($position > count($items)) {
                $position = count($items);
            }
            array_splice($items, $position, 0, array($font_item));
        } else {
            if (isset($payload['label'])) {
                $items[$item_id]['label'] = (string) $payload['label'];
            }
            if (isset($payload['managedFontId'])) {
                $items[$item_id]['managedFontId'] = (int) $payload['managedFontId'];
            }
        }

        $required_options = $this->set_section_items($required_options, 'fonts', $this->section_value_with_items($required_options, 'fonts', $items));
        $saved = $this->save_required_options($config_id, $required_options);

        return rest_ensure_response($saved === true
            ? array(
                'success' => true,
                'message' => __('Font successfully updated', 'all-signs-options-pro'),
                'data' => array('font' => $items[$item_id]),
            )
            : array('success' => false, 'message' => __('Font has not been updated', 'all-signs-options-pro')));
    }

    public function set_default_font_item($request)
    {
        $config_id = absint($request->get_param('config_id'));
        $item_id = absint($request->get_param('item_id'));
        if (!$config_id) {
            return rest_ensure_response(array('success' => false, 'message' => __('No Configuration found', 'all-signs-options-pro')));
        }

        $required_options = $this->get_required_options($config_id);
        $items = $this->section_item_list($required_options, 'fonts');
        if (!isset($items[$item_id])) {
            return rest_ensure_response(array('success' => false, 'message' => __('Font not found', 'all-signs-options-pro')));
        }

        foreach ($items as $index => $item) {
            $items[$index]['isDefault'] = $index === $item_id;
        }

        $required_options = $this->set_section_items($required_options, 'fonts', $this->section_value_with_items($required_options, 'fonts', $items));
        $saved = $this->save_required_options($config_id, $required_options);

        return rest_ensure_response($saved === true
            ? array(
                'success' => true,
                'message' => __('Default font successfully updated', 'all-signs-options-pro'),
                'data' => array('font' => $items[$item_id]),
            )
            : array('success' => false, 'message' => __('Default font has not been updated', 'all-signs-options-pro')));
    }

    public function delete_font_item($request)
    {
        $config_id = absint($request->get_param('config_id'));
        $item_id = absint($request->get_param('item_id'));
        if (!$config_id) {
            return rest_ensure_response(array('success' => false, 'message' => __('No Configuration found', 'all-signs-options-pro')));
        }

        $required_options = $this->get_required_options($config_id);
        $items = $this->section_item_list($required_options, 'fonts');
        if (!isset($items[$item_id])) {
            return rest_ensure_response(array('success' => false, 'message' => __('Font not found', 'all-signs-options-pro')));
        }

        array_splice($items, $item_id, 1);
        $items = $this->ensure_single_default_item($items);

        $required_options = $this->set_section_items($required_options, 'fonts', $this->section_value_with_items($required_options, 'fonts', $items));
        $saved = $this->save_required_options($config_id, $required_options);

        return rest_ensure_response($saved === true
            ? array(
                'success' => true,
                'message' => __('Font successfully deleted', 'all-signs-options-pro'),
                'data' => array('items' => array_values($items)),
            )
            : array('success' => false, 'message' => __('Font has not been deleted', 'all-signs-options-pro')));
    }

    private function get_managed_fonts(): array
    {
        $fonts = get_option('asowp-manages-fonts', array());
        return is_array($fonts) ? $fonts : array();
    }

    private function normalize_font_item($font_id, int $index = 0): array
    {
        $managed_fonts = $this->get_managed_fonts();
        $font = is_numeric($font_id) && isset($managed_fonts[(int) $font_id]) && is_array($managed_fonts[(int) $font_id])
            ? $managed_fonts[(int) $font_id]
            : array();

        $label = '';
        if (isset($font['label']) && $font['label'] !== '') {
            $label = (string) $font['label'];
        } elseif (isset($font['name']) && $font['name'] !== '') {
            $label = (string) $font['name'];
        } elseif (isset($font['family']) && $font['family'] !== '') {
            $label = (string) $font['family'];
        } else {
            $label = 'Font ' . ((int) $index + 1);
        }

        $item = array(
            'label' => $label,
            'isDefault' => $index === 0,
            'managedFontId' => is_numeric($font_id) ? (int) $font_id : null,
        );

        return array(
            'id' => $this->generate_font_id($item, $index),
            'label' => $label,
            'isDefault' => $index === 0,
            'managedFontId' => is_numeric($font_id) ? (int) $font_id : null,
        );
    }
}
