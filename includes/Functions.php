<?php
/**
 * Shared helper functions for the plugin.
 *
 * @package ASCWO
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Save preview images to the uploads directory.
 *
 * @param array $images Preview image payload.
 *
 * @return array
 */
function ascwo_save_prev_images($images)
{
    $upload_dirs = ASCWO_IMAGE_PATH;
    wp_mkdir_p($upload_dirs);
    $upload_dir = $upload_dirs . DIRECTORY_SEPARATOR;
    $name = uniqid('ascwo-');
    $preview_img = [];
    if (!isset($images["face1"])) {
        foreach ($images as $key => $image) {
            $file = base64_decode(explode(',', $image["url"])[1]);
            $file_name = $upload_dir . $name . "." . $image['format'];
            file_put_contents($file_name, $file); // phpcs:ignore
            $preview_img[] = ASCWO_IMAGE_URL . '/' . $name . '.' . $image['format'];
        }

    } else {

        foreach ($images as $key => $face) {
            foreach ($face as $image) {
                $file = base64_decode(explode(',', $image["url"])[1]);
                $file_name = $upload_dir . $name . $key . "." . $image['format'];
                file_put_contents($file_name, $file); // phpcs:ignore
                $preview_img[$key][] = ASCWO_IMAGE_URL . '/' . $name . $key . "." . $image['format'];
            }
        }
    }
    return $preview_img;
}

/**
 * Save uploaded images to the uploads directory.
 *
 * @param array $images Uploaded image payload.
 *
 * @return array
 */
function ascwo_save_upload_images($images)
{
    $upload_dirs = ASCWO_IMAGE_PATH;
    wp_mkdir_p($upload_dirs);
    $upload_dir = $upload_dirs . DIRECTORY_SEPARATOR;
    $preview_imgs = [];

    if (isset($images['face1'])) {
        foreach ($images as $key => $face) {
            foreach ($face as $index => $image) {
                if (preg_match('/^data:image\/(png|jpeg|jpg|gif|svg\+xml);base64,/', $image["url"])) {
                    // Handle Data URI
                    $file_data = base64_decode(explode(',', $image["url"])[1]);
                    $file_extension = explode('/', mime_content_type($image["url"]))[1];
                    $file_extension = explode("+", $file_extension)[0];
                    $name = uniqid('ascwo-');
                    $file_name = $upload_dir . "$name-$key-file_{$index}.{$file_extension}";
                    file_put_contents($file_name, $file_data); // phpcs:ignore
                    $preview_imgs[$key][] = ["name" => "$name-$key-file_{$index}.{$file_extension}", "url" => ASCWO_IMAGE_URL . "/$name-$key-file_{$index}.{$file_extension}"];
                } else {
                    // Handle URL
                    $response = wp_remote_get($image["url"]);
                    if (is_array($response) && !is_wp_error($response)) {
                        $file_data = wp_remote_retrieve_body($response);
                        $file_extension = pathinfo($image["url"], PATHINFO_EXTENSION);
                        $name = uniqid('ascwo-');
                        $file_name = $upload_dir . "$name-$key-file_{$index}.{$file_extension}";
                        file_put_contents($file_name, $file_data); // phpcs:ignore
                        $preview_imgs[$key][] = ["name" => "$name-$key-file_{$index}.{$file_extension}", "url" => ASCWO_IMAGE_URL . "/$name-$key-file_{$index}.{$file_extension}"];
                    }
                }
            }
        }
    } else {
        if (isset($images)) {
            foreach ($images as $index => $image) {
                if (preg_match('/^data:image\/(png|jpeg|jpg|gif|svg\+xml);base64,/', $image["url"])) {
                    // Handle Data URI
                    $file_data = base64_decode(explode(',', $image["url"])[1]);
                    $file_extension = explode('/', mime_content_type($image["url"]))[1];
                    $file_extension = explode("+", $file_extension)[0];
                    $name = uniqid('ascwo-');
                    $file_name = $upload_dir . "$name-file_{$index}.{$file_extension}";
                    file_put_contents($file_name, $file_data); // phpcs:ignore
                    $preview_imgs[] = ["name" => "$name-file_{$index}.{$file_extension}", "url" => ASCWO_IMAGE_URL . "/$name-file_{$index}.{$file_extension}"];
                } else {
                    // Handle URL
                    $response = wp_remote_get($image["url"]);
                    if (is_array($response) && !is_wp_error($response)) {
                        $file_data = wp_remote_retrieve_body($response);
                        $file_extension = pathinfo($image["url"], PATHINFO_EXTENSION);
                        $name = uniqid('ascwo-');
                        $file_name = $upload_dir . "$name-file_{$index}.{$file_extension}";
                        file_put_contents($file_name, $file_data); // phpcs:ignore
                        $preview_imgs[] = ["name" => "$name-file_{$index}.{$file_extension}", "url" => ASCWO_IMAGE_URL . "/$name-file_{$index}.{$file_extension}"];
                    }
                }
            }
        }
    }
    return $preview_imgs;
}


