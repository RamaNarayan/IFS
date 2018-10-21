import React from 'react';
import { connect } from 'react-redux';

class TopicModelling extends React.Component {
 constructor(props){
   super(props);
 }

 render(){
   return <div className = 'TopicModelling'>
   </div>
 }
}

TopicModelling.propTypes = {
}

const mapStateToProps = (state) => {
 return {
 };
}

const mapDispatchToProps = (dispatch) => {
 return {
 };
}

export const TopicModellingContainer = connect(mapStateToProps,
 mapDispatchToProps)(TopicModelling);
