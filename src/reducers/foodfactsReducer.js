import {
  FOODFACTS_FETCH_FAILURE,
  FOODFACTS_START_FETCH,
  FOODFACTS_FETCH_SUCCESS
} from '../actions/ActionFoodFacts';

const objInitialState = {
  bLoading: false,
  nstrError: null,
  objFoodfacts: []
};

export default function foodFactsReducer(state = objInitialState, action) {
  switch (action.type) {
    case FOODFACTS_START_FETCH:
      return {
        ...state,
        bLoading: true,
        nstrError: null
      };
    case FOODFACTS_FETCH_SUCCESS:
      return {
        ...state,
        objFoodfacts: action.payload,
        bLoading: false,
        nstrError: null
      };
    case FOODFACTS_FETCH_FAILURE:
      return {
        ...state,
        bLoading: false,
        nstrError: action.payload
      };
    default:
      return state;
  }
}
