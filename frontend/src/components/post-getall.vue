<script setup>
import dayjs from "dayjs";
import "dayjs/locale/fr";
// import props - bouclé sur :post de home
import { defineProps } from "vue";
const { post } = defineProps({
  post: Object,
});
</script>
<template>
  <router-link :to="`/p${post.id}`" class="post">
    <h4 class="post-title">
      {{ post.title }}
    </h4>
    <h3 class="post-author">
      {{ post.author.name }} {{ post.author.surname }}
    </h3>
    <p class="description">
      {{ post.content }}
    </p>
    <p class="date">
      {{ dayjs(post.createdAt).locale("fr").format("DD MMMM YYYY, HH:mm") }}
    </p>
  </router-link>
</template>

<!-- STYLE -->
<style lang="scss">
$dark: #34495e;
$title: #d1515a;
$light: #ecf0f1;
$grey: #576464;
$dark: #34495e;
$background: #f6f6f6;
$groupomania-blue: #132442;
$width-container-home: 75%;

.post {
  width: $width-container-home;
  margin: auto;
  background-color: white;
  box-shadow: 1px 1px 6px 1px #78787811;
  margin-bottom: 24px;
  border-radius: 0px;
  display: flex;
  flex-direction: column;
  border-left: 3px solid transparent;
  text-decoration: none;

  &:hover {
    border-left: 3px solid #a52b2b;
    cursor: pointer;
  }

  .post-title {
    padding: 14px 16px 0 16px;
    color: $groupomania-blue;
    font-size: 16px;
    font-weight: 700;
    line-height: 1;
    text-align: left;
  }

  .post-author {
    padding: 5px 16px;
    color: $title;
    font-weight: 400;
    text-align: left;
    font-size: 17px;
    border-bottom: 1px solid $light;
  }

  .description {
    text-align: justify;
    font-weight: 300;
    padding: 10px 16px 0px;
    line-height: 1.2;
    font-size: 17px;
    color: #2c3e50;
    // cut long word
    -ms-word-break: break-all;
    word-break: break-all;
    word-break: break-word;
    // elipsis the height
    max-height: 174px;
    overflow: hidden;
    text-overflow: ellipsis;
    //white-space: nowrap;

    &:first-letter {
      text-transform: capitalize;
    }
  }

  .date {
    font-size: 15px;
    font-weight: 300;
    color: $grey;
    //border-bottom: 1px solid $light;
    padding: 4px 16px 9px;
    text-align: right;
  }
}
</style>
