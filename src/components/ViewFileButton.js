import React, { Component } from 'react';
import PropTypes from "prop-types";
import {connect} from 'react-redux'
import {loginPrompt} from '../actions/User/actions'
import RefillModal from "./RefillModal";

class ViewFileButton extends Component {
    constructor(props){
        super(props);

        this.state = {
            refillModal: false
        }

        this.viewFile = this.viewFile.bind(this);
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
        let paymentAmount = Number.parseFloat(ret[coins[0]].cryptoFileCost).toFixed(7);

        console.log(`Payment address: ${paymentAddress}, Payment Amount: ${paymentAmount}, Payment Coin: ${this.state.ap.tickerToName(coins[0])}`)


        if (this.props.activeFile.isPaid && !this.props.activeFile.hasPaid) {
            this.props.paymentInProgress(this.props.activeFile.key)
            this.state.ap.sendPayment(this.state.paymentAddresses[coins[0]], 0.0001357, this.state.ap.tickerToName(coins[0]))
                .then(data => {
                    this.props.payForFile(this.props.activeFile.key)
                   if( data ) {
                       console.log("Payment successful: ", data)
                   }
                })
                .catch(err => {
                    this.props.paymentError(this.props.activeFile.key)
                    console.log("Error while trying to pay for artifact file: ", err)
                })
        }
        this.props.setCurrentFile(this.props.artifact, this.props.activeFile);
    }
    attemptPayment() {
        return new Promise( (res, rej) => {
            let acc = this.props.account;
            let ap = acc.getPaymentBuilder(this.props.account.wallet, this.props.artifact, this.props.activeFile.info, "view")
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
                .then(ret => {
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
    viewFile(){
        if (this.props.activeFile.info && this.props.activeFile.info.getSuggestedPlayCost() == 0) {
            this.props.payForFile(this.props.activeFile.key)
            //Do I need this?
            if (this.props.activeFile.info.getType() === 'Audio') {
                this.props.isPlayingFile(this.props.activeFile.key, !this.props.activeFile.isPlaying)
            }
            this.props.setCurrentFile(this.props.artifact, this.props.activeFile);
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
                        } else {alert("Still need to load wallet balances!")}
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
        let paymentInProgress = false;
        let paymentError = false;

        let disallowPlay = false;
        let sugPlay = 0;

        let viewString = "";
        let viewBtnType = "outline-info";


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
                if (this.props.activeFile.info.getDisallowPlay()){
                    disallowPlay = this.props.activeFile.info.getDisallowPlay();
                }
            }

        }

        sugPlay = this.createPriceString(sugPlay);

        if (sugPlay === 0 || sugPlay === "0"){
            viewString = "Free";
        } else {
            viewString = "$" + sugPlay;
            viewBtnType = "outline-success";
        }

        if (hasPaid){
            viewBtnType = "outline-info";
            viewString = "View";
        }

        if (owned) {
            viewBtnType = "outline-info";
            viewString = "View";
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
            <div style={{display: disallowPlay ? "" : "inline-block", paddingRight: "3px"}}>
                {this.state.refillModal ? <RefillModal addresses={this.state.addresses} supportedCoins={this.state.supportedCoins}
                                                       account={this.props.account} wallet={this.props.wallet} ap={this.state.ap}
                                                       cryptoBalances={this.props.wallet.cryptoBalances}
                                                       isOpen={this.state.refillModal} toggleModal={this.toggleRefillModal}/> : ""}
                { disallowPlay ? "" :
                    <button  className={"pad-5 btn btn-" + viewBtnType} onClick={this.viewFile} style={this.props.btnStyle} >
                        <span className="icon icon-controller-play" style={{marginRight: "5px"}}/>{viewString}
                    </button>
                }
            </div>
        )
    }
}

ViewFileButton.propTypes = {
    artifact: PropTypes.object,
    activeFile: PropTypes.object,
    setCurrentFile: PropTypes.func,
    btnStyle: PropTypes.string,
    paymentError: PropTypes.func,
    paymentInProgress: PropTypes.func,
    payForFile: PropTypes.func,
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
export default connect(mapStateToProps, mapDispatchToProps)(ViewFileButton)
