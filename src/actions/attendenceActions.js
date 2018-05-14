import * as types from './actionTypes';
import axios from 'axios';
import { history } from '../_healpers/history';

const apiUrl = `http://localhost:57840/api`;

export function listAllAttendenceSuccess(attendences) {
  return {
    type: types.LIST_ALLATTENDENCE_SUCCESS,
    payload: attendences
  };
}


export function fetchAllAttendence(num) {
  return function (dispatch) {
    return axios
      .get('http://localhost:57840/api/attendence')
      .then(res => {
        dispatch(listAllAttendenceSuccess(res.data))
      })
      .catch(error => {
        throw error;
      });
  };
}

export function addattendence(attendences) {
  return function (dispatch) {
    return axios
      .post('http://localhost:57840/api/attendence', attendences)
      .then(response => {
        dispatch(listAllAttendenceSuccess(response.data));
        history.push('/showattendence');
      })
      .catch(error => {
        throw error;
      });
  };
}

export function search(data) {
  return function (dispatch) {
    return axios
      .get('http://localhost:57840/api/attendence?QuerySearch=' + data)
      .then(response => {
        dispatch(listAllAttendenceSuccess(response.data));
      })
      .catch(error => {
        throw error;
      });
  };
}

export function deleteOneAttendence(attendenceId) {
  return function (dispatch, getState) {
    return axios.delete(`${apiUrl}/attendence/${attendenceId}`).then(response => {
      dispatch(deleteClassSuccess(response));
    })
  }
}
export function deleteClassSuccess(msg) {
  return {
    type: types.DELETE_CLASS_SUCCESS,
    payload: msg
  }
}
