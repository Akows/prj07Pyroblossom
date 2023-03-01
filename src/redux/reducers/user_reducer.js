const initialUserState = {
    currentUser: null,
    isLoading: true
};

const userReducer = (state = initialUserState, action) => {
    switch (action.type) {
        case 'set_user':
            return {
                ...state,
                currentUser: action.payload,
                isLoading: false
            }
        case 'clear_user':
            return {
                ...state,
                currentUser: null,
                isLoading: false
            }
        default:
            return state;
    };
};

export default userReducer;