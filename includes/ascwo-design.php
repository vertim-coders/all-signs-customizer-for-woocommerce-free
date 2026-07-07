<?php
/**
 * Contains all methods and hooks callbacks related to the design
 *
 * @author Vertim Coders
 */
class ASCWO_Design
{

	/**
	 * Set all aso configuration initialization hooks
	 */
	public function init_hooks()
	{
		//cart
		add_action('woocommerce_before_calculate_totals', [$this, 'ascwo_change_product_price_in_cart'], 10, 1);
		add_filter('woocommerce_cart_item_thumbnail', [$this, 'ascwo_change_product_image_in_cart'], 99, 3);
		add_action('woocommerce_after_cart_item_name', [$this, 'display_previewBtn_editBtn_in_cart'], 10);
		add_filter('woocommerce_get_item_data', [$this, 'display_recaps_config_on_checkout_page'], 20, 2);

		//admin data
		add_action('woocommerce_after_order_itemmeta', [$this, 'get_order_custom_admin_data'], 10, 3);
		add_action('woocommerce_checkout_create_order_line_item', [$this, 'capture_product_metadata_to_order'], 10, 4);
		add_action('wp_ajax_ascwo_generate_order_zip_file', [$this, 'ascwo_generate_order_zip_file_ajax']);
		add_action('wp_ajax_nopriv_ascwo_generate_order_zip_file', [$this, 'ascwo_generate_order_zip_file_ajax']);
		add_action('template_redirect', [$this, 'handle_download_request']);

		// Emails.
		//add_action( 'woocommerce_order_item_meta_start', [$this, 'mail_template'],10, 3);
		add_filter('woocommerce_email_attachments', [$this, 'custom_email_attachments'], 10, 4);
		add_action('woocommerce_order_item_meta_end', [$this, 'mail_template'], 11, 4);
	}

	/**
	 * Build a signed URL that forces browser download for generated files.
	 *
	 * @param string $file_url Generated file URL.
	 * @return string
	 */
	public function get_forced_download_url($file_url)
	{
		$file_url = trim((string) $file_url);
		$base_url = trailingslashit(ASCWO_IMAGE_URL);
		$relative_path = '';

		if (0 === strpos($file_url, $base_url)) {
			$relative_path = ltrim(substr($file_url, strlen($base_url)), '/');
		} else {
			$file_url_path = wp_parse_url($file_url, PHP_URL_PATH);
			$base_url_path = wp_parse_url($base_url, PHP_URL_PATH);

			if ($file_url_path && $base_url_path) {
				$base_url_path = trailingslashit($base_url_path);
				if (0 === strpos($file_url_path, $base_url_path)) {
					$relative_path = ltrim(substr($file_url_path, strlen($base_url_path)), '/');
				}
			}
		}

		if ('' === $relative_path) {
			return $file_url;
		}

		$relative_path = rawurldecode($relative_path);

		return add_query_arg(
			array(
				'ascwo_download' => $relative_path,
				'token' => wp_hash($relative_path . '|ascwo_download'),
			),
			home_url('/')
		);
	}

	/**
	 * Serve generated files as attachments instead of inline browser previews.
	 */
	public function handle_download_request()
	{
		if (empty($_GET['ascwo_download']) || empty($_GET['token'])) {
			return;
		}

		$relative_path = rawurldecode(sanitize_text_field(wp_unslash($_GET['ascwo_download'])));
		$relative_path = ltrim(str_replace('\\', '/', $relative_path), '/');
		$token = sanitize_text_field(wp_unslash($_GET['token']));

		if (preg_match('#(^|/)\.\.(/|$)#', $relative_path)) {
			wp_die(esc_html__('Invalid download path.', 'all-signs-customizer-for-woocommerce'), 403);
		}

		if (!hash_equals(wp_hash($relative_path . '|ascwo_download'), $token)) {
			wp_die(esc_html__('Invalid download token.', 'all-signs-customizer-for-woocommerce'), 403);
		}

		$base_path = realpath(ASCWO_IMAGE_PATH);
		$file_path = ASCWO_IMAGE_PATH . DIRECTORY_SEPARATOR . $relative_path;
		$real_file_path = realpath($file_path);
		$normalized_base_path = $base_path ? trailingslashit(wp_normalize_path($base_path)) : '';
		$normalized_file_path = $real_file_path ? wp_normalize_path($real_file_path) : '';

		if (!$normalized_base_path || !$normalized_file_path || 0 !== strpos($normalized_file_path, $normalized_base_path) || !is_file($real_file_path)) {
			wp_die(esc_html__('File not found.', 'all-signs-customizer-for-woocommerce'), 404);
		}

		nocache_headers();
		header('Content-Type: application/octet-stream');
		header('Content-Disposition: attachment; filename="' . sanitize_file_name(basename($real_file_path)) . '"');
		header('Content-Length: ' . filesize($real_file_path));
		readfile($real_file_path);
		exit;
	}

