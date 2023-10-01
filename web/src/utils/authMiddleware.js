import auth from '../api/auth';

import { useUserStore } from '../stores/UserStore';

export const requireAuthenticated = (to, from, next) => {
  const store = useUserStore();
  auth.retrieveUser().then(response => {
    const user = response.data.user
    store.setUser(user)
    next()
  }).catch(error => {
    next({ name: 'login' })
  })
};

export const requireUnauthenticated = (to, from, next) => {
  const store = useUserStore();  
  auth.retrieveUser().then(response => {
    const user = response.data.user
    store.setUser(user)
    next({ name: 'chat' })
  }).catch(error => {
    next()
  })
};