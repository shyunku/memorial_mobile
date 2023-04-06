import {combineReducers} from 'redux';
import accountSlice from '@/store/accountSlice';
import stateSlice from '@/store/stateSlice';

const rootReducer = combineReducers({
  account: accountSlice,
  txState: stateSlice,
});

export default rootReducer;
