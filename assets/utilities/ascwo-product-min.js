(function ($) {
  "use strict";
  $(function () {
    $(document).on("click", ".ascwo_admin_generate_zip_file", function (e) {
      e.preventDefault();
      var $button = $(this);
      $button.siblings(".ascwo_admin_zip_message").remove();
      $button.prop("disabled", true);
      $button.find("img").show();
      var item_id = $button.data("item-id");
      var nonce = $button.data("nonce");
      $.post(
        ajaxurl,
        {
          action: "ascwo_generate_order_zip_file",
          nonce: nonce,
          item_id: item_id,
        },
        function (data) {
          if (data.success) {
            var downloadUrl =
              data.download_url ||
              data.zip ||
              (data.data && (data.data.download_url || data.data.zip));

            if (downloadUrl) {
              var link = document.createElement("a");
              link.href = downloadUrl;
              link.setAttribute("download", "");
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            } else {
              $button.after(
                '<span class="ascwo_admin_zip_message" style="margin-left:8px;color:#b45309;">ZIP generated, but no download URL returned.</span>',
              );
            }

            window.setTimeout(function () {
              window.location.reload();
            }, 500);
          } else {
            $button.prop("disabled", false);
            $button.find("img").hide();
            $("<span>", {
              class: "ascwo_admin_zip_message",
              text: data.message || data.error || "Unable to generate ZIP file.",
            })
              .css({ "margin-left": "8px", color: "#b91c1c" })
              .insertAfter($button);
            console.error(data.message || data.error);
          }
        },
      ).fail(function () {
        $button.prop("disabled", false);
        $button.find("img").hide();
        $("<span>", {
          class: "ascwo_admin_zip_message",
          text: "Unable to generate ZIP file.",
        })
          .css({ "margin-left": "8px", color: "#b91c1c" })
          .insertAfter($button);
      });
    });

    $(".single_variation_wrap").on(
      "show_variation",
      function (event, variation) {
        // Fired when the user selects all the required dropdowns / attributes
        // and a final variation is selected / shown
        var variation_id = $("input[name='variation_id']").val();

        if (variation_id) {
          $(".ascwo-buttons-wrap-variation").hide();
          $(
            ".ascwo-buttons-wrap-variation[data-id='" + variation_id + "']",
          ).show();

          if (typeof hide_cart_button !== "undefined") {
            if (
              $(".ascwo-buttons-wrap-variation[data-id='" + variation_id + "']")
                .length > 0 &&
              hide_cart_button === true
            ) {
              $(".ascwo-buttons-wrap-variation")
                .parent()
                .find(".add_to_cart_button")
                .hide();
              $(".ascwo-buttons-wrap-variation")
                .parent()
                .find(".single_add_to_cart_button")
                .hide();
            } else {
              $(".ascwo-buttons-wrap-variation")
                .parent()
                .find(".add_to_cart_button")
                .show();
              $(".ascwo-buttons-wrap-variation")
                .parent()
                .find(".single_add_to_cart_button")
                .show();
            }
          }
        }
      },
    );

    $(".single_variation_wrap").on(
      "hide_variation",
      function (event, variation) {
        $(".ascwo-buttons-wrap-variation").hide();
      },
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
