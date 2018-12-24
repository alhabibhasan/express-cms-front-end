import React, { Component } from 'react';
import { Jumbotron } from 'reactstrap';
import NavigationBar from './navigation/NavigationBar';

class WelcomePage extends Component {
  render() {
    return (
      <div>
        <Jumbotron>
        <h1>
          Hi there! Welcome to Express CMS.
        </h1>
        <p>
          We hope you enjoy your experience. Happy creating!
        </p>
        </Jumbotron>
        <NavigationBar isOpen="true"/>
      </div>
    )
  }
}

export default WelcomePage;