import { produce } from 'immer'

const initialState = {
    user: {
        data: null,
        isLogin: false,
    },
};

const userReducer = (prevState = initialState, action) => {

    return produce(prevState, (draft) => {
        switch (action.type) {
            case 'LOG_IN':
                draft.data = action.data;
                draft.isLogin = true;
                break;
            case 'LOG_OUT':
                draft.data = null;
                draft.isLogin = false;
                break;
            case 'ERROR':
                draft.data = action.data;
                draft.isLogin = false;
                break;
            default:
                break;
        }
    });



};

export { userReducer };
