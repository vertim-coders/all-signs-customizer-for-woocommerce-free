<?php
namespace NCPC;

/**
 * public Pages Handler
 */
class NCPC_Public {

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
        wp_enqueue_style( 'aso-omodal-css' );
        wp_enqueue_script('aso-omodal');
        wp_enqueue_style('aso-toast-css');
        wp_enqueue_script('aso-toast');
        // Localisez votre script avec les variables nécessaires
        //wp_localize_script('product-design', 'ajax_object', array('ajax_url' => admin_url('admin-ajax.php')));
        return $content;
    }
}
