import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createHistory from 'history/createHashHistory'
import { routerReducer, routerMiddleware } from 'react-router-redux'

import leadersReducer from  '../reducers/leaders'
import quoteReducer from  '../reducers/quote'

export const history = createHistory();

export const initialState = {
  leaders: {
    isRequest: false,
    isFailure: false,
    data: []
  },
  quote: {
    isRequest: false,
    isFailure: false,
    data: {}
  }
};

export const store = createStore(
  combineReducers({
    routing: routerReducer,
    leaders: leadersReducer,
    quote: quoteReducer
  }),
  initialState,
  applyMiddleware(thunkMiddleware, routerMiddleware(history))
);