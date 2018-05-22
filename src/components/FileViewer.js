import React, { Component } from 'react';

import AudioContainer from './AudioContainer.js';
import VideoPlayer from './VideoPlayer.js';
import ImageContainer from './ImageContainer.js';
import ViewerJSPlayer from './ViewerJSPlayer.js';
import HTMLContainer from './HtmlContainer.js';
import CodeContainer from './CodeContainer.js';
import STLContainer from './StlContainer.js';
import TextViewer from './TextViewer';

var PLAYERS = [
	AudioContainer, 
	VideoPlayer, 
	ImageContainer, 
	ViewerJSPlayer,
	HTMLContainer,
	CodeContainer,
	STLContainer,
	TextViewer
];

class FileViewer extends Component {
	constructor(props){
		super(props);
	}

	render() {
		let extension, fileViewerComponent;

		if (this.props.ActiveFile && this.props.ActiveFile.info && this.props.ActiveFile.info.getFilename()){
            let splitFilename = this.props.ActiveFile.info.getFilename().split(".");
            let indexToGrab = splitFilename.length - 1;

            extension = splitFilename[indexToGrab].toLowerCase();
		}

		if (extension){
			for (var Player of PLAYERS){
				if (Player.SUPPORTED_FILE_TYPES){
					for (var SupportedFileType of Player.SUPPORTED_FILE_TYPES){
						if (extension === SupportedFileType){
							fileViewerComponent = React.createElement(Player, {props: this.props})
						}
					}
				}
			}
		}

		if (!fileViewerComponent){
			fileViewerComponent = <div style={{height: "100%", width: "100vw", maxWidth: "100vw"}}><h1 style={{color: "#fff", textAlign: "center", marginTop: "10%"}}>Unsupported File Format (.{extension})</h1></div>;
		}

		return fileViewerComponent;
	}
}

export default FileViewer;