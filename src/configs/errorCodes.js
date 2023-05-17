const createErrorData = (error) => {

    console.log(error);

    const errorData = {
        errorCode: error.code,
        errorMessage: error.message,
    };

    if (error.code === 'auth/user-not-found') {
        errorData.errorCode = errorCode.userLogInError.ThereIsNoUserData.code;
        errorData.errorMessage = errorCode.userLogInError.ThereIsNoUserData.message;
    }

    return errorData;
};

const errorCode = {
    checkProcessError: {
        EmailValidateCheckError: {
            code: 'CPE001-InvalidEmailError',
            message: '이메일 유효성 검사를 통과하지 못함.',
        },
        PasswordValidateCheckError: {
            code: 'CPE002-InvalidPasswordError',
            message: '비밀번호 유효성 검사를 통과하지 못함.',
        },
        EmailDuplicationCheckError: {
            code: 'CPE002-EmailDuplicationCheckError',
            message: '이메일 중복성 검사를 통과하지 못함.',
        },
        PasswordDuplicationCheckError: {
            code: 'CPE002-PasswordDuplicationCheckError',
            message: '비밀번호 중복성 검사를 통과하지 못함.',
        },
    },



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
        ThereIsNoUserData: {
            code: 'ULIE002',
            message: '해당 유저의 정보가 존재하지 않음.',
        },

    },
    userLogOutError: {

    },

    userLoginCheckError: {
        ThereIsNoUserData: {
            code: 'ULCE001',
            message: '사용자 인증 정보가 조회되지 않음.',
        },
    },

};

export { createErrorData, errorCode };