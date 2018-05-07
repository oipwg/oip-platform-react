import React, { Component } from 'react';

class ArtifactIcon extends Component {
	render() {
		var paid = false, type, icon;

		if (this.props.artifact){
			paid = this.props.artifact.isPaid();
			type = this.props.artifact.getType();
		}

		switch(type){
			case "Audio":
				icon = "beamed-note";
				break;
			case "Video":
				icon = "clapperboard";
				break;
			case "Image":
				icon = "image";
				break;
			case "Text":
				icon = "text";
				break;
			case "Software":
				icon = "code";
				break;
			case "Web":
				icon = "code";
				break;
			case "Research":
				icon = "lab-flask";
				break;
			case "Property":
				icon = "home";
				break;
			default:
				icon = "bug";
				break;
		}

		return (
			<div style={{display: "inline"}}>
				{ paid ? <span className="icon icon-credit" style={{color: "rgb(63, 255, 63)"}}></span> : ''}
				<span className={"icon icon-" + icon}></span>
			</div>
		);
	}
}

export default ArtifactIcon;