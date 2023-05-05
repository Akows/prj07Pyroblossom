import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth'
import { collection, doc, getCountFromServer, getDoc, query, setDoc } from 'firebase/firestore';
import { appAuth, appFireStore, timeStamp } from '../../firebase/config'

// 파이어베이스 user 컬렉션 Ref.
const collectionRef = collection(appFireStore, 'user');

// error dispatch을 위한 errordata 정리해주는 함수. 
const createErrorData = (error) => {
    const errorData = {
        isError: true,
        errorCode: error.code,
        errorMassage: error.massage,
    };
    return errorData;
};

// 회원가입 기능.
const SignUp = (userData) => {
    return (dispatch, getState) => {
        dispatch({ type: 'LOADING' });

        const checkUserDuplication = async () => {
            const docRef = doc(collectionRef, `${userData.displayName}`);
            const docSnap = await getDoc(docRef);

            // console.log(docSnap.data());
            // console.log(docSnap.data().displayName);
            // console.log(docSnap.data().email);

            if (userData.email === 'admin@admin.com' || userData.displayName === '관리자') {
                const errorInfo = {
                    code: '000',
                    massage: '관리자 이메일 혹은 닉네임 사용',
                };
                throw errorInfo;
            };

            if (userData.email === docSnap.data().email) {
                const errorInfo = {
                    code: '001',
                    massage: '이메일 중복.',
                };
                throw errorInfo;
            };

            if (userData.displayName === docSnap.data().displayName) {
                const errorInfo = {
                    code: '003',
                    massage: '닉네임 중복.',
                };
                throw errorInfo;
            }

            // throw new Error
            // 예외처리를 위한 기본 구조 사용방법.

            // if ('dd') {
            //     throw new Error(에러메시지);
            // }
        };

        checkUserDuplication()
            .then(() => {
                createUserWithEmailAndPassword(appAuth, userData.email, userData.password)
                    .then((userCredential) => {

                        if (!userCredential.user) {
                            const errorInfo = {
                                code: '---',
                                massage: '파이어베이스에서 회원가입 절차에 에러가 발생함',
                            };

                            throw errorInfo;
                        }

                        updateProfile(appAuth.currentUser, {
                            displayName: userData.displayName,
                        })
                            .then(() => {

                                const addData = async () => {
                                    const querys = query(collectionRef);
                                    const userId = await getCountFromServer(querys);
                                    const createdTime = timeStamp.fromDate(new Date());
                                    const docRef = doc(collectionRef, `${userData.displayName}`);

                                    await setDoc(docRef,
                                        {
                                            memberNumber: userId.data().count + 1,
                                            email: userData.email,
                                            password: userData.password,
                                            name: userData.name,
                                            displayName: userData.displayName,
                                            address: userData.address,
                                            signupDate: createdTime
                                        }
                                    )
                                        .then(() => {
                                            dispatch({ type: 'SIGN_UP_SUCCESS' });
                                            alert('가입완료.');
                                            window.location.replace('/');
                                        })
                                        .catch((error) => {
                                            dispatch({ type: 'ERROR', payload: createErrorData(error) });
                                        });
                                };
                                addData();
                            })
                            .catch((error) => {
                                dispatch({ type: 'ERROR', payload: createErrorData(error) });
                            });
                    })
                    .catch((error) => {
                        dispatch({ type: 'ERROR', payload: createErrorData(error) });
                    });
            })
            .catch((error) => {
                dispatch({ type: 'ERROR', payload: createErrorData(error) });
            });
    };
};

// 로그인 기능.
const logIn = (email, password) => {
    return (dispatch, getState) => {
        dispatch({ type: 'LOADING' });

        signInWithEmailAndPassword(appAuth, email, password)
            .then((userCredential) => {
                if (!userCredential.user) {
                    throw new Error('로그인에 실패했습니다.');
                }
                dispatch({ type: 'LOG_IN_SUCCESS', payload: userCredential.user });
                alert('환영합니다.');
                window.location.replace('/');
            })
            .catch((error) => {
                dispatch({ type: 'ERROR', payload: createErrorData(error) });
                if (createErrorData(error).errorCode === 'auth/user-not-found') {
                    alert('존재하지 않는 사용자입니다.');
                };
                window.location.replace('/login');
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
                dispatch({ type: 'ERROR', payload: createErrorData(error) });
                alert(createErrorData(error).errorCode);
                window.location.replace('/login');
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
                const errorData = {
                    isError: true,
                    errorCode: '00A',
                    errorMassage: '로그인 사용자가 존재하지 않음.',
                };

                dispatch({ type: 'ERROR', payload: errorData });
            };
        });
    };
};

export { SignUp, logIn, logOut, isLoginCheck };
