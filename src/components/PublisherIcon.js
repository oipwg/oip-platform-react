import React, { Component } from 'react';

class PublisherIcon extends Component {
	constructor(props){
		super(props);

		this.state = {
			avatarSrc: ""
		}

		this.updateAvatar = this.updateAvatar.bind(this);
		this.setDiceBearAvatar = this.setDiceBearAvatar.bind(this);
	}
	componentDidMount(){
		// Every time the state changes, log it
		this.updateAvatar(this.props)
	}
	componentWillReceiveProps(nextProps){
		if (this.props.id !== nextProps.id)
			this.updateAvatar(nextProps)
	}
	updateAvatar(props){
		if (!props.id || !props.Core)
			return;

		this.setDiceBearAvatar(props)

		var _this = this;

		props.Core.Index.getMainAddress(props.id, (success) => {
			if (success.emailmd5 && success.emailmd5 !== ""){
				_this.image.onerror = (error) => {
					_this.image.onerror = () => {};

					_this.setDiceBearAvatar(props);
				}

				_this.setState({avatarSrc: "https://www.gravatar.com/avatar/" + success.emailmd5 + "?s=200&r=pg&d=404"});
			}
		}, (error) => {  });
	}
	setDiceBearAvatar(props){
		if (!props.id)
			return

		var size = props.small ? 64 : 200;
		var randomTrueFalse = isNaN(props.id.slice(17,18));
		var gender = randomTrueFalse ? "male" : "female";

		this.setState({
			avatarSrc: "https://avatars.dicebear.com/v1/" + gender + "/" + props.id + "/" + size + ".png"
		})
	}
	render() {
		return (
			<div style={this.props.style} className="userImage">
				<img ref={image => this.image = image} style={this.props.style} src={this.state.avatarSrc} />
			</div>
		);
	}
}

export default PublisherIcon;