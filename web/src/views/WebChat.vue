<script setup>
import { socket } from "@/socket";
import { ref } from 'vue';
import { useUserStore } from '../stores/UserStore';
import { useChatStore } from '../stores/ChatStore';

const userStore = useUserStore().userState.user;
const chatStore = useChatStore();

const message = ref(null);

const sendMessage = () => {
  socket.emit("chat message", message.value);
  message.value = ''
}

</script>

<template>
  <div class="h-screen bg-gray-300 flex justify-center items-center">

    <div class="bg-green-300 lg:w-1/4 md:w-1/2 h-full">
      <span class="bg-red-200 flex justify-center mt-4">Messages</span>
      <span class="flex justify-center mt-8"><input type="text"></span>

      <div class="flex space-x-4 justify-center mt-8">
        <div class="bg-gray-300 p-2">Private Chat</div>
        <div class="bg-gray-300 p-2">Group Chat</div>
        <div class="bg-gray-300 p-2">All Contacts</div>
      </div>

      <div class="p-4 mt-4 overflow-y-auto max-h-[calc(100vh-200px)]">
        <ul>
          <li class="mb-4 p-5 flex items-center justify-between rounded-lg bg-gray-200 cursor-pointer">
            <div class="flex items-center">
              <img src="../assets/img/icon-user.png" alt="" class="w-10 h-10 mr-3 rounded-full">
              <div>
                <div class="font-semibold mb-2">Walison</div>
                <div class="text-xs text-gray-500">Última mensagem</div>
              </div>
            </div>
            <div class="text-xs text-gray-500 mb-6">09:30</div>
          </li>
        </ul>
      </div>
    </div>
    <div class="bg-blue-500 w-full h-full relative">
      <div class="p-4 bg-purple-300 flex justify-between">
        <div class="flex items-center ml-4">
          <img src="../assets/img/icon-user.png" alt="" class="w-10 h-10 mr-3 rounded-full">
          <div>
            <div class="font-semibold">Vinicios</div>
            <div class="text-xs text-gray-500">Online</div>
          </div>
        </div>
        <span class="flex items-center mr-12">:</span>
      </div>
      {{ chatStore.messages }}
      <div class="bottom-0 left-0 right-0 p-6 bg-gray-200 rounded-t-lg text-center absolute">
        <input v-model="message" type="text">
        <button @click="sendMessage">enviar</button>
      </div>
    </div>
  </div>
</template>