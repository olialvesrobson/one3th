import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { firebaseReducer, getFirebase } from 'react-redux-firebase';
import { firestoreReducer, createFirestoreInstance, reduxFirestore } from 'redux-firestore';
import { initializeApp } from 'firebase/app';
import firebase from 'firebase/compat/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import customizationReducer from '../../../store/customizationReducer';
import thunk from 'redux-thunk';
import { companyReducer } from 'views/pages/companies/reducers';
import { userReducer } from 'views/pages/users/reducers';

// import { composeWithDevTools } from 'redux-devtools-extension';
// import thunk from 'redux-thunk';
// import { store } from 'store';

const firebaseConfig = {
    // apiKey: 'AIzaSyBv_VSq7Ks6Ke7MMml6hCta04YtJhpn9aM',
    // authDomain: 'icontroled.firebaseapp.com',
    // databaseURL: 'https://icontroled.firebaseio.com',
    // projectId: 'icontroled',
    // storageBucket: 'icontroled.appspot.com',
    // messagingSenderId: '89600774314',
    // appId: '1:89600774314:web:a9d31779455b5ab5a7c0d3'

    apiKey: 'AIzaSyAAKTAp5FV2t5acpLungL9c4yDEJ7t16h8',
    authDomain: 'dudedevs.firebaseapp.com',
    databaseURL: 'https://dudedevs.firebaseio.com',
    projectId: 'dudedevs',
    storageBucket: 'dudedevs.appspot.com',
    messagingSenderId: '836114904416',
    appId: '1:836114904416:web:dc80049b0384e87b2ada05'
};

// initialize firebase instance
const fbConfig = initializeApp(firebaseConfig);
const auth = getAuth();
// initialize firestore
const firestore = getFirestore(fbConfig);
const storage = getStorage(fbConfig);
/*
########section with applyMiddleware(thunk)##########
*/
const configureStore = () => {
    // const middlewares = [thunk.withExtraArgument(getFirebase)];

    // const composedEnhancer = composeWithDevTools(
    //     applyMiddleware(...middlewares)
    //     // reactReduxFirebase(firebase, rrfConfig),
    //     // reduxFirestore(firebase)
    // );
    const store = createStore(
        rootReducer,
        compose(applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })), reduxFirestore(fbConfig))
    );

    return store;
};

//react redux firebase config
const rrfConfig = {
    userProfile: 'users',
    attachAuthIsReady: true,
    useFirestoreForProfile: true,
    dispatch: configureStore.dispatch
};

const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: configureStore.dispatch,
    createFirestoreInstance //since we are using Firestore
};

const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    customization: customizationReducer,
    companies: companyReducer,
    users: userReducer
});

export { configureStore, fbConfig, firestore, auth, storage, rrfConfig, rrfProps, rootReducer };
