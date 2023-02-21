<template>
  <form @submit.prevent="submitForm(form)">
      <label>
          Username:
          <input type="text" name="username" v-model="form.username">
      </label>
      <label>
          Password:
          <input type="password" name="password" v-model="form.password">
      </label>
      <label>
          <button type="submit">Enviar</button>
      </label>
      <router-link to="/register">Sobre</router-link>
      {{ store.isAuthenticated }}
  </form>
</template>

<script  setup>
import router from '@/router'
import VueCookies from 'vue-cookies'
import { reactive } from 'vue';

import http from '../api/http';
import { userStore } from '../stores/UserStore';

const store = userStore()

const form = reactive({
  username: null,
  password: null
})

async function submitForm(form) {
  try {
    const response = await http.post('/login', form);
    store.setUser(response.data.user);
    VueCookies.set('token', response.data.token);
    router.push({
        name: "chat"
    });
  } catch (error) {
    console.log(error.response.data.message);
  }
}

</script>

<style scoped>
  label {
      display: block;
      margin-bottom: 10px;
  }

  input[type="text"],
  input[type="password"],
  input[type="email"] {
      display: block;
      width: 30%;
      padding: 10px;
      margin-bottom: 20px;
  }

  button {
      display: block;
      padding: 10px;
      margin-top: 20px;
  }
</style>
