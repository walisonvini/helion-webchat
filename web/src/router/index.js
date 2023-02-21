import { createRouter, createWebHistory } from 'vue-router';
import { requireUnauthenticated, requireAuthenticated } from '../utils/authMiddleware';

import HomePage from '../views/HomePage.vue';
import LogIn from '../views/LogIn.vue';
import Register from '../views/Register.vue';
import WebChat from '../views/WebChat.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
      beforeEnter: requireUnauthenticated
    },
    {
      path: '/login',
      name: 'login',
      component: LogIn,
      beforeEnter: requireUnauthenticated
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      beforeEnter: requireUnauthenticated
    },
    {
      path: '/client/chat',
      name: 'chat',
      component: WebChat,
      beforeEnter: requireAuthenticated
    }
  ],
});

export default router;
