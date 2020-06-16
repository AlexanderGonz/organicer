import { CONSTANTS } from "../actions";

export const setLogin = (user, token) => (dispatch ) => {
  localStorage.clear()
  localStorage.setItem('organicerAuthToken', token)
  localStorage.setItem('organicerUser', JSON.stringify(user))

  dispatch({
    type: CONSTANTS.SET_LOGIN,
    payload: {user, token}
  })
}

export const logOutAction = () => (dispatch) => {
  localStorage.clear()

  dispatch ({
    type: CONSTANTS.LOGOUT,  
  })
}
