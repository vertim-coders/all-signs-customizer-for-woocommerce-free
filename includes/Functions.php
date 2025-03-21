<?php
if (!defined('ABSPATH'))
    exit;

/**
 * save preview image
 */
function asowp_save_prev_images($images)
{
    $upload_dirs = ASOWP_IMAGE_PATH;
    wp_mkdir_p($upload_dirs);
    $upload_dir = $upload_dirs . DIRECTORY_SEPARATOR;
    $name = uniqid('asowp-');
    $preview_img = [];
    if (!isset($images["face1"])) {
        foreach ($images as $key => $image) {
            $file = base64_decode(explode(',', $image["url"])[1]);
            $file_name = $upload_dir . $name . "." . $image['format'];
            file_put_contents($file_name, $file); // phpcs:ignore
            $preview_img[] = ASOWP_IMAGE_URL . '/' . $name . '.' . $image['format'];
        }

    } else {

        foreach ($images as $key => $face) {
            foreach ($face as $image) {
                $file = base64_decode(explode(',', $image["url"])[1]);
                $file_name = $upload_dir . $name . $key . "." . $image['format'];
                file_put_contents($file_name, $file); // phpcs:ignore
                $preview_img[$key][] = ASOWP_IMAGE_URL . '/' . $name . $key . "." . $image['format'];
            }
        }
    }
    return $preview_img;
}

/**
 * save preview image
 */
function asowp_save_upload_images($images)
{
    $upload_dirs = ASOWP_IMAGE_PATH;
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
                    $name = uniqid('asowp-');
                    $file_name = $upload_dir . "$name-$key-file_{$index}.{$file_extension}";
                    file_put_contents($file_name, $file_data); // phpcs:ignore
                    $preview_imgs[$key][] = ["name" => "$name-$key-file_{$index}.{$file_extension}", "url" => ASOWP_IMAGE_URL . "/$name-$key-file_{$index}.{$file_extension}"];
                } else {
                    // Handle URL
                    $response = wp_remote_get($image["url"]);
                    if (is_array($response) && !is_wp_error($response)) {
                        $file_data = wp_remote_retrieve_body($response);
                        $file_extension = pathinfo($image["url"], PATHINFO_EXTENSION);
                        $name = uniqid('asowp-');
                        $file_name = $upload_dir . "$name-$key-file_{$index}.{$file_extension}";
                        file_put_contents($file_name, $file_data); // phpcs:ignore
                        $preview_imgs[$key][] = ["name" => "$name-$key-file_{$index}.{$file_extension}", "url" => ASOWP_IMAGE_URL . "/$name-$key-file_{$index}.{$file_extension}"];
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
                    $name = uniqid('asowp-');
                    $file_name = $upload_dir . "$name-file_{$index}.{$file_extension}";
                    file_put_contents($file_name, $file_data); // phpcs:ignore
                    $preview_imgs[] = ["name" => "$name-file_{$index}.{$file_extension}", "url" => ASOWP_IMAGE_URL . "/$name-file_{$index}.{$file_extension}"];
                } else {
                    // Handle URL
                    $response = wp_remote_get($image["url"]);
                    if (is_array($response) && !is_wp_error($response)) {
                        $file_data = wp_remote_retrieve_body($response);
                        $file_extension = pathinfo($image["url"], PATHINFO_EXTENSION);
                        $name = uniqid('asowp-');
                        $file_name = $upload_dir . "$name-file_{$index}.{$file_extension}";
                        file_put_contents($file_name, $file_data); // phpcs:ignore
                        $preview_imgs[] = ["name" => "$name-file_{$index}.{$file_extension}", "url" => ASOWP_IMAGE_URL . "/$name-file_{$index}.{$file_extension}"];
                    }
                }
            }
        }
    }
    return $preview_imgs;
}


/**
 * add or edit product to cart
 */
function asowp_add_custom_design_to_cart_ajax()
{
    if (isset($_POST['nonce']) && wp_verify_nonce(sanitize_text_field(wp_unslash($_POST['nonce'])), 'asowp_add_to_cart_after_custom')) {

        if (isset($_POST['data']['variation_id'])) {
            $redirectToCheckOut = isset($_POST['redirectToCheckOut']) ? $_POST['redirectToCheckOut'] : false;
            $main_variation_id = intval($_POST['data']['variation_id']);
            $quantity = isset($_POST['data']['quantity']) ? intval($_POST['data']['quantity']) : 1;
            $cart_item_key = isset($_POST['data']['cart_item_key']) ? sanitize_key($_POST['data']['cart_item_key']) : false;
            $recaps = isset($_POST['data']['recaps']) ? map_deep($_POST['data']['recaps'], 'sanitize_text_field') : [];
            $message = '';

            $newly_added_cart_item_key = false;
            $asowp_previews = asowp_save_prev_images($recaps["designImages"]);
            $uploads = asowp_save_upload_images($recaps['images']["value"]);
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
            //$preview_img = ASOWP_IMAGE_URL . '/' . $file_name . '.png';
            if ($cart_item_key) {
                WC()->cart->cart_contents[$cart_item_key]['asowp_recaps'] = $recaps;
                WC()->cart->calculate_totals();
                wp_send_json(array(
                    'success' => true
                ));
            } else {
                $newly_added_cart_item_key = asowp_add_designs_to_cart($main_variation_id, $recaps, $asowp_previews, $quantity);

                if ($newly_added_cart_item_key) {
                    $message = __('Product successfully added to cart.', "all-signs-options-pro");
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
                    $message = __('A problem occured while adding the product to the cart. Please try again.', "all-signs-options-pro");
                    wp_send_json(array(
                        'success' => false,
                        'message' => $message,

                    ));
                }

            }
        } else {
            wp_send_json(array('message' => __("Missing product ID", "all-signs-options-pro")));
        }
    } else {
        wp_send_json(array('message' => 'nonce invalid.'));
    }
}

