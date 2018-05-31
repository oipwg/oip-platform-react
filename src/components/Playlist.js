import React, { Component } from 'react';

import { FormattedTime } from 'react-player-controls';

import PaymentButtons from './PaymentButtons.js';

class Playlist extends Component {
	constructor(props){
		super(props);

		this.getCurrentArtifactFiles = this.getCurrentArtifactFiles.bind(this);
		this.getAllFiles = this.getAllFiles.bind(this);

	}

	getAllFiles(){
		let files = [];

		if (this.props.Artifact && this.props.FilePlaylist){
			for (var key in this.props.FilePlaylist) {
				// This just makes sure we are not getting the "active" key from the FilePlaylist obj
				if (key.split("|").length === 2){
					let newObj = this.props.FilePlaylist[key];
					newObj.key = key.toString();
					files.push(newObj);
				}
			}
		}

		return [...files];
	}
	getCurrentArtifactFiles(){
		let files = this.getAllFiles();
		let myArtifactFiles = [];

		for (var file in files) {
			if (files[file].key.split("|")[0] === this.props.Artifact.getTXID()){
				myArtifactFiles.push(files[file]);
			}
		}

		return myArtifactFiles;
	}
	filterFiles(files, filter){
		let filteredFiles = [];

		if (filter){
			if (filter.type){
				for (var i = 0; i < files.length; i++) {
					if (files[i].info.type === filter.type){
						filteredFiles.push(files[i]);
					}
				}
			}

			return filteredFiles;
		} else {
			return files;
		}
	}
	render() {
		let _this = this;

		let DisplayFiles = [];
		let Artist = "";

		if (this.props.currentArtifactOnly){
			DisplayFiles = this.getCurrentArtifactFiles();
		} else {
			DisplayFiles = this.getAllFiles();
		}

		DisplayFiles = this.filterFiles(DisplayFiles, this.props.filter);

		if (this.props.Artifact){
			Artist = this.props.Artifact.getDetail("artist")
		}

		return (
			<ul className="list-group" style={{width: "442px"}}>
				<li className="list-group-item" style={{padding: "5px 30px", display:"flex", backgroundColor: this.props.bgColor, border: "1px solid " + this.props.mainColor}}>
					<div style={{margin: "auto"}}>
						<button className="btn btn-sm btn-outline-info"><span className="icon icon-controller-play"></span>Play All: Free</button>
						<span style={{paddingLeft: "10px"}}></span>
						<button className="btn btn-sm btn-outline-info"><span className="icon icon-download"></span> Buy All: Free</button>
					</div>
				</li>
				{DisplayFiles.map(function(file, i){
					return <li key={i} className="list-group-item" style={file.info.getFilename() === _this.props.ActiveFile.info.getFilename() ? {padding: "0px", backgroundColor: _this.props.mainColor, border: "1px solid " + _this.props.mainColor} : {padding: "0px", backgroundColor: _this.props.bgColor, border: "1px solid " + _this.props.mainColor}}>
						<div style={{padding: "4px 5px", display:"flex"}}>
							<img className="rounded" src={""} width="40px" height="40px" alt="" />
							<div style={{padding: "0px 10px", width:"235px"}}>
								<div style={file.info.getFilename() === _this.props.ActiveFile.info.getFilename() ? {color: _this.props.bgColor, fontWeight:"700",fontSize:"14px", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap"} : {color: _this.props.mainColor, fontWeight:"700",fontSize:"14px", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap"}}>{Artist}</div>
								<div style={file.info.getFilename() === _this.props.ActiveFile.info.getFilename() ? {color: _this.props.bgColor, fontSize:"12px", width: "100%", display: "flex"} : {color: _this.props.mainColor, fontSize:"12px", width: "100%", display: "flex"}}>
									<div style={{width: "200px", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap"}}>{i + 1}: {file.info.getDisplayName() ? file.info.getDisplayName() : file.info.getFilename()}</div>
									<div style={{width: "30px", textAlign: "right"}}>
										{file.info.duration > 0 ? <FormattedTime numSeconds={file.info.duration} /> : ""}
									</div>
								</div>
							</div>
							{/*<PaymentButtons  File={file} artifact={_this.props.Artifact} btnStyle={file.info.getFilename() === _this.props.ActiveFile.info.getFilename() ? {backgroundColor: _this.props.bgColor} : {}} />*/}
						</div>
					</li>
				})}
			</ul>
		);
	}
}

export default Playlist;
