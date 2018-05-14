import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';


import classReducer from "./classReducer";
import participantReducer from "./participantReducer";
import attendenceReducer from "./attendenceReducer";


const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  alert,
  classReducer,
  participantReducer,
  attendenceReducer
});

export default rootReducer;