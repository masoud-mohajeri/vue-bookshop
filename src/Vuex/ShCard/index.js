export const ShCard = {
  state: () => ({
    price: 0,
    prods: [],
  }),
  mutations: {
    addProd(state, payload) {
      state.price = +state.price + +payload.price;
      // console.log(payload);
      state.prods.push(payload);
    },
    removeProd(state, payload) {
      state.prods = state.prods.filter((prd) => prd.id !== payload.id);
      state.price = +state.price - +payload.price;
    },
    purchase(state) {
      state.price = 0;
      state.prods = [];
    },
  },
  actions: {},
  getters: {
    getCard(state) {
      return { price: state.price, prods: state.prods };
    },
  },
};
// payload = { price , id , name , imageUrl}
