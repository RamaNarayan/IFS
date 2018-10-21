import * as ActionConstants from './actionTypes';

export function setPage(page){
  console.log("in action")
  return {
    type: ActionConstants.SET_PAGE,
    page: page
  }
}

export function setTitle(title){
  console.log("in action")
  return {
    type: ActionConstants.SET_TITLE,
    title: title
  }
}
