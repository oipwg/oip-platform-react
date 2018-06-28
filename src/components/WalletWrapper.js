import React from 'react'
import PropTypes from 'prop-types';

import WalletContainer from './WalletContainer';
import {COIN_CONFIGS} from "./CoinCard";

class WalletWrapper extends React.Component {
    render() {
        var coins = this.props.wallet;
        var transactions = {
            queued: [],
            unconfirmed: [],
            confirmed: { txs: [] }
        };

        for (var key in coins){
            if (typeof coins[key] !== "object"){
                delete coins[key];
            } else {
                if (coins[key].transactions){
                    var coinInfo = {}
                    try {
                        coinInfo = {
                            name: COIN_CONFIGS[key.toLowerCase()].name,
                            logo: COIN_CONFIGS[key.toLowerCase()].logo
                        }
                    } catch(e) {}
                    for (var i = 0; i < coins[key].transactions.queued.length; i++) {
                        transactions.queued.push({...coins[key].transactions.queued[i], coin: coinInfo});
                    }
                    // for (var i = 0; i < coins[key].transactions.unconfirmed.length; i++) {
                    // 	transactions.unconfirmed.push({...coins[key].transactions.unconfirmed[i], coin: coinInfo});
                    // }
                    for (var i = 0; i < coins[key].transactions.confirmed.txs.length; i++) {
                        transactions.confirmed.txs.push({...coins[key].transactions.confirmed.txs[i], coin: coinInfo});
                    }
                }
            }
        }

        let totalUSDBalance = 0;

        for (let coin in coins) {
            if (coin !== "bitcoin_testnet") {
                totalUSDBalance += coins[coin].usd
            }
        }

        return (
            <div className="wallet-wrapper h-100" style={{backgroundColor: "#F2F6F9"}}>
                <WalletContainer
                    wallet={this.props.wallet}
                    coins={coins}
                    transactions={transactions}
                    totalUSDBalance={totalUSDBalance}
                />
            </div>
        )
    }
}

WalletWrapper.propTypes = {
    wallet: PropTypes.object.isRequired
}

export default WalletWrapper;