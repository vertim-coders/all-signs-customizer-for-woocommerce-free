<?php
namespace ASCWO\Api\Admin\Required_Options;

require_once __DIR__ . '/Base.php';

foreach (array(
    'Sizes.php',
    'Colors.php',
    'Shapes.php',
    'FixingMethods.php',
    'Pricings.php',
    'Borders.php',
    'Materials.php',
    'Components.php',
    'Fonts.php',
) as $file) {
    $path = __DIR__ . '/' . $file;
    if (file_exists($path)) {
        require_once $path;
    }
}

class ASCWO_Api_Required_Options extends ASCWO_Api_Required_Options_Base
{
    public function register_routes()
    {
        (new ASCWO_Api_Required_Options_Sizes())->register_routes();
        (new ASCWO_Api_Required_Options_Colors())->register_routes();
        (new ASCWO_Api_Required_Options_Shapes())->register_routes();
        (new ASCWO_Api_Required_Options_FixingMethods())->register_routes();
        (new ASCWO_Api_Required_Options_Pricings())->register_routes();
        (new ASCWO_Api_Required_Options_Borders())->register_routes();
        (new ASCWO_Api_Required_Options_Materials())->register_routes();
        (new ASCWO_Api_Required_Options_Components())->register_routes();
        (new ASCWO_Api_Required_Options_Fonts())->register_routes();

        register_rest_route(
            $this->namespace,
            '/migrate-item-ids',
            array(
                array(
                    'methods' => \WP_REST_Server::CREATABLE,
                    'callback' => array($this, 'migrate_item_ids'),
                    'permission_callback' => array($this, 'permissions_check'),
                ),
            )
        );
    }

    public function migrate_item_ids($request)
    {
        global $wpdb;

        $config_ids_param = $request->get_param('config_ids');
        $config_ids = array();

        if (!empty($config_ids_param)) {
            if (is_array($config_ids_param)) {
                $config_ids = array_map('absint', $config_ids_param);
            } else {
                $config_ids = array(absint($config_ids_param));
            }
        } else {
            $post_ids = $wpdb->get_col(
                $wpdb->prepare(
                    "SELECT DISTINCT post_id FROM {$wpdb->postmeta} WHERE meta_key = %s",
                    'ascwo-configs-meta'
                )
            );
            $config_ids = array_map('absint', $post_ids);
        }

        if (empty($config_ids)) {
            return rest_ensure_response(array(
                'success' => false,
                'message' => __('No configurations found', 'all-signs-customizer-for-woocommerce-pro'),
            ));
        }

        $updated_count = 0;
        $results = array();

        foreach ($config_ids as $config_id) {
            $meta = get_post_meta($config_id, 'ascwo-configs-meta', true);
            if (!is_array($meta)) {
                continue;
            }

            $changed = false;

            // Get productType from meta for generating context-aware IDs
            $product_type = isset($meta['productType']) ? (string) $meta['productType'] : '';

            // Migrate sizes IDs
            if (isset($meta['requiredOptions']['sizes']['items']) && is_array($meta['requiredOptions']['sizes']['items'])) {
                foreach ($meta['requiredOptions']['sizes']['items'] as $index => $size) {
                    $new_id = $this->generate_size_id($size);
                    if ($size['id'] !== $new_id) {
                        $meta['requiredOptions']['sizes']['items'][$index]['id'] = $new_id;
                        $changed = true;
                    }
                }
            }

            // Migrate colors IDs
            if (isset($meta['requiredOptions']['colors']['items']) && is_array($meta['requiredOptions']['colors']['items'])) {
                foreach ($meta['requiredOptions']['colors']['items'] as $index => $color) {
                    $new_id = $this->generate_color_id($color);
                    if ($color['id'] !== $new_id) {
                        $meta['requiredOptions']['colors']['items'][$index]['id'] = $new_id;
                        $changed = true;
                    }
                }
            }

            // Migrate shapes IDs
            if (isset($meta['requiredOptions']['shapes']['items']) && is_array($meta['requiredOptions']['shapes']['items'])) {
                foreach ($meta['requiredOptions']['shapes']['items'] as $index => $shape) {
                    $new_id = $this->generate_shape_id($shape);
                    if ($shape['id'] !== $new_id) {
                        $meta['requiredOptions']['shapes']['items'][$index]['id'] = $new_id;
                        $changed = true;
                    }
                }
            }

            // Migrate borders IDs
            if (isset($meta['requiredOptions']['borders']['items']) && is_array($meta['requiredOptions']['borders']['items'])) {
                foreach ($meta['requiredOptions']['borders']['items'] as $index => $border) {
                    $new_id = $this->generate_border_id($border);
                    if ($border['id'] !== $new_id) {
                        $meta['requiredOptions']['borders']['items'][$index]['id'] = $new_id;
                        $changed = true;
                    }
                }
            }

            // Migrate fixing-methods IDs
            if (isset($meta['requiredOptions']['fixingMethods']['items']) && is_array($meta['requiredOptions']['fixingMethods']['items'])) {
                foreach ($meta['requiredOptions']['fixingMethods']['items'] as $index => $method) {
                    $new_id = $this->generate_fixing_method_id($method);
                    if ($method['id'] !== $new_id) {
                        $meta['requiredOptions']['fixingMethods']['items'][$index]['id'] = $new_id;
                        $changed = true;
                    }
                }
            }

            // Migrate fonts IDs
            if (isset($meta['requiredOptions']['fonts']['items']) && is_array($meta['requiredOptions']['fonts']['items'])) {
                foreach ($meta['requiredOptions']['fonts']['items'] as $index => $font) {
                    $new_id = $this->generate_font_id($font, $index);
                    if ($font['id'] !== $new_id) {
                        $meta['requiredOptions']['fonts']['items'][$index]['id'] = $new_id;
                        $changed = true;
                    }
                }
            }

            // Also migrate additionalOptions->materials
            if (isset($meta['additionalOptions']['materials']['items']) && is_array($meta['additionalOptions']['materials']['items'])) {
                foreach ($meta['additionalOptions']['materials']['items'] as $index => $material) {
                    $new_id = $this->generate_material_id($material, $index);
                    if ($material['id'] !== $new_id) {
                        $meta['additionalOptions']['materials']['items'][$index]['id'] = $new_id;
                        $changed = true;
                    }
                }
            }

            if ($changed) {
                update_post_meta($config_id, 'ascwo-configs-meta', $meta);
                clean_post_cache($config_id);
                $updated_count++;
                $results[] = array(
                    'config_id' => $config_id,
                    'status' => 'updated',
                );
            } else {
                $results[] = array(
                    'config_id' => $config_id,
                    'status' => 'no_changes',
                );
            }
        }

        return rest_ensure_response(array(
            'success' => true,
            'message' => sprintf(
                __('Migration completed: %d configuration(s) updated out of %d', 'all-signs-customizer-for-woocommerce-pro'),
                $updated_count,
                count($config_ids)
            ),
            'data' => array(
                'total' => count($config_ids),
                'updated' => $updated_count,
                'results' => $results,
            ),
        ));
    }
}
