import React, { Component } from 'react';

import AudioContainer from './audioContainer.js';
import VideoPlayer from './videoPlayer.js';
import ImageContainer from './imageContainer.js';
import MarkdownContainer from './markdownContainer.js';
import HTMLContainer from './htmlContainer.js';
import PDFViewer from './pdfViewer.js';
import CodeContainer from './codeContainer.js';

class ContentContainer extends Component {
	constructor(props){
		super(props);

		this.state = {paid: false, btcPrice: 3500, mainFileSugPlay: 0, bitPrice: 1, viewString: "Pay 1 Bit"};

		this.setPricingString = this.setPricingString.bind(this);
	}
	componentDidMount(){
		if (this.props.artifact){
			if (this.props.Core){
				let paid = this.props.Core.Artifact.paid(this.props.artifact);
				let mainFileSugPlay = this.props.Core.Artifact.getMainFileSugPlay(this.props.artifact, this.props.Core.Artifact.getType(this.props.artifact));

				this.setState({paid: paid, mainFileSugPlay: mainFileSugPlay});
				
				this.setPricingString("usd", mainFileSugPlay);
			}
		}
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.artifact){
			if (nextProps.Core){
				let paid = nextProps.Core.Artifact.paid(nextProps.artifact);
				let mainFileSugPlay = nextProps.Core.Artifact.getMainFileSugPlay(nextProps.artifact, nextProps.Core.Artifact.getType(nextProps.artifact));

				this.setState({paid: paid, mainFileSugPlay: mainFileSugPlay});
				
				this.setPricingString("usd", mainFileSugPlay);
			}
		}
	}
	setPricingString(currency, amount_usd){
		if (currency === "usd"){
			this.setState({viewString: "Pay $" + parseFloat(amount_usd.toFixed(3))})
		} else if (currency === "btc_bits"){
			let _this = this;
			this.props.Core.util.calculateBTCCost(amount_usd, function(btc_price){
				let bitPrice = _this.props.Core.util.convertBTCtoBits(btc_price);
				bitPrice = parseFloat(bitPrice.toFixed(1));
				bitPrice = Math.ceil(bitPrice);
				_this.setState({viewString: "Pay " + bitPrice + " bit" + (bitPrice === 1 ? "" : "s")});
			})
		} else {
			this.setState({viewString: "Unsupported Currency for Pricing"});
		}
	}
	render() {
		let type, subtype, textAccess = "Access";

		if (this.props.artifact){
			type = this.props.artifact['oip-041'].artifact.type.split('-')[0];
			subtype = this.props.artifact['oip-041'].artifact.type.split('-')[1];

			if (type === "Video"){
				textAccess = "Watch"
			} else if (type === "Image"){
				textAccess = "View"
			} else if (type === "Audio"){
				textAccess = "Listen to"
			}
		}
		let _this = this;
		return (
			<div className="content-container">
				<div id='content' className={ this.state.paid ? "content blur" : "content"} style={this.props.type === 'text' ? {backgroundColor: "#fff"} : {display: "inline"}}>
					{ type ===  'Audio' ? <AudioContainer paid={this.state.paid} artifact={this.props.artifact} Core={this.props.Core} /> : '' }
					{ type ===  'Video' ? <VideoPlayer paid={this.state.paid} artifact={this.props.artifact} Core={this.props.Core} /> : '' }
					{ type ===  'Image' ? <ImageContainer artifact={this.props.artifact} paid={this.state.paid} Core={this.props.Core} /> : '' }
					{ (type ===  'Text'  && subtype !== 'PDF') ? <MarkdownContainer artifact={this.props.artifact} /> : '' }
					{ (type ===  'Text' && subtype === 'PDF') ? <PDFViewer artifact={this.props.artifact} Core={this.props.Core}  /> : '' }
					{ type ===  'Web' ? <HTMLContainer artifact={this.props.artifact} Core={this.props.Core}  /> : '' }
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
									<button className="btn btn-outline-success" onClick={function(){_this.setState({paid: false})}} style={{float:"right", marginLeft: "25px", marginRight: "-25px", padding: "5px"}}><span className="icon icon-wallet" style={{marginRight: "5px"}}></span>{this.state.viewString}</button>
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