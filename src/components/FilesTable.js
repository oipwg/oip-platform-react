import React, { Component } from 'react';
import PropTypes from "prop-types"

import ViewFileButton from './ViewFileButton'
import BuyFileButton from './BuyFileButton'

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
				<table className="table table-hover table-responsive table-dark table-sm table-striped"
                       style={{display: "table"}}>
					<tbody>
						{filesCopy.map(function(file, i){
							return <tr key={i} >
										<th scope="row"><span className={"icon icon-" + file.info.icon} style={{margin: "auto", display: "table", marginTop: "4px"}}></span></th>
										<td style={{verticalAlign: "middle"}}>{file.info.subtype ? file.info.subtype : file.info.type}</td>
										<td style={{verticalAlign: "middle"}}>{file.info.getDisplayName() ? file.info.getDisplayName() : file.info.getFilename()}</td>
										<td align="right" style={{verticalAlign: "middle", width: "230px"}}>
                                            <ViewFileButton
                                                artifact={_this.props.artifact}
                                                activeFile={_this.props.activeFile}
                                                setCurrentFile={_this.props.setCurrentFile}
                                                paymentError={_this.props.paymentError}
                                                isPlayingFile={_this.props.isPlayingFile}
                                                paymentInProgress={_this.props.paymentInProgress}
                                                payForFile={_this.props.payForFile}
                                            />
                                            <BuyFileButton
                                                artifact={_this.props.artifact}
                                                activeFile={_this.props.activeFile}
                                                setCurrentFile={_this.props.setCurrentFile}
                                                buyInProgress={_this.props.buyInProgress}
                                                buyError={_this.props.buyError}
                                                buyFile={_this.props.buyFile}
                                            />
										</td>
									</tr>
                        })}
					</tbody>
				</table>
		);
	}
}

FilesTable.propTypes = {
    artifact: PropTypes.object,
    artifactState: PropTypes.object,
    activeFile: PropTypes.object,
    filePlaylist: PropTypes.object,
    isPlayingFile: PropTypes.func,
    setCurrentFile: PropTypes.func,
    buyInProgress: PropTypes.func,
    buyError: PropTypes.func,
    paymentError: PropTypes.func,
    paymentInProgress: PropTypes.func,
    payForFile: PropTypes.func,
    buyFile: PropTypes.func,
}

export default FilesTable;
