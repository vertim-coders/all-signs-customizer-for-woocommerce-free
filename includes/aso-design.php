<?php
namespace ASO;
/**
 * Contains all methods and hooks callbacks related to the design
 *
 * @author Vertim Coders
 */
class ASO_Design {

    /**
     * Set all aso configuration initialization hooks
    */
    public function init_hooks() {
		//cart
		add_action( 'woocommerce_before_calculate_totals', [$this, 'aso_change_product_price_in_cart'], 10,1 );
		add_filter( 'woocommerce_cart_item_thumbnail', [$this, 'aso_change_product_image_in_cart'], 99, 3 );
		add_action('woocommerce_after_cart_item_name', [$this,'display_previewBtn_editBtn_in_cart'], 10, 1);
		
		//admin data
		add_action( 'woocommerce_after_order_itemmeta',[$this, 'get_order_custom_admin_data'], 10, 3);
		add_action('woocommerce_checkout_create_order_line_item', [$this,'capture_product_metadata_to_order'], 10, 4);
		
		// Emails.
		add_action( 'woocommerce_order_item_meta_start', [$this, 'set_email_order_item_meta'],10, 3);
		add_filter( 'woocommerce_email_attachments', [$this, 'add_order_design_to_mail'], 10, 3  );
		add_action( 'woocommerce_order_item_meta_end', [$this, 'mail_template'], 11, 4  );
    }

	/**
	 * 
	 */
	public function aso_change_product_price_in_cart( $cart ) {
		
		if (is_admin() && !defined('DOING_AJAX')) return;


		foreach ( $cart->cart_contents as $cart_item_key => $cart_item ) {
			if ( $cart_item['variation_id'] ) {
				$variation_id = $cart_item['variation_id'];
			} else {
				$variation_id = $cart_item['product_id'];
			}


			if ( isset( $cart_item["aso_meta_data"]) ) {
				if ( isset( $cart_item['aso_meta_data']["recaps"]['custom_price'] ) ) {
					$item_price = apply_filters( 'aso_cart_item_price', $cart_item['aso_meta_data']["recaps"]['custom_price'], $variation_id );		
					$cart_item['data']->set_price( $item_price );
				}
				
			}

			// Ajout d'un filtre pour mettre à jour le prix total de l'element dans le panier.
		}
	}

	/**
	 * 
	 */
	public function aso_change_product_image_in_cart( $product_image_code, $values, $cart_item_key ) {
		if ( $values['variation_id'] ) {
			$product_id = $values['variation_id'];
		} else {
			$product_id = $values['product_id'];
		}
		if ( isset( $values["aso_meta_data"]['aso_preview_img'] ) && !empty( $values["aso_meta_data"]['aso_preview_img'] ) ) {
			$product_image_code = "<img class='aso-cartitem-img' src='" . $values["aso_meta_data"]['aso_preview_img'] . "'>";
		}

		return $product_image_code;
	}

	public function display_previewBtn_editBtn_in_cart($cart_item, $cart_item_key){
		$product = $cart_item['data'];
		
		// Construisez les URL pour les aperçus et les éditions (ajustez selon vos besoins)
		//$preview_url = get_permalink($product->get_id());

		//$preview_data = get_transient( 'preview_' . $product->get_id() );

		$npd_product = new aso_Product_Config( $product->get_id() );

		$edit_url = $npd_product->get_design_url() . '?edit=' . $cart_item_key;
		$product_name = '';
		if(isset($cart_item['aso_meta_data']["recaps"])){
			$modal_id = uniqid();
			ob_start();
			?>
			
			<div class="omodal fade o-modal wpc_part" id="<?php echo esc_attr($modal_id); ?>" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
				<div class="omodal-dialog">
					<div class="omodal-content">
						<div class="omodal-header">
							<button type="button" class="close" data-dismiss="omodal" aria-hidden="true">&times;</button>
						</div>
						<div class="omodal-body">
							<?php echo $this->display_custom_recaps($cart_item['aso_meta_data']["recaps"]); ?>
						</div>
					</div>
				</div>
			</div>
			<div class="aso-product-links">
				<span class="aso-cart-product-preview o-modal-trigger button" data-toggle="o-modal" data-target="#<?php echo esc_attr($modal_id); ?>"><?php echo __("Sign Recaps","ASO")?></span>
				<!-- <a href="<?php echo esc_url($edit_url)?>" target="_blank"><?php echo __("Back to custom page","ASO")?></a> -->
			</div>
			<?php
			$product_name.=ob_get_clean();		
		}
		echo $product_name;
	}

