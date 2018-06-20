import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom'
import { Artifact } from 'oip-js'

import PublisherIcon from './PublisherIcon.js';
import ArtifactIcon from './ArtifactIcon.js';

import { FormattedTime } from 'react-player-controls'

const ContentCard = (props) => {
    const artifact = props.artifact || new Artifact()

	const scrollToTop = () => {
		window.scrollTo(0, 0);
	};

    let title = artifact.getTitle();
    let publisher = artifact.getMainAddress();
    let txid = artifact.getTXID();
    let duration = artifact.getDuration();

    return (
                <div className="card col-xs-12 col-sm-6 col-md-4 col-lg-3 border-0 mb-4 p-1">
                    <Link to={"/" + txid.substring(0,6) } onClick={scrollToTop} className="" title={title} >
                        <div className="card-img-top content-card-img">
                            <img src={"http://thumbs.oip.fun/artifact/" + txid.substr(0,6)} alt="" style={{width: "inherit"}} />
                            <button className="btn btn-outline-light card-media-type m-1"><ArtifactIcon artifact={artifact} /></button>
                            {duration ? <span className="content-card-xinfo m-1 "><FormattedTime numSeconds={duration} /></span> : null}
                        </div>
                    </Link>

                    <div className="card-body p-0">
                        <span style={{fontSize: 14}} className="card-title">{title}</span>
                        <Link to={"/pub/" + publisher } onClick={scrollToTop}>
                            <div className="pubIcon">
                                <PublisherIcon maxWidth={20} id={publisher} small={true} pubName={artifact.publisherName} />
                            </div>
                        </Link>
                    </div>
                </div>
    );
};


ContentCard.propTypes = {
    artifact: PropTypes.object.isRequired,
    key: PropTypes.number
}

export default ContentCard;
