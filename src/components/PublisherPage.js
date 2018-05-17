import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';

import { fetchPublisherPage, PUBLISHER_PAGE_LIST } from '../actions'

import ContentCardsContainer from './ContentCardsContainer.js'
import PublisherIcon from './PublisherIcon.js';

// import '../assets/css/oipPublisher.css';

class PublisherPage extends Component {
    constructor(props){
        super(props);

        this.state = { }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.match.params.id !== prevState.pubId) {
            nextProps.fetchPublisherPage(nextProps.Core, PUBLISHER_PAGE_LIST, nextProps.match.params.id)
        }
        return {
            pubId: nextProps.match.params.id
        }
    }

    render() {
        let publishingSinceDate = "";

        if (this.props.publisher && this.props.publisher.timestamp)
            publishingSinceDate = moment(this.props.publisher.timestamp * 1000).calendar(null, {sameElse: "MMMM Do YYYY"});

        return (
            <div>
                <div className="jumbotron jumbotron-fluid bg-info" style={{height: 300}}>
                    <div className="container">
                        <h1 className="display-4">{this.props.publisher.name}</h1>
                        <p className="lead">Publishing since <span>{publishingSinceDate}</span></p>
                        <div className="userRow row">
                            {/*<div className="publisher-icon"></div>*/}
                            <div className="pubIcon"><PublisherIcon id={this.props.publisher.address} /></div>
                            <button className="btn btn-light" type="button">Send Tip</button>
                            <button className="btn btn-danger" type="button">Subscribe</button>
                        </div>
                    </div>
                </div>

                <ContentCardsContainer
                    Core={this.props.Core}
                    title={"Latest Artifacts"}
                    content={this.props.content}
                />
            </div>
        );
    }
}

function mapStateToProps(state) {
	return {
		Core: state.Core.Core,
        publisher: state.PublisherPage.publisher,
        content: state.ArtifactLists[PUBLISHER_PAGE_LIST]
	}
}

const mapDispatchToProps = {
	fetchPublisherPage
}

export default connect(mapStateToProps, mapDispatchToProps)(PublisherPage);