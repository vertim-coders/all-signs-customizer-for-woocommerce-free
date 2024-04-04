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

export { addToCart };
