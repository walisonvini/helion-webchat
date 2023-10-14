<script setup>
import { defineProps } from 'vue';
import { useUserStore } from '../stores/UserStore'; 
import { useChatStore } from '../stores/ChatStore';
import http from '../api/http';

const userStore = useUserStore().userState.user;
const chatStore = useChatStore();

const props = defineProps({
  users: {
    type: Array,
    required: true
  }
})

const getPrivateMessages = async (friendId, user) => {
  http.get(`/private-messages/${userStore.id}/${friendId}`).then((response) => {
    chatStore.messages = response.data.messages;
    chatStore.friend = user;
  }).catch((error) => {
    console.log(error);
  })
}

</script>

<template >
    <template v-for="user in props.users" :key="user.id">
        <a v-if="user.id !== userStore.id" @click="getPrivateMessages(user.id, user)"
            class="flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out bg-gray-100 border-b border-gray-300 cursor-pointer focus:outline-none">
            <img class="object-cover w-10 h-10 rounded-full"
                src="https://cdn.pixabay.com/photo/2016/06/15/15/25/loudspeaker-1459128__340.png" alt="username" />
            <div class="w-full pb-2">
                <div class="flex justify-between">
                <span class="block ml-2 font-semibold text-gray-600">{{ user.full_name }}</span>
                <span class="block ml-2 text-sm text-gray-600">50 minutes</span>
                </div>
                <span class="block ml-2 text-sm text-gray-600">Good night</span>
            </div>
        </a>
    </template>
</template>