import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';

//

// const storage = firebase.storage();
// export const firestore = firebase.firestore();
import {
  projectAuth as auth,
  projectFirestore as firestore,
  projectStorage as storage,
} from './initializeApp';

// upload Image and gey DL url
export const useUploadHandler = (file) => {
  const fileRef = 'images/' + file.name + Date.now();
  const storageRef = storage.ref();
  return new Promise((resolve, reject) => {
    storageRef
      .child(fileRef)
      .put(file)
      .then(() => {
        storageRef
          .child(fileRef)
          .getDownloadURL()
          .then((dlUrl) => {
            resolve(dlUrl);
          })
          .catch((err) => reject(err));
      })
      .catch((err) => reject(err));
  });
};
// save Product in DB
export const SaveProductHandler = (product) => {
  return firestore.collection('products').add({
    name: product.name,
    price: product.price,
    Inventory: product.Inventory,
    imageUrl: product.imageUrl,
    description: product.description, // + id => Redux Store
  });
};
// get all data from DB
export const GetProductHandler = () => {
  return firestore.collection('products').get();
};
//  DELETE A  PRODUCT
export const deleteProductHandler = (id) => {
  return firestore
    .collection('products')
    .doc(id)
    .delete();
};

// UPDATE A PRODUCT
export const updateProductHandler = (prod) => {
  const fackeProd = { ...prod };
  const docRef = firestore.collection('products').doc(fackeProd.id);
  delete fackeProd.id;
  return docRef.update(fackeProd);
};
