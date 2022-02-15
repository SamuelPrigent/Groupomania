import { createRouter, createWebHistory } from "vue-router";

// Import des views (pages) du router
import home from "../pages/home.vue";
import login from "../pages/login.vue";
import signup from "../pages/signup.vue";
import article from "../pages/article.vue";
import newpost from "../pages/newpost.vue";
import account from "../pages/account.vue";
import articlemodify from "../pages/article-modify.vue";

// router
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: home,
      beforeEnter: (to, from) => {
        const token = localStorage.getItem("token");
        if (!token) {
          return { path: "/login" };
        }
        return true;
      },
    },
    {
      path: "/login",
      name: "login",
      component: login,
      beforeEnter: (to, from) => {
        const token = localStorage.getItem("token");
        if (token) {
          return { path: "/" };
        }
        return true;
      },
    },
    {
      path: "/signup",
      name: "signup",
      component: signup,
      beforeEnter: (to, from) => {
        const token = localStorage.getItem("token");
        if (token) {
          return { path: "/" };
        }
        return true;
      },
    },
    {
      path: "/newpost",
      name: "newpost",
      component: newpost,
      beforeEnter: (to, from) => {
        const token = localStorage.getItem("token");
        if (!token) {
          return { path: "/login" };
        }
        return true;
      },
    },
    {
      path: "/p:id",
      name: "article",
      component: article,
      beforeEnter: (to, from) => {
        const token = localStorage.getItem("token");
        if (!token) {
          return { path: "/login" };
        }
        return true;
      },
    }, // route dynamique
    {
      path: "/p:id/modify",
      name: "articlemodify",
      component: articlemodify,
      beforeEnter: (to, from) => {
        const token = localStorage.getItem("token");
        if (!token) {
          return { path: "/login" };
        }
        return true;
      },
    }, // route dynamique
    // route qui utilise get1 / me du back ensuite
    {
      path: "/account:id",
      name: "account",
      component: account,
      beforeEnter: (to, from) => {
        const token = localStorage.getItem("token");
        if (!token) {
          return { path: "/login" };
        }
        return true;
      },
    },
  ],
});

export default router; // importé => app
