import { createStore } from 'redux';
import { rootReducer } from '../reducers';
import { buildMiddleware } from '../middleware';

export const store = createStore(rootReducer, buildMiddleware());
