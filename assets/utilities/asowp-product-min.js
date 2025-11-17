(function ($) {
  "use strict";
  $(function () {
    $(document).on("click", ".asowp_admin_generate_zip_file", function (e) {
      e.preventDefault();
      $(this).prop("disabled", true);
      $(this).find("img").show();
      var item_id = $(this).data("item-id");
      var nonce = $(this).data("nonce");
      $.post(
        ajaxurl,
        {
          action: "asowp_generate_order_zip_file",
          nonce: nonce,
          item_id: item_id,
        },
        function (data) {
          if (data.success) {
            window.location.reload();
          } else {
            $(this).find("img").hide();
            console.error(data.error);
          }
        }
      );
    });

    $(".single_variation_wrap").on(
      "show_variation",
      function (event, variation) {
        // Fired when the user selects all the required dropdowns / attributes
        // and a final variation is selected / shown
        var variation_id = $("input[name='variation_id']").val();

        if (variation_id) {
          $(".asowp-buttons-wrap-variation").hide();
          $(
            ".asowp-buttons-wrap-variation[data-id='" + variation_id + "']"
          ).show();

          if (typeof hide_cart_button !== "undefined") {
            if (
              $(".asowp-buttons-wrap-variation[data-id='" + variation_id + "']")
                .length > 0 &&
              hide_cart_button === true
            ) {
              $(".asowp-buttons-wrap-variation")
                .parent()
                .find(".add_to_cart_button")
                .hide();
              $(".asowp-buttons-wrap-variation")
                .parent()
                .find(".single_add_to_cart_button")
                .hide();
            } else {
              $(".asowp-buttons-wrap-variation")
                .parent()
                .find(".add_to_cart_button")
                .show();
              $(".asowp-buttons-wrap-variation")
                .parent()
                .find(".single_add_to_cart_button")
                .show();
            }
          }
        }
      }
    );

    $(".single_variation_wrap").on(
      "hide_variation",
      function (event, variation) {
        $(".asowp-buttons-wrap-variation").hide();
      }
    );

    var cartForm = $(".woocommerce-cart-form");
    cartForm.contents().each(function () {
      // Vérifier si le nœud est un nœud de texte
      if (this.nodeType === Node.TEXT_NODE) {
        // Modifier le contenu du nœud de texte
        this.textContent = "";
      }
    });
  });
})(jQuery);
