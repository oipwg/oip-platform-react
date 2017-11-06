import React, { Component } from 'react';

import PaymentButtons from './PaymentButtons.js';

class FilesTable extends Component {
	constructor(props){
		super(props);

		this.state = {
			CurrentArtifact: {
				artifact: {}
			},
			ActiveFile: {
				info: {}
			}
		}

		this.stripUnimportantFiles = this.stripUnimportantFiles.bind(this);
		this.stateDidUpdate = this.stateDidUpdate.bind(this);

		let _this = this;

		this.unsubscribe = this.props.store.subscribe(() => {
			_this.stateDidUpdate();
		});
	}
	stateDidUpdate(){
		let newState = this.props.store.getState();

		let currentArtifact = newState.CurrentArtifact;
		let active = newState.FilePlaylist.active;
		let activeFile = newState.FilePlaylist[active];

		if (currentArtifact && this.state !== currentArtifact){
			this.setState({
				CurrentArtifact: currentArtifact,
				ActiveFile: activeFile
			});
		}
	}
	componentWillUnmount(){
		this.unsubscribe();
	}
	componentDidMount(){
		this.stateDidUpdate();
	}
	stripUnimportantFiles(files){
		let newFiles = [];

		if (files && files.length <= 6){
			for (var i = 0; i < files.length; i++) {
				if (files[i].subtype !== "cover"){
					if (!files[i] || !this.state.ActiveFile || !this.state.ActiveFile.info || files[i].fname !== this.state.ActiveFile.info.fname){
						newFiles.push(JSON.parse(JSON.stringify(files[i])));
					}
				}
			}
		}
			
		return newFiles;
	}
	render() {
		let files = this.props.Core.Artifact.getFiles(this.state.CurrentArtifact.artifact)

		let filesCopy = [];

		for (var i = 0; i < files.length; i++) {
			let newObj = JSON.parse(JSON.stringify(files[i]));

			newObj.icon = this.props.Core.Artifact.getEntypoIconForType(files[i].type);

			filesCopy.push(newObj);
		}

		if (!this.props.extendedView)
			filesCopy = this.stripUnimportantFiles(filesCopy);

		let _this = this;
		return (
			<div>
				<table className="table table-sm table-striped table-bordered text-center table-hover table-responsive table-inverse" style={{width: "100%", verticalAlign: "middle"}}>
					<tbody>
						{filesCopy.map(function(file, i){
							return <tr key={i}>
										<th scope="row"><span className={"icon icon-" + file.icon} style={{margin: "auto", display: "table", marginTop: "4px"}}></span></th>
										<td style={{verticalAlign: "middle"}}>{file.subtype ? file.subtype : file.type}</td>
										<td style={{verticalAlign: "middle"}}>{file.dname ? file.dname : file.fname}</td>
										<td style={{verticalAlign: "middle", width: "230px"}}>
											<div style={{margin: "auto"}}>
												<PaymentButtons artifact={_this.state.CurrentArtifact.artifact} File={{info:file}} Core={_this.props.Core} store={_this.props.store} piwik={_this.props.piwik} />
											</div>
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