import React, { Component } from 'react';
import PropTypes from "prop-types";
import {connect} from 'react-redux'
import RefillModal from './RefillModal'

import {loginPrompt} from '../actions/User/actions'


class BuyFileButton extends Component {
    constructor(props){
        super(props);

        this.state = {
            refillModal: false
        }

        this.buyFile = this.buyFile.bind(this);
        this.createPriceString = this.createPriceString.bind(this);
        this.checkLogin = this.checkLogin.bind(this)
        this.pay = this.pay.bind(this)
        this.attemptPayment = this.attemptPayment.bind(this)
        this.toggleRefillModal = this.toggleRefillModal.bind(this)
    }

    toggleRefillModal() {
        this.setState({refillModal: !this.state.refillModal})
    }

    pay(ret) {

        console.log("attempting to send payment: ", ret)
        let coins = []
        for (let coinTicker of Object.keys(ret)) {
            coins.push(coinTicker)
        }
        let paymentAddress = this.state.paymentAddresses[coins[0]];
        let paymentAmount = ret[coins[0]].cryptoFileCost

        console.log(`Payment address: ${paymentAddress}, Payment Amount: ${paymentAmount}, Payment Coin: ${this.state.ap.tickerToName(coins[0])}`)

        if (this.props.file.isPaid && !this.props.file.hasPaid) {
            this.props.buyInProgress(this.props.file.key)
            this.state.ap.sendPayment(this.state.paymentAddresses[coins[0]], 0.0001357, this.state.ap.tickerToName(coins[0]))
                .then(data => {
                    this.props.buyFile(this.props.file.key)
                    console.log('Succesfully paid for artifact file: ', data)
                })
                .catch(err => {
                    this.props.buyError(this.props.file.key)
                    console.log("Error while trying to pay for artifact file: ", err)
                })
        }
        this.props.setCurrentFile(this.props.artifact, this.props.file);
    }


    attemptPayment() {
        return new Promise( (res, rej) => {
            let acc = this.props.account;
            let ap = acc.getPaymentBuilder(this.props.account.wallet, this.props.artifact, this.props.file.info, "buy")
            console.log("Payment amount: ", ap.getPaymentAmount())
            this.setState({
                ap: ap,
                addresses: this.props.wallet.addresses,
                supportedCoins: ap.getSupportedCoins(),
                paymentAddresses: ap.getPaymentAddresses()
            });

            console.log("Pay vars", ap.getSupportedCoins(), ap.getPaymentAmount(), this.props.wallet.cryptoBalances)
            ap.getCoinsWithSufficientBalance(this.props.wallet.cryptoBalances ? this.props.wallet.cryptoBalances : {btc: 0, ltc: 0, flo: 0},
                ap.getSupportedCoins(), ap.getPaymentAmount(), {all: true})
                .then((ret) => {
                    console.log("return val", ret)
                    if (Array.isArray(ret)) {
                        if (ret.length === 0 ) {
                            rej({error: "Insufficient Balance", ret})
                        }
                    } else {
                        if (Object.keys(ret).length > 0) {
                            res(ret)
                        } else {
                            rej({error: "Insufficient Balance ", ret})
                        }
                    }
                })
                .catch(err => rej(err))
        })
    }
    checkLogin() {
        return new Promise( (res, rej) => {
            (this.props.User.isLoggedIn ? res() : rej() )
        })
    }
    buyFile(){
        if (this.props.file.info && this.props.file.info.getSuggestedBuyCost() == 0) {
            console.log("buying file: ", this.props.file.key)
            this.props.buyFile(this.props.file.key)
            //Do I need this?
            if (this.props.file.info.getType() === 'Audio') {
                this.props.isPlayingFile(this.props.file.key, !this.props.file.isPlaying)
            }
            if (this.props.file.key !== this.props.activeFile.key) {this.props.setCurrentFile(this.props.artifact, this.props.file)}
            return
        }
        this.checkLogin()
            .then( () => {
                this.attemptPayment()
                    .then(ret => {
                        this.pay(ret)
                    })
                    .catch(err => {
                        if (err.error) {
                            console.log("attempt payment threw: ", err)
                            this.toggleRefillModal()
                        } else {alert("Need to load wallet balances first! One sec...")}
                    })
            })
            .catch( (e) => {
                this.props.loginPrompt(true)
            })
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
