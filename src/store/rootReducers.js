import { combineReducers } from 'redux';
import schedules from './schedules/reducer';

const rootReducers = combineReducers({
  schedules,
});

export default rootReducers;
