import { reactive, ref } from 'vue';
import { defineStore } from 'pinia';

export const useChatStore = defineStore('chat', () => {
  const messages = ref([]);
  const friend = ref({
    full_name: '',
  });

  function addMessage(message) {
    messages.value.push(message);
  }

  return {
    friend,
    messages,
    addMessage,
  }
});