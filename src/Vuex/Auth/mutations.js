export default {
  logedIn(state, payload) {
    state.Name = payload.name;
    state.role = payload.role;
    state.email = payload.email;
    state.exist = true;
  },
  logedOut(state) {
    state.Name = null;
    state.role = null;
    state.email = null;
    state.exist = false;
  },
};
