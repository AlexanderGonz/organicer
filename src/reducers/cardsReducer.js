import { CONSTANTS } from "../actions";

const initialState = {
  // "card-0": {
  //   text: "moked",
  //   _id: `card-0`,
  // }
};

const cardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.ADD_CARD: {
      const { text, _id } = action.payload;

      const newCard = {
        text,
        _id
      };

      return { ...state, [_id]: newCard };
    }
    case CONSTANTS.EDIT_CARD: {
      const { _id, newText } = action.payload;
      const card = state[_id];
      card.text = newText;
      return { ...state, [_id]: card };
    }

    case CONSTANTS.DELETE_CARD: {
      const { _id } = action.payload;
      const newState = {...state};
      delete newState[_id];
      return newState;
    }

    case CONSTANTS.FETCH_CARDS_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: null
      }
    
    case CONSTANTS.FETCH_CARDS_SUCCESS:
      return {
        isFetching: false,
        ...action.payload
      }
      
    case CONSTANTS.FETCH_CARDS_ERROR:
      return  {
        ...state,
        isFetching: false,
        error: action.payload
      }

    default:
      return state;
  }
};

export default cardsReducer;
