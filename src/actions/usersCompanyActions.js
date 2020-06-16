import { CONSTANTS } from "../actions";
import axios from "axios"
import { serverUrl } from "../configs/serverUrl"

export const fetchUsersCompany = (userID) => (dispatch, getState) => {
  const boardID = getState().activeBoard

  dispatch({
    type: CONSTANTS.FETCH_USERS_COMPANY_REQUEST
  })
  axios.post(serverUrl + '/users/getUsersCompany', {
    boardID
  }).then (res => {
    if( res.status === 200){
      dispatch({
        type: CONSTANTS.FETCH_USERS_COMPANY_SUCCESS,
        payload: res.data
      })
    }
  }).catch(err => {
    dispatch({
      type: CONSTANTS.FETCH_USERS_COMPANY_ERROR,
      error: err.toString()
    })
  })

}

export const addUserToBoard = (userID) => (dispatch, getState) => {
  const boardID = getState().activeBoard

  axios.post(serverUrl + '/boards/addUser', {
    userID,
    boardID
  }).then(res => {
    if(res.status === 200){
      const user = getState().usersCompany[userID]
      dispatch({
        type: CONSTANTS.ADD_USER_TO_BOARD,
        payload:{
          userID,
          boardID,
          user
        }
      })

    }

  }).catch(err => {
    console.log(err);
  })

}