var aso_ajax_url = ajaxurl;
(function ($) {
  "use strict";
  $(function () {
    /* const send_manufactrer_email = function (product_id, data) {
      $.post(
        aso_ajax_url,
        {
          action: "aso_send_manufactrer_email",
          product_id: product_id,
          order_id: data.order_id,
          recaps: data.recaps,
        },
        function (data) {
          if (data.success) {
            toastMessage(data.success);
          } else {
            toastMessage(data.error, "error");
          }
        }
      );
    }; */

    $(document).on("click", ".aso_admin_generate_zip_file", function (e) {
      e.preventDefault();
      $(this).prop("disabled", true);
      $(this).find("img").show();
      var item_id = $(this).data("item-id");
      var nonce = $(this).data("nonce");
      console.log(item_id, nonce);
      $.post(
        aso_ajax_url,
        {
          action: "aso_generate_order_zip_file",
          nonce: nonce,
          item_id: item_id,
        },
        function (data) {
          console.log(data);
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
          $(".aso-buttons-wrap-variation").hide();
          $(
            ".aso-buttons-wrap-variation[data-id='" + variation_id + "']"
          ).show();

          if (typeof hide_cart_button !== "undefined") {
            if (
              $(".aso-buttons-wrap-variation[data-id='" + variation_id + "']")
                .length > 0 &&
              hide_cart_button === true
            ) {
              $(".aso-buttons-wrap-variation")
                .parent()
                .find(".add_to_cart_button")
                .hide();
              $(".aso-buttons-wrap-variation")
                .parent()
                .find(".single_add_to_cart_button")
                .hide();
            } else {
              $(".aso-buttons-wrap-variation")
                .parent()
                .find(".add_to_cart_button")
                .show();
              $(".aso-buttons-wrap-variation")
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
        $(".aso-buttons-wrap-variation").hide();
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
