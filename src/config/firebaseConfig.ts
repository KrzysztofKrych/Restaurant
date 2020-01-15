
import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDi6WetHFqx-kGB7KbqVtYdKlCjdpXs2Xc",
    authDomain: "restaurant-c557c.firebaseapp.com",
    databaseURL: "https://restaurant-c557c.firebaseio.com",
    projectId: "restaurant-c557c",
    storageBucket: "restaurant-c557c.appspot.com",
    messagingSenderId: "983265671325",
    appId: "1:983265671325:web:b647002cc5819f322b7c74"
};
const fire = firebase.initializeApp(firebaseConfig);
const db = fire.firestore()

export {
    fire,
    db
};