<?php
/**
 * Audit script for Fonts - tests CRUD operations and verifies JSON persistence
 * Run: php _audit_fonts.php
 */

// WordPress bootstrap
require_once 'C:/wamp64/www/wordpressWork/wp-load.php';

define('CONFIG_ID', 400);

function debug_json($label, $data) {
    echo "\n=== $label ===\n";
    echo json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) . "\n";
}

function get_config($id) {
    $meta = get_post_meta($id, '_asowp_product_config', true);
    return is_string($meta) ? json_decode($meta, true) : $meta;
}

function save_config($id, $data) {
    return update_post_meta($id, '_asowp_product_config', wp_json_encode($data));
}

echo "========================================\n";
echo "   AUDIT FONTS - CONFIG #" . CONFIG_ID . "\n";
echo "========================================\n";

// Step 1: Capture initial state
echo "\n[1] CAPTURE INITIAL STATE\n";
$config_before = get_config(CONFIG_ID);
$fonts_before = isset($config_before['requiredOptions']['fonts']) ? $config_before['requiredOptions']['fonts'] : null;
echo "requiredOptions.fonts exists: " . ($fonts_before ? 'YES' : 'NO') . "\n";
if ($fonts_before) {
    echo "Items count: " . count($fonts_before['items'] ?? []) . "\n";
    echo "Label: " . ($fonts_before['label'] ?? 'N/A') . "\n";
    echo "Description: " . ($fonts_before['description'] ?? 'N/A') . "\n";
    debug_json('fonts_before', $fonts_before);
}

// Check for legacy keys
$hasLegacyPricings = isset($config_before['requiredOptions']['pricings']);
$hasDataField = isset($config_before['data']);
$isArray = is_array($config_before) && isset($config_before[0]);
echo "\nLegacy checks:\n";
echo "  requiredOptions.pricings (legacy): " . ($hasLegacyPricings ? 'WARNING - EXISTS' : 'OK - not present') . "\n";
echo "  data field: " . ($hasDataField ? 'WARNING - EXISTS' : 'OK - not present') . "\n";
echo "  Root is array: " . ($isArray ? 'WARNING - IS ARRAY' : 'OK - is object') . "\n";

// Step 2: Test GET fonts via REST API
echo "\n[2] TEST GET FONTS (REST API)\n";
$get_result = call_rest('GET', 'configs/' . CONFIG_ID . '/required-options/fonts');
debug_json('GET fonts response', $get_result);

// Step 3: Test PUT (update section label/description)
echo "\n[3] TEST PUT FONTS SECTION (update label & description)\n";
$update_payload = [
    'label' => 'Fonts TestLabel Audit',
    'description' => 'Description test audit ' . date('H:i:s'),
    'items' => $fonts_before['items'] ?? [],
];
$put_result = call_rest('PUT', 'configs/' . CONFIG_ID . '/required-options/fonts', $update_payload);
debug_json('PUT fonts response', $put_result);

// Verify after PUT
$config_after_put = get_config(CONFIG_ID);
$fonts_after_put = $config_after_put['requiredOptions']['fonts'] ?? [];
echo "\nVerification after PUT:\n";
echo "  Label: " . ($fonts_after_put['label'] ?? 'N/A') . " (expected: Fonts TestLabel Audit)\n";
echo "  Description: " . ($fonts_after_put['description'] ?? 'N/A') . "\n";

// Step 4: Test POST add font item
echo "\n[4] TEST POST ADD FONT ITEM\n";
// First, get managed fonts to find a font ID to add
$managed_fonts = get_option('asowp-manages-fonts', []);
$test_font_id = null;
if (!empty($managed_fonts)) {
    // Find a font NOT already in config
    $existing_ids = [];
    foreach (($fonts_before['items'] ?? []) as $item) {
        if (isset($item['managedFontId'])) {
            $existing_ids[] = $item['managedFontId'];
        }
    }
    foreach ($managed_fonts as $mf_id => $mf) {
        if (!in_array($mf_id, $existing_ids)) {
            $test_font_id = $mf_id;
            break;
        }
    }
    if ($test_font_id === null) {
        // All fonts are already added - add the first one anyway (test duplicate handling)
        $test_font_id = array_key_first($managed_fonts);
    }
    echo "Using font ID: $test_font_id (" . ($managed_fonts[$test_font_id]['label'] ?? $managed_fonts[$test_font_id]['name'] ?? 'Unknown') . ")\n";
}

if ($test_font_id !== null) {
    $add_result = call_rest('POST', 'configs/' . CONFIG_ID . '/required-options/fonts/items', ['font_id' => $test_font_id]);
    debug_json('POST add font response', $add_result);
    
    // Verify after POST
    $config_after_add = get_config(CONFIG_ID);
    $fonts_after_add = $config_after_add['requiredOptions']['fonts'] ?? [];
    echo "\nVerification after POST add:\n";
    echo "  Items count: " . count($fonts_after_add['items'] ?? []) . "\n";
    $found = false;
    foreach (($fonts_after_add['items'] ?? []) as $item) {
        if (isset($item['managedFontId']) && $item['managedFontId'] == $test_font_id) {
            $found = true;
            echo "  Font ID $test_font_id found in items: YES\n";
            break;
        }
    }
    if (!$found) {
        echo "  Font ID $test_font_id found in items: NO - PROBLEM!\n";
    }
}

