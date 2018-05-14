import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function participantReducer(state = initialState.participants, action) {
  switch (action.type) {
    case types.LIST_ALL_PARTICIPANT_SUCCESS:
      return action.payload;
    case types.DELETE_PARTICIPANT_SUCCESS:
      return [...state];
    default:
      return state;
  }
}
