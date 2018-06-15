import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom'

class PageError extends Component {
  componentWillUnmount() {    
    this.props.history.push('/')
  }
  render(){
      return (
        <div>
            404
        </div>
      )
  }
 
}
export default withRouter(PageError);