import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function attendenceReducer(state = initialState.attendences, action) {

  switch (action.type) {
    case types.LIST_ALLATTENDENCE_SUCCESS:
      return action.payload;
    default:
      return state;
  }
}
