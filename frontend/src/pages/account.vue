<!-- JS -->
<script setup>
import { fetchApi } from "../utils/fetchApi.js"; // get request données utilisateur
import { onMounted, ref } from "vue";
import userItem from "../components/user-get1.vue";
const userref = ref(); // ref permet ref entre js / html dans le define props

// import id - route.params
import { useRoute } from "vue-router";
const route = useRoute(); // to get id
// import router - redirection
import { useRouter } from "vue-router";
const router = useRouter();

// Log redirection
onMounted(async () => {
  const res = await fetchApi("/api/posts");

  if (!res) {
    //console.log("User offline");
    router.push("/login"); // Cannot read undefined
  }

  if (res) {
    //console.log("User online");
  }
});

// for modal
const confirmModal = ref();

// store vuex
import { useStore } from "vuex";
const store = useStore();

// Delete User
const deleteUser = async () => {
  const id = route.params.id;
  await fetchApi(`/api/users/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log("delete user");
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  store.commit("disconnected"); // refresh nav button
  router.push("/signup");
};

// Hook / fetch
const fetchUser = async () => {
  const id = route.params.id;
  const res1 = await fetchApi(`/api/users/${id}`); // récups les données du post
  userref.value = res1;
};
fetchUser();

// Défine props - beoins pour le liens /delete${user.id}
import { defineProps } from "vue";
const { user } = defineProps({
  user: Object,
});

/*
// Delete link
const deleteLink = async () => {
  const userId = localStorage.getItem("userId");
  router.push(`/delete${userId}`); // redirige vers home
};*/
</script>

<!-- HTML 
v-if="userref" empêche l'erreur quand on cherche l'info 
et que l'item n'a pas encore été chargé
-->
<template>
  <div v-if="!userref" class="container-account"></div>
  <div v-if="userref" class="container-account">
    <userItem :user="userref" />
    <!--
    <div class="buttons-list">
      <div @click="deleteLink" class="authorAcessButton del">
        Suppression du compte
      </div>
    </div>
    -->
    <!-- show modal-->
    <div class="buttons-delete">
      <it-button
        id="buttons-delete"
        outlined
        @click="confirmModal = true"
        type="danger"
        >Suppression du compte</it-button
      >
    </div>

    <it-modal v-model="confirmModal">
      <template #header>
        <h3>Supression du compte</h3>
      </template>
      <template #body>
        Le compte sera supprimé définitivement après confirmation.
      </template>
      <template #actions>
        <it-button @click="confirmModal = false">Annuler</it-button>
        <it-button
          outlined
          type="danger"
          @click="
            confirmModal = false;
            deleteUser();
          "
          >Supprimer</it-button
        >
      </template>
    </it-modal>
    <!-- delete account modal-->
  </div>
</template>

<!-- STYLE -->
<style lang="scss">
$dark: #34495e;
$title: #d1515a;
$light: #ecf0f1;
$grey: #576464;
$background: #f6f6f6;
$groupomania-blue: #132442;
$width-container: 77%;
$marginwithbutton: 11px;
$modify-color: #2ba158;
$delete-color: #ac3838;

.buttons-delete {
  display: flex;
  margin: auto;
  width: $width-container;
  justify-content: right;
}

#buttons-delete {
  font-size: 16px;
  font-weight: 300;
}

.container-account {
  width: 100%;
  min-height: 83vh;
  background-color: $background;
  font-size: 30px;
  padding-top: 70px;
  flex-direction: column;
}

.account-box {
  width: $width-container;
  margin: auto;
  background-color: white;
  box-shadow: 1px 1px 6px 1px #78787811;
  margin-bottom: $marginwithbutton;
  border-radius: 0px;
  display: flex;
  flex-direction: column;
  text-decoration: none;
  text-align: left;

  .account-box-title {
    padding: 16px 16px 10px 16px;
    font-size: 18px;
    line-height: 1;
    text-align: left;
    border-bottom: 1px solid $light;
    color: #2c3e50;
    user-select: none;
  }

  .account-box-text {
    font-size: 19px;
    padding: 10px 16px 15px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    //color: #2c3e50;
  }
}

/*
@media only screen and (max-width: 767px) {
}
@media only screen and (min-width: 768px) {
}
*/
</style>
