import { authHeader } from '../_healpers/auth-header';
import axios from 'axios';
export const userService = {
    login,
    logout,
    register,
    getAll,
    getById,
    update,
    Forgotpassword,
    delete: _delete
};

const API_URL = "http://localhost:57840/api"

function login(Username, Password) {
    return axios.post('http://localhost:57840/api/Account/login', { Username, Password })
        .then(response => {
            console.log("response", response.data);
            localStorage.setItem('userName', JSON.stringify(response.data.userName));
            localStorage.setItem('user', JSON.stringify(response.data));
        })
        .then(user => {
            if (user && user.token) {
            }
            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch('localhost:57840/users', requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch('/users/', requestOptions).then(handleResponse);
}

function register(Name, Email, Password, ConfirmPassword) {

    return axios.post(`${API_URL}/Account/Register`, { Name, Email, Password, ConfirmPassword }).then(handleResponse);
}

function Forgotpassword(Email) {

    return axios.post(`${API_URL}/Account/ForgotPassword`, Email).then(handleResponse);
}


function update(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };
    return fetch('/users/' + user.id, requestOptions).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };
    return fetch('/users/' + id, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    response.data;
}