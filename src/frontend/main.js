import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

const activePage = window.asowp_data?.page || "";
const mountSelector = activePage
  ? `.asowp-frontend-app[data-asowp-page="${activePage}"], #asowp-frontend-app`
  : ".asowp-frontend-app, #asowp-frontend-app";

const mountTargets = Array.from(document.querySelectorAll(mountSelector));
const mountTarget = mountTargets[0] || null;

if (mountTarget) {
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
}
