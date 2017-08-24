import { QUOTES_REQUEST, QUOTES_SUCCESS, QUOTES_FAILURE, QUOTES_TYPE } from '../actions'
import { initialState } from '../store'

export default function quotesReducer(state = initialState, action) {
  console.log(action);
  switch (action.type) {
    case QUOTES_FAILURE:
      return {
        ...state,
        isFailure: action.isFailure
      };

    case QUOTES_REQUEST:
      return {
        ...state,
        isRequest: action.isRequest
      };

    case QUOTES_SUCCESS:
      return {
        ...state,
        data: action.data
      };

    default:
      return state;
  }
}