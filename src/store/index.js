import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducers";
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension'
import { CONSTANTS } from "../actions";

const confirmDeleteTodo = (store) => (next) => (action) => {
  
  if (action.type === CONSTANTS.DELETE_BOARD || action.type === CONSTANTS.DELETE_LIST) {
    let conf = window.confirm('Seguro que quieres elimiar el elemento?')

    conf && next(action)

  }else{
    next(action)
  }
}

const composeEnhancers = composeWithDevTools({
  name: 'Redux',
  realtime: true,
  trace: true,
  tracelimit: 20
})

export default () => {
  let store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
  )
  return { store }
};
