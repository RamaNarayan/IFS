import React from 'react';
import { connect } from 'react-redux';

class Settings extends React.Component {
 constructor(props){
   super(props);
 }

 render(){
   return <div className = 'Settings'>
     settings
   </div>
 }
}

Settings.propTypes = {
}

const mapStateToProps = (state) => {
 return {
 };
}

const mapDispatchToProps = (dispatch) => {
 return {
 };
}

export const SettingsContainer = connect(mapStateToProps,
 mapDispatchToProps)(Settings);