	private function display_custom_recaps($recaps){
		ob_start();
		foreach( $$recaps['aso_meta_data']["recaps"] as $key=> $value) {?>
			<?php if($key !='custom_price' && $key != 'aso_additional_options') {?>

				<div class="aso-custom-options-info">
					<label for=""><?php echo esc_html__("Size","ASO")?>: </label>
					<span><?php echo esc_html__("Width","ASO"). esc_html($value["sign"]["width"])?></span>
					<span><?php echo esc_html__("Height","ASO") .esc_html($value["sign"]["height"])?></span>
				</div>
				<div class="aso-custom-options-info">
					<label for=""><?php echo esc_html__("Thickness","ASO")?>: </label>
					<span><?php echo esc_html($value["sign"]["thickness"])?></span>
				</div>
				<div class="aso-custom-options-info">
					<label for=""><?php echo esc_html__("Shape","ASO")?>: </label>
					<span><?php echo esc_html($value["sign"]["shape"])?></span>
				</div>
				<div class="aso-custom-options-info">
					<label for=""><?php echo esc_html__("Shape","ASO")?>: </label>
				<?php if(isset($value["sign"]["color"]["face1"])){ 
						foreach ($value["sign"]["color"] as $key => $face) { ?>
							<div class="aso-custom-options-info">
								<label for=""><?php echo esc_html__("Face","ASO")?>: </label>
								<span><?php echo esc_html($value["sign"]["shape"])?></span>
							</div>
							
						<?php }
					?>
					
				<?php }?>
				</div>
				<?php			
				
			}else if($key == 'aso_additional_option'){
				foreach($value as $value2) { ?>
					<div class="aso-custom-options-info">
						<label for=""><?php echo esc_html($value2["label"])?>: </label>
						<span><?php echo esc_html($value2["value"])?></span>
					</div>
		<?php 	}
			}
		}
		return ob_get_clean(); 
	}

    /**
	 * Add in mail the recap data.
	 *
	 * @param int   $item_id The item id.
	 * @param array $item The item data.
	 * @param mixed $order The order data.
	 * @return mixed
	 */
	public function set_email_order_item_meta( $item_id, $item, $order) {
		if ( is_order_received_page() ) {
			return;
		}
		$order_data   = wc_get_order_item_meta( $item_id, 'aso_recaps' );

		if ( isset( $order_data ) && !empty( $order_data ) ) {
			ob_start();

			$details = ob_get_clean();
			return $details;
		}

	}

    /**
	 * Add order design to mail.
	 *
	 * @param array $attachments
	 * @param string $status
	 * @param  object $order
	 * @return array
	 */
	public function add_order_design_to_mail( $attachments, $status, $order ) {
		$allowed_statuses = array( 'new_order', 'customer_invoice', 'customer_processing_order', 'customer_completed_order' );
		if ( isset( $status ) && in_array( $status, $allowed_statuses ) ) {
			$items = $order->get_items();
			foreach ( $items as $item ) {
				if ( isset( $item['aso_recaps'] ) ) {
					if ( isset( $item['aso_recaps']['aso_preview_img'] ) ) {
						array_push( $attachments, $item['aso_recaps']['aso_preview_img'] );
					}
					if ( isset( $item['aso_recaps']['aso_svg_data'] ) ) {
						array_push( $attachments, $item['aso_recaps']['aso_svg_data'] );
					}
				}
			}
		}
		return $attachments;
	}

