import {initializeApp} from 'firebase/app';
import {
    getAuth,
    signInWithRedirect,
    GoogleAuthProvider,
    signInWithPopup
} from 'firebase/auth';

import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    Firestore,
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAswEcFyHcDjQOd549AgXsq7c_OcQ46V6c",
    authDomain: "clothing-db-6e72a.firebaseapp.com",
    projectId: "clothing-db-6e72a",
    storageBucket: "clothing-db-6e72a.appspot.com",
    messagingSenderId: "901464526592",
    appId: "1:901464526592:web:2162b229d52f318930ede5"
  };
  
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();

  provider.setCustomParameters({
    prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    console.log(userDocRef);
    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());

    if(!userSnapshot.exists()) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });
        }catch(err) {
            console.log('error creating the user', err.message);
        }
    }

    return userDocRef;

  }