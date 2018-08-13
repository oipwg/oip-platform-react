import React, { Component } from 'react';
import PropTypes from "prop-types";
import {connect} from 'react-redux'

class BuyFileButton extends Component {
    constructor(props){
        super(props);

        this.buyFile = this.buyFile.bind(this);
        this.createPriceString = this.createPriceString.bind(this);
    }

    buyFile(){
        if (this.props.file.info && this.props.file.info.getSuggestedBuyCost() == 0) {
            console.log("buying file: ", this.props.file.key)
            this.props.buyFile(this.props.file.key)

            if (this.props.file.info.getType() === 'Audio') {
                this.props.isPlayingFile(this.props.file.key, !this.props.file.isPlaying)
            }
            if (this.props.file.key !== this.props.activeFile.key) {this.props.setCurrentFile(this.props.artifact, this.props.file)}
            return
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

    render() {
        let hasPaid = false;
        let owned = false;
        let buyInProgress = false;
        let buyError = false;

        let disallowBuy = false;
        let sugBuy = 0;

        let buyBtnType = "outline-info";
        let buyString = "";

        if (this.props.file){
            if (this.props.file.owned){
                owned = true;
            }
            if (this.props.file.hasPaid){
                hasPaid = true;
            }
            if (this.props.file.buyInProgress){
                buyInProgress = true;
            }
            if (this.props.file.buyError){
                buyError = true;
            }

            if (this.props.file.info) {
                if (this.props.file.info.getSuggestedBuyCost()){
                    sugBuy = this.props.file.info.getSuggestedBuyCost();
                }
                if (this.props.file.info.getDisallowBuy){
                    disallowBuy = this.props.file.info.getDisallowBuy();
                }
            }

        }

        sugBuy = this.createPriceString(sugBuy);

        if (sugBuy === 0 || sugBuy === "0"){
            buyString = "Free";
        } else {
            buyString = "$" + sugBuy;
            buyBtnType = "outline-success";
        }

        if (hasPaid){
            buyBtnType = "outline-info";
            buyString = "View";
        }

        if (owned) {
            buyBtnType = "primary";
            buyString = "Download";
        }

        if (buyInProgress) {
            buyBtnType = "outline-info disabled";
            buyString = "buying...";
        }

        if (buyError) {
            buyBtnType = "outline-danger";
            buyString = "Error!";
        }
        return (
            <div style={{display: disallowBuy ? "" : "inline-block", paddingLeft: "3px"}}>
                {this.state.refillModal ? <RefillModal addresses={this.state.addresses} supportedCoins={this.state.supportedCoins}
                                                       account={this.props.account} wallet={this.props.wallet} ap={this.state.ap}
                                                       cryptoBalances={this.props.wallet.cryptoBalances}
                                                       isOpen={this.state.refillModal} toggleModal={this.toggleRefillModal}/> : ""}
                { disallowBuy ? "" :
                    <button className={"pad-5 btn btn-" + buyBtnType} onClick={() => this.buyFile()} style={this.props.btnStyle}>
                        <span className="icon icon-download" style={{marginRight: "5px"}}/> {buyString}
                    </button>
                }
            </div>
        )
    }
}

BuyFileButton.propTypes = {
    artifact: PropTypes.object,
    activeFile: PropTypes.object,
    setCurrentFile: PropTypes.func,
    btnStyle: PropTypes.string,
    buyInProgress: PropTypes.func,
    buyError: PropTypes.func,
    buyFile: PropTypes.func,
}

function mapStateToProps(state) {
    return {
        account: state.User.Account,
        User: state.User,
        wallet: state.Wallet
    }
}
const mapDispatchToProps = {
    loginPrompt
}

export default connect(mapStateToProps, mapDispatchToProps)(BuyFileButton)
