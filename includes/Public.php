<?php
namespace ASO;

/**
 * public Pages Handler
 */
class ASO_Public {

    public function __construct() {
        $this->render_public();
    }

    /**
     * Render public app
     *
     * @param  array $atts
     * @param  string $content
     *
     * @return string
     */
    public function render_public() {
        wp_enqueue_style( 'aso-style' );
        wp_enqueue_style( 'aso-omodal' );
        wp_enqueue_script('aso-omodal');
        wp_enqueue_script('aso-product-min',ASO_ASSETS.'/utilities/aso-product-min.js', array('jquery'), '1.0', true);
        // Localisez votre script avec les variables nécessaires
        wp_localize_script('aso-product-min', 'aso_ajax_object', array('ajax_url' => esc_url(admin_url('admin-ajax.php'))));
    }
}
