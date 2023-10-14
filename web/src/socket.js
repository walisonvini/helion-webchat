import { io } from "socket.io-client";
import { useChatStore } from '@/stores/chatStore';

const URL = "http://localhost:8080";

export const socket = io(URL, { autoConnect: false });

socket.on("connect", () => {

});

socket.on("disconnect", () => {
 
});

socket.on("chat message", (message) => {
  const chatStore = useChatStore();

  chatStore.addMessage(message);
});
