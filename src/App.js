import React, { Component } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import ViewPage from './components/ViewPage'
import WelcomePage from './components/WelcomePage'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={WelcomePage}/>
          <Route exact path='/page/:id?' component={ViewPage}/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
