import { createStore } from 'vuex';
import { Auth } from './Auth/index';

const store = createStore({
  modules: {
    Auth,
    // ShCard: moduleB,
  },
});

export default store;
