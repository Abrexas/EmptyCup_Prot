import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
	  apiKey: "AIzaSyBooMb0IlTuOS-pN4FXm1tSEcw_m6PbPEc",
	  authDomain: "emptycup-prot.firebaseapp.com",
	  databaseURL: "https://emptycup-prot.firebaseio.com",
	  projectId: "emptycup-prot",
	  storageBucket: "emptycup-prot.appspot.com",
	  messagingSenderId: "1042842499923",
	  appId: "1:1042842499923:web:9b10a4f0182454ec993fa6",
	  measurementId: "G-X0EEQLF7XM"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
