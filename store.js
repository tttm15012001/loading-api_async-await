import { createStore, applyMiddleware } from 'redux';
import GetUserReducer from './reducer';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './saga';

const SagaMiddleware = createSagaMiddleware();
const storeGetUser2 = createStore(GetUserReducer, applyMiddleware(SagaMiddleware));
SagaMiddleware.run(rootSaga);

export default storeGetUser2;