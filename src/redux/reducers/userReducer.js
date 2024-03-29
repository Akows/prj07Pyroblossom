import { produce } from 'immer'

const initialState = {
    flagvalue: {
        isLogin: false,
        isError: false,
        isLoading: false,
    },
    errorinfo: {
        errorCode: '',
        errorMessage: '',
    },
    userdata: {},
};

const userReducer = (prevState = initialState, action) => {
    return produce(prevState, (draft) => {

        switch (action.type) {

            // 새로운 작업이 시작될 때 State 초기화.
            case 'STATE_INIT':
                draft.flagvalue.isLoading = false;
                draft.flagvalue.isError = false;
                draft.errorinfo = {
                    errorCode: '',
                    errorMessage: '',
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

            // 회원가입 완료.
            case 'SIGN_UP_SUCCESS':
                draft.flagvalue.isError = false;
                draft.flagvalue.isLoading = false;
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
        };
    });
};

export { userReducer };
