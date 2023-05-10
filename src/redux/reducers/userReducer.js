import { produce } from 'immer'

const initialState = {
    userdata: {
        email: '',
        password: '',
        name: '',
        displayName: '',
        address: '',
    },
    processvalue: {
        isLogin: false,
        isError: false,
        isLoading: false,
        isCheck: false,
    },
    errorinfo: {
        errorCode: 'None',
        errorMessage: 'None',
    },
};

const userReducer = (prevState = initialState, action) => {
    return produce(prevState, (draft) => {
        switch (action.type) {
            case 'PROCESSINIT':
                draft = initialState;
                break;

            case 'LOADING':
                draft.processvalue.isError = false;
                draft.processvalue.isLoading = true;
                break;

            case 'ERROR':
                draft.processvalue.isError = true;
                draft.processvalue.isLoading = false;
                draft.processvalue.isCheck = false;
                draft.errorinfo.errorCode = action.payload.errorCode;
                draft.errorinfo.errorMessage = action.payload.errorMessage;
                break;


            case 'CHECK_SUCCESS':
                draft.processvalue.isError = false;
                draft.processvalue.isLoading = false;
                draft.processvalue.isCheck = true;
                draft.errorinfo = {};
                break;




            case 'SIGN_UP_SUCCESS':
                draft.processvalue.isError = false;
                draft.processvalue.isLoading = false;
                draft.errorinfo = {};
                break;

            case 'LOG_IN_SUCCESS':
                draft.processvalue.isLogin = true;
                draft.processvalue.isError = false;
                draft.processvalue.isLoading = false;
                draft.userdata = action.payload;
                draft.errorinfo = {};
                break;

            case 'LOG_OUT':
                draft.processvalue.isLogin = false;
                draft.processvalue.isError = false;
                draft.processvalue.isLoading = false;
                draft.userdata = {};
                draft.errorinfo = {};
                break;

            default:
                break;
        }
    });
};

export { userReducer };
