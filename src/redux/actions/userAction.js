import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth'
import { doc, getCountFromServer, getDoc, query, setDoc } from 'firebase/firestore';
import { createErrorData, errorCode } from '../../configs/errorCodes';
import { appAuth, timeStamp, userCollectionRef } from '../../configs/firebase/config'

// 회원가입 기능.
const SignUp = (userData, navigate) => {
    return (dispatch, getState) => {
        dispatch({ type: 'LOADING' });

        const checkUserDuplication = async () => {
            const docRef = doc(userCollectionRef, `${userData.displayName}`);
            const docSnap = await getDoc(docRef);

            // console.log(docSnap.data());
            // console.log(docSnap.data().displayName);
            // console.log(docSnap.data().email);

            if (userData.email === 'admin@admin.com' || userData.displayName === '관리자') {
                throw errorCode.userSignInError.DuplicationAdminAccount;
            };

            if (userData.email === docSnap.data().email) {
                throw errorCode.userSignInError.DuplicationEmail;
            };

            if (userData.displayName === docSnap.data().displayName) {
                throw errorCode.userSignInError.DuplicationNickname;
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
                            throw errorCode.userSignInError.ThereIsNoUserCredential;
                        }

                        updateProfile(appAuth.currentUser, {
                            displayName: userData.displayName,
                        })
                            .then(() => {

                                const addData = async () => {
                                    const querys = query(userCollectionRef);
                                    const userId = await getCountFromServer(querys);
                                    const createdTime = timeStamp.fromDate(new Date());
                                    const docRef = doc(userCollectionRef, `${userData.displayName}`);

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
                                            alert('회원가입이 완료되었습니다.');
                                            navigate('/', { replace: true });
                                        })
                                        // 계정 정보 파이어스토어 저장 - 에러 발생 catch 구문.
                                        .catch((error) => {
                                            dispatch({ type: 'ERROR', payload: createErrorData(error) });
                                            alert('계정 정보 저장에 에러가 발생하였습니다.');
                                            navigate('/', { replace: true });
                                        });
                                };
                                addData();
                            })
                            // 파이어베이스 계정 생성 후 사용자 정보 업데이트 - 에러 발생 catch 구문.
                            .catch((error) => {
                                dispatch({ type: 'ERROR', payload: createErrorData(error) });
                                alert('사용자 정보 등록에 에러가 발생하였습니다.');
                                navigate('/', { replace: true });
                            });
                    })
                    // 파이어베이스 계정 생성 - 에러 발생 catch 구문.
                    .catch((error) => {
                        dispatch({ type: 'ERROR', payload: createErrorData(error) });
                        alert('계정 생성에 에러가 발생하였습니다.');
                        navigate('/', { replace: true });
                    });
            })
            // 중복검사 - 에러 발생 catch 구문.
            .catch((error) => {
                dispatch({ type: 'ERROR', payload: createErrorData(error) });
                alert(error.message);
                navigate('/user/login', { replace: true });
            });
    };
};

// 로그인 기능.
const logIn = (email, password, navigate) => {
    return (dispatch, getState) => {
        dispatch({ type: 'LOADING' });

        signInWithEmailAndPassword(appAuth, email, password)
            .then((userCredential) => {
                if (!userCredential.user) {
                    throw errorCode.userSignInError.LoginFailure;
                }
                dispatch({ type: 'LOG_IN_SUCCESS', payload: userCredential.user });
                alert('환영합니다.');
                navigate('/', { replace: true });
            })
            .catch((error) => {
                dispatch({ type: 'ERROR', payload: createErrorData(error) });

                if (createErrorData(error).errorCode === 'auth/user-not-found') {
                    alert('존재하지 않는 사용자입니다.');
                };
                navigate('/user/login', { replace: true });
            });
    };
};

const logOut = (navigate) => {
    return (dispatch, getState) => {
        dispatch({ type: 'LOADING' });

        signOut(appAuth)
            .then(() => {
                dispatch({ type: 'LOG_OUT' });
                alert('안녕히가세요..');
                navigate('/', { replace: true });
            })
            .catch((error) => {
                dispatch({ type: 'ERROR', payload: createErrorData(error) });
                alert(error.message);
                navigate('/', { replace: true });
            });
    }
};

const isLoginCheck = () => {
    return (dispatch, getState) => {
        dispatch({ type: 'LOADING' });

        onAuthStateChanged(appAuth, (user) => {
            if (!user) {
                const errorData = {
                    isError: true,
                    errorCode: 'ULCE001',
                    message: '사용자 인증 정보가 조회되지 않음.',
                };
                dispatch({ type: 'ERROR', payload: errorData });
                console.log(errorData.message);
            }
            else {
                const userData = {
                    email: user.email,
                    displayName: user.displayName,
                };

                dispatch({ type: 'LOG_IN_SUCCESS', payload: userData });
            }

            console.log('현재 유저 정보');
            console.log(user);
        })
    };
};

export { SignUp, logIn, logOut, isLoginCheck };
