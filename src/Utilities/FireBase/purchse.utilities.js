// import firebase from 'firebase/app';
import firebase from './config';
import 'firebase/firestore';

// export const firestore = firebase.firestore();
import {
  projectAuth as auth,
  projectFirestore as firestore,
  projectStorage as storage,
} from './initializeApp';

// decrece investory
export const decreceInvestory = (id, count) => {
  return firestore
    .collection('products')
    .doc(id)
    .update({ Inventory: +count });
};

// add doc to purchase collection
export const addOrderToDB = (order) => {
  return firestore.collection('orders').add({
    status: 'paied',
    bookIdArray: order.books,
    ownerEmail: order.owner,
    ownerAddress: order.address,
  });
};

// get orders info
export const getOrderInfo = (ownerEmail) => {
  return firestore
    .collection('orders')
    .where('ownerEmail', '==', ownerEmail)
    .get();
};
// get orders info for admin
export const getOrderInfoAdmin = () => {
  return firestore.collection('orders').get();
};

// Post orders
export const postOrder = (id, postalCode) => {
  return firestore
    .collection('orders')
    .doc(id)
    .update({
      status: 'sent',
      postalCode: postalCode,
    });
};
// // Interface

// interface purchase = {
//  status : 'paied' | 'sent',
//  postalCode?: number ,
//  bookIdArray : array<{ id :string , count : number}>,
//  ownerId : string ,
//  ownerAddress : string
// }
