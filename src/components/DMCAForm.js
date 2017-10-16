import React, { Component } from 'react';

import {
  Link
} from 'react-router-dom'

class DMCAForm extends Component {
	constructor(props){
		super(props);
	}
	render() {
		let _this = this;
		return (
			<div className="container">
				<div className="row" style={{marginTop: "100px"}}>
					<div className="col-12">
						<h3>File DMCA Complaint</h3>
						<hr />
					</div>
					<div className="col-12">
						<div className="form-group">
							<label>Link to infringing content*</label>
							<input type="text" className="form-control" placeholder="alexandria.io/abcdef" />
						</div>
					</div>
					<div className="col-6">
						<div className="form-group">
							<label>First Name*</label>
							<input type="text" className="form-control" placeholder="Enter first name" />
							<small className="form-text text-muted">Legal Name only.</small>
						</div>
					</div>
					<div className="col-6">
						<div className="form-group">
							<label for="exampleInputEmail1">Last Name*</label>
							<input type="text" className="form-control" placeholder="Enter last name" />
						</div>
					</div>
					<div className="col-12">
						<div className="form-group">
							<label>Company</label>
							<input type="email" className="form-control" placeholder="Enter company" />
						</div>
					</div>
					<div className="col-12">
						<div className="form-group">
							<label>Email Address*</label>
							<input type="email" className="form-control" placeholder="Enter email" />
							<small className="form-text text-muted">This is how we will contact you with updates on your DMCA Complaint</small>
						</div>
					</div>
					<div className="col-12">
						<div className="form-group">
							<label>Address 1*</label>
							<input type="text" className="form-control" placeholder="Enter Address 1" />
							<small className="form-text text-muted">This is your physical mailing address.</small>
						</div>
					</div>
					<div className="col-12">
						<div className="form-group">
							<label>Address 2</label>
							<input type="text" className="form-control" placeholder="Enter Address 2" />
						</div>
					</div>
					<div className="col-4">
						<div className="form-group">
							<label>City</label>
							<input type="text" className="form-control" placeholder="Enter City" />
						</div>
					</div>
					<div className="col-4">
						<div className="form-group">
							<label>State</label>
							<input type="text" className="form-control" placeholder="Enter State" />
						</div>
					</div>
					<div className="col-4">
						<div className="form-group">
							<label>Country</label>
							<input type="text" className="form-control" placeholder="Enter Country" />
						</div>
					</div>
					<div className="col-12">
						<div className="form-group">
							<label>More Information</label>
							<textarea rows="4" className="form-control" placeholder="" />
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default DMCAForm;