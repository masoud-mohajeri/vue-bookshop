import { createStore } from 'vuex';
import { Auth } from './Auth/index';
import { ShCard } from './ShCard/index';
const store = createStore({
  modules: {
    Auth,
    ShCard,
  },
});

export default store;
