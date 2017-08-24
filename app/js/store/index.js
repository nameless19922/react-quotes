import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import quotesReducer from  '../reducers'

export const initialState = {
  isRequest: false,
  isFailure: false,
  data: []
};

export const store = createStore(
  quotesReducer,
  initialState,
  applyMiddleware(thunkMiddleware)
);