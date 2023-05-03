import { produce } from 'immer'

const userReducer = (prevState = {}, action) => {
    return produce(prevState, (draft) => {
        switch (action.type) {
            case 'SIGN_UP':
                draft.isLogin = false;
                draft.isError = false;
                draft.data = null;
                break;
            case 'LOG_IN':
                draft.isLogin = true;
                draft.isError = false;
                draft.data = action.data;
                break;
            case 'LOG_OUT':
                draft.isLogin = false;
                draft.isError = false;
                draft.data = null;
                break;
            case 'ERROR':
                draft.isLogin = false;
                draft.isError = true;
                draft.data = action.data;
                break;
            default:
                break;
        }
    });
};

export { userReducer };
