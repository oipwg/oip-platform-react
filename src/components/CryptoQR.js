import React, { Component } from 'react';

import QRCode from 'qrcode.react';

class CryptoQR extends Component {
	render() {
		let qrString = "";

		if (this.props.type === "receive"){
			qrString = this.props.coin + ":" + this.props.address;
		}

		return (
			<QRCode value={qrString} size={this.props.size} />
		);
	}
}

export default CryptoQR;