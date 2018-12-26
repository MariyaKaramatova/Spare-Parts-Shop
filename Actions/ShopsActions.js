import { db } from '../Configs/configureDb';

export const SHOPS_ACTION_TYPES = { SET: 'set_shops' }

let shopsRef = db.ref('/shops');

export function getShops() {
    return function (dispatch) {
        shopsRef.on('value', (snapshot) => {
            let shops = snapshot.val();
            dispatch({
                type: SHOPS_ACTION_TYPES.SET,
                payload: {
                    shops
                }
            });
        })
    }
}