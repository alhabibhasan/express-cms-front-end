import React, { Component } from 'react';
import ListPages from './ListPages';

class ViewPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pageId: props.match.params.id
    }
  }

  render() {

    if (this.state.pageId) {
      return (
        <h1>
          You are trying to view page with id {this.state.pageId}.
        </h1>
      )
    } else {
      return (
        <ListPages/>
      )
    }
  }
}

export default ViewPage;