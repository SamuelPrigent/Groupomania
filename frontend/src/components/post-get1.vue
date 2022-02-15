<script setup>
import dayjs from "dayjs"; // import systeme de date
import "dayjs/locale/fr"; // set to fr

// Récup info html via fetch
import { defineProps } from "vue";
const { post } = defineProps({
  post: Object,
});

//for delete post & redirection
import { useRoute } from "vue-router";
const route = useRoute(); // to get id
import { fetchApi } from "../utils/fetchApi.js";

// import for redirection
import { useRouter } from "vue-router";
const router = useRouter();

// Modify link
const modifyLink = async () => {
  const postId = route.params.id;
  router.push(`/p${postId}/modify`); // redirige vers home
};

// Delete Post
const deletePost = async () => {
  const id = route.params.id;
  await fetchApi(`/api/posts/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log("Post", id, "deleted");
  router.push("/"); // redirige vers home
};

// Const author et user for v-if comparison
const user = localStorage.getItem("userId");
const postAuthor = post.author.id;
</script>
<template>
  <div class="post-1">
    <h4 class="post-title-1">{{ post.title }}</h4>
    <h3 class="post-author-1">
      {{ post.author.name }} {{ post.author.surname }}
    </h3>
    <p class="description-1">
      {{ post.content }}
    </p>
    <p class="date-1">
      {{ dayjs(post.createdAt).locale("fr").format("DD MMMM YYYY, HH:mm") }}
    </p>
  </div>
  <div class="buttons-list">
    <it-button
      v-if="user == postAuthor"
      id="authorAcessButton-2"
      @click="modifyLink"
      type="success"
      outlined
      >Modifier</it-button
    >
    <it-button
      v-if="user == postAuthor"
      id="authorAcessButton-2"
      @click="deletePost"
      type="danger"
      outlined
      >Supprimer
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

#authorAcessButton-2 {
  display: flex;
  align-items: center;
  font-size: 15px;
  font-weight: 300;
  user-select: none;
  color: $groupomania-blue;
}

.post-1 {
  width: $width-container;
  margin: auto;
  background-color: white;
  box-shadow: 1px 1px 6px 1px #78787811;
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
    font-size: 15px;
    font-weight: 300;
    color: $grey;
    border-bottom: 1px solid $light;
    padding: 9px 16px 10px;
    text-align: right;
  }
}
</style>
