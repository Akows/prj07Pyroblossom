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
    },
    errorinfo: {
        errorCode: 'None',
        errorMessage: 'None',
    },
};

const userReducer = (prevState = initialState, action) => {
    return produce(prevState, (draft) => {
        switch (action.type) {
            case 'CLEANSTATE':
                draft.processvalue = {};
                draft.userdata = {};
                draft.errorinfo = {};
                break;

            case 'LOADING':
                draft.processvalue.isLoading = true;
                break;

            case 'ERROR':
                draft.processvalue.isError = action.payload.isError;
                draft.processvalue.isLoading = false;
                draft.errorinfo.errorCode = action.payload.errorCode;
                draft.errorinfo.errorMessage = action.payload.errorMessage;
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
