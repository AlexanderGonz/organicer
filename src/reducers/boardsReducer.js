import { CONSTANTS } from "../actions";

const initialState = {
  // "board-0": {
  //   _id: "board-0",
  //   lists: ["list-0"],
  //   title: "myboard",
  //   initDate: new Date()
  // }
};

const boardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.ADD_LIST: {
      const { boardID, _id } = action.payload;
      const board = state[boardID];
      const newListID = _id;
      const newLists = [...board.lists, newListID];
      board.lists = newLists;
      return { ...state, [boardID]: board };
    }

    case CONSTANTS.EDIT_BOARD_TITLE: {
      const { boardID, newTitle } = action.payload;

      const board = state[boardID];
      board.title = newTitle;
      return { ...state, [boardID]: board };
    }

    case CONSTANTS.DRAG_HAPPENED: {
      const { boardID } = action.payload;
      const board = state[boardID];
      const lists = board.lists;
      const {
        droppableIndexEnd,
        droppableIndexStart,

        type
      } = action.payload;

      // draggin lists around
      if (type === "list") {
        const pulledOutList = lists.splice(droppableIndexStart, 1);
        lists.splice(droppableIndexEnd, 0, ...pulledOutList);
        board.lists = lists;

        return { ...state, [boardID]: board };
      }
      return state;
    }
    case CONSTANTS.DELETE_LIST: {
      const { listID, boardID } = action.payload;
      const board = state[boardID];
      const lists = board.lists;
      const newLists = lists.filter(id => id !== listID);
      board.lists = newLists;
      return { ...state, [boardID]: board };
    }

    case CONSTANTS.ADD_BOARD: {

      return { ...state, [action.payload._id]: action.payload };
    }

    case CONSTANTS.DELETE_BOARD: {
      
      const boardID = action.payload
      const newState = {...state}
      delete newState[boardID]

      return newState
    }

    case CONSTANTS.FETCH_BOARDS_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: null
      }
    
    case CONSTANTS.FETCH_BOARDS_SUCCESS:
      return {
        isFetching: false,
        ...action.payload
      }
      
    case CONSTANTS.FETCH_BOARDS_ERROR:
      return  {
        ...state,
        isFetching: false,
        error: action.payload
      }

    default:
      return state;
  }
};

export default boardsReducer;
