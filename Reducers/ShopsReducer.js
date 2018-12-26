import {SHOPS_ACTION_TYPES} from '../Actions/ShopsActions';

export function shopReducer(state = {shops: null}, action) {
    switch(action.type) {
        case SHOPS_ACTION_TYPES.SET:
            return {shops: action.payload.shops}
        default:
            return state;
    }
} 