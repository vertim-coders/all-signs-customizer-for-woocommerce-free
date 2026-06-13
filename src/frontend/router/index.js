import Home from "frontend/pages/Home.vue";
import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      path: "/configs/:config/preview/:configId",
      alias: "/configuration/:configId/preview",
      name: "preview-back",
      component: Home,
    },
    {
      path: "/configs/template/:configId/:templateId",
      name: "template-maker",
      component: Home,
    },
  ],
});

export default router;
