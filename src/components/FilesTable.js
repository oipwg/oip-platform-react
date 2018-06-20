import React, { Component } from 'react';

import PaymentButtons from './PaymentButtons.js';
import PropTypes from "prop-types";

class FilesTable extends Component {
	constructor(props){
		super(props);

		this.state = {}

		this.stripUnimportantFiles = this.stripUnimportantFiles.bind(this);
		this.getAllFiles = this.getAllFiles.bind(this);
		this.getCurrentArtifactFiles = this.getCurrentArtifactFiles.bind(this);
		this.getEntypoIconForType = this.getEntypoIconForType.bind(this);
	}

	getAllFiles(){
		let files = [];

		if (this.props.filePlaylist){
			let filePlaylist = this.props.filePlaylist;
			for (var key in filePlaylist) {
				// This just makes sure we are not getting the "active" key from the FilePlaylist obj
				if (key.split("|").length === 2){
					let newObj = filePlaylist[key];
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
			if (files[file].key.split("|")[0] === this.props.artifact.getTXID()){
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
					if (!files[i] || !this.props.activeFile || !this.props.activeFile.info || files[i].info.getFilename() !== this.props.activeFile.info.getFilename()){
						newFiles.push(files[i]);
					}
				}
			}
		}

		return newFiles;
	}

    getEntypoIconForType(type){
        let icon;

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
            default:
                icon = "";
                break;
        }

        return icon;
    }

    handleListClick(artifact, file) {
        (file.key !== this.props.activeFile.key) ? (this.props.setCurrentFile(artifact, file)) : (null)
    }

	render() {
		let _this = this;
		let files = this.getCurrentArtifactFiles();
		let filesCopy = [];

		for (var i = 0; i < files.length; i++) {
			let newObj = files[i];

			newObj.info.icon = this.getEntypoIconForType(files[i].info.getType());
			filesCopy.push(newObj);
		}

		if (!this.props.extendedView)
			filesCopy = this.stripUnimportantFiles(filesCopy);

		return (
			<div>
				<table className="table table-sm table-striped table-bordered text-center table-hover table-responsive table-inverse" style={{width: "100%", verticalAlign: "middle"}}>
					<tbody>
						{filesCopy.map(function(file, i){
							return <tr key={i} >
										<th scope="row"><span className={"icon icon-" + file.info.icon} style={{margin: "auto", display: "table", marginTop: "4px"}}></span></th>
										<td style={{verticalAlign: "middle"}}>{file.info.subtype ? file.info.subtype : file.info.type}</td>
										<td style={{verticalAlign: "middle"}}>{file.info.getDisplayName() ? file.info.getDisplayName() : file.info.getFilename()}</td>
										<td style={{verticalAlign: "middle", width: "230px"}}>
											<PaymentButtons
												artifact={_this.props.artifact}
												file={file}
                                                payForFileFunc={_this.props.payForFileFunc}
                                                buyFileFunc={_this.props.buyFileFunc}
                                                isPlayingFile={_this.props.isPlayingFile}
                                                setCurrentFile={_this.props.setCurrentFile}
											/>
										</td>
									</tr>
						})}
					</tbody>
				</table>
			</div>
		);
	}
}

FilesTable.propTypes = {
    artifact: PropTypes.object,
    artifactState: PropTypes.object,
    activeFile: PropTypes.object,
    filePlaylist: PropTypes.object,
    payForFileFunc: PropTypes.func,
    buyFileFunc: PropTypes.func,
    isPlayingFile: PropTypes.func,
    setCurrentFile: PropTypes.func,
}

export default FilesTable;
