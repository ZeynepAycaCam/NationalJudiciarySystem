export function authUser(user, userType) {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("userType", userType);    
    return { type: "ACTION_AUTH", user, userType };
}

export function removeUser() {
    localStorage.removeItem("user");
    localStorage.removeItem("userType");
    return { type: "ACTION_AUTH", user: null, userType: null};
}