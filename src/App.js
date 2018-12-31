import React, { Component } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import Page from './components/Page'
import WelcomePage from './components/WelcomePage'
import ListPages from './components/editorial/ListPages';

const BASE_API_URL = 'https://my-express-cms.herokuapp.com/api';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={WelcomePage}/>
          <Route exact path='/page/' component={ListPages}/>
          <Route exact path='/page/:id/' component={Page}/>
          <Route exact path='/page/:id/:edit' component={Page} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export {
   App,
   BASE_API_URL
}