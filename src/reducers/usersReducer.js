import { CONSTANTS } from "../actions"

const initialState = {
  // "user-0":{
  //   _id: "user-0",
  //   rol: "admin",
  //   name: "user",
  //   lastname: "lastname",
  //   email: "x@x.com",
  //   phone: 612345678,
  //   company: "empresa-0",
  //   boards:['board-0']
  // }
}

const usersReducer = (state=initialState, action) => {
  switch(action.type) {

    case CONSTANTS.FETCH_USERS_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: null
      }
    
    case CONSTANTS.FETCH_USERS_SUCCESS:
      return {
        isFetching: false,
        ...action.payload
      }
      
    case CONSTANTS.FETCH_USERS_ERROR:
      return  {
        ...state,
        isFetching: false,
        error: action.payload
      }
    
    case CONSTANTS.ADD_USER_TO_BOARD: {  
      const{ user } = action.payload
      const newState = {...state, [user._id]: user}
      
      return newState
    }

    case CONSTANTS.REMOVE_USER_FROM_BOARD: {
      const userID = action.payload
      const newState = {...state}
      delete newState[userID]
      return newState
    }

    default:
      return state
  }
}

export default usersReducer