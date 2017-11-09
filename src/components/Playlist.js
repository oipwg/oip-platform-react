import React, { Component } from 'react';

import PaymentButtons from './PaymentButtons.js';

class Playlist extends Component {
	constructor(props){
		super(props);

		this.state = {

		}

		this.stateDidUpdate = this.stateDidUpdate.bind(this);
		this.getCurrentArtifactFiles = this.getCurrentArtifactFiles.bind(this);

		let _this = this;

		this.unsubscribe = this.props.store.subscribe(() => {
			_this.stateDidUpdate();
		});
	}
	stateDidUpdate(){
		let newState = this.props.store.getState();

		let CurrentArtifact = newState.CurrentArtifact;
		let FilePlaylist = newState.FilePlaylist;
		let active = newState.FilePlaylist.active;
		let currentFile = newState.FilePlaylist[active];

		if (currentFile && this.state !== currentFile){
			this.setState({CurrentArtifact: CurrentArtifact, ActiveFile: currentFile, FilePlaylist: FilePlaylist});
		}
	}
	componentDidMount(){
		this.stateDidUpdate();
	}
	componentWillUnmount(){
		this.unsubscribe();
	}
	getCurrentArtifactFiles(){
		let files = [];

		if (this.state.CurrentArtifact && this.state.FilePlaylist){
			for (var key in this.state.FilePlaylist) {
				if (key.split("|").length === 2)
					files.push(this.state.FilePlaylist[key]);
			}
		}

		return files;
	}
	render() {
		let _this = this;

		let DisplayFiles = [];
		let Artist = "";

		if (this.props.currentArtifactOnly){
			DisplayFiles = this.getCurrentArtifactFiles();
			//console.log(DisplayFiles);
		}

		if (this.state.CurrentArtifact && this.state.CurrentArtifact.artifact){
			Artist = this.props.Core.Artifact.getArtist(this.state.CurrentArtifact.artifact)
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
					return <li key={i} className="list-group-item" style={file.info.fname === _this.state.ActiveFile.info.fname ? {padding: "0px", backgroundColor: _this.props.mainColor, border: "1px solid " + _this.props.mainColor} : {padding: "0px", backgroundColor: _this.props.bgColor, border: "1px solid " + _this.props.mainColor}}>
						<div style={{padding: "4px 5px", display:"flex"}}>
							<img className="rounded" src={""} width="40px" height="40px" alt="" />
							<div style={{padding: "0px 10px", width:"235px"}}>
								<div style={file.info.fname === _this.state.ActiveFile.info.fname ? {color: _this.props.bgColor, fontWeight:"700",fontSize:"14px", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap"} : {color: _this.props.mainColor, fontWeight:"700",fontSize:"14px", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap"}}>{Artist}</div>
								<div style={file.info.fname === _this.state.ActiveFile.info.fname ? {color: _this.props.bgColor, fontSize:"12px", width: "235px", display: "flex"} : {color: _this.props.mainColor, fontSize:"12px", width: "235px", display: "flex"}}>
									<div style={{width: "200px", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap"}}>{i + 1}: {file.info.dname ? file.info.dname : file.info.fname}</div>
									<div style={{width: "30px", textAlign: "right"}}>{file.info.length ? file.info.length : ""}</div>
								</div>
							</div>
							<PaymentButtons Core={_this.props.Core} store={_this.props.store} File={file} artifact={_this.state.CurrentArtifact.artifact} btnStyle={file.info.fname === _this.state.ActiveFile.info.fname ? {backgroundColor: _this.props.bgColor} : {}} />
						</div>
					</li>
				})}
			</ul>
		);
	}
}

export default Playlist;