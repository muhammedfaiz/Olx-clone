import { initializeApp } from "firebase/app";
import * as firebase from "firebase/auth";
import * as firestore from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyC_R6VqtWhA8vf9ym8XhApLdjE28pABhrk",
    authDomain: "olx-clone-2b9cf.firebaseapp.com",
    projectId: "olx-clone-2b9cf",
    storageBucket: "olx-clone-2b9cf.appspot.com",
    messagingSenderId: "585202672842",
    appId: "1:585202672842:web:d604a0152f850b3c430033",
    measurementId: "G-PSX9M2J6CC"
  };    

const  app = initializeApp(firebaseConfig);
const db = firestore.getFirestore(app);
const storage = getStorage();
export {firebase,firestore,db,storage};