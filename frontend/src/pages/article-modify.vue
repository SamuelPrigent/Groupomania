<!-- JS -->
<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { fetchApi } from "../utils/fetchApi.js";
import postItemforput from "../components/post-put1.vue";

const route = useRoute(); // to get id
const postref = ref(); // pour insérer données de fetch
// 2 ref pour recup data du PUT via v-model
const title = ref("");
const content = ref("");

// Hook
onMounted(async () => {
  const id = route.params.id;
  const res = await fetchApi(`/api/posts/${id}`); // récups les données du post
  postref.value = res;
  // pré remplir boite de modif
  title.value = res.title;
  content.value = res.content;
});
</script>

<!-- HTML -->
<template>
  <div class="container-article">
    <div id="post-list">
      <postItemforput />
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

.authorAcessButton {
  display: flex;
  align-items: center;
  background-color: transparent;
  color: $groupomania-blue;
  border-right: 2px solid #91b1ce;
  font-size: 17px;
  padding: 0px 10px 0px;
  user-select: none;
  opacity: 0.6;
  text-decoration: none;

  &.mod:hover {
    color: $modify-color;
    border-color: $modify-color;
    opacity: 1;
    cursor: pointer;
  }
  &.del:hover {
    color: $delete-color;
    border-color: $delete-color;
    opacity: 1;
    cursor: pointer;
  }
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
  box-shadow: 1px 1px 1px 1px #0000ff1a;
  margin-bottom: $marginwithbutton;
  border-radius: 0px;
  display: flex;
  flex-direction: column;
  text-decoration: none;
  text-align: left;

  .update {
    padding: 16px 16px 10px 16px;
    font-size: 18px;
    line-height: 1;
    text-align: left;
    color: $grey;
    border-bottom: 1px solid $light;
    color: #2c3e50;
  }

  .update-title {
    padding: 6px 16px 3px;
    font-size: 17px;
    font-weight: 700;
    line-height: 1.7;
    text-align: left;
    box-sizing: border-box;
    border: none;
    color: $groupomania-blue;
  }

  .update-content {
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
