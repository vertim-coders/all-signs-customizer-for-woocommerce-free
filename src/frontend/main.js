import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

const activePage = window.asowp_data?.page || "";
const mountSelector = activePage
  ? `.asowp-frontend-app[data-asowp-page="${activePage}"], #asowp-frontend-app`
  : ".asowp-frontend-app, #asowp-frontend-app";

let isMounted = false;
let mountedTarget = null;
let appInstance = null;
let mountObserver = null;

function removeInitialLoaders() {
  const loaderSelectors = [
    "#asowp-configurator-loader",
    "#asowp-templates-loader",
  ];

  loaderSelectors.forEach((selector) => {
    document.querySelectorAll(selector).forEach((node) => node.remove());
  });
}

function showFrontendError(mountTarget, error) {
  removeInitialLoaders();

  const container = mountTarget && mountTarget.parentNode ? mountTarget.parentNode : document.body;
  if (!container) {
    return;
  }

  const existing = document.getElementById("asowp-frontend-error");
  if (existing) {
    existing.remove();
  }

  const message = error && error.message ? error.message : "Unknown frontend error.";
  const panel = document.createElement("div");
  panel.id = "asowp-frontend-error";
  panel.innerHTML = `
    <div style="max-width: 960px; margin: 48px auto; padding: 24px; border: 1px solid #ef4444; border-radius: 8px; background: #fff5f5; color: #111827; font-family: Arial, sans-serif; position: relative; z-index: 999999;">
      <h2 style="margin: 0 0 12px; font-size: 20px; line-height: 1.2;">ASOWP configurator failed to render</h2>
      <p style="margin: 0 0 12px; font-size: 14px;">${message}</p>
      <pre style="white-space: pre-wrap; overflow: auto; margin: 0; font-size: 12px; color: #991b1b;">${error && error.stack ? error.stack : ""}</pre>
    </div>
  `;
  container.insertBefore(panel, mountTarget ? mountTarget.nextSibling : null);
}

function mountFrontendApp() {
  if (isMounted && mountedTarget && document.body.contains(mountedTarget)) {
    return true;
  }

  if (isMounted) {
    try {
      appInstance?.unmount();
    } catch (error) {
      console.warn("ASOWP frontend app could not be unmounted before remount.", error);
    }

    isMounted = false;
    mountedTarget = null;
    appInstance = null;
  }

  const mountTargets = Array.from(document.querySelectorAll(mountSelector));
  const mountTarget = mountTargets[0] || null;

  if (!mountTarget) {
    return false;
  }

  mountTargets.slice(1).forEach((node) => node.remove());

  const duplicateLoaderSelector =
    activePage === "templates"
      ? "#asowp-templates-loader"
      : activePage === "configurator"
        ? "#asowp-configurator-loader"
        : "";

  if (duplicateLoaderSelector) {
    const loaders = Array.from(document.querySelectorAll(duplicateLoaderSelector));
    loaders.slice(1).forEach((node) => node.remove());
  }

  const app = createApp(App);
  app.use(router);
  app.config.errorHandler = (error) => {
    console.error("ASOWP frontend render error.", error);
    showFrontendError(mountTarget, error);
  };

  try {
    app.mount(mountTarget);
  } catch (error) {
    console.error("ASOWP frontend failed to mount.", error);
    showFrontendError(mountTarget, error);
    throw error;
  }

  isMounted = true;
  mountedTarget = mountTarget;
  appInstance = app;

  if (mountObserver) {
    mountObserver.disconnect();
    mountObserver = null;
  }

  return true;
}

window.asowpMountFrontendApp = mountFrontendApp;

if (!mountFrontendApp()) {
  mountObserver = new MutationObserver(() => {
    mountFrontendApp();
  });

  mountObserver.observe(document.body, {
    childList: true,
    subtree: true,
  });
}
