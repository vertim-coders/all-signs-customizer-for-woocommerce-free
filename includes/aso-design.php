<?php
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
		add_action( 'wp_ajax_aso_generate_order_zip_file', [$this,'aso_generate_order_zip_file_ajax'] );
    add_action( 'wp_ajax_nopriv_aso_generate_order_zip_file', [$this,'aso_generate_order_zip_file_ajax'] );
		
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
			if(isset($previews["face1"])){
				$product_image_code = "<img class='aso-cartitem-img' src='" . esc_url($previews["face1"][0]) . "'>";	
			}else{
				$product_image_code = "<img class='aso-cartitem-img' src='" . esc_url($previews[0]) . "'>";	
			}
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
			$modal_id = uniqid('aso-recaps');
			ob_start();
			?>
			
			<div class="omodal fade o-modal wpc_part" id="<?php echo esc_attr($modal_id); ?>" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
				<div class="omodal-dialog">
					<div class="omodal-content">
						<div class="omodal-header">
							<button type="button" class="close" data-dismiss="omodal" aria-hidden="true">&times;</button>
						</div>
						<div class="omodal-body">
							<?php echo wp_kses_post($this->display_custom_recaps($cart_item['aso_meta_data']["recaps"],false)); ?>
						</div>
					</div>
				</div>
			</div>
			<?php 
				$preview_modal_id = uniqid('as-preview');
			?>
			<div class="omodal fade o-modal wpc_part" id="<?php echo esc_attr($preview_modal_id); ?>" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
				<div class="omodal-dialog">
					<div class="omodal-content">
						<div class="omodal-header">
							<button type="button" class="close" data-dismiss="omodal" aria-hidden="true">&times;</button>
						</div>
						<div class="omodal-body">
							<?php if(!isset($cart_item['aso_meta_data']["recaps"]["designImages"]["face1"])){ ?>
								<img src="<?php echo esc_url($cart_item['aso_meta_data']["recaps"]["designImages"][0])?>" style="
										width: auto;
										height: 500px;"/>
							<?php } else { ?>
								<div>
									<img src="<?php echo esc_url($cart_item['aso_meta_data']["recaps"]["designImages"]["face1"][0])?>" style="width: auto; height: 500px;"/>
								</div>
								<div>
									<img src="<?php echo esc_url($cart_item['aso_meta_data']["recaps"]["designImages"]["face2"][0])?>" style="width: auto; height: 500px;"/>
								</div>
							<?php } ?>
						</div>
					</div>
				</div>
			</div>
			<div class="aso-product-links">
				<span class="aso-cart-product-preview o-modal-trigger button" data-toggle="o-modal" data-target="#<?php echo esc_attr($modal_id); ?>"><?php echo esc_html($have_pages_settings["buttons"]["recapsButtonOnCart"]) ?></span>
				<span class="aso-cart-product-preview o-modal-trigger button" data-toggle="o-modal" data-target="#<?php echo esc_attr($preview_modal_id); ?>">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width: 20px;height: 20px;">
						<path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
						<path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
					</svg>
				</span>
			</div>
			<?php
			$product_name.=ob_get_clean();		
		}
		echo wp_kses_post($product_name);
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
							echo wp_kses_post($this->display_custom_recaps($cart_item['aso_meta_data']["recaps"],false));
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
								<img src="<?php echo esc_url($color["codeHex"])?>" style="position:absolute; width:100%; height:100;"/>
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
									<div>
										<span><?php echo esc_html($text["textContent"])?></span>
										<div class="aso-custom-options-info-infos" >
										<?php if($admin) { foreach ($text["values"] as $key => $position) {?>
											<span><?php echo esc_html( $position["label"]). ": " .esc_html( $position["value"]) ;?></span>
										<?php } } ?>
										</div>
									</div>
								<?php } ?>
							</div>
						<?php }
						} else{?>
							<?php foreach ($recaps["texts"]["value"] as $key => $text) {?>
								<div>
									<span><?php echo esc_html($text["textContent"])?></span>
									<div class="aso-custom-options-info-infos" >
										<?php if($admin) { foreach ($text["values"] as $key => $position) {?>
											<span><?php echo esc_html( $position["label"]). ": " .esc_html( $position["value"]) ;?></span>
										<?php } } ?>
									</div>
								</div>
							<?php }?>
					<?php } ?>
				</div>
			<?php } ?>
			<?php if( isset($recaps["images"]["value"]) && count($recaps["images"]["value"])>0 && $admin) {?>
			<div class="aso-custom-options-info">
				<label for=""><?php echo esc_html($recaps["images"]["label"])?>: </label>
				<?php if(isset($recaps["images"]["value"]["face1"])) {?>
					<?php foreach ($recaps["images"]["value"] as $key => $face) { ?>
						<div>
							<label for=""style="margin: 0 5px;"><?php echo esc_html($recaps["faces"][$key])?>: </label>
							<?php foreach ($face as $image) {?>
								<div class="aso-custom-options-info-infos" style="display: block !important;">
									<div>
										<p><?php echo esc_html__("file","all-signs-options-pro") . " : ". esc_html($image["infos"]["name"]) ?></p>
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
							<div class="aso-custom-options-info-infos" style="display: block !important;">
								<div>
									<p><?php echo esc_html__("file","all-signs-options-pro") . " : ". esc_html($image["infos"]["name"]) ?></p>
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
			<?php if ($admin) {?>
			<div class="aso-custom-options-info">
				<label for=""><?php echo esc_html__("Previews","all-signs-options-pro")?>: </label>
				<div>
					<?php if(!isset($recaps["designImages"]["face1"])) { ?>
						<?php foreach ($recaps["designImages"] as $key => $image) {?>
							<div style="display:flex; justify-content:center; align-items:center;">
								<div style="position:relative; width:fit-content">
									<img src="<?php echo esc_url($image)?>" style="width: auto; height: 50px;"/>
								</div>
								<div style="margin:10px 0">
									<a class="button alt aso_admin_download_image" href="<?php echo esc_url($image)?>" download><?php echo esc_html__( 'Download File', "all-signs-options-pro")?></a>
								</div> 
							</div>
						<?php } ?>
					<?php } else {?>
						<?php foreach ($recaps["designImages"] as $key => $face) {
							foreach ($face as $key => $image) {?>
								<div style="display:flex; justify-content:center; align-items:center;">
									<div style="position:relative; width:fit-content">
										<img src="<?php echo esc_url($image)?>" style="width: auto; height: 50px;"/>
									</div>
									<div style="margin:10px 0">
										<a class="button alt aso_admin_download_image" href="<?php echo esc_url($image)?>" download><?php echo esc_html__( 'Download File', "all-signs-options-pro")?></a>
									</div> 
								</div>
							<?php }
						} ?>
					<?php } ?>
				</div>
			</div>
			<?php } ?>
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
			echo wp_kses_post($this->display_custom_recaps($order_data["recaps"],true));
			if(isset($order_data["zip"])){?>
				<div style="margin:10px 0">
					<a class="button alt aso_admin_download_image" href="<?php echo esc_url($order_data["zip"])?>" download><?php echo esc_html__( 'Download Order Zip file', "all-signs-options-pro")?></a>
				</div> <?php 
			}else{
				?>
				<div style="margin:10px 0">
					<button class="button alt aso_admin_generate_zip_file" data-item-id="<?php echo esc_attr($item_id)?>" data-nonce="<?php echo wp_create_nonce('aso_generate_order_zip_file') ?>">
						<img src="<?php echo esc_url(ASO_ASSETS.'/images/im_loading.gif') ?>" style="width:10px !important; display:none;"/>
						<span><?php echo esc_html__( 'Generate Order Item Zip file', "all-signs-options-pro")?></span>
					</button>
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
								<button class="button aso-send-email" data-product-id="<?php echo esc_attr($product_id)?>" data-order='<?php echo wp_json_encode(["recaps"=>$order_data,"order_id"=>$order_id])?>'><?php echo __("Send Manufacturer mail","all-signs-options-pro")?></button>
							</div>
					<?php }
					}
				}
			} */
			
		}

	

	}

	public function aso_generate_order_zip_file_ajax(){
		if (wp_verify_nonce(sanitize_text_field( wp_unslash ($_POST['nonce'])), 'aso_generate_order_zip_file')) {
			if (isset($_POST['item_id'])) {
				$order_data   = wc_get_order_item_meta( $_POST['item_id'], 'aso_meta_data' );
				if ( isset( $order_data ) && !empty( $order_data ) ) {
					
					$uploads = [];

					if(isset($order_data['recaps']['images']["value"]['face1'])){
						foreach ($order_data['recaps']['images']["value"] as $key => $face) {
							foreach ($face as $key => $image) {
								array_push($uploads,$image["infos"]);
							}
						}
					}else{
						if(isset($order_data['recaps']['images']["value"])){
							foreach ($order_data['recaps']['images']["value"] as $key => $image) {							
								array_push($uploads,$image["infos"]);
							}
						}
					}

					$order_id = wc_get_order_id_by_order_item_id($_POST['item_id']);
					$aso_zip_file = $this->aso_zip_file($order_id,$_POST['item_id'],$order_data['recaps']["output"],$order_data['recaps']['designImages'],$uploads,$order_data["recaps"]["sign"]["size"]["value"]);
					$order_data['zip'] = $aso_zip_file;
					wc_update_order_item_meta($_POST['item_id'], "aso_meta_data", $order_data);
					wp_send_json(array(
						'success'     => true,		
					));
				}
				wp_send_json(array(
					'success'     => false,		
					"message"=>"No meta data found on item id"
				));
			}
			wp_send_json(array(
				'success'     => false,		
				"message"=>"No item id found"
			));
		}
		wp_send_json(array(
			'success'     => false,		
			"message"=>"nonce invalid"
		));
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
			if (is_account_page()) {
				echo wp_kses_post($this->display_custom_recaps($order_data["recaps"],true));
			}
		}

	}

	private function aso_zip_file($order_id, $item_id, $output_settings, $previews, $uploads, $sizes) {
		$outputOptions = get_option("aso_output_options", []);
		$upload_dirs = ASO_IMAGE_PATH;
		wp_mkdir_p($upload_dirs);
		if (isset($outputOptions["zipName"]) && $outputOptions["zipName"] == true) {
			if (isset($output_settings["prefix"]) && !empty($output_settings["prefix"])) {
				$zip_file = "/" . $output_settings["prefix"] . $order_id . "-$item_id.zip";
			} else {
				$zip_file = "/" . $order_id . "-$item_id.zip";
			}
		} else {
			if (isset($output_settings["prefix"]) && !empty($output_settings["prefix"])) {
				$zip_file = "/" . $output_settings["prefix"] . "aso-$item_id.zip";
			} else {
				$zip_file = "/" . "aso-$item_id.zip";
			}
		}
		if(!file_exists($upload_dirs . $zip_file)){
			$zip = new ZipArchive();
			if ($zip->open($upload_dirs . $zip_file, ZipArchive::CREATE) === TRUE) {
				foreach ($uploads as $index => $upload) {
					$file = ASO_IMAGE_PATH . DIRECTORY_SEPARATOR . $upload["name"];
					if (file_exists($file)) {
						$file_content = file_get_contents($file);
						$zip->addFromString(basename($file), $file_content);
						wp_delete_file($file);
					}
				}
				preg_match('/^([\d.]+)\s*(\w*)$/', trim($sizes["width"]["value"]), $matches);
			
				$pdfs = $this->save_pdf_output("px", $previews);
				if(is_array($pdfs) && count($pdfs)>0){
					foreach ($pdfs as $key => $pdf) {
						if (file_exists($pdf)) {
							$pdf_content = file_get_contents($pdf);
							$zip->addFromString(basename($pdf), $pdf_content);
							wp_delete_file($pdf);
						}
					}
				}
				$zip->close();
			}
		}
	
	
		return ASO_IMAGE_URL . $zip_file;
	}
	

	private function convertToNumber($chaine) {
		preg_match('/^([\d.]+)\s*(\w*)$/', trim($chaine), $matches);
	
		if (count($matches) >= 2) {
			$nombre = floatval($matches[1]);
			$unite = isset($matches[2]) ? strtolower($matches[2]) : '';
			switch ($unite) {
				case 'mm':
					return $nombre;
				case 'cm':
					return $nombre * 10;
				case 'm':
					return $nombre * 1000;
				case 'in':
					return $nombre * 25.4;
				default:
					return $nombre;
			}
		} else {
			return 0;
		}
	}
	
	
	
	private function save_pdf_output(string $unit, array $prevImages) {

		if(isset($prevImages["face1"])){
			$url = [];
			foreach ($prevImages as $key => $face) {
				$path_parts = pathinfo($face[0]);
				$ext = $path_parts['extension'];
				$output_file = $path_parts["filename"];
				$width = 1080;
				$height = 800;
				$response = wp_remote_get($face[0]);
				if (is_wp_error($response)) {
					echo "File not found : " . $response->get_error_message();
				} else {
					$file_content = wp_remote_retrieve_body($response);
				
					if ($file_content !== false) {
						$image_info = getimagesizefromstring($file_content);
						if ($image_info !== false) {
							$width = $image_info[0]*2.5;
							$height = $image_info[1]*2.5;
						}
					}
				}

				$upload_dirs = ASO_IMAGE_PATH;
				wp_mkdir_p($upload_dirs);
				$output_file = $upload_dirs . DIRECTORY_SEPARATOR . $path_parts["filename"] . '.pdf';
				if ($ext != 'svg') {
					require_once ASO_INCLUDES . DIRECTORY_SEPARATOR . 'tcpdf' . DIRECTORY_SEPARATOR . 'tcpdf.php';
					$pdf_orientation = "p";
					$pdf_margin_lr = 0;
					$pdf_margin_tb = 0;
					define('MILIMETER_VALUE', 0.264583333);
			
					//$pdf_unit = PDF_UNIT;
					$pdf_width = round($width); // Arrondir la largeur
					$pdf_height = round($height); // Arrondir la hauteur
					$pdf_unit = $unit;
			
					$pdf_format = array($pdf_width, $pdf_height);
			
					$pdf = new TCPDF($pdf_orientation, $pdf_unit, $pdf_format, true, 'UTF-8', false);
			
					$pdf->SetCreator('All Signs Options by Vertim Coders');
					$pdf->SetAuthor('All Signs Options by Vertim Coders');
					$pdf->SetTitle('Output');
					$pdf->setPrintHeader(false);
					$pdf->setPrintFooter(false);
			
					// set default monospaced font.
					$pdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);
			
					// set margins.
					$pdf->SetMargins($pdf_margin_lr, $pdf_margin_tb, -1, true);
					$pdf->SetHeaderMargin($pdf_margin_tb);
					$pdf->SetFooterMargin($pdf_margin_tb);
			
					// set auto page breaks.
					$pdf->SetAutoPageBreak(true, $pdf_margin_tb);
			
					// set image scale factor.
					$pdf->setImageScale(PDF_IMAGE_SCALE_RATIO);
			
					$pdf->AddPage();
			
					$pdf->Image(
						$face[0], // Input file.
						'', // File left position value.
						'', // File top position value.
						$pdf_width, // File Width value.
						0, // File Height value.
						'', // File type.
						'', // File link.
						'', // File align position.
						true, // Can resize file.
						300, // File resolution DPI.
						'C', // Page Align.
						false, // Imask.
						false, // Image mask.
						0, // Border.
						false, // Fit box.
						false, // Hidden.
						false, // Fit on page.
						false, // Alt.
						array() // Alt image.
					);
			
					$pdf->Output($output_file, 'F');
					$url[]= $output_file;
				}
			}
			return $url;
		}else{
			$path_parts = pathinfo($prevImages[0]);
			$ext = $path_parts['extension'];
			$output_file = $path_parts["filename"];

			$width = 1080;
			$height = 800;
			$response = wp_remote_get($prevImages[0]);
			if (is_wp_error($response)) {
				error_log("File not found : " . $response->get_error_message());
			} else {
				$file_content = wp_remote_retrieve_body($response);
			
				if ($file_content !== false) {
					$image_info = getimagesizefromstring($file_content);
					if ($image_info !== false) {
						$width = $image_info[0]*10;
						$height = $image_info[1]*10;
					}
				}
			}
			$upload_dirs = ASO_IMAGE_PATH;
			wp_mkdir_p($upload_dirs);
			$output_file = $upload_dirs . DIRECTORY_SEPARATOR . $path_parts["filename"] . '.pdf';
			if ($ext != 'svg') {
				require_once ASO_INCLUDES . DIRECTORY_SEPARATOR . 'tcpdf' . DIRECTORY_SEPARATOR . 'tcpdf.php';
				$pdf_orientation = "p";
				$pdf_margin_lr = 10;
				$pdf_margin_tb = 10;
				define('MILIMETER_VALUE', 0.264583333);
		
				//$pdf_unit = PDF_UNIT;
				$pdf_width = round($width); // Arrondir la largeur
				$pdf_height = round($height); // Arrondir la hauteur
				$pdf_unit = $unit;
		
				$pdf_format = array($pdf_width, $pdf_height);
		
				$pdf = new TCPDF($pdf_orientation, $pdf_unit, $pdf_format, true, 'UTF-8', false);
		
				$pdf->SetCreator('All Signs Options by Vertim Coders');
				$pdf->SetAuthor('All Signs Options by Vertim Coders');
				$pdf->SetTitle('Output');
				$pdf->setPrintHeader(false);
				$pdf->setPrintFooter(false);
		
				// set default monospaced font.
				$pdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);
		
				// set margins.
				$pdf->SetMargins($pdf_margin_lr, $pdf_margin_tb, -1, true);
				$pdf->SetHeaderMargin($pdf_margin_tb);
				$pdf->SetFooterMargin($pdf_margin_tb);
		
				// set auto page breaks.
				$pdf->SetAutoPageBreak(true, $pdf_margin_tb);
		
				// set image scale factor.
				$pdf->setImageScale(PDF_IMAGE_SCALE_RATIO);
		
				$pdf->AddPage('L');
		
				$pdf->Image(
					$prevImages[0], // Input file.
					'', // File left position value.
					'', // File top position value.
					$pdf_width, // File Width value.
					0, // File Height value.
					'', // File type.
					'', // File link.
					'', // File align position.
					true, // Can resize file.
					300, // File resolution DPI.
					'C', // Page Align.
					false, // Imask.
					false, // Image mask.
					0, // Border.
					false, // Fit box.
					false, // Hidden.
					false, // Fit on page.
					false, // Alt.
					array() // Alt image.
				);
		
				$pdf->Output($output_file, 'F');
				return [$output_file];
			}
		}
		return false;
	}
	

	
}
