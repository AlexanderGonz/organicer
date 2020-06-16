import { CONSTANTS } from "../actions";
import axios from "axios"
import { serverUrl } from "../configs/serverUrl"


export const removeUserFromBoard = (userID) => (dispatch, getState) => {

  axios.put(serverUrl + '/users/removefromboard',{
    userID,
    boardID: getState().activeBoard
  }).then(res => {
    if(res.status === 200){
      dispatch({
        type: CONSTANTS.REMOVE_USER_FROM_BOARD,
        payload: userID
      })
    }
  }).catch(err =>{
    console.log(err);
    
  })
}

