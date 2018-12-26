import { createBottomTabNavigator, createAppContainer, createStackNavigator, createSwitchNavigator } from "react-navigation";
import ShopsContainer from './ShopsContainer';
import MapContainer from './MapContainer';
import DetailsContainer from './DetailsContainer';
import ProfileContainer from './ProfileContainer';
import LoginContainer from './LoginContainer';
import {
    reduxifyNavigator,
    createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';
import { connect } from 'react-redux';

const HomeNavigator = createStackNavigator(
    {
        Home: {
            screen: ShopsContainer
        },
        Details: {
            screen: DetailsContainer
        },
    },
    {
        headerMode: 'none'
    },
    {
        initialRouteName: "Home"
    }
);

const TabNavigator = createBottomTabNavigator(
    {
        Home: {
            screen: HomeNavigator
        },
        Map: {
            screen: MapContainer
        },
        Profile: {
            screen: ProfileContainer
        }
    },
    {
        initialRouteName: "Home"
    }
);

const AuthStack = createStackNavigator(
    { Login: LoginContainer },
    {
        headerMode: 'none'
    }
);
export default AppNavigator = createAppContainer(createSwitchNavigator(
    {
        App: TabNavigator,
        Auth: AuthStack,
    },
    {
        initialRouteName: 'Auth',
    }
));

// Note: createReactNavigationReduxMiddleware must be run before reduxifyNavigator
export const navMiddleware = createReactNavigationReduxMiddleware(
    "root",
    state => state.nav,
);
const App = reduxifyNavigator(AppNavigator, "root");
const mapStateToProps = (state) => ({
    state: state.nav,
});
export const AppWithNavigationState = connect(mapStateToProps)(App);