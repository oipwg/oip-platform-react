import React, { Component } from 'react';

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

import moment from 'moment'

import btc_logo from '../assets/img/btcflat.svg';
import flo_logo from '../assets/img/flo.svg';
import ltc_logo from '../assets/img/ltcflat.svg';

import demoTxData from './tx-table-data.json';

class TransactionTable extends Component {
	constructor(props){
		super(props);

		this.state = {
			Wallet: {}
		};
	}
	componentWillUnmount(){

	}
	componentDidMount(){

	}
	render() {
		var passedTxs = this.props.transactions;
		var transactions = [];

		if (passedTxs){
			if (passedTxs.queued){
				for (var tx in passedTxs.queued){
					transactions.push({
						...passedTxs.queued[tx],
						"status": {
							"text": "Queued",
							"color": "#868e96"
						}
					})
				}
			}
			if (passedTxs.unconfirmed){
				for (var tx in passedTxs.unconfirmed){
					transactions.push({
						...passedTxs.unconfirmed[tx],
						"status": {
							"text": "Pending...",
							"color": "#17a2b8"
						}
					})
				}
			}
			if (passedTxs.confirmed){
				for (var t in passedTxs.confirmed.txs){
					var tx = passedTxs.confirmed.txs[t];

					var fromAddresses = [];
					for (var i in tx.vin){
						var matched = false;
						for (var j in fromAddresses){
							if (fromAddresses[j] === tx.vin[i].addr){
								matched = true;
							}
						}
						if (!matched){
							fromAddresses.push(tx.vin[i].addr);
						}
					}
					var toAddresses = [];
					var amount = 0;
					for (var i in tx.vout){
						var addedThisTime = false;
						for (var address in tx.vout[i].scriptPubKey.addresses){
							var matched = false;
							for (var j in toAddresses){
								if (toAddresses[j] === tx.vout[i].scriptPubKey.addresses[address]){
									matched = true;
								}
							}
							for (var j in fromAddresses){
								if (fromAddresses[j] === tx.vout[i].scriptPubKey.addresses[address]){
									matched = true;
								}
							}
							if (!matched){
								toAddresses.push(tx.vout[i].scriptPubKey.addresses[address]);
								if (!addedThisTime){
									addedThisTime = true;
									amount += parseFloat(tx.vout[i].value)
								}
							}
						}
					}
					var timestamp = tx.time;

					transactions.push({
						"to": toAddresses,
						"from": fromAddresses,
						"timestamp": timestamp,
						"amount": parseFloat(amount.toFixed(8)),
						"status": {
							"text": "Successful",
							"color": "#28a745"
						},
						"coin": passedTxs.confirmed.txs[t].coin
					})
				}
			}
		}

		return (
			<div>
				<ReactTable
					data={transactions}
					columns={[
						{
							Header: "Status",
							accessor: "status",
							Cell: props => <span>
								<span style={{
									color: props.value.color,
									transition: 'all .3s ease'
									}}>
									&#x25cf;
								</span>
								{' '}{props.value.text}
							</span>
						},
						{
							Header: "Date",
							accessor: "timestamp",
							Cell: props => <span>{props.value ? moment.unix(props.value).fromNow() : ""}</span>
						},
						{
							Header: "Coin",
							accessor: "coin",
							Cell: props => <span><img src={props.value.logo} alt={props.value.name} style={{width: "25px", height: "auto"}} /> {props.value.name}</span>
						},
						{
							Header: "From",
							accessor: "from"
						},
						{
							Header: "To",
							accessor: "to"
						},
						{
							Header: "Amount",
							accessor: "amount"
						}
					]}
					defaultPageSize={10}
					className="-striped -highlight"
				/>
			</div>
		);
	}
}

export default TransactionTable;