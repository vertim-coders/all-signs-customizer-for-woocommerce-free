<?php
namespace ASO;

/**
 * Frontend Pages Handler
 */
class Frontend {

    public function __construct() {
        add_shortcode( 'aso-configurator', [ $this, 'render_frontend' ] );
    }

    /**
     * Render frontend app
     *
     * @param  array $atts
     * @param  string $content
     *
     * @return string
     */
    public function render_frontend( $atts, $content = '' ) {
        wp_enqueue_style( 'aso-frontend' );
        wp_enqueue_style( 'aso-style' );
        wp_enqueue_script( 'aso-frontend' );

        $content .= '<div id="aso-frontend-app"></div>';

        return $content;
    }
}
