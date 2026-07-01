export const openAdminRouteWithReload = (hashPath) => {
  const normalizedHash = String(hashPath || '').startsWith('/')
    ? String(hashPath)
    : `/${hashPath}`;
  const targetUrl = `${window.location.pathname}?page=ascwo#${normalizedHash}`;

  window.location.href = targetUrl;
  window.location.reload();
};