	/**
	 * 
	 */
	public function get_order_custom_admin_data( $item_id, $item, $_product ) {

		$order_data   = wc_get_order_item_meta( $item_id, 'aso_recaps' );
		$order_id = $item->get_order_id();
		if ( $order_id && isset( $order_data ) && !empty( $order_data ) ) {
			ob_start();

			foreach ( $order_data as $key => $value ) {
				// $name     = explode( '_', $key );
				// $name     = str_replace( 'aso_', '', $name );
				?>
				<div class="aso-cart-item-data-wrap">
					
				<?php
				if($key !='aso_custom_price' && $key != 'aso_additional_option') {
					$name = explode('_', $key);
					if(in_array('color', $name) || in_array('face', $name) || in_array('trim', $name) || in_array('side', $name) || in_array('back', $name)) {
						for ($i=0; $i < count($name); $i++) { 
							$name[$i]=ucfirst($name[$i]);
						}
						unset($name[0]);
						$name = implode(' ', $name);
						if(isset($value['label'])){
							$name = $value['label'];
						}
						if(isset($value['value'])){
							$value = explode('/', $value['value']);
						}else{
							$value = explode('/', $value);
						}
						$resultat = preg_split("/\)|,|\(/", $value[1], -1, PREG_SPLIT_NO_EMPTY);
						$resultat = implode(",", $resultat);
						$elements = count(explode(",", $resultat));
						$resultat=trim($resultat);
						?>
						<div class="aso-custom-options-info">
							<label for=""><?php echo  esc_html($name)?>: </label>
							<span><?php echo esc_html($value[0])?></span>
							<?php if($elements > 1) { ?>
								<div class="aso-cart-color-option" style="background:linear-gradient(to right bottom,<?php echo esc_attr($resultat)?>);"></div>
							<?php }else{ ?>
								<div class="aso-cart-color-option" style="background:<?php echo esc_attr($resultat)?>;"></div>
							<?php } ?>
						</div>
			<?php	}else{
						for ($i=0; $i < count($name); $i++) { 
							$name[$i]=ucfirst($name[$i]);
						}
						unset($name[0]);
						$name = implode(' ', $name);
						if(isset($value['label'])){
							$name = $value['label'];
						}

						if($key == "aso_text"){ ?>
								<div class="aso-custom-options-info">
									<label for=""><?php echo  esc_html($name)?>: </label>
									<?php
										foreach ($value['value'] as $v) {?>
											<span><?php echo esc_html($v)?></span><br>
									<?php } ?>
								</div>											
							<?php 
						}else{
							if($key != 'aso_preview_img' && $key != 'aso_svg_data'){?>
								<div class="aso-custom-options-info">
									<label for=""><?php echo  esc_html($name)?>: </label>
									<span><?php echo esc_html($value['value'])?></span>
								</div>
								<?php 
							}
						}
					}
								
				}else if($key == 'aso_additional_option'){
					foreach($value as $value2) {
						?>
							<div class="aso-custom-options-info">
								<label for=""><?php echo  esc_html($value2["label"])?>: </label>
								<span><?php echo esc_html($value2["value"])?></span>
							</div>
				<?php }
				}
				?>
				</div>
				<?php 
			}
			$modal_id = uniqid() . $item_id;

			if ( isset( $order_data['aso_preview_img'] ) ) {?>
				<div style="margin:10px 0">
					<button class="button alt aso_admin_download_image" href="<?php echo esc_attr($order_data['aso_preview_img'])?>"><?php echo __( 'Download', 'aso' )?></button>

					<span><a class="o-modal-trigger button" data-toggle="o-modal" data-target="#<?php echo esc_attr( $modal_id )?>"><?php echo __( 'Preview', 'aso' )?></a></span>
					<div class="omodal fade o-modal wpc_part" id="<?php echo esc_attr( $modal_id )?>" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
						<div class="omodal-dialog">
							<div class="omodal-content">
								<div class="omodal-header">
								<button type="button" class="close" data-dismiss="omodal" aria-hidden="true">&times;</button>
								<h4 class="omodal-title" id="myModalLabel<?php echo esc_attr( $modal_id )?>">Preview</h4>
								</div>
								<div class="omodal-body">
									<img src="<?php echo esc_url( $order_data['aso_preview_img'] )?>">
								</div>
							</div>
						</div>
					</div>
			<?php }
			if(isset( $order_data['aso_svg_data'] )){?>
				<div style="margin:10px 0">
					<button class="button alt aso_admin_download_svg" href='<?php echo esc_attr($order_data['aso_svg_data'])?>'><?php echo __( 'Download SVG', 'aso' )?></button>
				</div>
			<?php } 
			$product_id = $_product->get_id();
			$meta = get_post_meta($product_id,'product-aso-metas',true);
			if(!empty($meta) && isset($meta[$product_id]['config-id'])){
				$configId = $meta[$product_id]['config-id'];
				if($configId !=0){
					$config = get_post_meta($configId,"aso-configs-meta",true);
					if(!empty($config)){
						$email_data = $config['settings']["generals"]["output"]['manufacturerEmail'];
						if(isset($email_data["sendDesignByEmail"]) && $email_data["sendDesignByEmail"] && isset($email_data["receiverEmail"]) && !empty($email_data["receiverEmail"])){
							?>
							<div>
								<button class="button aso-send-email" data-product-id="<?php echo esc_attr($product_id)?>" data-order='<?php echo wp_json_encode(["recaps"=>$order_data,"order_id"=>$order_id])?>'><?php echo __("Send Manufacturer mail","aso")?></button>
							</div>
					<?php }
					}
				}
			}
			

			
			$details = ob_get_clean();
			echo wp_kses_post($details);
		}

	

	}

	/**
	 * 
	 */
	function capture_product_metadata_to_order($item, $cart_item_key, $values, $order) {
		$meta_key = 'aso_recaps';
		if ( isset( $values[ $meta_key ] ) ) {
			if ( isset( $values['aso_preview_img'] ) ) {
				$values[ $meta_key ]['aso_preview_img'] = $values['aso_preview_img'];
			}			
			$item->update_meta_data( $meta_key, $values[ $meta_key ] );
		}
	}

	/**
	 * 
	 */
	function mail_template( $item_id, $item, $_product ) {

		$order_data   = wc_get_order_item_meta( $item_id, 'aso_recaps' );

		if ( isset( $order_data ) && !empty( $order_data ) ) {
			ob_start();

			foreach ( $order_data as $key => $value ) {
			}
			
			$details = ob_get_clean();
			echo wp_kses_post($details);
		}

	

	}
}
