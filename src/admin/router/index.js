import Configuration from '@/admin/pages/configuration/index.vue'
import Materials from '@/admin/pages/configuration/materials/index.vue'
/* import Simple from '@/admin/pages/configuration/materials/simple/index.vue'
import Advance from '@/admin/pages/configuration/materials/advance/index.vue' */
import ManageFonts from '@/admin/pages/manage-fonts/index.vue'
import ManageCliparts from '@/admin/pages/manage-cliparts/index.vue'
import Cliparts from '@/admin/pages/manage-cliparts/cliparts.vue'
import ManageColors from '@/admin/pages/manage-colors/index.vue'
import ManageSizes from '@/admin/pages/manage-sizes/index.vue'
import Options from "admin/pages/Options.vue";
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      name: "configurations",
      component: Configuration,
    },
    {
      path: "/configs/:configId/materials",
      name: "materials",
      component: Materials,
    },
    /* {
      path: "/configs/:configId/materials/simple",
      name: "simple",
      component: Simple,
    },
    {
      path: "/configs/:configId/materials/advance",
      name: "advance",
      component: Advance,
    }, */
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
      path: "/manage-colors",
      name: "managecolors",
      component: ManageColors,
    },
    {
      path: "/manage-sizes",
      name: "managesizes",
      component: ManageSizes,
    },
    {
      path: "/global-settings",
      name: "Options",
      component: Options,
    },
  ],
});

export default router;