import React, { Component } from 'react';
import PropTypes from 'prop-types';

class WalletContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            advancedWalletToggle: false
        }
        this.advancedWalletToggle = this.advancedWalletToggle.bind(this);
    }

    advancedWalletToggle() {
        this.setState({advancedWalletToggle: !this.state.advancedWalletToggle})
    }

	render() {
        return (
			<div className="wallet-container h-100 container pt-4">
                {/*Basic*/}
                <div className="custom-margin row no-gutters w-100"/>
                <div className="row no-gutters bg-white shadow-sm" >
                    <div className="col-12">
                        <div className="pb-2 pt-3 pl-3 text-primary" style={{fontWeight: "600"}}>Wallet</div>
                    </div>
                    <hr className="w-100 m-1"/>
                    <div className="row no-gutters mt-2 w-100">
                        <div className="col py-2 pl-3 d-flex justify-content-start font-weight-light mt-2">Total Balance</div>
                        <div className="col py-2 pr-3 d-flex justify-content-end"><h4 className="text-success my-2">${parseFloat(this.props.totalBalance).toFixed(2)}</h4></div>
                    </div>
                    <hr className="w-100 m-1"/>
                    <div className="row no-gutters mt-2 w-100">
                        <div className="col-12 p-3 d-flex justify-content-end">
                            <button className="btn btn-outline-warning"> Backup</button>
                            <div className="mx-1"/>
                            <button className="btn btn-outline-danger"> Receive</button>
                            <div className="mx-1"/>
                            <button className="btn btn-outline-primary"> Send </button>
                        </div>
                    </div>
                    <hr className="w-100 m-1"/>
                    <div className="row no-gutters mt-2 w-100">
                        <div className="col-12 p-1 d-flex justify-content-end">
                            <p className="pr-2 py-2 mb-2 font-weight-light"
                                style={{fontSize: "13px", cursor: "pointer"}}
                                onClick={this.advancedWalletToggle}
                            >Configure Advanced Settings</p>
                        </div>
                    </div>
                </div>
                {/*Advanced*/}
                <div className="row no-gutters mt-3 bg-white shadow-sm" style={this.state.advancedWalletToggle ? null : {display: "none"}}>
                    <div className="col-12"><span className="p-2">wtf magic</span></div>
                </div>
                {/*Transcations*/}
                <div className="row no-gutters mt-3 bg-white shadow-sm" style={this.state.advancedWalletToggle ? {display: "none"} : null }>
                    <div className="col-12">
                        {/*<TransactionTable transactions={this.props.transactions}/>*/}
                        <table className="table table-striped table-responsive">
                            <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">From</th>
                                <th scope="col">To</th>
                                <th scope="col">Amount</th>
                            </tr>
                            </thead>
                            <tbody>

                            </tbody>
                        </table>
                    </div>
                </div>

			</div>
		);
	}
}

WalletContainer.propTypes = {
    account: PropTypes.object,
    totalBalance: PropTypes.number
}

export default WalletContainer
