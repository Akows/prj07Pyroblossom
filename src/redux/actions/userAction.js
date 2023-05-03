import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth'
import { appAuth } from '../../firebase/config'

const SignUp = (userData) => {
    return (dispatch, getState) => {
        createUserWithEmailAndPassword(appAuth, userData.email, userData.password)
            .then((userCredential) => {
                if (!userCredential.user) {
                    throw new Error('오류가 발생하였습니다.');
                }
                updateProfile(appAuth.currentUser, userData.displayName)
                    .then(() => {
                        dispatch({ type: 'SIGN_UP', payload: userCredential.user });
                    })
                    .catch((error) => {
                        dispatch({ type: 'ERROR', payload: error });

                    });
            })
            .catch((error) => {
                dispatch({ type: 'ERROR', payload: error });
            });
    };
};

const logIn = (inputData) => {

    return (dispatch, getState) => {
        signInWithEmailAndPassword(appAuth, inputData.id, inputData.password)
            .then((userCredential) => {

                if (!userCredential.user) {
                    throw new Error('로그인에 실패했습니다.');
                }

                dispatch({ type: 'LOG_IN', payload: userCredential.user });

            })
            .catch((error) => {
                dispatch({ type: 'ERROR', payload: error.massage });
            });
    }


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

export { SignUp, logIn, logOut };
