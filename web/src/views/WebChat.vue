<script setup>
import { userStore } from '../stores/UserStore';

const store = userStore();

</script>

<template>
  <div>{{ store.isAuthenticated }}</div>
</template>

<style scoped></style>
