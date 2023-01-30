import { doc, getDoc, getDocs, setDoc, collection } from 'firebase/firestore';
import { firestore } from '../../../resources/config/firestore/store';
import { serverTimestamp } from '@firebase/firestore';

export const add = async (props) => {
    const { name, email, abn, numberOfEmployees, owner } = props;
    const result = await setDoc(doc(collection(firestore, 'companies')), {
        name: name,
        email: email,
        abn: abn,
        numberOfEmployees: numberOfEmployees,
        owner: owner,
        createdAt: serverTimestamp()
    })
        .then(() => {
            // dispatch({ type: 'ADD_USER_SUCCESS' });
            console.log('addCompany: successful.');
            return { status: true, message: 'Company created.' };
        })
        .catch((error) => {
            // dispatch({ type: 'ADD_USER_ERROR' }, error);
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
                console.log('errooou: ', error);
            });
    };
};
