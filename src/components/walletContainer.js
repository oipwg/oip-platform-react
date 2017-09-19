import React, { Component } from 'react';

class WalletContainer extends Component {
	render() {
		return (
			<div className="container">
				<div className="row">
					<div className="col-12">
						<h2 className="text-center">Wallets</h2>
					</div>
					<div className="col-12 col-sm-6 col-md-4">
						<div className="card">
							<div className="card-body text-center">
								<h3 className="card-title"><img src="/assets/img/btcflat.svg" style={{height: "50px"}} alt="bitcoin" /> Bitcoin</h3>
								<h6 className="card-subtitle mb-2 text-muted" style={{marginBottom: "12px !important"}}>--- bits (µBTC)</h6>
								<h4 className="card-subtitle mb-2 text-muted"><span style={{color: "#28a745"}}>$--.--</span></h4>
								<div style={{height: "10px"}}></div>
								<a className="btn btn-sm btn-outline-secondary" style={{padding: "2px 5px"}}><span className="icon icon-cog"></span> Manage</a>
								<a className="btn btn-sm btn-outline-dark" style={{padding: "2px 5px"}}><span className="fa fa-qrcode"></span> Show QR</a>
								<a className="btn btn-sm btn-outline-primary" style={{padding: "2px 5px"}}><span className="icon icon-wallet"></span> Send</a>
								<a className="btn btn-sm btn-outline-success" style={{padding: "2px 5px"}}><span className="icon icon-credit"></span>Buy </a>
							</div>
							<div></div>
						</div>
					</div>
					<div className="col-12 col-sm-6 col-md-4">
						<div className="card">
							<div className="card-body text-center">
								<h3 className="card-title"><img src="/assets/img/FLOflat2.png" style={{height: "50px"}} alt="florincoin" /> Florincoin</h3>
								<h6 className="card-subtitle mb-2 text-muted" style={{marginBottom: "12px !important"}}><span id="floWalletValue"></span></h6>
								<h4 className="card-subtitle mb-2 text-muted"><span style={{color: "#28a745"}}><span id="floWalletUSD"></span></span></h4>
								<div style={{height: "10px"}}></div>
								<a className="btn btn-sm btn-outline-secondary" style={{padding: "2px 5px"}}><span className="icon icon-cog"></span> Manage</a>
								<a className="btn btn-sm btn-outline-dark" style={{padding: "2px 5px"}}><span className="fa fa-qrcode"></span> Show QR</a>
								<a className="btn btn-sm btn-outline-primary" style={{padding: "2px 5px"}}><span className="icon icon-wallet"></span> Send</a>
								<a className="btn btn-sm btn-outline-success" style={{padding: "2px 5px"}}><span className="icon icon-credit"></span>Buy </a>
								<button className="btn btn-sm btn-outline-warning" style={{marginTop: "10px"}}><span className="icon icon-upload-to-cloud"></span> Import</button>
								<button className="btn btn-sm btn-outline-primary" style={{marginTop: "10px"}}><span className="icon icon-download"></span> Backup</button>
							</div>
						</div>
					</div>
					<div className="col-12 col-sm-6 col-md-4">
						<div className="card">
							<div className="card-body text-center">
								<h3 className="card-title"><img src="/assets/img/ltcflat.svg" style={{height: "50px"}} alt="litecoin" /> Litecoin</h3>
								<h6 className="card-subtitle mb-2 text-muted" style={{marginBottom: "12px !important"}}>--- µLTC</h6>
								<h4 className="card-subtitle mb-2 text-muted"><span style={{color: "#28a745"}}>$--.--</span></h4>
								<div style={{height: "10px"}}></div>
								<a className="btn btn-sm btn-outline-secondary" style={{padding: "2px 5px"}}><span className="icon icon-cog"></span> Manage</a>
								<a className="btn btn-sm btn-outline-dark" style={{padding: "2px 5px"}}><span className="fa fa-qrcode"></span> Show QR</a>
								<a className="btn btn-sm btn-outline-primary" style={{padding: "2px 5px"}}><span className="icon icon-wallet"></span> Send</a>
								<a className="btn btn-sm btn-outline-success" style={{padding: "2px 5px"}}><span className="icon icon-credit"></span>Buy </a>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default WalletContainer;