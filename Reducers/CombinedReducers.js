import { combineReducers } from 'redux';
import { userReducer } from './UserReducer';
import { shopReducer } from './ShopsReducer';
import { createNavigationReducer } from 'react-navigation-redux-helpers';
import AppNavigator from '../Containers/AppContainer';

const navReducer = createNavigationReducer(AppNavigator);

export default combineReducers({
    nav: navReducer,
    user: userReducer,
    shops: shopReducer
});
