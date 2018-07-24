import React from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import WalletContainer from './WalletContainer';

class WalletWrapper extends React.Component {
    constructor(props) {
        super(props)

        this.state = {totalBalance: 0}
    }
    render() {
        let w = this.props.Account.Account.wallet;
        console.log("Bitcoin address: ", w.getCoin("bitcoin").getAddress(0).getPublicAddress());
        // w.getFiatBalances()
        //     .then(fiatBalances => {
        //         let balance = 0;
        //         for (let coin in fiatBalances) {
        //             if (!isNaN(fiatBalances[coin]))
        //                 balance += fiatBalances[coin]
        //         }
        //         this.setState({totalBalance: balance})
        //     })
        //     .catch(err => {console.log("Err: can't get fiat balances", err)})

        return (
            <div className="wallet-wrapper h-100" style={{backgroundColor: "#F2F6F9"}}>
                <WalletContainer
                    account={this.props.Account}
                    // totalBalance={this.state.totalBalance}
                />
            </div>
        )
    }
}

WalletWrapper.propTypes = {
    wallet: PropTypes.object.isRequired
}

function mapStateToProps(state) {
    return {
        Account: state.Account
    }
}

export default connect(mapStateToProps)(WalletWrapper);