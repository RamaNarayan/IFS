import {Map} from 'immutable';

import app from './app'
import dashboard from './dashboard'
import topicModelling from './topicModelling'
import settings from './settings'


export default function rootReducer(state = Map(), action) {
 const nextState = state.merge({
   app: app(state.get('app'),action),
   dashboard: dashboard(state.get('dashboard'),action),
   topicModelling: topicModelling(state.get('topicModelling'),action),
   settings: settings(state.get('settings'),action),
 });
  return nextState
}
