import React, { Component } from 'react';

class ImageContainer extends Component {
	render() {
		return (
			<img src={this.props.url} style={{maxWidth: "100%", maxHeight:"100%", display: "block",margin: "0 auto"}} />
		);
	}
}

export default ImageContainer;