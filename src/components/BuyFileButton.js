import React, { Component } from 'react';
import PropTypes from "prop-types";
import {connect} from 'react-redux'

import CoinModal from './CoinModal'
import {loginPrompt} from '../actions/User/actions'


class BuyFileButton extends Component {
    constructor(props){
        super(props);

        this.state = {
            coinToPayWith: false
        }

        this.buyFile = this.buyFile.bind(this);
        this.createPriceString = this.createPriceString.bind(this);
        this.checkLogin = this.checkLogin.bind(this)
        this.chooseCoin = this.chooseCoin.bind(this)
        this.pay = this.pay.bind(this)
        this.coinbaseModal = this.coinbaseModal.bind(this)
        this.toggleCoinModal = this.toggleCoinModal.bind(this)
        this.onCoinClick = this.onCoinClick.bind(this)

    }
    toggleCoinModal() {
        this.setState({coinModal: !this.state.coinModal})
    }
    pay() {
        if (this.props.activeFile.owned){
            this.downloadStarted = true;
        } else {
            this.props.buyInProgress(this.props.activeFile.key)

            this.props.account.Account.payForArtifactFile(this.props.artifact, this.props.activeFile.info, "buy", "usd")
                .then(data => {
                    this.props.buyFile(this.props.activeFile.key)
                    console.log('Successfully bought file: ', data)
                    this.props.setCurrentFile(this.props.artifact, this.props.activeFile);
                })
                .catch(err => {
                    this.props.buyError(this.props.activeFile.key)
                    console.log("Error while trying to pay for artifact file: ", err)
                })
        }
    }
    checkLogin() {
        return new Promise( (res, rej) => {
            if (this.props.User.isLoggedIn) {
                console.log('User logged in?: ', this.props.User.isLoggedIn)
                res()
            }
            rej()
        })
    }
    onCoinClick(e) {
        console.log(e.target.alt)
        this.state.modalres(e.target.alt)
    }
    chooseCoin() {
        return new Promise( (res, rej) => {
            console.log("Choosing coin")
            this.setState({
                coinModal: true,
                modalres: res
            })

        })
    }
    coinbaseModal() {
        return new Promise( (res, rej) => {
            if (false)
                res()
            rej()
        })
    }
    buyFile(){
        this.checkLogin()
            .then( () => {
                //choose only coins that the artifact accepts
                this.chooseCoin()
                    .then( (coin) => {
                        //coin should be string
                        console.log("then coin: ", coin)
                    })
                    .catch( () => {
                        this.coinbaseModal()
                            //resolve with a coin to pay with
                            .then(this.pay)
                            .catch(() => {console.log("Decided not to pay")})
                    })
            })
            .catch( () => {
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
                {this.state.coinModal ? <CoinModal toggleCoinModal={this.toggleCoinModal} onCoinClick={this.onCoinClick} className="coin-modal"/> : null}
                { disallowBuy ? "" :
                    <button className={"pad-5 btn btn-" + buyBtnType} onClick={() => this.buyFile(sugBuy)} style={this.props.btnStyle}>
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
        account: state.Account,
        User: state.User
    }
}
const mapDispatchToProps = {
    loginPrompt
}

export default connect(mapStateToProps, mapDispatchToProps)(BuyFileButton)
