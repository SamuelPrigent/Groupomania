<!-- JS -->
<script setup>
import { ref } from "vue"; // permet de lié js au html d'une même page vue
import { fetchApi } from "../utils/fetchApi.js"; // recup fetch utils + token header
// import router pour rediction
import { useRouter } from "vue-router";
const router = useRouter();

// Refs - facilite écriture onSubmit
const email = ref("");
const password = ref("");

// store vuex
import { useStore } from "vuex";
const store = useStore();

// Récup data dans le form
const onSubmit = async () => {
  const res = await fetchApi("/api/users/login", {
    method: "POST",
    body: {
      email: email.value,
      password: password.value,
    },
  });
  localStorage.setItem("token", res.token);
  localStorage.setItem("userId", res.userId);
  store.commit("connected"); // refresh nav button
  router.push("/"); // redirige vers home
};
</script>

<!-- HTML -->
<template>
  <div class="container-user">
    <div class="grid">
      <form @submit.prevent="onSubmit" class="form login">
        <header class="login__header">
          <h3 class="login__title">Connexion</h3>
        </header>

        <div class="login__body">
          <div class="border-input top-radius form__field">
            <input v-model="email" type="email" placeholder="Email" required />
          </div>

          <div class="border-input bottom-radius form__field">
            <input
              v-model="password"
              type="password"
              placeholder="Mot de passe"
              required
            />
          </div>
        </div>

        <footer class="login__footer">
          <input type="submit" value="Se connecter" />
        </footer>
        <div class="userOrNot">
          Vous n'avez pas de compte ?
          <router-link class="userOrNot-link" to="/signup"
            >Inscription</router-link
          >
        </div>
      </form>
    </div>
  </div>
</template>

<!-- CSS -->
<style lang="scss">
$background: #f6f6f6;
$groupomania-blue: #132442;

.container-user {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 83vh;
  background-color: $background;
}

// user
$gridMaxWidth: 24em;
$gridWidth: 90%;

.grid {
  inline-size: $gridWidth;
  margin-inline: auto;
  max-inline-size: $gridMaxWidth;
  margin: 60px auto 60px;
  box-shadow: 3px 3px 2px 1px rgba(0, 0, 255, 0.1);
}

$bodyBackgroundColor: #eaeaea;
$bodyColor: #999;
$bodyFontFamilyFallback: sans-serif;
$bodyFontSize: 0.875rem;
$bodyFontWeight: 400;
$bodyLineHeight: 1.5;

*,
*::before,
*::after {
  box-sizing: inherit;
}

html {
  box-sizing: border-box;
}

body {
  background-color: $bodyBackgroundColor;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: $bodyFontSize;
  font-weight: $bodyFontWeight;
  line-height: $bodyLineHeight;
  margin: 0;
  min-block-size: 100vh;
}

// form

fieldset {
  border: none;
  margin: 0;
}

input {
  appearance: none;
  border: none;
  font: inherit;
  margin: 0;
  outline: none;
  padding: 0;
}

input[type="submit"] {
  cursor: pointer;
  inline-size: 100%;
}

.form input[type="email"],
.form input[type="password"],
.form input[type="text"] {
  inline-size: 100%;
}

// login

$loginBorderRadius: 0.25em;
$loginHeaderBackgroundColor: $groupomania-blue;
$loginInputBorderRadius: 0.25em;

.login__header {
  background-color: $loginHeaderBackgroundColor;
  border-top-left-radius: $loginBorderRadius;
  border-top-right-radius: $loginBorderRadius;
  color: #fff;
  padding: 1.5em;
  text-align: center;
  text-transform: uppercase;
}

.login__title {
  font-size: 1rem;
  margin: 0;
}

.login__body {
  background-color: #fff;
  padding: 1.5em;
  position: relative;
}

// fleches
.login__body::before {
  background-color: #fff;
  content: "";
  height: 0.5em;
  left: 50%;
  margin-left: -0.25em;
  margin-top: -0.25em;
  position: absolute;
  top: 0;
  transform: rotate(45deg);
  width: 0.5em;
}

.border-input {
  border: 0.0625em solid #e5e5e5;
  padding: 0.95em 1.25em;
}

.top-radius {
  border-top-left-radius: $loginInputBorderRadius;
  border-top-right-radius: $loginInputBorderRadius;
}

.middle {
  border-top: 0;
}

.bottom-radius {
  border-bottom-left-radius: $loginInputBorderRadius;
  border-bottom-right-radius: $loginInputBorderRadius;
  border-top: 0;
}

.login input[type="submit"] {
  background-color: $groupomania-blue;
  border-radius: $loginInputBorderRadius;
  color: #fff;
  font-weight: 700;
  order: 1;
  padding: 0.75em 1.25em;
  transition: background-color 0.3s;
}

.login input[type="submit"]:focus,
.login input[type="submit"]:hover {
  background-color: #46be7c;
}

.userOrNot {
  padding-bottom: 1.4em;
  padding-left: 1.5em;
  padding-right: 1.5em;
  background-color: white;
  color: $groupomania-blue;
  font-size: 14px;
}

.userOrNot-link {
  text-decoration: none;
  color: $groupomania-blue;
  font-weight: 400;
  border-bottom: 1px solid $groupomania-blue;
}

.login__footer {
  align-items: center;
  background-color: #fff;
  border-bottom-left-radius: $loginBorderRadius;
  border-bottom-right-radius: $loginBorderRadius;
  justify-content: space-between;
  padding-bottom: 1em;
  padding-left: 1.5em;
  padding-right: 1.5em;
  border: 0px solid;
  display: flex;
}

.login__footer p {
  margin: 0;
}
</style>
