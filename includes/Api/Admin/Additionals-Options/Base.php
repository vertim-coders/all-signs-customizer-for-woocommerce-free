<?php
namespace ASOWP\Api\Admin\Additionals_Options;

use ASOWP\Support\ConfigSchemaNormalizer;
use WP_REST_Controller;

class ASOWP_Api_Customs_Additionals_Base extends WP_REST_Controller
{
    public function __construct()
    {
        $this->namespace = 'asowp/v1';
        $this->rest_base = 'configs';
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

    protected function save_meta(int $config_id, array $meta)
    {
        return ConfigSchemaNormalizer::save_meta($config_id, $meta);
    }

    protected function get_additional_options(int $config_id): array
    {
        $normalized = $this->get_normalized_meta($config_id);
        $additional_options = isset($normalized['additionalOptions']) && is_array($normalized['additionalOptions'])
            ? $normalized['additionalOptions']
            : array();

        return $additional_options;
    }

    protected function save_additional_options(int $config_id, array $additional_options)
    {
        $meta = $this->get_meta($config_id);
        $meta['additionalOptions'] = $additional_options;
        return $this->save_meta($config_id, $meta);
    }

    protected function get_section_items(int $config_id, string $section): array
    {
        $additional_options = $this->get_additional_options($config_id);
        $section_value = isset($additional_options[$section]) && is_array($additional_options[$section])
            ? $additional_options[$section]
            : array();

        if (isset($section_value['items']) && is_array($section_value['items'])) {
            return array_values($section_value['items']);
        }

        return array();
    }

    protected function set_section_items(int $config_id, string $section, array $items, string $label, string $description = '')
    {
        $additional_options = $this->get_additional_options($config_id);
        $additional_options[$section] = array(
            'label' => $label,
            'description' => $description,
            'items' => array_values($items),
        );

        return $this->save_additional_options($config_id, $additional_options);
    }

    protected function find_item_index(array $items, $item_id): ?int
    {
        foreach ($items as $index => $item) {
            if (!is_array($item)) {
                continue;
            }

            $candidate_ids = array(
                isset($item['id']) ? (string) $item['id'] : '',
                isset($item['materialKey']) ? (string) $item['materialKey'] : '',
                isset($item['sourceMaterialId']) ? (string) $item['sourceMaterialId'] : '',
            );

            if (in_array((string) $item_id, $candidate_ids, true) || (string) $index === (string) $item_id) {
                return $index;
            }
        }

        return null;
    }

    protected function resolve_material_colors(array $material = array()): array
    {
        if (isset($material['colors']) && is_array($material['colors'])) {
            return $material['colors'];
        }

        return array_values(get_option('asowp_all_colors', array()));
    }

    public function get_config_permissions_check($request)
    {
        return true;
    }
}
