import { useRoutes } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';
import { UserState } from 'views/pages/authentication/actions';
import { useDispatch } from 'react-redux';
import { fetchUser } from 'views/pages/users/actions';
import { auth } from 'resources/config/firestore/store';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
    const isLoggedIn = UserState();
    const dispatch = useDispatch();
    if (isLoggedIn) {
        const user = auth.currentUser.uid;
        dispatch(fetchUser({ user: user }));
    }

    return useRoutes(isLoggedIn ? [MainRoutes] : [AuthenticationRoutes]);
}
