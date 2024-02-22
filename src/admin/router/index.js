import Home from "admin/pages/Home.vue";
import Configuration from '@/admin/pages/configuration/index.vue'
import ManageFonts from '@/admin/pages/manage-fonts/index.vue'
import ManageCliparts from '@/admin/pages/manage-cliparts/index.vue'
import GroupsCliparts from '@/admin/pages/manage-cliparts/groups-cliparts.vue'
import ManageColors from '@/admin/pages/manage-colors/index.vue'
import ManageSizes from '@/admin/pages/manage-sizes/index.vue'
import Options from "admin/pages/Options.vue";
import { createRouter, createWebHashHistory} from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      name: "configurations",
      component: Configuration,
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
      path: "/groups-cliparts",
      name: "groupscliparts",
      component: GroupsCliparts,
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
      path: "/options",
      name: "Options",
      component: Options,
    },
  ],
});

export default router;