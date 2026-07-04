import { __, _x, _n, _nx, sprintf, setLocaleData } from "@wordpress/i18n";

// Default text domain for the plugin.
const TEXT_DOMAIN = "all-signs-customizer-for-woocommerce";

// Small helper to avoid repeating the domain everywhere.
const t = (text, domain = TEXT_DOMAIN) => __(text, domain);

export { __, _x, _n, _nx, sprintf, setLocaleData, TEXT_DOMAIN, t };
