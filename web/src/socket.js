import { io } from "socket.io-client";
import { useChatStore } from '@/stores/chatStore';

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NODE_ENV === "production" ? undefined : "http://localhost:8080";

export const socket = io(URL);

socket.on("connect", () => {
  state.connected = true;
});

socket.on("disconnect", () => {
  state.connected = false;
});

socket.on("chat message", (message) => {
  const chatStore = useChatStore();
  console.log(message)
  chatStore.addMessage(message);
});
