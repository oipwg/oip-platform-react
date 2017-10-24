import React, { Component } from 'react';

import Identicons from 'identicons-react';

class SongList extends Component {
	constructor(props){
		super(props);

		this.state = {
			hash: ""
		}

		this.playSong = this.playSong.bind(this);
	}
	componentDidMount(){
		let publisher = this.props.Core.Artifact.getPublisherName(this.props.artifact);
		this.setState({
			hash: publisher
		})
	}
	shouldComponentUpdate(nextProps){
		if (this.props.CurrentFile !== nextProps.CurrentFile || this.props.SongList !== nextProps.SongList)
			return true;
		else
			return false;
	}
	componentDidUpdate(){

	}
	playSong(song){
		this.props.setCurrentFile(song);
	}
	render() {
		let _this = this;

		return (
			<ul className="list-group">
				<li className="list-group-item" style={{padding: "5px 30px", display:"flex"}}>
					<div style={{margin: "auto"}}>
						<button className="btn btn-sm btn-outline-info"><span className="icon icon-controller-play"></span>Play All: Free</button>
						<span style={{paddingLeft: "10px"}}></span>
						<button className="btn btn-sm btn-outline-info"><span className="icon icon-download"></span> Buy All: Free</button>
					</div> 
				</li>
				{this.props.SongList.map(function(song, i){
					return <li key={i} className={song.fname === _this.props.CurrentFile.fname ? "list-group-item list-group-item-secondary" : "list-group-item"} style={{padding: "0px"}}>
						<div style={{padding: "4px 5px", display:"flex"}}>
							<img className="rounded" src={song.albumArtwork} width="40px" height="40px" alt="" />
							<div style={{padding: "0px 10px", width:"250px"}}>
								<div style={{fontWeight:"700",fontSize:"14px", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap"}}>{song.artist}</div>
								<div style={{color: "#555",fontSize:"12px", width: "250px", display: "flex"}}>
									<div style={{width: "180px", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap"}}>{i + 1}: {song.name}</div>
									<div style={{width: "55px", textAlign: "right"}}>{song.length ? song.length : ""}</div>
								</div>
							</div>
							<div style={{margin: "auto", display: "flex"}}>
								{song.disPlay ? "" : <button onClick={function(){_this.playSong(song)}} className={song.sugPlay ? "btn btn-sm btn-outline-success" : "btn btn-sm btn-outline-info"}><span className="icon icon-controller-play"></span> {song.sugPlay ? "$" + song.sugPlay : "Free"}</button>}
								<span style={{paddingLeft: "5px"}}></span>
								{song.disBuy ? "" : <button className={song.sugBuy ? "btn btn-sm btn-outline-success" : "btn btn-sm btn-outline-info"}><span className="icon icon-download"></span> {song.sugBuy ? "$" + song.sugBuy : "Free"}</button>}
							</div>
						</div>
					</li>
				})}
			</ul>
		);
	}
}

export default SongList;