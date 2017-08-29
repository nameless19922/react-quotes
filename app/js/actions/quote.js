import { getPeriod } from '../utils'

export const QUOTE_REQUEST = 'QUOTE_REQUEST';
export const QUOTE_SUCCESS = 'QUOTE_SUCCESS';
export const QUOTE_FAILURE = 'QUOTE_FAILURE';

export function quoteFailure(isFailure) {
  return {
    type: QUOTE_FAILURE,
    isFailure
  }
}

export function quoteSuccess(data) {
  return {
    type: QUOTE_SUCCESS,
    data
  }
}

export function quoteRequest(isRequest) {
  return {
    type: QUOTE_REQUEST,
    isRequest
  }
}

export function getQuote(classCode, securCode, period) {
  return dispatch => {
    let data = {};

    dispatch(quoteRequest(true));

    axios.get(`https://api.bcs.ru/quotesgroups/v2?classcode=${classCode}&securcode=${securCode}`).then(response => {
      let { dateTo, dateFrom, resolution } = getPeriod(period)

      data = response.data.d[0];

      return axios.get(`https://api.bcs.ru/udfdatafeed/v1/history?symbol=${securCode}&resolution=${resolution}&from=${(dateFrom / 1000).toFixed(0)}&to=${(dateTo / 1000).toFixed(0)}`)
    }).then(response => {
      let chartData = [],
          tmp = response.data;

      for (let i = 0; i < tmp.c.length; i++) {
        chartData.push({
          x: tmp.t[i] * 1000,
          y: parseFloat(tmp.c[i].toFixed(data.scale))
        });
      }

      data.chart = chartData;

      dispatch(quoteSuccess(data));
      dispatch(quoteRequest(false));
    }).catch(response => {
      dispatch(quoteFailure(true, response.body));
      dispatch(quoteRequest(false));
      console.error(response);
    });
  }
}