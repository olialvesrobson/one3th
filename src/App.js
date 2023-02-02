import { useDispatch, useSelector } from 'react-redux';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';

// routing
import Routes from 'routes';

// defaultTheme
import themes from 'themes';

// project imports
import NavigationScroll from 'layout/NavigationScroll';
import { fetchUser, UserContext } from 'views/pages/users/actions';
import { auth } from 'resources/config/firestore/store';
import { useState, useEffect } from 'react';
import { UserState } from 'views/pages/authentication/actions';

// ==============================|| APP ||============================== //

const App = () => {
    const customization = useSelector((state) => state.customization);
    const isLoggedIn = UserState();
    const dispatch = useDispatch();
    const [uid, setUid] = useState('');
    const [user, setUser] = useState([]);

    useEffect(() => {
        if (isLoggedIn) {
            setUid(auth.currentUser.uid);
            dispatch(fetchUser({ user: uid })).then((result) => {
                setUser(result);
            });
        }
    }, [isLoggedIn, uid, dispatch]);

    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={themes(customization)}>
                <CssBaseline />
                <NavigationScroll>
                    <UserContext.Provider value={user}>
                        <Routes />
                    </UserContext.Provider>
                </NavigationScroll>
            </ThemeProvider>
        </StyledEngineProvider>
    );
};

export default App;
