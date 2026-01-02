import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { Crisp } from "crisp-sdk-web";
import menuFix from "./utils/admin-menu-fix";

const app = createApp(App);

app.use(router);
app.mount("#asowp-admin-app");
menuFix("asowp");
Crisp.configure("119b2249-75d7-428e-9822-47c33b453759");
