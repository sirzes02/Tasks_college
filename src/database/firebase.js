import firebase from "firebase/app";
import "firebase/auth";

const app = firebase.initializeApp({
  apiKey: "AIzaSyBS6RzV1Xh40DxlOkS5YTt81WSzW5WwZbc",
  authDomain: "tasks-6a588.firebaseapp.com",
  projectId: "tasks-6a588",
  storageBucket: "tasks-6a588.appspot.com",
  messagingSenderId: "720064868499",
  appId: "1:720064868499:web:c51ab58973f39697179d66",
});

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const githubAuthProvider = new firebase.auth.GithubAuthProvider();

export { app, googleAuthProvider, githubAuthProvider };
