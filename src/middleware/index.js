import thunk from 'redux-thunk';
import logger from './logger';
import { applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

export default applyMiddleware(thunk, composeWithDevTools);
