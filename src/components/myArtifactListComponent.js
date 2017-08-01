import React, { Component } from 'react';

import {
	Link
} from 'react-router-dom'

class MyArtifactListComponent extends Component {
	render() {
		return (
			<div className="col-12">
				<Link to="/users/artifacts/view/6hash/">
					<div className="card card-inverse" style={{borderRadius: "0.35rem", marginBottom: "2px"}} >
						<img className="card-img artifact-list-card" src={this.props.artifact.thumbnail} alt="" style={{borderRadius: "0.35rem"}} />
						<div className="card-img-overlay tint-a-bit" style={{borderRadius: "0.35rem"}}>
							<h4 className="card-title">
								{this.props.artifact.paid ? <span className="icon icon-credit" style={{color:"#5cb85c"}}></span> : ''}
								<span className={"icon icon-" + this.props.artifact.icon}></span>
								<span style={{marginLeft: "8px"}}>{this.props.artifact.title}</span>
							</h4>
							<p className="card-text">
								<button className="btn btn-outline-white btn-margin-right">{this.props.artifact.views} Views</button>
								{this.props.artifact.bits ? <button className="btn btn-outline-success btn-bits-bg btn-margin-right">{this.props.artifact.bits} bits</button> : ''}
							</p>
							<p className="card-text" style={{position: "absolute", bottom:5}}><small className="text-muted">Last updated 3 mins ago</small></p>
							<div style={{position: "absolute", bottom:10, right:10}}>
								<Link to="/users/artifacts/view/6hash/"><button className="btn btn-outline-info btn-margin-right"><span className="icon icon-eye"></span> View Details</button></Link>
								<Link to="/users/artifacts/edit/6hash/"><button className="btn btn-outline-warning btn-margin-right"><span className="icon icon-edit"></span> Edit</button></Link>
								<Link to="/users/artifacts/delete/6hash/"><button className="btn btn-outline-danger"><span className="icon icon-trash"></span> Delete</button></Link>
							</div>
						</div>
					</div>
				</Link>
			</div>
		);
	}
}

export default MyArtifactListComponent;