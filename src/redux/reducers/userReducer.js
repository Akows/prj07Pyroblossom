const initialState = {
    user: {
        data: null,
        isLogin: false,
    },
};

const userReducer = (prevState = initialState, action) => {
    switch (action.type) {
        case 'LOG_IN':
            return {
                ...prevState,
                data: action.data,
                isLogin: true,
            };
        case 'LOG_OUT':
            return {
                ...prevState,
                data: null,
                isLogin: false,
            };

        case 'ERROR':
            return {
                ...prevState,
                data: action.data,
                isLogin: false,
            };

        default:
            return prevState;
    }
};

module.exports = userReducer;
