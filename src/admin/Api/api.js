import axios from "axios";
const aso_api_url = aso_data.rest_url;
const api = {
    //function related to configuration
    getConfigs: async (url = '') => {
        const configs = await axios.get(aso_api_url + '/configs/' + url);
        return configs.data;
    },
    getConfig: async (id) => {
        const config = await axios.get(aso_api_url + '/configs/' + id);
        return config.data;
    },
    updateConfig: async (config) => {
        const edit = await axios.put(aso_api_url + '/configs/' + config.id, config);
        return edit.data;
    },
    deleteConfig: async (id) => {
        const del = await axios.delete(aso_api_url + '/configs/' + id);
        return del.data;
    },
    addConfig: async (data) => {
        const post = await axios.post(aso_api_url + '/configs', data);
        return post.data;
    },

    //function related to maretials

    updateMarerial: async (configId, materialId, material) => {
        const edit = await axios.put(aso_api_url + '/configs/' + configId + '/materials/' + materialId, material);
        return edit.data;
    },
    getMaterials: async (configId) => {
        const material = await axios.get(aso_api_url + '/configs/' + configId + '/materials');
        return material.data;
    },
    getMaterial: async (configId, materialId) => {
        const material = await axios.get(aso_api_url + '/configs/' + configId + '/materials/' + materialId);
        return material.data;
    },
    deleteMaterial: async (configId, materialId) => {
        const del = await axios.delete(aso_api_url + '/configs/' + configId + '/materials/' + materialId);
        return del.data;
    },
    addMaterial: async (configId, material) => {
        const post = await axios.post(aso_api_url + '/configs/' + configId + '/materials', material);
        return post.data;
    },

    //function related to Manage font
    getGoogleFonts: async () => {
        const fonts = await axios.get(aso_api_url + '/google-fonts');
        return fonts.data;
    },
    getManagefonts: async () => {
        const Managefonts = await axios.get(aso_api_url + '/manage-fonts');
        return Managefonts.data;
    },
    addManagefont: async (font) => {
        const state = await axios.post(aso_api_url + '/manage-fonts', font)
        return state.data;
    },
    updateManagefont: async (fontId, font) => {
        const state = await axios.post(aso_api_url + '/manage-fonts/' + fontId, font);
        return state.data;
    },
    getManagefont: async (fontId) => {
        const fontgroup = await axios.get(aso_api_url + '/manage-fonts/' + fontId);
        return fontgroup.data;
    },
    deleteManagefont: async (fontId) => {
        const fontgroup = await axios.delete(aso_api_url + '/manage-fonts/' + fontId);
        return fontgroup.data;
    },

    //Function related to Manage sizes

    getManageSizes: async () => {
        const Managesizes = await axios.get(aso_api_url + '/manage-sizes');
        return Managesizes.data;
    },
    addManageSize: async (size) => {
        const state = await axios.post(aso_api_url + '/manage-sizes', size)
        return state.data;
    },
    updateManageSize: async (sizeId, size) => {
        const state = await axios.post(aso_api_url + '/manage-sizes/' + sizeId, size);
        return state.data;
    },
    getManageSize: async (sizeId) => {
        const sizegroup = await axios.get(aso_api_url + '/manage-sizes/' + sizeId);
        return sizegroup.data;
    },
    deleteManageSize: async (sizeId) => {
        const sizegroup = await axios.delete(aso_api_url + '/manage-sizes/' + sizeId);
        return sizegroup.data;
    },

    //Function related to Manage cliparts

    getManageCliparts: async () => {
        const Managecliparts = await axios.get(aso_api_url + '/manage-cliparts');
        return Managecliparts.data;
    },
    addManageClipart: async (manageclipart) => {
        const state = await axios.post(aso_api_url + '/manage-cliparts', manageclipart)
        return state.data;
    },
    UpdateManageClipart: async (manageclipartId, manageclipart) => {
        const clipartgroup = await axios.post(aso_api_url + '/manage-cliparts/' + manageclipartId, manageclipart);
        return clipartgroup.data;
    },
    deleteManageClipart: async (manageclipartId) => {
        const clipartgroup = await axios.delete(aso_api_url + '/manage-cliparts/' + manageclipartId);
        return clipartgroup.data;
    },
    getManageClipartItems: async (manageclipartId) => {
        const clipartitem = await axios.get(aso_api_url + '/manage-cliparts/' + manageclipartId + '/items');
        return clipartitem.data;
    },
    getManageClipartItem: async (manageclipartId, clipartitemId) => {
        const clipartitem = await axios.get(aso_api_url + '/manage-cliparts/' + manageclipartId + '/items/' + clipartitemId);
        return clipartitem.data;
    },
    addManageclipartItem: async (manageclipartId, clipartItem) => {
        const state = await axios.post(aso_api_url + '/manage-cliparts/' + manageclipartId + '/items', clipartItem)
        return state.data;
    },
    updateManageClipartItem: async (manageclipartId, clipartId, clipartitem) => {
        const state = await axios.post(aso_api_url + '/manage-cliparts/' + manageclipartId + '/items/' + clipartId, clipartitem);
        return state.data;
    },
    deleteManageclipartItem: async (manageclipartId, clipartitemId) => {
        const clipartitem = await axios.delete(aso_api_url + '/manage-cliparts/' + manageclipartId + '/items/' + clipartitemId);
        return clipartitem.data;
    },

    //Function related manage to color palette

    getManageColorsPalettes: async () => {
        const Colorspalettes = await axios.get(aso_api_url + '/manage-colors');
        return Colorspalettes.data;
    },
    getManageColorPalette: async (colorsPaletteId) => {
        const colorPalette = await axios.get(aso_api_url + '/manage-colors/' + colorsPaletteId);
        return colorPalette.data;
    },
    addManageColorPalette: async (Colorspalette) => {
        const addColor = await axios.post(aso_api_url + '/manage-colors', Colorspalette)
        return addColor.data;
    },
    UpdateManageColorsPalettes: async (colorsPaletteId, color) => {
        const updateColor = await axios.post(aso_api_url + '/manage-colors/' + colorsPaletteId, color);
        return updateColor.data;
    },
    deleteManageColorsPalettes: async (colorsPaletteId) => {
        const deleteColor = await axios.delete(aso_api_url + '/manage-colors/' + colorsPaletteId);
        return deleteColor.data;
    },

    //Function related to Material Simple

    //Function related to shapes
    updateMaterialSimpleShapes: async (configId, materialId, shapes) => {
        const edit = await axios.put(aso_api_url + '/configs/' + configId + '/materials/' + materialId + '/shapes/', shapes);
        return edit.data;
    },
    getMaterialSimpleShapes: async () => {
        const result = await axios.get(aso_api_url + '/configs/' + configId + '/materials/' + materialId + '/shapes');
        return result.data;
    },
    //Function related to sizes
    updateMaterialSimpleSizes: async (configId, materialId, sizes) => {
        const edit = await axios.put(aso_api_url + '/configs/' + configId + '/materials/' + materialId + '/sizes/', sizes);
        return edit.data;
    },
    getMaterialSimpleSizes: async (configId, materialId) => {
        const result = await axios.get(aso_api_url + '/configs/' + configId + '/materials/' + materialId + '/sizes');
        return result.data;
    },
    //Function related to colors
    updateMaterialSimpleColors: async (configId, materialId, colors) => {
        const edit = await axios.put(aso_api_url + '/configs/' + configId + '/materials/' + materialId + '/colors/', colors);
        return edit.data;
    },
    getMaterialSimpleColors: async (configId, materialId) => {
        const result = await axios.get(aso_api_url + '/configs/' + configId + '/materials/' + materialId + '/colors');
        return result.data;
    },
    //Function related to borders
    updateMaterialSimpleBorders: async (configId, materialId, borders) => {
        const edit = await axios.put(aso_api_url + '/configs/' + configId + '/materials/' + materialId + '/borders/', borders);
        return edit.data;
    },
    getMaterialSimpleBorders: async (configId, materialId) => {
        const result = await axios.get(aso_api_url + '/configs/' + configId + '/materials/' + materialId + '/borders');
        return result.data;
    },
    //Function related to fixing methods
    updateMaterialSimpleFixingMethods: async (configId, materialId, fixingmethods) => {
        const edit = await axios.put(aso_api_url + '/configs/' + configId + '/materials/' + materialId + '/fixing-methods/', fixingmethods);
        return edit.data;
    },
    getMaterialSimpleFixingMethods: async (configId, materialId) => {
        const result = await axios.get(aso_api_url + '/configs/' + configId + '/materials/' + materialId + '/fixing-methods');
        return result.data;
    },

    //Function related to Materail with component

    // create component
    addMaterialComponent: async (configId, materialId, component) => {
        const post = await axios.post(aso_api_url + '/configs' + configId + '/materials/' + materialId, component);
        return post.data;
    },
    getMaterialComponent: async (configId, materialId, componentId) => {
        const material = await axios.get(aso_api_url + '/configs/' + configId + '/materials/' + materialId + '/' + componentId);
        return material.data;
    },
    updateMaterialComponent: async (configId, materialId, componentId, component) => {
        const material = await axios.get(aso_api_url + '/configs/' + configId + '/materials/' + materialId + '/' + componentId, component);
        return material.data;
    },
    deleteMaterialComponent: async (configId, materialId, componentId) => {
        const material = await axios.get(aso_api_url + '/configs/' + configId + '/materials/' + materialId + '/' + componentId);
        return material.data;
    },
    // create component
    addComponentOption: async (config, material, component, option) => {
        const post = await axios.post(aso_api_url + '/configs' + config + '/materials/' + material + '/' + component, option);
        return post.data;
    },
    getComponentOption: async (configId, materialId, componentId, optionId) => {
        const material = await axios.get(aso_api_url + '/configs/' + configId + '/materials/' + materialId + '/' + componentId + '/' + optionId);
        return material.data;
    },
    updateComponentOption: async (configId, materialId, componentId, optionId, option) => {
        const material = await axios.get(aso_api_url + '/configs/' + configId + '/materials/' + materialId + '/' + componentId + '/' + optionId, option);
        return material.data;
    },
    deleteComponentOption: async (configId, materialId, componentId, optionId, option) => {
        const material = await axios.get(aso_api_url + '/configs/' + configId + '/materials/' + materialId + '/' + componentId + '/' + optionId, option);
        return material.data;
    },

}
export default api;