import React from 'react';
import { connect } from 'react-redux';
import {setPage,setTitle} from '../actionCreators/app';
import {DashboardContainer} from './dashboard';
import {TopicModellingContainer} from './topicModelling';
import {SettingsContainer} from './settings';


window.$ = window.jQuery = require('jquery');

class App extends React.Component {
 constructor(props){
   super(props);
   this.getRenderComponents = this.getRenderComponents.bind(this)
   this.handleTabClick = this.handleTabClick.bind(this)
 }

 handleTabClick(page){
   console.log("page "+page)
   this.props.setPage(page)
 }

 getRenderComponents(){
   let {page} = this.props
   switch(page){
     case 'dashboard': return <DashboardContainer />
      break;
     case 'topicModelling': return <TopicModellingContainer />
      break;
     case 'settings' : return <SettingsContainer />
      break;
     default:return <DashboardContainer />
   }
 }


 render(){
   let {title} = this.props;
   let highlightOption = 'itemClicked';
   return <div className = 'reactApp'>
        <div className = 'titleBlock'>
          <h1 className = 'pageHeader'>{title}</h1>
        </div>
        <nav className="navbar navigation">
        <a className={this.props.page  == 'dashboard' ? "navbar-item "+highlightOption : "navbar-item"} href="#" onClick={()=>this.handleTabClick('dashboard')}>
          <span>Dashboard</span>
        </a>
        <a className={this.props.page  == 'topicModelling' ? "navbar-item "+highlightOption : "navbar-item"} href="#" onClick={()=>this.handleTabClick('topicModelling')}>
          <span>Topic Modelling</span>
        </a>
        <a className={this.props.page  == 'settings' ? "navbar-item "+highlightOption : "navbar-item"} href="#" onClick={()=>this.handleTabClick('settings')}>
          <span>Settings</span>
        </a>
      </nav>
      {this.getRenderComponents()}
   </div>
 }
}

App.propTypes = {
  title: React.PropTypes.string,
  setPage: React.PropTypes.func,
  setTitle: React.PropTypes.func
}

const mapStateToProps = (state) => {
 return {
   title: state.getIn(['app','title']),
   page: state.getIn(['app','page'])
 };
}

const mapDispatchToProps = (dispatch) => {
 return {
   setPage: (page) => {
     dispatch(setPage(page))
   },
   setTitle: (title) => {
     dispatch(setTitle(title))
   }
 };
}

export const AppContainer = connect(mapStateToProps,
 mapDispatchToProps)(App);
