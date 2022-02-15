<script setup>
import { onMounted, ref } from "vue";
import { fetchApi } from "../utils/fetchApi.js"; // verif chemin

// import route
import { useRoute } from "vue-router";
const route = useRoute(); // to get id

// import router - redirection
import { useRouter } from "vue-router";
const router = useRouter();

// 2 ref pour recup data du PUT via v-model
const title = ref("");
const content = ref("");

// Hook
onMounted(async () => {
  const id = route.params.id;
  const res = await fetchApi(`/api/posts/${id}`); // récups les données du post
  // pré remplir boite de modif
  title.value = res.title;
  content.value = res.content;
});

// Put Post
const modifyPost = async () => {
  const id = route.params.id;
  // modif du post back
  fetchApi(`/api/posts/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: {
      title: title.value,
      content: content.value,
    },
  });
  // modif du post front - sur page en cours ou plutôt principale ??
  console.log("Post", id, "update");
  await fetchApi(`/api/posts/${id}`);
  router.push("/"); // astuce changer le code pour pas avoir a refresh
};

// const compare userId (localstorage) &
</script>
<template>
  <div class="post-2">
    <div class="update">Modification de l'article</div>
    <input
      v-model="title"
      class="update-title"
      type="text"
      placeholder="Titre"
    />
    <textarea
      class="update-content"
      v-model="content"
      placeholder="Contenu de l'article"
    >
    </textarea>
  </div>

  <div class="buttons-list">
    <it-button
      @click="modifyPost"
      id="authorAcessButton-modify"
      type="success"
      outlined
      >Appliquer les modifications
    </it-button>
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

#authorAcessButton-modify {
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 300;
  user-select: none;
  color: $groupomania-blue;
}

.post-1 {
  width: $width-container;
  margin: auto;
  background-color: white;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 255, 0.1);
  margin-bottom: $marginwithbutton;
  border-radius: 0px;
  display: flex;
  flex-direction: column;
  text-decoration: none;

  .post-title-1 {
    padding: 16px 16px 0 16px;
    text-transform: uppercase;
    color: $groupomania-blue;
    font-size: 15px;
    font-weight: 800;
    line-height: 1;
    text-align: left;
  }

  .post-author-1 {
    padding: 5px 16px;
    color: $title;
    font-weight: 400;
    text-align: left;
    font-size: 18px;
    border-bottom: 1px solid $light;
  }

  .description-1 {
    text-align: justify;
    font-weight: 300;
    padding: 11px 16px 0px;
    line-height: 1.2;
    font-size: 18px;
    color: #2c3e50;

    &:first-letter {
      text-transform: capitalize;
    }
  }
  .date-1 {
    font-size: 16px;
    font-weight: 400;
    color: $grey;
    border-bottom: 1px solid $light;
    padding: 9px 16px 10px;
    text-align: right;
  }
}
</style>
