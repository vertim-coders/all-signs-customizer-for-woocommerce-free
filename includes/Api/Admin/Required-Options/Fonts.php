<?php
namespace ASCWO\Api\Admin\Required_Options;

use WP_REST_Server;

class ASCWO_Api_Required_Options_Fonts extends ASCWO_Api_Required_Options_Base
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
            $config_route . '/fonts/items/(?P<item_id>[^/]+)',
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
                            'type' => 'string',
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
                            'type' => 'string',
                            'required' => true,
                        ),
                    ),
                ),
            )
        );

        register_rest_route(
            $this->namespace,
            $config_route . '/fonts/items/(?P<item_id>[^/]+)/default',
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
                            'type' => 'string',
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
            return rest_ensure_response(array('success' => false, 'message' => __('No Configuration found', 'all-signs-customizer-for-woocommerce-pro')));
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

        return array(
            'success' => true,
            'data' => array(
                'fonts' => array(
                    'label' => $value['label'],
                    'description' => $value['description'],
                    'items' => $items,
                ),
            ),
        );
    }

    public function update_fonts($request)
    {
        $config_id = absint($request->get_param('config_id'));
        if (!$config_id) {
            return rest_ensure_response(array('success' => false, 'message' => __('No Configuration found', 'all-signs-customizer-for-woocommerce-pro')));
        }

        $payload = $request->get_json_params();
        $payload = is_array($payload) ? $payload : array();

        if (isset($payload['items']) && is_array($payload['items'])) {
            $managed_fonts = $this->get_managed_fonts();
            $payload['items'] = array_values(array_map(function ($item) use ($managed_fonts) {
                $item = is_array($item) ? $item : array();
                $font_id = isset($item['managedFontId']) ? (int) $item['managedFontId'] : null;
                $managed = ($font_id !== null && isset($managed_fonts[$font_id]) && is_array($managed_fonts[$font_id])) ? $managed_fonts[$font_id] : array();

                $label = isset($item['label']) && $item['label'] !== ''
                    ? (string) $item['label']
                    : (isset($managed['label']) && $managed['label'] !== '' ? (string) $managed['label'] : (isset($managed['name']) ? (string) $managed['name'] : ''));

                $url = isset($item['url']) && $item['url'] !== ''
                    ? (string) $item['url']
                    : (isset($managed['url']) && $managed['url'] !== '' ? (string) $managed['url'] : '');

                $preview = isset($item['previewImg']) && $item['previewImg'] !== ''
                    ? (string) $item['previewImg']
                    : (isset($managed['previewImg']) && $managed['previewImg'] !== '' ? (string) $managed['previewImg'] : (isset($managed['preview']) ? (string) $managed['preview'] : ''));

                return array(
                    'id' => isset($item['id']) && $item['id'] !== '' ? (string) $item['id'] : $this->generate_font_id($item, 0),
                    'label' => $label,
                    'url' => $url,
                    'previewImg' => $preview,
                    'isGoogleFont' => isset($item['isGoogleFont']) ? (bool) $item['isGoogleFont'] : (isset($managed['isGoogleFont']) ? (bool) $managed['isGoogleFont'] : false),
                    'isDefault' => !empty($item['isDefault']),
                    'managedFontId' => $font_id,
                );
            }, $payload['items']));
        }

        return $this->update_section_payload($config_id, 'fonts', $payload);
    }

    public function add_font_item($request)
    {
        $config_id = absint($request->get_param('config_id'));
        if (!$config_id) {
            return rest_ensure_response(array('success' => false, 'message' => __('No Configuration found', 'all-signs-customizer-for-woocommerce-pro')));
        }

        $payload = $request->get_json_params();
        $font_id = isset($payload['font_id']) && is_numeric($payload['font_id']) ? (int) $payload['font_id'] : null;
        if ($font_id === null) {
            return rest_ensure_response(array('success' => false, 'message' => __('Font not found', 'all-signs-customizer-for-woocommerce-pro')));
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
                'message' => __('Font successfully added', 'all-signs-customizer-for-woocommerce-pro'),
                'data' => array('font' => end($items)),
            )
            : array('success' => false, 'message' => __('Font has not been added', 'all-signs-customizer-for-woocommerce-pro')));
    }

    public function update_font_item($request)
    {
        $config_id = absint($request->get_param('config_id'));
        $item_id = sanitize_text_field((string) $request->get_param('item_id'));
        if (!$config_id) {
            return rest_ensure_response(array('success' => false, 'message' => __('No Configuration found', 'all-signs-customizer-for-woocommerce-pro')));
        }

        $payload = $request->get_json_params();
        $payload = is_array($payload) ? $payload : array();
        $position = isset($payload['position']) ? max(0, absint($payload['position'])) : null;

        $required_options = $this->get_required_options($config_id);
        $items = $this->section_item_list($required_options, 'fonts');

        $item_index = $this->find_section_item_index_by_id($items, $item_id);
        if ($item_index === null) {
            return rest_ensure_response(array('success' => false, 'message' => __('Font not found', 'all-signs-customizer-for-woocommerce-pro')));
        }

        if ($position !== null) {
            $font_item = $items[$item_index];
            array_splice($items, $item_index, 1);
            if ($position > count($items)) {
                $position = count($items);
            }
            array_splice($items, $position, 0, array($font_item));
        } else {
            if (isset($payload['label'])) {
                $items[$item_index]['label'] = (string) $payload['label'];
            }
            if (isset($payload['managedFontId'])) {
                $items[$item_index]['managedFontId'] = (int) $payload['managedFontId'];
            }
        }

        $required_options = $this->set_section_items($required_options, 'fonts', $this->section_value_with_items($required_options, 'fonts', $items));
        $saved = $this->save_required_options($config_id, $required_options);

        return rest_ensure_response($saved === true
            ? array(
                'success' => true,
                'message' => __('Font successfully updated', 'all-signs-customizer-for-woocommerce-pro'),
                'data' => array('font' => $items[$item_index]),
            )
            : array('success' => false, 'message' => __('Font has not been updated', 'all-signs-customizer-for-woocommerce-pro')));
    }

    public function set_default_font_item($request)
    {
        $config_id = absint($request->get_param('config_id'));
        $item_id = sanitize_text_field((string) $request->get_param('item_id'));
        if (!$config_id) {
            return rest_ensure_response(array('success' => false, 'message' => __('No Configuration found', 'all-signs-customizer-for-woocommerce-pro')));
        }

        $required_options = $this->get_required_options($config_id);
        $items = $this->section_item_list($required_options, 'fonts');
        $item_index = $this->find_section_item_index_by_id($items, $item_id);
        if ($item_index === null) {
            return rest_ensure_response(array('success' => false, 'message' => __('Font not found', 'all-signs-customizer-for-woocommerce-pro')));
        }

        foreach ($items as $index => $item) {
            $items[$index]['isDefault'] = $index === $item_index;
        }

        $required_options = $this->set_section_items($required_options, 'fonts', $this->section_value_with_items($required_options, 'fonts', $items));
        $saved = $this->save_required_options($config_id, $required_options);

        return rest_ensure_response($saved === true
            ? array(
                'success' => true,
                'message' => __('Default font successfully updated', 'all-signs-customizer-for-woocommerce-pro'),
                'data' => array('font' => $items[$item_index]),
            )
            : array('success' => false, 'message' => __('Default font has not been updated', 'all-signs-customizer-for-woocommerce-pro')));
    }

    public function delete_font_item($request)
    {
        $config_id = absint($request->get_param('config_id'));
        $item_id = sanitize_text_field((string) $request->get_param('item_id'));
        if (!$config_id) {
            return rest_ensure_response(array('success' => false, 'message' => __('No Configuration found', 'all-signs-customizer-for-woocommerce-pro')));
        }

        $required_options = $this->get_required_options($config_id);
        $items = $this->section_item_list($required_options, 'fonts');
        $item_index = $this->find_section_item_index_by_id($items, $item_id);
        if ($item_index === null) {
            return rest_ensure_response(array('success' => false, 'message' => __('Font not found', 'all-signs-customizer-for-woocommerce-pro')));
        }

        array_splice($items, $item_index, 1);
        $items = $this->ensure_single_default_item($items);

        $required_options = $this->set_section_items($required_options, 'fonts', $this->section_value_with_items($required_options, 'fonts', $items));
        $saved = $this->save_required_options($config_id, $required_options);

        return rest_ensure_response($saved === true
            ? array(
                'success' => true,
                'message' => __('Font successfully deleted', 'all-signs-customizer-for-woocommerce-pro'),
                'data' => array('items' => array_values($items)),
            )
            : array('success' => false, 'message' => __('Font has not been deleted', 'all-signs-customizer-for-woocommerce-pro')));
    }

    private function get_managed_fonts(): array
    {
        $fonts = get_option('ascwo-manages-fonts', array());
        return is_array($fonts) ? $fonts : array();
    }

    private function normalize_font_item($font_id, int $index = 0): array
    {
        $managed_fonts = $this->get_managed_fonts();
        $font = array();
        if (is_numeric($font_id) && isset($managed_fonts[(int) $font_id]) && is_array($managed_fonts[(int) $font_id])) {
            $font = $managed_fonts[(int) $font_id];
        } elseif (is_string($font_id)) {
            foreach ($managed_fonts as $candidate) {
                if (!is_array($candidate)) {
                    continue;
                }
                if ((isset($candidate['id']) && (string) $candidate['id'] === $font_id) || (isset($candidate['label']) && sanitize_title((string) $candidate['label']) === sanitize_title($font_id))) {
                    $font = $candidate;
                    break;
                }
            }
        }

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

        $url = '';
        if (isset($font['url']) && $font['url'] !== '') {
            $url = (string) $font['url'];
        }

        $preview_img = '';
        if (isset($font['previewImg']) && $font['previewImg'] !== '') {
            $preview_img = (string) $font['previewImg'];
        } elseif (isset($font['preview']) && $font['preview'] !== '') {
            $preview_img = (string) $font['preview'];
        }

        return array(
            'id' => $this->generate_font_id(array('label' => $label, 'managedFontId' => is_numeric($font_id) ? (int) $font_id : null), $index),
            'label' => $label,
            'url' => $url,
            'previewImg' => $preview_img,
            'isGoogleFont' => isset($font['isGoogleFont']) ? (bool) $font['isGoogleFont'] : false,
            'isDefault' => $index === 0,
            'managedFontId' => is_numeric($font_id) ? (int) $font_id : null,
        );
    }
}
