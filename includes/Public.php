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
        wp_enqueue_script('aso-tinymce-script');
        wp_enqueue_script('aso-product-min');
    }
}
