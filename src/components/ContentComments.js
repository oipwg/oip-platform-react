import React, { Component } from 'react';

class ContentComments extends Component {
	render() {
		return (
			<div>
				<h4>Comments</h4>
				<textarea rows="3" name="" className="form-control"></textarea>
				<div className="btn-group" style={{float: "right", marginTop: "-27px"}}>
					<button className="btn btn-sm btn-outline-success">Tip & Post</button>
					<button className="btn btn-sm btn-outline-info">Post</button>
				</div>
				<div className="media" style={{marginTop: "25px"}}>
					<img className="d-flex mr-3 rounded-circle" src="/assets/img/bitspill.png" alt="" style={{width: "50px", height: "50px"}} />
					<div className="media-body">
						<h5 className="mt-0">bitspill</h5>
						Generic text about this game being great!
						<div className="btn-group" style={{float:"right", marginTop: "10px"}}>
							<button className="btn btn-sm btn-outline-secondary"><span className="icon icon-reply"></span> Reply</button>
							<button className="btn btn-sm btn-outline-danger"><span className="icon icon-emoji-sad"></span> Report</button>
						</div>
					</div>
				</div>
				<div className="media" style={{marginTop: "25px"}}>
					<img className="d-flex mr-3 rounded-circle" src="/assets/img/tyler.png" alt="" style={{width: "50px", height: "50px"}} />
					<div className="media-body">
						<h5 className="mt-0">theowenmorris <button className="btn btn-sm btn-success" style={{padding: "3px",marginLeft: "10px"}}>25 bits</button></h5>
						Perfect. Just perfect.
						<div className="btn-group" style={{float:"right", marginTop: "10px"}}>
							<button className="btn btn-sm btn-outline-secondary"><span className="icon icon-reply"></span> Reply</button>
							<button className="btn btn-sm btn-outline-danger"><span className="icon icon-emoji-sad"></span> Report</button>
						</div>
						<div className="media mt-3">
							<a className="d-flex pr-3" href="">
								<img className="rounded-circle" src="/assets/img/devon.jpg" alt="" style={{width: "50px", height: "50px"}} />
							</a>
							<div className="media-body">
								<h5 className="mt-0">Devon James</h5>
								I have to agree, he always creates just the best games!
								<div className="btn-group" style={{float:"right", marginTop: "10px"}}>
									<button className="btn btn-sm btn-outline-secondary"><span className="icon icon-reply"></span> Reply</button>
									<button className="btn btn-sm btn-outline-danger"><span className="icon icon-emoji-sad"></span> Report</button>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="media" style={{marginTop: "25px"}}>
					<img className="d-flex mr-3 rounded-circle" src="/assets/img/vxn.png" alt="" style={{width: "50px", height: "50px"}} />
					<div className="media-body">
						<h5 className="mt-0">vxn <button className="btn btn-sm btn-success" style={{padding: "3px",marginLeft: "10px"}}>50 bits</button></h5>
						Quite lovely
						<div className="btn-group" style={{float:"right", marginTop: "10px"}}>
							<button className="btn btn-sm btn-outline-secondary"><span className="icon icon-reply"></span> Reply</button>
							<button className="btn btn-sm btn-outline-danger"><span className="icon icon-emoji-sad"></span> Report</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default ContentComments;