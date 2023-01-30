import { createStore, applyMiddleware } from "redux";
import { getFirebase } from 'react-redux-firebase';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from "../reducers/rootReducer";
import thunk from "redux-thunk";

//react redux firebase config
export const rrfConfig = {
  userProfile: 'users',
  attachAuthIsReady: true,
  useFirestoreForProfile: true
}

/*
########section without applyMiddleware(thunk)##########
*/

// export const configureStore = () => {
//   const store = createStore(rootReducer, devToolsEnhancer());
//   return store;
// }  


/*
########section with applyMiddleware(thunk)##########
*/
export const configureStore = () => {
  const middlewares = [thunk.withExtraArgument(getFirebase)];

  const composedEnhancer = composeWithDevTools(
    applyMiddleware(...middlewares),
    // reactReduxFirebase(firebase, rrfConfig),
    // reduxFirestore(firebase)
  );

  const store = createStore(rootReducer, composedEnhancer)

  return store
}