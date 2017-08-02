import React, { Component } from 'react';

class WalletContainer extends Component {
	render() {
		return (
			<div className="container">
				<h1>Wallet</h1>
				<hr />
				<div className="row text-center">
					<div className="col-12" style={{marginBottom: "10px"}}>
						<div className="card card-success card-inverse" style={{padding: "0px"}}>
							<div className="card-block">
								<h4 className="card-title"><span className="icon icon-money"></span> Total Balance: $1234.56</h4>
							</div>
						</div>
					</div>
					<div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12">
						<div className="card wallet-top-card">
							<div className="card-img-overlay">
								<h4 className="card-title"><img style={{height: "30px"}} src="/assets/img/Bitcoin.svg" alt="" /> Bitcoin</h4>
								<p className="card-text">134,143 bits</p>
							</div>
						</div>
					</div>
					<div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12">
						<div className="card wallet-top-card">
							<div className="card-img-overlay">
								<h4 className="card-title"><img style={{height: "30px"}} src="/assets/img/Litecoin.svg" alt="" /> Litecoin</h4>
								<p className="card-text">13.84 LTC</p>
							</div>
						</div>
					</div>
					<div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12">
						<div className="card wallet-top-card">
							<img className="card-img" src="/assets/img/FLOflat2.png" alt="" />
							<div className="card-img-overlay tint-a-bit">
								<h4 className="card-title">Florincoin</h4>
								<p className="card-text">34,984 bits</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default WalletContainer;