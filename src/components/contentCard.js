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

    return (
        <Link to={"/" + txid.substring(0,6) } onClick={scrollToTop} className="" title={title} >
            <div className="card">
                <div>
                    <button className="btn btn-outline-primary btn-white">
                        <ArtifactIcon artifact={props.artifact} />
                    </button>
                </div>
                <div className="card-img-top content-card-img">
                    <img src={"http://thumbs.oip.fun/artifact/" + txid.substr(0,6)} alt="" />
                </div>
                {duration ? <p className="content-card-xinfo"><FormattedTime numSeconds={duration} /></p> : <div className="content-card-xinfo-offset"></div>}
                <div className="card-block" >
                    <strong>{title}</strong>
                    <Link to={"/pub/" + publisher } onClick={function(){window.scrollTo(0, 0)}}>
                        <div>
                            <PublisherIcon id={publisher} Core={props.Core} small={true} />
                            <p>{props.artifact.publisherName}</p>
                        </div>
                    </Link>
                </div>
            </div>
        </Link>
    );
}

export default ContentCard;