	/**
	 * 
	 */
	public function ascwo_change_product_price_in_cart($cart)
	{
		if (is_admin() && !wp_doing_ajax()) {
			return;
		}


		foreach ($cart->cart_contents as $cart_item_key => $cart_item) {
			if ($cart_item['variation_id']) {
				$variation_id = $cart_item['variation_id'];
			} else {
				$variation_id = $cart_item['product_id'];
			}


			if (isset($cart_item["ascwo_meta_data"])) {
				if (isset($cart_item['ascwo_meta_data']["recaps"]['custom_price'])) {
					$item_price = apply_filters('ascwo_cart_item_price', $cart_item['ascwo_meta_data']["recaps"]['custom_price'], $variation_id);
					$cart_item['data']->set_price($item_price);
				}

			}

			// Ajout d'un filtre pour mettre à jour le prix total de l'element dans le panier.
		}
	}

	/**
	 * 
	 */
	public function ascwo_change_product_image_in_cart($product_image_code, $values)
	{
		if (isset($values['ascwo_meta_data']["recaps"])) {
			$previews = $values['ascwo_meta_data']["recaps"]["designImages"];
			if (isset($previews["face1"])) {
				$product_image_code = "<img class='ascwo-cartitem-img' src='" . esc_url($previews["face1"][0]) . "'>";
			} else {
				$product_image_code = "<img class='ascwo-cartitem-img' src='" . esc_url($previews[0]) . "'>";
			}
			return $product_image_code;
		}

	}

	private function add_recap_summary_row(&$rows, $label, $value)
	{
		$label = trim((string) $label);
		$value = trim((string) $value);

		if ('' === $label || '' === $value) {
			return;
		}

		$rows[] = array(
			'label' => $label,
			'value' => $value,
		);
	}

	private function recap_value_to_text($value)
	{
		if (is_scalar($value)) {
			return (string) $value;
		}

		if (!is_array($value)) {
			return '';
		}

		if (isset($value['name']) && is_scalar($value['name'])) {
			return (string) $value['name'];
		}

		if (isset($value['type']) && is_scalar($value['type'])) {
			return (string) $value['type'];
		}

		if (isset($value['textContent']) && is_scalar($value['textContent'])) {
			return (string) $value['textContent'];
		}

		if (isset($value['value']) && is_scalar($value['value'])) {
			return (string) $value['value'];
		}

		$parts = array();
		foreach ($value as $key => $item) {
			$item_text = $this->recap_value_to_text($item);
			if ('' === $item_text) {
				continue;
			}

			$parts[] = is_string($key) ? $key . ': ' . $item_text : $item_text;
		}

		return implode(', ', $parts);
	}

	private function get_recap_summary_rows($recaps)
	{
		$rows = array();

		if (isset($recaps['sign']['size'])) {
			$size = $recaps['sign']['size'];
			$size_value = $size['value'] ?? array();
			$width = $size_value['width']['value'] ?? '';
			$height = $size_value['height']['value'] ?? '';
			$size_text = trim($width . ' x ' . $height, ' x');
			$this->add_recap_summary_row($rows, $size['label'] ?? __('Size', 'all-signs-customizer-for-woocommerce'), $size_text);

			$thickness = $size_value['thickness']['value'] ?? '';
			if ('' !== $thickness && 'none' !== $thickness) {
				$this->add_recap_summary_row($rows, $size_value['thickness']['label'] ?? __('Thickness', 'all-signs-customizer-for-woocommerce'), $thickness);
			}
		}

		foreach (array('material', 'shape', 'fixingMethod', 'border', 'color') as $key) {
			if (!isset($recaps['sign'][$key])) {
				continue;
			}

			$item = $recaps['sign'][$key];
			$this->add_recap_summary_row(
				$rows,
				$item['label'] ?? ucfirst($key),
				$this->recap_value_to_text($item['value'] ?? '')
			);
		}

		if (!empty($recaps['texts']['value'])) {
			$this->add_recap_summary_row(
				$rows,
				$recaps['texts']['label'] ?? __('Texts', 'all-signs-customizer-for-woocommerce'),
				$this->recap_value_to_text($recaps['texts']['value'])
			);
		}

		if (!empty($recaps['additionalComponents']) && is_array($recaps['additionalComponents'])) {
			foreach ($recaps['additionalComponents'] as $value) {
				$this->add_recap_summary_row($rows, $value['option'] ?? '', $this->recap_value_to_text($value['value'] ?? ''));
			}
		}

		if (!empty($recaps['additionalOptions']) && is_array($recaps['additionalOptions'])) {
			foreach ($recaps['additionalOptions'] as $value) {
				$this->add_recap_summary_row($rows, $value['label'] ?? '', $this->recap_value_to_text($value['value'] ?? ''));
			}
		}

		return $rows;
	}

