import { produce } from 'immer'

const initialState = {
    // user: {
    //     isLogin: false,
    //     isError: false,
    //     isLoading: false,
    //     data: {
    //         email: '',
    //         password: '',
    //         name: '',
    //         displayName: '',
    //         address: '',
    //     },
    //     errorMassage: '',
    // },

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
    errorInfo: {
        errorCode: 'None',
        errorMassage: 'None',
    },
};

const userReducer = (prevState = initialState, action) => {
    return produce(prevState, (draft) => {
        switch (action.type) {
            case 'LOADING':
                draft.processvalue.isLogin = false;
                draft.processvalue.isError = false;
                draft.processvalue.isLoading = true;
                draft.userdata = null;
                draft.errorInfo = null;
                break;

            case 'ERROR':
                draft.processvalue.isLogin = false;
                draft.processvalue.isError = action.payload.isError;
                draft.processvalue.isLoading = false;
                draft.userdata = null;
                draft.errorInfo.errorCode = action.payload.errorCode;
                draft.errorInfo.errorMassage = action.payload.errorMassage;
                break;

            case 'SIGN_UP_SUCCESS':
                draft.processvalue.isLogin = false;
                draft.processvalue.isError = false;
                draft.processvalue.isLoading = false;
                draft.userdata = null;
                draft.errorInfo = null;
                break;

            case 'LOG_IN_SUCCESS':
                draft.processvalue.isLogin = true;
                draft.processvalue.isError = false;
                draft.processvalue.isLoading = false;
                draft.userdata = action.payload;
                draft.errorInfo = null;
                break;

            case 'LOG_OUT':
                draft.processvalue.isLogin = false;
                draft.processvalue.isError = false;
                draft.processvalue.isLoading = false;
                draft.userdata = null;
                draft.errorInfo = null;
                break;

            default:
                break;
        }
    });
};

export { userReducer };
