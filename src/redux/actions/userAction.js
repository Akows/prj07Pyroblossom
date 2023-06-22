import { browserLocalPersistence, browserSessionPersistence, createUserWithEmailAndPassword, deleteUser, EmailAuthProvider, onAuthStateChanged, reauthenticateWithCredential, sendEmailVerification, setPersistence, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth'
import { deleteDoc, doc, getCountFromServer, getDoc, query, setDoc } from 'firebase/firestore';
import { createErrorData, errorCode } from '../../configs/errorCodes';
import { appAuth, pointRecordCollectionRef, timeStamp, userCollectionRef } from '../../configs/firebase/config'

// 유저 로그인 여부 확인.
const IsLoginCheck = () => {
    return (dispatch, getState) => {
        dispatch({ type: 'STATE_INIT' });
        dispatch({ type: 'LOADING' });

        onAuthStateChanged(appAuth, (user) => {
            if (!user) {
                console.log('사용자 인증 정보가 존재하지 않음.');
                dispatch({ type: 'COMPLETE' });
            }
            else {
                const loginUserData = {
                    email: user.email,
                    displayName: user.displayName,
                    emailVerified: user.emailVerified,
                    isAnonymous: user.isAnonymous,
                };
                dispatch({ type: 'COMPLETE' });
                dispatch({ type: 'LOG_IN_SUCCESS', payload: loginUserData });
            }

            // console.log('현재 유저 정보');
            // console.log(user);
        })
    };
};

// 회원가입 기능.
const SignUp = (userData, navigate) => {
    return (dispatch, getState) => {
        dispatch({ type: 'STATE_INIT' });
        dispatch({ type: 'LOADING' });

        const emailVerifiedProcess = async (currentUser) => {

            // 파이어베이스의 계정 생성 원리.
            // createUserWithEmailAndPassword로 계정을 생성할 경우..
            // 생성된 계정은 파이어베이스 시스템 상에서 '로그인'한 것으로 간주된다.
            // 따라서 appAuth 객체의 currentUser값이 채워지게 되는데.
            // 이 값을 이용하여 이메일인증을 실행하는 것이다.
            await sendEmailVerification(currentUser);
        };

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
                    phonenumber: userData.phonenumber,
                    displayName: userData.displayname,
                    address: userData.address,
                    address2: userData.address2,
                    signupDate: createdTime,
                    point: 100000,
                }
            );
        };

        // 회원가입시에는 가입기념 포인트를 지급하고, 기록을 저장한다.
        const addAdditionData = async () => {
            const querys = query(pointRecordCollectionRef);
            const count = await getCountFromServer(querys);

            const docRef = doc(pointRecordCollectionRef, `${count.data().count + 1}`);
            const createdTime = timeStamp.fromDate(new Date());

            await setDoc(docRef,
                {
                    userEmail: userData.email,
                    recordType: '+',
                    recordNumber: 100000,
                    recordDesc: '가입 기념 포인트 지급.',
                    recordDate: createdTime,
                    leftoverPoint: 100000,
                }
            );
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

                        addData()
                            // 작업이 정상 완료되면 SIGN_UP_SUCCESS Action을 실행하고 완료 메시지 출력, 이후 메인 페이지로 이동.
                            .then(() => {
                                addAdditionData()
                                    .then(() => {
                                        emailVerifiedProcess(appAuth.currentUser)
                                            .then(() => {
                                                dispatch({ type: 'COMPLETE' });
                                                dispatch({ type: 'SIGN_UP_SUCCESS' });
                                                alert('인증 메일이 발송되었습니다. 이메일 함을 확인해주세요.');
                                                alert('모든 과정이 완료되었습니다. 회원가입을 환영합니다!');
                                            })
                                            // 이메일 인증 메일 발송에 문제가 생겼을 경우.
                                            .catch((error) => {
                                                dispatch({ type: 'ERROR', payload: createErrorData(error) });
                                                alert('인증메일 발송에 에러가 발생했습니다.');
                                                navigate('/', { replace: true });
                                            });
                                    })
                                    // 포인트 기록 저장에 에러가 발생.
                                    .catch((error) => {
                                        dispatch({ type: 'ERROR', payload: createErrorData(error) });
                                        alert('포인트 기록 저장에 에러가 발생했습니다.');
                                        navigate('/', { replace: true });
                                    });
                            })
                            // 계정 정보 파이어스토어 저장 - 에러 발생 catch 구문.
                            .catch((error) => {
                                dispatch({ type: 'ERROR', payload: createErrorData(error) });
                                alert('계정 정보 저장에 에러가 발생하였습니다.');
                                navigate('/', { replace: true });
                            });
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
    };
};

