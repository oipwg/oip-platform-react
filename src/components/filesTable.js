import React, { Component } from 'react';

import { setCurrentFile } from '../actions';

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

		this.viewFile = this.viewFile.bind(this);
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
	viewFile(file){
		this.props.store.dispatch(setCurrentFile(this.props.Core, this.state.CurrentArtifact.artifact, file));
	}
	render() {
		let files = this.props.Core.Artifact.getFiles(this.state.CurrentArtifact.artifact)

		for (var i = 0; i < files.length; i++) {
			files[i].icon = this.props.Core.Artifact.getEntypoIconForType(files[i].type);

			let sugPlay = files[i].sugPlay / this.props.Core.Artifact.getScale(this.state.CurrentArtifact.artifact);
			let sugBuy = files[i].sugBuy / this.props.Core.Artifact.getScale(this.state.CurrentArtifact.artifact);

			if (isNaN(sugPlay)){
				sugPlay = 0;
			}

			if (isNaN(sugBuy)){
				sugBuy = 0;
			}

			// eslint-disable-next-line
			let playDecimal = sugPlay - parseInt(sugPlay);
			// eslint-disable-next-line
			let buyDecimal = sugBuy - parseInt(sugBuy);

			if (playDecimal.toString().length === 3){
				sugPlay = sugPlay.toString() + "0";
			}
			if (buyDecimal.toString().length === 3){
				sugBuy = sugBuy.toString() + "0";
			}

			files[i].sugPlay = sugPlay;
			files[i].sugBuy = sugBuy;
		}

		if (!this.props.extendedView)
			files = this.stripUnimportantFiles(files);

		let _this = this;
		return (
			<div>
				<table className="table table-sm table-striped table-bordered text-center table-hover table-responsive table-inverse" style={{width: "100%", verticalAlign: "middle"}}>
					<tbody>
						{files.map(function(file, i){
							return <tr key={i}>
										<th scope="row"><span className={"icon icon-" + file.icon} style={{margin: "auto", display: "table", marginTop: "4px"}}></span></th>
										<td style={{verticalAlign: "middle"}}>{file.subtype ? file.subtype : file.type}</td>
										<td style={{verticalAlign: "middle"}}>{file.dname ? file.dname : file.fname}</td>
										<td style={{verticalAlign: "middle", width: "230px"}}>
											<div style={{margin: "auto"}}>
												{file.disPlay ? "" : <button onClick={function(){_this.viewFile(file)}} className={file.sugPlay ? "btn btn-sm btn-outline-success" : "btn btn-sm btn-outline-info"}><span className="icon icon-controller-play"></span> {file.sugPlay ? "$" + file.sugPlay : "Free"}</button>}
												<span style={{paddingLeft: "10px"}}></span>
												{file.disBuy ? "" : <button className={file.sugBuy ? "btn btn-sm btn-outline-success" : "btn btn-sm btn-outline-info"}><span className="icon icon-download"></span> {file.sugBuy ? "$" + file.sugBuy : "Free"}</button>}
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