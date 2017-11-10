import React, { Component } from 'react';

import { payForFileFunc, buyFileFunc } from '../actions';

class PaymentButtons extends Component {
	constructor(props){
		super(props);

		this.viewFile = this.viewFile.bind(this);
		this.buyFile = this.buyFile.bind(this);
	}
	viewFile(){
		this.props.store.dispatch(payForFileFunc(this.props.Core, this.props.artifact, this.props.File.info, this.props.piwik));
		this.scrollToTop()
	}
	buyFile(){
		this.props.store.dispatch(buyFileFunc(this.props.Core, this.props.artifact, this.props.File.info, this.props.piwik));
		//this.scrollToTop()
	}
	scrollToTop(){
		window.scrollTo(0, 0);
	}
	render() {
		let owned = false;

		let viewBtnType = "outline-info";
		let buyBtnType = "outline-info";

		let disallowPlay = false;
		let disallowBuy = false;

		let sugPlay = 0;
		let sugBuy = 0;

		let viewString = "";
		let buyString = "";

		let scale = 1;

		if (this.props.artifact){
			scale = this.props.Core.Artifact.getScale(this.props.artifact);
		}

		if (this.props.File){
			if (this.props.File.owned){
				console.log("Huzzah!");
				owned = true;	
			}
			if (this.props.File.info.sugPlay){
				sugPlay = this.props.File.info.sugPlay;
			}
			if (this.props.File.info.sugBuy){
				sugBuy = this.props.File.info.sugBuy;
			}
			if (this.props.File.info.disPlay){
				disallowPlay = this.props.File.info.disPlay;
			}
			if (this.props.File.info.disBuy){
				disallowBuy = this.props.File.info.disBuy;
			}
		}

		sugPlay = sugPlay / scale;
		sugBuy = sugBuy / scale;

		sugPlay = this.props.Core.util.createPriceString(sugPlay);
		sugBuy = this.props.Core.util.createPriceString(sugBuy);

		if (sugPlay === 0 || sugPlay === "0"){
			viewString = "Free";
		} else {
			viewString = "$" + sugPlay;
			viewBtnType = "outline-success";
		}

		if (sugBuy === 0 || sugBuy === "0"){
			buyString = "Free";
		} else {
			buyString = "$" + sugBuy;
			buyBtnType = "outline-success";
		}

		if (owned) {
			viewBtnType = "outline-info";
			viewString = "View";
			buyBtnType = "primary";
			buyString = "Download";
		}

		let _this = this;
		
		return (
			<div style={{margin: "auto"}}>
				{ disallowPlay ? "" : 
					<button  className={"pad-5 btn btn-" + viewBtnType} onClick={this.viewFile} style={this.props.btnStyle} >
						<span className="icon icon-controller-play" style={{marginRight: "5px"}}></span>{viewString}
					</button>
				}
				<span style={{padding: "0px 3px"}}></span>
				{ disallowBuy ? "" : 
					<button className={"pad-5 btn btn-" + buyBtnType} onClick={this.buyFile} style={this.props.btnStyle}>
						<span className="icon icon-download" style={{marginRight: "5px"}}></span>{buyString}
					</button>
				}
			</div>
		)
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

export default PaymentButtons;