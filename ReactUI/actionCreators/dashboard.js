import * as ActionConstants from './actionTypes';

export function setDashboardUrl(url){
  return {
    type: ActionConstants.SET_DASHBOARD_URL,
    url: url
  }
}
