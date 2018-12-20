import React, { Component } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import ViewPage from './components/page/ViewPage'
import EditPage from './components/page/EditPage'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/page/:id' component={ViewPage}/>
          <Route exact path='/edit' component={EditPage}/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
