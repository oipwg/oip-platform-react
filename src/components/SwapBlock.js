import React, { Component } from 'react';

import { COIN_CONFIGS } from './CoinCard.js';

class SwapBlock extends Component {
	render() {
		return (
			<div style={{width: "100%"}}>
				<h2>Swap Required</h2>
				<p>Your wallet only has COIN_1 but needs COIN_2 to complete this payment, please select the amount (in USD) that you want to swap from COIN_1 to COIN_2.</p>
				<div style={{display: "flex"}}>
					<div className="card" style={{width: "45%", margin: "auto"}}>
						<div className="card-body">
							<img src={COIN_CONFIGS.bitcoin.logo} alt="Bitcoin Logo" />
							<h4>Bitcoin</h4>
							{/*<h5>$1234</h5>*/}
						</div>
					</div>
					<div className="card" style={{width: "45%", margin: "auto"}}>
						<div className="card-body">
							<img src={COIN_CONFIGS.litecoin.logo} alt="Litecoin Logo" />
							<h4>Litecoin</h4>
							{/*<h5>$1234</h5>*/}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default SwapBlock;