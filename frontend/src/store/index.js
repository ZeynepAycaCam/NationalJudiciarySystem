import { createStore } from 'redux';
import authReducer from '@/containers/auth';
import { authUser } from '../actions';

const store = createStore(authReducer);

if (typeof window !== 'undefined') {    
    if (localStorage.user) {
        const user = JSON.parse(localStorage.user);
        const userType = localStorage.userType;
        store.dispatch(authUser(user, userType));
    }
    
}

export default store;