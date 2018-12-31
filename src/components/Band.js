import React, { Component } from 'react';
import axios from 'axios';
import ContentEditable from 'react-contenteditable';
import { BASE_API_URL } from '../App';
import { Button } from 'reactstrap';

class Band extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pageId: props.band.PageId,
            header: props.band.header,
            text_content: props.band.text_content,
            // Add other attributes/elements later on
        }

        this.updateBand = this.updateBand.bind(this)
        
    }

    updateBand(evt) {
        let stateToUpdate = evt.target.getAttribute('name')
        let updatedState = evt.target.textContent

        this.setState({
            [stateToUpdate]: updatedState
        }, this.saveBand)
    }

    saveBand() {
        if (this.state.header && this.state.text_content) {
            axios({
                method: 'PATCH',
                url: BASE_API_URL + '/pages/' + this.state.pageId + '/bands/' + this.props.band.id,
                data: {
                    header: this.state.header,
                    text_content: this.state.text_content
                }
            })
            .then(updatedBand => {
                console.log(updatedBand)
            })
        }
    }

    render() {
        return (
            <div>
                <hr/>
                <h3>
                    <ContentEditable
                        html={this.state.header}
                        disabled={!this.props.edit}
                        onBlur={(e) => this.updateBand(e)}
                        name="header"
                    >
                    </ContentEditable>
                </h3>

                <div>
                    <ContentEditable
                        html={this.state.text_content}
                        disabled={!this.props.edit}
                        onBlur={(e) => this.updateBand(e)}
                        name="text_content"
                    >
                    </ContentEditable>
                </div>

                {this.props.edit ? (
                    <Button color="danger" onClick={(e) => this.props.deleteBand(this.props.band.id, e)}>
                        Delete Band
                    </Button>
                ) : null }



                <hr/>
            </div>
        )
    }
}

export default Band;