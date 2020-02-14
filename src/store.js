import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};

// an array of middleware
const middleware = [thunk];

// create store takes in the rootReducer, initial state, middleware.
// FOR MIDDLEWARE -> Since we are using thunk with middleware this is where applyMiddleware and composeWithDevTools from redux and redux-devtools-extension come in.

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
