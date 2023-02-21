import auth from '../api/auth';

import { userStore } from '../stores/UserStore';

export const requireAuthenticated = (to, from, next) => {
  const store = userStore();

  if (!store.isAuthenticated) {
    next({
      name: "login"
    });
  } else {
    const sla = auth.retrieveUser()
    store.setUser(sla)
    next();
  }
};

export const requireUnauthenticated = (to, from, next) => {
  const store = userStore();
  
  if (store.isAuthenticated) {
    next({
      name: "home"
    });
  } else {
    next();
  }
};