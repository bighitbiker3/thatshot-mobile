import {
  VIEW_CHANGE
} from '../constants'

export const changeView = (view) => ({
  type: VIEW_CHANGE,
  payload: view
})