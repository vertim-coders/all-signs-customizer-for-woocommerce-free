async function addToCart(ajax_url, cart_data, nonce, redirect_to_cart) {
  try {
    const response = await axios.post(
      ajax_url,
      {
        action: "ncpc_add_custom_design_to_cart",
        data: cart_data,
        nonce: nonce,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (response.data.cart_item_key) {
      if (redirect_to_cart) {
        window.location.href = response.data.url;
      }
    }
    return response.data;
  } catch (error) {
    console.error("Erreur :", error);
  }
}
function formatPrice(price) {
  let formattedPrice = parseFloat(price).toFixed(aso_confiurator_data.decimals);

  switch (aso_confiurator_data.currency_pos) {
    case "left":
      formattedPrice = aso_confiurator_data.currencySymbol + formattedPrice;
      break;
    case "right":
      formattedPrice = formattedPrice + aso_confiurator_data.currencySymbol;
      break;
    case "left_space":
      formattedPrice =
        aso_confiurator_data.currencySymbol + " " + formattedPrice;
      break;
    case "right_space":
      formattedPrice =
        formattedPrice + " " + aso_confiurator_data.currencySymbol;
      break;
  }

  // Remplacez le séparateur décimal et des milliers
  formattedPrice = formattedPrice.replace(".", aso_confiurator_data.decimalSep);
  formattedPrice = formattedPrice.replace(
    /(\d)(?=(\d{3})+(?!\d))/g,
    "$1" + aso_confiurator_data.thousandSep
  );

  return formattedPrice;
}

export { addToCart, formatPrice };
