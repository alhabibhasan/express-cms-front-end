import React, { Component } from 'react';
import axios from 'axios';
import {Jumbotron, Table, Button} from 'reactstrap';

class ListPages extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pages: []
    }

    this.getPages();
  }

  getPages() {
    axios({
      method: 'GET',
      url: 'http://localhost:3000/api/pages'
    })
    .then(pages => {
      this.setState({
        pages: pages.data.allStoredElements
      });
    });
  }

  render() {
    const tableRows = this.state.pages.map(page => 
      <tr>
        <td>{page.name}</td>
        <td>{page.description}</td>
        <td>{new Date(page.createdAt).toUTCString()}</td>
        <td>
          <Button color="danger">
            Delete
          </Button>
        </td>
      </tr>
    );
  
    return (
      <div>
        <Jumbotron>
          <h1>
            View All pages
          </h1>
        </Jumbotron>

        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Created at</th>
              <th>Actions</th>
            </tr>
          </thead>
          {tableRows}
        </Table>
      </div>
    )
  }
}

export default ListPages;