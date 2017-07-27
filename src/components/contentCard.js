import React, { Component } from 'react';

class ContentCard extends Component {
	render() {
		return (
			<a href="video.html" className="col-3 no-link-styling">
				<div className="card" style={{marginBottom: "15px"}}>
					<div style={{marginBottom:"-30px"}}>
						<button className="btn btn-outline-primary btn-white" style={{padding: "3px 5px"}}>
							{ this.props.paid ? <span className="icon icon-credit" style={{color: "#5cb85c"}}></span> : ''}
							<span className={"icon icon-" + this.props.icon}></span>
						</button>
					</div>
					<img className="card-img-top content-card-img" src={this.props.thumbnail} alt="Card cap" />
					{this.props.length ? <p className="content-card-xinfo">{this.props.length}</p> : ''}
					<div className="card-block" style={{padding: "10px"}}>
						<strong>{this.props.title}</strong>
						<p style={{marginBottom: "-10px"}}><img className="rounded-circle" src={this.props.creatorImg} width="30" height="30" style={{marginRight: "3px", marginBottom: "3px", marginLeft:"-5px"}} /><span style={{paddingTop:"10px"}}>{this.props.creatorName}</span></p>
						<button className="btn btn-sm btn-outline-secondary view-btn">{this.props.views} Views</button>
					</div>
				</div>
			</a>
		);
	}
}

export default ContentCard;