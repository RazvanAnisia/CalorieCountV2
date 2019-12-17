import { createStore } from 'redux';
import rootReducer from '../reducers';
import middleware from '../middleware';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(rootReducer, composeWithDevTools(middleware));

export default store;
