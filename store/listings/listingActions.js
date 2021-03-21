import * as types from './types';

export const fetchAll = (offset) => (dispatch) =>
  fetch('http://localhost:3000/api/listings', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({offset: offset}),
  })
    .then((r) => r.json())
    .then((v) => dispatch({type: types.FETCH, payload: v ? v : []}));

export const fetchOne = (id) => (dispatch) =>
  fetch(`http://localhost:3000/api/listings/` + id, {
    method: 'GET',
  })
    .then((r) => r.json())
    .then((v) => dispatch({type: types.FETCH_ONE, payload: v}));

export const setOffset = (num) => ({type: types.SET_OFFSET, payload: num});
