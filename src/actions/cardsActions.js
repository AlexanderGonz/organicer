import { CONSTANTS } from "../actions";
import axios from "axios"
import { serverUrl } from "../configs/serverUrl"

export const addCard = (listID, text) => (dispatch) => {

  axios.post(serverUrl + '/lists/addcard', 
  {
    card:{
      text
    },
    listID
  }).then(res => {
    const { _id } = res.data

    dispatch({
      type: CONSTANTS.ADD_CARD,
      payload: { text, listID, _id }
    })

  }).catch(err => {
    console.log(err);
    
  })
  

};

export const editCard = (_id, newText) => (dispatch) => {
  
  axios.put(serverUrl + '/cards/edittext',
  {
    card: {
      _id,
      text: newText
    }
  }).then(res => {
    if(res.status === 200){
      dispatch({
        type: CONSTANTS.EDIT_CARD,
        payload: { _id, newText }
      })
    }
     
  }).catch (err => {
    console.log(err);
    
  })
};

export const deleteCard = (_id, listID) => (dispatch) =>{
  
  axios.delete(serverUrl + '/lists/deletecard', 
  {
    data: {
      cardID: _id,
      listID
    }
  }).then(res => {
    if(res.status === 200){
      dispatch( {
        type: CONSTANTS.DELETE_CARD,
        payload: { _id, listID }
      })
    }
  }).catch(err => {
    console.log(err);
    
  })


};


