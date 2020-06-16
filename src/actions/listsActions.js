import { CONSTANTS } from "../actions";
import axios from "axios"
import { serverUrl } from "../configs/serverUrl"

export const addList = (title) => (dispatch, getState) => {
    const boardID = getState().activeBoard;

    axios.post(serverUrl + '/boards/addlist', 
  {
    list:{
      title,
      cards:[]
    },
    boardID
  }).then(res => {
    if(res.status === 200){
      const { _id } = res.data
      dispatch({
        type: CONSTANTS.ADD_LIST,
        payload: { title, boardID, _id}
      })
    }
  }).catch(err => {
    console.log(err);
    
  })

  
}

export const sort = (
  droppableIdStart,
  droppableIdEnd,
  droppableIndexStart,
  droppableIndexEnd,
  draggableId,
  type
) => (dispatch, getState) => {
  //  debugger
    const boardID = getState().activeBoard;
    dispatch({
      type: CONSTANTS.DRAG_HAPPENED,
      payload: {
        droppableIdStart,
        droppableIdEnd,
        droppableIndexEnd,
        droppableIndexStart,
        draggableId,
        type,
        boardID
      }
    })

    const dragUrl = type === 'list' ? '/boards/dragList' : '/lists/dragCard'


    axios.post(serverUrl + dragUrl,
      {
        droppableIdStart,
        droppableIdEnd,
        droppableIndexEnd,
        droppableIndexStart,
        draggableId,
        boardID
      }
    ).then(res => {
      if(res.status === 200){
        console.log(`${type} moved`);
      }

    }).catch(err => {

    })
  
};

export const editTitle = (listID, newTitle) => (dispatch) => {
  axios.put(serverUrl + '/lists/editTitle',
    {
      list: {
        _id:listID,
        title: newTitle
      }
    }).then(res => {
    if(res.status === 200){
      dispatch({
        type: CONSTANTS.EDIT_LIST_TITLE,
        payload: {
          listID,
          newTitle
        }
      })
    }
     
  }).catch (err => {
    console.log(err);
    
  })
};

export const deleteList = listID => (dispatch, getState) => {
    const boardID = getState().activeBoard;

    

    axios.delete(serverUrl + '/boards/deleteList', 
    {
      data: {
        listID,
        boardID
      }
    }).then(res => {
      if(res.status === 200){
        dispatch({
          type: CONSTANTS.DELETE_LIST,
          payload: {
            listID,
            boardID
          }
        });
      }
    }).catch(err => {
      console.log(err);
      
    })

};

