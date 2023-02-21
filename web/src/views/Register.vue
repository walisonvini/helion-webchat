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
            Email:
            <input type="email" name="email" v-model="form.email">
        </label>
        <label>
            First Name:
            <input type="text" name="first_name" v-model="form.first_name">
        </label>
        <label>
            Last Name:
            <input type="text" name="last_name" v-model="form.last_name">
        </label>
        <label>
            Profile Picture
            <input type="text" name="profile" v-model="form.profile_picture">
        </label>
        <label>
            <button type="submit">Enviar</button>
        </label>
    </form>
</template>

<script >
import axios from 'axios';

export default {
  data() {
    return {
        form: {
            username: null,
            password: null,
            email: null,
            first_name: null,
            last_name: null,
            profile_picture: null,
        }
    }
  },
  methods: {
    async submitForm(form) {
        let resApi;
        console.log(form);
        await axios.post('http://localhost:8080/register', form)
                .then(response => {
                    resApi = response
                    console.log(resApi.data.message);
                })
                .catch(err => {
                    resApi = err
                    console.log(resApi.response.data.message);
                });

        
    },
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
  