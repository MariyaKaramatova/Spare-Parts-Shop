import {USER_ACTION_TYPES} from '../Actions/UserActions';

export function userReducer(state = {username: null, id: null, image: null, favouriteShops: []}, action) {
    switch(action.type) {
        case USER_ACTION_TYPES.LOGIN:
            return {
                id: action.payload.id,
                username: action.payload.username,
                image: action.payload.image,
                favouriteShops: action.payload.favouriteShops
            }
        case USER_ACTION_TYPES.TOGGLE_FAVOURITE:
            return {
                ...state,
                favouriteShops: action.payload.favouriteShops
            }
        default:
            return state;
    }
} 