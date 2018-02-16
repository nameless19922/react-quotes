import { getPeriod } from '../utils';
import api from '../api';

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
  return async dispatch => {
    try {
      let response,
          data;

      dispatch(quoteRequest(true));

      response = await api.getQuoteInfo(classCode, securCode);

      if (!response.data.d.length) throw new Error({ body: 'No data' });

      data = response.data.d[0];

      let chartData = [],
          { dateTo, dateFrom, resolution } = getPeriod(period);

      response = await api.getQuoteHistory(securCode, resolution, dateFrom, dateTo);

      for (let i = 0; i < response.data.c.length; i++) {
        chartData.push({
          x: response.data.t[i] * 1000,
          y: parseFloat(response.data.c[i].toFixed(response.data.scale))
        });
      }

      data.chart = chartData;

      dispatch(quoteSuccess(data));
      dispatch(quoteRequest(false));
    } catch (response) {
      dispatch(quoteFailure(true, response.body));
      dispatch(quoteRequest(false));
      console.error(response);
    }
  }
}