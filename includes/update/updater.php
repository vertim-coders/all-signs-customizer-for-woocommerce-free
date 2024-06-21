<?php

/**
 * REST_API Handler
 */
class ASO_Updater  {

    /**
     * [__construct description]
     */
    public function __construct() {
    }

	public function init_hooks(){
        // Define the alternative response for information checking
        add_filter('plugins_api', [$this, 'aso_plugin_info'], 20, 3);
        // define the alternative API for updating checking
        add_filter('pre_set_site_transient_update_plugins', [$this, 'aso_push_update']);
	}

    public function aso_plugin_info( $res, $action, $args ){
		// do nothing if this is not about getting plugin information
		if( 'plugin_information' !== $action ) {
			return $res;
		}
		// do nothing if it is not our plugin
		if( basename(dirname(ASO_FILE )) !== $args->slug ) {
			return $res;
		}
	
		$site_url = get_site_url();
        $purchase_code = get_option("aso_product_pro");
        $url      = 'https://demos.signsdesigner.us/vlc-test/wp-json/vlc/update/?lcde=' . $purchase_code . '&siteurl=' . urlencode( $site_url )."&vertim=".ASO_ID;
        $args     = array( 'timeout' => 60 );
        $response = wp_remote_get( $url, $args );
        if ( is_wp_error( $response ) ) {
            $error_message = $response->get_error_message();
			return array();
        }
		$remote = json_decode($response['body']);
        if (is_object( $remote)) {
			if(isset($remote->version) && isset($remote->download_url)){
				$res = new stdClass();
				$res->name = $remote->name;
				$res->slug = $remote->slug;
				$res->author = $remote->author;
				$res->author_profile = $remote->author_profil;
				$res->version = $remote->version;
				$res->tested = $remote->tested;
				$res->requires = $remote->requires;
				$res->requires_php = $remote->requires_php;
				$res->download_link = $remote->download_url;
				$res->trunk = $remote->download_url;
				$res->last_updated = $remote->last_updated;
				$res->sections = array(
					'description' => $remote->sections->description,
					'installation' => $remote->sections->installation,
					'changelog' => $remote->sections->changelog
					// you can add your custom sections (tabs) here
				);
				// in case you want the screenshots tab, use the following HTML format for its content:
				// <ol><li><a href="IMG_URL" target="_blank"><img src="IMG_URL" alt="CAPTION" /></a><p>CAPTION</p></li></ol>
				/* if( ! empty( $remote->sections->screenshots ) ) {
					$res->sections[ 'screenshots' ] = $remote->sections->screenshots;
				} */

				$res->banners = array(
					'low' => ASO_ASSETS.'/images/aso-banners-low.png',
					'high' => ASO_ASSETS.'/images/aso-banners-high.png'
				);
			}
		}
		
		return $res;
	}
    public function aso_push_update($transient) {
		
		var_dump($transient);
		die();
		$checkPluginTransient = get_transient(ASO_CHECK_TRANSIENT_NAME);
		if ( empty( $transient->checked ) ) {
			return $transient;
		}
		$remote = $checkPluginTransient ?: $this->check_aso_other_version();
		if (!$checkPluginTransient) {
		  set_transient(
		    ASO_CHECK_TRANSIENT_NAME,
		    $remote,
		    ASO_CHECK_TRANSIENT_EXPIRATION
		  );
		}
        if(is_object($remote)){
            $res = new stdClass();
			$res->slug = $remote->slug;
			$res->plugin = plugin_basename(ASO_FILE); // it could be just YOUR_PLUGIN_SLUG.php if your plugin doesn't have its own directory
			$res->new_version = $remote->version;
			$res->tested = $remote->tested;
			$res->package = $remote->download_link;
            if(
                $remote
                && version_compare( ASO_VERSION, $remote->version, '<' )
                && version_compare( $remote->requires, get_bloginfo( 'version' ), '<' )
                && version_compare( $remote->requires_php, PHP_VERSION, '<' )
            ) {			
                $transient->response[ $res->plugin ] = $res;
            }
        }
		return $transient;
		
	}
    private function check_aso_other_version() {
		$site_url = get_site_url();
        $purchase_code = get_option("aso_product_pro");
        $url      = 'https://demos.signsdesigner.us/vlc-test/wp-json/vlc/update/?lcde=' . $purchase_code . '&siteurl=' . urlencode( $site_url )."&vertim=".ASO_ID;
        $args     = array( 'timeout' => 60 );
        $response = wp_remote_get( $url, $args );
        if ( is_wp_error( $response ) ) {
            $error_message = $response->get_error_message();
			return array();
        }
		$remote = json_decode($response['body']);
        if (is_object( $remote)) {
			if(isset($remote->version) && isset($remote->download_url)){
				$res = new stdClass();
				$res->name = $remote->name;
				$res->slug = $remote->slug;
				$res->author = $remote->author;
				$res->author_profile = $remote->author_profil;
				$res->version = $remote->version;
				$res->tested = $remote->tested;
				$res->requires = $remote->requires;
				$res->requires_php = $remote->requires_php;
				$res->download_link = $remote->download_url;
				$res->trunk = $remote->download_url;
				$res->last_updated = $remote->last_updated;
				$res->sections = array(
					'description' => $remote->sections->description,
					'installation' => $remote->sections->installation,
					'changelog' => $remote->sections->changelog
					// you can add your custom sections (tabs) here
				);
				// in case you want the screenshots tab, use the following HTML format for its content:
				// <ol><li><a href="IMG_URL" target="_blank"><img src="IMG_URL" alt="CAPTION" /></a><p>CAPTION</p></li></ol>
				/* if( ! empty( $remote->sections->screenshots ) ) {
					$res->sections[ 'screenshots' ] = $remote->sections->screenshots;
				} */

				$res->banners = array(
					/* 'low' => $remote->banners->low,
					'high' => $remote->banners->high */
				); 
				return $res;
			}else{
				return array();
			}
        }else{
			return array();
		}
	}

    

}
