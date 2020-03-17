const initialState = {
    user: null,
    userType: null
}

function authReducer(state = initialState, action) {
    if (action.type === "ACTION_AUTH") {
        return Object.assign({}, state, {
            user: action.user,
            userType: action.userType
        });
    }

    return state;
}

export default authReducer;