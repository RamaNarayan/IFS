import React from 'react';
import { connect } from 'react-redux';

class Dashboard extends React.Component {
 constructor(props){
   super(props);
   this.handleSearch = this.handleSearch.bind(this);
 }

 handleSearch(event){
   console.log("searchValue"+this.searchInput.value);
   let searchJson = {'searchQuery':this.searchInput.value};
   let bool;
   if(event.target.name == "goQuery" ){
     bool = this.searchInput.value.length > 0
   }
   else if(event.which == 13 ){
     bool = this.searchInput.value.length > 0;
   }
   if(bool){
     $.ajax({
              url: 'http://localhost:8080/searchQuery',
              type: 'POST',
              dataType: 'json',
              contentType: 'application/json',
              data: searchJson,
              success: function(response) {
                console.log("success")
              }.bind(this),
              error: function(error) {
                console.log("failure")
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
     <div className = 'col-md-12 kibanaFrame'>
       <iframe src="http://localhost:5601/app/kibana#/dashboard/AWaTpJ1byuUaWgAAZyzJ?embed=true&_g=(refreshInterval:('$$hashKey':'object:303',display:'5+seconds',pause:!f,section:1,value:5000),time:(from:now-15m,mode:quick,to:now))&_a=(description:'',filters:!(),options:(darkTheme:!f),panels:!((col:1,id:AWYl-8PyIxk6pAbfNNyW,panelIndex:1,row:1,size_x:6,size_y:3,type:visualization),(col:7,id:AWaTo4QEyuUaWgAAZyy9,panelIndex:2,row:1,size_x:6,size_y:3,type:visualization)),query:(match_all:()),timeRestore:!f,title:'Sentiments+Dashboard',uiState:(),viewMode:view)" height="100%" width="100%"></iframe>
     </div>

     </div>
   </div>
   </div>
 }
}

Dashboard.propTypes = {
}

const mapStateToProps = (state) => {
 return {
 };
}

const mapDispatchToProps = (dispatch) => {
 return {
 };
}

export const DashboardContainer = connect(mapStateToProps,
 mapDispatchToProps)(Dashboard);
