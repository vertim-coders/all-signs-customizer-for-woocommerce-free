import axios from "axios";

const asowpApiUrl = asowp_data.rest_url;

const frontendApi = {
  getPreviewConfig: async (id) => {
    const response = await axios.get(`${asowpApiUrl}/configs/${id}/preview`);
    return response.data;
  },
  getTemplate: async (configId, templateId) => {
    const response = await axios.get(
      `${asowpApiUrl}/templates/${configId}/${templateId}`
    );
    return response.data;
  },
  updateTemplate: async (templateId, template) => {
    const response = await axios.put(
      `${asowpApiUrl}/templates/${template.configId}/${templateId}`,
      template
    );
    return response.data;
  },
  submitRequestQuote: async (payload) => {
    const response = await axios.post(`${asowpApiUrl}/request-quotes`, payload);
    return response.data;
  },
};

export default frontendApi;
