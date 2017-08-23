export const QUOTES_REQUEST = 'QUOTES_REQUEST';
export const QUOTES_SUCCESS = 'QUOTES_SUCCESS';
export const QUOTES_FAILURE = 'QUOTES_FAILURE';

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
    dispatch(quotestRequest(true));

    axios.get(`//api.bcs.ru/quotesgroups/v1?list_filter=leaders${type}&list_limit=5&mode=real`).then(response => {
      dispatch(quotestRequest(false));
      dispatch(quotesSuccess(response.data.d[0].v));
    }).catch(response => {
      dispatch(quotesFailure(true, response.body));
      dispatch(quotestRequest(false));
      console.error(response);
    });
  };
}