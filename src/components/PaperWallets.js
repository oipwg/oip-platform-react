import React, { Component } from 'react';
import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';

import PaperWallet from './PaperWallet.js';

import { COIN_CONFIGS } from './CoinCard.js';

import '../assets/css/paper-wallet.css';

class PaperWallets extends Component {
	constructor(props){
		super(props);

		this.state = {
			popoverOpen: false
		}

		this.toggle = this.toggle.bind(this);
	}
	toggle(){
		this.setState({
			popoverOpen: !this.state.popoverOpen
		})
	}
	render() {
		return (
			<div className="paper-wallets">
				<div className="pw-wallet-container">
					<PaperWallet coinName="bitcoin" explorer="blockchain.info" logo={COIN_CONFIGS.bitcoin.logo} bg={COIN_CONFIGS.bitcoin.paperWalletBG} public={"19fvQi1Ngk6hhb3NvNk1oz8rQGBztLsFL3"} private={"5JCTwdMwFVgSkkpGFLMPXgLJvkD7JfK9q62THRfwZztSrrPBwQu"} />
				</div>
				<div className="pw-wallet-container">
					<PaperWallet coinName="florincoin" explorer="florincoin.info" logo={COIN_CONFIGS.florincoin.logo} bg={COIN_CONFIGS.florincoin.paperWalletBG} public={"FMRw6pdBQwCSf2XJVzaoHg5XwWd3TKwkRp"} private={"6vLj5Mov8P1UyLRC9fCGscM5qNNZpCe1yTteZNKAoNNDWXUtaMc"} />
				</div>
				<div className="pw-wallet-container">
					<PaperWallet coinName="litecoin" explorer="any litecoin explorer" logo={COIN_CONFIGS.litecoin.logo} bg={COIN_CONFIGS.litecoin.paperWalletBG} public={"LLrsJw73rEbC7ekuq6tuTyhhUQtjw4J1Qj"} private={"6vULY3zaqqGfNhz1tDaiZmKAsGH2eGnEfMbV9mbmpz63Zc6C41R"} />
				</div>
			</div>
		);
	}
}

export default PaperWallets;