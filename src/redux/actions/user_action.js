const setUser = (user) => {
    return {
        type: 'set_user',
        payload: user
    }
};

const clearUser = () => {
    return {
        type: 'clear_user'
    }
};

export { setUser, clearUser };