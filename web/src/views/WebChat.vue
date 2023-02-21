<template>
  <div>webchat</div>
</template>

<script  setup>
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
