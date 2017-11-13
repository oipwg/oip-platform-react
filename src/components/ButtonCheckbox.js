import React, { Component } from 'react';

class ButtonCheckbox extends Component {
	render() {
		return (
			<span className="button-checkbox">
				<button type="button" className={"btn btn-" + (this.props.toggleState ? "" : "outline-") + (this.props.color ? this.props.color : "primary") + (this.props.toggleState ? "" : " not-active")} onClick={this.props.onClick}>
				<i className={"fa fa-" + (this.props.toggleState ? "check-square-o" : "square-o")}></i> {this.props.text}
			</button>
			</span>
		);
	}
}

export default ButtonCheckbox;