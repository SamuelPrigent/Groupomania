import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import store from "./store/index.js";
// Style & Template
import Equal from "equal-vue"; // template
import "equal-vue/dist/style.css";

// Create APP
createApp(App)
  .use(Equal)
  .use(router) // ajout via tuto
  .use(store) // store vueX
  .mount("#app");
