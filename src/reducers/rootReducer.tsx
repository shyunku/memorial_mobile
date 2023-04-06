import {combineReducers} from 'redux';
import accountSlice from '@/store/accountSlice';

const rootReducer = combineReducers({
  account: accountSlice,
});

export default rootReducer;
