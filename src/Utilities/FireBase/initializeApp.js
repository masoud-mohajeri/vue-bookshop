import firebase from 'firebase/app';
import { firebaseConfig } from './config.js';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

firebase.initializeApp(firebaseConfig);

const projectFirestore = firebase.firestore();
const projectStorage = firebase.storage();
const projectAuth = firebase.auth();

export { projectAuth, projectFirestore, projectStorage };
