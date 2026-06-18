import { createRouter, createWebHashHistory } from "vue-router";

// import configuration pages
import Configuration from "@/admin/pages/configuration/index.vue";
import CreateConfiguration from "@/admin/pages/configuration/CreateConfiguration.vue";
import ConfiguratorLayout from "@/admin/pages/configuration/ConfiguratorLayout.vue";

// import required options pages
import SizesPage from "@/admin/pages/configuration/required-options/SizesPage.vue";
import BordersPage from "@/admin/pages/configuration/required-options/BordersPage.vue";
import ColorsPage from "@/admin/pages/configuration/required-options/ColorsPage.vue";
import FixingMethodsPage from "@/admin/pages/configuration/required-options/FixingMethodsPage.vue";
import ShapesPage from "@/admin/pages/configuration/required-options/ShapesPage.vue";
import PricingsPage from "@/admin/pages/configuration/required-options/PricingsPage.vue";
import FontsPage from "@/admin/pages/configuration/required-options/FontsPage.vue";
import MaterialsPage from "@/admin/pages/configuration/required-options/MaterialsPage.vue";
import LightingsPage from "@/admin/pages/configuration/required-options/LightingsPage.vue";
import RequiredComponentsPage from "@/admin/pages/configuration/required-options/ComponentsPage.vue";
import RequiredComponentOptionsPage from "@/admin/pages/configuration/required-options/components/options.vue";

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
    {
      path: "/configurations",
      redirect: "/configuration",
    },
    {
      path: "/configurations/new",
      redirect: "/configuration/create",
    },
    {
      path: "/configurations/edit/:configId",
      redirect: (to) => `/configuration/${to.params.configId}/edit`,
    },
    {
      path: "/configuration",
      name: "configurations",
      component: Configuration,
    },
    {
      path: "/configuration/create",
      name: "create-configuration",
      component: CreateConfiguration,
    },
    {
      path: "/configuration/:configId/edit",
      name: "edit-configuration",
      component: CreateConfiguration,
      props: true,
    },
    // Configurator Layout - nested routes with sidebar navigation
    {
      path: "/configuration/:configId",
      component: ConfiguratorLayout,
      redirect: (to) => ({
        name: "sizes",
        params: { configId: to.params.configId },
      }),
      children: [
        {
          path: "required-options",
          redirect: () => ({ name: "sizes" }),
        },
        {
          path: "required-options/sizes",
          name: "sizes",
          component: SizesPage,
        },
        {
          path: "required-options/borders",
          name: "borders",
          component: BordersPage,
        },
        {
          path: "required-options/colors",
          name: "colors",
          component: ColorsPage,
        },
        {
          path: "required-options/lightings",
          name: "lightings",
          component: LightingsPage,
        },
        {
          path: "required-options/fixing-methods",
          name: "fixing-methods",
          component: FixingMethodsPage,
        },
        {
          path: "required-options/shapes",
          name: "shapes",
          component: ShapesPage,
        },
        {
          path: "required-options/pricings",
          name: "pricings",
          component: PricingsPage,
        },
        {
          path: "required-options/fonts",
          name: "fonts",
          component: FontsPage,
        },
        {
          path: "required-options/materials",
          name: "materials",
          component: MaterialsPage,
        },
        {
          path: "required-options/components",
          name: "required-components",
          component: RequiredComponentsPage,
        },
        {
          path: "required-options/components/:componentId/options",
          name: "required-component-options",
          component: RequiredComponentOptionsPage,
        },
        {
          path: "required-options/components/:componentId/options/:optionId",
          name: "required-component-option-detail",
          component: RequiredComponentOptionsPage,
        },
        {
          path: "design-setup",
          redirect: () => ({ name: "text-setting" }),
        },
        {
          path: "design-setup/text",
          name: "text-setting",
          component: TextSettingPage,
        },
        {
          path: "design-setup/images",
          name: "image-setting",
          component: ImageSettingPage,
        },
        {
          path: "design-setup/sign-part",
          name: "sign-part-setting",
          component: SignPartSettingPage,
        },
        {
          path: "additional-options",
          redirect: () => ({ name: "additional-inputs" }),
        },
        {
          path: "additional-options/additional-components",
          name: "Additional-Components",
          component: AdditionalComponents,
        },
        {
          path: "additional-options/additional-components/:additionalOptionID/options",
          name: "Additional-Components-Options",
          component: AdditionalComponents,
        },
        {
          path: "additional-options/inputs",
          name: "additional-inputs",
          component: AdditionalInputs,
        },
        {
          path: "settings",
          redirect: () => ({ name: "config-settings-generals" }),
        },
        {
          path: "settings/general",
          name: "config-settings-generals",
          component: settingsGenerals,
        },
        {
          path: "settings/customizer-sign",
          name: "config-settings-customizer-options",
          component: settingsCustomizerOptions,
        },
        {
          path: "settings/language-text",
          name: "config-settings-languages-images",
          component: settingsLanguagesImages,
        },
        {
          path: "settings/theme-color",
          name: "config-settings-themes-colors",
          component: settingsThemesColors,
        },
      ],
    },
    // preview route (outside sidebar)
    {
      path: "/configuration/:configId/preview",
      name: "preview-back",
      component: Preview,
    },
    {
      path: "/manage-fonts",
      redirect: "/manage-font",
    },
    {
      path: "/manage-font",
      name: "manageFonts",
      component: ManageFonts,
    },
    {
      path: "/manage-font/edit",
      name: "manage-font-edit",
      component: ManageFonts,
    },
    {
      path: "/manage-cliparts",
      name: "managecliparts",
      component: ManageCliparts,
    },
    {
      path: "/manage-cliparts/:groupId/cliparts",
      redirect: (to) => `/manage-cliparts/${to.params.groupId}/clipart`,
    },
    {
      path: "/manage-cliparts/edit",
      name: "manage-cliparts-edit",
      component: ManageCliparts,
    },
    {
      path: "/manage-cliparts/:groupId/clipart",
      name: "cliparts",
      component: Cliparts,
    },
    {
      path: "/manage-cliparts/:groupId/clipart/edit",
      name: "clipart-edit",
      component: Cliparts,
    },
    {
      path: "/global-settings",
      redirect: "/settings/output",
    },
    {
      path: "/global-settings/:section",
      redirect: (to) => {
        const sectionMap = {
          shapes: "shape",
          "fixing-methods": "fixing-method",
        };
        const section = sectionMap[to.params.section] || to.params.section;
        return `/settings/${section}`;
      },
    },
    {
      path: "/settings",
      redirect: "/settings/output",
    },
    {
      path: "/settings/shapes",
      redirect: "/settings/shape",
    },
    {
      path: "/settings/fixing-methods",
      redirect: "/settings/fixing-method",
    },
    {
      path: "/settings/border",
      name: "global-settings-border",
      component: GlobalSettings,
    },
    {
      path: "/settings/configuration-page",
      name: "global-settings-configuration-page",
      component: GlobalSettings,
    },
    {
      path: "/settings/fixing-method",
      name: "global-settings-fixing-method",
      component: GlobalSettings,
    },
    {
      path: "/settings/license",
      name: "global-settings-license",
      component: GlobalSettings,
    },
    {
      path: "/settings/output",
      name: "global-settings-output",
      component: GlobalSettings,
    },
    {
      path: "/settings/shape",
      name: "global-settings-shape",
      component: GlobalSettings,
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

const getLicenseStatus = () => {
  if (typeof window === "undefined" || !window.ascwo_data) {
    return {};
  }

  return window.ascwo_data.license_status || {};
};

const isLicenseActive = () => {
  const licenseStatus = getLicenseStatus();
  const licenseExpiry = Number(licenseStatus.timestamp || window.ascwo_data?.caches || 0);
  const serverNow = Number(licenseStatus.time || Math.floor(Date.now() / 1000));

  return licenseExpiry > serverNow;
};

router.beforeEach((to) => {
  // License-free installs are restricted to the public settings surface.
  if (isLicenseActive()) {
    return true;
  }

  const routeName = String(to.name || "");
  if (routeName.startsWith("global-settings-")) {
    return true;
  }

  return { name: "global-settings-license" };
});

export default router;
