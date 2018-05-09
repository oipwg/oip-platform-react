import React from 'react';

import { Link } from 'react-router-dom'

import PublisherIcon from './PublisherIcon.js';
import ArtifactIcon from './ArtifactIcon.js';

import { FormattedTime } from 'react-player-controls'

const ContentCard = (props) => {
	const scrollToTop = () => {
		window.scrollTo(0, 0);
	}

    let title = props.artifact.getTitle();
    let publisher = props.artifact.getMainAddress();
    let txid = props.artifact.getTXID();

    let duration = props.artifact.getDuration();

    let cardClasses = "col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 no-link-styling";

    if (props.size === "large")
        cardClasses = "col-xl-4 col-lg-5 col-md-6 col-sm-12 col-12 no-link-styling";
    return (
        <Link to={"/" + txid.substring(0,6) } onClick={scrollToTop} className={cardClasses} title={title} >
            <div className="card">
                <div style={{marginBottom:"-26px", marginTop: "-1px", zIndex: "1"}}>
                    <button className="btn btn-outline-primary btn-white" style={{padding: "3px 5px", border: "none", backgroundColor: "rgba(0,0,0,0.5)"}}>
                        <ArtifactIcon artifact={props.artifact} />
                    </button>
                </div>
                <div className="card-img-top content-card-img">
                    <img src={"http://thumbs.oip.fun/artifact/" + txid.substr(0,6)} alt="" style={{width: "inherit"}} />
                </div>
                {duration ? <p className="content-card-xinfo"><FormattedTime numSeconds={duration} /></p> : <div className="content-card-xinfo-offset"></div>}
                <div className="card-block" style={{padding: "10px",whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}}>
                    <strong style={{}}>{title}</strong>
                    <Link to={"/pub/" + publisher } onClick={function(){window.scrollTo(0, 0)}}>
                        <div style={{marginBottom: "-15px", marginTop: "5px", maxWidth: "80%", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", display: "flex"}}>
                            <PublisherIcon id={publisher} Core={props.Core} style={{width: "32px", height: "32px"}} small={true} />
                            <p style={{marginTop:"4px", marginLeft: "5px", display: "inline-flex", color: "#000"}}>{props.artifact.publisherName}</p>
                        </div>
                    </Link>
                </div>
            </div>
        </Link>
    );
}

export default ContentCard;
