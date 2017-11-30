import React, { Component } from 'react';

class ButtonCheckbox extends Component {
	render() {
		return (
			<span className="button-checkbox">
				<button style={this.props.style} type="button" className={"btn btn-" + (this.props.toggleState ? "" : "outline-") + (this.props.color ? this.props.color : "primary") + (this.props.toggleState ? "" : "")} onClick={this.props.onClick}>
				<i className={"fa fa-" + (this.props.toggleState ? "check-square-o" : "square-o")} style={this.props.iconStyle}></i> {this.props.text}
			</button>
			</span>
		);
	}
}

export default ButtonCheckbox;