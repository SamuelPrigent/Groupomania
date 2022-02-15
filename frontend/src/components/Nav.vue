<script setup>
import { onMounted, ref } from "vue";
import router from "../router/index.js";
// import store from "../store/index.js"; // ??
import { fetchApi } from "../utils/fetchApi.js";
const userref = ref(); // ref = liens js et html exploité par define props

// Permet afficher des éléments quand on est connecté
const token = localStorage.getItem("token");

// Get Id userOnline - avoir le nom sur le compte pk j'avais fais ça ???
onMounted(async () => {
  if (token) {
    // utiliser route get me a faire dans le backend
    const userId = localStorage.getItem("userId"); // recup id du user online // via defineProps + fetch ?
    const fetchUser = await fetchApi(`/api/users/${userId}`); // récups les données du post
    userref.value = fetchUser;
  }
});

// Défine props - beoins pour le liens /account${user.id}
import { defineProps } from "vue";
const { user } = defineProps({
  user: Object,
});

// Account link
const accountLink = async () => {
  const userId = localStorage.getItem("userId");
  router.push(`/account${userId}`); // redirige vers home
};

// store vuex
import { useStore } from "vuex";
const store = useStore();

const disconnectUser = async () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  store.commit("disconnected"); // refresh nav button
  router.push("/login");
};
</script>

<template>
  <div class="banner">
    <div class="bannerIn">
      <div class="banner-left">
        <router-link class="banner-left" to="/"
          ><img
            class="banner-left-logo"
            src="public/icon-left-font-monochrome-white-2.png"
        /></router-link>
        <router-link class="banner-left" to="/">Groupomania</router-link>
      </div>
      <div class="banner-right">
        <router-link
          v-if="store.state.isConnected"
          to="/"
          class="router-button"
        >
          Accueil
        </router-link>
        <div
          v-if="store.state.isConnected"
          @click="accountLink"
          class="router-button"
        >
          Compte
        </div>
        <router-link
          v-if="!store.state.isConnected"
          to="/signup"
          class="router-button"
          >Inscription</router-link
        >
        <router-link
          v-if="!store.state.isConnected"
          to="/login"
          class="router-button"
          >Connexion</router-link
        >
        <div
          v-if="store.state.isConnected"
          @click="disconnectUser"
          class="router-button"
        >
          Déconnexion
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
$groupomania-blue: #0d1b31;
$groupomania-logo: #bac5f5;

.banner {
  border: 0px solid red;
  background-color: $groupomania-blue;
  width: auto;
  display: flex;
  height: 65px;
  padding: 0px 17px 0px;
  align-items: center;
  gap: 10px;
}

.bannerIn {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: space-between;
  align-items: center;
}

.banner-left-logo {
  height: 45%;
  position: relative;
  bottom: 1px;
}

.banner-left {
  display: flex;
  height: 100%;
  align-items: center;
  font-size: 20px;
  font-weight: 500;
  gap: 7px;
  color: white;
  text-decoration: none;
}

.banner-right {
  display: flex;
  border: 0px solid blue;
  height: 100%;
  align-items: center;
  gap: 9px;
  font-weight: 500;
}

.router-button {
  background-color: #444857;
  border-radius: 3px;
  padding: 14px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  height: 59%;
  font-size: 16px;
  text-decoration: none;
  color: white;
  cursor: pointer;
  user-select: none;
}

.router-button:hover {
  background-color: #5a5f73;
}
</style>
