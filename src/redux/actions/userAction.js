import { createUserWithEmailAndPassword, onAuthStateChanged, sendEmailVerification, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth'
import { doc, getCountFromServer, query, setDoc } from 'firebase/firestore';
import { createErrorData, errorCode } from '../../configs/errorCodes';
import { appAuth, timeStamp, userCollectionRef } from '../../configs/firebase/config'

// 회원가입 기능.
const SignUp = (inputEmail, inputPassword, navigate) => {
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

        createUserWithEmailAndPassword(appAuth, inputEmail, inputPassword)
            .then((userCredential) => {

                // 과정이 정상적으로 진행되었는데, userCredential 값이 존재하지 않으면 과정을 중단하고 에러.
                if (!userCredential.user) {
                    throw errorCode.userSignInError.ThereIsNoUserCredential;
                }

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

const UserDataUpdate = (userData, navigate) => {
    return (dispatch, getState) => {



        updateProfile(appAuth.currentUser, {
            displayName: userData.displayName,
        })
            .then(() => {

                const addData = async () => {
                    const querys = query(userCollectionRef);
                    const userId = await getCountFromServer(querys);
                    const createdTime = timeStamp.fromDate(new Date());
                    const docRef = doc(userCollectionRef, `${userData.email}`);

                    await setDoc(docRef,
                        {
                            userNumber: userId.data().count + 1,
                            userType: '일반회원',
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



    };
};









// 로그인 기능.
const logIn = (inputUserData, navigate) => {
    return (dispatch, getState) => {
        dispatch({ type: 'PROCESSINIT' });
        dispatch({ type: 'LOADING' });

        signInWithEmailAndPassword(appAuth, inputUserData.email, inputUserData.password)
            .then((userCredential) => {
                if (!userCredential.user) {
                    throw errorCode.userSignInError.LoginFailure;
                }
                dispatch({ type: 'LOG_IN_SUCCESS', payload: userCredential.user });
                dispatch({ type: 'COMPLETE' });
                alert('환영합니다.');
                navigate('/', { replace: true });
            })
            .catch((error) => {
                dispatch({ type: 'ERROR', payload: createErrorData(error) });
            });
    };
};

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

const isLoginCheck = () => {
    return (dispatch, getState) => {
        const isLoginCheck = getState().user.flagvalue.isLogin;

        if (!isLoginCheck) {
            return;
        }
        else {
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
        }
    };
};

export { SignUp, logIn, logOut, isLoginCheck };
