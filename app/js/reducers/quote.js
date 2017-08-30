import { QUOTE_REQUEST, QUOTE_SUCCESS, QUOTE_FAILURE } from '../actions/quote';
import { initialState } from '../store';

export default function quoteReducer(state = initialState, action) {
  switch (action.type) {
    case QUOTE_FAILURE:
      return {
        ...state,
        isFailure: action.isFailure
      };

    case QUOTE_REQUEST:
      return {
        ...state,
        isRequest: action.isRequest
      };

    case QUOTE_SUCCESS:
      return {
        ...state,
        data: action.data
      };

    default:
      return state;
  }
}