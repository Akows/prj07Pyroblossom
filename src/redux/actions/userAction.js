import { browserLocalPersistence, browserSessionPersistence, createUserWithEmailAndPassword, onAuthStateChanged, sendEmailVerification, setPersistence, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth'
import { doc, getCountFromServer, getDoc, query, setDoc } from 'firebase/firestore';
import { createErrorData, errorCode } from '../../configs/errorCodes';
import { appAuth, timeStamp, userCollectionRef } from '../../configs/firebase/config'

// 회원가입 기능.
const SignUp = (userData, navigate) => {
    return (dispatch, getState) => {
        dispatch({ type: 'PROCESSINIT' });
        dispatch({ type: 'LOADING' });

        const emailVerifiedProcess = async (currentUser) => {

            // 파이어베이스의 계정 생성 원리.
            // createUserWithEmailAndPassword로 계정을 생성할 경우..
            // 생성된 계정은 파이어베이스 시스템 상에서 '로그인'한 것으로 간주된다.
            // 따라서 appAuth 객체의 currentUser값이 채워지게 되는데.
            // 이 값을 이용하여 이메일인증을 실행하는 것이다.
            await sendEmailVerification(currentUser);
        };

        createUserWithEmailAndPassword(appAuth, userData.email, userData.password)
            .then((userCredential) => {

                // 과정이 정상적으로 진행되었는데, userCredential 값이 존재하지 않으면 과정을 중단하고 에러.
                if (!userCredential.user) {
                    throw errorCode.userSignInError.ThereIsNoUserCredential;
                }

                // 계정 생성이 완료되고, userCredential 값이 정상적으로 존재하면 displayName 정보를 업데이트 해준다.
                updateProfile(appAuth.currentUser, {
                    displayName: userData.displayname,
                })
                    .then(() => {
                        // displayName 업데이트가 정상적으로 완료되면 DB에 유저 정보를 저장한다.
                        const addData = async () => {
                            const querys = query(userCollectionRef);

                            // DB에 저장된 유저 정보의 갯수가 총 몇 개인지 계산.
                            const allUserCount = await getCountFromServer(querys);

                            // User DB에 저장, ID값은 입력한 email값이 되도록.
                            const docRef = doc(userCollectionRef, `${userData.email}`);

                            // 생성 시간을 기록하기 위해 timeStamp 객체를 사용.
                            const createdTime = timeStamp.fromDate(new Date());

                            // DB 정보 저장. userNumber는 allUserCount 값의 1을 더한다.
                            await setDoc(docRef,
                                {
                                    userNumber: allUserCount.data().count + 1,
                                    userType: '일반회원',
                                    email: userData.email,
                                    password: userData.password,
                                    name: userData.name,
                                    displayName: userData.displayname,
                                    address: userData.address,
                                    address2: userData.address2,
                                    signupDate: createdTime
                                }
                            )
                                // 작업이 정상 완료되면 SIGN_UP_SUCCESS Action을 실행하고 완료 메시지 출력, 이후 메인 페이지로 이동.
                                .then(() => {
                                    dispatch({ type: 'SIGN_UP_SUCCESS' });
                                    alert('회원가입이 완료되었습니다.');
                                    navigate('/', { replace: true });
                                })
                                // 계정 정보 파이어스토어 저장 - 에러 발생 catch 구문.
                                .catch((error) => {
                                    console.log(error);
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


                emailVerifiedProcess(appAuth.currentUser)
                    .then(() => {
                        dispatch({ type: 'COMPLETE' });
                        dispatch({ type: 'CHECK_SUCCESS' });
                        alert('인증 메일이 발송되었습니다. 이메일 함을 확인해주세요.');
                    })
                    .catch((error) => {
                        dispatch({ type: 'ERROR', payload: createErrorData(error) });
                        alert('인증메일 발송에 에러가 발생했습니다.');
                    });

            })
            // 파이어베이스 계정 생성 - 에러 발생 catch 구문.
            .catch((error) => {
                dispatch({ type: 'ERROR', payload: createErrorData(error) });
                alert('계정 생성에 에러가 발생하였습니다.');
                navigate('/', { replace: true });
            });
    };
};

// 로그인 기능.
const logIn = (inputUserData, navigate) => {
    return (dispatch, getState) => {
        dispatch({ type: 'PROCESSINIT' });
        dispatch({ type: 'LOADING' });

        let persistenceChoice = '';

        if (inputUserData.isAutoLogin) {
            persistenceChoice = browserLocalPersistence;
        }
        else {
            persistenceChoice = browserSessionPersistence;
        };

        setPersistence(appAuth, persistenceChoice)
            .then(async () => {
                try {
                    const userCredential = await signInWithEmailAndPassword(appAuth, inputUserData.email, inputUserData.password);
                    if (!userCredential.user) {
                        throw errorCode.userSignInError.LoginFailure;
                    }
                    dispatch({ type: 'LOG_IN_SUCCESS', payload: userCredential.user });
                    dispatch({ type: 'COMPLETE' });
                    alert('환영합니다.');
                    navigate('/', { replace: true });
                } catch (error) {
                    dispatch({ type: 'ERROR', payload: createErrorData(error) });
                }
            })
            .catch((error) => {
                dispatch({ type: 'ERROR', payload: createErrorData(error) });
            });
    };
};

// 로그아웃 기능.
const logOut = (navigate) => {
    return (dispatch, getState) => {
        dispatch({ type: 'PROCESSINIT' });
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

// 유저 로그인 여부 확인.
const isLoginCheck = () => {
    return (dispatch, getState) => {
        dispatch({ type: 'PROCESSINIT' });
        dispatch({ type: 'LOADING' });

        onAuthStateChanged(appAuth, (user) => {
            if (!user) {
                const errorData = {
                    isError: true,
                    errorCode: 'ULCE001',
                    message: '사용자 인증 정보가 조회되지 않음.',
                };
                dispatch({ type: 'ERROR', payload: errorData });
            }
            else {
                const userData = {
                    email: user.email,
                    displayName: user.displayName,
                };

                dispatch({ type: 'LOG_IN_SUCCESS', payload: userData });
            }

            // console.log('현재 유저 정보');
            // console.log(user);
        })
    };
};

const GetUserData = () => {
    return (dispatch, getState) => {
        dispatch({ type: 'PROCESSINIT' });
        dispatch({ type: 'LOADING' });

        let userEmail = '';
        let userData = {};

        const checkUserAuth = async () => {
            onAuthStateChanged(appAuth, (user) => {
                if (!user) {
                    throw errorCode.userLoginCheckError.ThereIsNoUserData;
                }
                userEmail = user.email;
            });
        };

        checkUserAuth()
            .then(() => {
                const getUserData = async (userEmail) => {
                    const docRef = doc(userCollectionRef, userEmail);
                    const docSnap = await getDoc(docRef);

                    userData = {
                        userNumber: docSnap.data().userNumber,
                        userType: docSnap.data().userType,
                        email: docSnap.data().email,
                        password: docSnap.data().password,
                        name: docSnap.data().name,
                        displayName: docSnap.data().displayName,
                        address: docSnap.data().address,
                        address2: docSnap.data().address2,
                        signupDate: docSnap.data().signupDate.toDate().toLocaleString(),
                    };
                };

                getUserData(userEmail)
                    .then((result) => {
                        dispatch({ type: 'LOG_IN_SUCCESS', payload: userData });
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

export { SignUp, logIn, logOut, isLoginCheck, GetUserData };
