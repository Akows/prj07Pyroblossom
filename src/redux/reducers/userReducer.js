import { produce } from 'immer'

const initialState = {
    flagvalue: {
        isLogin: false,
        isError: false,
        isLoading: false,
    },
    userdata: {
        userNumber: '',
        userType: '',
        email: '',
        password: '',
        name: '',
        displayName: '',
        address: '',
        address2: '',
        signupDate: '',
    },
    errorinfo: {
        errorCode: '',
        errorMessage: '',
    },
    processinfo: {
        processMessage: '',
    },
};

const userReducer = (prevState = initialState, action) => {
    return produce(prevState, (draft) => {
        switch (action.type) {

            // State 초기화.
            case 'STATE_INIT':
                draft.flagvalue = {
                    isLogin: false,
                    isError: false,
                    isLoading: false,
                };
                draft.userdata = {
                    email: '',
                    password: '',
                    name: '',
                    displayName: '',
                    address: '',
                };
                draft.errorinfo = {
                    errorCode: '',
                    errorMessage: '',
                };
                draft.processinfo = {
                    processMessage: '',
                };
                break;



            // 작업 시작.
            case 'LOADING':
                draft.flagvalue.isLoading = true;
                break;

            // 작업 완료.
            case 'COMPLETE':
                draft.flagvalue.isLoading = false;
                break;

            // 에러 발생.
            case 'ERROR':
                draft.flagvalue.isError = true;
                draft.flagvalue.isLoading = false;
                draft.errorinfo.errorCode = action.payload.errorCode;
                draft.errorinfo.errorMessage = action.payload.errorMessage;
                break;



            // 유효성, 중복성 검사 및 이메일 인증 완료.
            case 'CHECK_SUCCESS':
                draft.flagvalue.isError = false;
                draft.flagvalue.isLoading = false;
                draft.processinfo.processMessage = action.payload;
                break;

            // 회원가입 완료.
            case 'SIGN_UP_SUCCESS':
                draft.processvalue.isError = false;
                draft.processvalue.isLoading = false;
                draft.errorinfo = {};
                break;

            // 로그인 완료.
            case 'LOG_IN_SUCCESS':
                draft.flagvalue.isLogin = true;
                draft.flagvalue.isError = false;
                draft.flagvalue.isLoading = false;
                draft.userdata = action.payload;
                break;

            // 로그아웃 완료.
            case 'LOG_OUT':
                draft.flagvalue.isLogin = false;
                draft.flagvalue.isError = false;
                draft.flagvalue.isLoading = false;
                draft.userdata = {};
                draft.errorinfo = {};
                break;










            default:
                break;
        }
    });
};

export { userReducer };
