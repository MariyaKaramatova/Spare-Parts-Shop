import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import combinedReducer from '../Reducers/CombinedReducers';
import { navMiddleware } from '../Containers/AppContainer';

  
  

export default function configureStore(initialState) {
    return createStore(
        combinedReducer,
        initialState,
        applyMiddleware(thunk, navMiddleware)
    );
}
