import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import channelReducer from './channel';

const reducers = combineReducers({
  channel: channelReducer,
});

export default createStore(reducers, applyMiddleware(thunk));
