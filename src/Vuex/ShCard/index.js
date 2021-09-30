import mutation from './mutations';

export const ShCard = {
  state: () => ({
    price: 345534,
    prods: [
      {
        id: 'nPW1LiJHQjr06AkXV9do',
        price: '0345534',
        author: '34534',
        inventory: '053453',
        name: 'asd',
        imageUrl:
          'https://firebasestorage.googleapis.com/v0/b/vue-ecommerce-32f4d.appspot.com/o/images%2Fcompound-effect.jpg1632813774749?alt=media&token=371cfd16-fa32-4e2c-a20a-97d7705c419e',
        description: '45345345',
      },
    ],
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
