import React, { Component } from 'react';

import Avatars from '@dicebear/avatars';
import MaleSpriteCollection from '@dicebear/avatars-male-sprites';
import FemaleSpriteCollection from '@dicebear/avatars-female-sprites';

let maleAvatars = new Avatars(MaleSpriteCollection);
let femaleAvatars = new Avatars(FemaleSpriteCollection);

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

		props.Core.Index.getPublisher(props.id, (success) => {
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

		var randomTrueFalse = isNaN(props.id.slice(17,18));
		var gender = randomTrueFalse ? "male" : "female";

		this.setState({
			avatarSrc: "data:image/svg+xml;utf8," + (gender === "male" ? maleAvatars.create(props.id) : femaleAvatars.create(props.id))
		})
	}
	render() {
		return (
			<div className="userImage">
				<img className="border-0" ref={image => this.image = image} style={{maxWidth: 20}} src={this.state.avatarSrc} />
                <span style={{fontSize: 13}} className="card-subtitle ml-2 text-muted">{this.props.pubName}</span>
			</div>
		);
	}
}

export default PublisherIcon;
