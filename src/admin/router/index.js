import Home from "admin/pages/Home.vue";
import Configuration from '@/admin/pages/configuration/index.vue'
import ManageFonts from '@/admin/pages/manage-fonts/index.vue'
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
      path: "/options",
      name: "Options",
      component: Options,
    },
  ],
});

export default router;