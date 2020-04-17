import { combineReducers } from 'redux';
import testReducer from './testReducer';

const allReducers = combineReducers({
	test: testReducer
});

export default allReducers;
