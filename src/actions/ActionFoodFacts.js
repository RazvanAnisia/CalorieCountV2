import axios from 'axios';
import { FOOD_FACTS_URL } from '../util/apiConfig';

export const FETCH_START = 'FETCH_START';
export const RECEIVED_FOODFACTS_DATA = 'RECEIVED_FOODFACTS_DATA';
export const FETCH_ERROR = 'FETCH_ERROR';
export const FETCH_END = 'FETCH_END ';

export const fetchStart = () => {
  return {
    type: FETCH_START
  };
};

export const fetchError = error => {
  return {
    type: FETCH_ERROR,
    payload: error
  };
};

export const fetchEnd = () => {
  return {
    type: FETCH_END
  };
};

export const receivedFoodfactsData = payload => {
  return {
    type: RECEIVED_FOODFACTS_DATA,
    payload: payload
  };
};

export const fetchFoodFactsData = () => {
  return dispatch => {
    dispatch(fetchStart());
    return axios
      .get(FOOD_FACTS_URL)
      .then(function(response) {
        console.log(response);
        dispatch(receivedFoodfactsData(response.data));
      })
      .catch(function(error) {
        console.log(error);
        dispatch(fetchError(error));
      })
      .finally(function() {
        // always executed
        dispatch(fetchEnd());
      });
  };
};