// 로그인 기능.
const logIn = (inputUserData, navigate) => {
    return (dispatch, getState) => {
        dispatch({ type: 'STATE_INIT' });
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
        dispatch({ type: 'STATE_INIT' });
        dispatch({ type: 'LOADING' });

        signOut(appAuth)
            .then(() => {
                dispatch({ type: 'LOG_OUT' });
                dispatch({ type: 'COMPLETE' });
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



// 회원정보 수정.
const UserUpdate = (userData, navigate) => {
    return (dispatch, getState) => {
        dispatch({ type: 'STATE_INIT' });
        dispatch({ type: 'LOADING' });

        const updataUserInfo = async () => {
            const docRef = doc(userCollectionRef, userData.email);

            await setDoc(docRef, {
                name: userData.name,
                displayName: userData.displayName,
                address: userData.address,
                address2: userData.address2,
            }, { merge: true });
        };

        updateProfile(appAuth.currentUser, {
            displayName: userData.displayName,
        })
            .then(() => {
                updataUserInfo()
                    .then(() => {
                        dispatch({ type: 'COMPLETE' });
                        alert('수정이 완료되었습니다.');
                        navigate('/user/mypage', { replace: true });
                    })
                    .catch((error) => {
                        dispatch({ type: 'ERROR', payload: createErrorData(error) });
                        navigate('/user/mypage', { replace: true });
                    });
            })
            .catch((error) => {
                dispatch({ type: 'ERROR', payload: createErrorData(error) });
                navigate('/user/mypage', { replace: true });
            });
    };
};

// 회원탈퇴 기능.
const UserDelete = (userEmail, inputPassword, navigate) => {
    return (dispatch, getState) => {

        dispatch({ type: 'STATE_INIT' });
        dispatch({ type: 'LOADING' });

        // 사용자 재인증 (비밀번호 변경, 사용자 삭제 등의 기능에 필수적)
        const credential = EmailAuthProvider.credential(
            appAuth.currentUser.email,
            inputPassword
        );

        const deleteUserInfo = async () => {
            await deleteDoc(doc(userCollectionRef, userEmail));
        };

        const process = async () => {
            await reauthenticateWithCredential(
                appAuth.currentUser,
                credential
            )
                .then(() => {
                    deleteUser(appAuth.currentUser)
                        .then(() => {
                            deleteUserInfo()
                                .then(() => {
                                    dispatch({ type: 'COMPLETE' });
                                    alert('탈퇴가 완료되었습니다.');
                                    navigate('/', { replace: true });
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

        process();
    };
};

const GetUserData = (email) => {
    return (dispatch, getState) => {
        dispatch({ type: 'STATE_INIT' });
        dispatch({ type: 'LOADING' });

        const process = async () => {
            const docRef = doc(userCollectionRef, email);
            const docSnap = await getDoc(docRef);

            const userData = {
                userNumber: docSnap.data().userNumber,
                userType: docSnap.data().userType,
                email: docSnap.data().email,
                password: docSnap.data().password,
                name: docSnap.data().name,
                displayName: docSnap.data().displayName,
                address: docSnap.data().address,
                address2: docSnap.data().address2,
                signupDate: docSnap.data().signupDate.toDate().toLocaleString(),
                point: docSnap.data().point,
            };

            return userData;
        };

        process()
            .then((result) => {
                dispatch({ type: 'COMPLETE' });
                dispatch({ type: 'LOG_IN_SUCCESS', payload: result });
                dispatch({ type: 'STORE_RENDERING_OFF' });

            })
            .catch((error) => {
                dispatch({ type: 'ERROR', payload: createErrorData(error) });
                dispatch({ type: 'STORE_RENDERING_OFF' });
            });

    };
};





export { IsLoginCheck, SignUp, logIn, logOut, UserUpdate, UserDelete, GetUserData };