	private function display_recap_summary_list($recaps)
	{
		$rows = $this->get_recap_summary_rows($recaps);
		ob_start();
		?>
		<div class="ascwo-recap-summary-list"
			style="display:flex; flex-direction:column; gap:3px; margin-top:8px; font-size:12px; line-height:1.35;">
			<?php foreach ($rows as $row) { ?>
				<div class="ascwo-recap-summary-row" style="display:flex; gap:6px; align-items:baseline;">
					<span style="font-weight:600;"><?php echo esc_html($row['label']); ?>:</span>
					<span><?php echo esc_html($row['value']); ?></span>
				</div>
			<?php } ?>
		</div>
		<?php
		return ob_get_clean();
	}

	private function should_display_checkout_recaps($cart_item)
	{
		$product = $cart_item['data'] ?? null;

		if (!$product || !method_exists($product, 'get_id')) {
			return true;
		}

		$product_id = $product->get_id();
		$product_meta_data = get_post_meta($product_id, 'product-ascwo-metas', true);
		$config_id = $product_meta_data[$product_id]['config-id'] ?? 0;

		if (empty($config_id) || !get_post($config_id)) {
			return true;
		}

		$config = get_post_meta($config_id, "ascwo-configs-meta", true);

		return !empty($config["data"]["settings"]["generals"]["product"]["displayRecapsOnCheckout"]);
	}

	private function is_woocommerce_blocks_context()
	{
		if (defined('REST_REQUEST') && REST_REQUEST) {
			$request_uri = isset($_SERVER['REQUEST_URI']) ? sanitize_text_field(wp_unslash($_SERVER['REQUEST_URI'])) : '';
			if (false !== strpos($request_uri, '/wc/store/')) {
				return true;
			}
		}

		if (!function_exists('has_block')) {
			return false;
		}

		global $post;

		if (!($post instanceof WP_Post)) {
			return false;
		}

		return has_block('woocommerce/cart', $post) || has_block('woocommerce/checkout', $post);
	}

	private function append_recap_rows_to_item_data($item_data, $recaps)
	{
		foreach ($this->get_recap_summary_rows($recaps) as $row) {
			$item_data[] = array(
				'key' => $row['label'],
				'value' => $row['value'],
				'display' => $row['value'],
			);
		}

		return $item_data;
	}

	public function display_previewBtn_editBtn_in_cart($cart_item)
	{
		$product = $cart_item['data'];
		// Construisez les URL pour les aperçus et les éditions (ajustez selon vos besoins)
		//$preview_url = get_permalink($product->get_id());

		//$preview_data = get_transient( 'preview_' . $product->get_id() );

		//$npd_product = new ascwo_Product_Config( $product->get_id() );
		$product_name = '';
		if (isset($cart_item['ascwo_meta_data']["recaps"])) {
			ob_start();
			$preview_modal_id = uniqid('as-preview');
			?>
			<div class="omodal fade o-modal wpc_part" id="<?php echo esc_attr($preview_modal_id); ?>" tabindex="-1" role="dialog"
				aria-labelledby="myModalLabel" aria-hidden="true">
				<div class="omodal-dialog">
					<div class="omodal-content">
						<div class="omodal-header">
							<button type="button" class="close" data-dismiss="omodal" aria-hidden="true">&times;</button>
						</div>
						<div class="omodal-body">
							<?php if (!isset($cart_item['ascwo_meta_data']["recaps"]["designImages"]["face1"])) { ?>
								<img src="<?php echo esc_url($cart_item['ascwo_meta_data']["recaps"]["designImages"][0]) ?>" style="
										width: auto;
										height: 500px;" />
							<?php } else { ?>
								<div>
									<img src="<?php echo esc_url($cart_item['ascwo_meta_data']["recaps"]["designImages"]["face1"][0]) ?>"
										style="width: auto; height: 500px;" />
								</div>
								<div>
									<img src="<?php echo esc_url($cart_item['ascwo_meta_data']["recaps"]["designImages"]["face2"][0]) ?>"
										style="width: auto; height: 500px;" />
								</div>
							<?php } ?>
						</div>
					</div>
				</div>
			</div>
			<?php echo wp_kses_post($this->display_recap_summary_list($cart_item['ascwo_meta_data']["recaps"])); ?>
			<div class="ascwo-product-links">
				<span class="ascwo-cart-product-preview o-modal-trigger button" data-toggle="o-modal"
					data-target="#<?php echo esc_attr($preview_modal_id); ?>">
					<img src="<?php echo esc_url(ASCWO_ASSETS . '/icons/ic_preview_eye.svg'); ?>"
						alt="<?php echo esc_attr__('Preview', 'all-signs-customizer-for-woocommerce'); ?>"
						title="<?php echo esc_attr__('Preview', 'all-signs-customizer-for-woocommerce'); ?>"
						style="width:20px;height:20px;display:block;" />
				</span>
			</div>
			<?php
			$product_name .= ob_get_clean();
		}
		echo wp_kses_post($product_name);
	}

