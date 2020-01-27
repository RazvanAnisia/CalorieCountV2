import axios from 'axios';
import { FOOD_FACTS_URL } from '../util/apiConfig';

export const FOODFACTS_START_FETCH = 'FOODFACTS_START_FETCH';
export const FOODFACTS_FETCH_SUCCESS = 'FOODFACTS_FETCH_SUCCESS';
export const FOODFACTS_FETCH_FAILURE = 'FOODFACTS_FETCH_FAILURE';

export const foodfactsFetchStart = () => {
  return {
    type: FOODFACTS_START_FETCH
  };
};

export const foodfactsFetchFailure = error => {
  return {
    type: FOODFACTS_FETCH_FAILURE,
    payload: error
  };
};

export const foodfactsFetchSuccess = payload => {
  return {
    type: FOODFACTS_FETCH_SUCCESS,
    payload: payload
  };
};

export const fetchFoodFactsData = strProductCode => {
  return dispatch => {
    dispatch(foodfactsFetchStart());
    return axios
      .get(`${FOOD_FACTS_URL}/${strProductCode}`)
      .then(response => {
        console.log(response);
        dispatch(foodfactsFetchSuccess(response.data));
      })
      .catch(error => {
        console.log(error);
        dispatch(foodfactsFetchFailure(error));
      });
  };
};
