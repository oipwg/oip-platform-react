import React, { Component } from 'react';

class ButtonCheckbox extends Component {
	render() {
		return (
			<span className="button-checkbox">
				<button type="button" className={"btn btn" + (this.props.toggleState ? "-success" : "-danger btn-outline-danger") } onClick={this.props.onClick}>
				{this.props.text}
			</button>
			</span>
		);
	}
}

export default ButtonCheckbox;