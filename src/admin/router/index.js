import { createRouter, createWebHashHistory } from "vue-router";

// import configuration pages
import Configuration from "@/admin/pages/configuration/index.vue";
import CreateConfiguration from "@/admin/pages/configuration/CreateConfiguration.vue";

// import required options pages
import SizesPage from "@/admin/pages/configuration/required-options/SizesPage.vue";
import BordersPage from "@/admin/pages/configuration/required-options/BordersPage.vue";
import ColorsPage from "@/admin/pages/configuration/required-options/ColorsPage.vue";
import FixingMethodsPage from "@/admin/pages/configuration/required-options/FixingMethodsPage.vue";
import ShapesPage from "@/admin/pages/configuration/required-options/ShapesPage.vue";
import PricingsPage from "@/admin/pages/configuration/required-options/PricingsPage.vue";
import FontsPage from "@/admin/pages/configuration/required-options/FontsPage.vue";
import MaterialsPage from "@/admin/pages/configuration/required-options/MaterialsPage.vue";
import RequiredComponentsPage from "@/admin/pages/configuration/required-options/ComponentsPage.vue";

// import design setup pages
import TextSettingPage from "@/admin/pages/configuration/design-setup/TextSettingPage.vue";
import ImageSettingPage from "@/admin/pages/configuration/design-setup/ImageSettingPage.vue";
import SignPartSettingPage from "@/admin/pages/configuration/design-setup/SignPartSettingPage.vue";

// import additional options pages
import AdditionalComponents from "@/admin/pages/configuration/additional-options/additional-components/index.vue";
import AdditionalInputs from "@/admin/pages/configuration/additional-options/inputs/index.vue";

// import settings pages
import settingsCustomizerOptions from "@/admin/pages/configuration/settings/customizer-signs/index.vue";
import settingsGenerals from "@/admin/pages/configuration/settings/generals/index.vue";
import settingsLanguagesImages from "@/admin/pages/configuration/settings/language-image/index.vue";
import settingsThemesColors from "@/admin/pages/configuration/settings/themes-color/index.vue";

// import manage fonts and cliparts pages
import ManageFonts from "@/admin/pages/manage-fonts/index.vue";
import ManageCliparts from "@/admin/pages/manage-cliparts/index.vue";
import Cliparts from "@/admin/pages/manage-cliparts/cliparts.vue";

// import global settings pages
import GlobalSettings from "@/admin/pages/global-settings/index.vue";

//import Templates from "@/admin/pages/templates/index.vue";
//import ConfigurateTemplate from "@/admin/pages/templates/configurate-template.vue";

// import request a quote page
import RequestQuotes from "@/admin/pages/request-quotes/index.vue";

//import other pages
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
    //lists configurations
    {
      path: "/configurations",
      name: "configurations",
      component: Configuration,
    },
    // create and edit configuration
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
    //required options paths
    {
      path: "/configuration/:configId",
      redirect: (to) => ({
        name: "fonts",
        params: { configId: to.params.configId },
      }),
    },
    {
      path: "/configuration/:configId/required-options",
      redirect: (to) => ({
        name: "fonts",
        params: { configId: to.params.configId },
      }),
    },
    {
      path: "/configuration/:configId/required-options/sizes",
      name: "sizes",
      component: SizesPage,
    },
    {
      path: "/configuration/:configId/required-options/borders",
      name: "borders",
      component: BordersPage,
    },
    {
      path: "/configuration/:configId/required-options/colors",
      name: "colors",
      component: ColorsPage,
    },
    {
      path: "/configuration/:configId/required-options/fixing-methods",
      name: "fixing-methods",
      component: FixingMethodsPage,
    },
    {
      path: "/configuration/:configId/required-options/shapes",
      name: "shapes",
      component: ShapesPage,
    },
    {
      path: "/configuration/:configId/required-options/pricings",
      name: "pricings",
      component: PricingsPage,
    },
    {
      path: "/configuration/:configId/required-options/fonts",
      name: "fonts",
      component: FontsPage,
    },
    {
      path: "/configuration/:configId/required-options/materials",
      name: "required-components",
      component: RequiredComponentsPage,
    },
    {
      path: "/configuration/:configId/required-options/materials",
      name: "materials",
      component: MaterialsPage,
    },
    //design setup paths
    {
      path: "/configuration/:configId/design-setup",
      redirect: (to) => ({
        name: "text-setting",
        params: { configId: to.params.configId },
      }),
    },
    {
      path: "/configuration/:configId/design-setup/text",
      name: "text-setting",
      component: TextSettingPage,
    },
    {
      path: "/configuration/:configId/design-setup/images",
      alias:
        "/configs/:configId/materials/:material/:materialId/simple/editor/image-setup",
      name: "image-setting",
      component: ImageSettingPage,
    },
    {
      path: "/configuration/:configId/design-setup/sign-part",
      name: "sign-part-setting",
      component: SignPartSettingPage,
    },
    //additional options paths
    {
      path: "/configuration/:configId/additional-options",
      redirect: (to) => ({
        name: "inputs",
        params: { configId: to.params.configId },
      }),
    },
    {
      path: "/configuration/:configId/additional-options/additional-components",
      name: "Additional-Components",
      component: AdditionalComponents,
    },
    /* {
      path: "/configuration/:configId/additional-options/additional-components/:componentID",
      name: "Simple-OthersComponents-Options",
      component: MaterialsShell,
    }, */
    {
      path: "/configuration/:configId/additional-options/inputs",
      name: "additional-inputs",
      component: AdditionalInputs,
    },
    // settings paths
    {
      path: "/configuration/:configId/settings",
      redirect: (to) => ({
        name: "config-settings-generals",
        params: { configId: to.params.configId },
      }),
    },
    {
      path: "/configuration/:configId/settings/general",
      alias: "/configs/:configId/settings/generals",
      name: "config-settings-generals",
      component: settingsGenerals,
    },
    {
      path: "/configuration/:configId/settings/customizer-sign",
      alias: "/configs/:configId/settings/customizer-options",
      name: "config-settings-customizer-options",
      component: settingsCustomizerOptions,
    },
    {
      path: "/configuration/:configId/settings/language-text",
      alias: "/configs/:configId/settings/language-images",
      name: "config-settings-languages-images",
      component: settingsLanguagesImages,
    },
    {
      path: "/configuration/:configId/settings/theme-color",
      alias: "/configs/:configId/settings/themes-colors",
      name: "config-settings-themes-colors",
      component: settingsThemesColors,
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
      alias: "/configs/preview/:configId",
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
