import http from "./http";

export default {
  login(form) {
    return http.post("/login", form)
  },
  logout() {
    return http.post("/logout")
  },
  retrieveUser() {
    return http.get("/retrieve-user")
  },
  register(form) {
    return http.post("/register", form)
  }
};