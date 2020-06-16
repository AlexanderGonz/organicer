import { CONSTANTS } from "../actions";
import { serverUrl } from "../configs/serverUrl"
import axios from "axios"

export const setActiveBoard = id => {
  return {
    type: CONSTANTS.SET_ACTIVE_BOARD,
    payload: id
  };
};

export const addBoard = (title) => (dispatch) => {

  // dispatch({
  //   type: CONSTANTS.ADD_BOARD,
  //   payload: { title, id }
  // })

  axios.post(serverUrl + '/users/addboard', 
  {
    board:{
      title
    }
  }).then(res => {
    if(res.status === 200){
      dispatch({
        type: CONSTANTS.ADD_BOARD,
        payload: res.data
      })
    }

  }).catch(err => {
    console.log(err);
    
  })

};

export const editBoard = (boardID, newTitle) => (dispatch) => {
  
  axios.put(serverUrl + '/boards/editTitle',
    {
      board: {
        _id:boardID,
        title: newTitle
      }
    }).then(res => {
    if(res.status === 200){
      dispatch({
        type: CONSTANTS.EDIT_BOARD_TITLE,
        payload: {
          boardID,
          newTitle
        }
      })
    }
     
  }).catch (err => {
    console.log(err);
    
  })

}

export const deleteBoard = boardID => (dispatch) =>{

  
  
  
  axios.delete(serverUrl + '/boards/', 
  {
    data: {
      boardID
    }
  }).then(res => {
    if(res.status === 200){
      dispatch({
        type: CONSTANTS.DELETE_BOARD,
        payload: boardID
      })
    }
  }).catch(err => {
    console.log(err);
    
  })
}

export const fetchBoards = () => (dispatch) => {

  dispatch({type: CONSTANTS.FETCH_BOARDS_REQUEST})

  axios.get(serverUrl + '/boards/getuserboards').then(res => {

      dispatch({
        type: CONSTANTS.FETCH_BOARDS_SUCCESS,
        payload: res.data.userBoards
      })
       
    }).catch (err => {
      console.log(err);
      dispatch({
        type: CONSTANTS.FETCH_BOARDS_ERROR,
        error: err.toString()
      })
      
    })
}


export const fetchBoardData = () => (dispatch, getState) => {
  const boardID = getState().activeBoard;

  dispatch({type: CONSTANTS.FETCH_CARDS_REQUEST})
  dispatch({type: CONSTANTS.FETCH_LISTS_REQUEST})
  dispatch({type: CONSTANTS.FETCH_USERS_REQUEST})

  axios.post(serverUrl + '/boards/getboarddata',{
      boardID
    }
    ).then(res => {

      dispatch({
        type: CONSTANTS.FETCH_CARDS_SUCCESS,
        payload: res.data.cards
      })
      dispatch({
        type: CONSTANTS.FETCH_LISTS_SUCCESS,
        payload: res.data.lists
      })
      dispatch({
        type: CONSTANTS.FETCH_USERS_SUCCESS,
        payload: res.data.users
      })

       
    }).catch (err => {
      console.log(err);
      dispatch({
        type: CONSTANTS.FETCH_CARDS_ERROR,
        error: err.toString()
      })
      dispatch({
        type: CONSTANTS.FETCH_LISTS_ERROR,
        error: err.toString()
      })
      dispatch({
        type: CONSTANTS.FETCH_USERS_ERROR,
        error: err.toString()
      })
      
    })
}
