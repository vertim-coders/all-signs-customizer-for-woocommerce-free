const assetsBaseUrl = () =>
  String(window?.ascwo_data?.assets_url || "").replace(/\/$/, "");

export const adminImageUrl = (path = "") => {
  const value = Array.isArray(path) ? path[0] : path;
  if (!value) return "";
  if (/^(https?:)?\/\//i.test(value) || value.startsWith("data:")) return value;

  const normalized = String(value).replace(/\\/g, "/").replace(/^\/+/, "");
  const relativePath = normalized.startsWith("images/")
    ? normalized.replace(/^images\//, "")
    : normalized;

  return `${assetsBaseUrl()}/images/${relativePath}`;
};

export const adminAssetUrl = (path = "") => {
  const value = Array.isArray(path) ? path[0] : path;
  if (!value) return "";
  if (/^(https?:)?\/\//i.test(value) || value.startsWith("data:")) return value;

  const normalized = String(value).replace(/\\/g, "/").replace(/^\/+/, "");
  const relativePath = normalized.startsWith("assets/")
    ? normalized.replace(/^assets\//, "")
    : normalized;

  return `${assetsBaseUrl()}/assets/${relativePath}`;
};

export const demoImageUrl = (path = "") => {
  const value = Array.isArray(path) ? path[0] : path;
  if (!value) return "";
  if (/^(https?:)?\/\//i.test(value) || value.startsWith("data:")) return value;

  return `${assetsBaseUrl()}/images/demos/${String(value).replace(/^\/+/, "")}`;
};

export const resolveAdminImageUrl = (path = "") => {
  const value = Array.isArray(path) ? path[0] : path;
  if (!value) return "";
  if (/^(https?:)?\/\//i.test(value) || value.startsWith("data:")) return value;
  if (String(value).replace(/^\/+/, "").startsWith("images/")) {
    return adminImageUrl(value);
  }
  return demoImageUrl(value);
};
