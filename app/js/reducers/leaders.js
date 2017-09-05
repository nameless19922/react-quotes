import { LEADERS_REQUEST, LEADERS_SUCCESS, LEADERS_FAILURE, LEADERS_SORT } from '../actions/leaders';
import { initialState } from '../store';
import { sort } from '../utils';

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

    case LEADERS_SORT: {
      const type = typeof state.data[0][action.prop];

      return {
        ...state,
        sort: {
          prop: action.prop,
          direction: action.direction
        },
        data: state.data.sort((first, second) => {
          if (type === 'string') {
            return sort.string[action.direction](
              first[action.prop].toLowerCase(),
              second[action.prop].toLowerCase()
            );
          } else if (type === 'number') {
            return sort.number[action.direction](
              first[action.prop],
              second[action.prop]
            );
          }
        }).slice()
      }
    }

    default:
      return state;
  }
}