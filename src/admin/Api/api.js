import axios from "axios";
const asowp_api_url = asowp_data.rest_url;
if (asowp_data?.rest_nonce) {
  axios.defaults.headers.common["X-WP-Nonce"] = asowp_data.rest_nonce;
}
const api = {
  //function related to configuration
  getConfigs: async (url = "") => {
    const configs = await axios.get(asowp_api_url + "/configs/" + url);
    return {
      items: configs.data?.data ?? [],
      totalPages: configs.data?.totalPages ?? 0,
      totalConfigsFound: configs.data?.totalConfigsFound ?? 0,
    };
  },
  getConfig: async (id) => {
    const config = await axios.get(asowp_api_url + "/configs/" + id);
    return config.data?.data ?? config.data;
  },
  getPreviewConfig: async (id) => {
    const config = await axios.get(
      asowp_api_url + "/configs/" + id + "/preview"
    );
    return config.data;
  },
  updateConfig: async (config) => {
    const edit = await axios.put(
      asowp_api_url + "/configs/" + config.id,
      config
    );
    return edit.data;
  },
  deleteConfig: async (id) => {
    const del = await axios.delete(asowp_api_url + "/configs/" + id);
    return del.data;
  },
  addConfig: async (data) => {
    const post = await axios.post(asowp_api_url + "/configs", data);
    return post.data;
  },

  // WooCommerce products helpers
  getUnassignedProducts: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const url =
      asowp_api_url +
      "/woocommerce-products/unassigned" +
      (query ? `?${query}` : "");
    const res = await axios.get(url);
    return res.data?.data ?? res.data;
  },

  getHomeStats: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const url =
      asowp_api_url + "/stats/home" + (query ? `?${query}` : "");
    const res = await axios.get(url);
    console.log("response rt: ", res)
    return res.data;
  },

  getRequestQuotes: async () => {
    const quotes = await axios.get(asowp_api_url + "/request-quotes");
    return quotes.data;
  },
  getRequestQuote: async (quoteId) => {
    const quote = await axios.get(asowp_api_url + "/request-quotes/" + quoteId);
    return quote.data;
  },
  updateRequestQuote: async (quoteId, data) => {
    const quote = await axios.put(
      asowp_api_url + "/request-quotes/" + quoteId,
      data
    );
    return quote.data;
  },
  deleteRequestQuote: async (quoteId) => {
    const quote = await axios.delete(
      asowp_api_url + "/request-quotes/" + quoteId
    );
    return quote.data;
  },

  //function related to maretials

  updateMaterial: async (configId, materialId, material) => {
    const edit = await axios.put(
      asowp_api_url + "/configs/" + configId + "/additional-options/materials/" + materialId,
      material
    );
    return edit.data;
  },
  getMaterials: async (configId) => {
    const material = await axios.get(
      asowp_api_url + "/configs/" + configId + "/additional-options/materials"
    );
    return material.data;
  },
  getMaterial: async (configId, materialId) => {
    const material = await axios.get(
      asowp_api_url +
        "/configs/" +
        configId +
        "/additional-options/materials/" +
        materialId
    );
    return material.data;
  },
  deleteMaterial: async (configId, materialId) => {
    const del = await axios.delete(
      asowp_api_url + "/configs/" + configId + "/additional-options/materials/" + materialId
    );
    return del.data;
  },
  addMaterial: async (configId, material) => {
    const post = await axios.post(
      asowp_api_url + "/configs/" + configId + "/additional-options/materials",
      material
    );
    return post.data;
  },
  // function related to additional components within a material
  getAdditionalOptions: async (configId, materialId) => {
    const additionalOptions = await axios.get(
      asowp_api_url +
        "/configs/" +
        configId +
        "/additional-options/components" +
        (materialId !== undefined && materialId !== null && `${materialId}` !== ""
          ? `?material_id=${encodeURIComponent(materialId)}`
          : "")
    );
    return additionalOptions.data;
  },
  addAdditionalOption: async (configId, materialId, additionalOption) => {
    const post = await axios.post(
      asowp_api_url +
        "/configs/" +
        configId +
        "/additional-options/components" +
        (materialId !== undefined && materialId !== null && `${materialId}` !== ""
          ? `?material_id=${encodeURIComponent(materialId)}`
          : ""),
      additionalOption
    );
    return post.data;
  },
  getAdditionalOptionItems: async (configId, materialId, additionalOptionId) => {
    const additionalOption = await axios.get(
      asowp_api_url +
        "/configs/" +
        configId +
        "/additional-options/components/" +
        additionalOptionId
    );
    return additionalOption.data?.data ?? additionalOption.data;
  },
  updateAdditionalOption: async (configId, materialId, additionalOptionId, additionalOption) => {
    const edit = await axios.put(
      asowp_api_url +
        "/configs/" +
        configId +
        "/additional-options/components/" +
        additionalOptionId +
        (materialId !== undefined && materialId !== null && `${materialId}` !== ""
          ? `?material_id=${encodeURIComponent(materialId)}`
          : ""),
      additionalOption
    );
    return edit.data;
  },
  deleteAdditionalOption: async (configId, materialId, additionalOptionId) => {
    const del = await axios.delete(
      asowp_api_url +
        "/configs/" +
        configId +
        "/additional-options/components/" +
        additionalOptionId +
        (materialId !== undefined && materialId !== null && `${materialId}` !== ""
          ? `?material_id=${encodeURIComponent(materialId)}`
          : "")
    );
    return del.data;
  },
  getAdditionalOptionColors: async (configId, materialId) => {
    const colors = await axios.get(
      asowp_api_url +
        "/configs/" +
        configId +
        "/additional-options/materials/" +
        materialId +
        "/colors"
    );
    return colors.data?.data?.colors ?? colors.data;
  },
  getAdditionalOptionMaterials: async (configId) => {
    const materials = await axios.get(
      asowp_api_url + "/configs/" + configId + "/additional-options/materials"
    );
    return materials.data?.data?.materials ?? materials.data;
  },
  addAdditionalOptionMaterial: async (configId, material) => {
    const post = await axios.post(
      asowp_api_url + "/configs/" + configId + "/additional-options/materials",
      material
    );
    return post.data;
  },
  getAdditionalOptionMaterial: async (configId, materialId) => {
    const material = await axios.get(
      asowp_api_url +
        "/configs/" +
        configId +
        "/additional-options/materials/" +
        materialId
    );
    return material.data?.data?.material ?? material.data;
  },
  updateAdditionalOptionMaterial: async (configId, materialId, material) => {
    const edit = await axios.put(
      asowp_api_url +
        "/configs/" +
        configId +
        "/additional-options/materials/" +
        materialId,
      material
    );
    return edit.data;
  },
  deleteAdditionalOptionMaterial: async (configId, materialId) => {
    const del = await axios.delete(
      asowp_api_url +
        "/configs/" +
        configId +
        "/additional-options/materials/" +
        materialId
    );
    return del.data;
  },

  //function related to Manage font
  getGoogleFonts: async () => {
    const fonts = await axios.get(asowp_api_url + "/google-fonts");
    return fonts.data;
  },
  getManagefonts: async () => {
    const Managefonts = await axios.get(asowp_api_url + "/manage-fonts");
    return Managefonts.data;
  },
  addManagefont: async (font) => {
    const state = await axios.post(asowp_api_url + "/manage-fonts", font);
    return state.data;
  },
  updateManagefont: async (fontId, font) => {
    const state = await axios.post(
      asowp_api_url + "/manage-fonts/" + fontId,
      font
    );
    return state.data;
  },
  getManagefont: async (fontId) => {
    const fontgroup = await axios.get(
      asowp_api_url + "/manage-fonts/" + fontId
    );
    return fontgroup.data;
  },
  deleteManagefont: async (fontId) => {
    const fontgroup = await axios.delete(
      asowp_api_url + "/manage-fonts/" + fontId
    );
    return fontgroup.data;
  },

  //Function related to Manage sizes

  getManageSizes: async () => {
    const Managesizes = await axios.get(asowp_api_url + "/manage-sizes");
    return Managesizes.data;
  },
  addManageSize: async (size) => {
    const state = await axios.post(asowp_api_url + "/manage-sizes", size);
    return state.data;
  },
  updateManageSize: async (sizeId, size) => {
    const state = await axios.post(
      asowp_api_url + "/manage-sizes/" + sizeId,
      size
    );
    return state.data;
  },
  getManageSize: async (sizeId) => {
    const sizegroup = await axios.get(
      asowp_api_url + "/manage-sizes/" + sizeId
    );
    return sizegroup.data;
  },
  deleteManageSize: async (sizeId) => {
    const sizegroup = await axios.delete(
      asowp_api_url + "/manage-sizes/" + sizeId
    );
    return sizegroup.data;
  },

  //Function related to Manage cliparts

  getManageCliparts: async () => {
    const Managecliparts = await axios.get(asowp_api_url + "/manage-cliparts");
    return Managecliparts.data?.data ?? Managecliparts.data;
  },
  addManageClipart: async (manageclipart) => {
    const state = await axios.post(
      asowp_api_url + "/manage-cliparts",
      manageclipart
    );
    return state.data;
  },
  UpdateManageClipart: async (manageclipartId, manageclipart) => {
    const clipartgroup = await axios.post(
      asowp_api_url + "/manage-cliparts/" + manageclipartId,
      manageclipart
    );
    return clipartgroup.data;
  },
  deleteManageClipart: async (manageclipartId) => {
    const clipartgroup = await axios.delete(
      asowp_api_url + "/manage-cliparts/" + manageclipartId
    );
    return clipartgroup.data;
  },
  getManageClipartItems: async (manageclipartId) => {
    const clipartitem = await axios.get(
      asowp_api_url + "/manage-cliparts/" + manageclipartId + "/items"
    );
    return clipartitem.data;
  },
  getManageClipartItem: async (manageclipartId, clipartitemId) => {
    const clipartitem = await axios.get(
      asowp_api_url +
        "/manage-cliparts/" +
        manageclipartId +
        "/items/" +
        clipartitemId
    );
    return clipartitem.data;
  },
  addManageclipartItem: async (manageclipartId, clipartItem) => {
    const state = await axios.post(
      asowp_api_url + "/manage-cliparts/" + manageclipartId + "/items",
      clipartItem
    );
    return state.data;
  },
  updateManageClipartItem: async (manageclipartId, clipartId, clipartitem) => {
    const state = await axios.post(
      asowp_api_url +
        "/manage-cliparts/" +
        manageclipartId +
        "/items/" +
        clipartId,
      clipartitem
    );
    return state.data;
  },
  deleteManageclipartItem: async (manageclipartId, clipartitemId) => {
    const clipartitem = await axios.delete(
      asowp_api_url +
        "/manage-cliparts/" +
        manageclipartId +
        "/items/" +
        clipartitemId
    );
    return clipartitem.data;
  },

  //Function related manage to color palette

  getManageColorsPalettes: async () => {
    const ColorsPalettes = await axios.get(asowp_api_url + "/manage-colors");
    return ColorsPalettes.data;
  },
  getManageColorPalette: async (colorsPaletteId) => {
    const colorPalette = await axios.get(
      asowp_api_url + "/manage-colors/" + colorsPaletteId
    );
    return colorPalette.data;
  },
  addManageColorPalette: async (ColorsPalette) => {
    const addColor = await axios.post(
      asowp_api_url + "/manage-colors",
      ColorsPalette
    );
    return addColor.data;
  },
  UpdateManageColorsPalettes: async (colorsPaletteId, color) => {
    const updateColor = await axios.post(
      asowp_api_url + "/manage-colors/" + colorsPaletteId,
      color
    );
    return updateColor.data;
  },
  deleteManageColorsPalettes: async (colorsPaletteId) => {
    const deleteColor = await axios.delete(
      asowp_api_url + "/manage-colors/" + colorsPaletteId
    );
    return deleteColor.data;
  },

  //Function related to required options

  //Function related to shapes
  updateRequiredOptionShapes: async (configId, shapes) => {
    const edit = await axios.put(
      asowp_api_url +
        "/configs/" +
        configId +
        "/required-options/shapes",
      shapes
    );
    return edit.data;
  },
  getRequiredOptionShapes: async (configId) => {
    const result = await axios.get(
      asowp_api_url +
        "/configs/" +
        configId +
        "/required-options/shapes"
    );
    return result.data?.data?.shapes ?? result.data;
  },
  addRequiredOptionShapeItem: async (configId, shape) => {
    const add = await axios.post(
      asowp_api_url +
        "/configs/" +
        configId +
        "/required-options/shapes/items",
      shape
    );
    return add.data;
  },
  getRequiredOptionShapeItem: async (configId, itemId) => {
    const result = await axios.get(
      asowp_api_url +
        "/configs/" +
        configId +
        "/required-options/shapes/items/" +
        itemId
    );
    return result.data?.data?.shape ?? result.data;
  },
  updateRequiredOptionShapeItem: async (configId, itemId, shape) => {
    const edit = await axios.put(
      asowp_api_url +
        "/configs/" +
        configId +
        "/required-options/shapes/items/" +
        itemId,
      shape
    );
    return edit.data;
  },
  deleteRequiredOptionShapeItem: async (configId, itemId) => {
    const del = await axios.delete(
      asowp_api_url +
        "/configs/" +
        configId +
        "/required-options/shapes/items/" +
        itemId
    );
    return del.data;
  },
  //Function related to sizes
  updateRequiredOptionSizes: async (configId, sizes) => {
    const edit = await axios.put(
      asowp_api_url +
        "/configs/" +
        configId +
        "/required-options/sizes",
      sizes
    );
    return edit.data;
  },
  getRequiredOptionSizes: async (configId) => {
    const result = await axios.get(
      asowp_api_url +
        "/configs/" +
        configId +
        "/required-options/sizes"
    );
    return result.data?.data?.sizes ?? result.data;
  },
  addRequiredOptionSizeItem: async (configId, size) => {
    const add = await axios.post(
      asowp_api_url +
        "/configs/" +
        configId +
        "/required-options/sizes/items",
      size
    );
    return add.data;
  },
  getRequiredOptionSizeItem: async (configId, itemId) => {
    const result = await axios.get(
      asowp_api_url +
        "/configs/" +
        configId +
        "/required-options/sizes/items/" +
        itemId
    );
    return result.data?.data?.size ?? result.data;
  },
  updateRequiredOptionSizeItem: async (configId, itemId, size) => {
    const edit = await axios.put(
      asowp_api_url +
        "/configs/" +
        configId +
        "/required-options/sizes/items/" +
        itemId,
      size
    );
    return edit.data;
  },
  setRequiredOptionSizeDefault: async (configId, itemId) => {
    const edit = await axios.put(
      asowp_api_url +
        "/configs/" +
        configId +
        "/required-options/sizes/items/" +
        itemId +
        "/default"
    );
    return edit.data;
  },
  deleteRequiredOptionSizeItem: async (configId, itemId) => {
    const del = await axios.delete(
      asowp_api_url +
        "/configs/" +
        configId +
        "/required-options/sizes/items/" +
        itemId
    );
    return del.data;
  },
  //Function related to pricings
  getRequiredOptionPricings: async (configId) => {
    const result = await axios.get(
      asowp_api_url +
        "/configs/" +
        configId +
        "/required-options/pricings"
    );
    return result.data?.data?.pricing ?? result.data;
  },
  addRequiredOptionPricingItem: async (configId, pricing) => {
    const add = await axios.post(
      asowp_api_url +
        "/configs/" +
        configId +
        "/required-options/pricings/items",
      pricing
    );
    return add.data;
  },
  getRequiredOptionPricingItem: async (configId, itemId) => {
    const result = await axios.get(
      asowp_api_url +
        "/configs/" +
        configId +
        "/required-options/pricings/items/" +
        encodeURIComponent(itemId)
    );
    return result.data?.data?.pricing ?? result.data;
  },
  updateRequiredOptionsPricing: async (configId, pricingId, pricing) => {
    const edit = await axios.put(
      asowp_api_url +
        "/configs/" +
        configId +
        "/required-options/pricings/" +
        pricingId,
      pricing
    );
    return edit.data;
  },
  updateRequiredOptionPricingItem: async (configId, itemId, pricing) => {
    const edit = await axios.put(
      asowp_api_url +
        "/configs/" +
        configId +
        "/required-options/pricings/items/" +
        encodeURIComponent(itemId),
      pricing
    );
    return edit.data;
  },
  deleteRequiredOptionsPricing: async (configId, pricingId) => {
    const del = await axios.delete(
      asowp_api_url +
        "/configs/" +
        configId +
        "/required-options/pricings/" +
        pricingId
    );
    return del.data;
  },
  deleteRequiredOptionPricingItem: async (configId, itemId) => {
    const del = await axios.delete(
      asowp_api_url +
        "/configs/" +
        configId +
        "/required-options/pricings/items/" +
        encodeURIComponent(itemId)
    );
    return del.data;
  },
  addRequiredOptionsPricing: async (configId, pricing) => {
    const add = await axios.post(
      asowp_api_url +
        "/configs/" +
        configId +
        "/required-options/pricings",
      pricing
    );
    return add.data;
  },
  getRequiredOptionFonts: async (configId) => {
    const result = await axios.get(
      asowp_api_url +
        "/configs/" +
        configId +
        "/required-options/fonts"
    );
    return result.data?.data?.fonts ?? result.data;
  },
  addRequiredOptionFontItem: async (configId, fontId) => {
    const add = await axios.post(
      asowp_api_url +
        "/configs/" +
        configId +
        "/required-options/fonts/items",
      { font_id: fontId }
    );
    return add.data;
  },
  updateRequiredOptionFontItem: async (configId, fontId, position) => {
    const edit = await axios.put(
      asowp_api_url +
        "/configs/" +
        configId +
        "/required-options/fonts/items/" +
        encodeURIComponent(fontId),
      { position }
    );
    return edit.data;
  },
  deleteRequiredOptionFontItem: async (configId, fontId) => {
    const del = await axios.delete(
      asowp_api_url +
        "/configs/" +
        configId +
        "/required-options/fonts/items/" +
        encodeURIComponent(fontId)
    );
    return del.data;
  },
  //Function related to colors
  updateRequiredOptionColors: async (configId, colors) => {
    const edit = await axios.put(
      asowp_api_url +
        "/configs/" +
        configId +
        "/required-options/colors",
      colors
    );
    return edit.data;
  },
  getRequiredOptionColors: async (configId) => {
    const result = await axios.get(
      asowp_api_url +
        "/configs/" +
        configId +
        "/required-options/colors"
    );
    return result.data?.data?.colors ?? result.data;
  },
  addRequiredOptionColorItem: async (configId, color) => {
    const add = await axios.post(
      asowp_api_url +
        "/configs/" +
        configId +
        "/required-options/colors/items",
      color
    );
    return add.data;
  },
  getRequiredOptionColorItem: async (configId, itemId) => {
    const result = await axios.get(
      asowp_api_url +
        "/configs/" +
        configId +
        "/required-options/colors/items/" +
        itemId
    );
    return result.data?.data?.color ?? result.data;
  },
  updateRequiredOptionColorItem: async (configId, itemId, color) => {
    const edit = await axios.put(
      asowp_api_url +
        "/configs/" +
        configId +
        "/required-options/colors/items/" +
        itemId,
      color
    );
    return edit.data;
  },
  deleteRequiredOptionColorItem: async (configId, itemId) => {
    const del = await axios.delete(
      asowp_api_url +
        "/configs/" +
        configId +
        "/required-options/colors/items/" +
        itemId
    );
    return del.data;
  },

  //Function related to borders
  updateRequiredOptionBorders: async (configId, borders) => {
    const edit = await axios.put(
      asowp_api_url +
        "/configs/" +
        configId +
        "/required-options/borders",
      borders
    );
    return edit.data;
  },
  getRequiredOptionBorders: async (configId) => {
    const result = await axios.get(
      asowp_api_url +
        "/configs/" +
        configId +
        "/required-options/borders"
    );
    return result.data?.data?.borders ?? result.data;
  },
  addRequiredOptionBorderItem: async (configId, border) => {
    const add = await axios.post(
      asowp_api_url +
        "/configs/" +
        configId +
        "/required-options/borders/items",
      border
    );
    return add.data;
  },
  getRequiredOptionBorderItem: async (configId, itemId) => {
    const result = await axios.get(
      asowp_api_url +
        "/configs/" +
        configId +
        "/required-options/borders/items/" +
        itemId
    );
    return result.data?.data?.border ?? result.data;
  },
  updateRequiredOptionBorderItem: async (configId, itemId, border) => {
    const edit = await axios.put(
      asowp_api_url +
        "/configs/" +
        configId +
        "/required-options/borders/items/" +
        itemId,
      border
    );
    return edit.data;
  },
  deleteRequiredOptionBorderItem: async (configId, itemId) => {
    const del = await axios.delete(
      asowp_api_url +
        "/configs/" +
        configId +
        "/required-options/borders/items/" +
        itemId
    );
    return del.data;
  },
  //Function related to fixing methods
  updateRequiredOptionFixingMethods: async (configId, fixingMethods) => {
    const edit = await axios.put(
      asowp_api_url +
        "/configs/" +
        configId +
        "/required-options/fixing-methods",
      fixingMethods
    );
    return edit.data;
  },
  getRequiredOptionFixingMethods: async (configId) => {
    const result = await axios.get(
      asowp_api_url +
        "/configs/" +
        configId +
        "/required-options/fixing-methods"
    );
    return result.data?.data?.fixingMethods ?? result.data;
  },
  addRequiredOptionFixingMethodItem: async (configId, fixingMethod) => {
    const add = await axios.post(
      asowp_api_url +
        "/configs/" +
        configId +
        "/required-options/fixing-methods/items",
      fixingMethod
    );
    return add.data;
  },
  getRequiredOptionFixingMethodItem: async (configId, itemId) => {
    const result = await axios.get(
      asowp_api_url +
        "/configs/" +
        configId +
        "/required-options/fixing-methods/items/" +
        itemId
    );
    return result.data?.data?.fixingMethod ?? result.data;
  },
  updateRequiredOptionFixingMethodItem: async (configId, itemId, fixingMethod) => {
    const edit = await axios.put(
      asowp_api_url +
        "/configs/" +
        configId +
        "/required-options/fixing-methods/items/" +
        itemId,
      fixingMethod
    );
    return edit.data;
  },
  deleteRequiredOptionFixingMethodItem: async (configId, itemId) => {
    const del = await axios.delete(
      asowp_api_url +
        "/configs/" +
        configId +
        "/required-options/fixing-methods/items/" +
        itemId
    );
    return del.data;
  },
  // create additional options component
  addRequiredOptionComponent: async (configId, component) => {
    const post = await axios.post(
      asowp_api_url +
        "/configs/" +
        configId +
        "/required-options/components",
      component
    );
    return post.data;
  },
  getRequiredOptionComponents: async (configId) => {
    const material = await axios.get(
      asowp_api_url +
        "/configs/" +
        configId +
        "/required-options/components"
    );
    return material.data?.data?.components ?? material.data;
  },
  updateRequiredOptionComponent: async (configId, componentId, component) => {
    const material = await axios.put(
      asowp_api_url +
        "/configs/" +
        configId +
        "/required-options/components/" +
        componentId,
      component
    );
    return material.data;
  },
  deleteRequiredOptionComponent: async (configId, componentId) => {
    const material = await axios.delete(
      asowp_api_url +
        "/configs/" +
        configId +
        "/required-options/components/" +
        componentId
    );
    return material.data;
  },
  // Additional Options component options
  addRequiredOptionComponentOption: async (config, component, option) => {
    const post = await axios.post(
      asowp_api_url +
        "/configs/" +
        config +
        "/required-options/components/" +
        component +
        "/options",
      option
    );
    return post.data;
  },
  getRequiredOptionComponentOptions: async (configId, componentId) => {
    const material = await axios.get(
      asowp_api_url +
        "/configs/" +
        configId +
        "/required-options/components/" +
        componentId +
        "/options"
    );
    return material.data?.data?.componentOptions ?? material.data;
  },
  updateRequiredOptionComponentOption: async (configId, componentId, optionId, option) => {
    const material = await axios.put(
      asowp_api_url +
        "/configs/" +
        configId +
        "/required-options/components/" +
        componentId +
        "/" +
        optionId,
      option
    );
    return material.data;
  },
  deleteRequiredOptionComponentOption: async (configId, componentId, optionId, option) => {
    const material = await axios.delete(
      asowp_api_url +
        "/configs/" +
        configId +
        "/required-options/components/" +
        componentId +
        "/" +
        optionId,
      option
    );
    return material.data;
  },

  //Function related to Material with component
  updateRequiredOptionComponents: async (configId, components) => {
    const post = await axios.post(
      asowp_api_url +
        "/configs/" +
        configId +
        "/required-options/components/update",
      components
    );
    return post.data;
  },
  // create component
  addRequiredOptionComponentRow: async (configId, component) => {
    const post = await axios.post(
      asowp_api_url +
        "/configs/" +
        configId +
        "/required-options/components",
      component
    );
    return post.data;
  },
  getRequiredOptionComponentRows: async (configId) => {
    const material = await axios.get(
      asowp_api_url + "/configs/" + configId + "/required-options/components"
    );
    return material.data;
  },
  updateRequiredOptionComponentRow: async (configId, componentId, component) => {
    const material = await axios.put(
      asowp_api_url +
        "/configs/" +
        configId +
        "/required-options/components/" +
        componentId,
      component
    );
    return material.data;
  },
  deleteRequiredOptionComponentRow: async (configId, componentId) => {
    const material = await axios.delete(
      asowp_api_url +
        "/configs/" +
        configId +
        "/required-options/components/" +
        componentId
    );
    return material.data;
  },
  // Material Advance Options
  getRequiredOptionComponentRowOptions: async (config, component) => {
    const options = await axios.get(
      asowp_api_url +
        "/configs/" +
        config +
        "/required-options/components/" +
        component +
        "/options"
    );
    return options.data;
  },
  addRequiredOptionComponentRowOption: async (config, component, option) => {
    const post = await axios.post(
      asowp_api_url +
        "/configs/" +
        config +
        "/required-options/components/" +
        component +
        "/options",
      option
    );
    return post.data;
  },
  getRequiredOptionComponentRowOption: async (configId, componentId, optionId) => {
    const material = await axios.get(
      asowp_api_url +
        "/configs/" +
        configId +
        "/required-options/components/" +
        componentId +
        "/options/" +
        optionId
    );
    return material.data;
  },
  updateRequiredOptionComponentRowOption: async (configId, componentId, optionId, option) => {
    const material = await axios.put(
      asowp_api_url +
        "/configs/" +
        configId +
        "/required-options/components/" +
        componentId +
        "/options/" +
        optionId,
      option
    );
    return material.data;
  },
  deleteRequiredOptionComponentRowOption: async (configId, componentId, optionId, option) => {
    const material = await axios.delete(
      asowp_api_url +
        "/configs/" +
        configId +
        "/required-options/components/" +
        componentId +
        "/options/" +
        optionId,
      option
    );
    return material.data;
  },
  //shapes routes
  getGlobalShapes: async () => {
    const shapes = await axios.get(asowp_api_url + "/globals-settings/shapes");
    return shapes.data;
  },
  updateShapeInGlobalShapes: async (shapeId, shape) => {
    const shapes = await axios.put(
      asowp_api_url + "/globals-settings/shapes/" + shapeId,
      shape
    );
    return shapes.data;
  },
  //borders routes
  getGlobalBorders: async () => {
    const borders = await axios.get(
      asowp_api_url + "/globals-settings/borders"
    );
    return borders.data;
  },
  updateBorderInGlobalBorders: async (borderId, border) => {
    const borders = await axios.put(
      asowp_api_url + "/globals-settings/borders/" + borderId,
      border
    );
    return borders.data;
  },
  //Fixing Methods routes
  getGlobalFixingMethods: async () => {
    const FixingMethods = await axios.get(
      asowp_api_url + "/globals-settings/fixing-methods"
    );
    return FixingMethods.data;
  },
  updateFixingMethodInGlobalFixingMethods: async (
    FixingMethodId,
    FixingMethod
  ) => {
    const FixingMethods = await axios.put(
      asowp_api_url + "/globals-settings/fixing-methods/" + FixingMethodId,
      FixingMethod
    );
    return FixingMethods.data;
  },
  //function related to settings
  getGeneralSettings: async (config) => {
    const generals = await axios.get(
      asowp_api_url + "/configs/" + config + "/settings/generals"
    );
    return generals.data;
  } /*
    updateGeneralCustomizer: async (config, data) => {
        const customizer = await axios.post(asowp_api_url + '/configs/' + config + '/settings/generals/customizer', data);
        return customizer.data;
    }, */,
  updateGeneralMobile: async (config, data) => {
    const mobile = await axios.post(
      asowp_api_url + "/configs/" + config + "/settings/generals/mobile",
      data
    );
    return mobile.data;
  },
  updateGeneralProduct: async (config, data) => {
    const product = await axios.post(
      asowp_api_url + "/configs/" + config + "/settings/generals/product",
      data
    );
    return product.data;
  },
  updateGeneralOutput: async (config, data) => {
    const output = await axios.post(
      asowp_api_url + "/configs/" + config + "/settings/generals/output",
      data
    );
    return output.data;
  },
  updateGeneralSection: async (config, section, data) => {
    const generalSection = await axios.post(
      asowp_api_url + "/configs/" + config + "/settings/generals/" + section,
      data
    );
    return generalSection.data;
  },
  //fonction related to customizer options
  getCustomizerSignsSettings: async (config) => {
    const customizerSigns = await axios.get(
      asowp_api_url + "/configs/" + config + "/settings/customizer-signs"
    );
    return customizerSigns.data;
  },
  updateCustomizerSignsCustomizer: async (config, data) => {
    const customizer = await axios.post(
      asowp_api_url +
        "/configs/" +
        config +
        "/settings/customizer-signs/customizer",
      data
    );
    return customizer.data;
  },
  updateCustomizerSignsConfigOptions: async (config, data) => {
    const configOptions = await axios.post(
      asowp_api_url +
        "/configs/" +
        config +
        "/settings/customizer-signs/config-options",
      data
    );
    return configOptions.data;
  },
  updateCustomizerSignsSignPart: async (config, data) => {
    const SignPart = await axios.post(
      asowp_api_url +
        "/configs/" +
        config +
        "/settings/customizer-signs/sign-part",
      data
    );
    return SignPart.data;
  },
  updateCustomizerSignsImage: async (config, data) => {
    const Image = await axios.post(
      asowp_api_url +
        "/configs/" +
        config +
        "/settings/customizer-signs/images",
      data
    );
    return Image.data;
  },
  updateCustomizerSignsText: async (config, data) => {
    const Text = await axios.post(
      asowp_api_url + "/configs/" + config + "/settings/customizer-signs/text",
      data
    );
    return Text.data;
  },
  //fonction related to languages et images
  getLanguageImagesSettings: async (config) => {
    const languageImages = await axios.get(
      asowp_api_url + "/configs/" + config + "/settings/language-images"
    );
    return languageImages.data;
  },
  updateLanguageImagesMain: async (config, data) => {
    const main = await axios.post(
      asowp_api_url + "/configs/" + config + "/settings/language-images/main",
      data
    );
    return main.data;
  },
  updateLanguageImagesUploadDesign: async (config, data) => {
    const uploadDesign = await axios.post(
      asowp_api_url +
        "/configs/" +
        config +
        "/settings/language-images/upload-design",
      data
    );
    return uploadDesign.data;
  },
  updateLanguageImagesProduct: async (config, data) => {
    const product = await axios.post(
      asowp_api_url +
        "/configs/" +
        config +
        "/settings/language-images/product",
      data
    );
    return product.data;
  },
  updateLanguageImagesVisualizer: async (config, data) => {
    const visualizer = await axios.post(
      asowp_api_url +
        "/configs/" +
        config +
        "/settings/language-images/visualizer",
      data
    );
    return visualizer.data;
  },
  updateLanguageImagesImgs: async (config, data) => {
    const images = await axios.post(
      asowp_api_url + "/configs/" + config + "/settings/language-images/images",
      data
    );
    return images.data;
  },
  updateLanguageImagesReviewScreen: async (config, data) => {
    const ReviewScreen = await axios.post(
      asowp_api_url +
        "/configs/" +
        config +
        "/settings/language-images/review-screen",
      data
    );
    return ReviewScreen.data;
  },
  //fonction related to languages et images
  getThemesSettings: async (config) => {
    const themes = await axios.get(
      asowp_api_url + "/configs/" + config + "/settings/theme-colors"
    );
    return themes.data;
  },
  updateThemes: async (config, data) => {
    const main = await axios.post(
      asowp_api_url + "/configs/" + config + "/settings/theme-colors",
      data
    );
    return main.data;
  },

  //Health Product Routes
  saveGlobalSettingsProduct: async (data) => {
    const product = await axios.post(
      asowp_api_url + "/globals-settings/product/",
      data
    );
    return product.data;
  },
  getProductHealth: async () => {
    const product = await axios.get(
      asowp_api_url + "/globals-settings/product/checking"
    );
    return product.data;
  },
  getGlobalSettingsProduct: async () => {
    const product = await axios.get(
      asowp_api_url + "/globals-settings/product/"
    );
    return product.data;
  },
  saveGlobalSettingsConfigPage: async (data) => {
    const configPage = await axios.post(
      asowp_api_url + "/globals-settings/config-page",
      data
    );
    return configPage.data;
  },
  getGlobalSettingsConfigPages: async () => {
    const configPage = await axios.get(
      asowp_api_url + "/globals-settings/config-page"
    );
    return configPage.data;
  },
  getGlobalSettingsPages: async () => {
    const pages = await axios.get(asowp_api_url + "/globals-settings/pages");
    return pages.data;
  },
  addPageInGlobalSettings: async (data) => {
    const page = await axios.post(
      asowp_api_url + "/globals-settings/pages",
      data
    );
    return page.data;
  },
  getGlobalSettingsOutput: async () => {
    const outputSetting = await axios.get(
      asowp_api_url + "/globals-settings/output"
    );
    return outputSetting.data;
  },
  updateGlobalSettingsOutput: async (data) => {
    const outputSetting = await axios.post(
      asowp_api_url + "/globals-settings/output",
      data
    );
    return outputSetting.data;
  },
  //custom additional
  getCustomAdditionals: async (config) => {
    const CustomAdditionals = await axios.get(
      asowp_api_url + "/configs/" + config + "/additional-options/inputs"
    );
    return CustomAdditionals.data;
  },
  updateCustomAdditionals: async (config, CustomAdditionals) => {
    const state = await axios.post(
      asowp_api_url + "/configs/" + config + "/additional-options/inputs/update",
      CustomAdditionals
    );
    return state.data;
  },
  addCustomAdditional: async (config, CustomAdditional) => {
    const state = await axios.post(
      asowp_api_url + "/configs/" + config + "/additional-options/inputs",
      CustomAdditional
    );
    return state.data;
  },
  updateCustomAdditional: async (
    config,
    CustomAdditionalId,
    CustomAdditional
  ) => {
    const state = await axios.post(
      asowp_api_url +
        "/configs/" +
        config +
        "/additional-options/inputs/" +
        CustomAdditionalId,
      CustomAdditional
    );
    return state.data;
  },
  getCustomAdditional: async (config, CustomAdditionalId) => {
    const CustomAdditional = await axios.get(
      asowp_api_url +
        "/configs/" +
        config +
        "/additional-options/inputs/" +
        CustomAdditionalId
    );
    return CustomAdditional.data;
  },
  deleteCustomAdditional: async (config, CustomAdditionalId) => {
    const CustomAdditional = await axios.delete(
      asowp_api_url +
        "/configs/" +
        config +
        "/additional-options/inputs/" +
        CustomAdditionalId
    );
    return CustomAdditional.data;
  },
  //categories of templates
  getAllCategories: async () => {
    const categories = await axios.get(asowp_api_url + "/categories");
    return categories.data;
  },
  createCategory: async (category) => {
    const categories = await axios.post(
      asowp_api_url + "/categories",
      category
    );
    return categories.data;
  },
  updateCategory: async (category_id, category) => {
    const categories = await axios.put(
      asowp_api_url + "/categories/" + category_id,
      category
    );
    return categories.data;
  },
  deleteCategory: async (category_id) => {
    const categories = await axios.delete(
      asowp_api_url + "/categories/" + category_id
    );
    return categories.data;
  },
  //templates
  getAllTemplates: async (url = "") => {
    const templates = await axios.get(asowp_api_url + "/templates/" + url);
    return templates.data;
  },
  createTemplate: async (template) => {
    const templates = await axios.post(
      asowp_api_url + "/templates/" + template.configId,
      template
    );
    return templates.data;
  },
  getTemplate: async (config_id, template_id) => {
    const templates = await axios.get(
      asowp_api_url + "/templates/" + config_id + "/" + template_id
    );
    return templates.data;
  },
  updateTemplate: async (template_id, template) => {
    const templates = await axios.put(
      asowp_api_url + "/templates/" + template.configId + "/" + template_id,
      template
    );
    return templates.data;
  },
  deleteTemplate: async (config_id, template_id) => {
    const templates = await axios.delete(
      asowp_api_url + "/templates/" + config_id + "/" + template_id
    );
    return templates.data;
  },
};
export default api;
