import React from 'react';
import { Modal, ModalBody, ModalFooter } from 'reactstrap';
import CoinbaseModal from './CoinbaseModal'
import btc from '../assets/img/btcflat.svg'
import ltc from '../assets/img/ltcflat.svg'
import flo from '../assets/img/flo.svg'

export default class RefillModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            amount: 1,
            coinbaseModal: false,
            coin: undefined,
            sp: []
        };

        this.handleButtonEvent = this.handleButtonEvent.bind(this)
        this.toggleCoinbaseModal = this.toggleCoinbaseModal.bind(this)
        this.handleCoinSelector = this.handleCoinSelector.bind(this)
        this.onCoinbaseClose = this.onCoinbaseClose.bind(this)
        this.onCoinbaseCancel = this.onCoinbaseCancel.bind(this)
        this.onCoinbaseSuccess = this.onCoinbaseSuccess.bind(this)
    }
    componentDidMount() {
        let addrs = this.props.addresses;
        let sp = this.props.supportedCoins;
        let coin_support = false;
        for (let coin of sp) {
            if (Object.keys(addrs).includes(coin))
                coin_support = true;
        }
        this.setState({
            addrs,
            sp,
            coin_support,
            coin: sp[0]
        })
    }
    onCoinbaseClose(data) {
        console.log("Close: ", data)
    }
    onCoinbaseCancel(data) {
        console.log("Cancel: ", data)
    }
    onCoinbaseSuccess(data) {
        console.log("Success: ", data)
    }
    handleButtonEvent(e) {
        this.setState({
            amount: e.target.name
        })
    }

    toggleCoinbaseModal() {
        this.setState({coinbaseModal: !this.state.coinbaseModal})
    }
    handleCoinSelector(e) {
        this.setState({
            coin: e.target.alt
        })
    }
    render() {
        return (
            <div>
                {this.state.coinbaseModal ?
                    <CoinbaseModal currency={this.state.coin}
                                   isOpen={this.state.coinbaseModal}
                                   address={this.props.wallet.addresses[this.props.ap.tickerToName(this.state.coin)]}
                                   amount={this.state.amount}
                                   onClose={this.onCoinbaseClose}
                                   onCancel={this.onCoinbaseCancel}
                                   onSuccess={this.onCoinbaseSuccess}
                    /> : (<Modal style={{top: "22%"}} isOpen={this.props.isOpen} toggle={this.props.toggleModal} className={this.props.className}>
                        <ModalBody style={{margin: "auto", width: "100%"}} className="text-center">
                            <div className="row">
                                <div className="col-9">
                                    <div className="row no-gutters d-flex pt-3">
                                        <h2 className="font-weight-bold">Buy coins from <span style={{color: "blue"}}>Coinbase</span></h2>
                                    </div>
                                    <div className="row my-4  mb-5 no-gutters d-flex justify-content-center">
                                        {(this.state.sp && this.state.sp.length === 1 && this.state.sp.includes("flo") && this.state.coin === "flo") ? <div className="alert alert-primary" role="alert">
                                                This file only supports FLO payments. Coinbase does not yet support FLO:(
                                        </div> :
                                            <div className="btn-group" role="group" aria-label="Basic example">
                                                <button onClick={this.handleButtonEvent} name="1" type="button" className="btn btn-dark">$1</button>
                                                <button onClick={this.handleButtonEvent} name="2" type="button" className="btn btn-dark">$2</button>
                                                <button onClick={this.handleButtonEvent} name="5" type="button" className="btn btn-dark">$5</button>
                                                <button onClick={this.handleButtonEvent} name="10" type="button" className="btn btn-dark">$10</button>
                                                <button onClick={this.toggleCoinbaseModal} name="buy" type="button" className="btn btn-primary">Buy</button>
                                            </div>
                                        }
                                    </div>
                                </div>
                                <div className="col-3">
                                    <div className="row no-gutters d-flex border-left align-items-center h-100">
                                        <div className="col-12">
                                            <img className="pl-4" src={btc} onClick={this.handleCoinSelector} alt="btc" style={{height: (this.state.coin === "btc") ? "66px" : "60px"}} />
                                        </div>
                                        <div className="col-12">
                                            <img className="pl-4" src={ltc} onClick={this.handleCoinSelector} alt="ltc" style={{height: (this.state.coin === "ltc") ? "66px" : "60px"}} />
                                        </div>
                                        <div className="col-12">
                                            <img className="pl-4" src={flo} onClick={this.handleCoinSelector} alt="flo" style={{height: (this.state.coin === "flo") ? "66px" : "60px"}} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row no-gutters mt-3">{this.state.sp.includes(this.state.coin) ? "" :
                                <div className="alert alert-danger" role="alert">
                                    This coin is not supported as a payment option for this file. Feel free to deposit money into your address or buy from Coinbase if applicable.
                                </div>
                            }</div>
                            <div className="row no-gutters">
                                <div className="col-12">
                                    <div className="col-12"><h4>{this.state.coin}</h4></div>
                                    <div className="col">Balance: {this.props.cryptoBalances ? this.props.cryptoBalances[this.props.ap.tickerToName(this.state.coin)] : "Loading..."}</div>
                                    <div className="col">Address: {this.props.addresses ? this.props.addresses[this.props.ap.tickerToName(this.state.coin)] : "Loading..."} </div>
                                </div>
                            </div>


                        </ModalBody>
                        <ModalFooter>
                            <button onClick={this.props.toggleModal} className="btn btn-sm btn-secondary">Cancel</button>
                        </ModalFooter>
                    </Modal>)
                }
            </div>
        )
    }
}
