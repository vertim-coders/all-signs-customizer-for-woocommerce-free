const assetsBaseUrl = () => String(window?.asowp_data?.assets_url || '').replace(/\/$/, '');

export const shopifyImageUrl = (path = '') => {
  const value = Array.isArray(path) ? path[0] : path;
  if (!value) return '';
  if (/^(https?:)?\/\//i.test(value) || value.startsWith('data:')) return value;

  const normalized = String(value).replace(/\\/g, '/').replace(/^\/+/, '');
  const relativePath = normalized.startsWith('images/')
    ? normalized.replace(/^images\//, '')
    : normalized;

  return `${assetsBaseUrl()}/images/shopify/${relativePath}`;
};

export const legacyDemoImageUrl = (path = '') => {
  const value = Array.isArray(path) ? path[0] : path;
  if (!value) return '';
  if (/^(https?:)?\/\//i.test(value) || value.startsWith('data:')) return value;

  return `${assetsBaseUrl()}/images/demos/${String(value).replace(/^\/+/, '')}`;
};

export const resolveAdminImageUrl = (path = '') => {
  const value = Array.isArray(path) ? path[0] : path;
  if (!value) return '';
  if (/^(https?:)?\/\//i.test(value) || value.startsWith('data:')) return value;
  if (String(value).replace(/^\/+/, '').startsWith('images/')) {
    return shopifyImageUrl(value);
  }
  return legacyDemoImageUrl(value);
};
