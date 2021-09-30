import mutation from './mutations';

export const ShCard = {
  state: () => ({
    price: 0,
    prods: [],
  }),
  mutations: { ...mutation },
  actions: {},
  getters: {},
};
// payload = { price , id , name , imageUrl}
