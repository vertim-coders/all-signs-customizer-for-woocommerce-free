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
        const edit = await axios.put(aso_api_url+'/configs/'+config.id,{title:config.title,description:config.description,icon:config.icon,popupImg:config.popupImg});
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
    getMaterials: async (config) => {
        const material = await axios.get(aso_api_url+'/configs/'+config+'/materials');
        return material.data;
    },
    getMaterial: async (config,materialId) => {
        const material = await axios.get(aso_api_url+'/configs/'+config+'/materials/'+materialId);
        return material.data;
    },
    deleteMaterial: async  (config,materialId) => {
        const del = await axios.delete(aso_api_url+'/configs/'+config+'/materials/'+materialId);
        return del.data;
    },
    addMaterial: async (config,material) => {
        const post = await axios.post(aso_api_url+'/configs'+config+'/materials/'+material);
        return post.data;
    },

     //function related to Manage font

    getManagefonts: async () => {
        const Managefonts = await axios.get(aso_api_url+'/manage-fonts/');
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

    //function related to Manage sizes

    getManagesizes: async () => {
        const Managesizes = await axios.get(aso_api_url+'/manage-sizes');
        return Managesizes.data;
    },
    addManagesizes: async (managesize) => {
        const state = await axios.post(aso_api_url+'/manage-sizes/',managesize)
        return state.data;
    },
    Updatemanagesizes: async (managesizeId) => {
        const sizegroup = await axios.post(aso_api_url+'/manage-sizes/'+managesizeId);
        return sizegroup.data;
    },
    deleteManagesizes: async (managesizeId) => {
        const sizegroup = await axios.delete(aso_api_url+'/managesizes/'+managesizeId);
        return sizegroup.data;
    },
    getManagesize: async (managesizeId) => {
        const sizeitem = await axios.get(aso_api_url+'/manage-sizes/'+managesizeId);
        return sizeitem.data;
    },
    getManagesize: async (managesizeId,sizeitemId) => {
        const sizeitem = await axios.get(aso_api_url+'/manage-sizes/'+managesizeId+'/sizeitem/'+sizeitemId);
        return sizeitem.data;
    },
    addManagesize: async (managesize, sizeitem) => {
        const state = await axios.post(aso_api_url+'/manage-sizes/'+managesize+'/sizeitem/',sizeitem)
        return state.data;
    },
    updateManagesize: async (managesizeId,sizeitemId,sizeitem) => {
        const state = await axios.post(aso_api_url+'/manage-sizes/'+managesizeId+'/sizeitem/'+sizeitemId,sizeitem);
        return state.data;
    },
    deleteManagesize: async (managesizeId,sizeitemId,) => {
        const sizeitem = await axios.delete(aso_api_url+'/managesizes/'+managesizeId+'/sizeitem/'+sizeitemId);
        return sizeitem.data;
    },

     //function related to Manage cliparts
    
    getManagecliparts: async () => {
        const Managecliparts = await axios.get(aso_api_url+'/manage-cliparts');
        return Managecliparts.data;
    },
    addManagecliparts: async (manageclipart) => {
        const state = await axios.post(aso_api_url+'/manage-cliparts/',manageclipart)
        return state.data;
    },
    UpdateManagecliparts: async (manageclipartId) => {
        const clipartgroup = await axios.post(aso_api_url+'/manage-cliparts/'+manageclipartId);
        return clipartgroup.data;
    },
    deleteManagecliparts: async (manageclipartId) => {
        const clipartgroup = await axios.delete(aso_api_url+'/managecliparts/'+manageclipartId);
        return clipartgroup.data;
    },
    getManageclipart: async (manageclipartId) => {
        const clipartitem = await axios.get(aso_api_url+'/manage-cliparts/'+manageclipartId);
        return clipartitem.data;
    },
    getManageclipart: async (manageclipartId,clipartitemId) => {
        const clipartitem = await axios.get(aso_api_url+'/manage-cliparts/'+manageclipartId+'/clipartitem/'+clipartitemId);
        return clipartitem.data;
    },
    addManageclipart: async (manageclipart, clipartitem) => {
        const state = await axios.post(aso_api_url+'/manage-cliparts/'+manageclipart+'/clipartitem/',clipartitem)
        return state.data;
    },
    updateManageclipart: async (manageclipartId,clipartId,clipartitem) => {
        const state = await axios.post(aso_api_url+'/manage-cliparts/'+manageclipartId+'/clipartitem/'+clipartId,clipartitem);
        return state.data;
    },
    deleteManageclipart: async (manageclipartId,clipartitemId,) => {
        const clipartitem = await axios.delete(aso_api_url+'/manage-cliparts/'+manageclipartId+'/clipartitem/'+clipartitemId);
        return clipartitem.data;
    },

     //function related to color palette

     getColorspalettes: async () => {
        const Colorspalettes = await axios.get(aso_api_url+'/colors-configs');
        return Colorspalettes.data;
    },
    addColorspalettes: async ( Colorspalette) => {
        const state = await axios.post(aso_api_url+'/colors-configs/', Colorspalette)
        return state.data;
    },
    UpdateColorspalettes: async ( ColorspaletteId) => {
        const colorgroup = await axios.post(aso_api_url+'/colors-configs/'+ ColorspaletteId);
        return colorgroup.data;
    },
    deleteColorspalettes: async (ColorspaletteId) => {
        const colorgroup = await axios.delete(aso_api_url+'/colors-configs/'+ColorspaletteId);
        return colorgroup.data;
    },
    getColorspalette: async (ColorspaletteId) => {
        const coloritem = await axios.get(aso_api_url+'/colors-configs/'+ColorspaletteId);
        return coloritem.data;
    },

    getColorspalette: async (ColorspaletteId,clipartitemId) => {
        const coloritem = await axios.get(aso_api_url+'/colors-configs/'+ColorspaletteId+'/clipartitem/'+clipartitemId);
        return coloritem.data;
    },
    addColorspalettes: async (Colorspalette, clipartitem) => {
        const state = await axios.post(aso_api_url+'/colors-configs/'+Colorspalette+'/clipartitem/',clipartitem)
        return state.data;
    },
    updateColorspalettes: async (ColorspaletteId,colorId,coloritem) => {
        const state = await axios.post(aso_api_url+'/colors-configs/'+ColorspaletteId+'/clipartitem/'+colorId,coloritem);
        return state.data;
    },
    deleteColorspalettes: async (ColorspaletteId,coloritemId,) => {
        const coloritem = await axios.delete(aso_api_url+'/colors-configs/'+ColorspaletteId+'/clipartitem/'+coloritemId);
        return coloritem.data;
    },
     //function related to no component
     //function related to shapes
    updateMarerial: async  (configId,materialId,shape) => {
        const edit = await axios.put(aso_api_url+'/configs/'+configId+'/materials/'+materialId+'/shapes/',shape);
        return edit.data; 
    },
     //function related to sizes
    updateMarerial: async  (configId,materialId,size) => {
        const edit = await axios.put(aso_api_url+'/configs/'+configId+'/materials/'+materialId+'/sizes/',size);
        return edit.data; 
    },
     //function related to colors
    updateMarerial: async  (configId,materialId,color) => {
        const edit = await axios.put(aso_api_url+'/configs/'+configId+'/materials/'+materialId+'/colors/',color);
        return edit.data; 
    },
     //function related to borders
    updateMarerial: async  (configId,materialId,border) => {
        const edit = await axios.put(aso_api_url+'/configs/'+configId+'/materials/'+materialId+'/borders/',border);
        return edit.data; 
    },
     //function related to fixing method
    updateMarerial: async  (configId,materialId,fixingmethod) => {
        const edit = await axios.put(aso_api_url+'/configs/'+configId+'/materials/'+materialId+'/fixingmethods/',fixingmethod);
        return edit.data; 
    },

    //function related to with component
    // create component
    addComponents: async (config,material,component) => {
        const post = await axios.post(aso_api_url+'/configs'+config+'/materials/'+material+'/component/'+component);
        return post.data;
    },
    getComponents: async (configId,materialId) => {
        const material = await axios.get(aso_api_url+'/configs/'+configId+'/materials/'+materialId+'/components/');
        return material.data;
    },
    updateComponents: async (configId,materialId,componentId,component) => {
        const material = await axios.get(aso_api_url+'/configs/'+configId+'/materials/'+materialId+'/components/'+componentId,component);
        return material.data;
    },
    deleteComponents: async (configId,materialId,componentId) => {
        const material = await axios.get(aso_api_url+'/configs/'+configId+'/materials/'+materialId+'/components/'+componentId);
        return material.data;
    },
    // create component
    addsubcomponents: async (config,material,component,subcomponent) => {
        const post = await axios.post(aso_api_url+'/configs'+config+'/materials/'+material+'/component/'+component+'/subcomponent/'+subcomponent);
        return post.data;
    },
    getsubcomponents: async (configId,materialId,componentId) => {
        const material = await axios.get(aso_api_url+'/configs/'+configId+'/materials/'+materialId+'/components/'+componentId+'/subcomponent');
        return material.data;
    },
    updatesubcomponents: async (configId,materialId,componentId,subcomponent) => {
        const material = await axios.get(aso_api_url+'/configs/'+configId+'/materials/'+materialId+'/components/'+componentId+'/subcomponent',subcomponent);
        return material.data;
    },
    deletesubcomponents: async (configId,materialId,componentId,subcomponentId) => {
        const material = await axios.get(aso_api_url+'/configs/'+configId+'/materials/'+materialId+'/components/'+componentId+'/subcomponent'+subcomponentId);
        return material.data;
    },
}
export default api;