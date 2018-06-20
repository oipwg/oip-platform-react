import React, { Component } from 'react';
import PropTypes from "prop-types";

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

		this.props.setCurrentFile(this.props.artifact, this.props.file);

		let payForFile = function(artifact, file){
			_this.props.payForFileFunc(artifact, file, onSuccess, onError);
		};

		if (this.props.file.isPaid && !this.props.file.hasPaid) {
            payForFile(this.props.artifact, this.props.file.info);
		} else {
            if (this.props.file.isPlaying) {
                // PAUSE
				console.log("This File is playing, so lets pause it")
				this.props.isPlayingFile(this.props.file.key, !this.props.file.isPlaying)
            } else {
            	// Play
                console.log("This File is not playing, so lets play it")
                this.props.isPlayingFile(this.props.file.key, !this.props.file.isPlaying)
            }
        }
	}
	buyFile(){
		if (this.props.file.owned){
			this.dlStarted = true;
		} else {
			this.props.buyFileFunc(this.props.artifact, this.props.file.info, function(success){
				//scrollToTop();
			}, function(error){
				console.log(error);
			});
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

		if (this.props.file){
			if (this.props.file.owned){
				owned = true;
			}
			if (this.props.file.hasPaid){
				hasPaid = true;
			}
			if (this.props.file.paymentInProgress){
				paymentInProgress = true;
			}
			if (this.props.file.paymentError){
				paymentError = true;
			}

			if (this.props.file.info) {
				if (this.props.file.info.getSuggestedPlayCost()){
					sugPlay = this.props.file.info.getSuggestedPlayCost();
				}
				if (this.props.file.info.getSuggestedBuyCost()){
					sugBuy = this.props.file.info.getSuggestedBuyCost();
				}
				if (this.props.file.info.getDisallowPlay()){
					disallowPlay = this.props.file.info.getDisallowPlay();
				}
				if (this.props.file.info.disBuy){
					disallowBuy = this.props.file.info.getDisallowBuy();
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
    file: PropTypes.object,
    payForFileFunc: PropTypes.func,
    buyFileFunc: PropTypes.func,
    isPlayingFile: PropTypes.func,
    setCurrentFile: PropTypes.func,
    btnStyle: PropTypes.string
}

export default PaymentButtons;
