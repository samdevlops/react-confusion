import { DISHES } from '../shared/dishes';
import { actions } from 'react-redux-form';

export const Dishes = (state = DISHES, action) => {

    switch(action.type){
        default: 
            return state;
    }
}