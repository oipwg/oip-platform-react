import React, { Component } from 'react';

class ContentInfo extends Component {
	render() {
		return (
			<div>
				<div className="row">
					<div className="col-10">
						<h2 style={{paddingLeft: "20px"}}><span className="icon icon-clipboard" style={{marginRight:"10px"}}></span>Bitcoin Whitepaper</h2>
					</div>
					<div className="col-2">
						<div style={{float: "right", marginTop: "2px"}}>
							<button className="btn btn-outline-secondary">1,205,841 Views</button>
						</div>
					</div>
				</div>
				<div className="media">
					<img className="d-flex mr-3 rounded-circle" src="/assets/img/bitcoin.png" alt="" style={{width: "50px", height: "50px"}} />
					<div className="media-body">
						<h5 className="mt-0" style={{paddingTop: "15px", marginLeft: "-10px"}}>Satoshi Nakamoto <div className="btn-group"><button className="btn btn-sm btn-warning" style={{marginLeft: "10px"}}><span className="icon-pin icon"></span>Followed</button><button className="btn btn-sm btn-outline-secondary" disabled>3,954 Followers</button></div>
							<div style={{float: "right"}}>
								<button className="btn btn-sm btn-outline-info"><span className="icon-forward icon"></span> Share</button>
								<button className="btn btn-sm btn-outline-success"><span className="icon-wallet icon"></span> Tip</button>
								<button className="btn btn-sm btn-outline-danger"><span className="icon-emoji-sad icon"></span> Report</button>
							</div>
						</h5>
					</div>
				</div>
				<p style={{textIndent: "40px", marginTop: "10px"}}>Bitcoin uses peer-to-peer technology to operate with no central authority or banks; managing transactions and the issuing of bitcoins is carried out collectively by the network. Bitcoin is open-source; its design is public, nobody owns or controls Bitcoin and everyone can take part. Through many of its unique properties, Bitcoin allows exciting uses that could not be covered by any previous payment system.</p>
				<div className="" style={{width: "100%", marginTop: "-15px"}}>
					<hr style={{marginTop: "25px", marginBottom: "-15px"}} />
					<button className="btn btn-sm btn-outline-secondary" style={{borderColor: "#333", color: "#333", margin: "0px auto", display:"block", backgroundColor:"#fff"}}>See More</button>
				</div>
			</div>
		);
	}
}

export default ContentInfo;