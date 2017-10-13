import React, { Component } from 'react';

import AudioContainer from './audioContainer.js';
import VideoPlayer from './videoPlayer.js';
import ImageContainer from './imageContainer.js';
import TextViewer from './TextViewer.js';
import HTMLContainer from './htmlContainer.js';
import CodeContainer from './codeContainer.js';

class ContentContainer extends Component {
	constructor(props){
		super(props);

		this.state = {paid: false, btcPrice: 3500, mainFileSugPlay: 0, bitPrice: 1, viewString: "1 Bit", buyString: "", mainFileSugBuy: 0, disPlay: false, disBuy: false};

		this.setPricingString = this.setPricingString.bind(this);
	}
	componentWillMount(){
		if (this.props.artifact){
			if (this.props.Core){
				let paid = this.props.Core.Artifact.paid(this.props.artifact);
				let mainFileSugPlay = this.props.Core.Artifact.getMainFileSugPlay(this.props.artifact, this.props.Core.Artifact.getType(this.props.artifact));
				let mainFileSugBuy = this.props.Core.Artifact.getMainFileSugBuy(this.props.artifact, this.props.Core.Artifact.getType(this.props.artifact));
				let mainFileDisPlay = this.props.Core.Artifact.getMainFileDisPlay(this.props.artifact, this.props.Core.Artifact.getType(this.props.artifact));
				let mainFileDisBuy = this.props.Core.Artifact.getMainFileDisBuy(this.props.artifact, this.props.Core.Artifact.getType(this.props.artifact));

				console.log(mainFileDisBuy,mainFileDisPlay);

				this.setState({paid: paid, mainFileSugPlay: mainFileSugPlay, mainFileSugBuy: mainFileSugBuy, disPlay: mainFileDisPlay, disBuy: mainFileDisBuy});
				
				this.setPricingString("usd", mainFileSugPlay, mainFileSugBuy);
			}
		}
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.artifact && this.props.artifact !== nextProps.artifact){
			if (nextProps.Core){
				let paid = nextProps.Core.Artifact.paid(nextProps.artifact);
				let mainFileSugPlay = nextProps.Core.Artifact.getMainFileSugPlay(nextProps.artifact, nextProps.Core.Artifact.getType(nextProps.artifact));
				let mainFileSugBuy = nextProps.Core.Artifact.getMainFileSugBuy(nextProps.artifact, nextProps.Core.Artifact.getType(nextProps.artifact));
				let mainFileDisPlay = nextProps.Core.Artifact.getMainFileDisPlay(nextProps.artifact, nextProps.Core.Artifact.getType(nextProps.artifact));
				let mainFileDisBuy = nextProps.Core.Artifact.getMainFileDisBuy(nextProps.artifact, nextProps.Core.Artifact.getType(nextProps.artifact));

				this.setState({paid: paid, mainFileSugPlay: mainFileSugPlay, mainFileSugBuy: mainFileSugBuy, disPlay: mainFileDisPlay, disBuy: mainFileDisBuy});
				
				this.setPricingString("usd", mainFileSugPlay, mainFileSugBuy);
			}
		}
	}
	setPricingString(currency, view_amount_usd, buy_amount_usd){
		if (currency === "usd"){
			let sugPlay = parseFloat(view_amount_usd.toFixed(3));
			let sugBuy = parseFloat(buy_amount_usd.toFixed(3));

			if (isNaN(sugPlay)){
				sugPlay = 0;
			}
			
			if (isNaN(sugBuy)){
				sugBuy = 0;
			}

			let playDecimal = sugPlay - parseInt(sugPlay);
			let buyDecimal = sugBuy - parseInt(sugBuy);

			if (playDecimal.toString().length === 3){
				sugPlay = sugPlay.toString() + "0";
			}
			if (buyDecimal.toString().length === 3){
				sugBuy = sugBuy.toString() + "0";
			}

			let viewString = "";
			let buyString = "";

			if (sugPlay === 0 || sugPlay === "0")
				viewString = "Free";
			else
				viewString = "$" + sugPlay;

			if (sugBuy === 0 || sugBuy === "0")
				buyString = "Free";
			else
				buyString = "$" + sugBuy;

			this.setState({viewString: viewString, buyString: buyString})
		} else if (currency === "btc_bits"){
			let _this = this;
			this.props.Core.util.calculateBTCCost(view_amount_usd, function(btc_price){
				let bitPrice = _this.props.Core.util.convertBTCtoBits(btc_price);
				bitPrice = parseFloat(bitPrice.toFixed(1));
				bitPrice = Math.ceil(bitPrice);
				_this.setState({viewString: bitPrice + " bit" + (bitPrice === 1 ? "" : "s")});
			})
			this.props.Core.util.calculateBTCCost(buy_amount_usd, function(btc_price){
				let bitPrice = _this.props.Core.util.convertBTCtoBits(btc_price);
				bitPrice = parseFloat(bitPrice.toFixed(1));
				bitPrice = Math.ceil(bitPrice);
				_this.setState({buyString: bitPrice + " bit" + (bitPrice === 1 ? "" : "s")});
			})
		} else {
			this.setState({viewString: "Unsupported Currency for Pricing", buyString: "Unsupported Currency for Pricing"});
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
				<div id='content' className={ this.state.paid ? "content blur" : "content"} style={this.state.paid  ? {display: "block"} : {display: "inline"}}>
					{ type ===  'Audio' ? <AudioContainer paid={this.state.paid} artifact={this.props.artifact} Core={this.props.Core} /> : '' }
					{ type ===  'Video' ? <VideoPlayer paid={this.state.paid} artifact={this.props.artifact} Core={this.props.Core} /> : '' }
					{ type ===  'Image' ? <ImageContainer artifact={this.props.artifact} paid={this.state.paid} Core={this.props.Core} setCurrentFile={this.props.setCurrentFile} CurrentFile={this.props.CurrentFile} /> : '' }
					{ type ===  'Text' ? <TextViewer artifact={this.props.artifact} Core={this.props.Core} /> : '' }
					{ type ===  'Web' ? <HTMLContainer artifact={this.props.artifact} Core={this.props.Core}  /> : '' }
					{ type ===  'code' ? <CodeContainer artifact={this.props.artifact} /> : '' }
				</div>
				<div id='paywall' style={this.state.paid ? {} : {display: "none"}}>
					<div className="d-flex align-items-center justify-content-center text-center paywall-container">
						<div style={{width: "80%"}}>
							<h4 style={{marginBottom: "0px"}}>To {textAccess} this {subtype === "Basic" ? type : subtype}</h4>
							<span>please</span>
							<br/>
							<div className="col-12 text-center" style={{marginTop: "15px"}}>
								{this.state.disPlay ? "" : <button className={this.state.viewString === "Free" ? "btn btn-outline-info" : "btn btn-outline-success"} onClick={function(){_this.setState({paid: false})}} style={{padding: "5px"}}><span className="icon icon-controller-play" style={{marginRight: "5px"}}></span>{this.state.viewString}</button>}
								<span style={{padding: "0px 3px"}}></span>
								{this.state.disBuy ? "" : <button className={this.state.buyString === "Free" ? "btn btn-outline-info" : "btn btn-outline-success"} style={{padding: "5px"}}><span className="icon icon-download" style={{marginRight: "5px"}}></span>{this.state.buyString}</button>}
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