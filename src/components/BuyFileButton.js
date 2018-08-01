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

    pay(coin) {
        if (this.props.activeFile.owned){
            this.downloadStarted = true;
        } else {
            this.props.buyInProgress(this.props.activeFile.key)

            this.props.User.Account.pay(undefined, undefined, undefined)
                .then(data => {
                    this.props.buyFile(this.props.activeFile.key)

                })
                .catch(err => {
                    this.props.buyError(this.props.activeFile.key)

                })
        }
    }
    coinbaseModal() {
        return new Promise( (res, rej) => {
          this.setState({coinbaseModal: true})
        })
    }

    attemptPayment() {
        return new Promise( (res, rej) => {
            let acc = this.props.account;
            let ap = acc.getPaymentBuilder(this.props.account.wallet, this.props.artifact, this.props.activeFile.info, "buy")

            this.setState({
                ap: ap,
                addresses: this.props.wallet.addresses,
                supportedCoins: ap.getSupportedCoins()
            });
            ap.getCoinsWithSufficientBalance(this.props.wallet.cryptoBalances, undefined, undefined, {all: true})
                .then(ret => {
                    (Object.keys(ret).length === 0 && ret.constructor === Object) ? rej({error: "Insufficient balances"}) : res(ret)
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
        this.checkLogin()
            .then( () => {
                //choose only coins that the artifact accepts
                this.attemptPayment()
                    .then(ret => {
                        console.log(ret)
                        //pay
                    })
                    .catch(err => {
                        if (err.error) {
                            this.toggleRefillModal()
                        } else {alert(err)}
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

        if (this.props.activeFile){
            if (this.props.activeFile.owned){
                owned = true;
            }
            if (this.props.activeFile.hasPaid){
                hasPaid = true;
            }
            if (this.props.activeFile.buyInProgress){
                buyInProgress = true;
            }
            if (this.props.activeFile.buyError){
                buyError = true;
            }

            if (this.props.activeFile.info) {
                if (this.props.activeFile.info.getSuggestedBuyCost()){
                    sugBuy = this.props.activeFile.info.getSuggestedBuyCost();
                }
                if (this.props.activeFile.info.getDisallowBuy){
                    disallowBuy = this.props.activeFile.info.getDisallowBuy();
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
