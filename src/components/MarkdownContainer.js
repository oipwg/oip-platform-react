import React, { Component } from 'react';
import axios from 'axios';

var ReactMarkdown = require('react-markdown');

class MarkdownContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            markdownURL: "",
            markdownData: ""
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.Artifact != prevState.Artifact || nextProps.ActiveFile != prevState.ActiveFile) {
            return {
                markdownURL: nextProps.buildIPFSURL(nextProps.Artifact.getLocation() + "/" + nextProps.ActiveFile.info.getFilename())
            }
        } else {return null}
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.markdownData == "" || prevState.markdownURL != this.state.markdownURL) {
            let _this = this;
            this.serverRequest = axios
                .get(this.state.markdownURL)
                .then(function(result) {
                    _this.setState({
                        markdownData: result.data
                    });
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
	}

    componentWillUnmount(){
        if (this.serverRequest){
            try {
                this.serverRequest.abort();
            } catch(e){}
        }
    }

    render() {
        return (
            <div className="justify-content-center markdownContainer" style={{height: "100%"}}>
                <ReactMarkdown source={this.state.markdownData} />
            </div>
        );
    }
}

MarkdownContainer.SUPPORTED_FILE_TYPES = ["md"]

export default MarkdownContainer;