// Step 5: Test PUT font item (reorder via position)
echo "\n[5] TEST PUT FONT ITEM (reorder)\n";
$config_before_reorder = get_config(CONFIG_ID);
$items_before_reorder = $config_before_reorder['requiredOptions']['fonts']['items'] ?? [];
if (count($items_before_reorder) >= 2) {
    $item_id_to_move = 0; // First item
    $target_position = count($items_before_reorder) - 1; // Move to last position
    echo "Moving item at index 0 to position $target_position\n";
    $reorder_result = call_rest('PUT', 'configs/' . CONFIG_ID . '/required-options/fonts/items/' . $item_id_to_move, ['position' => $target_position]);
    debug_json('PUT reorder response', $reorder_result);
    
    // Verify after reorder
    $config_after_reorder = get_config(CONFIG_ID);
    $items_after_reorder = $config_after_reorder['requiredOptions']['fonts']['items'] ?? [];
    echo "\nVerification after reorder:\n";
    echo "  Items count: " . count($items_after_reorder) . "\n";
    echo "  First item label: " . ($items_after_reorder[0]['label'] ?? 'N/A') . "\n";
    echo "  Last item label: " . ($items_after_reorder[count($items_after_reorder)-1]['label'] ?? 'N/A') . "\n";
}

// Step 6: Test set default font item
echo "\n[6] TEST SET DEFAULT FONT ITEM\n";
$config_before_default = get_config(CONFIG_ID);
$items_before_default = $config_before_default['requiredOptions']['fonts']['items'] ?? [];
if (count($items_before_default) >= 2) {
    $default_idx = count($items_before_default) - 1; // Set last item as default
    echo "Setting item at index $default_idx as default\n";
    $default_result = call_rest('PUT', 'configs/' . CONFIG_ID . '/required-options/fonts/items/' . $default_idx . '/default', []);
    debug_json('PUT default response', $default_result);
    
    // Verify after default
    $config_after_default = get_config(CONFIG_ID);
    $items_after_default = $config_after_default['requiredOptions']['fonts']['items'] ?? [];
    echo "\nVerification after set default:\n";
    $default_found = false;
    foreach ($items_after_default as $idx => $item) {
        if (!empty($item['isDefault'])) {
            echo "  Item at index $idx is default (label: " . ($item['label'] ?? 'N/A') . ")\n";
            $default_found = true;
        }
    }
    if (!$default_found) {
        echo "  WARNING: No item marked as default!\n";
    }
}

// Step 7: Test DELETE font item
echo "\n[7] TEST DELETE FONT ITEM\n";
$config_before_delete = get_config(CONFIG_ID);
$items_before_delete = $config_before_delete['requiredOptions']['fonts']['items'] ?? [];
$count_before = count($items_before_delete);
if ($count_before >= 1) {
    $delete_idx = $count_before - 1; // Delete last item
    $deleted_label = $items_before_delete[$delete_idx]['label'] ?? 'Unknown';
    echo "Deleting item at index $delete_idx ($deleted_label)\n";
    $delete_result = call_rest('DELETE', 'configs/' . CONFIG_ID . '/required-options/fonts/items/' . $delete_idx);
    debug_json('DELETE response', $delete_result);
    
    // Verify after DELETE
    $config_after_delete = get_config(CONFIG_ID);
    $items_after_delete = $config_after_delete['requiredOptions']['fonts']['items'] ?? [];
    echo "\nVerification after DELETE:\n";
    echo "  Items count before: $count_before, after: " . count($items_after_delete) . "\n";
    $found_deleted = false;
    foreach ($items_after_delete as $item) {
        if (($item['label'] ?? '') === $deleted_label) {
            $found_deleted = true;
            echo "  WARNING: Deleted item still found in items!\n";
            break;
        }
    }
    if (!$found_deleted) {
        echo "  Deleted item correctly removed: YES\n";
    }
}

// Step 8: Restore original state
echo "\n[8] RESTORE ORIGINAL STATE\n";
$config_after_all = get_config(CONFIG_ID);
debug_json('State before restore', $config_after_all);
$restore_result = save_config(CONFIG_ID, $config_before);
echo "Original config restored: " . ($restore_result ? 'YES' : 'FAILED') . "\n";

// Verify restore
$config_restored = get_config(CONFIG_ID);
$fonts_restored = $config_restored['requiredOptions']['fonts'] ?? [];
echo "\nVerification after restore:\n";
echo "  Items count: " . count($fonts_restored['items'] ?? []) . "\n";

// Check customizerSign.text synchronization
echo "\n[9] CHECK CUSTOMIZER SIGN TEXT SYNC\n";
$customizerText = $config_before['settings']['customizerSign']['text'] ?? [];
echo "  customizerSign.text.selectedFonts: " . (isset($customizerText['selectedFonts']) ? json_encode($customizerText['selectedFonts']) : 'N/A') . "\n";
echo "  customizerSign.text.fontsLabel: " . ($customizerText['fontsLabel'] ?? 'N/A') . "\n";
echo "  customizerSign.text.fontsDescription: " . ($customizerText['fontsDescription'] ?? 'N/A') . "\n";

echo "\n========================================\n";
echo "   AUDIT COMPLETE\n";
echo "========================================\n";
