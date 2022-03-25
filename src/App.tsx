import './App.css';
import { Provider } from 'react-redux';
import 'firebase/auth';
// import 'firebase/firestore' // <- needed if using firestore
// import 'firebase/functions' // <- needed if using httpsCallable
import {
  ReactReduxFirebaseProvider} from 'react-redux-firebase'
import Dashboard from './pages';
// import { createFirestoreInstance, firestoreReducer } from 'redux-firestore' // <- needed if using firestore
import { store, rrfProps } from './config/config';


// Setup react-redux so that connect HOC can be used
function App() {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <Dashboard />
      </ReactReduxFirebaseProvider>
    </Provider>
  )
}
export default App;
