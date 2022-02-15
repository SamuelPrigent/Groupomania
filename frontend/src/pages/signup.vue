<!-- JS -->
<script setup>
import { ref } from "vue";
import { fetchApi } from "../utils/fetchApi.js";
import { useRouter } from "vue-router";
const router = useRouter(); // nécessaire pour use le router

// Refs - facilite écriture onSubmit
const email = ref("");
const password = ref("");
const name = ref("");
const surname = ref("");

// Récup data dans le form
const onSubmit = async () => {
  await fetchApi("/api/users/signup", {
    method: "POST",
    body: {
      email: email.value,
      password: password.value,
      name: name.value,
      surname: surname.value,
    },
  });

  router.push("/login"); // push requette au back à l'url donné dans fetch api
};
</script>

<!-- HTML -->
<template>
  <div class="container-user">
    <div class="grid">
      <form
        @submit.prevent="onSubmit"
        action="/"
        method="post"
        class="form login"
      >
        <header class="login__header">
          <h3 class="login__title">Inscription</h3>
        </header>

        <div class="login__body">
          <div class="border-input top-radius form__field">
            <input v-model="name" type="text" placeholder="Prenom" required />
          </div>

          <div class="border-input middle form__field">
            <input v-model="surname" type="text" placeholder="Nom" required />
          </div>

          <div class="border-input middle form__field">
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
          <input type="submit" value="S'inscrire" />
        </footer>
        <div class="userOrNot">
          Vous avez déjà un compte ?
          <router-link class="userOrNot-link" to="/login"
            >Connexion</router-link
          >
        </div>
      </form>
    </div>
  </div>
</template>

<!-- CSS -->
<style lang="scss"></style>
