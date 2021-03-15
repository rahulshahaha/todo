import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics'

// Replace this with your own config details
var config = {
  apiKey: "AIzaSyCSu3ggsS66Mo1OullwbFJIg9mibC9E9wY",
  authDomain: "todo-8303f.firebaseapp.com",
  projectId: "todo-8303f",
  storageBucket: "todo-8303f.appspot.com",
  messagingSenderId: "928128254937",
  appId: "1:928128254937:web:a3f32fafc7ca5ba6c40fc8"
};

firebase.initializeApp(config);
firebase.firestore()

export default firebase 