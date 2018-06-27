import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import CoinCard from './CoinCard.js';
import TransactionTable from './TransactionTable.js'

class WalletContainer extends Component {
	render() {
		return (
			<div className="container">
                <div className="row no-gutters mt-3 bg-white shadow-sm">
                    <div className="col-12">
                        <div className="pb-2 pt-3 pl-3 text-primary" style={{fontWeight: "600"}}>Wallet</div>
                    </div>
                    <hr className="w-100 m-1"/>
                    <div className="row no-gutters mt-2 w-100">
                        <div className="col py-2 pl-3 d-flex justify-content-start font-weight-light mt-2">Total Balance</div>
                        <div className="col py-2 pr-3 d-flex justify-content-end"><h4 className="text-success my-2">$432.44</h4></div>
                    </div>
                    <hr className="w-100 m-1"/>
                    <div className="row no-gutters mt-2 w-100">
                        <div className="col-12 p-3 d-flex justify-content-end">
                            <button className="btn btn-outline-success"> Send</button>
                            <div className="mx-1"/>
                            <button className="btn btn-outline-danger"> Send</button>
                            <div className="mx-1"/>
                            <button className="btn btn-outline-warning"> Send</button>
                        </div>
                    </div>
                </div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		Wallet: state.Wallet
	}
}

WalletContainer.propTypes = {
    wallet: PropTypes.object,
    coins: PropTypes.object.isRequired,
    transactions: PropTypes.object.isRequired

}

export default connect(mapStateToProps)(WalletContainer);

// {/*<div className="">*/}
// {/*<h2 className="">Wallet</h2>*/}
// {/*</div>*/}
// {/*<div className="">*/}
// {/*{Object.keys(this.props.coins).map(coin => {*/}
// {/*if (coin === "bitcoin_testnet")*/}
// {/*return <div key={coin} />*/}
//
// {/*return <CoinCard key={coin} coin={coin} info={this.props.wallet[coin]} />*/}
// {/*})}*/}
// {/*</div>*/}
//
// {/*<h5 className="col-12 text-center mb-3">Transactions</h5>*/}
// {/*<TransactionTable transactions={this.props.transactions} />*/}