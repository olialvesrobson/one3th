import { doc, getDoc, getDocs, setDoc, collection, query, where, documentId } from 'firebase/firestore';
import { firestore } from '../../../resources/config/firestore/store';
import { serverTimestamp } from '@firebase/firestore';
import { setCompanyToUser } from '../users/actions';
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

    const result = await setDoc(doc(collection(firestore, 'companies'), uuid), docFields)
        .then(function () {
            console.log('addCompany: successful.');

            setUserToCompany({
                companyId: uuid,
                userId: owner,
                userName: userName,
                role: 'owner'
            });

            setCompanyToUser({
                companyId: uuid,
                user: owner,
                companyName: name,
                role: 'owner'
            });
            return { status: true, message: 'Company created.', companyId: uuid };
        })
        .catch((error) => {
            console.log('addCompany error: ', error);
            return { status: false, message: ('Error: ', error) };
        });
    return result;
};

export const edit = async (props) => {
    const { id, name, email, abn, numberOfEmployees, owner } = props;
    const result = await setDoc(doc(collection(firestore, 'companies', id)), {
        name: name,
        email: email,
        abn: abn,
        numberOfEmployees: numberOfEmployees,
        owner: owner,
        createdAt: serverTimestamp()
    })
        .then(() => {
            // dispatch({ type: 'ADD_USER_SUCCESS' });
            console.log('editCompany: successful.');
            return { status: true, message: 'Company created.' };
        })
        .catch((error) => {
            // dispatch({ type: 'ADD_USER_ERROR' }, error);
            console.log('editCompany error: ', error);
            return { status: false, message: ('Error: ', error) };
        });
    return result;
};

export const fetchCompaniesByOwner = (props) => {
    return async (dispatch) => {
        const { owner } = props;
        // const companies = query(collection(firestore, 'companies'), where('owner', '==', owner));

        const docRef = doc(firestore, 'companies', owner);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const company = docSnap.data();
            dispatch({ type: 'FETCH_COMPANY', company });
        }
    };
};

export const fetchCompaniesById = (props) => {
    return async (dispatch) => {
        const { companyId } = props;
        // const companies = query(collection(firestore, 'companies'), where('owner', '==', owner));

        const docRef = doc(firestore, 'companies', companyId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const company = docSnap.data();
            dispatch({ type: 'FETCH_COMPANY', company });
        }
    };
};

export const fetchCompanies = () => {
    return async (dispatch) => {
        // const companies = query(collection(firestore, 'companies'), where('owner', '==', owner));

        await getDocs(collection(firestore, 'companies'))
            .then((docs) => {
                const companies = docs.docs.map((doc) => {
                    return {
                        id: doc.id,
                        ...doc.data()
                    };
                });
                dispatch({ type: 'FETCH_COMPANIES', companies });
            })
            .catch((error) => {
                console.log('FETCH_COMPANIES_ERROR: ', error);
            });
    };
};

export const fetchCompaniesByInvite = (props) => {
    const { invitedIds } = props;
    return async (dispatch) => {
        // const companies = query(collection(firestore, 'companies'), where('owner', '==', owner));
        const docRef = collection(firestore, 'companies');
        const docWhere = where(documentId(), 'in', invitedIds);
        const queried = query(docRef, docWhere);
        await getDocs(queried)
            .then((docs) => {
                const companiesInvited = docs.docs.map((doc) => {
                    return {
                        id: doc.id,
                        ...doc.data()
                    };
                });

                dispatch({ type: 'FETCH_COMPANIES_INVITED', companiesInvited });
            })
            .catch((error) => {
                console.log('FETCH_COMPANIES_INVITED_ERROR: ', error);
            });
    };
};

export const inviteEmployee = async (props) => {
    const { email, role, companyId, companyName } = props;

    await setDoc(doc(collection(firestore, 'companyEmployeeInvites')), {
        email: email,
        role: role,
        companyId: companyId,
        companyName: companyName,
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
        // const companies = query(collection(firestore, 'companies'), where('owner', '==', owner));
        const docRef = getDocs(collection(firestore, 'companyEmployeeInvites'));
        const docWhere = where(docRef, 'email', '==', email);
        await query(docRef, docWhere)
            .then((docs) => {
                console.log(docs);
                docs.docs.map((doc) => {
                    deleteDoc(firestore, 'companyEmployeeInvites', doc.id);
                    console.log('removeInviteEmployee: successful.', doc.id);
                });
            })
            .catch((error) => {
                console.log('errooou: ', error);
            });
    };
};

export const fetchCompanyInvites = (props) => {
    const { companyId } = props;
    return async (dispatch) => {
        // const companies = query(collection(firestore, 'companies'), where('owner', '==', owner));
        const docRef = getDocs(collection(firestore, 'companyEmployeeInvites'));
        const docWhere = where(docRef, 'companyId', '==', companyId);
        await query(docRef, docWhere)
            .then((docs) => {
                const companyInvites = docs.docs.map((doc) => {
                    return {
                        id: doc.id,
                        ...doc.data()
                    };
                });
                dispatch({ type: 'FETCH_COMPPANY_INVITES', companyInvites });
            })
            .catch((error) => {
                console.log('FETCH_COMPPANY_INVITES_ERROR: [fetchCompanyInvites]', error);
            });
    };
};

export const fetchEmployeeInvites = (props) => {
    const { email } = props;

    return async (dispatch) => {
        // const companies = query(collection(firestore, 'companies'), where('owner', '==', owner));
        const docRef = collection(firestore, 'companyEmployeeInvites');
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

export const setUserToCompany = async (props) => {
    const { companyId, userId, userName, role } = props;
    const result = await setDoc(doc(firestore, 'companies', companyId, 'employees', userId), {
        id: userId,
        name: userName,
        role: role,
        createdAt: serverTimestamp()
    })
        .then(() => {
            // dispatch({ type: 'ADD_USER_SUCCESS' });
            console.log('setCompanyToUser: successful.');
            return { status: true, message: 'Company added to user.' };
        })
        .catch((error) => {
            // dispatch({ type: 'ADD_USER_ERROR' }, error);
            console.log('setCompanyToUser error: ', error);
            return { status: false, message: ('Error: ', error) };
        });
    return result;
};
