import { getDocs, query, where } from "firebase/firestore";
import { createErrorData, errorCode } from "../../configs/errorCodes";
import { userCollectionRef } from "../../configs/firebase/config";

// 유효성 검사.
const checkValidate = async (inputdata, checktype) => {

    const emailValidatePattern = new RegExp('[0-9]');
    const passwordValidatePattern = new RegExp('[0-9]');

    if (checktype === 'email') {
        const result = emailValidatePattern.test(inputdata);

        if (!result) {
            throw errorCode.checkProcessError.EmailValidateCheckError;
        }
    }
    else if (checktype === 'password') {
        const result = passwordValidatePattern.test(inputdata);

        if (!result) {
            throw errorCode.checkProcessError.PasswordValidateCheckError;
        }
    };
};

// 중복 검사.
const checkDuplication = (dispatch, inputdata, checktype) => {
    const checkProcess = async () => {
        const prohibitionList = ['admin@admin.com', 'admin', 'Admin', 'administrator', 'Administrator', 'manager', 'Manager', '관리자'];
        const prohibitionCheck = !prohibitionList.includes(inputdata);

        if (!prohibitionCheck) {
            throw errorCode.userSignInError.DuplicationAdminAccount;
        }

        const querys = query(userCollectionRef, where(checktype, '==', inputdata));
        const querySnap = await getDocs(querys);

        querySnap.forEach((doc) => {

            if (doc.data().email === inputdata) {
                throw errorCode.userSignInError.DuplicationEmail;
            }

            if (doc.data().displayName === inputdata) {
                throw errorCode.userSignInError.DuplicationNickname;
            }

            // console.log(doc.id, " => ", doc.data());
        });
    };

    checkProcess()
        .then(() => {
            dispatch({ type: 'CHECK_SUCCESS' });
        })
        .catch((error) => {
            dispatch({ type: 'ERROR', payload: createErrorData(error) });
        });

};

export { checkValidate, checkDuplication };