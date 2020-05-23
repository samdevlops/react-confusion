import { createStore, combineReducers } from 'redux';
import { Dishes } from './dishes';
import { Comments } from './comment';
import { Promotions } from './promotions';
import { Leaders } from './leaders';
import { DISHES } from '../shared/dishes';

export const ConfigureStore = () =>{
    const store = createStore(
        combineReducers({
            dishes: Dishes,
            comments: Comments,
            promotions: Promotions,
            leaders: Leaders
        })
    );

    return store;
}