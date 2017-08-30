import { LEADERS_REQUEST, LEADERS_SUCCESS, LEADERS_FAILURE } from '../actions/leaders';
import { initialState } from '../store';

export default function leadersReducer(state = initialState, action) {
  switch (action.type) {
    case LEADERS_FAILURE:
      return {
        ...state,
        isFailure: action.isFailure
      };

    case LEADERS_REQUEST:
      return {
        ...state,
        isRequest: action.isRequest
      };

    case LEADERS_SUCCESS:
      return {
        ...state,
        data: action.data
      };

    default:
      return state;
  }
}