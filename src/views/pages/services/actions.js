import { doc, getDoc, getDocs, setDoc, collection, query, where, documentId } from 'firebase/firestore';
import { firestore } from '../../../resources/config/firestore/store';
import { serverTimestamp } from '@firebase/firestore';
import { setServiceToUser } from '../users/actions';
import { makeUuid } from 'resources/components/utils/usefulFunctions';

export const add = async (props) => {
    const { name, email, abn, numberOfEmployees, owner, userName } = props;
    const today = new Date(),
        dateNow =
            today.getYear().toString() +
            today.getMonth().toString() +
            today.getDate().toString() +
            today.getHours().toString() +
            today.getMinutes().toString() +
            today.getSeconds().toString();
    const uuid =
        makeUuid((dateNow + email + name).replace(/[^a-zA-Z ]/g, '').replace(/ /g, ''), 5) +
        '-' +
        makeUuid((dateNow + name).replace(/[^a-zA-Z ]/g, '').replace(/ /g, ''), 5) +
        '-' +
        makeUuid((dateNow + email + name).replace(/[^a-zA-Z ]/g, '').replace(/ /g, ''), 5);

    const docFields = {
        name: name,
        email: email,
        abn: abn,
        numberOfEmployees: numberOfEmployees,
        owner: owner,
        createdAt: serverTimestamp()
    };

    const result = await setDoc(doc(collection(firestore, 'services'), uuid), docFields)
        .then(function () {
            console.log('addService: successful.');

            setUserToService({
                serviceId: uuid,
                userId: owner,
                userName: userName,
                role: 'owner'
            });

            setServiceToUser({
                serviceId: uuid,
                user: owner,
                serviceName: name,
                role: 'owner'
            });
            return { status: true, message: 'Service created.', serviceId: uuid };
        })
        .catch((error) => {
            console.log('addService error: ', error);
            return { status: false, message: ('Error: ', error) };
        });
    return result;
};

export const edit = async (props) => {
    const { id, name, email, abn, numberOfEmployees, owner } = props;
    const result = await setDoc(doc(collection(firestore, 'services', id)), {
        name: name,
        email: email,
        abn: abn,
        numberOfEmployees: numberOfEmployees,
        owner: owner,
        createdAt: serverTimestamp()
    })
        .then(() => {
            // dispatch({ type: 'ADD_USER_SUCCESS' });
            console.log('editService: successful.');
            return { status: true, message: 'Service created.' };
        })
        .catch((error) => {
            // dispatch({ type: 'ADD_USER_ERROR' }, error);
            console.log('editService error: ', error);
            return { status: false, message: ('Error: ', error) };
        });
    return result;
};

export const fetchServicesByOwner = (props) => {
    return async (dispatch) => {
        const { owner } = props;
        // const services = query(collection(firestore, 'services'), where('owner', '==', owner));

        const docRef = doc(firestore, 'services', owner);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const service = docSnap.data();
            dispatch({ type: 'FETCH_SERVICE', service });
        }
    };
};

export const fetchServicesById = (props) => {
    return async (dispatch) => {
        const { serviceId } = props;
        // const services = query(collection(firestore, 'services'), where('owner', '==', owner));

        const docRef = doc(firestore, 'services', serviceId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const service = docSnap.data();
            dispatch({ type: 'FETCH_SERVICE', service });
        }
    };
};

export const fetchServices = () => {
    return async (dispatch) => {
        // const services = query(collection(firestore, 'services'), where('owner', '==', owner));

        await getDocs(collection(firestore, 'services'))
            .then((docs) => {
                const services = docs.docs.map((doc) => {
                    return {
                        id: doc.id,
                        ...doc.data()
                    };
                });
                dispatch({ type: 'FETCH_SERVICES', services });
            })
            .catch((error) => {
                console.log('FETCH_SERVICES_ERROR: ', error);
            });
    };
};

