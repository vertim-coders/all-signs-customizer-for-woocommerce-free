<?php
// Script pour générer le SQL de migration
function slugify($value, $fallback = "item") {
    $normalized = trim(strtolower(preg_replace('/[^a-z0-9]+/i', '-', (string)$value)));
    $normalized = preg_replace('/(^-|-$)/', '', $normalized);
    return !empty($normalized) ? $normalized : $fallback;
}

function generate_size_id($item) {
    $label = isset($item['label']) ? $item['label'] : (isset($item['width']) ? $item['width'] . 'x' . $item['height'] : 'size');
    $dims = (isset($item['width']) && isset($item['height'])) ? $item['width'] . '-' . $item['height'] : 'dimensions';
    return 'size-' . slugify($label) . '-' . slugify($dims);
}

function generate_color_id($item) {
    $name = isset($item['name']) ? $item['name'] : (isset($item['label']) ? $item['label'] : 'color');
    return 'color-' . slugify($name);
}

// Données fictives basées sur votre JSON pour simuler le SQL
$data_examples = [
    ['id' => 'size-sticker-square', 'label' => '50x30', 'width' => 50, 'height' => 30],
    ['name' => 'Red', 'id' => 'color-sticker-white'],
];

echo "-- SQL de migration généré
";
echo "SELECT 'Ceci est une simulation, vérifiez les données avant exécution';
";

foreach ($data_examples as $item) {
    if (isset($item['width'])) {
        $new_id = generate_size_id($item);
        echo "UPDATE wp_options SET option_value = REPLACE(option_value, '{$item['id']}', '{$new_id}') WHERE option_name LIKE 'asowp_config_%';
";
    } elseif (isset($item['name'])) {
        $new_id = generate_color_id($item);
        echo "UPDATE wp_options SET option_value = REPLACE(option_value, '{$item['id']}', '{$new_id}') WHERE option_name LIKE 'asowp_config_%';
";
    }
}