	public function display_recaps_config_on_checkout_page($item_data, $cart_item)
	{
		if (empty($cart_item['ascwo_meta_data']["recaps"])) {
			return $item_data;
		}

		if ($this->is_woocommerce_blocks_context()) {
			return $this->append_recap_rows_to_item_data($item_data, $cart_item['ascwo_meta_data']["recaps"]);
		}

		if (function_exists('is_checkout') && is_checkout() && $this->should_display_checkout_recaps($cart_item)) {
			return $this->append_recap_rows_to_item_data($item_data, $cart_item['ascwo_meta_data']["recaps"]);
		}

		return $item_data;
	}

	private function display_custom_recaps($recaps, $admin = true)
	{
		ob_start(); ?>
		<div style="display:flex; flex-direction:column;">
			<div class="ascwo-custom-options-info">
				<label for=""><?php echo esc_html($recaps["sign"]["size"]["label"]) ?>: </label>
				<span><?php echo esc_html($recaps["sign"]["size"]["value"]["width"]["label"]) ?>:
					<?php echo esc_html($recaps["sign"]["size"]["value"]["width"]["value"]) ?></span>
				<span><?php echo esc_html($recaps["sign"]["size"]["value"]["height"]["label"]) ?>:
					<?php echo esc_html($recaps["sign"]["size"]["value"]["height"]["value"]) ?></span>
			</div>
			<?php if ($recaps["sign"]["size"]["value"]["thickness"]["value"] !== 'none') { ?>
				<div class="ascwo-custom-options-info">
					<label for=""><?php echo esc_html($recaps["sign"]["size"]["value"]["thickness"]["label"]) ?>: </label>
					<span><?php echo esc_html($recaps["sign"]["size"]["value"]["thickness"]["value"]) ?></span>
				</div>
			<?php } ?>
			<div class="ascwo-custom-options-info">
				<label for=""><?php echo esc_html($recaps["sign"]["shape"]["label"]) ?>: </label>
				<span><?php echo esc_html($recaps["sign"]["shape"]["value"]) ?></span>
			</div>
			<div class="ascwo-custom-options-info">
				<label for=""><?php echo esc_html($recaps["sign"]["fixingMethod"]["label"]) ?>: </label>
				<span><?php echo esc_html($recaps["sign"]["fixingMethod"]["value"]) ?></span>
			</div>
			<div class="ascwo-custom-options-info">
				<label for=""><?php echo esc_html($recaps["sign"]["border"]["label"]) ?>: </label>
				<?php if (isset($recaps["sign"]["border"]["value"]["face1"]) || isset($recaps["texts"]["value"]["face2"])) { ?>
					<?php foreach ($recaps["sign"]["border"]["value"] as $key => $face) { ?>
						<div style="display:flex; justify-content:center; align-items:center;">
							<label for="" style="margin: 0 5px;"><?php echo esc_html($recaps["faces"][$key]) ?>: </label>
							<span for="" style="margin: 0 5px;"><?php echo esc_html($face["type"]) ?> </span>
							<?php if (isset($face["codeHex"])) { ?>
								<div class="ascwo-cart-color-option" style="background:<?php echo esc_attr($face["codeHex"]) ?>;"></div>
							<?php } ?>
						</div>
					<?php }
				} else { ?>
					<span for="" style="margin: 0 5px;"><?php echo esc_html($recaps["sign"]["border"]["value"]["type"]) ?> </span>
					<?php if (isset($recaps["sign"]["border"]["value"]["codeHex"])) { ?>
						<div class="ascwo-cart-color-option"
							style="background:<?php echo esc_attr($recaps["sign"]["border"]["value"]["codeHex"]) ?>;"></div>
					<?php } ?>
				<?php } ?>
			</div>
			<div class="ascwo-custom-options-info">
				<?php if (isset($recaps["sign"]["color"]["value"]["face1"]) || isset($recaps["texts"]["value"]["face2"])) { ?>
					<label for=""><?php echo esc_html($recaps["sign"]["color"]["label"]) ?>: </label>
					<?php foreach ($recaps["sign"]["color"]["value"] as $key => $color) { ?>
						<div style="display:flex; justify-content:center; align-items:center;">
							<label for="" style="margin: 0 5px;"><?php echo esc_html($recaps["faces"][$key]) ?>: </label>
							<span for="" style="margin: 0 5px;"><?php echo esc_html($color["name"]) ?> </span>
							<?php if ($this->isColorCode($color["codeHex"])) { ?>
								<div class="ascwo-cart-color-option" style="background:<?php echo esc_attr($color["codeHex"]) ?>;"></div>
							<?php } else { ?>
								<div class="ascwo-cart-color-option" style="position:relative;">
									<img src="<?php echo esc_url($color["codeHex"]) ?>"
										style="position:absolute; width:100%; height:100;" />
								</div>
							<?php } ?>
						</div>
					<?php }
				} else { ?>
					<div sytle="display:flex; justify-content:between;">
						<div>
							<label for=""><?php echo esc_html($recaps["sign"]["color"]["label"]) ?>: </label>
							<span for="" style="margin: 0 5px;">
								<?php echo esc_html($recaps["sign"]["color"]["value"]["name"]) ?>
							</span>
						</div>
						<?php if ($this->isColorCode($recaps["sign"]["color"]["value"]["codeHex"])) { ?>
							<div class="ascwo-cart-color-option"
								style="background:<?php echo esc_attr($recaps["sign"]["color"]["value"]["codeHex"]) ?>;"></div>
						<?php } else { ?>
							<div class="ascwo-cart-color-option" style="position:relative;">
								<img src="<?php echo esc_url($recaps["sign"]["color"]["value"]["codeHex"]) ?>" style="width:100px;" />
							</div>
						<?php } ?>
					</div>
				<?php } ?>
			</div>
			<?php if (isset($recaps["texts"]["value"]) && count($recaps["texts"]["value"]) > 0) { ?>
				<div class="ascwo-custom-options-info">
					<label for=""><?php echo esc_html($recaps["texts"]["label"]) ?>: </label>
					<?php if (isset($recaps["texts"]["value"]["face1"]) || isset($recaps["texts"]["value"]["face2"])) { ?>
						<?php foreach ($recaps["texts"]["value"] as $key => $face) { ?>
							<div>
								<label for="" style="margin: 0 5px;"><?php echo esc_html($recaps["faces"][$key]) ?>: </label>
								<?php foreach ($face as $text) { ?>
									<div>
										<span><?php echo esc_html($text["textContent"]) ?></span>
										<div class="ascwo-custom-options-info-infos">
											<?php if ($admin) {
												foreach ($text["values"] as $key => $position) { ?>
													<span><?php echo esc_html($position["label"]) . ": " . esc_html($position["value"]); ?></span>
												<?php }
											} ?>
										</div>
									</div>
								<?php } ?>
							</div>
						<?php }
					} else { ?>
						<?php foreach ($recaps["texts"]["value"] as $key => $text) { ?>
							<div>
								<span><?php echo esc_html($text["textContent"]) ?></span>
								<div class="ascwo-custom-options-info-infos">
									<?php if ($admin) {
										foreach ($text["values"] as $key => $position) { ?>
											<span><?php echo esc_html($position["label"]) . ": " . esc_html($position["value"]); ?></span>
										<?php }
									} ?>
								</div>
							</div>
						<?php } ?>
					<?php } ?>
				</div>
			<?php } ?>
			<?php if (isset($recaps["images"]["value"]) && count($recaps["images"]["value"]) > 0 && $admin) { ?>
				<div class="ascwo-custom-options-info">
					<label for=""><?php echo esc_html($recaps["images"]["label"]) ?>: </label>
					<?php if (isset($recaps["images"]["value"]["face1"])) { ?>
						<?php foreach ($recaps["images"]["value"] as $key => $face) { ?>
							<div>
								<label for="" style="margin: 0 5px;"><?php echo esc_html($recaps["faces"][$key]) ?>: </label>
								<?php foreach ($face as $image) { ?>
									<div class="ascwo-custom-options-info-infos" style="display: block !important;">
										<div>
											<p><?php echo esc_html__("file", "all-signs-customizer-for-woocommerce") . " : " . esc_html($image["infos"]["name"]) ?>
											</p>
										</div>
										<?php if ($admin) {
											foreach ($image["values"] as $key => $position) { ?>
												<span><?php echo esc_html($position["label"]) . ": " . esc_html($position["value"]); ?></span>
											<?php }
										} ?>
									</div>
								<?php } ?>
							</div>
						<?php }
					} else { ?>
						<div style="display:flex; flex-direction:column; justify-content:center; align-items:center;">
							<?php foreach ($recaps["images"]["value"] as $key => $image) { ?>
								<div class="ascwo-custom-options-info-infos" style="display: block !important;">
									<div>
										<p><?php echo esc_html__("file", "all-signs-customizer-for-woocommerce") . " : " . esc_html($image["infos"]["name"]) ?>
										</p>
									</div>
									<?php if ($admin) {
										foreach ($image["values"] as $key => $position) { ?>
											<span><?php echo esc_html($position["label"]) . ": " . esc_html($position["value"]); ?></span>
										<?php }
									} ?>
								</div>
							<?php } ?>
						</div>
					<?php } ?>
				</div>
			<?php } ?>
			<?php if (isset($recaps["additionalComponents"]) && count($recaps["additionalComponents"]) > 0) { ?>
				<?php foreach ($recaps["additionalComponents"] as $key => $value) { ?>
					<div class="ascwo-custom-options-info">
						<label for=""><?php echo esc_html($value["option"]) ?>: </label>
						<span><?php echo esc_html($value["value"]) ?></span>
					</div>
				<?php } ?>
			<?php } ?>
			<?php if (isset($recaps["additionalOptions"]) && count($recaps["additionalOptions"]) > 0) { ?>
				<?php foreach ($recaps["additionalOptions"] as $key => $value) { ?>
					<div class="ascwo-custom-options-info">
						<label for=""><?php echo esc_html($value["label"]) ?>: </label>
						<span><?php echo esc_html($value["value"]) ?></span>
					</div>
				<?php } ?>
			<?php } ?>
			<?php if ($admin) { ?>
				<div class="ascwo-custom-options-info">
					<label for=""><?php echo esc_html__("Previews", "all-signs-customizer-for-woocommerce") ?>: </label>
					<div>
						<?php if (!isset($recaps["designImages"]["face1"])) { ?>
							<?php foreach ($recaps["designImages"] as $key => $image) { ?>
								<div style="display:flex; justify-content:center; align-items:center;">
									<div style="position:relative; width:fit-content">
										<img src="<?php echo esc_url($image) ?>" style="width: auto; height: 50px;" />
									</div>
									<div style="margin:10px 0">
										<a class="button alt ascwo_admin_download_image"
											href="<?php echo esc_url($this->get_forced_download_url($image)) ?>"
											download><?php echo esc_html__('Download File', "all-signs-customizer-for-woocommerce") ?></a>
									</div>
								</div>
							<?php } ?>
						<?php } else { ?>
							<?php foreach ($recaps["designImages"] as $key => $face) {
								foreach ($face as $key => $image) { ?>
									<div style="display:flex; justify-content:center; align-items:center;">
										<div style="position:relative; width:fit-content">
											<img src="<?php echo esc_url($image) ?>" style="width: auto; height: 50px;" />
										</div>
										<div style="margin:10px 0">
											<a class="button alt ascwo_admin_download_image"
												href="<?php echo esc_url($this->get_forced_download_url($image)) ?>"
												download><?php echo esc_html__('Download File', "all-signs-customizer-for-woocommerce") ?></a>
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

	private function isColorCode($chaine)
	{
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
				$order_data   = wc_get_order_item_meta( $item_id, 'ascwo_meta_data' );

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
	function custom_email_attachments($attachments, $email_id, $order, $email)
	{
		// Vérifier si l'e-mail est envoyé au client
		if ($email->id === 'customer_completed_order') {
			$items = $order->get_items();
			foreach ($items as $item) {
				if (isset($item["ascwo_meta_data"]['recaps'])) {
					if (isset($item["ascwo_meta_data"]['zip'])) {
						array_push($attachments, str_replace(ASCWO_IMAGE_URL, ASCWO_IMAGE_PATH, $item["ascwo_meta_data"]['zip']));
					}

				}
			}
		}

		return $attachments;
	}

	/**
	 * 
	 */
	public function get_order_custom_admin_data($item_id, $item, $_product)
	{
		$order_data = wc_get_order_item_meta($item_id, 'ascwo_meta_data');
		$order_id = $item->get_order_id();
		if ($order_id && isset($order_data) && !empty($order_data)) {
			echo wp_kses_post($this->display_custom_recaps($order_data["recaps"], true));
			if (isset($order_data["zip"])) { ?>
				<div style="margin:10px 0">
					<a class="button alt ascwo_admin_download_image"
						href="<?php echo esc_url($this->get_forced_download_url($order_data["zip"])) ?>"
						download><?php echo esc_html__('Download Order Zip file', "all-signs-customizer-for-woocommerce") ?></a>
				</div> <?php
			} else {
				?>
				<div style="margin:10px 0">
					<button class="button alt ascwo_admin_generate_zip_file" data-item-id="<?php echo esc_attr($item_id) ?>"
						data-nonce="<?php echo wp_create_nonce('ascwo_generate_order_zip_file') ?>">
						<img src="<?php echo esc_url(ASCWO_ASSETS . '/images/im_loading.gif') ?>"
							style="width:10px !important; display:none;" />
						<span><?php echo esc_html__('Generate Order Item Zip file', "all-signs-customizer-for-woocommerce") ?></span>
					</button>
				</div>
				<?php
			}
			/* $product_id = $_product->get_id();
																														$meta = get_post_meta($product_id,'product-ascwo-metas',true);
																														if(!empty($meta) && isset($meta[$product_id]['config-id'])){
																															$configId = $meta[$product_id]['config-id'];
																															if($configId !=0){
																																$config = get_post_meta($configId,"ascwo-configs-meta",true);
																																if(!empty($config)){
																																	$email_data = $config['settings']["generals"]["output"]['manufacturerEmail'];
																																	if(isset($email_data["sendDesignByEmail"]) && $email_data["sendDesignByEmail"] && isset($email_data["receiverEmail"]) && !empty($email_data["receiverEmail"])){
																																		?>
																																		<div>
																																			<button class="button ascwo-send-email" data-product-id="<?php echo esc_attr($product_id)?>" data-order='<?php echo wp_json_encode(["recaps"=>$order_data,"order_id"=>$order_id])?>'><?php echo __("Send Manufacturer mail","all-signs-customizer-for-woocommerce")?></button>
																																		</div>
																																<?php }
																																}
																															}
																														} */

		}



	}

	public function ascwo_generate_order_zip_file_ajax()
	{
		$nonce = isset($_POST['nonce']) ? sanitize_text_field(wp_unslash($_POST['nonce'])) : '';

		if (wp_verify_nonce($nonce, 'ascwo_generate_order_zip_file')) {
			if (isset($_POST['item_id'])) {
				$item_id = absint($_POST['item_id']);
				$order_data = wc_get_order_item_meta($item_id, 'ascwo_meta_data');
				if (isset($order_data) && !empty($order_data)) {

					$uploads = [];

					if (isset($order_data['recaps']['images']["value"]['face1'])) {
						foreach ($order_data['recaps']['images']["value"] as $key => $face) {
							foreach ($face as $key => $image) {
								array_push($uploads, $image["infos"]);
							}
						}
					} else {
						if (isset($order_data['recaps']['images']["value"])) {
							foreach ($order_data['recaps']['images']["value"] as $key => $image) {
								array_push($uploads, $image["infos"]);
							}
						}
					}

					$order_id = wc_get_order_id_by_order_item_id($item_id);
					$ascwo_zip_file = $this->ascwo_zip_file($order_id, $item_id, $order_data['recaps']["output"], $order_data['recaps']['designImages'], $uploads, $order_data["recaps"]["sign"]["size"]["value"]);

					if (is_wp_error($ascwo_zip_file)) {
						wp_send_json(array(
							'success' => false,
							"message" => $ascwo_zip_file->get_error_message(),
						));
					}

					$order_data['zip'] = $ascwo_zip_file;
					wc_update_order_item_meta($item_id, "ascwo_meta_data", $order_data);
					wp_send_json(array(
						'success' => true,
						'zip' => $ascwo_zip_file,
						'download_url' => $this->get_forced_download_url($ascwo_zip_file),
					));
				}
				wp_send_json(array(
					'success' => false,
					"message" => "No meta data found on item id"
				));
			}
			wp_send_json(array(
				'success' => false,
				"message" => "No item id found"
			));
		}
		wp_send_json(array(
			'success' => false,
			"message" => "nonce invalid"
		));
	}

	/**
	 * 
	 */
	function capture_product_metadata_to_order($item, $cart_item_key, $values, $order)
	{
		$meta_key = 'ascwo_meta_data';
		if (isset($values[$meta_key])) {
			$item->update_meta_data($meta_key, $values[$meta_key]);
		}
	}

	/**
	 * 
	 */
	function mail_template($item_id, $item, $_product)
	{

		$order_data = wc_get_order_item_meta($item_id, 'ascwo_meta_data');
		/* if (isset($order_data) && !empty($order_data)) {
				  if (is_account_page()) {
					  echo wp_kses_post($this->display_custom_recaps($order_data["recaps"], true));
				  }
			  } */
		if (isset($order_data) && !empty($order_data)) {
			ob_start();
			$recaps = $order_data["recaps"];
			include ASCWO_INCLUDES . '/purchase-email.php';
			echo wp_kses_post(ob_get_clean());
		}

	}

	private function ascwo_zip_file($order_id, $item_id, $output_settings, $previews, $uploads, $sizes)
	{
		if (!class_exists('ZipArchive')) {
			return new WP_Error('ascwo_missing_ziparchive', __('ZipArchive is not available on this server.', 'all-signs-customizer-for-woocommerce'));
		}

		$outputOptions = get_option("ascwo_output_options", []);
		$upload_dirs = ASCWO_IMAGE_PATH;
		wp_mkdir_p($upload_dirs);
		if (isset($outputOptions["zipName"]) && $outputOptions["zipName"] == true) {
			if (isset($output_settings["prefix"]) && !empty($output_settings["prefix"])) {
				$zip_file = "/" . $output_settings["prefix"] . $order_id . "-$item_id.zip";
			} else {
				$zip_file = "/" . $order_id . "-$item_id.zip";
			}
		} else {
			if (isset($output_settings["prefix"]) && !empty($output_settings["prefix"])) {
				$zip_file = "/" . $output_settings["prefix"] . "ascwo-$item_id.zip";
			} else {
				$zip_file = "/" . "ascwo-$item_id.zip";
			}
		}
		if (!file_exists($upload_dirs . $zip_file)) {
			$zip = new ZipArchive();
			$open_result = $zip->open($upload_dirs . $zip_file, ZipArchive::CREATE);
			if ($open_result === TRUE) {
				foreach ($uploads as $index => $upload) {
					$file = ASCWO_IMAGE_PATH . DIRECTORY_SEPARATOR . $upload["name"];
					if (file_exists($file)) {
						$file_content = file_get_contents($file);
						$zip->addFromString(basename($file), $file_content);
						wp_delete_file($file);
					}
				}
				preg_match('/^([\d.]+)\s*(\w*)$/', trim($sizes["width"]["value"]), $matches);

				$pdfs = $this->save_pdf_output("px", $previews);
				if (is_array($pdfs) && count($pdfs) > 0) {
					foreach ($pdfs as $key => $pdf) {
						if (file_exists($pdf)) {
							$pdf_content = file_get_contents($pdf);
							$zip->addFromString(basename($pdf), $pdf_content);
							wp_delete_file($pdf);
						}
					}
				}
				$zip->close();
			} else {
				return new WP_Error('ascwo_zip_open_failed', __('Unable to create the order ZIP file.', 'all-signs-customizer-for-woocommerce'));
			}
		}

		if (!file_exists($upload_dirs . $zip_file)) {
			return new WP_Error('ascwo_zip_not_created', __('The order ZIP file was not created.', 'all-signs-customizer-for-woocommerce'));
		}


		return ASCWO_IMAGE_URL . $zip_file;
	}


	private function convertToNumber($chaine)
	{
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



	private function save_pdf_output(string $unit, array $prevImages)
	{

		if (isset($prevImages["face1"])) {
			$url = [];
			foreach ($prevImages as $key => $face) {
				$path_parts = pathinfo($face[0]);
				$ext = $path_parts['extension'];
				$output_file = $path_parts["filename"];
				$width = 1080;
				$height = 800;
				$response = wp_remote_get($face[0]);
				if (is_wp_error($response)) {
					error_log('ASCWO PDF generation failed: ' . $response->get_error_message());
				} else {
					$file_content = wp_remote_retrieve_body($response);

					if ($file_content !== false) {
						$image_info = getimagesizefromstring($file_content);
						if ($image_info !== false) {
							$width = $image_info[0] * 2.5;
							$height = $image_info[1] * 2.5;
						}
					}
				}

				$upload_dirs = ASCWO_IMAGE_PATH;
				wp_mkdir_p($upload_dirs);
				$output_file = $upload_dirs . DIRECTORY_SEPARATOR . $path_parts["filename"] . '.pdf';
				if ($ext != 'svg') {
					require_once ASCWO_INCLUDES . DIRECTORY_SEPARATOR . 'tcpdf' . DIRECTORY_SEPARATOR . 'tcpdf.php';
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

					$pdf->SetCreator('All Sign Customizer for WooCommerce by Vertim Coders');
					$pdf->SetAuthor('All Sign Customizer for WooCommerce by Vertim Coders');
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
					$url[] = $output_file;
				}
			}
			return $url;
		} else {
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
						$width = $image_info[0] * 10;
						$height = $image_info[1] * 10;
					}
				}
			}
			$upload_dirs = ASCWO_IMAGE_PATH;
			wp_mkdir_p($upload_dirs);
			$output_file = $upload_dirs . DIRECTORY_SEPARATOR . $path_parts["filename"] . '.pdf';
			if ($ext != 'svg') {
				require_once ASCWO_INCLUDES . DIRECTORY_SEPARATOR . 'tcpdf' . DIRECTORY_SEPARATOR . 'tcpdf.php';
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

				$pdf->SetCreator('All Sign Customizer for WooCommerce by Vertim Coders');
				$pdf->SetAuthor('All Sign Customizer for WooCommerce by Vertim Coders');
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
