<script setup>
//import dayjs from "dayjs"; // import systeme de date
//import "dayjs/locale/fr"; // set to fr

// Défine props - récup info du post
import { defineProps } from "vue";
const { user } = defineProps({
  user: Object,
});
// Récup info author également lié au via select prisma permet add info
</script>
<template>
  <div id="post-list">
    <div class="account-box">
      <div class="account-box-title">Compte de l'utilisateur :</div>
      <div class="account-box-text">
        <div>Prenom: {{ user.name }}</div>
        <div>Nom: {{ user.surname }}</div>
        <div>Email: {{ user.email }}</div>
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
    font-size: 16px;
    font-weight: 400;
    color: $grey;
    border-bottom: 1px solid $light;
    padding: 9px 16px 10px;
    text-align: right;
  }
}
</style>