/**
 *  add product to cart
 */
function asowp_add_designs_to_cart(int $product_id, array $recaps, $images, int $quantity = 1)
{
    $newly_added_cart_item_key = false;
    $product = wc_get_product($product_id);
    $parent_id = $product->get_parent_id();
    $recaps["designImages"] = $images;
    if ($parent_id == 0) {
        $newly_added_cart_item_key = WC()->cart->add_to_cart(
            $product_id,
            $quantity,
            0,
            array(),
            array(
                'asowp_meta_data' => [
                    "recaps" => $recaps
                ]
            )
        );
    } else {
        $variation = $product->get_variation_attributes();
        $newly_added_cart_item_key = WC()->cart->add_to_cart(
            $product_id,
            $quantity,
            0,
            $variation,
            array(
                'asowp_meta_data' => [
                    "recaps" => $recaps
                ]
            )
        );
    }

    /* if ( isset( $_SESSION['npd_key'] ) ) {
                 $variations = get_transient( $_SESSION['npd_key'] );
             }

             foreach ( $variation as $key => $value ) {
                 if ( isset( $variations[ $key ] ) && '' === $value ) {
                     $variation[ $key ] = $variations[ $key ];
                 }
             }

             if ( isset( $_SESSION['combinaison'][ $variation_name ] ) ) {
                 $variation = $_SESSION['combinaison'][ $variation_name ];
             } */

    if (method_exists(WC()->cart, 'maybe_set_cart_cookies')) {
        WC()->cart->maybe_set_cart_cookies();
    }
    return $newly_added_cart_item_key;
}

/**
 *  includes ajax in plugin 
 */
add_action('wp_ajax_asowp_add_custom_design_to_cart', 'asowp_add_custom_design_to_cart_ajax');
add_action('wp_ajax_nopriv_asowp_add_custom_design_to_cart', 'asowp_add_custom_design_to_cart_ajax');
function asowp_get_price_format()
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
function asowp_get_custom_products()
{
    $args = [
        'post_type' => 'product',
        'posts_per_page' => -1,
        'fields' => 'ids',
        'meta_query' => [
            [
                'key' => 'product-asowp-metas',
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
 * @param string $path  Chemin relatif du dossier (ex: 'asowp-templates').
 *
 * @return string|null URL du fichier JSON si succès, null si erreur.
 */
function asowp_save_large_data($data, $name, $path) {
    // Vérifier si les données sont valides
    if (empty($data)) {
        return null;
    }

    // Définition des chemins
    $base_dir = trailingslashit(ASOWP_DATA_PATH) . trim($path, '/') . '/';
    $base_url = trailingslashit(ASOWP_DATA_URL) . trim($path, '/') . '/';

    // Création du dossier s'il n'existe pas
    wp_mkdir_p($base_dir);

    // Générer un nom de fichier propre
    $file_name = sanitize_file_name($name) . '.json';
    $file_path = $base_dir . $file_name;
    $file_url = $base_url . $file_name;

    // Sauvegarder les données dans le fichier JSON
    if (file_put_contents($file_path, json_encode($data, JSON_PRETTY_PRINT))) {
        return $file_url; // Retourne l'URL du fichier JSON
    }

    return null; // En cas d'échec
}



/**
 * Récupère des données depuis un fichier JSON en convertissant l'URL en chemin.
 *
 * @param string $path URL ou chemin du fichier JSON.
 *
 * @return mixed Données JSON décodées ou null si fichier inexistant.
 */
function asowp_get_large_data($path) {
    // Remplace l'URL par le chemin réel
    $path = stripslashes($path);
    $path = str_replace(ASOWP_DATA_URL, ASOWP_DATA_PATH, $path);

    // Vérifier si le fichier existe et récupérer son contenu
    if (file_exists($path)) {
        $json_data = file_get_contents($path);
        return json_decode($json_data, true);
    }

    return null; // Retourne null si le fichier n'existe pas
}

function asowp_get_filename_without_extension($file_url) {
    // Convertir l'URL en chemin système si nécessaire
    $file_path = str_replace(ASOWP_DATA_URL, ASOWP_DATA_PATH, $file_url);

    // Extraire uniquement le nom du fichier
    $file_name = pathinfo($file_path, PATHINFO_FILENAME);

    return $file_name;
}

