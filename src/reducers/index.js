import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import channelReducer from './channel';
import userReducer from './user';

const reducers = combineReducers({
  channel: channelReducer,
  user: userReducer,
});

export default createStore(reducers, applyMiddleware(thunk));
