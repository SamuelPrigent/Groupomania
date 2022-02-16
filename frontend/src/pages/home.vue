<!-- JS -->
<script setup>
import { onMounted, ref } from "vue";
// import redirection
import { useRouter } from "vue-router";
const router = useRouter();

import { fetchApi } from "../utils/fetchApi.js";
import postItems from "../components/post-getall.vue"; // getall

// tableau vide remplis pas v-for
const posts = ref([]);

// Posts v-for => await api
onMounted(async () => {
  const res = await fetchApi("/api/posts");
  posts.value = res;

  if (!res) {
    //console.log("User offline");
    router.push("/login"); // Cannot read undefined
  }

  if (res) {
    //console.log("User online");
  }
});
</script>

<!-- HTML -->
<template>
  <div class="container">
    <div class="container-title">
      <div class="button-53">Articles</div>
      <router-link class="createPost" to="/newpost"
        ><it-button id="createPost2" type="neutral" outlined
          >Nouveau post</it-button
        ></router-link
      >
    </div>
    <ul id="post-list">
      <postItems v-for="post of posts" :post="post" :key="post.id" />
    </ul>
  </div>
</template>

<!-- CSS -->
<style lang="scss">
$dark: #34495e;
$title: #d1515a;
$light: #ecf0f1;
$grey: #576464;
$background: #f6f6f6;
$width-container-home: 75%;
$groupomania-blue: #0d1b31;

/*
@media only screen and (max-width: 767px) {
}
@media only screen and (min-width: 768px) {
}
*/

.container {
  display: flex;
  flex-direction: column;
  background-color: $background;
  min-height: 83vh;
}

.container-title {
  width: $width-container-home;
  justify-content: space-between;
  display: flex;
  padding: 45px 0px 20px;
  margin: 0px auto;
}

.createPost {
  letter-spacing: 1px;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  //margin: 0px 0px auto;
}

#createPost2 {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 16px;
  font-weight: 400;
}

.button-53 {
  font-size: 20px;
  letter-spacing: 1.5px;
  text-decoration: none;
  text-transform: uppercase;
  color: #0a1931;
  padding: 7px 0px 6px;
  position: relative;
  user-select: none;
  -webkit-user-select: none;
  height: auto;
  font-weight: 600;
}
</style>
