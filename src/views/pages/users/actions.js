import { doc, collection, getDocs, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { firestore } from '../../../resources/config/firestore/store';
import { serverTimestamp } from '@firebase/firestore';
import { createContext } from 'react';

export const UserContext = createContext();

export const add = async (props) => {
    const { name, email, phoneNumber, token } = props;
    const result = await setDoc(doc(firestore, 'users'), {
        name: name,
        email: email,
        phoneNumber: phoneNumber,
        token: token,
        createdAt: serverTimestamp()
    })
        .then(() => {
            // dispatch({ type: 'ADD_USER_SUCCESS' });
            console.log('addUser: successful.');
            return { status: true, message: 'User created.' };
        })
        .catch((error) => {
            // dispatch({ type: 'ADD_USER_ERROR' }, error);
            console.log('addUser error: ', error);
            return { status: false, message: ('Error: ', error) };
        });
    return result;
};

export const fetchUser = (props) => {
    return async (dispatch) => {
        // const companies = query(collection(firestore, 'companies'), where('owner', '==', owner));

        const docSnap = await getDoc(doc(collection(firestore, 'users'), props.user));

        if (docSnap.exists()) {
            const user = {
                uid: props.user,
                ...docSnap.data()
            };
            dispatch({ type: 'FETCH_USER', user });
            return { ...user };
        }
    };
};

export const fetchUsers = () => {
    return async (dispatch) => {
        // const companies = query(collection(firestore, 'companies'), where('owner', '==', owner));

        await getDocs(collection(firestore, 'users'))
            .then((docs) => {
                const users = docs.docs.map((doc) => {
                    return {
                        id: doc.id,
                        ...doc.data()
                    };
                });
                dispatch({ type: 'FETCH_USERS', users });
            })
            .catch((error) => {
                console.log('FETCH_USERS_ERROR: ', error);
            });
    };
};

export const setUserEnrolledToCompany = async (props) => {
    const { companyId, companyName, user } = props;
    const result = await updateDoc(doc(firestore, 'users', user), {
        companyEnrolled: companyId,
        companyEnrolledName: companyName,
        companyEnrolledAt: serverTimestamp()
    })
        .then(() => {
            // dispatch({ type: 'ADD_USER_SUCCESS' });
            console.log('setUserEnrolledToCompany: successful.');
            return { status: true, message: 'User Enrolled to Company.' };
        })
        .catch((error) => {
            // dispatch({ type: 'ADD_USER_ERROR' }, error);
            console.log('setUserEnrolledToCompany error: ', error);
            return { status: false, message: ('Error: ', error) };
        });
    return result;
};

export const setCompanyToUser = async (props) => {
    const { companyId, companyName, user, role } = props;
    const result = await setDoc(doc(firestore, 'users', user, 'companies', companyId), {
        id: companyId,
        name: companyName,
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

export const fetchUserCompanies = (props) => {
    const { userId } = props;
    return async (dispatch) => {
        await getDocs(collection(firestore, 'users', userId, 'companies'))
            .then((docs) => {
                const companies = docs.docs.map((doc) => {
                    return {
                        id: doc.id,
                        ...doc.data()
                    };
                });
                dispatch({ type: 'FETCH_USER_COMPANIES', companies });
            })
            .catch((error) => {
                console.log('FETCH_USER_COMPANIES_ERROR: ', error);
            });
    };
};
