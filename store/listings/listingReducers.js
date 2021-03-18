import {combineReducers} from 'redux';
import * as types from './types';

const listingsReducer = (state = [], {type, payload}) => {
  switch (type) {
    case types.FETCH_ONE:
      return state.map((v) => (v.id === payload.id ? payload : v));
    case types.FETCH:
      return payload;
    default:
      return state;
  }
};

const offsetReducer = (state = 0, {type, payload}) => {
  switch (type) {
    case types.SET_OFFSET:
      return payload;
    default:
      return state;
  }
};

const reducers = {
  listings: listingsReducer,
  offset: offsetReducer,
};

export default combineReducers(reducers);
