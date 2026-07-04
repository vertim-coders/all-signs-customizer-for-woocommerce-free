<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Request Quote</title>
</head>

<body>
    <div style="display:flex; flex-direction:column;">
        <div class="ascwo-custom-options-info"
            style="display:flex; justify-content:start; align-items:center; border-top:solid rgb(175, 173, 173) 2px; padding:10px 0 10px 5px; gap:10px;">
            <label
                style="font-size:medium; font-weight:600; font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;">
                <?php echo esc_html($recaps["sign"]["size"]["label"]) ?>:
            </label>
            <span><?php echo esc_html($recaps["sign"]["size"]["value"]["width"]["label"]) ?>:
                <?php echo esc_html($recaps["sign"]["size"]["value"]["width"]["value"]) ?></span>
            <span><?php echo esc_html($recaps["sign"]["size"]["value"]["height"]["label"]) ?>:
                <?php echo esc_html($recaps["sign"]["size"]["value"]["height"]["value"]) ?></span>
        </div>
        <?php if ($recaps["sign"]["size"]["value"]["thickness"]["value"] !== 'none') { ?>
            <div class="ascwo-custom-options-info"
                style="display:flex; justify-content:start; align-items:center; border-top:solid rgb(175, 173, 173) 2px; padding:10px 0 10px 5px; gap:10px;">
                <label
                    style="font-size:medium; font-weight:600; font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;">
                    <?php echo esc_html($recaps["sign"]["size"]["value"]["thickness"]["label"]) ?>:
                </label>
                <span><?php echo esc_html($recaps["sign"]["size"]["value"]["thickness"]["value"]) ?></span>
            </div>
        <?php } ?>
        <div class="ascwo-custom-options-info"
            style="display:flex; justify-content:start; align-items:center; border-top:solid rgb(175, 173, 173) 2px; padding:10px 0 10px 5px; gap:10px;">
            <label
                style="font-size:medium; font-weight:600; font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;">
                <?php echo esc_html($recaps["sign"]["shape"]["label"]) ?>:
            </label>
            <span><?php echo esc_html($recaps["sign"]["shape"]["value"]) ?></span>
        </div>
        <div class="ascwo-custom-options-info"
            style="display:flex; justify-content:start; align-items:center; border-top:solid rgb(175, 173, 173) 2px; padding:10px 0 10px 5px; gap:10px;">
            <label
                style="font-size:medium; font-weight:600; font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;">
                <?php echo esc_html($recaps["sign"]["fixingMethod"]["label"]) ?>:
            </label>
            <span><?php echo esc_html($recaps["sign"]["fixingMethod"]["value"]) ?></span>
        </div>
        <div class="ascwo-custom-options-info"
            style="display:flex; justify-content:start; align-items:center; border-top:solid rgb(175, 173, 173) 2px; padding:10px 0 10px 5px; gap:10px;">
            <label
                style="font-size:medium; font-weight:600; font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;">
                <?php echo esc_html($recaps["sign"]["border"]["label"]) ?>:
            </label>
            <?php if (isset($recaps["sign"]["border"]["value"]["face1"]) || isset($recaps["texts"]["value"]["face2"])) { ?>
                <?php foreach ($recaps["sign"]["border"]["value"] as $key => $face) { ?>
                    <div style="display:flex; justify-content:center; align-items:center;">
                        <label for="" style="margin: 0 5px;"><?php echo esc_html($recaps["faces"][$key]) ?>: </label>
                        <span style="margin: 0 5px;"><?php echo esc_html($face["type"]) ?> </span>
                        <?php if (isset($face["codeHex"])) { ?>
                            <div
                                style="background:<?php echo esc_attr($face["codeHex"]) ?>; width:30px; height:30px; border-radius:50%;">
                            </div>
                        <?php } ?>
                    </div>
                <?php }
            } else { ?>
                <span style="margin: 0 5px;"><?php echo esc_html($recaps["sign"]["border"]["value"]["type"]) ?></span>
                <?php if (isset($recaps["sign"]["border"]["value"]["codeHex"])) { ?>
                    <div
                        style="background:<?php echo esc_attr($recaps["sign"]["border"]["value"]["codeHex"]) ?>; width:30px; height:30px; border-radius:50%;">
                    </div>
                <?php } ?>
            <?php } ?>
        </div>
        <div class="ascwo-custom-options-info"
            style="display:flex; justify-content:start; align-items:center; border-top:solid rgb(175, 173, 173) 2px; padding:10px 0 10px 5px; gap:10px;">
            <?php if (isset($recaps["sign"]["color"]["value"]["face1"]) || isset($recaps["texts"]["value"]["face2"])) { ?>
                <label
                    style="font-size:medium; font-weight:600; font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;">
                    <?php echo esc_html($recaps["sign"]["color"]["label"]) ?>:
                </label>
                <?php foreach ($recaps["sign"]["color"]["value"] as $key => $color) { ?>
                    <label for="" style="margin: 0 5px;"><?php echo esc_html($recaps["faces"][$key]) ?>: </label>
                    <span style="margin: 0 5px;"><?php echo esc_html($color["name"]) ?> </span>
                <?php }
            } else { ?>
                <label
                    style="font-size:medium; font-weight:600; font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;">
                    <?php echo esc_html($recaps["sign"]["color"]["label"]) ?>:
                </label>
                <span style="margin: 0 5px;">
                    <?php echo esc_html($recaps["sign"]["color"]["value"]["name"]) ?>
                </span>
            <?php } ?>
        </div>
        <?php if (isset($recaps["texts"]["value"]) && count($recaps["texts"]["value"]) > 0) { ?>
            <div class="ascwo-custom-options-info"
                style="display:flex; justify-content:start; align-items:center; border-top:solid rgb(175, 173, 173) 2px; padding:10px 0 10px 5px; gap:10px;">
                <label
                    style="font-size:medium; font-weight:600; font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;">
                    <?php echo esc_html($recaps["texts"]["label"]) ?>:
                </label>
                <?php if (isset($recaps["texts"]["value"]["face1"]) || isset($recaps["texts"]["value"]["face2"])) { ?>
                    <?php foreach ($recaps["texts"]["value"] as $key => $face) { ?>
                        <div>
                            <label for="" style="margin: 0 5px;"><?php echo esc_html($recaps["faces"][$key]) ?>: </label>
                            <?php foreach ($face as $text) { ?>
                                <div>
                                    <span><?php echo esc_html($text["textContent"]) ?></span>
                                </div>
                            <?php } ?>
                        </div>
                    <?php }
                } else { ?>
                    <?php foreach ($recaps["texts"]["value"] as $key => $text) { ?>
                        <div>
                            <span><?php echo esc_html($text["textContent"]) ?></span>
                        </div>
                    <?php } ?>
                <?php } ?>
            </div>
        <?php } ?>
        <?php if (isset($recaps["additionalComponents"]) && count($recaps["additionalComponents"]) > 0) { ?>
            <?php foreach ($recaps["additionalComponents"] as $key => $value) { ?>
                <div class="ascwo-custom-options-info"
                    style="display:flex; justify-content:start; align-items:center; border-top:solid rgb(175, 173, 173) 2px; padding:10px 0 10px 5px; gap:10px;">
                    <label
                        style="font-size:medium; font-weight:600; font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;">
                        <?php echo esc_html($value["option"]) ?>:
                    </label>
                    <span><?php echo esc_html($value["value"]) ?></span>
                </div>
            <?php } ?>
        <?php } ?>
        <?php if (isset($recaps["additionalOptions"]) && count($recaps["additionalOptions"]) > 0) { ?>
            <?php foreach ($recaps["additionalOptions"] as $key => $value) { ?>
                <div class="ascwo-custom-options-info"
                    style="display:flex; justify-content:start; align-items:center; border-top:solid rgb(175, 173, 173) 2px; padding:10px 0 10px 5px; gap:10px;">
                    <label
                        style="font-size:medium; font-weight:600; font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;">
                        <?php echo esc_html($value["label"]) ?>:
                    </label>
                    <span><?php echo esc_html($value["value"]) ?></span>
                </div>
            <?php } ?>
        <?php } ?>
        <?php if (!empty($recaps["designImages"]) || !empty($order_data["zip"])) { ?>
            <div class="ascwo-custom-options-info"
                style="display:flex; flex-direction:column; align-items:flex-start; border-top:solid rgb(175, 173, 173) 2px; padding:10px 0 10px 5px; gap:8px;">
                <label
                    style="font-size:medium; font-weight:600; font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;">
                    <?php echo esc_html__('Files', 'all-signs-customizer-for-woocommerce'); ?>:
                </label>
                <?php if (!empty($order_data["zip"])) { ?>
                    <a href="<?php echo esc_url($this->get_forced_download_url($order_data["zip"])); ?>" download>
                        <?php echo esc_html__('Download order ZIP file', 'all-signs-customizer-for-woocommerce'); ?>
                    </a>
                <?php } ?>
                <?php if (!empty($recaps["designImages"]) && !isset($recaps["designImages"]["face1"])) { ?>
                    <?php foreach ($recaps["designImages"] as $key => $image) { ?>
                        <a href="<?php echo esc_url($this->get_forced_download_url($image)); ?>" download>
                            <?php echo esc_html__('Download preview file', 'all-signs-customizer-for-woocommerce'); ?>
                        </a>
                    <?php } ?>
                <?php } elseif (!empty($recaps["designImages"])) { ?>
                    <?php foreach ($recaps["designImages"] as $face_key => $face) { ?>
                        <?php foreach ($face as $key => $image) { ?>
                            <a href="<?php echo esc_url($this->get_forced_download_url($image)); ?>" download>
                                <?php echo esc_html($recaps["faces"][$face_key] ?? $face_key); ?>
                                <?php echo esc_html__('preview file', 'all-signs-customizer-for-woocommerce'); ?>
                            </a>
                        <?php } ?>
                    <?php } ?>
                <?php } ?>
            </div>
        <?php } ?>
    </div>
</body>

</html>