import React, { Component } from 'react';

import AudioContainer from './audioContainer.js';
import VideoPlayer from './videoPlayer.js';
import ImageContainer from './imageContainer.js';
import MarkdownContainer from './markdownContainer.js';
import GameContainer from './gameContainer.js';
import PDFViewer from './pdfViewer.js';
import CodeContainer from './codeContainer.js';

class ContentContainer extends Component {
	render() {
		let type, subtype;
		
		if (this.props.artifact){
			type = this.props.artifact['oip-041'].artifact.type.split('-')[0];
			subtype = this.props.artifact['oip-041'].artifact.type.split('-')[1];
		}
		

		let paid = false;

		return (
			<div className="content-container">
				<div id='content' className={ paid ? "content blur" : "content"} style={this.props.type === 'text' ? {backgroundColor: "#fff"} : {display: "inline"}}>
					{ type ===  'Audio' ? <AudioContainer /> : '' }
					{ type ===  'Video' ? <VideoPlayer artifact={this.props.artifact} /> : '' }
					{ type ===  'Image' ? <ImageContainer artifact={this.props.artifact} /> : '' }
					{ (type ===  'Text'  && subtype != 'PDF') ? <MarkdownContainer artifact={this.props.artifact} /> : '' }
					{ (type ===  'Text' && subtype === 'PDF') ? <PDFViewer artifact={this.props.artifact} /> : '' }
					{ type ===  'Web' ? <GameContainer artifact={this.props.artifact} /> : '' }
					{ type ===  'code' ? <CodeContainer artifact={this.props.artifact} /> : '' }
				</div>
				<div id='paywall' style={paid ? "" : {display: "none"}}>
					<div className="d-flex align-items-center justify-content-center text-center paywall-container">
						<div>
							<h4 style={{marginBottom: "0px"}}>To Access this Content</h4>
							<span>please</span>
							<br/>
							<div className="row" style={{marginTop: "15px"}}>
								<div className="col-5">
									<button className="btn btn-outline-success" style={{float:"right", marginLeft: "25px", marginRight: "-25px", padding: "5px"}}><span className="icon icon-wallet"	style={{marginRight: "5px"}}></span>Pay 3 bits</button>
								</div>
								<div className="col-2" style={{paddingTop: "5px"}}>
									or
								</div>
								<div className="col-5">
									<button className="btn btn-outline-danger" style={{float:"left", marginRight: "25px", marginLeft: "-25px", padding: "5px"}}><span className="icon icon-controller-play" style={{marginRight: "0px"}}></span>Watch an Ad</button>
								</div>
							</div>
							<a href=""><p style={{margin: "75px 0px -75px 0px", color:"#fff", textDecoration: "underline"}}>How does this work? <span className="icon icon-help-with-circle"></span></p></a>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

/*
<div className="col-5">
	<button className="btn btn-outline-success" style={{float:"right", marginLeft: "25px", marginRight: "-25px", padding: "5px"}} onclick="unlockContent()"><span className="icon icon-wallet"	style={{marginRight: "5px"}}></span>Pay 3 bits</button>
</div>
<div className="col-2" style={{paddingTop: "5px"}}>
	or
</div>
<div className="col-5">
	<button className="btn btn-outline-danger" style={{float:"left", marginRight: "25px", marginLeft: "-25px", padding: "5px"}}><span className="icon icon-controller-play" style={{marginRight: "0px"}}></span>Watch an Ad</button>
</div>
*/

export default ContentContainer;