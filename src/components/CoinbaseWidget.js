import React from 'react';

class CoinbaseWidget extends React.Component {
    render() {
        return (
            <a className="coinbase_widget"
               id="coinbase_widget"
               data-address={this.props.address}
               data-amount={this.props.amount}
               data-code="27b2f6dd-f065-5df0-ab77-718cdf968ab3"
               data-currency="USD"
               data-crypto_currency={this.props.crypto_currency}
               href="">Buy with Coinbase</a>

         )
    }
}

export default CoinbaseWidget