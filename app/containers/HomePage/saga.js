import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { push } from 'react-router-redux';
import * as CONSTANTS from './constants';
// import { getHeaders, errorHandler} from "../../utils/commonUtils";


let url = "https://5f58a1948040620016ab83d0.mockapi.io/api/v1/users";

export function* getUsersListHandlerAsync() {
  try {
    const response = yield call(axios.get, url, {});
    yield put({ type: CONSTANTS.GET_USERS_SUCCESS, response: response.data.members });
  } catch (error) {
    yield put({ type: CONSTANTS.GET_USERS_FAILURE, error: error });
  }
}

export function* watcherGetUsersListRequests() {
  yield takeLatest(CONSTANTS.GET_USERS, getUsersListHandlerAsync);
}

export default function* rootSaga() {
  yield [
    watcherGetUsersListRequests(),
  ];
}