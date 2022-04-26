import axios from 'axios';
import { takeLatest, put } from "redux-saga/effects";
import { GET_USER_SUCCESS, DELETE_USER_FAIL, DELETE_USER_SUCCESS, GET_USER, DELETE_USER } from './actions';
import URL from './api';

async function loading() {
    await new Promise((resolve) => {setTimeout(resolve, 2000)});
    return await axios.get(`${URL.baseURL}`);
}

function* authSaga() {
    try {
        let dataUser;
        yield loading()
            .then((res) => {console.log(res);dataUser = res.data})
            .catch((err) => {console.log(err)})
        yield console.log(dataUser);
        yield put({type: GET_USER_SUCCESS, payload: {users: dataUser, isLoading: false}});
    } catch(error) {
        console.log(`Some errors occur when trying to connect to that link ${URL.baseURL}`);
    }
}

function* deleteUser(action) {
    try {
        const userDelete = yield axios.delete(`${URL.baseURL}/${action.payload}`);
        console.log(userDelete);
        yield put({type: DELETE_USER_SUCCESS})
    } catch(error) {
        console.log(`Some errors occur when trying to connect to that link ${URL.baseURL}/${action.payload}`);
    }
}

export default function* rootSaga() {
    yield takeLatest(GET_USER, authSaga);
    yield takeLatest(DELETE_USER, deleteUser);
    //yield takeLatest(DELETE_USER_SUCCESS, authSaga);
}