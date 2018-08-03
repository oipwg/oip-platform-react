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

        return (
            <div className="wallet-wrapper h-100" style={{backgroundColor: "#F2F6F9"}}>
                <WalletContainer
                    account={this.props.account}
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
        account: state.User.Account,
        User: state.User,
        wallet: state.Wallet
    }
}

export default connect(mapStateToProps)(WalletWrapper);