import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from "prop-types";

class TextViewer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            textURL: "",
            textData: ""
        }

    }
    componentDidMount() {
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

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.artifact != prevState.artifact || nextProps.activeFile != prevState.activeFile) {
            return {
                textURL: nextProps.buildIPFSURL(nextProps.artifact.getLocation() + "/" + nextProps.activeFile.info.getFilename())
            }
        } else {return null}
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.textData === "" || this.state.textData === "" || prevState.textURL !== this.state.textURL) {
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
            <div className="justify-content-center" style={{height: "100%", backgroundColor: "white", padding: "0px 50px", overflow: "scroll"}}>
                <pre style={{whiteSpace: "pre-wrap", wordWrap: "break-word"}}>{this.state.textData}</pre>
            </div>
        );
    }
}

TextViewer.SUPPORTED_FILE_TYPES = ["txt"]
TextViewer.propTypes = {
    artifact: PropTypes.object.isRequired,
    activeFile: PropTypes.object.isRequired,
    buildIPFSURL: PropTypes.func.isRequired,
};

export default TextViewer;