import React, { Component } from 'react';
import axios from 'axios';

var ReactMarkdown = require('react-markdown');

class TextViewer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            markdown: ""
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.Artifact != prevState.Artifact || nextProps.ActiveFile != prevState.ActiveFile) {
            return {
                Artifact: nextProps.Artifact,
                ActiveFile: nextProps.ActiveFile,
                markdown: nextProps.buildIPFSURL(nextProps.Artifact.getLocation() + "/" + nextProps.ActiveFile.info.getFilename())
            }
        } else {return null}
    }

    componentDidUpdate(prevProps, prevState) {
		if (prevState.markdown != this.state.markdown) {
            let _this = this;

            this.serverRequest = axios
                .get(this.state.markdown)
                .then(function(result) {
                    _this.setState({
                        markdown: result.data
                    });
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
            <div className="justify-content-center markdownContainer" style={{height: "100%", margin: "0px auto"}}>
                <ReactMarkdown source={this.state.markdown} />
            </div>
        );
    }
}

TextViewer.SUPPORTED_FILE_TYPES = ["md", "txt"]

export default TextViewer;