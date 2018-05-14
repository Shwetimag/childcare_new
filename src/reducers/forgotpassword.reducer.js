import { userConstants } from '../_constants';

export function forgotpassword(state = {}, action) {
  switch (action.type) {
    case userConstants.FORGOT_REQUEST:
      return { registering: true };
    case userConstants.FORGOT_SUCCESS:
      // return {registering: true};
    case userConstants.FORGOT_FAILURE:
      return {};
    default:
      return state
  }
}