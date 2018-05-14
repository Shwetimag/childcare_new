import { userConstants } from '../_constants/user.constants';
import { userService } from '../services/user.service';
import { alertActions } from './';
import { history } from '../_healpers/history';

export const userActions = {
    login,
    logout,
    register,
    getAll,
    delete: _delete,
    Forgotpassword
};

function login(Username, Password) {
    debugger;
    return dispatch => {
        dispatch(request({ Username }));

        userService.login(Username, Password)
            .then(
            user => {
                dispatch(success(user));
                history.push('/');
            },
            error => {
                dispatch(failure(error));
                dispatch(alertActions.error("Email or password is incorrect"));
            }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}

function register(Name, Email, Password, ConfirmPassword) {

    return dispatch => {
        dispatch(request(Email));
        userService.register(Name, Email, Password, ConfirmPassword)
            .then(
            Email => {
                dispatch(success(Email));
                dispatch(alertActions.success('Registration successful ! Verification Email successfully sent'));
                //      history.push('/login');
            },
            error => {
                dispatch(failure(error));
                dispatch(alertActions.error("Passwords does not match , Registration unsuccessful"));

            }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(Email) { return { type: userConstants.REGISTER_SUCCESS, Email } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function Forgotpassword(Email) {
    debugger;
    return dispatch => {
        dispatch(request(Email));
        userService.Forgotpassword({ Email })
            .then(
            user => {
                dispatch(success(user));
                dispatch(alertActions.success('Registration successful'));
                history.push('/login');
            },
            error => {
                dispatch(failure(error));
                dispatch(alertActions.error(error));
            }
            );
    };

    function request(user) { return { type: userConstants.FORGOT_REQUEST, user } }
    function success(user) { return { type: userConstants.FORGOT_SUCCESS, user } }
    function failure(error) { return { type: userConstants.FORGOT_FAILURE, error } }
}


function getAll() {
    return dispatch => {
        dispatch(request());
        userService.getAll()
            .then(
            users => dispatch(success(users)),
            error => dispatch(failure(error))
            );
    };

    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));
        userService.delete(id)
            .then(
            user => {
                dispatch(success(id));
            },
            error => {
                dispatch(failure(id, error));
            }
            );
    };

    function request(id) { return { type: userConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: userConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: userConstants.DELETE_FAILURE, id, error } }
}