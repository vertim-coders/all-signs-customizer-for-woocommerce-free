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
      name: "preview-back",
      component: Home,
    },
  ],
});

export default router;
