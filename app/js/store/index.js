import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createHistory from 'history/createHashHistory'
import { routerReducer, routerMiddleware } from 'react-router-redux'

import quotesReducer from  '../reducers'

export const history = createHistory();

export const initialState = {
  quotes: {
    isRequest: false,
    isFailure: false,
    data: []
  }
};

export const store = createStore(
  combineReducers({
    routing: routerReducer,
    quotes: quotesReducer
  }),
  initialState,
  applyMiddleware(thunkMiddleware, routerMiddleware(history))
);