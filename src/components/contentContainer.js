import React, { Component } from 'react';

import AudioContainer from './audioContainer.js';
import VideoPlayer from './videoPlayer.js';
import ImageContainer from './imageContainer.js';
import MarkdownContainer from './markdownContainer.js';
import GameContainer from './gameContainer.js';
import PDFViewer from './pdfViewer.js';
import CodeContainer from './codeContainer.js';

class ContentContainer extends Component {
	constructor(props){
		super(props);

		let files = props.Core.Artifact.getFiles(props.artifact);
		let paid = false;
		for (let i = 0; i < files.length; i++){
			if (files[i].sugPlay !== 0 || files[i].sugBuy !== 0)
				paid = true;
		}

		this.state = {paid: paid};
	}
	componentDidMount(){
		if (this.props.artifact){
			let files = this.props.artifact['oip-041'].artifact.storage.files;
			for (let i = 0; i < files.length; i++){
				if (files[i].sugPlay !== 0 || files[i].sugBuy !== 0)
					this.setState({paid: true});
			}
		}
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.artifact){
			let files = nextProps.artifact['oip-041'].artifact.storage.files;
			for (let i = 0; i < files.length; i++){
				if (files[i].sugPlay !== 0 || files[i].sugBuy !== 0)
					this.setState({paid: true});
			}
		}
	}
	render() {
		let type, subtype, textAccess = "Access";

		if (this.props.artifact){
			type = this.props.artifact['oip-041'].artifact.type.split('-')[0];
			subtype = this.props.artifact['oip-041'].artifact.type.split('-')[1];

			if (type === "Video" || type === "Image"){
				textAccess = "View"
			} else if (type === "Audio"){
				textAccess = "Listen to"
			}
		}
		let _this = this;
		return (
			<div className="content-container">
				<div id='content' className={ this.state.paid ? "content blur" : "content"} style={this.props.type === 'text' ? {backgroundColor: "#fff"} : {display: "inline"}}>
					{ type ===  'Audio' ? <AudioContainer artifact={this.props.artifact} Core={this.props.Core} /> : '' }
					{ type ===  'Video' ? <VideoPlayer artifact={this.props.artifact} /> : '' }
					{ type ===  'Image' ? <ImageContainer artifact={this.props.artifact} paid={this.state.paid} Core={this.props.Core} /> : '' }
					{ (type ===  'Text'  && subtype !== 'PDF') ? <MarkdownContainer artifact={this.props.artifact} /> : '' }
					{ (type ===  'Text' && subtype === 'PDF') ? <PDFViewer artifact={this.props.artifact} /> : '' }
					{ type ===  'Web' ? <GameContainer artifact={this.props.artifact} /> : '' }
					{ type ===  'code' ? <CodeContainer artifact={this.props.artifact} /> : '' }
				</div>
				<div id='paywall' style={this.state.paid ? {} : {display: "none"}}>
					<div className="d-flex align-items-center justify-content-center text-center paywall-container">
						<div>
							<h4 style={{marginBottom: "0px"}}>To {textAccess} this {subtype === "Basic" ? type : subtype}</h4>
							<span>please</span>
							<br/>
							<div className="row" style={{marginTop: "15px"}}>
								<div className="col-5">
									<button className="btn btn-outline-success" onClick={function(){_this.setState({paid: false})}} style={{float:"right", marginLeft: "25px", marginRight: "-25px", padding: "5px"}}><span className="icon icon-wallet"	style={{marginRight: "5px"}}></span>Pay 3 bits</button>
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