import React from 'react';
import { connect } from 'react-redux';
import {setDashboardUrl} from '../actionCreators/dashboard.js'

class Dashboard extends React.Component {
 constructor(props){
   super(props);
   this.handleSearch = this.handleSearch.bind(this);
 }

 componentDidMount(){
   $.ajax({
            url: 'http://localhost:8080/config',
            type: 'GET',
            success: function(response) {
              this.props.setDashboardUrl(response);
            }.bind(this),
            error: function(error) {
            }.bind(this)
        });
 }

 handleSearch(event){
   let bool;
   if(event.target.name == "goQuery" ){
     bool = this.searchInput.value.length > 0
   }
   else if(event.which == 13 ){
     bool = this.searchInput.value.length > 0;
   }
   if(bool){
     let searchJson = {"searchQuery":this.searchInput.value};
     $.ajax({
              url: 'http://localhost:8080/search',
              type: 'POST',
              dataType: 'json',
              contentType: 'application/json',
              mimeType: 'application/json',
              data: JSON.stringify(searchJson),
              success: function(response) {
              }.bind(this),
              error: function(error) {
              }.bind(this)
          });
   }
 }

 render(){
   return <div className = 'dashboard'>
     <div className = 'container-fluid'>
     <div className ='row-fluid'>
       <div className ='col-md-6'>
        <div className = "twitterQueryBox input-group">
      <input type="text" className="form-control" placeholder="enter keywords or hashtags" name='twitterTopic' ref={(input)=>{this.searchInput=input}} onKeyPress={this.handleSearch} / >
        <span className="input-group-append">
          <button className="btn btn-primary" name ='goQuery' type="button" onClick={this.handleSearch}> Go </button>
        </span>
      </div>
     </div>
     {
       this.props.dashboardUrl == null ? null :  <div className = 'col-md-12 kibanaFrame'>
          <iframe src={this.props.dashboardUrl} height="100%" width="100%"></iframe>
        </div>
     }
     </div>
   </div>
   </div>
 }
}

Dashboard.propTypes = {
  dashboardUrl: React.PropTypes.string
}

const mapStateToProps = (state) => {
 return {
   dashboardUrl: state.getIn(['dashboard','dashboardUrl'])
 };
}

const mapDispatchToProps = (dispatch) => {
 return {
   setDashboardUrl: (url) => {
     dispatch(setDashboardUrl(url));
   },
 };
}

export const DashboardContainer = connect(mapStateToProps,
 mapDispatchToProps)(Dashboard);
