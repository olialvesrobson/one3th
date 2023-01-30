import { combineReducers } from 'redux';
import { companyReducer } from 'views/pages/companies/reducers';
import { userReducer } from 'views/pages/users/reducers';

// reducer import
import customizationReducer from './customizationReducer';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
    customization: customizationReducer,
    companies: companyReducer,
    users: userReducer
});

export default reducer;
