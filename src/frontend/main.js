import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

const activePage = window.asowp_data?.page || "";
const mountSelector = activePage
  ? `.asowp-frontend-app[data-asowp-page="${activePage}"], #asowp-frontend-app`
  : ".asowp-frontend-app, #asowp-frontend-app";

let isMounted = false;
let mountObserver = null;

function mountFrontendApp() {
  if (isMounted) {
    return true;
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
  app.mount(mountTarget);
  isMounted = true;

  if (mountObserver) {
    mountObserver.disconnect();
    mountObserver = null;
  }

  return true;
}

if (!mountFrontendApp()) {
  mountObserver = new MutationObserver(() => {
    mountFrontendApp();
  });

  mountObserver.observe(document.body, {
    childList: true,
    subtree: true,
  });
}
