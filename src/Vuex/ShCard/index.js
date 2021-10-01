import mutation from './mutations';

export const ShCard = {
  state: () => ({
    price: 0,
    prods: [],
  }),
  mutations: { ...mutation },
  actions: {},
  getters: {
    getCard(state) {
      return { price: state.price, prods: state.prods };
    },
  },
};
// payload = { price , id , name , imageUrl}
