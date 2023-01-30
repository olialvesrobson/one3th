import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useState } from 'react';
import { auth, firestore } from '../../../resources/config/firestore/store';

export const SignInWithGoogle = (props) => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
        .then(async (result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;

            const docRef = doc(firestore, 'users', user.uid);
            const docSnap = await getDoc(docRef);
            console.log(docSnap.data());
            if (docSnap.exists()) {
                if (props.action === 'signin') {
                    // SingIn
                    return { status: true, credential, token, user };
                } else {
                    console.log('User already exist. Go to Login page.');
                    const result = await signOut();
                    console.log(result);
                    return { status: false, message: 'User already exist. Go to Login page.' };
                }
            } else {
                // User does not exist.
                if (props.action === 'signin') {
                    // SingIn
                    return { status: false, message: 'This account does not exist. Go to Sign up page.' };
                } else {
                    const result = saveUser({
                        uid: user.uid,
                        name: user.displayName,
                        email: user.email,
                        photoURL: user.photoURL,
                        token: token
                    })
                        .then((result) => {
                            console.log('SignUp.SaveUser.successful: ', result);
                            return result;
                        })
                        .catch((error) => {
                            console.log('SignUp.SaveUser.error: ', error);
                            return error;
                        });
                    console.log(result);
                    return { status: true, credential, token, user };
                }
            }
            // ...
        })
        .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The AuthCredential type that was used.
            //const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
            console.log(errorCode, errorMessage);
            return { status: false, message: (errorCode, errorMessage) };
        });
};

export const UserState = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [uid, setUid] = useState('');

    auth.onAuthStateChanged((user) => {
        if (user) {
            // User is signed in
            setIsLoggedIn(true);
            setUid(user.uid);
        } else {
            // User is signed out
            setIsLoggedIn(false);
        }
    });

    return isLoggedIn, uid;
};

export const FetchAuth = () => {
    console.log(auth);
};

export const SignOut = () => {
    signOut(auth)
        .then(() => {
            // Sign-out successful.
            return 'Sign-out successful';
        })
        .catch((error) => {
            // An error happened.
            return 'An error happened while signing out.', error;
        });
};

const saveUser = async (user) => {
    console.log(user);
    console.log('start setDoc');
    const result = await setDoc(doc(firestore, 'users', user.uid), {
        name: user.name,
        email: user.email,
        photoURL: user.photoURL,
        token: user.token
    })
        .then(() => {
            // dispatch({ type: 'ADD_USER_SUCCESS' });
            console.log('saveUser: User saved.');
            return { status: true, message: 'User created.' };
        })
        .catch((error) => {
            // dispatch({ type: 'ADD_USER_ERROR' }, error);
            console.log('saveUser error: ', error);
            return { status: false, message: ('Error: ', error) };
        });
    return result;
};
