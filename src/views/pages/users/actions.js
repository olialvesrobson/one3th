import { doc, collection, getDocs, getDoc, setDoc } from 'firebase/firestore';
import { firestore } from '../../../resources/config/firestore/store';
import { serverTimestamp } from '@firebase/firestore';

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
                console.log('errooou: ', error);
            });
    };
};
