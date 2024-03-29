<script setup>
import { socket } from "@/socket";
import { ref, reactive, onMounted } from 'vue';
import { useUserStore } from '../stores/UserStore';
import { useChatStore } from '../stores/ChatStore';
import http from '../api/http';
import SelectUsers from "../components/SelectUsers.vue";

const userStore = useUserStore().userState.user;
const chatStore = useChatStore();

const users = ref([]);

const newMessage = reactive({
  sent_from_id: userStore.id,
  sent_to_id: null,
  subject: ''
});

const hasOnlyWhitespace = (input) => {
  const regex = /^\s*$/;
  return regex.test(input);
}

const sendMessage = () => {
  if(hasOnlyWhitespace(newMessage.subject)) {
    return
  }

  socket.emit("chat message", newMessage);
  
  newMessage.sent_to_id = chatStore.friend.id;

  http.post('/private-messages', newMessage).then((response) => {
    console.log(response.data);
  }).catch((error) => {
    console.log(error);
  })

  newMessage.subject = ''
}

const getUsers = async () => {
  http.get('/users').then((response) => {
    users.value = response.data.users;
  }).catch((error) => {
    console.log(error);
  })
}

onMounted(() => {
  getUsers();

  socket.connect();
});

</script>

<template>
  <div class="lg:container lg:mx-auto lg:mt-16">
      <div class="min-w-full border rounded lg:grid lg:grid-cols-3">
        <div class="border-r border-gray-300 lg:col-span-1">
        <div class="mx-3 my-3">
        <div class="relative text-gray-600">
            <span class="absolute inset-y-0 left-0 flex items-center pl-2">
            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                viewBox="0 0 24 24" class="w-6 h-6 text-gray-300">
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
            </span>
            <input type="search" class="block w-full py-2 pl-10 bg-gray-100 rounded outline-none" name="search"
            placeholder="Search" required />
        </div>
        </div>

        <ul class="overflow-auto h-[32rem]">
          <h2 class="my-2 mb-2 ml-2 text-lg text-gray-600">Chats</h2>
          <li>
              <SelectUsers :users="users" />
          </li>
        </ul>
    </div>
        <div class="hidden lg:col-span-2 lg:block">
          <div class="w-full">
            <div class="relative flex items-center p-3 border-b border-gray-300">
              <img class="object-cover w-10 h-10 rounded-full"
                src="https://cdn.pixabay.com/photo/2018/01/15/07/51/woman-3083383__340.jpg" alt="username" />
              <span class="block ml-2 font-bold text-gray-600">{{ chatStore.friend.full_name }}</span>
              <span class="absolute w-3 h-3 bg-green-600 rounded-full left-10 top-3">
              </span>
            </div>
            <div class="relative w-full p-6 overflow-y-auto h-[40rem]">
              <ul class="space-y-2">
                <template v-for="msg in chatStore.messages">
                  <li v-if="msg.sent_from_id != userStore.id" class="flex justify-start">
                    <div class="relative max-w-xl px-4 py-2 text-gray-700 rounded shadow">
                      <span class="block">{{ msg.subject }}</span>
                    </div>
                  </li>
                  <li v-else class="flex justify-end">
                    <div class="relative max-w-xl px-4 py-2 text-gray-700 bg-gray-100 rounded shadow">
                      <span class="block">{{ msg.subject }}</span>
                    </div>
                  </li>
              </template>
              </ul>
            </div>

            <div class="flex items-center justify-between w-full p-3 border-t border-gray-300">
              <button>
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
              <button>
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                </svg>
              </button>

              <input type="text" placeholder="Message"
                class="block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700"
                name="message" required v-model="newMessage.subject" @keyup.enter="sendMessage" />
              <button>
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </button>
              <button type="submit">
                <svg class="w-5 h-5 text-gray-500 origin-center transform rotate-90" xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20" fill="currentColor" @click="sendMessage">
                  <path
                    d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>