import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';

import { fetchPublisherPage, PUBLISHER_PAGE_LIST } from '../actions'

import ContentCardsContainer from './ContentCardsContainer.js'
import PublisherIcon from './PublisherIcon.js';

import '../assets/css/oipPublisher.css';

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
                <header>
                    {/*<!--There will be dynamic header part-->*/}
                </header>
                <section className="about">
                    <div className="user-identity">
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-3">
                                    <div className="userImage" style={{marginTop: "-30px"}}>
                                        <PublisherIcon id={this.props.publisher.address} Core={this.props.Core} />
                                    </div>
                                </div>

                                <div className="col-sm-6">
                                    <div className="userInfo">
                                        <h2>{this.props.publisher.name}</h2>
                                        <div className="publishDate">
                                            <p>Publishing since <span>{publishingSinceDate}</span></p>
                                        </div>
                                        {/*<div className="uSocialProfile">
											<a href="#"><i className="fa fa-facebook"></i></a>
											<a href="#"><i className="fa fa-twitter"></i></a>
											<a href="#"><i className="fa fa-google-plus"></i></a>
											<a href="#"><i className="fa fa-linkedin"></i></a>
										</div>*/}
                                    </div>
                                </div>

                                <div className="col-sm-3">
                                    <div className="subscribe">
                                        <button type="button">Send Tip</button>
                                        {/*<button type="button">Subscribe</button>*/}
                                    </div>
                                </div>
                            </div>
                            <hr />
                        </div>
                    </div>
                </section>
                <div style={{marginTop: "-75px"}}></div>
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