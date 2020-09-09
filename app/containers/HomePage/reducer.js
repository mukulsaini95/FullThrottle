/*
 *
 * HomePage reducer
 *
 */

import { fromJS } from 'immutable';
import * as CONSTANTS from './constants'
export const initialState = fromJS({
  todoList: [],
  todoListFailure: null
});

function homePageReducer(state = initialState, action) {
  switch (action.type) {
    case CONSTANTS.GET_USERS_SUCCESS:
      return Object.assign({}, state, {
        users: action.response
      });
    case CONSTANTS.GET_USERS_FAILURE:
      return Object.assign({}, state, {
        usersListFailure: { error: action.error, timestamp: new Date() }
      })
    default:
      return state;
  }
}

export default homePageReducer;
