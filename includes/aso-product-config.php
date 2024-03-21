<?php

 /**
 * the class summarizing the actions of aso on a product
 */
 class ASO_Product_Config {

    //ID of a product variant or not
    public $variation_id;

    //product root  ID
    public $root_product_id;

    //the product itself
    public $product;

    //product related settings
    public $settings;

    //Class contructor
    public function __construct( $id=0 ) {
		if ( $id!=0 ) {
			$this->root_product_id = $this->get_parent( $id );
			// If it's a variable product
			if ( $id !== $this->root_product_id ) {
				$this->variation_id = $id;
			}// Simple product and others
			else {
				$this->variation_id = $this->root_product_id;
			}
			$this->product = wc_get_product( $id );

			$config        = get_post_meta( $this->variation_id, 'product-aso-metas', true );

			if ( isset( $config[ $this->variation_id ] ) ) {
				$config_id = $config[ $this->variation_id ];
				if ( isset($config_id['config-id']) ) {
					$this->settings = get_post_meta( $config_id['config-id'], 'aso-configs-meta', true );
				}
			}
		}
    }
	/**
	 * All hooks related to attaching a product config
	 */
	public function init_hooks(){
		add_action( 'woocommerce_product_options_general_product_data', array($this,'get_product_config_selector'));
		add_action( 'woocommerce_product_after_variable_attributes', array( $this, 'get_variation_product_config_selector' ), 10, 3 );
		add_action( 'woocommerce_save_product_variation', array($this, 'save_config') );
		add_action( 'save_post_product', array($this, 'save_config' ));
		add_filter( 'manage_edit-product_columns', array($this, 'get_product_columns'),10 );
		add_filter( 'woocommerce_cart_item_thumbnail', [$this, 'get_aso_data_image'], 99, 3 );
		add_action('woocommerce_after_cart_item_name', [$this,'display_previewBtn_editBtn_in_cart'], 10, 1);
		add_action( 'woocommerce_before_calculate_totals', [$this, 'get_cart_item_price'], 10,1 );
		add_action( 'manage_product_posts_custom_column', array($this, 'get_products_columns_values'), 10, 2 );
		add_action( 'woocommerce_after_add_to_cart_button', array($this, 'hide_cart_button' ));
		add_action( 'woocommerce_after_add_to_cart_button', array($this, 'get_customize_btn' ));
		add_filter( 'woocommerce_loop_add_to_cart_link', array($this, 'get_customize_btn_on_shop_page'), 10, 2 );
		add_action( 'woocommerce_single_product_summary', array($this,'get_button_on_single_product_summary'), 5 );
	}


	/**
	 * 
	 */
	public function get_cart_item_price( $cart ) {
		
		if (is_admin() && !defined('DOING_AJAX')) return;


		foreach ( $cart->cart_contents as $cart_item_key => $cart_item ) {
			if ( $cart_item['variation_id'] ) {
				$variation_id = $cart_item['variation_id'];
			} else {
				$variation_id = $cart_item['product_id'];
			}


			if ( isset( $cart_item['aso_recaps'] ) ) {
				$a_price = 0;
				if ( isset( $cart_item['aso_recaps']['aso_custom_price'] ) ) {
					$a_price += $cart_item['aso_recaps']['aso_custom_price'];
				}
				
				$item_price = $a_price;
				$item_price = apply_filters( 'aso_cart_item_price', $item_price, $variation_id );
	
				$cart_item['data']->set_price( $item_price );
			}

			// Ajout d'un filtre pour mettre à jour le prix total de l'element dans le panier.
		}
	}

	/**
	 * 
	 */
	public function display_previewBtn_editBtn_in_cart($cart_item, $cart_item_key){
		$product = $cart_item['data'];
		
		// Construisez les URL pour les aperçus et les éditions (ajustez selon vos besoins)
		$preview_url = get_permalink($product->get_id());

		//$preview_data = get_transient( 'preview_' . $product->get_id() );

		$npd_product = new aso_Product_Config( $product->get_id() );

		$edit_url = $npd_product->get_design_url() . '?edit=' . $cart_item_key;
		$product_name = '';
		if(isset($cart_item['aso_recaps'])){
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
							<?php foreach( $cart_item['aso_recaps'] as $key=> $value) {?>
								<?php if($key !='aso_custom_price' && $key != 'aso_additional_option') {
									$name = explode('_', $key);
									if(in_array('color', $name) || in_array('face', $name) || in_array('trim', $name) || in_array('side', $name) || in_array('back', $name)) {
										
										$name = $value['label'];
										
										$value = explode('/', $value['value']);
										$resultat = preg_split("/\)|,|\(/", $value[1], -1, PREG_SPLIT_NO_EMPTY);
										$resultat = implode(",", $resultat);
										$elements = count(explode(",", $resultat));
										$resultat=trim($resultat);
										?>
										<div class="aso-custom-options-info">
											<label for=""><?php echo esc_html($name)?>: </label>
											<span><?php echo esc_html($value[0])?></span>
											<?php if($elements > 1) { ?>
												<div class="aso-cart-color-option" style="background:linear-gradient(to right bottom,<?php echo esc_attr($resultat)?>);"></div>
											<?php }else{ ?>
												<div class="aso-cart-color-option" style="background:<?php echo esc_attr($resultat)?>;"></div>
											<?php } ?>
										</div>
							<?php	}else{
										$name = $value['label'];
										if($key == "aso_text"){ ?>
											<div class="aso-custom-options-info">
												<div style="display:flex; justify-content: center;">
													<label for=""><?php echo esc_html($name)?>: </label>
													<div style="display:flex; flex-direction:column; justify-content:center;">
														<?php
															foreach ($value['value'] as $key => $v) {?>
																<span><?php echo esc_html($v)?></span>
														<?php } ?>
													</div>
												</div>
											</div>
										<?php }else{ ?>
										
												<div class="aso-custom-options-info">
													<label for=""><?php echo esc_html($name)?>: </label>
													<span><?php echo esc_html($value['value'])?></span>
												</div>
									<?php 	}
									
									}
									
								}else if($key == 'aso_additional_option'){
									foreach($value as $value2) { ?>
										<div class="aso-custom-options-info">
											<label for=""><?php echo esc_html($value2["label"])?>: </label>
											<span><?php echo esc_html($value2["value"])?></span>
										</div>
							<?php 	}
								}
									?>
					<?php 	} ?>
						</div>
					</div>
				</div>
			</div>
			<div class="aso-product-links">
				<span class="aso-cart-product-preview o-modal-trigger button" data-toggle="o-modal" data-target="#<?php echo esc_attr($modal_id); ?>"><?php echo __("Custom Options","ASO")?></span>
				<!-- <a href="<?php echo esc_url($edit_url)?>" target="_blank"><?php echo __("Back to custom page","ASO")?></a> -->
			</div>
			<?php
			$product_name.=ob_get_clean();		
		}
		echo $product_name;
	}
	
	/**
	 * 
	 */
	public function get_aso_data_image( $product_image_code, $values, $cart_item_key ) {
		if ( $values['variation_id'] ) {
			$product_id = $values['variation_id'];
		} else {
			$product_id = $values['product_id'];
		}
		if ( isset( $values['aso_preview_img'] ) && !empty( $values['aso_preview_img'] ) ) {
			$product_image_url  = $values['aso_preview_img'];
			$product_image_code = "<img class='aso-cartitem-img' src='" . $product_image_url . "'>";
		}

		return $product_image_code;
	}
    /**
     * @param int $id lidentifier of the product
     * @return int the identifier of the parent of the product 
     * if it is a variable product otherwise returns the same identifier
     */
    public function get_product_parent_ID(int $id){
        $variable_product = wc_get_product( $id );
		if ( ! $variable_product ) {
			return false;
		}
		if ( $variable_product->is_type('variable') ) {
			$product_id = $id;
		} else {
			$product_id = $variable_product->get_parent_id();
		}

		return $product_id;
    }

	/**
	 * Configuration Selector from product admin page
	 */
	public function get_product_config_selector() {
		$id = get_the_ID();

		$args        = array(
			'post_type' => 'aso-configs',
			'nopaging'  => true,
		);
		$configs     = get_posts( $args );
		
		$configs_ids = array( ['' => 'None'] );
		foreach ( $configs as $config ) {
			$configs_ids[ $config->ID ] = ['title'=>$config->post_title];
		}
		?>
		<div class="aso_config_data show_if_simple">
			<?php
			$this->display_aso_config_on_WC_product_config( $id, $configs_ids, __('Attach this product to All Signs Options configuration',"ASO") );
			?>
		</div>
		<?php
	}

	/**
	* Assign configuration to product
	*/
	private function display_aso_config_on_WC_product_config( $pid, $configs_ids, $title ) {
		$meta = get_post_meta($pid,'product-aso-metas',true);
		$container="<div class='bg-black p-4'>".
			"<h2>".esc_html($title)."</h2>".
			"<div>
				<select name='product-aso-metas[".esc_attr($pid)."][config-id]'>";
				
					foreach ($configs_ids as $id=>$values) {
						foreach($values as $value){
							$container.= "<option value='".esc_attr($id)."' ";
								if(isset($meta[$pid]["config-id"]) && $meta[$pid]["config-id"]==$id){
									$container.=' selected';
								}
								$container.=">".esc_html($value)."</option>";
						}
					}
				$container.="</select>";
				$container.="<input type='hidden' name='aso_config_nonce' value='".wp_create_nonce( 'aso_config_nonce' )."'/>
			</div></div>";
		echo $container;
	}

	/**
	 * Assign configuration to product variation
	 */
	public function get_variation_product_config_selector( $loop, $variation_data, $variation ) {
		$id = $variation->ID;

		// Ici, vous pouvez ajouter un code spécifique si nécessaire pour chaque variation
		// par exemple, vérifier les propriétés ou les attributs de la variation, si vous avez besoin de personnaliser davantage.

		
		$args        = array(
			'post_type' => 'aso-configs',
			'nopaging'  => true,
		);
		$configs     = get_posts( $args );
		$configs_ids = array( ['' => 'None'] );
		foreach ( $configs as $config ) {
			$configs_ids[ $config->ID ] = ['title'=> $config->post_title];
		}
		?>
		<tr>
			<td>
				<div class="aso_config_data show_if_simple">
				<?php
				$this->display_aso_config_on_WC_product_config( $id, $configs_ids, __('Attach this product to All Signs Options configuration',"ASO") );
				?>
				</div>
			</td>
		</tr>
		<?php
	}

	/**
	 * Save the chosen configuration to the product
	 */
	public function save_config( $post_id ) {
		$meta_key = 'product-aso-metas';
		if ( isset($_POST['aso_config_nonce']) && wp_verify_nonce( sanitize_text_field( wp_unslash ( $_POST['aso_config_nonce'] ) ) , 'aso_config_nonce' ) && isset( $_POST[ $meta_key ] ) ) {
			$meta_value = map_deep( $_POST[ $meta_key ], 'sanitize_text_field' );
			update_post_meta( $post_id, $meta_key, $meta_value );
		}
	}
	
	/**
	 * Adds the Custom column to the default products list to help identify which ones are custom
	 *
	 * @param array $defaults Default columns
	 * @return array $defaults result
	 */
	function get_product_columns( $defaults ) {
		$defaults['is_aso_customizable'] = __( "All Signs Options", "ASO" );
		return $defaults;
	}
	/**
	 * Sets the Custom column value on the products list to help identify which ones are custom
	 *
	 * @param string $column_name Column name
	 * @param int $id Product ID
	 */
	public function get_products_columns_values( $column_name, $id ) {
		if ( $column_name === 'is_aso_customizable' ) {
			$aso_metas = get_post_meta( $id, 'product-aso-metas', true );
			if ( isset( $aso_metas[ $id ]['config-id'] ) && get_post($aso_metas[ $id ]['config-id'])) {
				if ( empty( $aso_metas[ $id ]['config-id'] ) ) {
					esc_attr_e( 'No', "ASO" );
				} else {
					esc_attr_e( "Yes", "ASO" );
				}
			} else {
				esc_attr_e( 'No', "ASO" );
			}
		}
	}

	public function is_aso_customizable() {
		return ( ! empty( $this->settings ) );
	}


	public function get_buttons( $with_upload = false ) {
		ob_start();
		$content      = '';
		$product      =  $this->product;

		if ( $this->variation_id ) {
			$item_id = $this->variation_id;
		} else {
			$item_id = $this->root_product_id;
		}
		
		if ( $product->is_type('variable')) {
			$variations = $product->get_available_variations();
			foreach ( $variations as $variation ) {
				if ( ! $variation['is_purchasable'] || ! $variation['is_in_stock'] ) {
					continue;
				}
				$aso_product = new aso_Product_Config( $variation['variation_id'] );
				if( $aso_product->is_aso_customizable() ) {
					echo $aso_product->get_buttons( $with_upload );
				}
			}
			
		} else {
			
			?>
			<div class="aso-buttons-wrap-<?php echo esc_attr($product->get_type()); ?>" data-id="<?php echo esc_attr($this->variation_id); ?>">
					
			<?php

			
			$default_design_btn_url = $this->get_design_url();
			$content               .= '<a  href="' . $default_design_btn_url . '" class="button aso-design-product">' . apply_filters( 'aso_default_design_btn_filter', __( 'Make Your Sign', "ASO" ) ) . '</a>';

			if ( ! isset( $item_id ) ) {
				$item_id = '';
			}
			if ( ! isset( $default_design_btn_url ) ) {
				$default_design_btn_url = '';
			}
			echo wp_kses_post(apply_filters( 'aso_show_customization_buttons_in_modal', wp_kses_post($content), $item_id, $default_design_btn_url, $product->get_type() ));
			?>
			</div>
			<?php
		}
		
		$output = ob_get_clean();
		return $output;
	}

		/**
	 * Returns the customization page URL
	 *
	 * @global array $aso_settings
	 * @param int   $design_index Saved design index to load
	 * @param mixed $cart_item_key Cart item key to edit
	 * @param int   $order_item_id Order item ID to load
	 * @param int   $tpl_id ID of the template to load
	 * @return string
	 */
	public function get_design_url( $design_index = false, $cart_item_key = false, $order_item_id = false, $tpl_id = false ) {

		//global $wp_query;
		if ( $this->variation_id ) {
			$item_id = $this->variation_id;
		} else {
			$item_id = $this->root_product_id;
		}


		$page_settings = get_option("aso_config_page");
		if ( !empty($page_settings) && $page_settings != false ) {
			$configPage = $page_settings["configuratorPage"];
			if($configPage != 0){
				$aso_page_id = $configPage;
			}
			else {
				$aso_page_id = false;
			}
		} else {
			$aso_page_id = false;
		}
		


		$aso_page_url = '';
		if ( $aso_page_id ) {

			$aso_page_url = get_permalink( $aso_page_id );

			if ( $item_id ) {
				$query = wp_parse_url( $aso_page_url, PHP_URL_QUERY );
				// Returns a string if the URL has parameters or NULL if not
				if ( get_option( 'permalink_structure' ) ) {
					if ( substr( $aso_page_url, -1 ) !== '/' ) {
						$aso_page_url .= '/';
					}elseif ( $cart_item_key ) {
						$qty_key       = 'qty_' . $cart_item_key . '_' . $item_id;
						$aso_page_url .= "edit/$item_id/$cart_item_key/" . '?custom_qty=' . get_option( $qty_key, $this->get_purchase_properties()['min_to_purchase'] );
					} elseif ( $order_item_id ) {
						$aso_page_url .= "ordered-design/$item_id/$order_item_id/";
						$aso_page_url  = apply_filters( 'aso_customized_order_page_url', $aso_page_url );
					} else {
						$aso_page_url .= 'aso-design/' . $item_id . '/';
						if ( $tpl_id ) {
							$aso_page_url .= "$tpl_id/";
						}
					}
				} else {
					if ( $design_index !== false ) {
						$aso_page_url .= '&aso-product-id' . $item_id . '&design_index=' . $design_index;
					} elseif ( $cart_item_key ) {
						$qty_key       = 'qty_' . $cart_item_key . '_' . $item_id;
						$aso_page_url .= '&aso-product-id' . $item_id . '&edit=' . $cart_item_key . '&custom_qty=' . get_option( $qty_key, $this->get_purchase_properties()['min_to_purchase'] );
					} elseif ( $order_item_id ) {
						$aso_page_url .= '&aso-product-id' . $item_id . '&vcid=' . $order_item_id;
					} else {
						$aso_page_url .= '&aso-product-id' . $item_id;
						if ( $tpl_id ) {
							$aso_page_url .= "&tpl=$tpl_id";
						}
					}
				}
			}
		}

		return $aso_page_url;
	}
	/**
	 * Returns the minimum and maximum order quantities
	 *
	 * @return array
	 */
	public function get_purchase_properties() {
		if ( $this->variation_id ) {
			$defined_min_qty = get_post_meta( $this->variation_id, 'variation_minimum_allowed_quantity', true );
			// We consider the values defined for the all of them
			if ( ! $defined_min_qty ) {
				$defined_min_qty = get_post_meta( $this->root_product_id, 'minimum_allowed_quantity', true );
			}

			$defined_max_qty = get_post_meta( $this->variation_id, 'variation_maximum_allowed_quantity', true );
			// We consider the values defined for the all of them
			if ( ! $defined_max_qty ) {
				$defined_max_qty = get_post_meta( $this->root_product_id, 'maximum_allowed_quantity', true );
			}
		} else {
			$defined_min_qty = get_post_meta( $this->root_product_id, 'minimum_allowed_quantity', true );
			if ( ! $defined_min_qty ) {
				$defined_min_qty = 1;
			}

			$defined_max_qty = get_post_meta( $this->root_product_id, 'variation_maximum_allowed_quantity', true );
		}

		$step    = apply_filters( 'woocommerce_quantity_input_step', '1', $this->product );
		$min_qty = apply_filters( 'woocommerce_quantity_input_min', $defined_min_qty, $this->product );

		if ( ! $defined_max_qty ) {
			$defined_max_qty = apply_filters( 'woocommerce_quantity_input_max', $this->product->backorders_allowed() ? '' : $this->product->get_stock_quantity(), $this->product );
		}

		$min_to_purchase = $min_qty;
		if ( ! $min_qty ) {
			$min_to_purchase = 1;
		}

		$defaults = array(
			'max_value' => $defined_max_qty,
			'min_value' => $min_to_purchase,
			'step'      => $step,
		);
		$args     = apply_filters( 'woocommerce_quantity_input_args', wp_parse_args( array(), $defaults ), $this->product );

		return array(
			'min'             => $args['min_value'],
			'min_to_purchase' => $args['min_value'],
			'max'             => $args['max_value'],
			'step'            => $args['step'],
		);
	}
	/**
	 * Hide add to cart button on product details page
	 */
	public function hide_cart_button() {
		global $product;
		$pid                 = $product->get_id();
		$configs = get_post_meta($pid,"product-aso-metas",true);
		if ( isset( $configs[ $pid ]['config-id'] )){
			$config_id = $configs[$pid];
			$meta_value = get_post_meta((int)$config_id['config-id'],"aso-configs-meta",true);
			$general_options  = $meta_value["settings"]["generals"]["product"]??null;
			$custom_products     = aso_get_custom_products();
			$anonymous_function  = function ( $vc ) {
				return $vc->id;
			};
			$custom_products_ids = array_map( $anonymous_function, $custom_products );
			if ( in_array( $pid, $custom_products_ids ) && $general_options!=null && $general_options['hideAddToCartButtonCustomProducts'] ) {
				wp_localize_script("aso-product-design","cart_hide_button",[
					"hide_cart_button"=>$general_options['hideAddToCartButtonCustomProducts']
				]);
				add_action( 'wp_footer', [$this,'aso_product_page_script_init'] );
			}
		}
	}
	public function aso_product_page_script_init() { 
		global $product;
		$pid                 = $product->get_id();
		
		$inline_script = "		
			jQuery(\"[value='".esc_html($pid). "']\").parent().find('.add_to_cart_button').hide();
			jQuery(\"[value='".esc_html($pid). "']\").parent().find('.single_add_to_cart_button').hide();
		";
        wp_add_inline_script( 'aso-product-design', $inline_script );
		?>
	<?php
	}
	/**
	 * Add Custom button on details product page
	 */
	public function get_customize_btn() {
		$product_id  = get_the_ID();
		$aso_product = new aso_Product_Config( $product_id );
		$product     = wc_get_product( $product_id );
		
		if ( $aso_product->is_aso_customizable() && 'simple' === $product->get_type() ) {
			echo wp_kses_post($aso_product->get_buttons( true ));
		} elseif ( 'variable' === $product->get_type() ) {
			echo wp_kses_post($aso_product->get_buttons( true ));
		}
	}
	/**
	 * Add a personalization button on the shop page
	 */
	public function get_customize_btn_on_shop_page( $html, $product ) {
		
		$configs = get_post_meta($product->get_id(),"product-aso-metas",true);
		$meta_value = isset($configs[$product->get_id()]['config-id']) ? get_post_meta((int)$configs[$product->get_id()]['config-id'],"aso-configs-meta",true) : [];
		$general_options  = $meta_value["settings"]["generals"]["product"]??null;
		
		if ( $general_options==null || $general_options["hideDesignButtonsOnShopPage"] ) {
			return $html;
		}

		$product_class = get_class( $product );
		
		if ( $product_class == 'WC_Product_Simple' ) {
			$aso_product = new aso_Product_Config( $product->get_id() );
			if ( $aso_product->is_aso_customizable() ) {
				$html .= wp_kses_post($aso_product->get_buttons());
			}
			
			return $html;
		}
	}

	/**
	 * Add css class on detail product page in order to hide or no add to cart button 
	 */
	public function get_button_on_single_product_summary(  ) {
		global $post;
		global $product;
		$pid                 = $post->ID;
		$configs = get_post_meta($pid,"product-aso-metas",true);
		if(isset($configs[$pid]['config-id'])) {
			$config_id = $configs[$pid]['config-id'];
			$meta_value = get_post_meta($config_id,"aso-configs-meta",true);
			
			$general_options  = $meta_value["settings"]["generals"]["product"] ?? null;
			$custom_products     = aso_get_custom_products();
			$anonymous_function  = function ( $vc ) {
				return $vc->id;
			};
			$custom_products_ids = array_map( $anonymous_function, $custom_products );
			
			if ( in_array( $pid, $custom_products_ids ) ) {
				if ( $general_options!=null && !$general_options['hideAddToCartButtonCustomProducts'] ) {
					$aso_product = new aso_Product_Config( $product->get_id() );
					if ( $aso_product->is_aso_customizable() ) {
						echo wp_kses_post($aso_product->get_buttons());
					}
				}
			}
		}
	}

		/**
	 * Returns a variation root product ID
	 *
	 * @param int $variation_id Variation ID
	 * @return int
	 */
	public function get_parent( $variation_id ) {
		$variable_product = wc_get_product( $variation_id );
		if ( ! $variable_product ) {
			return false;
		}
		if ( $variable_product->get_type() !== 'variation' ) {
			$product_id = $variation_id;
		} else {
			$product_id = $variable_product->get_parent_id();
		}

		return $product_id;
	}


 }