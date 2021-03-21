import * as types from './types';

export const fetchAll = (params) => (dispatch) =>
  fetch('http://localhost:3000/api/listings', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  })
    .then((r) => r.json())
    .then((v) => {
      dispatch({type: types.FETCH, payload: v.rows ? v.rows : []});
      dispatch({type: types.SET_COUNT, payload: v.count ? v.count : 0});
    });

export const fetchOne = (id) => (dispatch) =>
  fetch(`http://localhost:3000/api/listings/` + id, {
    method: 'GET',
  })
    .then((r) => r.json())
    .then((v) => dispatch({type: types.FETCH_ONE, payload: v.rows}));

export const setOffset = (num) => ({type: types.SET_OFFSET, payload: num});
export const setFilter = (state) => ({type: types.SET_FILTER, payload: state});