/**
 * Add or edit a product in the cart from the configurator.
 *
 * @return void
 */
function ascwo_add_custom_design_to_cart_ajax()
{
    if (isset($_POST['nonce']) && wp_verify_nonce(sanitize_text_field(wp_unslash($_POST['nonce'])), 'ascwo_add_to_cart_after_custom')) {

        if (isset($_POST['data']['variation_id'])) {
            $redirectToCheckOut = isset($_POST['redirectToCheckOut']) ? $_POST['redirectToCheckOut'] : false;
            $main_variation_id = intval($_POST['data']['variation_id']);
            $quantity = isset($_POST['data']['quantity']) ? intval($_POST['data']['quantity']) : 1;
            $cart_item_key = isset($_POST['data']['cart_item_key']) ? sanitize_key($_POST['data']['cart_item_key']) : false;
            $recaps = isset($_POST['data']['recaps']) ? map_deep($_POST['data']['recaps'], 'sanitize_text_field') : [];
            $message = '';

            $newly_added_cart_item_key = false;
            $ascwo_previews = ascwo_save_prev_images($recaps["designImages"]);
            $uploads = ascwo_save_upload_images($recaps['images']["value"]);
            if (isset($uploads["face1"])) {
                foreach ($uploads as $key => $face) {
                    foreach ($face as $index => $upload) {
                        unset($recaps['images']["value"][$key][$index]["url"]);
                        $recaps['images']["value"][$key][$index]["infos"] = $upload;
                    }
                }
            } else {
                foreach ($uploads as $key => $upload) {
                    unset($recaps['images']["value"][$key]["url"]);
                    $recaps['images']["value"][$key]["infos"] = $upload;
                }
            }
            //$preview_img = ASCWO_IMAGE_URL . '/' . $file_name . '.png';
            if ($cart_item_key) {
                WC()->cart->cart_contents[$cart_item_key]['ascwo_recaps'] = $recaps;
                WC()->cart->calculate_totals();
                wp_send_json(array(
                    'success' => true
                ));
            } else {
                $newly_added_cart_item_key = ascwo_add_designs_to_cart($main_variation_id, $recaps, $ascwo_previews, $quantity);

                if ($newly_added_cart_item_key) {
                    $message = __('Product successfully added to cart.', "all-signs-customizer-for-woocommerce");
                    if ($redirectToCheckOut === "true" || $redirectToCheckOut === true) {
                        $url = wc_get_checkout_url();
                    } else {
                        $url = wc_get_cart_url();
                    }
                    wp_send_json(array(
                        'success' => true,
                        'cart_item_key' => $newly_added_cart_item_key,
                        'message' => $message,
                        'url' => $url,
                        'form_fields' => $recaps,

                    ));
                } else {
                    $message = __('A problem occured while adding the product to the cart. Please try again.', "all-signs-customizer-for-woocommerce");
                    wp_send_json(array(
                        'success' => false,
                        'message' => $message,

                    ));
                }

            }
        } else {
            wp_send_json(array('message' => __("Missing product ID", "all-signs-customizer-for-woocommerce")));
        }
    } else {
        wp_send_json(array('message' => 'nonce invalid.'));
    }
}

/**
 * Add a product to the cart with ASCWO metadata.
 *
 * @param int   $product_id Product ID.
 * @param array $recaps     Configurator recap data.
 * @param mixed $images     Generated preview images.
 * @param int   $quantity   Quantity to add.
 *
 * @return mixed
 */
