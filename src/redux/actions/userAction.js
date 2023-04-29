import { signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { appAuth } from '../../firebase/config'

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

export { logIn, logOut };