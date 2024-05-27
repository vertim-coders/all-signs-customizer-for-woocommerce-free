<?php
    if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly
	/**
	 * save preview image
	 */
	function aso_save_canvas_image( $images) {
		$upload_dirs = ASO_IMAGE_PATH;
		wp_mkdir_p( $upload_dirs );
		$upload_dir = $upload_dirs . DIRECTORY_SEPARATOR;
        $file_name                     = uniqid( 'aso-' );
        $preview_img=[];
        if(!isset($images["face1"])){
            foreach ($images as $key => $image) {
                $file        = base64_decode(explode(',', $image["url"])[1]);
                $file_name       = $upload_dir . $file_name . ".".$image['format'];
                file_put_contents( $file_name, $file ); // phpcs:ignore
                $preview_img[$image['format'].$key] = ASO_IMAGE_URL . '/preview-' . $file_name . '.'. $image['format'];
            }
            
        }else{
            foreach ($images as $face) {
                foreach ($face as $key => $image) {
                    $file        = base64_decode(explode(',', $image["url"])[1]);
                    $file_name       = $upload_dir . $file_name . ".".$image['format'];
                    file_put_contents( $file_name, $file ); // phpcs:ignore
                    $preview_img[$image['format'].$key] = ASO_IMAGE_URL . '/preview-' . $file_name . '.'. $image['format'];
                }
            }
        }
        return $preview_img;
	}
	
	/**
	 * add or edit product to cart
	 */
	function aso_add_custom_design_to_cart_ajax() {
        if (wp_verify_nonce(sanitize_text_field( wp_unslash ($_POST['nonce'])), 'aso_add_to_cart_after_custom')) {
            if (isset($_POST['data']['variation_id'])) {
                $redirectToCheckOut = isset($_POST['redirectToCheckOut']) ? $_POST['redirectToCheckOut'] : false;
                $displayRecapsOnCheckout = isset($_POST['displayRecapsOnCheckout']) ? $_POST['displayRecapsOnCheckout'] : false;
                $main_variation_id = intval($_POST['data']['variation_id']);
                $quantity = isset($_POST['data']['quantity']) ? intval($_POST['data']['quantity']) : 1; 
                $cart_item_key = isset($_POST['data']['cart_item_key']) ? sanitize_key($_POST['data']['cart_item_key']): false;
                $recaps = isset($_POST['data']['recaps']) ? map_deep( $_POST['data']['recaps'], 'sanitize_text_field' ) : [];
                $message = '';
                
                /* if ( session_status() !== 2 ) {
                    session_start();
                }
                
                $_SESSION['aso_calculated_totals'] = false; */
                
                $newly_added_cart_item_key = false;
                $aso_previews = aso_save_canvas_image( $recaps["designImages"]);
                //$preview_img = ASO_IMAGE_URL . '/' . $file_name . '.png';
                if ( $cart_item_key ) {
                    WC()->cart->cart_contents[ $cart_item_key ]['aso_recaps'] = $recaps;
                    WC()->cart->calculate_totals();
                    wp_send_json(array(
                        'success'     => true
                    ));
                } else {
                    $newly_added_cart_item_key = aso_add_designs_to_cart($main_variation_id, $recaps,$aso_previews,$displayRecapsOnCheckout,$quantity);

                    if ( $newly_added_cart_item_key ) {
                        $message =  __( 'Product successfully added to cart.', 'ASO' );
                        wp_send_json(array(
                            'success'     => true,
                            'cart_item_key'     => $newly_added_cart_item_key,
                            'message'     => $message,
                            'url'         => $redirectToCheckOut ? wc_get_checkout_url() : wc_get_cart_url(),
                            'form_fields' => $recaps,
            
                        ));
                    } else {
                        $message = __( 'A problem occured while adding the product to the cart. Please try again.', 'ASO' );
                        wp_send_json(array(
                            'success'     => false,
                            'message'     => $message,
            
                        ));
                    }
                
                }
            } else {
                wp_send_json(array('message' => __("Missing product ID","ASO")));
            }
        }else{
            wp_send_json(array('message' => 'nonce invalid.'));
        }
	}

	/**
	 *  add product to cart
	 */
	function aso_add_designs_to_cart( int $product_id,array $recaps,$images, bool $displayRecapsOnCheckout,int $quantity) {
		$newly_added_cart_item_key = false;
        $product = wc_get_product( $product_id );
        $parent_id = $product->get_parent_id();
        $recaps["previews"]= $images;
        if($parent_id == 0){
            $newly_added_cart_item_key = WC()->cart->add_to_cart(
                $product_id,
                $quantity,
                0,
                array(),
                array(
                    'aso_meta_data' => [
                        "recaps"=>$recaps,
                        'aso_displayRecapsOnCheckout'=>$displayRecapsOnCheckout,
                    ]
                )
            );
        }else{
            $variation  = $product->get_variation_attributes();
            $newly_added_cart_item_key = WC()->cart->add_to_cart(
                $product_id,
                $quantity,
                0,
                $variation,
                array(
                    'aso_meta_data' => [
                        "recaps"=>$recaps,
                        'aso_displayRecapsOnCheckout'=>$displayRecapsOnCheckout,
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

			if ( method_exists( WC()->cart, 'maybe_set_cart_cookies' ) ) {
				WC()->cart->maybe_set_cart_cookies();
			}
		return $newly_added_cart_item_key;
	}

    /**
     *  includes ajax in plugin 
     */
    add_action( 'wp_ajax_aso_add_custom_design_to_cart', 'aso_add_custom_design_to_cart_ajax' );
    add_action( 'wp_ajax_nopriv_aso_add_custom_design_to_cart', 'aso_add_custom_design_to_cart_ajax' );
    function aso_get_price_format() {
        $currency_pos = get_option( 'woocommerce_currency_pos' );
        $format       = '%s%v';

        switch ( $currency_pos ) {
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
    function aso_get_custom_products() {
        global $wpdb;
        $query = "SELECT p.id 
                  FROM {$wpdb->posts} p 
                  JOIN {$wpdb->postmeta} pm ON pm.post_id = p.id 
                  WHERE p.post_type = 'product' AND pm.meta_key = %s";
        $params = ['product-aso-metas'];
        $conditions = [];
        $placeholders = [];
    
        for ($i = 1; $i <= 9; $i++) {
            $conditions[] = "pm.meta_value LIKE %s";
            $placeholders[] = '%config-id";s:' . $i . ':%';
        }

        if (!empty($conditions)) {
            $query .= " AND (" . join(' OR ', $conditions) . ")";
        }

        $params = array_merge($params, $placeholders);

        $products = $wpdb->get_results($wpdb->prepare(
            // phpcs:ignore WordPress.DB.PreparedSQL.NotPrepared
            $query, 
            $params
        ));
    
        return $products;
    }