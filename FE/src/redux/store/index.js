import { createStore } from 'redux';
import HinhAnhReducer from '../reducers/hinhAnhReducer';

const store = createStore(HinhAnhReducer.reducer);

export default store;