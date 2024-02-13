import axios from "axios";
const aso_api_url = aso_rest_url + 'aso/v1';
const api = {
    //function related to configuration
    getConfigs: async (url='') => {
        const configs = await axios.get(aso_api_url+'/configs/'+url);
        return configs.data;
    },
    getConfig: async (id) => {
        const config = await axios.get(aso_api_url+'/configs/'+id);
        return config.data;
    },
    updateConfig: async  (config) => {
        const edit = await axios.put(aso_api_url+'/configs/'+config.id,config);
        return edit.data;
    },
    deleteConfig: async  (id) => {
        const del = await axios.delete(aso_api_url+'/configs/'+id);
        return del.data;
    },
    addConfig: async (data) => {
        const post = await axios.post(aso_api_url+'/configs',data);
        return post.data;
    },
    
     //function related to maretials
    
    updateMarerial: async  (configId,materialId,material) => {
        const edit = await axios.put(aso_api_url+'/configs/'+configId+'/materials/'+materialId,material);
        return edit.data; 
    },
    getMaterials: async (configId) => {
        const material = await axios.get(aso_api_url+'/configs/'+configId+'/materials');
        return material.data;
    },
    getMaterial: async (configId,materialId) => {
        const material = await axios.get(aso_api_url+'/configs/'+configId+'/materials/'+materialId);
        return material.data;
    },
    deleteMaterial: async  (configId,materialId) => {
        const del = await axios.delete(aso_api_url+'/configs/'+configId+'/materials/'+materialId);
        return del.data;
    },
    addMaterial: async (configId,material) => {
        const post = await axios.post(aso_api_url+'/configs'+configId+'/materials/'+material);
        return post.data;
    },

    //function related to Manage font

    getManagefonts: async () => {
        const Managefonts = await axios.get(aso_api_url+'/manage-fonts');
        return Managefonts.data;
    },
    addManagefont: async (font) => {
        const state = await axios.post(aso_api_url+'/manage-fonts',font)
        return state.data;
    },
    updateManagefont: async (fontId,font) => {
        const state = await axios.post(aso_api_url+'/manage-fonts/'+fontId,font);
        return state.data;
    },
    getManagefont: async (fontId) => {
        const fontgroup = await axios.get(aso_api_url+'/manage-fonts/'+fontId);
        return fontgroup.data;
    },
    deleteManagefont: async (fontId) => {
        const fontgroup = await axios.delete(aso_api_url+'/manage-fonts/'+fontId);
        return fontgroup.data;
    },

    //Function related to Manage sizes

    getManageSizes: async () => {
        const Managefonts = await axios.get(aso_api_url+'/manage-sizes');
        return Managefonts.data;
    },
    addManageSize: async (font) => {
        const state = await axios.post(aso_api_url+'/manage-sizes',font)
        return state.data;
    },
    updateManageSize: async (fontId,font) => {
        const state = await axios.post(aso_api_url+'/manage-sizes/'+fontId,font);
        return state.data;
    },
    getManageSize: async (fontId) => {
        const fontgroup = await axios.get(aso_api_url+'/manage-sizes/'+fontId);
        return fontgroup.data;
    },
    deleteManageSize: async (fontId) => {
        const fontgroup = await axios.delete(aso_api_url+'/manage-sizes/'+fontId);
        return fontgroup.data;
    },

    //Function related to Manage cliparts
    
    getManageCliparts: async () => {
        const Managecliparts = await axios.get(aso_api_url+'/manage-cliparts');
        return Managecliparts.data;
    },
    addManageClipart: async (manageclipart) => {
        const state = await axios.post(aso_api_url+'/manage-cliparts',manageclipart)
        return state.data;
    },
    UpdateManageClipart: async (manageclipartId,manageclipart) => {
        const clipartgroup = await axios.post(aso_api_url+'/manage-cliparts/'+manageclipartId,manageclipart);
        return clipartgroup.data;
    },
    deleteManageClipart: async (manageclipartId) => {
        const clipartgroup = await axios.delete(aso_api_url+'/manage-cliparts/'+manageclipartId);
        return clipartgroup.data;
    },
    getManageClipartItems: async (manageclipartId) => {
        const clipartitem = await axios.get(aso_api_url+'/manage-cliparts/'+manageclipartId);
        return clipartitem.data;
    },
    getManageClipartItem: async (manageclipartId,clipartitemId) => {
        const clipartitem = await axios.get(aso_api_url+'/manage-cliparts/'+manageclipartId+'/items/'+clipartitemId);
        return clipartitem.data;
    },
    addManageclipartItem: async (manageclipartId, clipartItem) => {
        const state = await axios.post(aso_api_url+'/manage-cliparts/'+manageclipartId+'/items/',clipartItem)
        return state.data;
    },
    updateManageClipartItem: async (manageclipartId,clipartId,clipartitem) => {
        const state = await axios.post(aso_api_url+'/manage-cliparts/'+manageclipartId+'/items/'+clipartId,clipartitem);
        return state.data;
    },
    deleteManageclipart: async (manageclipartId,clipartitemId,) => {
        const clipartitem = await axios.delete(aso_api_url+'/manage-cliparts/'+manageclipartId+'/items/'+clipartitemId);
        return clipartitem.data;
    },

    //Function related to color palette

    getColorsPalettes: async () => {
        const Colorspalettes = await axios.get(aso_api_url+'/manage-colors');
        return Colorspalettes.data;
    },
    getColorPalette: async (colorsPaletteId) => {
        const colorPalette= await axios.get(aso_api_url+'/manage-colors/'+colorsPaletteId);
        return colorPalette.data;
    },
    addColorPalette: async ( Colorspalette) => {
        const addColor = await axios.post(aso_api_url+'/manage-colors', Colorspalette)
        return addColor.data;
    },
    UpdateColorsPalettes: async ( colorsPaletteId,color) => {
        const updateColor = await axios.post(aso_api_url+'/manage-colors/'+ colorsPaletteId,color);
        return updateColor.data;
    },
    deleteColorsPalettes: async (colorsPaletteId) => {
        const deleteColor = await axios.delete(aso_api_url+'/manage-colors/'+colorsPaletteId);
        return deleteColor.data;
    },
    
    //Function related to Material No Component

        //Function related to shapes
    updateNoComponentShapes: async  (configId,materialId,shapes) => {
        const edit = await axios.put(aso_api_url+'/configs/'+configId+'/materials/'+materialId+'/shapes/',shapes);
        return edit.data; 
    },
        //Function related to sizes
     updateNoComponentSizes: async  (configId,materialId,sizes) => {
        const edit = await axios.put(aso_api_url+'/configs/'+configId+'/materials/'+materialId+'/sizes/',sizes);
        return edit.data; 
    },
        //Function related to colors
    updateNoComponentColors: async  (configId,materialId,colors) => {
        const edit = await axios.put(aso_api_url+'/configs/'+configId+'/materials/'+materialId+'/colors/',colors);
        return edit.data; 
    },
        //Function related to borders
     updateNoComponentBorders: async  (configId,materialId,borders) => {
        const edit = await axios.put(aso_api_url+'/configs/'+configId+'/materials/'+materialId+'/borders/',borders);
        return edit.data; 
    },
        //Function related to fixing methods
     updateNoComponentFixingMethods: async  (configId,materialId,fixingmethods) => {
        const edit = await axios.put(aso_api_url+'/configs/'+configId+'/materials/'+materialId+'/fixingmethods/',fixingmethods);
        return edit.data; 
    },

    //Function related to Materail with component

        // create component
    addMaterialComponent: async (configId,materialId,component) => {
        const post = await axios.post(aso_api_url+'/configs'+configId+'/materials/'+materialId,component);
        return post.data;
    },
    getMaterialComponent: async (configId,materialId,componentId) => {
        const material = await axios.get(aso_api_url+'/configs/'+configId+'/materials/'+materialId+'/'+componentId);
        return material.data;
    },
    updateMaterialComponent: async (configId,materialId,componentId,component) => {
        const material = await axios.get(aso_api_url+'/configs/'+configId+'/materials/'+materialId+'/'+componentId,component);
        return material.data;
    },
    deleteMaterialComponent: async (configId,materialId,componentId) => {
        const material = await axios.get(aso_api_url+'/configs/'+configId+'/materials/'+materialId+'/'+componentId);
        return material.data;
    },
        // create component
    addComponentOption: async (config,material,component,option) => {
        const post = await axios.post(aso_api_url+'/configs'+config+'/materials/'+material+'/'+component,option);
        return post.data;
    },
    getComponentOption: async (configId,materialId,componentId,optionId) => {
        const material = await axios.get(aso_api_url+'/configs/'+configId+'/materials/'+materialId+'/'+componentId+'/'+optionId);
        return material.data;
    },
    updateComponentOption: async (configId,materialId,componentId,optionId,option) => {
        const material = await axios.get(aso_api_url+'/configs/'+configId+'/materials/'+materialId+'/'+componentId+'/'+optionId,option);
        return material.data;
    },
    deleteComponentOption: async (configId,materialId,componentId,optionId,option) => {
        const material = await axios.get(aso_api_url+'/configs/'+configId+'/materials/'+materialId+'/'+componentId+'/'+optionId,option);
        return material.data;
    },
}
export default api;