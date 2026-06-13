import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { ChatboxPosition, Crisp } from "crisp-sdk-web";
import menuFix from "./utils/admin-menu-fix";

const app = createApp(App);

app.use(router);
app.mount("#ascwo-admin-app");
menuFix("ascwo");

try {
  Crisp.configure("119b2249-75d7-428e-9822-47c33b453759", { autoload: true });
  Crisp.setPosition(ChatboxPosition.Right);
  Crisp.setAvailabilityTooltip(false);
  Crisp.setZIndex(900);

  const ensureCrispOffsetStyles = () => {
    if (document.getElementById("ascwo-crisp-wp-offset-style")) return;

    const style = document.createElement("style");
    style.id = "ascwo-crisp-wp-offset-style";
    style.textContent = `
      #crisp-chatbox {
        z-index: 900 !important;
      }
    `;
    document.head.appendChild(style);
  };

  const hideCrispWhenReady = (attempt = 0) => {
    ensureCrispOffsetStyles();

    if (window.$crisp?.is) {
      Crisp.setHideOnAway(true);
      Crisp.chat.hide();
      return;
    }

    if (attempt < 12) {
      window.setTimeout(() => hideCrispWhenReady(attempt + 1), 200);
    }
  };

  window.setTimeout(hideCrispWhenReady, 500);
  window.ascwoUpdateCrispPosition = () => {};
} catch (_) {}
