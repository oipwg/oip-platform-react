import React, { Component } from 'react';

class Playlist extends Component {
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
		if (this.props.CurrentFile !== nextProps.CurrentFile || this.props.SongList !== nextProps.SongList || this.props.mainColor !== nextProps.mainColor || this.props.bgColor !== this.props.bgColor)
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
			<ul className="list-group" style={{width: "442px"}}>
				<li className="list-group-item" style={{padding: "5px 30px", display:"flex", backgroundColor: _this.props.bgColor, border: "1px solid " + _this.props.mainColor}}>
					<div style={{margin: "auto"}}>
						<button className="btn btn-sm btn-outline-info"><span className="icon icon-controller-play"></span>Play All: Free</button>
						<span style={{paddingLeft: "10px"}}></span>
						<button className="btn btn-sm btn-outline-info"><span className="icon icon-download"></span> Buy All: Free</button>
					</div> 
				</li>
				{[].map(function(song, i){
					return <li key={i} className="list-group-item" style={song.fname === _this.props.CurrentFile.fname ? {padding: "0px", backgroundColor: _this.props.mainColor, border: "1px solid " + _this.props.mainColor} : {padding: "0px", backgroundColor: _this.props.bgColor, border: "1px solid " + _this.props.mainColor}}>
						<div style={{padding: "4px 5px", display:"flex"}}>
							<img className="rounded" src={song.albumArtwork} width="40px" height="40px" alt="" />
							<div style={{padding: "0px 10px", width:"235px"}}>
								<div style={song.fname === _this.props.CurrentFile.fname ? {color: _this.props.bgColor, fontWeight:"700",fontSize:"14px", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap"} : {color: _this.props.mainColor, fontWeight:"700",fontSize:"14px", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap"}}>{song.artist}</div>
								<div style={song.fname === _this.props.CurrentFile.fname ? {color: _this.props.bgColor, fontSize:"12px", width: "235px", display: "flex"} : {color: _this.props.mainColor, fontSize:"12px", width: "235px", display: "flex"}}>
									<div style={{width: "200px", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap"}}>{i + 1}: {song.name}</div>
									<div style={{width: "30px", textAlign: "right"}}>{song.length ? song.length : ""}</div>
								</div>
							</div>
							<div style={{margin: "auto", display: "flex"}}>
								{song.disPlay ? "" : <button onClick={function(){_this.playSong(song)}} className={song.sugPlay ? "btn btn-sm btn-outline-success" : "btn btn-sm btn-outline-info"} style={song.fname === _this.props.CurrentFile.fname ? {backgroundColor: _this.props.bgColor} : {}}><span className="icon icon-controller-play"></span> {song.sugPlay ? "$" + song.sugPlay : "Free"}</button>}
								<span style={{paddingLeft: "5px"}}></span>
								{song.disBuy ? "" : <button className={song.sugBuy ? "btn btn-sm btn-outline-success" : "btn btn-sm btn-outline-info"} style={song.fname === _this.props.CurrentFile.fname ? {backgroundColor: _this.props.bgColor} : {}}><span className="icon icon-download"></span> {song.sugBuy ? "$" + song.sugBuy : "Free"}</button>}
							</div>
						</div>
					</li>
				})}
			</ul>
		);
	}
}

export default Playlist;