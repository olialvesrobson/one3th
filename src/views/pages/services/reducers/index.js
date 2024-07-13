const initState = {
    service: [],
    services: [],
    employeeInvites: [],
    serviceInvites: [],
    servicesInvited: []
};

export const serviceReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CREATE_SERVICE':
            console.log('create service', action.service);
            return state;
        case 'CREATE_SERVICE_ERROR':
            console.log('create service error', action.err);
            return state;
        case 'FETCH_SERVICE':
            return {
                ...state,
                service: action.service
            };
        case 'FETCH_SERVICE_ERROR':
            console.log('fetch service error', action.err);
            return state;
        case 'FETCH_SERVICES':
            return {
                ...state,
                services: action.services
            };
        case 'FETCH_EMPLOYEE_INVITES':
            return {
                ...state,
                employeeInvites: action.employeeInvites
            };
        case 'FETCH_SERVICE_INVITES':
            return {
                ...state,
                serviceInvites: action.serviceInvites
            };
        case 'FETCH_SERVICES_INVITED':
            return {
                ...state,
                servicesInvited: action.servicesInvited
            };
        case 'FETCH_SERVICES_ERROR':
            console.log('fetch services error', action.err);
            return state;
        case 'EDIT_SERVICE':
            console.log('edit service', action.service);
            return state;
        case 'EDIT_SERVICE_ERROR':
            console.log('edit service error', action.err);
            return state;
        case 'CREATE_IMAGE_SERVICE':
            console.log('create image on service', action.service);
            return state;
        case 'CREATE_IMAGE_SERVICE_ERROR':
            console.log('create image on service error', action.err);
            return state;
        default:
            return state;
    }
};
