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
            $config_route . '/fonts/items/(?P<font_id>[^/]+)',
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
                        'font_id' => array(
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
                        'font_id' => array(
                            'type' => 'string',
                            'required' => true,
                        ),
                    ),
                ),
            )
        );
    }

    private function get_text_options(int $config_id): array
    {
        $meta = $this->get_meta($config_id);
        $text = isset($meta['data']['settings']['customizerSign']['text']) && is_array($meta['data']['settings']['customizerSign']['text'])
            ? $meta['data']['settings']['customizerSign']['text']
            : array();

        return $text;
    }

    private function save_text_options(int $config_id, array $text)
    {
        $meta = $this->get_meta($config_id);
        if (!isset($meta['data']) || !is_array($meta['data'])) {
            $meta['data'] = array();
        }
        if (!isset($meta['data']['settings']) || !is_array($meta['data']['settings'])) {
            $meta['data']['settings'] = array();
        }
        if (!isset($meta['data']['settings']['customizerSign']) || !is_array($meta['data']['settings']['customizerSign'])) {
            $meta['data']['settings']['customizerSign'] = array();
        }

        $meta['data']['settings']['customizerSign']['text'] = $text;
        return $this->save_raw_meta($config_id, $meta);
    }

    private function selected_fonts(array $text): array
    {
        return isset($text['selectedFonts']) && is_array($text['selectedFonts'])
            ? array_values($text['selectedFonts'])
            : array();
    }

    private function fonts_match(array $actual, array $expected): bool
    {
        return json_encode(array_values($actual)) === json_encode(array_values($expected));
    }

    public function get_fonts($request)
    {
        $config_id = absint($request->get_param('config_id'));
        if (!$config_id) {
            return rest_ensure_response(array('success' => false, 'message' => __('No Configuration found', 'all-signs-options-pro')));
        }

        $text = $this->get_text_options($config_id);
        return rest_ensure_response(array(
            'success' => true,
            'data' => array(
                'fonts' => array(
                    'items' => $this->selected_fonts($text),
                ),
            ),
        ));
    }

    public function add_font_item($request)
    {
        $config_id = absint($request->get_param('config_id'));
        if (!$config_id) {
            return rest_ensure_response(array('success' => false, 'message' => __('No Configuration found', 'all-signs-options-pro')));
        }

        $payload = json_decode($request->get_body(), true);
        $font_id = isset($payload['font_id']) ? (string) $payload['font_id'] : '';
        if ($font_id === '') {
            return rest_ensure_response(array('success' => false, 'message' => __('Font not found', 'all-signs-options-pro')));
        }

        $text = $this->get_text_options($config_id);
        $fonts = $this->selected_fonts($text);
        if (!in_array($font_id, $fonts, true)) {
            $fonts[] = $font_id;
        }
        $text['selectedFonts'] = $fonts;
        $saved = $this->save_text_options($config_id, $text);

        return rest_ensure_response($saved === true
            ? array('success' => true, 'message' => __('Font successfully added', 'all-signs-options-pro'), 'data' => array('fonts' => array('items' => $fonts)))
            : array('success' => false, 'message' => __('Font has not been added', 'all-signs-options-pro')));
    }

    public function update_font_item($request)
    {
        $config_id = absint($request->get_param('config_id'));
        $font_id = (string) $request->get_param('font_id');
        if (!$config_id) {
            return rest_ensure_response(array('success' => false, 'message' => __('No Configuration found', 'all-signs-options-pro')));
        }

        $payload = json_decode($request->get_body(), true);
        $position = isset($payload['position']) ? max(0, absint($payload['position'])) : 0;

        $text = $this->get_text_options($config_id);
        $fonts = $this->selected_fonts($text);
        $index = array_search($font_id, $fonts, true);
        if ($index === false) {
            return rest_ensure_response(array('success' => false, 'message' => __('Font not found', 'all-signs-options-pro')));
        }

        array_splice($fonts, $index, 1);
        if ($position > count($fonts)) {
            $position = count($fonts);
        }
        array_splice($fonts, $position, 0, array($font_id));

        $text['selectedFonts'] = $fonts;
        $saved = $this->save_text_options($config_id, $text);

        return rest_ensure_response($saved === true
            ? array('success' => true, 'message' => __('Font successfully updated', 'all-signs-options-pro'), 'data' => array('fonts' => array('items' => $fonts)))
            : array('success' => false, 'message' => __('Font has not been updated', 'all-signs-options-pro')));
    }

    public function delete_font_item($request)
    {
        $config_id = absint($request->get_param('config_id'));
        $font_id = (string) $request->get_param('font_id');
        if (!$config_id) {
            return rest_ensure_response(array('success' => false, 'message' => __('No Configuration found', 'all-signs-options-pro')));
        }

        $text = $this->get_text_options($config_id);
        $fonts = $this->selected_fonts($text);
        $index = array_search($font_id, $fonts, true);
        if ($index === false) {
            return rest_ensure_response(array('success' => false, 'message' => __('Font not found', 'all-signs-options-pro')));
        }

        array_splice($fonts, $index, 1);
        $text['selectedFonts'] = $fonts;
        $saved = $this->save_text_options($config_id, $text);

        return rest_ensure_response($saved === true
            ? array('success' => true, 'message' => __('Font successfully deleted', 'all-signs-options-pro'), 'data' => array('fonts' => array('items' => $fonts)))
            : array('success' => false, 'message' => __('Font has not been deleted', 'all-signs-options-pro')));
    }
}
