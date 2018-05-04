import React, { Component } from 'react';

// import fileDownload from 'js-file-download';

import { payForFileFunc, buyFileFunc, promptLogin } from '../actions';

class PaymentButtons extends Component {
	constructor(props){
		super(props);

		this.viewFile = this.viewFile.bind(this);
		this.buyFile = this.buyFile.bind(this);
	}
	viewFile(){
		let scrollToTop = this.scrollToTop;
		let onSuccess = function(success){
			scrollToTop();
		};
		let onError = function(error){
			console.log(error);
		}
		let _this = this;
		let payForFile = function(Core, artifact, file, piwik, NotificationSystem){
			_this.props.store.dispatch(payForFileFunc(Core, artifact, file, piwik, NotificationSystem, onSuccess, onError));
		};

		payForFile(this.props.Core, this.props.artifact, this.props.File.info, this.props.piwik, this.props.NotificationSystem);
	}
	buyFile(){
		if (this.props.File.owned){
			this.dlStarted = true;
		} else {
			this.props.store.dispatch(buyFileFunc(this.props.Core, this.props.artifact, this.props.File.info, this.props.piwik, this.props.NotificationSystem, function(success){
				//scrollToTop();
			}, function(error){
				console.log(error);
			}));
		}
	}
	scrollToTop(){
		window.scrollTo(0, 0);
	}
	render() {

		let hasPaid = false;
		let owned = false;
		let paymentInProgress = false;
		let paymentError = false;

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
			scale = this.props.artifact.getPaymentScale();
		}

		if (this.props.File){
			if (this.props.File.owned){
				owned = true;
			}
			if (this.props.File.hasPaid){
				hasPaid = true;
			}
			if (this.props.File.paymentInProgress){
				paymentInProgress = true;
			}
			if (this.props.File.paymentError){
				paymentError = true;
			}

			if (this.props.File.info) {
				if (this.props.File.info.getSuggestedPlayCost()){
					sugPlay = this.props.File.info.getSuggestedPlayCost();
				}
				if (this.props.File.info.getSuggestedBuyCost()){
					sugBuy = this.props.File.info.getSuggestedBuyCost();
				}
				if (this.props.File.info.getDisallowPlay()){
					disallowPlay = this.props.File.info.getDisallowPlay();
				}
				if (this.props.File.info.disBuy){
					disallowBuy = this.props.File.info.getDisallowBuy();
				}
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

		if (hasPaid){
			viewBtnType = "outline-info";
			viewString = "View";
		}

		if (owned) {
			viewBtnType = "outline-info";
			viewString = "View";
			buyBtnType = "primary";
			buyString = "Download";
		}

		if (paymentInProgress) {
			viewBtnType = "outline-info disabled";
			viewString = "paying...";
		}

		if (paymentError) {
			viewBtnType = "outline-danger";
			viewString = "Error!";
		}

		return (
			<div>
				<div style={{width: disallowBuy ? "100%" : "50%", textAlign: disallowBuy ? "center" : "right", display: disallowPlay ? "" : "inline-block", paddingRight: "3px"}}>
				{ disallowPlay ? "" :
					<button  className={"pad-5 btn btn-" + viewBtnType} onClick={this.viewFile} style={this.props.btnStyle} >
						<span className="icon icon-controller-play" style={{marginRight: "5px"}}></span>{viewString}
					</button>
				}
				</div>
				<div style={{width: disallowPlay ? "100%" : "50%", textAlign: disallowPlay ? "center" : "left", display: disallowBuy ? "" : "inline-block", paddingLeft: "3px"}}>
				{ disallowBuy ? "" :
					<button className={"pad-5 btn btn-" + buyBtnType} onClick={this.buyFile} style={this.props.btnStyle}>
						<span className="icon icon-download" style={{marginRight: "5px"}}></span>{buyString}
					</button>
				}
				</div>
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
