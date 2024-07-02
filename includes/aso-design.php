<?php
namespace ASO;
use ASO_Product_Config;
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
		add_action('woocommerce_after_cart_item_name', [$this,'display_previewBtn_editBtn_in_cart'], 10);
		add_filter('woocommerce_get_item_data', [$this,'display_recaps_config_on_checkout_page'], 20, 2);
		
		//admin data
		add_action( 'woocommerce_after_order_itemmeta',[$this, 'get_order_custom_admin_data'], 10, 3);
		add_action('woocommerce_checkout_create_order_line_item', [$this,'capture_product_metadata_to_order'], 10, 4);
		
		// Emails.
		//add_action( 'woocommerce_order_item_meta_start', [$this, 'mail_template'],10, 3);
		add_filter( 'woocommerce_email_attachments', [$this, 'custom_email_attachments'], 10, 4  );
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
	public function aso_change_product_image_in_cart( $product_image_code, $values) {
		if ( isset( $values['aso_meta_data']["recaps"] ) ) {
			$previews = $values['aso_meta_data']["recaps"]["designImages"];
			$product_image_code = "<img class='aso-cartitem-img' src='" . esc_url($previews[0]) . "'>";	
			return $product_image_code;
		}

	}

	public function display_previewBtn_editBtn_in_cart($cart_item){
		$product = $cart_item['data'];
		$have_pages_settings = get_option("aso_config_page");
		// Construisez les URL pour les aperçus et les éditions (ajustez selon vos besoins)
		//$preview_url = get_permalink($product->get_id());

		//$preview_data = get_transient( 'preview_' . $product->get_id() );

		//$npd_product = new aso_Product_Config( $product->get_id() );
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
							<?php echo $this->display_custom_recaps($cart_item['aso_meta_data']["recaps"],false); ?>
						</div>
					</div>
				</div>
			</div>
			<div class="aso-product-links">
				<span class="aso-cart-product-preview o-modal-trigger button" data-toggle="o-modal" data-target="#<?php echo esc_attr($modal_id); ?>"><?php echo $have_pages_settings["buttons"]["recapsButtonOnCart"] ?></span>
			</div>
			<?php
			$product_name.=ob_get_clean();		
		}
		echo $product_name;
	}

	public function display_recaps_config_on_checkout_page($item_data, $cart_item){
		if (is_checkout()) {
			$product = $cart_item['data'];

			if ( $product ) {
				
				$product_id = $product->get_id();
				$product_meta_data = get_post_meta( $product_id, 'product-aso-metas', true );
				if ( isset( $product_meta_data[ $product_id ]['config-id'] ) && get_post($product_meta_data[ $product_id ]['config-id'])){
					if ( empty( !$product_meta_data[ $product_id ]['config-id'] ) ) {
						$configId = $product_meta_data[ $product_id ]['config-id'];
                    	$config = get_post_meta($configId,"aso-configs-meta",true);
						if($config["data"]["settings"]["generals"]["product"]["displayRecapsOnCheckout"]){
							echo $this->display_custom_recaps($cart_item['aso_meta_data']["recaps"],false);
						}
					}
				}
			}
		}
	}

	private function display_custom_recaps($recaps,$admin=true){
		ob_start();?>
		<div style="display:flex; flex-direction:column;">
			<div class="aso-custom-options-info">
				<label for=""><?php echo esc_html($recaps["sign"]["size"]["label"])?>: </label>
				<span><?php echo esc_html($recaps["sign"]["size"]["value"]["width"]["label"])?>: <?php echo esc_html($recaps["sign"]["size"]["value"]["width"]["value"])?></span>
				<span><?php echo esc_html($recaps["sign"]["size"]["value"]["height"]["label"])?>: <?php echo esc_html($recaps["sign"]["size"]["value"]["height"]["value"])?></span>
			</div>
			<?php if($recaps["sign"]["size"]["value"]["thickness"]["value"] !=='none') {?>
			<div class="aso-custom-options-info">
				<label for=""><?php echo esc_html($recaps["sign"]["size"]["value"]["thickness"]["label"])?>: </label>
				<span><?php echo esc_html($recaps["sign"]["size"]["value"]["thickness"]["value"])?></span>
			</div>
			<?php }?>
			<div class="aso-custom-options-info">
				<label for=""><?php echo esc_html($recaps["sign"]["shape"]["label"])?>: </label>
				<span><?php echo esc_html($recaps["sign"]["shape"]["value"])?></span>
			</div>
			<div class="aso-custom-options-info">
				<label for=""><?php echo esc_html($recaps["sign"]["fixingMethod"]["label"])?>: </label>
				<span><?php echo esc_html($recaps["sign"]["fixingMethod"]["value"])?></span>
			</div>
			<div class="aso-custom-options-info">
				<label for=""><?php echo esc_html($recaps["sign"]["border"]["label"])?>: </label>
				<?php if(isset($recaps["sign"]["border"]["value"]["face1"]) || isset($recaps["texts"]["value"]["face2"])) {?>
				<?php foreach ($recaps["sign"]["border"]["value"] as $key => $face) {?>
					<div style="display:flex; justify-content:center; align-items:center;">
						<label for=""style="margin: 0 5px;"><?php echo esc_html($recaps["faces"][$key])?>: </label>
						<span for=""style="margin: 0 5px;"><?php echo esc_html($face["type"])?> </span>
						<?php if(isset($face["codeHex"])) { ?>
						<div class="aso-cart-color-option" style="background:<?php echo esc_attr($face["codeHex"])?>;"></div>
						<?php } ?>
					</div>
				<?php }} else{?>
					<span for=""style="margin: 0 5px;"><?php echo esc_html($recaps["sign"]["border"]["value"]["type"])?> </span>
					<?php if(isset($recaps["sign"]["border"]["value"]["codeHex"])) { ?>
					<div class="aso-cart-color-option" style="background:<?php echo esc_attr($recaps["sign"]["border"]["value"]["codeHex"])?>;"></div>
					<?php }?>
				<?php }?>
			</div>
			<div class="aso-custom-options-info">
				<label for=""><?php echo esc_html($recaps["sign"]["color"]["label"])?>: </label>
				<?php if(isset($recaps["sign"]["color"]["value"]["face1"]) || isset($recaps["texts"]["value"]["face2"])) {?>
				<?php foreach ($recaps["sign"]["color"]["value"] as $key => $color) {?>
					<div style="display:flex; justify-content:center; align-items:center;">
						<label for=""style="margin: 0 5px;"><?php echo esc_html($recaps["faces"][$key])?>: </label>
						<span for=""style="margin: 0 5px;"><?php echo esc_html($color["name"])?> </span>
						<?php if($this->isColorCode($color["codeHex"])) {?>
							<div class="aso-cart-color-option" style="background:<?php echo esc_attr($color["codeHex"])?>;"></div>
						<?php }else{?>
							<div class="aso-cart-color-option" style="position:relative;">
								<img src="<?php echo esc_url($color["codeHex"])?>" style="position:absolute; width:100%,height:100%;"/>
							</div>
						<?php }?>
					</div>
				<?php }} else{?>
					<span for=""style="margin: 0 5px;"><?php echo esc_html($recaps["sign"]["color"]["value"]["name"])?> </span>
					<?php if($this->isColorCode($recaps["sign"]["color"]["value"]["codeHex"])) {?>
							<div class="aso-cart-color-option" style="background:<?php echo esc_attr($recaps["sign"]["color"]["value"]["codeHex"])?>;"></div>
					<?php }else{?>
						<div class="aso-cart-color-option" style="position:relative;">
							<img src="<?php echo esc_url($recaps["sign"]["color"]["value"]["codeHex"])?>" style="position:absolute; width:100%; height:100%;"/>
						</div>
					<?php }?>
				<?php }?>
			</div>
			<?php if(isset($recaps["texts"]["value"]) && count($recaps["texts"]["value"])>0) {?>
				<div class="aso-custom-options-info">
					<label for=""><?php echo esc_html($recaps["texts"]["label"])?>: </label>
					<?php if(isset($recaps["texts"]["value"]["face1"]) || isset($recaps["texts"]["value"]["face2"])) {?>
						<?php foreach ($recaps["texts"]["value"] as $key => $face) { ?>
							<div >
								<label for=""style="margin: 0 5px;"><?php echo esc_html($recaps["faces"][$key])?>: </label>
								<?php foreach ($face as $text) {?>
									<div class="aso-custom-options-info-infos" >
									<span><?php echo esc_html($text["textContent"])?></span>
									<?php if($admin) { foreach ($text["values"] as $key => $position) {?>
										<span><?php echo esc_html( $position["label"]). ": " .esc_html( $position["value"]) ;?></span>
									<?php } } ?>
									</div>
								<?php } ?>
							</div>
						<?php }
						} else{?>
							<?php foreach ($recaps["texts"]["value"] as $key => $text) {?>
								<div class="aso-custom-options-info-infos" >
									<span><?php echo esc_html($text["textContent"])?></span>
									<?php if($admin) { foreach ($text["values"] as $key => $position) {?>
										<span><?php echo esc_html( $position["label"]). ": " .esc_html( $position["value"]) ;?></span>
									<?php } } ?>
								</div>
							<?php }?>
					<?php } ?>
				</div>
			<?php } ?>
			<?php if( isset($recaps["images"]["value"]) && count($recaps["images"]["value"])>0) {?>
			<div class="aso-custom-options-info">
				<label for=""><?php echo esc_html($recaps["images"]["label"])?>: </label>
				<?php if(isset($recaps["images"]["value"]["face1"])) {?>
					<?php foreach ($recaps["images"]["value"] as $key => $face) { ?>
						<div>
							<label for=""style="margin: 0 5px;"><?php echo esc_html($recaps["faces"][$key])?>: </label>
							<?php foreach ($face as $image) {?>
								<div class="aso-custom-options-info-infos" >
									<div class="aso-cart-color-option" >
										<img src="<?php echo $image["url"]?>"/>
									</div>
									<?php if($admin) { foreach ($image["values"] as $key => $position) {?>
										<span><?php echo esc_html( $position["label"]). ": " .esc_html( $position["value"]) ;?></span>
									<?php } } ?>
								</div>
							<?php } ?>
						</div>
					<?php }
					} else{?>
					<div style="display:flex; flex-direction:column; justify-content:center; align-items:center;">
						<?php foreach ($recaps["images"]["value"] as $key => $image) {?>
							<div class="aso-custom-options-info-infos" >
								<div class="aso-cart-color-option" style="position:relative; margin: 0 5px 0 0;">
									<img src="<?php echo $image["url"]?>" style="position: absolute;
									width: auto;
									height: 50px;"/>
								</div>
								<?php if($admin) { foreach ($image["values"] as $key => $position) {?>
									<span><?php echo esc_html( $position["label"]). ": " .esc_html( $position["value"]) ;?></span>
								<?php } } ?>
							</div>
						<?php }?>
					</div>
			<?php } ?>
			</div>
			<?php } ?>
			<?php if( isset($recaps["additionalComponents"]) && count($recaps["additionalComponents"])>0) {?>
				<?php foreach ($recaps["additionalComponents"] as $key => $value) {?>
					<div class="aso-custom-options-info">
						<label for=""><?php echo  esc_html($value["option"])?>: </label>
						<span><?php echo esc_html($value["value"])?></span>
					</div>
				<?php } ?>
			<?php } ?>
			<?php if( isset($recaps["additionalOptions"]) && count($recaps["additionalOptions"])>0) {?>
				<?php foreach ($recaps["additionalOptions"] as $key => $value) {?>
					<div class="aso-custom-options-info">
						<label for=""><?php echo  esc_html($value["label"])?>: </label>
						<span><?php echo esc_html($value["value"])?></span>
					</div>
				<?php } ?>
			<?php } ?>			
			<div class="aso-custom-options-info">
				<label for=""><?php echo esc_html__("Previews","ASO")?>: </label>
				<div style="display:flex; justify-content:center; align-items:center;">
				<?php if ($admin) {?>
					<?php foreach ($recaps["designImages"] as $key => $image) {?>
						<div style="position:relative; width:fit-content">
							<img src="<?php echo esc_url($image)?>" style="
								width: auto;
								height: 50px;"/>
						</div>
						<div style="margin:10px 0">
							<a class="button alt aso_admin_download_image" href="<?php echo esc_attr($image)?>" download><?php echo __( 'Download File', 'ASO' )?></a>
						</div> 
					<?php } ?>
				<?php }else{ ?>
						<div style="position:relative; width:fit-content">
							<img src="<?php echo esc_url($recaps["designImages"][0])?>" style="
								width: auto;
								height: 50px;"/>
						</div>
						<div style="margin:10px 0">
							<a class="button alt aso_admin_download_image" href="<?php echo esc_attr($recaps["designImages"][0])?>" download><?php echo __( 'Download Image', 'ASO' )?></a>
						</div> 
				<?php } ?>
				</div>
			</div>
		</div>
		<?php
		return ob_get_clean(); 
	}

	private function isColorCode($chaine) {
		// Expression régulière pour vérifier les codes couleur hexadécimaux
		$pattern = '/^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/';
		return preg_match($pattern, $chaine);
	}

    /**
	 * Add in mail the recap data.
	 *
	 * @param int   $item_id The item id.
	 * @param array $item The item data.
	 * @param mixed $order The order data.
	 * @return mixed
	 */
	/* public function set_email_order_item_meta( $item_id, $item, $order) {
		if ( is_order_received_page() ) {
			return;
		}
		$order_data   = wc_get_order_item_meta( $item_id, 'aso_meta_data' );

		if ( isset( $order_data ) && !empty( $order_data ) ) {
			ob_start();

			$details = ob_get_clean();
			return $details;
		}

	} */

    /**
	 * Add order design to mail.
	 *
	 * @param array $attachments
	 * @param string $status
	 * @param  object $order
	 * @return array
	 */
	function custom_email_attachments( $attachments, $email_id, $order, $email ) {
		// Vérifier si l'e-mail est envoyé au client
		if ( $email->id === 'customer_completed_order' ) {
			$items = $order->get_items();
			foreach ( $items as $item ) {
				if ( isset( $item["aso_meta_data"]['recaps'] ) ) {
					if( isset($item["aso_meta_data"]['zip'])){
						$attachments[] = $item["aso_meta_data"]['zip'];
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

		$order_data   = wc_get_order_item_meta( $item_id, 'aso_meta_data' );
		$order_id = $item->get_order_id();
		if ( $order_id && isset( $order_data ) && !empty( $order_data ) ) {
			echo $this->display_custom_recaps($order_data["recaps"],true);
			if(isset($order_data["zip"])){?>
				<div style="margin:10px 0">
					<a class="button alt aso_admin_download_image" href="<?php echo esc_attr($order_data["zip"])?>" download><?php echo __( 'Download Order Zip file', 'ASO' )?></a>
				</div> <?php 
			}
			/* $product_id = $_product->get_id();
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
			} */
			
		}

	

	}

	/**
	 * 
	 */
	function capture_product_metadata_to_order($item, $cart_item_key, $values, $order) {
		$meta_key = 'aso_meta_data';
		if ( isset( $values[ $meta_key ] ) ) {
			$item->update_meta_data( $meta_key, $values[ $meta_key ] );
		}
	}

	/**
	 * 
	 */
	function mail_template( $item_id, $item, $_product ) {
		$order_data   = wc_get_order_item_meta( $item_id, 'aso_meta_data' );

		if ( isset( $order_data ) && !empty( $order_data ) ) {
			ob_start();
				echo $this->display_custom_recaps($order_data["recaps"],true);
				$dataUris = [];
				if(isset($order_data['recaps']['images']["value"]['face1'])){
					foreach ($order_data['recaps']['images']["value"] as $key => $face) {
						foreach ($face as $key => $image) {
							array_push($dataUris,$image["url"]);
						}
					}
				}else{
					if(isset($order_data['recaps']['images']["value"])){
						foreach ($order_data['recaps']['images']["value"] as $key => $image) {							
							array_push($dataUris,$image["url"]);
						}
					}
				}
				$order_id = wc_get_order_id_by_order_item_id($item_id);
				$aso_zip_file = aso_zip_file($order_id,$item_id,$order_data['recaps']["output"],$dataUris);
				$order_data['zip'] = $aso_zip_file;
				wc_update_order_item_meta($item_id, "aso_meta_data", $order_data);
			echo ob_get_clean();
		}

	

	}
}
