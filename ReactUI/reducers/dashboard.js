import * as ActionTypes from '../actionCreators/actionTypes';
import {Map, List, fromJS} from 'immutable';

const initalState = fromJS({
  dashboardUrl:null
});

function setDashboardUrl(state,url){
  return state.set('dashboardUrl',url)
}

export default function(state = initalState, action) {
 switch (action.type) {
   case ActionTypes.SET_DASHBOARD_URL:
      return setDashboardUrl(state,action.url);
 }
 return state;
}
