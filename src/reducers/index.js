import { combineReducers } from "redux";
import listsReducer from "./listsReducer";
import cardsReducer from "./cardsReducer";
import boardsReducer from "./boardsReducer";
import boardOrderReducer from "./boardOrderReducer";
import activeBoardReducer from "./activeBoardReducer";
import loginReducer from "./loginReducer"
import usersReducer from "./usersReducer"
import usersCompanyReducer from "./usersCompanyReducer"

export default combineReducers({
  lists: listsReducer,
  cards: cardsReducer,
  boards: boardsReducer,
  boardOrder: boardOrderReducer,
  activeBoard: activeBoardReducer,
  login: loginReducer,
  users: usersReducer,
  usersCompany: usersCompanyReducer
});
