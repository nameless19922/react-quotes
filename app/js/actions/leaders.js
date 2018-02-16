import { getDateAgo } from '../utils';
import { initialState } from '../store';
import api from '../api';

export const LEADERS_REQUEST = 'LEADERS_REQUEST';
export const LEADERS_SUCCESS = 'LEADERS_SUCCESS';
export const LEADERS_FAILURE = 'LEADERS_FAILURE';
export const LEADERS_SORT    = 'LEADERS_SORT';

export function leadersFailure(isFailure) {
  return {
    type: LEADERS_FAILURE,
    isFailure
  }
}

export function leadersSuccess(data) {
  return {
    type: LEADERS_SUCCESS,
    data
  }
}

export function leadersRequest(isRequest) {
  return {
    type: LEADERS_REQUEST,
    isRequest
  }
}

export function leadersSort(prop, direction) {
  return {
    type: LEADERS_SORT,
    prop,
    direction
  }
}

export function getLeaders(type, number = 5) {
  return async dispatch => {
    try {
      let date     = new Date(),
          dateTo   = Date.now(),
          dateAgo  = getDateAgo(date, 7),
          dateFrom = Date.UTC(dateAgo.getUTCFullYear(), dateAgo.getUTCMonth(), dateAgo.getUTCDate(), 0, 0),

          data     = [],
          response;

      dispatch(leadersRequest(true));

      response = await api.getLeaders(type, number);
      data = response.data.d[0].v;

      if (!data.length) throw new Error({body: 'No data'});

      let promises = [...Array(number).keys()].map((item, i) => api.getQuoteHistory(data[i].secur, 60, (dateFrom).toFixed(0), (dateTo).toFixed(0)));

      response = await axios.all(promises);

      data.map((item, index) => {
        let historyData = [],
            current = response[index].data;

        item.history = [];

        for (const item of current.c) {
          historyData.push(
              parseFloat(item.toFixed(current.scale))
          );
        }
        item.history = historyData;

        return item;
      });

      const initalSort = initialState.leaders.sort

      dispatch(leadersSuccess(data));
      dispatch(leadersSort(initalSort.prop, type === 'up' ? 'down' : 'up'));
      dispatch(leadersRequest(false));
    } catch (response) {
      dispatch(leadersFailure(true, response.body));
      dispatch(leadersRequest(false));
      console.error(response);
    }
  };
}