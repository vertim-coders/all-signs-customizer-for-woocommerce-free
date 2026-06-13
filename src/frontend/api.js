import axios from "axios";

const ascwoApiUrl = ascwo_data.rest_url;

const frontendApi = {
  getPreviewConfig: async (id) => {
    const response = await axios.get(`${ascwoApiUrl}/configs/${id}/preview`);
    return response.data;
  },
  getTemplate: async (configId, templateId) => {
    const response = await axios.get(
      `${ascwoApiUrl}/templates/${configId}/${templateId}`,
    );
    return response.data;
  },
  updateTemplate: async (templateId, template) => {
    const response = await axios.put(
      `${ascwoApiUrl}/templates/${template.configId}/${templateId}`,
      template,
    );
    return response.data;
  },
  submitRequestQuote: async (payload) => {
    const response = await axios.post(`${ascwoApiUrl}/request-quotes`, payload);
    return response.data;
  },
};

export default frontendApi;
