var aso_ajax_url = aso_ajax_object.ajax_url;
(function ($) {
  "use strict";
  $(function () {
    const send_manufactrer_email = function (product_id, data) {
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
    };

    $(document).on("click", ".aso-send-email", function (e) {
      e.preventDefault();
      var product_id = $(this).data("product-id");
      var data = $(this).data("order");
      send_manufactrer_email(product_id, data);
    });

    /* $(".aso-qty").keypress(function (e) {
              if (e.which < 48 || e.which > 57) {
                  return(false);
              }
          }); */

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

    $(document).on("click", ".aso_admin_download_image", function (e) {
      e.preventDefault();
      var imgageData = $(this).attr("href");
      if (imgageData.search("data") == 1) {
        var preview_img = dataToBlob(imgageData).blob;
      } else {
        var preview_img = imgageData;
      }
      var downloadLink = document.createElement("a");
      downloadLink.href = preview_img;
      const lowest = 100;
      const highest = 9999999;

      let randomNumber = parseInt(Math.random() * (highest - lowest) + lowest);
      downloadLink.download = "aso_preview_" + randomNumber + ".png";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    });
    $(document).on("click", ".aso_admin_download_svg", function (e) {
      e.preventDefault();
      var svg = $(this).attr("href");
      const link = document.createElement("a");
      const lowest = 100;
      const highest = 9999999;

      let randomNumber = parseInt(Math.random() * (highest - lowest) + lowest);
      link.download = "aso_custom_text_" + randomNumber + ".svg"; // nom du fichier

      document.body.appendChild(link);
      // générer l'URL pour le blob
      link.href = svg;

      // déclencher le téléchargement
      link.click();
      document.body.removeChild(link);
    });

    function dataToBlob(dataURI) {
      var get_URL = function () {
        return window.URL || window.webkitURL || window;
      };

      var byteString = atob(dataURI.split(",")[1]),
        mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0],
        arrayBuffer = new ArrayBuffer(byteString.length),
        _ia = new Uint8Array(arrayBuffer);

      for (var i = 0; i < byteString.length; i++) {
        _ia[i] = byteString.charCodeAt(i);
      }

      var dataView = new DataView(arrayBuffer);
      var blob = new Blob([dataView], { type: mimeString });
      return { blob: get_URL().createObjectURL(blob), data: dataURI };
    }

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