export const fetchServicesByInvite = (props) => {
    const { invitedIds } = props;
    return async (dispatch) => {
        // const services = query(collection(firestore, 'services'), where('owner', '==', owner));
        const docRef = collection(firestore, 'services');
        const docWhere = where(documentId(), 'in', invitedIds);
        const queried = query(docRef, docWhere);
        await getDocs(queried)
            .then((docs) => {
                const servicesInvited = docs.docs.map((doc) => {
                    return {
                        id: doc.id,
                        ...doc.data()
                    };
                });

                dispatch({ type: 'FETCH_SERVICES_INVITED', servicesInvited });
            })
            .catch((error) => {
                console.log('FETCH_SERVICES_INVITED_ERROR: ', error);
            });
    };
};

export const inviteEmployee = async (props) => {
    const { email, role, serviceId, serviceName } = props;

    await setDoc(doc(collection(firestore, 'serviceEmployeeInvites')), {
        email: email,
        role: role,
        serviceId: serviceId,
        serviceName: serviceName,
        createdAt: serverTimestamp()
    })
        .then(() => {
            // dispatch({ type: 'ADD_USER_SUCCESS' });
            console.log('inviteEmployee: successful.');
            return { status: true, message: 'Invite created.' };
        })
        .catch((error) => {
            // dispatch({ type: 'ADD_USER_ERROR' }, error);
            console.log('inviteEmployee error: ', error);
            return { status: false, message: ('Error: ', error) };
        });
};

export const removeInviteEmployee = (props) => {
    const { email } = props;
    return async () => {
        // const services = query(collection(firestore, 'services'), where('owner', '==', owner));
        const docRef = getDocs(collection(firestore, 'serviceEmployeeInvites'));
        const docWhere = where(docRef, 'email', '==', email);
        await query(docRef, docWhere)
            .then((docs) => {
                console.log(docs);
                docs.docs.map((doc) => {
                    deleteDoc(firestore, 'serviceEmployeeInvites', doc.id);
                    console.log('removeInviteEmployee: successful.', doc.id);
                });
            })
            .catch((error) => {
                console.log('errooou: ', error);
            });
    };
};

export const fetchServiceInvites = (props) => {
    const { serviceId } = props;
    return async (dispatch) => {
        // const services = query(collection(firestore, 'services'), where('owner', '==', owner));
        const docRef = getDocs(collection(firestore, 'serviceEmployeeInvites'));
        const docWhere = where(docRef, 'serviceId', '==', serviceId);
        await query(docRef, docWhere)
            .then((docs) => {
                const serviceInvites = docs.docs.map((doc) => {
                    return {
                        id: doc.id,
                        ...doc.data()
                    };
                });
                dispatch({ type: 'FETCH_COMPPANY_INVITES', serviceInvites });
            })
            .catch((error) => {
                console.log('FETCH_COMPPANY_INVITES_ERROR: [fetchServiceInvites]', error);
            });
    };
};

export const fetchEmployeeInvites = (props) => {
    const { email } = props;

    return async (dispatch) => {
        // const services = query(collection(firestore, 'services'), where('owner', '==', owner));
        const docRef = collection(firestore, 'serviceEmployeeInvites');
        const docWhere = where('email', '==', email);
        const queried = query(docRef, docWhere);
        await getDocs(queried)
            .then((docs) => {
                const employeeInvites = docs.docs.map((doc) => {
                    return {
                        id: doc.id,
                        ...doc.data()
                    };
                });
                dispatch({ type: 'FETCH_EMPLOYEE_INVITES', employeeInvites });
            })
            .catch((error) => {
                console.log('FETCH_EMPLOYEE_INVITES_ERROR: [fetchEmployeeInvites]', error);
            });
    };
};

export const setUserToService = async (props) => {
    const { serviceId, userId, userName, role } = props;
    const result = await setDoc(doc(firestore, 'services', serviceId, 'employees', userId), {
        id: userId,
        name: userName,
        role: role,
        createdAt: serverTimestamp()
    })
        .then(() => {
            // dispatch({ type: 'ADD_USER_SUCCESS' });
            console.log('setServiceToUser: successful.');
            return { status: true, message: 'Service added to user.' };
        })
        .catch((error) => {
            // dispatch({ type: 'ADD_USER_ERROR' }, error);
            console.log('setServiceToUser error: ', error);
            return { status: false, message: ('Error: ', error) };
        });
    return result;
};
