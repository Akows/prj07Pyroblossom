import { combineReducers } from 'redux';
import userReducer from './user_reducer';

const rootReducer = combineReducers({
    userReducer: userReducer,
});

export default rootReducer;