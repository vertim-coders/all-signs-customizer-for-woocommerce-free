import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./utils/tailwindcss.min.js";
const app = createApp(App);
app.use(router);
app.mount("#aso-frontend-app");
