<!-- JS -->
<script setup>
import { ref } from "vue";
import { fetchApi } from "../utils/fetchApi.js";

// import router - redirection
import { useRouter } from "vue-router";
const router = useRouter();

// Ref to v-model
const title = ref("");
const content = ref("");

// Create Post
const createPost = async () => {
  await fetchApi(`/api/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: {
      title: title.value,
      content: content.value,
    },
  });
  router.push("/"); // redirige vers home
};
</script>

<!-- HTML -->
<template>
  <div class="container-article">
    <div id="post-list">
      <div class="post-2">
        <div class="update-2">Nouveau post</div>
        <input
          v-model="title"
          class="update-title-2"
          type="text"
          placeholder="Titre"
        />
        <textarea
          v-model="content"
          type="textarea"
          class="update-content-2"
          placeholder="Contenu de l'article"
        ></textarea>
      </div>
      <div class="buttons-list">
        <it-button
          @click="createPost"
          id="authorAcessButton-create"
          type="success"
          outlined
          >Publier
        </it-button>
      </div>
    </div>
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
$marginwithbutton: 9px;
$modify-color: #2ba158;
$delete-color: #ac3838;

.container-article {
  width: 100%;
  min-height: 83vh;
  background-color: $background;
  font-size: 30px;
  display: flex;
  padding-top: 70px;
  flex-direction: column;
}

#authorAcessButton-create {
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 300;
  user-select: none;
  color: $groupomania-blue;
}

.buttons-list {
  display: flex;
  margin: auto;
  width: $width-container;
  gap: 8px;
  margin-bottom: 17px;
  justify-content: right;
  //position: relative;
  //left: 2px;
}

.post-2 {
  width: $width-container;
  margin: auto;
  background-color: white;
  box-shadow: 1px 1px 7px 1px #7878781a;
  margin-bottom: $marginwithbutton;
  border-radius: 0px;
  display: flex;
  flex-direction: column;
  text-decoration: none;
  text-align: left;

  .update-2 {
    padding: 16px 16px 10px 16px;
    font-size: 18px;
    line-height: 1;
    text-align: left;
    color: $grey;
    border-bottom: 1px solid $light;
    color: #2c3e50;
    user-select: none;
  }

  .update-title-2 {
    padding: 6px 16px 3px;
    font-size: 17px;
    font-weight: 700;
    line-height: 1.7;
    text-align: left;
    box-sizing: border-box;
    border: none;
    color: $groupomania-blue;
  }

  .update-content-2 {
    padding: 0px 16px 0px;
    font-size: 17px;
    font-weight: 300;
    line-height: 1.7;
    text-align: left;
    box-sizing: border-box;
    color: $groupomania-blue;
    border: 0px transparent;
    box-sizing: border-box;
    max-width: 100%;
    min-width: 100%;
    min-height: 47px;
    height: 47px;
  }
}

/*
@media only screen and (max-width: 767px) {
}
@media only screen and (min-width: 768px) {
}
*/
</style>
