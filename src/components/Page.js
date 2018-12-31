import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import axios from 'axios';
import Band from './Band';
import { Jumbotron, Button} from 'reactstrap';
import ContentEditable from 'react-contenteditable';
import {BASE_API_URL} from '../App';
import {withRouter} from 'react-router-dom';

class Page extends Component {
    constructor(props) {
        super(props);

        this.contentEditable = React.createRef();

        this.state = {
            pageId: props.match.params.id,
            edit: props.match.params.edit === 'edit' ? true : false,
            loadingPage: true
        }

        this.getPage()
        this.toggleEditing = this.toggleEditing.bind(this)
        this.addBand = this.addBand.bind(this)
    }

    getPage() {
        axios({
            method: 'GET',
            url: BASE_API_URL + '/pages/' + this.state.pageId 
        })
            .then(pageObject => {
                if (pageObject.data.not_found) {
                    this.setState({
                        pageNotFound: true,
                        loadingPage: false
                    })
                } else {
                    this.setState({
                        name: pageObject.data.page.name,
                        description: pageObject.data.page.description,
                        bands: pageObject.data.bands,
                        loadingPage: false
                    });
                }
            });
    }

    setPageState(evt) {
        let stateToUpdate = evt.target.getAttribute('name')
        let updatedState = evt.target.textContent

        this.setState({
            [stateToUpdate]: updatedState
        }, this.savePage)
    }

    toggleEditing() {
        this.setState(currentState => ({
            edit: !currentState.edit
        }), () => {
            if (this.state.edit === true) {
                this.props.history.push('/page/' + this.state.pageId + '/edit')
            } else {
                this.props.history.push('/page/' + this.state.pageId)
            }
        })
    }

    savePage() {
        if (this.state.name && this.state.description) {
            axios({
                method: 'PATCH',
                url: BASE_API_URL + '/pages/' + this.state.pageId,
                data: {
                    name: this.state.name,
                    description: this.state.description
                }
            })
            .then(updatedPage => {
                console.log(updatedPage)
            })
        }
    }

    addBand() {
        axios({
            method: 'POST',
            url: BASE_API_URL + '/pages/' + this.state.pageId + '/bands',
            data: {
                header: "New Band for your page",
                text_content: "This band belongs to " + this.state.name
            }
        })
        .then(createdBand => {
            createdBand = createdBand.data.createdModel
            this.setState(currentState => ({
                bands: [...currentState.bands, createdBand]
            }))
        })
    }

    deleteBand(bandId) {
        axios({
            method: 'DELETE',
            url: BASE_API_URL + '/pages/' + this.state.pageId + '/bands/' + bandId,
        })
        .then(() => {
            this.setState(currentState => ({
                bands: currentState.bands.filter(band => band.id !== bandId)
            }))
        })
    }

    renderPage() {
        let bandsToRender = this.state.bands.map((band) => {
            return <Band key={band.id} band={band} edit={this.state.edit} deleteBand={this.deleteBand.bind(this)}/>
        })

        return (
            <div>
                <Jumbotron>
                    {this.state.edit ? (
                        <div>
                            <Button color="warning" onClick={this.toggleEditing}>
                                Stop editing
                            </Button>
                            <Button color="primary" onClick={this.addBand}>
                                Add band +
                            </Button>
                        </div>
                    ) : (
                        <Button color="warning" onClick={this.toggleEditing}>
                            Edit
                        </Button>
                        )}
                    <h1>
                        <ContentEditable
                            html={this.state.name}
                            disabled={!this.state.edit}
                            onBlur={(e) => this.setPageState(e)}
                            name="name"
                        >
                        </ContentEditable>
                    </h1>
                    <h3>
                        <ContentEditable
                            html={this.state.description}
                            disabled={!this.state.edit}
                            onBlur={(e) => this.setPageState(e)}
                            name="description"
                        >
                        </ContentEditable>
                    </h3>



                </Jumbotron>

                <div>
                    {bandsToRender}
                </div>
            </div>
        )
    }

    render() {
        if (this.state.loadingPage) {
            return (
                <h1>
                    Loading your page.
                </h1>
            )
        } else if (!this.state.loadingPage && this.state.pageNotFound) {
            return (
                <h1>
                    Page not found
                </h1>
            )
        } else if (this.state.name) {
            return this.renderPage(this.state.page)
        }
    }   
}

Page.propTypes = {
    pageId: PropTypes.number,
    edit: PropTypes.bool,
}

export default withRouter(Page);