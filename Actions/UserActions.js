import { NavigationActions } from 'react-navigation';
import { db } from '../Configs/configureDb';
import Firebase from '@firebase/app';
import '@firebase/auth';
import { LoginManager, AccessToken } from 'react-native-fbsdk';

export const USER_ACTION_TYPES = { LOGIN: 'login', TOGGLE_FAVOURITE: 'toggle_favourite' }

export function login(username, password) {
    return function (dispatch) {
        Firebase.auth().signInWithEmailAndPassword(username, password)
            .then((response) => {
                let userRef = db.ref('/users/' + response.user.uid);
                userRef.once('value', (snapshot) => {
                    let data = snapshot.val();
                    let favouriteShops = data ? data.favouriteShops || [] : [];
                    dispatch({
                        type: USER_ACTION_TYPES.LOGIN,
                        payload: {
                            id: response.user.uid,
                            username: response.user.email,
                            image: response.user.photoURL,
                            favouriteShops: favouriteShops
                        }
                    });
                    dispatch(NavigationActions.navigate({ routeName: 'App' }));
                });
            })
            .catch(function (error) {
                alert("Authentication failed.");
            });
    }
}

export function facebookLogin() {
    return (dispatch) => {
        LoginManager.logInWithReadPermissions(['public_profile', 'email'])
            .then(
                (result) => {
                    if (!result.isCancelled) {
                        AccessToken.getCurrentAccessToken()
                            .then((data) => {
                                let credential = Firebase.auth.FacebookAuthProvider.credential(data.accessToken);
                                Firebase.auth().signInWithCredential(credential)
                                    .then(response => {
                                        let userRef = db.ref('/users/' + response.uid);
                                        userRef.once('value', (snapshot) => {
                                            let data = snapshot.val();
                                            let favouriteShops = data ? data.favouriteShops || [] : [];
                                            dispatch({
                                                type: USER_ACTION_TYPES.LOGIN,
                                                payload: {
                                                    id: response.uid,
                                                    username: response.email,
                                                    image: response.photoURL,
                                                    favouriteShops: favouriteShops
                                                }
                                            });
                                            dispatch(NavigationActions.navigate({ routeName: 'App' }));
                                        });
                                    })
                                    .catch((error) => {
                                        alert("Authentication failed.");
                                    });
                            });
                    }
                },
                (error) => {
                    alert("Authentication failed.");
                },
            );
    };
}

export function toggleFavouriteShop(shopId) {
    return function (dispatch, getState) {
        let { user } = getState();
        let favourites;
        if (user.favouriteShops.indexOf(shopId) !== -1) {
            favourites = user.favouriteShops.filter(shop => shop !== shopId);
        } else {
            favourites = user.favouriteShops.slice(0);
            favourites.push(shopId);
        }
        let userRef = db.ref('/users/' + user.id);
        userRef.set({
            favouriteShops: favourites
        }, (error) => {
            if (error) {
                alert("An error occured.");
            } else {
                dispatch({
                    type: USER_ACTION_TYPES.TOGGLE_FAVOURITE,
                    payload: {
                        favouriteShops: favourites
                    }
                });
            }
        });
    }
}

export function logout() {
    return function (dispatch) {
        Firebase.auth().signOut().then(() => {
            LoginManager.logOut();       
            dispatch({
                type: USER_ACTION_TYPES.LOGIN,
                payload: {
                    id: null,
                    username: null,
                    image: null,
                    favouriteShops: []
                }
            });
            dispatch(NavigationActions.navigate({ routeName: 'Auth' }));            
        }).catch(function (error) {
            alert("An error occured.");
        });
    }
}
