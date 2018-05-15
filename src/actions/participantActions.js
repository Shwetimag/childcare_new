import * as types from './actionTypes';
import axios from 'axios';
import { history } from '../_healpers/history';

const apiUrl = `http://localhost:57840/api`;

export function listAllParticipantSuccess(participants){
    return {
        type: types.LIST_ALL_PARTICIPANT_SUCCESS,
        payload: participants  
      };
}

export function deleteParticipantSuccess(msg) {
  return {
    type: types.DELETE_PARTICIPANT_SUCCESS,
    payload: msg
  }
}

export function deleteOneParticipant(classId) {
return function(dispatch, getState) {
    return axios.delete(`${apiUrl}/participant/${classId}`).then(response => {
      dispatch(deleteParticipantSuccess(response));
    })
}
}

export function fetchAllParticipant(num) {
  return function (dispatch) {
    return axios
      .get('http://localhost:57840/api/participant?&pageNumber=' + num + '&pageSize=5')
      .then(res => {
        dispatch(listAllParticipantSuccess(res.data))
      })
      .catch(error => {
        throw error;
      });
  };
}
export  function addParticipant(participants) {
  console.log(participants)
  return function(dispatch) {
    return axios
      .post('http://localhost:57840/api/participant',participants)
      .then(response => {
        // dispatch(deleteParticipantSuccess(response.data));
        dispatch(listAllParticipantSuccess(response.data))
        history.push('/participantlist');
      })
      .catch(error => {
        throw error;
      });     
  };
}


export function search(data) {
  return function (dispatch) {
    return axios
      .get('http://localhost:57840/api/participant?QuerySearch=' + data)
      .then(response => {
        dispatch(listAllParticipantSuccess(response.data));
      })
      .catch(error => {
        throw error;
      });
  };
}