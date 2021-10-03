export const Auth = {
  state: () => ({
    Name: null,
    role: null,
    email: null,
    exist: false,
  }),
  mutations: {
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
  },
  actions: {},
  getters: {
    isAuth(state) {
      return state.exist;
    },
    isAdmin(state) {
      return state.exist && state.role === 'admin';
    },
    isCustomer(state) {
      return state.exist && state.role === 'customer';
    },
  },
};
