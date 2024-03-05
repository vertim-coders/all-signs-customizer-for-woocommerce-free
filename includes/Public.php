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
    public function render_public( $content = '' ) {
        wp_enqueue_style( 'aso-style' );
        wp_enqueue_style( 'aso-omodal' );
        wp_enqueue_script('aso-omodal');
        // Localisez votre script avec les variables nécessaires
        //wp_localize_script('product-design', 'ajax_object', array('ajax_url' => admin_url('admin-ajax.php')));
        return $content;
    }
}
