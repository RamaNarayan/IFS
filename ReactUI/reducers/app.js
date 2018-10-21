import * as ActionTypes from '../actionCreators/actionTypes';
import {Map, List, fromJS} from 'immutable';

const initalState = fromJS({
 title: "INSTANT FEEDBACK SYSTEM",
 page: 'dashboard'
});

function setPage(state,page){
  console.log("in reducer")
  return state.set('page',page)
}

function setTitle(state,title){
  console.log("in reducer")
  return state.set('title',title)
}

export default function(state = initalState, action) {
 switch (action.type) {
  case ActionTypes.SET_PAGE:
     return setPage(state,action.page);
  case ActionTypes.SET_TITLE:
    return setTitle(state,action.title);
 }
 return state;
}
