import mutation from './mutations';

export const Auth = {
  state: () => ({
    Name: null,
    role: null,
    email: null,
    exist: false,
  }),
  mutations: { ...mutation },
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
