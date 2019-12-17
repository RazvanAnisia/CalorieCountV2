import {
  RECEIVED_FOODFACTS_DATA,
  FETCH_START,
  FETCH_ERROR,
  FETCH_END
} from '../actions/ActionFoodFacts';

const objInitialState = {
  bLoading: false,
  nstrError: null,
  arrFoodfacts: []
};

export default function foodFactsReducer(state = objInitialState, action) {
  switch (action.type) {
    case FETCH_START:
      return {
        ...state,
        bLoading: true,
        nstrError: null
      };
    case RECEIVED_FOODFACTS_DATA:
      return {
        ...state,
        arrFoodfacts: action.payload,
        bLoading: false,
        nstrError: null
      };
    case FETCH_ERROR:
      return {
        ...state,
        bLoading: false,
        nstrError: action.payload
      };
    case FETCH_END:
      return {
        ...state,
        bLoading: false
      };
    default:
      return state;
  }
}
