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
                <div className="card col-xs-12 col-sm-6 col-md-4 col-lg-3 border-0 mb-4 p-1">
                    <Link to={"/" + txid.substring(0,6) } onClick={scrollToTop} className="" title={title} >
                        <div className="card-img-top content-card-img">
                            <img src={"http://thumbs.oip.fun/artifact/" + txid.substr(0,6)} alt="" style={{width: "inherit"}} />
                            <button className="btn btn-outline-light card-media-type m-1"><ArtifactIcon artifact={props.artifact} /></button>
                            {duration ? <span className="content-card-xinfo m-1 "><FormattedTime numSeconds={duration} /></span> : null}
                        </div>
                    </Link>

                    <div className="card-body p-0">
                        <span style={{fontSize: 14}} className="card-title">{title}</span>
                        <Link to={"/pub/" + publisher } onClick={scrollToTop}>
                            <PublisherIcon id={publisher} small={true} pubName={props.artifact.publisherName} />
                        </Link>
                    </div>
                </div>
    );
};

export default ContentCard;
