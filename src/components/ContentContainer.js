import React, { Component } from 'react';

import Spinner from 'react-spinkit';

import FileViewer from './FileViewer.js';

import Paywall from './Paywall.js';

class ContentContainer extends Component {
	constructor(props){
		super(props);
	}

	render() {
		let type, loading = false, haveLoadedState = false;

		if (this.props.ActiveFile) {
            if (this.props.ActiveFile.info && this.props.ActiveFile.info.type){
                haveLoadedState = true;
                type = this.props.ActiveFile.info.type;
            }
		}


		if (this.props.Artifact && this.props.ArtifactState.isFetching) {
            loading = true;
		}

		return (
			<div className="content-container">
				<div id='content' ref={content => this.content = content}
					className={ (this.props.ActiveFile && this.props.ActiveFile.isPaid && !this.props.ActiveFile.hasPaid && !this.props.ActiveFile.owned) ? "content blur" : "content"}
					style=	  { (this.props.ActiveFile && this.props.ActiveFile.isPaid && !this.props.ActiveFile.hasPaid && !this.props.ActiveFile.owned) ? {overflow: "scroll"} : {}}
				>
					{ (!haveLoadedState || loading) ? <div style={{height: "100%", width: "100vw", maxWidth: "100vw"}} className="spinner-container"><Spinner name="wave" color="aqua" /></div> : ''}
					<FileViewer
						Artifact={this.props.Artifact}
						ArtifactState={this.props.ArtifactState}
						ActiveFile={this.props.ActiveFile}
					/>
				</div>

				<Paywall
					ActiveFile={this.props.ActiveFile}
                    Artifact={this.props.Artifact}
				/>
			</div>
		);
	}
}

export default ContentContainer;