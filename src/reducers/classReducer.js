import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function classReducer(state = initialState.classes, action) {
  switch (action.type) {
    case types.LIST_ALLCLASS_SUCCESS:
      return action.payload;
    case types.DELETE_CLASS_SUCCESS:
      return [...state];
    default:
      return state;
  }
}
