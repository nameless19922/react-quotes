import { getDateAgo } from '../utils'

export const QUOTES_REQUEST = 'QUOTES_REQUEST';
export const QUOTES_SUCCESS = 'QUOTES_SUCCESS';
export const QUOTES_FAILURE = 'QUOTES_FAILURE';
export const QUOTES_TYPE    = 'QUOTES_TYPE';

export function quotesFailure(isFailure) {
  return {
    type: QUOTES_FAILURE,
    isFailure
  }
}

export function quotesSuccess(data) {
  return {
    type: QUOTES_SUCCESS,
    data
  }
}

export function quotestRequest(isRequest) {
  return {
    type: QUOTES_REQUEST,
    isRequest
  }
}

export function getLeaders(type, number = 5) {
  return dispatch => {
    let data = [];

    dispatch(quotestRequest(true));

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

      dispatch(quotesSuccess(data));
      dispatch(quotestRequest(false));
    })).catch(response => {
      dispatch(quotesFailure(true, response.body));
      dispatch(quotestRequest(false));
      console.error(response);
    });
  };
}