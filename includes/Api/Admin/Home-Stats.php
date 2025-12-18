<?php
namespace ASOWP\Api\Admin;

use WP_Error;
use WP_REST_Controller;

class ASOWP_Api_Home_Stats extends WP_REST_Controller
{
    public function __construct()
    {
        $this->namespace = 'asowp/v1';
        $this->rest_base = 'stats';
    }

    public function register_routes()
    {
        register_rest_route(
            $this->namespace,
            '/' . $this->rest_base . '/home',
            array(
                array(
                    'methods' => \WP_REST_Server::READABLE,
                    'callback' => array($this, 'get_home_stats'),
                    'permission_callback' => array($this, 'permissions_check'),
                    'args' => array(
                        'statuses' => array(
                            'type' => 'array',
                            'required' => false,
                            'default' => array(),
                        ),
                        'cache' => array(
                            'type' => 'boolean',
                            'required' => false,
                            'default' => true,
                        ),
                    ),
                ),
            )
        );
    }

    public function permissions_check($request)
    {
        return true;
    }

    private function normalize_statuses($statuses): array
    {
        if (!is_array($statuses)) {
            $statuses = array();
        }
        $out = array();
        foreach ($statuses as $status) {
            $status = sanitize_text_field((string) $status);
            $status = preg_replace('/^wc-/', '', $status);
            if ($status !== '') {
                $out[] = $status;
            }
        }
        $out = array_values(array_unique($out));
        if (empty($out) && function_exists('wc_get_is_paid_statuses')) {
            $out = array_values(array_unique(array_map('sanitize_text_field', wc_get_is_paid_statuses())));
        }
        return $out;
    }

    private function get_total_orders_count(array $statuses): int
    {
        $total = 0;
        if (function_exists('wc_orders_count')) {
            foreach ($statuses as $status) {
                $total += absint(wc_orders_count($status));
            }
            return $total;
        }

        if (!function_exists('wc_get_orders')) {
            return 0;
        }
        $ids = wc_get_orders(array(
            'status' => $statuses,
            'return' => 'ids',
            'limit' => -1,
        ));
        return is_array($ids) ? count($ids) : 0;
    }

    private function get_configured_order_ids(): array
    {
        global $wpdb;
        $order_itemmeta = $wpdb->prefix . 'woocommerce_order_itemmeta';
        $order_items = $wpdb->prefix . 'woocommerce_order_items';

        $sql = $wpdb->prepare(
            "SELECT DISTINCT oi.order_id
             FROM {$order_itemmeta} oim
             INNER JOIN {$order_items} oi ON oi.order_item_id = oim.order_item_id
             WHERE oim.meta_key = %s",
            'asowp_meta_data'
        );

        $ids = $wpdb->get_col($sql);
        if (!is_array($ids)) {
            return array();
        }
        return array_values(array_unique(array_map('absint', $ids)));
    }

    public function get_home_stats($request)
    {
        if (!function_exists('wc_get_orders')) {
            return new WP_Error(
                'asowp_woocommerce_missing',
                __('WooCommerce is required to compute stats.', 'all-signs-options-pro'),
                array('status' => 400)
            );
        }

        $statuses = $this->normalize_statuses($request->get_param('statuses'));
        $cache_enabled = (bool) $request->get_param('cache');
        $cache_key = 'asowp_home_stats_' . md5(wp_json_encode(array('statuses' => $statuses)));

        if ($cache_enabled) {
            $cached = get_transient($cache_key);
            if (is_array($cached)) {
                return rest_ensure_response($cached);
            }
        }

        $total_orders = $this->get_total_orders_count($statuses);

        $configured_order_ids = $this->get_configured_order_ids();
        $configured_orders = array();
        $configured_items = 0;
        $configured_revenue = 0.0;
        $configured_revenue_incl_tax = 0.0;

        if (!empty($configured_order_ids)) {
            $configured_orders = wc_get_orders(array(
                'include' => $configured_order_ids,
                'status' => $statuses,
                'limit' => -1,
            ));
        }

        if (is_array($configured_orders)) {
            foreach ($configured_orders as $order) {
                foreach ($order->get_items('line_item') as $item) {
                    $meta = $item->get_meta('asowp_meta_data', true);
                    if (empty($meta) || !is_array($meta)) {
                        continue;
                    }
                    if (!isset($meta['recaps'])) {
                        continue;
                    }
                    $configured_items++;
                    $configured_revenue += (float) $item->get_total();
                    $configured_revenue_incl_tax += (float) $item->get_total() + (float) $item->get_total_tax();
                }
            }
        }

        $configured_orders_count = is_array($configured_orders) ? count($configured_orders) : 0;
        $rate = $total_orders > 0 ? round(($configured_orders_count / $total_orders) * 100, 2) : 0.0;

        $payload = array(
            'total_orders' => $total_orders,
            'configured_orders' => $configured_orders_count,
            'configured_rate' => $rate,
            'configured_items' => $configured_items,
            'configured_revenue' => round($configured_revenue, 2),
            'configured_revenue_incl_tax' => round($configured_revenue_incl_tax, 2),
            'currency' => function_exists('get_woocommerce_currency') ? get_woocommerce_currency() : '',
            'currency_symbol' => function_exists('get_woocommerce_currency_symbol') ? html_entity_decode(get_woocommerce_currency_symbol()) : '',
            'statuses' => $statuses,
            'generated_at' => time(),
        );

        if ($cache_enabled) {
            set_transient($cache_key, $payload, 5 * MINUTE_IN_SECONDS);
        }

        return rest_ensure_response($payload);
    }
}

