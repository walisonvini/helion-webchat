import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useChatStore = defineStore('chat', () => {

  const messages = ref([]);

  function addMessage(message) {
    messages.value.push(message);;
  }

  return {
    messages,
    addMessage,
  }
});