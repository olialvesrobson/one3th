// third party
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';

// project imports
import * as serviceWorker from 'serviceWorker';
import App from 'App';
//import { store } from 'store';

// style + assets
import 'assets/scss/style.scss';
import config from './config';

//import ScrollToTop from './resources/components/utils/scrollToTop';
import { fbConfig, rrfConfig, configureStore, rrfProps } from './resources/config/firestore/store';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { createFirestoreInstance } from 'redux-firestore';

// ==============================|| REACT DOM RENDER  ||============================== //

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <ReactReduxFirebaseProvider
            firebase={fbConfig}
            config={rrfConfig}
            dispatch={store.dispatch}
            createFirestoreInstance={createFirestoreInstance}
            {...rrfProps}
        >
            <BrowserRouter basename={config.basename}>
                <App />
            </BrowserRouter>
        </ReactReduxFirebaseProvider>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
