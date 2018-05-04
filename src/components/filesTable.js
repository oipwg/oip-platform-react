import React, { Component } from 'react';

import PaymentButtons from './PaymentButtons.js';

class FilesTable extends Component {
	constructor(props){
		super(props);

		this.state = {
			CurrentArtifact: {
				artifact: undefined
			},
			ActiveFile: {
				info: false
			}
		}

		this.stripUnimportantFiles = this.stripUnimportantFiles.bind(this);
		this.stateDidUpdate = this.stateDidUpdate.bind(this);
		this.getAllFiles = this.getAllFiles.bind(this);
		this.getCurrentArtifactFiles = this.getCurrentArtifactFiles.bind(this);

		let _this = this;

		this.unsubscribe = this.props.store.subscribe(() => {
			_this.stateDidUpdate();
		});
	}
	stateDidUpdate(){
		let newState = this.props.store.getState();

		let currentArtifact = newState.CurrentArtifact;
		let FilePlaylist = newState.FilePlaylist;
		let active = newState.FilePlaylist.active;
		let activeFile = newState.FilePlaylist[active];

		if (currentArtifact && this.state !== currentArtifact){
			this.setState({
				CurrentArtifact: currentArtifact,
				ActiveFile: activeFile,
				FilePlaylist
			});
		}
	}
	componentWillUnmount(){
		this.unsubscribe();
	}
	componentDidMount(){
		this.stateDidUpdate();
	}
	getAllFiles(){
		let files = [];

		if (this.state.CurrentArtifact && this.state.FilePlaylist){
			for (var key in this.state.FilePlaylist) {
				// This just makes sure we are not getting the "active" key from the FilePlaylist obj
				if (key.split("|").length === 2){
					let newObj = this.state.FilePlaylist[key];
					newObj.key = key.toString();
					files.push(newObj);
				}
			}
		}

		return files;
	}
	getCurrentArtifactFiles(){
		let files = this.getAllFiles();
		let myArtifactFiles = [];

		for (var file in files) {
			if (files[file].key.split("|")[0] === this.state.CurrentArtifact.artifact.getTXID()){
				myArtifactFiles.push(files[file]);
			}
		}

		return myArtifactFiles;
	}
	stripUnimportantFiles(files){
		let newFiles = [];

		if (files && files.length <= 6){
			for (var i = 0; i < files.length; i++) {
				if (files[i].info.subtype !== "cover"){
					if (!files[i] || !this.state.ActiveFile || !this.state.ActiveFile.info || files[i].info.getFilename() !== this.state.ActiveFile.info.getFilename()){
						newFiles.push(files[i]);
					}
				}
			}
		}

		return newFiles;
	}
	render() {
		let files = this.getCurrentArtifactFiles();

		let filesCopy = [];

		for (var i = 0; i < files.length; i++) {
			let newObj = files[i];

			newObj.info.icon = this.props.Core.util.getEntypoIconForType(files[i].info.getType());
			filesCopy.push(newObj);
		}


		if (!this.props.extendedView)
			filesCopy = this.stripUnimportantFiles(filesCopy);
		console.log(filesCopy)
		let _this = this;
		return (
			<div>
				<table className="table table-sm table-striped table-bordered text-center table-hover table-responsive table-inverse" style={{width: "100%", verticalAlign: "middle"}}>
					<tbody>
						{filesCopy.map(function(file, i){
							return <tr key={i}>
										<th scope="row"><span className={"icon icon-" + file.info.icon} style={{margin: "auto", display: "table", marginTop: "4px"}}></span></th>
										<td style={{verticalAlign: "middle"}}>{file.info.subtype ? file.info.subtype : file.info.type}</td>
										<td style={{verticalAlign: "middle"}}>{file.info.getDisplayName() ? file.info.getDisplayName() : file.info.getFilename()}</td>
										<td style={{verticalAlign: "middle", width: "230px"}}>
											<PaymentButtons artifact={_this.state.CurrentArtifact.artifact} File={file} Core={_this.props.Core} store={_this.props.store} piwik={_this.props.piwik} NotificationSystem={_this.props.NotificationSystem} />
										</td>
									</tr>
						})}
					</tbody>
				</table>
			</div>
		);
	}
}

export default FilesTable;
