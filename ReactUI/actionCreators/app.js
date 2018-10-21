import * as ActionConstants from './actionTypes';

export function setPage(page){
  return {
    type: ActionConstants.SET_PAGE,
    page: page
  }
}

export function setTitle(title){
  return {
    type: ActionConstants.SET_TITLE,
    title: title
  }
}
