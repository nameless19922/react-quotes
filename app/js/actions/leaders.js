import { getDateAgo } from '../utils'

export const LEADERS_REQUEST = 'LEADERS_REQUEST';
export const LEADERS_SUCCESS = 'LEADERS_SUCCESS';
export const LEADERS_FAILURE = 'LEADERS_FAILURE';

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

export function getLeaders(type, number = 5) {
  return dispatch => {
    let data = [];

    dispatch(leadersRequest(true));

    axios.get(`https://api.bcs.ru/quotesgroups/v1?list_filter=leaders${type}&list_limit=${number}&mode=real`).then(response => {
      let date     = new Date(),
          dateTo   = Date.now(),
          dateAgo  = getDateAgo(date, 7),
          dateFrom = Date.UTC(dateAgo.getUTCFullYear(), dateAgo.getUTCMonth(), dateAgo.getUTCDate(), 0, 0);

      data = response.data.d[0].v;

      let promises = [...Array(number).keys()].map((item, i) => axios.get(`https://api.bcs.ru/udfdatafeed/v1/history?symbol=${data[i].secur}&resolution=60&from=${(dateFrom / 1000).toFixed(0)}&to=${(dateTo / 1000).toFixed(0)}`));

      return axios.all(promises);
    }).then(axios.spread((...args) => {
      data.map((item, index) => {
        let historyData = [],
            current = args[index].data;

        item.history = [];

        for (const item of current.c) {
          historyData.push(
            parseFloat(item.toFixed(current.scale))
          );
        }
        item.history = historyData;

        return item;
      });

      dispatch(leadersSuccess(data));
      dispatch(leadersRequest(false));
    })).catch(response => {
      dispatch(leadersFailure(true, response.body));
      dispatch(leadersRequest(false));
      console.error(response);
    });
  };
}