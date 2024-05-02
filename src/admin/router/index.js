import Configuration from "@/admin/pages/configuration/index.vue";
import Materials from "@/admin/pages/configuration/materials/index.vue";
import Simple from "@/admin/pages/configuration/materials/simple/index.vue";
import Advance from "@/admin/pages/configuration/materials/advance/index.vue";
import ManageFonts from "@/admin/pages/manage-fonts/index.vue";
import ManageCliparts from "@/admin/pages/manage-cliparts/index.vue";
import Cliparts from "@/admin/pages/manage-cliparts/cliparts.vue";
import Settings from "@/admin/pages/configuration/settings/index.vue";
import GlobalSettings from "@/admin/pages/global-settings/index.vue";
import AdditionalOptions from "@/admin/pages/configuration/additional-options/index.vue";
import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      name: "configurations",
      component: Configuration,
    },
    {
      path: "/configs/:config/:configId/materials",
      name: "materials",
      component: Materials,
    },
    {
      path: "/configs/:config/:configId/materials/:material/:materialId/simple/sizes",
      name: "Simple-Sizes",
      component: Simple,
    },
    {
      path: "/configs/:config/:configId/materials/:material/:materialId/simple/borders",
      name: "Simple-Borders",
      component: Simple,
    },
    {
      path: "/configs/:config/:configId/materials/:material/:materialId/simple/colors",
      name: "Simple-Colors",
      component: Simple,
    },
    {
      path: "/configs/:config/:configId/materials/:material/:materialId/simple/fixing-methods",
      name: "Simple-FixingMethods",
      component: Simple,
    },
    {
      path: "/configs/:config/:configId/materials/:material/:materialId/simple/shapes",
      name: "Simple-Shapes",
      component: Simple,
    },
    {
      path: "/configs/:config/:configId/materials/:material/:materialId/simple/text-images",
      name: "Simple-TextImages",
      component: Simple,
    },
    {
      path: "/configs/:config/:configId/materials/:material/:materialId/simple/others-components",
      name: "Simple-OthersComponents",
      component: Simple,
    },
    {
      path: "/configs/:config/:configId/materials/:material/:materialId/simple/others-components/:additionalOptionID",
      name: "Simple-OthersComponents-Options",
      component: Simple,
    },
    {
      path: "/configs/:config/:configId/materials/:material/:materialId/advance",
      name: "Material-Advance",
      component: Advance,
    },
    {
      path: "/configs/:config/:configId/materials/:material/:materialId/advance/:component/:componentId/options",
      name: "Material-Advance-options",
      component: Advance,
    },
    {
      path: "/configs/:config/:configId/settings/generals",
      name: "config-settings-generals",
      component: Settings,
    },
    {
      path: "/configs/:config/:configId/settings/customizer-options",
      name: "config-settings-customizer-options",
      component: Settings,
    },
    {
      path: "/configs/:config/:configId/settings/language-images",
      name: "config-settings-languages-images",
      component: Settings,
    },
    {
      path: "/configs/:config/:configId/settings/themes-colors",
      name: "config-settings-themes-colors",
      component: Settings,
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
  ],
});

export default router;
