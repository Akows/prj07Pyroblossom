
import { getDocs, query, where } from "firebase/firestore";
// import { createErrorData, errorCode } from "../../configs/errorCodes";
import { userCollectionRef } from "../configs/firebase/config";

// 유효성 검사.
const checkValidate = (inputdata, checktype) => {

    // 이메일, 비밀번호 정규 표현식.
    // 이메일은 이메일 형식 기준.
    // 비밀번호는 8에서 25자리, 영문소대문자와 숫자 그리고 특수문자가 모두 혼합되어야함.
    // eslint-disable-next-line
    const emailValidatePattern = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    const passwordValidatePattern = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;

    // 검사 타입에 따라서 적절한 검사를 실행.
    if (checktype === 'email') {

        // 검사를 통과하면 true 반환, 그렇지 않으면 false를 반환.
        if (emailValidatePattern.test(inputdata)) {
            return true;
        }
        else {
            return false;
        }
    }
    else if (checktype === 'password') {
        if (passwordValidatePattern.test(inputdata)) {
            return true;
        }
        else {
            return false;
        }
    };
};

// 중복 검사.
const checkDuplication = async (inputdata, checktype, dispatch) => {
    dispatch({ type: 'STATE_INIT' });
    dispatch({ type: 'LOADING' });

    // 반환되는 결과값을 미리 선언.
    let result = false;

    // 관리자 이메일과, 닉네임을 밴 리스트로 작성하여 우선 판별.
    const prohibitionList = ['admin@admin.com', 'admin', 'Admin', 'administrator', 'Administrator', 'manager', 'Manager', '관리자'];

    // 관리자와 중복될 경우 false를 반환하고 함수 종료.
    if (prohibitionList.includes(inputdata)) {
        result = true;
        return result;
    }

    // 그렇지 않을 경우, 파이어스토어 유저 DB에서 중복 검사 실행.
    // 검사종류와 해당값을 인자로 검색 실행.
    const querys = query(userCollectionRef, where(checktype, '==', inputdata));
    const querySnap = await getDocs(querys);

    // querySnap은 data()를 사용할 수 없다. 반환되는 결과값은 forEach 함수로 풀어서 받아야한다.
    querySnap.forEach((doc) => {

        if (doc.data().email === inputdata) {
            result = true
        };

        if (doc.data().displayName === inputdata) {
            result = true
        };

        console.log(doc.id, " => ", doc.data());
    });

    // 작업을 마치고 결과값을 반환.
    dispatch({ type: 'COMPLETE' });
    return result;
};

export { checkValidate, checkDuplication };