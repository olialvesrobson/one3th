const initState = {
    user: [],
    users: [],
    companies: []
};

export const userReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CREATE_USER':
            console.log('create user', action.user);
            return state;
        case 'CREATE_USER_ERROR':
            console.log('create user error', action.err);
            return state;
        case 'FETCH_USER':
            return {
                ...state,
                user: action.user
            };
        case 'FETCH_USER_ERROR':
            console.log('fetch user error', action.err);
            return state;
        case 'FETCH_USERS':
            return {
                ...state,
                users: action.users
            };
        case 'FETCH_USERS_ERROR':
            console.log('fetch users error', action.err);
            return state;
        case 'FETCH_USER_COMPANIES':
            return {
                ...state,
                companies: action.companies
            };
        case 'EDIT_USER':
            console.log('edit user', action.companies);
            return state;
        case 'EDIT_USER_ERROR':
            console.log('edit user error', action.err);
            return state;
        case 'CREATE_IMAGE_USER':
            console.log('create image on user', action.user);
            return state;
        case 'CREATE_IMAGE_USER_ERROR':
            console.log('create image on user error', action.err);
            return state;
        default:
            return state;
    }
};
