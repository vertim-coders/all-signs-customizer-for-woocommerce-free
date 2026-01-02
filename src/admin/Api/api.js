import axios from "axios";
const asowp_api_url = asowp_data.rest_url;
const api = {
  //function related to configuration
  getConfigs: async (url = "") => {
    const configs = await axios.get(asowp_api_url + "/configs/" + url);
    return configs.data;
  },
  getConfig: async (id) => {
    const config = await axios.get(asowp_api_url + "/configs/" + id);
    return config.data;
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
    return res.data;
  },

  getHomeStats: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const url =
      asowp_api_url + "/stats/home" + (query ? `?${query}` : "");
    const res = await axios.get(url);
    console.log("response rt: ", res)
    return res.data;
  },

  //function related to maretials

  updateMaterial: async (configId, materialId, material) => {
    const edit = await axios.put(
      asowp_api_url + "/configs/" + configId + "/materials/" + materialId,
      material
    );
    return edit.data;
  },
  getMaterials: async (configId) => {
    const material = await axios.get(
      asowp_api_url + "/configs/" + configId + "/materials"
    );
    return material.data;
  },
  getMaterial: async (configId, materialId) => {
    const material = await axios.get(
      asowp_api_url + "/configs/" + configId + "/materials/" + materialId
    );
    return material.data;
  },
  deleteMaterial: async (configId, materialId) => {
    const del = await axios.delete(
      asowp_api_url + "/configs/" + configId + "/materials/" + materialId
    );
    return del.data;
  },
  addMaterial: async (configId, material) => {
    const post = await axios.post(
      asowp_api_url + "/configs/" + configId + "/materials",
      material
    );
    return post.data;
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
    return Managecliparts.data;
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

  //Function related to Material Simple

  //Function related to shapes
  updateMaterialSimpleShapes: async (configId, materialId, shapes) => {
    const edit = await axios.put(
      asowp_api_url +
        "/configs/" +
        configId +
        "/materials/" +
        materialId +
        "/shapes/",
      shapes
    );
    return edit.data;
  },
  getMaterialSimpleShapes: async (configId, materialId) => {
    const result = await axios.get(
      asowp_api_url +
        "/configs/" +
        configId +
        "/materials/" +
        materialId +
        "/shapes"
    );
    return result.data;
  },
  //Function related to sizes
  updateMaterialSimpleSizes: async (configId, materialId, sizes) => {
    const edit = await axios.put(
      asowp_api_url +
        "/configs/" +
        configId +
        "/materials/" +
        materialId +
        "/sizes/",
      sizes
    );
    return edit.data;
  },
  getMaterialSimpleSizes: async (configId, materialId) => {
    const result = await axios.get(
      asowp_api_url +
        "/configs/" +
        configId +
        "/materials/" +
        materialId +
        "/sizes"
    );
    return result.data;
  },
  //Function related to colors
  updateMaterialSimpleColors: async (configId, materialId, colors) => {
    const edit = await axios.put(
      asowp_api_url +
        "/configs/" +
        configId +
        "/materials/" +
        materialId +
        "/colors/",
      colors
    );
    return edit.data;
  },
  getMaterialSimpleColors: async (configId, materialId) => {
    const result = await axios.get(
      asowp_api_url +
        "/configs/" +
        configId +
        "/materials/" +
        materialId +
        "/colors"
    );
    return result.data;
  },
  //Function related to textImages
  updateMaterialSimpleTextImages: async (configId, materialId, textImages) => {
    const edit = await axios.put(
      asowp_api_url +
        "/configs/" +
        configId +
        "/materials/" +
        materialId +
        "/text-images/",
      textImages
    );
    return edit.data;
  },
  getMaterialSimpleTextImages: async (configId, materialId) => {
    const result = await axios.get(
      asowp_api_url +
        "/configs/" +
        configId +
        "/materials/" +
        materialId +
        "/text-images"
    );
    return result.data;
  }
  ,
  //Function related to discounts
  updateMaterialSimpleDiscount: async (configId, materialId, textImages) => {
    const edit = await axios.put(
      asowp_api_url +
        "/configs/" +
        configId +
        "/materials/" +
        materialId +
        "/discounts/",
      textImages
    );
    return edit.data;
  },
  getMaterialSimpleDiscounts: async (configId, materialId) => {
    const result = await axios.get(
      asowp_api_url +
        "/configs/" +
        configId +
        "/materials/" +
        materialId +
        "/discounts"
    );
    return result.data;
  },
  //Function related to borders
  updateMaterialSimpleBorders: async (configId, materialId, borders) => {
    const edit = await axios.put(
      asowp_api_url +
        "/configs/" +
        configId +
        "/materials/" +
        materialId +
        "/borders/",
      borders
    );
    return edit.data;
  },
  getMaterialSimpleBorders: async (configId, materialId) => {
    const result = await axios.get(
      asowp_api_url +
        "/configs/" +
        configId +
        "/materials/" +
        materialId +
        "/borders"
    );
    return result.data;
  },
  //Function related to fixing methods
  updateMaterialSimpleFixingMethods: async (
    configId,
    materialId,
    fixingMethods
  ) => {
    const edit = await axios.put(
      asowp_api_url +
        "/configs/" +
        configId +
        "/materials/" +
        materialId +
        "/fixing-methods/",
      fixingMethods
    );
    return edit.data;
  },
  getMaterialSimpleFixingMethods: async (configId, materialId) => {
    const result = await axios.get(
      asowp_api_url +
        "/configs/" +
        configId +
        "/materials/" +
        materialId +
        "/fixing-methods"
    );
    return result.data;
  },
  // create additional options component
  addMaterialSimpleAdditionalOption: async (
    configId,
    materialId,
    component
  ) => {
    const post = await axios.post(
      asowp_api_url +
        "/configs/" +
        configId +
        "/materials/" +
        materialId +
        "/additional-options",
      component
    );
    return post.data;
  },
  getMaterialSimpleAdditionalOptions: async (configId, materialId) => {
    const material = await axios.get(
      asowp_api_url +
        "/configs/" +
        configId +
        "/materials/" +
        materialId +
        "/additional-options"
    );
    return material.data;
  },
  updateMaterialSimpleAdditionalOption: async (
    configId,
    materialId,
    componentId,
    component
  ) => {
    const material = await axios.put(
      asowp_api_url +
        "/configs/" +
        configId +
        "/materials/" +
        materialId +
        "/additional-options/" +
        componentId,
      component
    );
    return material.data;
  },
  deleteMaterialSimpleAdditionalOption: async (
    configId,
    materialId,
    componentId
  ) => {
    const material = await axios.delete(
      asowp_api_url +
        "/configs/" +
        configId +
        "/materials/" +
        materialId +
        "/additional-options/" +
        componentId
    );
    return material.data;
  },
  // Additional Options component options
  addMaterialSimpleAdditionalOptionsItem: async (
    config,
    material,
    component,
    option
  ) => {
    const post = await axios.post(
      asowp_api_url +
        "/configs/" +
        config +
        "/materials/" +
        material +
        "/additional-options/" +
        component +
        "/new-option",
      option
    );
    return post.data;
  },
  getMaterialSimpleAdditionalOptionsItems: async (
    configId,
    materialId,
    componentId
  ) => {
    const material = await axios.get(
      asowp_api_url +
        "/configs/" +
        configId +
        "/materials/" +
        materialId +
        "/additional-options/" +
        componentId
    );
    return material.data;
  },
  updateMaterialSimpleAdditionalOptionsItem: async (
    configId,
    materialId,
    componentId,
    optionId,
    option
  ) => {
    const material = await axios.put(
      asowp_api_url +
        "/configs/" +
        configId +
        "/materials/" +
        materialId +
        "/additional-options/" +
        componentId +
        "/" +
        optionId,
      option
    );
    return material.data;
  },
  deleteMaterialSimpleAdditionalOptionsItem: async (
    configId,
    materialId,
    componentId,
    optionId,
    option
  ) => {
    const material = await axios.delete(
      asowp_api_url +
        "/configs/" +
        configId +
        "/materials/" +
        materialId +
        "/additional-options/" +
        componentId +
        "/" +
        optionId,
      option
    );
    return material.data;
  },

  //Function related to Material with component
  updateMaterialAdvanceComponents: async (configId, materialId, components) => {
    const post = await axios.post(
      asowp_api_url +
        "/configs/" +
        configId +
        "/materials/" +
        materialId +
        "/components/update",
      components
    );
    return post.data;
  },
  // create component
  addMaterialAdvanceComponent: async (configId, materialId, component) => {
    const post = await axios.post(
      asowp_api_url +
        "/configs/" +
        configId +
        "/materials/" +
        materialId +
        "/components",
      component
    );
    return post.data;
  },
  getMaterialAdvanceComponent: async (configId, materialId) => {
    const material = await axios.get(
      asowp_api_url + "/configs/" + configId + "/materials/" + materialId + "/"
    );
    return material.data;
  },
  updateMaterialAdvanceComponent: async (
    configId,
    materialId,
    componentId,
    component
  ) => {
    const material = await axios.put(
      asowp_api_url +
        "/configs/" +
        configId +
        "/materials/" +
        materialId +
        "/components/" +
        componentId,
      component
    );
    return material.data;
  },
  deleteMaterialAdvanceComponent: async (configId, materialId, componentId) => {
    const material = await axios.delete(
      asowp_api_url +
        "/configs/" +
        configId +
        "/materials/" +
        materialId +
        "/components/" +
        componentId
    );
    return material.data;
  },
  // Material Advance Options
  getMaterialAdvanceComponentOptions: async (config, material, component) => {
    const options = await axios.get(
      asowp_api_url +
        "/configs/" +
        config +
        "/materials/" +
        material +
        "/components/" +
        component
    );
    return options.data;
  },
  addMaterialAdvanceComponentOption: async (
    config,
    material,
    component,
    option
  ) => {
    const post = await axios.post(
      asowp_api_url +
        "/configs/" +
        config +
        "/materials/" +
        material +
        "/components/" +
        component +
        "/new-option",
      option
    );
    return post.data;
  },
  getMaterialAdvanceComponentOption: async (
    configId,
    materialId,
    componentId,
    optionId
  ) => {
    const material = await axios.get(
      asowp_api_url +
        "/configs/" +
        configId +
        "/materials/" +
        materialId +
        "/components/" +
        componentId +
        "/" +
        optionId
    );
    return material.data;
  },
  updateMaterialAdvanceComponentOption: async (
    configId,
    materialId,
    componentId,
    optionId,
    option
  ) => {
    const material = await axios.put(
      asowp_api_url +
        "/configs/" +
        configId +
        "/materials/" +
        materialId +
        "/components/" +
        componentId +
        "/" +
        optionId,
      option
    );
    return material.data;
  },
  deleteMaterialAdvanceComponentOption: async (
    configId,
    materialId,
    componentId,
    optionId,
    option
  ) => {
    const material = await axios.delete(
      asowp_api_url +
        "/configs/" +
        configId +
        "/materials/" +
        materialId +
        "/components/" +
        componentId +
        "/" +
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
      asowp_api_url + "/configs/" + config + "/custom-additionals"
    );
    return CustomAdditionals.data;
  },
  updateCustomAdditionals: async (config, CustomAdditionals) => {
    const state = await axios.post(
      asowp_api_url + "/configs/" + config + "/custom-additionals/update",
      CustomAdditionals
    );
    return state.data;
  },
  addCustomAdditional: async (config, CustomAdditional) => {
    const state = await axios.post(
      asowp_api_url + "/configs/" + config + "/custom-additionals",
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
        "/custom-additionals/" +
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
        "/custom-additionals/" +
        CustomAdditionalId
    );
    return CustomAdditional.data;
  },
  deleteCustomAdditional: async (config, CustomAdditionalId) => {
    const CustomAdditional = await axios.delete(
      asowp_api_url +
        "/configs/" +
        config +
        "/custom-additionals/" +
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
