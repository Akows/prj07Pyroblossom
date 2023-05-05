import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth'
import { collection, doc, getCountFromServer, getDoc, query, setDoc } from 'firebase/firestore';
import { appAuth, appFireStore, timeStamp } from '../../firebase/config'

const collectionRef = collection(appFireStore, 'user');

const SignUp = (userData) => {
    return (dispatch, getState) => {
        // dispatch({ type: 'LOADING' });

        const searchUser = async () => {
            const docRef = doc(collectionRef, `${userData.displayName}`);
            const docSnap = await getDoc(docRef);

            // console.log(docSnap.data());
            // console.log(docSnap.data().displayName);
            // console.log(docSnap.data().email);

            if (userData.email === docSnap.data().email) {
                throw new Error('이메일 중복.');
            };

            // if (userData.displayName === docSnap.data().displayName) {
            //    
            //     return;
            // }


        };

        searchUser()
            .then(() => {
                console.log('ok');
            })
            .catch((error) => {
                const errorData = {
                    isError: true,
                    errorMassage: '중복되는 이메일 주소입니다.',
                };

                dispatch({ type: 'ERROR', payload: errorData });
            });



        // createUserWithEmailAndPassword(appAuth, userData.email, userData.password)
        //     .then((userCredential) => {
        //         if (!userCredential.user) {
        //             throw new Error('오류가 발생하였습니다.');
        //         }
        //         updateProfile(appAuth.currentUser, {
        //             displayName: userData.displayName,
        //         })
        //             .then(() => {
        //                 // const collectionRef = collection(appFireStore, 'user');

        //                 const addData = async () => {
        //                     const querys = query(collectionRef);
        //                     const userId = await getCountFromServer(querys);
        //                     const createdTime = timeStamp.fromDate(new Date());
        //                     const docRef = doc(collectionRef, `${userData.displayName}`);

        //                     await setDoc(docRef,
        //                         {
        //                             memberNumber: userId.data().count + 1,
        //                             email: userData.email,
        //                             password: userData.password,
        //                             name: userData.name,
        //                             displayName: userData.displayName,
        //                             address: userData.address,
        //                             signupDate: createdTime
        //                         }
        //                     )
        //                         .then(() => {
        //                             dispatch({ type: 'SIGN_UP_SUCCESS' });
        //                         })
        //                         .catch((error) => {
        //                             dispatch({ type: 'ERROR', payload: error });
        //                         });
        //                 };
        //                 addData();
        //             })
        //             .catch((error) => {
        //                 dispatch({ type: 'ERROR', payload: error });
        //             });
        //     })
        //     .catch((error) => {
        //         dispatch({ type: 'ERROR', payload: error });
        //     });
    };
};

const logIn = (email, password) => {
    return (dispatch, getState) => {
        dispatch({ type: 'LOADING' });

        signInWithEmailAndPassword(appAuth, email, password)
            .then((userCredential) => {
                if (!userCredential.user) {
                    throw new Error('로그인에 실패했습니다.');
                }
                dispatch({ type: 'LOG_IN_SUCCESS', payload: userCredential.user });
            })
            .catch((error) => {
                dispatch({ type: 'ERROR', payload: error });
            });
    };
};

const logOut = () => {
    return (dispatch, getState) => {
        signOut(appAuth)
            .then(() => {
                dispatch({ type: 'LOG_OUT' });
            })
            .catch((error) => {
                dispatch({ type: 'ERROR', payload: error.massage });
            });
    }
};

const isLoginCheck = () => {
    return (dispatch, getState) => {
        onAuthStateChanged(appAuth, (user) => {
            console.log(user);


            if (user) {
                const userData = {
                    email: user.email,
                    displayName: user.displayName,
                };

                dispatch({ type: 'LOG_IN_SUCCESS', payload: userData });
            }
            else {
                dispatch({ type: 'ERROR', payload: '유저 인증에 실패하였습니다.' });
            }
        });
    };
};

export { SignUp, logIn, logOut, isLoginCheck };
