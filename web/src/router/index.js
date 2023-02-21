import { createRouter, createWebHistory } from 'vue-router';
import { requireUnauthenticated, requireAuthenticated } from '../utils/authMiddleware';

import HomePage from '../views/HomePage.vue';
import LogIn from '../views/LogIn.vue';
import Register from '../views/Register.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
      beforeEnter: requireAuthenticated
    },
    {
      path: '/login',
      name: 'login',
      component: LogIn,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      beforeEnter: requireUnauthenticated
    },
  ],
});

export default router;
