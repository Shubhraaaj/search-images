import { createStore, combineReducers } from 'redux';
import imageReducer from '../reducers/imageReducer';

const rootReducer = combineReducers(
    { image: imageReducer }
);
const configureStore = () => {
    return createStore(rootReducer);
}
export default configureStore;