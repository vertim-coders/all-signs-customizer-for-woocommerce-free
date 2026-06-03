import { createRouter, createWebHashHistory } from "vue-router";
import Configuration from "@/admin/pages/configuration/index.vue";
import CreateConfiguration from "@/admin/pages/configuration/CreateConfiguration.vue";
import MaterialsShell from "@/admin/pages/configuration/materials/simple/index.vue";
import ManageFonts from "@/admin/pages/manage-fonts/index.vue";
import ManageCliparts from "@/admin/pages/manage-cliparts/index.vue";
import Cliparts from "@/admin/pages/manage-cliparts/cliparts.vue";
import GlobalSettings from "@/admin/pages/global-settings/index.vue";
import Templates from "@/admin/pages/templates/index.vue";
import ConfigurateTemplate from "@/admin/pages/templates/configurate-template.vue";
import RequestQuotes from "@/admin/pages/request-quotes/index.vue";
import AdditionalOptions from "@/admin/pages/configuration/additional-options/index.vue";
import Preview from "@/admin/pages/preview/index.vue";
import NotFound from "@/admin/pages/NotFound/index.vue";
import Home from "@/admin/pages/Home.vue";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/configurations",
      name: "configurations",
      component: Configuration,
    },
    {
      path: "/configurations/new",
      name: "create-configuration",
      component: CreateConfiguration,
    },
    {
      path: "/configurations/edit/:configId",
      name: "edit-configuration",
      component: CreateConfiguration,
      props: true,
    },
    {
      path: "/configuration/:configId",
      redirect: to => ({ name: "materials", params: { configId: to.params.configId } }),
    },
    {
      path: "/configuration/:configId/required-options",
      redirect: to => ({ name: "materials", params: { configId: to.params.configId } }),
    },
    {
      path: "/configuration/:configId/design-setup",
      redirect: to => ({ name: "Simple-TextSetting", params: { configId: to.params.configId } }),
    },
    {
      path: "/configuration/:configId/settings",
      redirect: to => ({ name: "config-settings-generals", params: { configId: to.params.configId } }),
    },
    {
      path: "/configuration/:configId/additional-options",
      redirect: to => ({ name: "Simple-OthersComponents", params: { configId: to.params.configId } }),
    },
    {
      path: "/configuration/:configId/required-options/materials",
      alias: "/configs/:config/:configId/materials",
      name: "materials",
      component: MaterialsShell,
    },
    {
      path: "/configuration/:configId/required-options/sizes",
      alias: "/configs/:config/:configId/materials/:material/:materialId/simple/sizes",
      name: "Simple-Sizes",
      component: MaterialsShell,
    },
    {
      path: "/configuration/:configId/required-options/borders",
      alias: "/configs/:config/:configId/materials/:material/:materialId/simple/borders",
      name: "Simple-Borders",
      component: MaterialsShell,
    },
    {
      path: "/configuration/:configId/required-options/colors",
      alias: "/configs/:config/:configId/materials/:material/:materialId/simple/colors",
      name: "Simple-Colors",
      component: MaterialsShell,
    },
    {
      path: "/configuration/:configId/required-options/fixing-methods",
      alias: "/configs/:config/:configId/materials/:material/:materialId/simple/fixing-methods",
      name: "Simple-FixingMethods",
      component: MaterialsShell,
    },
    {
      path: "/configuration/:configId/required-options/shapes",
      alias: "/configs/:config/:configId/materials/:material/:materialId/simple/shapes",
      name: "Simple-Shapes",
      component: MaterialsShell,
    },
    {
      path: "/configuration/:configId/required-options/pricing",
      alias: "/configs/:config/:configId/materials/:material/:materialId/simple/discounts",
      name: "Simple-Discounts",
      component: MaterialsShell,
    },
    {
      path: "/configuration/:configId/required-options/fonts",
      alias: "/configs/:config/:configId/materials/:material/:materialId/simple/text-images",
      name: "Simple-TextImages",
      component: MaterialsShell,
    },
    {
      path: "/configuration/:configId/design-setup/text",
      alias: "/configs/:config/:configId/materials/:material/:materialId/simple/editor/text-setting",
      name: "Simple-TextSetting",
      component: MaterialsShell,
    },
    {
      path: "/configuration/:configId/design-setup/images",
      alias: "/configs/:config/:configId/materials/:material/:materialId/simple/editor/image-setup",
      name: "Simple-ImageSetup",
      component: MaterialsShell,
    },
    {
      path: "/configuration/:configId/design-setup/sign-part",
      alias: "/configs/:config/:configId/materials/:material/:materialId/simple/editor/sign-part",
      name: "Simple-SignPartSetup",
      component: MaterialsShell,
    },
    {
      path: "/configuration/:configId/additional-options/additional-components",
      alias: "/configs/:config/:configId/materials/:material/:materialId/simple/others-components",
      name: "Simple-OthersComponents",
      component: MaterialsShell,
    },
    {
      path: "/configuration/:configId/additional-options/additional-components/:additionalOptionID",
      alias: "/configs/:config/:configId/materials/:material/:materialId/simple/others-components/:additionalOptionID",
      name: "Simple-OthersComponents-Options",
      component: MaterialsShell,
    },
    {
      path: "/configuration/:configId/additional-options/inputs",
      alias: "/configs/:config/:configId/materials/:material/:materialId/simple/additional-inputs",
      name: "Simple-AdditionalInputs",
      component: MaterialsShell,
    },
    {
      path: "/configuration/:configId/additional-options/cliparts",
      alias: "/configs/:config/:configId/materials/:material/:materialId/simple/cliparts",
      name: "Simple-Cliparts",
      component: MaterialsShell,
    },
    {
      path: "/configuration/:configId/builder",
      alias: "/configs/:config/:configId/materials/:material/:materialId/advance",
      name: "Material-Advance",
      component: MaterialsShell,
    },
    {
      path: "/configuration/:configId/builder/:component/:componentId/options",
      alias: "/configs/:config/:configId/materials/:material/:materialId/advance/:component/:componentId/options",
      name: "Material-Advance-options",
      component: MaterialsShell,
    },
    {
      path: "/configuration/:configId/settings/general",
      alias: "/configs/:config/:configId/settings/generals",
      name: "config-settings-generals",
      component: MaterialsShell,
    },
    {
      path: "/configuration/:configId/settings/customizer-sign",
      alias: "/configs/:config/:configId/settings/customizer-options",
      name: "config-settings-customizer-options",
      component: MaterialsShell,
    },
    {
      path: "/configuration/:configId/settings/language-text",
      alias: "/configs/:config/:configId/settings/language-images",
      name: "config-settings-languages-images",
      component: MaterialsShell,
    },
    {
      path: "/configuration/:configId/settings/theme-color",
      alias: "/configs/:config/:configId/settings/themes-colors",
      name: "config-settings-themes-colors",
      component: MaterialsShell,
    },
    {
      path: "/configs/:config/:configId/additional-options",
      name: "config-additional-options",
      component: AdditionalOptions,
    },
    {
      path: "/manage-fonts",
      name: "manageFonts",
      component: ManageFonts,
    },
    {
      path: "/manage-cliparts",
      name: "managecliparts",
      component: ManageCliparts,
    },
    {
      path: "/manage-cliparts/:groupId/cliparts",
      name: "cliparts",
      component: Cliparts,
    },
    {
      path: "/global-settings/border",
      name: "global-settings-border",
      component: GlobalSettings,
    },
    {
      path: "/global-settings/configuration-page",
      name: "global-settings-configuration-page",
      component: GlobalSettings,
    },
    {
      path: "/global-settings/fixing-methods",
      name: "global-settings-fixing-methods",
      component: GlobalSettings,
    },
    {
      path: "/global-settings/license",
      name: "global-settings-license",
      component: GlobalSettings,
    },
    {
      path: "/global-settings/output",
      name: "global-settings-output",
      component: GlobalSettings,
    },
    {
      path: "/global-settings/shapes",
      name: "global-settings-shapes",
      component: GlobalSettings,
    },
    {
      path: "/configuration/:configId/preview",
      alias: "/configs/:config/preview/:configId",
      name: "preview-back",
      component: Preview,
    },
    {
      path: "/configs/template/:configId/:templateId",
      name: "template-maker",
      component: ConfigurateTemplate,
    },
    {
      path: "/templates",
      name: "templates",
      component: Templates,
    },
    {
      path: "/request-quotes",
      name: "request-quotes",
      component: RequestQuotes,
    },
    {
      path: "/not-found",
      name: "NotFound",
      component: NotFound,
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: NotFound,
    },
  ],
});

export default router;
