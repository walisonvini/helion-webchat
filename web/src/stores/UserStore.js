import { reactive, computed } from 'vue';
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', () => {
  
  const userState = reactive({
    user: null
  });

  function setUser(user) {
    userState.user = user;
  }

  const isAuthenticated = computed(() => !!userState.user);

  return {
    userState,
    setUser,
    isAuthenticated,
  }
});