function ascwo_add_designs_to_cart(int $product_id, array $recaps, $images, int $quantity = 1)
{
    $newly_added_cart_item_key = false;
    $product = wc_get_product($product_id);
    if (!$product) {
        return false;
    }

    $parent_id = $product->get_parent_id();
    $recaps["designImages"] = $images;

    if ($parent_id == 0) {
        $newly_added_cart_item_key = WC()->cart->add_to_cart(
            $product_id,
            $quantity,
            0,
            array(),
            array(
                'ascwo_meta_data' => [
                    "recaps" => $recaps
                ]
            )
        );
    } else {
        $variation_id = $product_id;
        $variation = $product->get_variation_attributes();
        $newly_added_cart_item_key = WC()->cart->add_to_cart(
            $parent_id,
            $quantity,
            $variation_id,
            $variation,
            array(
                'ascwo_meta_data' => [
                    "recaps" => $recaps
                ]
            )
        );
    }

    if ($newly_added_cart_item_key) {
        WC()->cart->calculate_totals();

        if (method_exists(WC()->cart, 'set_session')) {
            WC()->cart->set_session();
        }

        if (method_exists(WC()->cart, 'maybe_set_cart_cookies')) {
            WC()->cart->maybe_set_cart_cookies();
        }
    }

    return $newly_added_cart_item_key;
}

/**
 * Register cart AJAX endpoints.
 *
 * @return void
 */
add_action('wp_ajax_ascwo_add_custom_design_to_cart', 'ascwo_add_custom_design_to_cart_ajax');
add_action('wp_ajax_nopriv_ascwo_add_custom_design_to_cart', 'ascwo_add_custom_design_to_cart_ajax');
/**
 * Get the WooCommerce price format for the current currency position.
 *
 * @return string
 */
function ascwo_get_price_format()
{
    $currency_pos = get_option('woocommerce_currency_pos');
    $format = '%s%v';

    switch ($currency_pos) {
        case 'left':
            $format = '%s%v';
            break;
        case 'right':
            $format = '%v%s';
            break;
        case 'left_space':
            $format = '%s %v';
            break;
        case 'right_space':
            $format = '%v %s';
            break;
        default:
            $format = '%s%v';
            break;
    }
    return $format;
}
/**
 * Get IDs of products that are not already bound to a configuration.
 *
 * @return array
 */
function ascwo_get_custom_products()
{
    $args = [
        'post_type' => 'product',
        'posts_per_page' => -1,
        'fields' => 'ids',
        'meta_query' => [
            [
                'key' => 'product-ascwo-metas',
                'value' => 'config-id";s:1:"0"',
                'compare' => 'NOT LIKE',
            ],
        ],
    ];

    $product_ids = get_posts($args);

    if (is_array($product_ids) && count($product_ids) > 0) {
        return $product_ids;
    } else {
        return [];
    }

}

/**
 * Enregistre des données volumineuses dans un fichier JSON.
 *
 * @param mixed  $data  Données à sauvegarder.
 * @param string $name  Nom du fichier (sans extension).
 * @param string $path  Chemin relatif du dossier.
 *
 * @return string|null URL du fichier JSON si succès, null si erreur.
 */
function ascwo_save_large_data($data, $name, $path)
{
    if (empty($data)) {
        return null;
    }

    $base_dir = trailingslashit(ASCWO_DATA_PATH) . trim($path, '/') . '/';
    $base_url = trailingslashit(ASCWO_DATA_URL) . trim($path, '/') . '/';

    wp_mkdir_p($base_dir);

    $file_name = sanitize_file_name($name) . '.json';
    $file_path = $base_dir . $file_name;
    $file_url = $base_url . $file_name;

    $encoded_data = wp_json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
    if (false === $encoded_data) {
        return null;
    }

    if (file_put_contents($file_path, $encoded_data, LOCK_EX) !== false) {
        return $file_url;
    }

    return null;
}



/**
 * Retrieve decoded JSON data from a file path or URL.
 *
 * @param string $path URL or path to the JSON file.
 *
 * @return mixed Decoded JSON data, or null when the file does not exist.
 */
function ascwo_get_large_data($path)
{
    $path = stripslashes($path);
    $path = str_replace(ASCWO_DATA_URL, ASCWO_DATA_PATH, $path);

    if (file_exists($path)) {
        if (function_exists('wp_json_file_decode')) {
            $decoded = wp_json_file_decode($path, array('associative' => true));
            if (null !== $decoded) {
                return $decoded;
            }
        }

        $json_data = file_get_contents($path);
        if (false === $json_data) {
            return null;
        }

        return json_decode($json_data, true);
    }

    return null;
}

/**
 * Get a filename without its extension.
 *
 * @param string $file_url URL or path to the file.
 *
 * @return string
 */
function ascwo_get_filename_without_extension($file_url)
{
    $file_path = str_replace(ASCWO_DATA_URL, ASCWO_DATA_PATH, $file_url);

    $file_name = pathinfo($file_path, PATHINFO_FILENAME);

    return $file_name;
}
