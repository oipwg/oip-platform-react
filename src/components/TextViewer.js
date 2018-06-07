import React, { Component } from 'react';
import axios from 'axios';

class TextViewer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            textURL: "",
            textData: ""
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.Artifact != prevState.Artifact || nextProps.ActiveFile != prevState.ActiveFile) {
            return {
                textURL: nextProps.buildIPFSURL(nextProps.Artifact.getLocation() + "/" + nextProps.ActiveFile.info.getFilename())
            }
        } else {return null}
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.textData == "" || prevState.textURL != this.state.textURL) {
            let _this = this;
            this.serverRequest = axios
                .get(this.state.textURL)
                .then(function(result) {
                    _this.setState({
                        textData: result.data
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
            <div className="justify-content-center" style={{height: "100%", backgroundColor: "white", padding: "0px 90px", overflow: "scroll", whiteSpace: "pre-wrap"}}>
                <pre>{this.state.textData}</pre>
            </div>
        );
    }
}

TextViewer.SUPPORTED_FILE_TYPES = ["txt"]

export default TextViewer;