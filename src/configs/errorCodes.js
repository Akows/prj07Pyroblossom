// error dispatch을 위해서 필요한 형태로 데이터를 가공하는 함수.
const createErrorData = (error) => {
    const errorData = {
        errorCode: error.code,
        errorMessage: error.message,
    };
    return errorData;
};

const errorCode = {

    userSignInError: {
        DuplicationAdminAccount: {
            code: 'USIE001',
            message: '입력한 가입자 정보가 관리자 계정과 중복됨.',
        },
        DuplicationEmail: {
            code: 'USIE002',
            message: '입력한 가입자 이메일이 기존 이메일과 중복됨.',
        },
        DuplicationNickname: {
            code: 'USIE003',
            message: '입력한 가입자 닉메임이 기존 닉네임과 중복됨.',
        },
        ThereIsNoUserCredential: {
            code: 'USIE004',
            message: '파이어베이스 계정 생성이 정상적으로 완료되지 않음.',
        },


        error: {
            code: '',
            message: '',
        },
    },


    userLogInError: {
        LoginFailure: {
            code: 'ULIE001',
            message: '로그인 유저의 인증 정보 생성에 에러가 발생.',
        },
    },
    userLogOutError: {

    },

    userLoginCheckError: {

        // ThereIsNoUserData: {
        //     code: 'ULCE001',
        //     message: '사용자 인증 정보가 조회되지 않음.',
        // },

    },

};

export { createErrorData, errorCode };