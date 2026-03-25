import axios from "axios";

async function add_to_cart(ajax_url, cart_data, nonce, redirectToCheckOut) {
  try {
    const response = await axios.post(
      ajax_url,
      {
        action: "asowp_add_custom_design_to_cart",
        data: cart_data,
        redirectToCheckOut: redirectToCheckOut,
        nonce: nonce,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    const data = response?.data || {};
    const redirecting = Boolean(data.cart_item_key && data.url);

    if (redirecting) {
      window.location.href = data.url;
    }

    return {
      ...data,
      redirecting,
    };
  } catch (error) {
    console.error("Erreur :", error);
    return {
      success: false,
      message:
        error?.response?.data?.message ||
        "A problem occured while adding the product to the cart. Please try again.",
      redirecting: false,
    };
  }
}
function formatPrice(price) {
  let formattedPrice = parseFloat(
    price + parseFloat(asowp_configurator_data.regularPrice)
  ).toFixed(asowp_configurator_data.decimals);

  switch (asowp_configurator_data.currency_pos) {
    case "left":
      formattedPrice = asowp_configurator_data.currencySymbol + formattedPrice;
      break;
    case "right":
      formattedPrice = formattedPrice + asowp_configurator_data.currencySymbol;
      break;
    case "left_space":
      formattedPrice =
        asowp_configurator_data.currencySymbol + " " + formattedPrice;
      break;
    case "right_space":
      formattedPrice =
        formattedPrice + " " + asowp_configurator_data.currencySymbol;
      break;
  }

  // Remplacez le séparateur décimal et des milliers
  formattedPrice = formattedPrice.replace(
    ".",
    asowp_configurator_data.decimalSep
  );
  formattedPrice = formattedPrice.replace(
    /(\d)(?=(\d{3})+(?!\d))/g,
    "$1" + asowp_configurator_data.thousandSep
  );

  return formattedPrice;
}
function addformatToPrice(price) {
  let formattedPrice = parseFloat( price ).toFixed(asowp_configurator_data.decimals);

  switch (asowp_configurator_data.currency_pos) {
    case "left":
      formattedPrice = asowp_configurator_data.currencySymbol + formattedPrice;
      break;
    case "right":
      formattedPrice = formattedPrice + asowp_configurator_data.currencySymbol;
      break;
    case "left_space":
      formattedPrice =
        asowp_configurator_data.currencySymbol + " " + formattedPrice;
      break;
    case "right_space":
      formattedPrice =
        formattedPrice + " " + asowp_configurator_data.currencySymbol;
      break;
  }

  // Remplacez le séparateur décimal et des milliers
  formattedPrice = formattedPrice.replace(
    ".",
    asowp_configurator_data.decimalSep
  );
  formattedPrice = formattedPrice.replace(
    /(\d)(?=(\d{3})+(?!\d))/g,
    "$1" + asowp_configurator_data.thousandSep
  );

  return formattedPrice;
}
// const qtyInput = document.getElementById('asowp-quantity');
// qtyInput.addEventListener('input', () => {
//   if (qtyInput.value < 1) {
//     qtyInput.value = 1;
//   }
// });

function setScrollColor(color) {
  document.documentElement.style.setProperty("--asowp-scrollBar-color", color);
}

export { add_to_cart, formatPrice, addformatToPrice, setScrollColor };
