import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Dishes } from './dishes';
import { Comments } from './comment';
import { Promotions } from './promotions';
import { Leaders } from './leaders';
import { DISHES } from '../shared/dishes';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const ConfigureStore = () =>{
    const store = createStore(
        combineReducers({
            dishes: Dishes,
            comments: Comments,
            promotions: Promotions,
            leaders: Leaders
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}