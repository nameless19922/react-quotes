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

export function getLeaders(type) {
  return dispatch => {
    let data = [];

    dispatch(quotestRequest(true));

    axios.get(`//api.bcs.ru/quotesgroups/v1?list_filter=leaders${type}&list_limit=5&mode=real`).then(response => {
      let date = new Date(),
          dateTo = Date.now(),
          dateAgo = getDateAgo(date, 7),
          dateFrom = Date.UTC(dateAgo.getUTCFullYear(), dateAgo.getUTCMonth(), dateAgo.getUTCDate(), 0, 0),

          promises = [];

      data = response.data.d[0].v;

      for (const item of data) {
        promises.push(axios.get(`https://api.bcs.ru/udfdatafeed/v1/history?symbol=${item.secur}&resolution=60&from=${(dateFrom / 1000).toFixed(0)}&to=${(dateTo / 1000).toFixed(0)}`));
      }
      return axios.all(promises);
    }).then(axios.spread((...args) => {
      data.map((item, index) => {
        let historyData = [];

        item.history = [];

        for (let i = 0; i < args[index].data.t.length; i++) {
          historyData.push(
            parseFloat(args[index].data.c[i].toFixed(args[index].data.scale))
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