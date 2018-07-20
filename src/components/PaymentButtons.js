import React, { Component } from 'react';
import PropTypes from "prop-types";
import {connect} from 'react-redux'

class PaymentButtons extends Component {
	constructor(props){
		super(props);

		this.viewFile = this.viewFile.bind(this);
		this.buyFile = this.buyFile.bind(this);
		this.createPriceString = this.createPriceString.bind(this);
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

		this.props.setCurrentFile(this.props.artifact, this.props.activeFile);

		if (this.props.activeFile.isPaid && !this.props.activeFile.hasPaid) {
            this.props.paymentInProgress(this.props.activeFile.key)
            this.props.account.Account.payForArtifactFile(this.props.artifact, this.props.activeFile.info, "view", "usd")
                .then(data => {
                    this.props.payForFile(this.props.activeFile.key)
                    console.log('Succesfully paid for artifact file: ', data)
                })
                .catch(err => {
                    this.props.paymentError(this.props.activeFile.key)
                    console.log("Err while trying to pay for artifact file: ", err)
                })
		}

		if (this.props.activeFile.info.getType() === 'Audio') {
            this.props.isPlayingFile(this.props.activeFile.key, !this.props.activeFile.isPlaying)
        }
	}

	buyFile(){
		if (this.props.activeFile.owned){
			this.downloadStarted = true;
		} else {
            this.props.buyInProgress(this.props.activeFile.key)
            this.props.account.Account.payForArtifactFile(this.props.artifact, this.props.activeFile.info, "buy", "usd")
                .then(data => {
                    this.props.buyFile(this.props.activeFile.key)
                    console.log('Buying yeah, ', data)
                })
                .catch(err => {
                    this.props.buyError(this.props.activeFile.key)
                    console.log("Err hard: ", err)
                })
		}
	}

    createPriceString(price){
        // This function assumes the scale has already been applied, and you are passing it a float value
        var priceStr = parseFloat(price.toFixed(3));

        if (isNaN(priceStr)){
            return 0;
        }

        let priceDecimal = priceStr - parseInt(priceStr);

        if (priceDecimal.toString().length === 3){
            priceStr = priceStr.toString() + "0";
        }

        return priceStr.toString();
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

		if (this.props.activeFile){
			if (this.props.activeFile.owned){
				owned = true;
			}
			if (this.props.activeFile.hasPaid){
				hasPaid = true;
			}
			if (this.props.activeFile.paymentInProgress){
				paymentInProgress = true;
			}
			if (this.props.activeFile.paymentError){
				paymentError = true;
			}

			if (this.props.activeFile.info) {
				if (this.props.activeFile.info.getSuggestedPlayCost()){
					sugPlay = this.props.activeFile.info.getSuggestedPlayCost();
				}
				if (this.props.activeFile.info.getSuggestedBuyCost()){
					sugBuy = this.props.activeFile.info.getSuggestedBuyCost();
				}
				if (this.props.activeFile.info.getDisallowPlay()){
					disallowPlay = this.props.activeFile.info.getDisallowPlay();
				}
				if (this.props.activeFile.info.getDisallowBuy){
					disallowBuy = this.props.activeFile.info.getDisallowBuy();
				}
			}

		}

		sugPlay = this.createPriceString(sugPlay);
		sugBuy = this.createPriceString(sugBuy);

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

PaymentButtons.propTypes = {
    artifact: PropTypes.object,
    activeFile: PropTypes.object,
    isPlayingFile: PropTypes.func,
    setCurrentFile: PropTypes.func,
    btnStyle: PropTypes.string,
    buyInProgress: PropTypes.func,
    buyError: PropTypes.func,
    buyFile: PropTypes.func,
    paymentError: PropTypes.func,
    paymentInProgress: PropTypes.func,
    payForFile: PropTypes.func
}

function mapStateToProps(state) {
    return {
        account: state.Account
    }
}

export default connect(mapStateToProps)(PaymentButtons)
