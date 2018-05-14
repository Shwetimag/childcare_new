import * as types from './actionTypes';
import axios from 'axios';
import { history } from '../_healpers/history';

const apiUrl = `http://localhost:57840/api`;

export function listAllClassSuccess(classes) {
  return {
    type: types.LIST_ALLCLASS_SUCCESS,
    payload: classes
  };
}


export function deleteClassSuccess(msg) {
  return {
    type: types.DELETE_CLASS_SUCCESS,
    payload: msg
  }
}

export function deleteOneClass(classId) {
  return function (dispatch, getState) {
    return axios.delete(`${apiUrl}/class/${classId}`).then(response => {
      dispatch(deleteClassSuccess(response));
    })
  }
}

export function fetchAllClasses(num) {
  return function (dispatch) {
    return axios
      .get('http://localhost:57840/api/class')
      .then(res => {
        dispatch(listAllClassSuccess(res.data))
      })
      .catch(error => {
        throw error;
      });
  };
}

export function addclass(classes) {
  return function (dispatch) {
    return axios
      .post('http://localhost:57840/api/class', classes)
      .then(response => {
        // dispatch(deleteClassSuccess(response.data));
        dispatch(listAllClassSuccess(response.data))
        history.push('/classlist');
      })
      .catch(error => {
        throw error;
      });
  };
}

// export function editclass(classes)
// {
//   return function(dispatch){
//     return axios
//     .put('http://localhost:57840/api/class',classes)
//     .then(response=>{
//       dispatch(listAllClassSuccess(response.data))
//       history.push('/classlist');
//     })
//     .catch(error=>{
//       throw error;
//     });
//   };
// }

export function search(data) {
  return function (dispatch) {
    return axios
      .get('http://localhost:57840/api/class?QuerySearch=' + data)
      .then(response => {
        dispatch(listAllClassSuccess(response.data));
      })
      .catch(error => {
        throw error;
      });
  };
}

