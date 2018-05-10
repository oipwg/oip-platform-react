import React from 'react';

import { Link } from 'react-router-dom'

import PublisherIcon from './PublisherIcon.js';
import ArtifactIcon from './ArtifactIcon.js';

import { FormattedTime } from 'react-player-controls'

const ContentCard = (props) => {

	const scrollToTop = () => {
		window.scrollTo(0, 0);
	};

    let title = props.artifact.getTitle();
    let publisher = props.artifact.getMainAddress();
    let txid = props.artifact.getTXID();
    let duration = props.artifact.getDuration();

    return (
            <div className="card border-0 mb-5" style={{width: 210}}>
                <Link to={"/" + txid.substring(0,6) } onClick={scrollToTop} className="" title={title} >

                    <img className="card-img" style={{width: 210}} src={"http://thumbs.oip.fun/artifact/" + txid.substr(0,6)} alt="" />
                    <div style={{maxHeight: 138}} className="card-img-overlay p-2">
                        <button className="btn btn-outline-light card-title m-0"><ArtifactIcon artifact={props.artifact} /></button>
                        {duration ? <p className="content-card-xinfo"><FormattedTime numSeconds={duration} /></p> : <div className="content-card-xinfo-offset"></div>}
                    </div>
                </Link>

                <div className="card-body p-0">
                    <span style={{fontFamily: 'Roboto', fontSize: 14}} className="card-title">{title}</span>

                        <Link to={"/pub/" + publisher } onClick={scrollToTop}>
                            <PublisherIcon id={publisher} Core={props.Core} small={true} />
                            <h6 className="card-subtitle mb-2 text-muted">
                                <span>{props.artifact.publisherName}</span>
                            </h6>
                        </Link>

                </div>
            </div>
    );
};

export default ContentCard;
