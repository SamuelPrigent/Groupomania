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
      <div class="button-54">Articles</div>
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
  padding: 45px 0px 31px;
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

.button-54 {
  //font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 18px;
  letter-spacing: 2px;
  text-decoration: none;
  text-transform: uppercase;
  color: black;
  border: 3px solid #a52b2b;
  padding: 6px 12px;
  box-shadow: #a52b2b 1px 1px 0px 0px, #a52b2b 2px 2px 0px 0px,
    #a52b2b 3px 3px 0px 0px, #a52b2b 4px 4px 0px 0px, #a52b2b 5px 5px 0px 0px;
  position: relative;
  user-select: none;
  -webkit-user-select: none;
  height: auto;
  margin: 0px 0px auto;
}
</style>
