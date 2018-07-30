import React, { Component } from 'react';
import PropTypes from "prop-types";
import {connect} from 'react-redux'
import CoinsModal from './CoinsModal'
import {loginPrompt} from '../actions/User/actions'


class BuyFileButton extends Component {
    constructor(props){
        super(props);

        this.state = {
            coinModal: false,
            coinPromise: {},
            checkingBalance: false,
            selectedCoin: undefined,
            filePrice: undefined
        }

        this.buyFile = this.buyFile.bind(this);
        this.createPriceString = this.createPriceString.bind(this);
        this.checkLogin = this.checkLogin.bind(this)
        this.chooseCoin = this.chooseCoin.bind(this)
        this.pay = this.pay.bind(this)
        this.coinbaseModal = this.coinbaseModal.bind(this)
        this.toggleCoinModal = this.toggleCoinModal.bind(this)
        this.onCoinClick = this.onCoinClick.bind(this)
        this.checkModal = this.checkModal.bind(this)
        // this.checkBalance = this.checkBalance.bind(this)
    }
    toggleCoinModal() {
        this.setState({coinModal: !this.state.coinModal}, this.checkModal)
        console.log(this.state.coinModal)
    }
    checkModal() {
        if (!this.state.coinModal && this.state.coinModalPromise.rej)
            this.state.coinModalPromise.rej()
    }

    pay(coin) {
        if (this.props.activeFile.owned){
            this.downloadStarted = true;
        } else {
            this.props.buyInProgress(this.props.activeFile.key)

            this.props.User.Account.payForArtifactFile(this.props.artifact, this.props.activeFile.info, "buy", coin, "usd")
                .then(data => {
                    this.props.buyFile(this.props.activeFile.key)
                    this.setState({coinModal:false})
                    console.log('Successfully bought file: ', data)
                    this.props.setCurrentFile(this.props.artifact, this.props.activeFile);
                })
                .catch(err => {
                    this.props.buyError(this.props.activeFile.key)
                    this.state.coinModalPromise.rej(err)
                    this.setState({coinModal:false})
                    console.log("Error while trying to pay for artifact file: ", err)
                })
        }
    }
    coinbaseModal() {
        return new Promise( (res, rej) => {
            if (false)
                res()
            rej()
        })
    }

    onCoinClick(e) {
        console.log(e.target.alt)
        let coin = e.target.alt
        if (coin === "bitcoin" || coin === "flo" || coin === "litecoin") {
            this.setState({
                    checkingBalance: true,
                    selectedCoin: e.target.alt
            }
            // , this.checkBalance
            )
            this.state.coinModalPromise.res(coin)
        }
        this.state.coinModalPromise.rej()
    }
    chooseCoin(price) {
        return new Promise( (res, rej) => {
            this.setState({
                coinModal: true,
                coinModalPromise: {res: res, rej: rej},
                filePrice: price
            })
        })
    }
    checkLogin() {
        return new Promise( (res, rej) => {
            if (this.props.User.isLoggedIn) {
                res()
            }
            rej()
        })
    }
    buyFile(filePrice){
        this.checkLogin()
            .then( () => {
                //choose only coins that the artifact accepts
                this.chooseCoin(filePrice)
                    .then( (coin) => {
                       this.pay(coin)
                    })
                    .catch( () => {
                        console.log("Payment process canceled")
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
                {this.state.coinModal ?
                    <CoinsModal
                        acc={this.props.User.Account}
                        isOpen={this.state.coinModal}
                        toggleCoinModal={this.toggleCoinModal}
                        onCoinClick={this.onCoinClick}
                        className="coin-modal"
                        checkingBalance={this.state.checkingBalance}
                    /> : null}
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
