import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { IStore } from './IStore';
import { homeReducer } from '../app/containers/Home/HomeReducer';

const { reducer } = require('redux-connect');

const rootReducer: Redux.Reducer<IStore> = combineReducers<IStore>({
  routing: routerReducer,
  homeStore: homeReducer,
  reduxAsyncConnect: reducer,
});

export default rootReducer;
