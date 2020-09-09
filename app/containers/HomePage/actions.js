/*
 *
 * HomePage actions
 *
 */

import * as CONSTANTS from './constants'


export function getUsers() {
  return {
    type: CONSTANTS.GET_USERS,
  }
}
