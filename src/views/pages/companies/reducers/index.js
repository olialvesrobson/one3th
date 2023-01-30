const initState = {
    company: [],
    companies: []
};

export const companyReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CREATE_COMPANY':
            console.log('create company', action.company);
            return state;
        case 'CREATE_COMPANY_ERROR':
            console.log('create company error', action.err);
            return state;
        case 'FETCH_COMPANY':
            return {
                ...state,
                company: action.company
            };
        case 'FETCH_COMPANY_ERROR':
            console.log('fetch company error', action.err);
            return state;
        case 'FETCH_COMPANIES':
            return {
                ...state,
                companies: action.companies
            };
        case 'FETCH_COMPANIES_ERROR':
            console.log('fetch companies error', action.err);
            return state;
        case 'EDIT_COMPANY':
            console.log('edit company', action.company);
            return state;
        case 'EDIT_COMPANY_ERROR':
            console.log('edit company error', action.err);
            return state;
        case 'CREATE_IMAGE_COMPANY':
            console.log('create image on company', action.company);
            return state;
        case 'CREATE_IMAGE_COMPANY_ERROR':
            console.log('create image on company error', action.err);
            return state;
        default:
            return state;
    }
};
