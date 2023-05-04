import { produce } from 'immer'

const userReducer = (prevState = {}, action) => {
    return produce(prevState, (draft) => {
        switch (action.type) {
            case 'LOADING':
                draft.isLogin = false;
                draft.isError = false;
                draft.isLoading = true;
                draft.data = null;
                break;
            case 'ERROR':
                draft.isLogin = false;
                draft.isError = true;
                draft.isLoading = false;
                draft.data = null;
                draft.errorMassage = action.payload;
                break;

            case 'SIGN_UP_SUCCESS':
                draft.isLogin = false;
                draft.isError = false;
                draft.isLoading = false;
                break;
            case 'LOG_IN_SUCCESS':
                draft.isLogin = true;
                draft.isError = false;
                draft.isLoading = false;
                draft.data = action.payload;
                break;
            case 'LOG_OUT':
                draft.isLogin = false;
                draft.isError = false;
                draft.isLoading = false;
                draft.data = null;
                break;

            default:
                break;
        }
    });
};

export { userReducer };
