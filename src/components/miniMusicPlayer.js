import React, { Component } from 'react';

class MiniMusicPlayer extends Component {
	render() {
		return (
			<nav className="navbar fixed-bottom mini-audio-player" style={ this.props.display ? {display:"none"} : {}}>
				<div className="row">
					<div className="col-6">
						<div className="row">
							<div className="col-3">
								<div className="row" style={{padding: "0px 20px"}}>
									<span className="col mp-icon icon icon-controller-jump-to-start"></span>
									<span className="col mp-icon icon icon-controller-play"></span>
									<span className="col mp-icon icon icon-controller-next"></span>
								</div>
							</div>
							<div className="col-9" style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
								<span style={{paddingRight:"10px"}}>2:05</span>
								<div className="progress" style={{height: "10px", width:"100%", backgroundColor: "#bdbdbd"}}>
									<div className="progress-bar bg-success" role="progressbar" style={{width: "45%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
								</div>
								<span style={{paddingLeft:"10px"}}>4:20</span>
							</div>
						</div>
					</div>
					<div className="col-6" style={{padding: "4px 20px", display:"flex"}}>
						<img className="rounded" src="assets/img/album-artwork.jpg" width="40px" height="40px" />
						<div style={{padding: "0px 10px"}}>
							<div style={{fontWeight:"700",fontSize:"14px"}}>Tiny Human</div>
							<div style={{color: "#555",fontSize:"12px"}}>Imogen Heap - Tiny Human</div>
						</div>
					</div>
				</div>
			</nav>
		);
	}
}

export default MiniMusicPlayer;