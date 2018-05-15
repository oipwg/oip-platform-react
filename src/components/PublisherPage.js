import React, { Component } from 'react';
import moment from 'moment';

import {
  fetchArtifactList,
  SEARCH_PAGE_LIST
} from '../actions'

import ContentCardsContainer from './ContentCardsContainer.js'
import PublisherIcon from './PublisherIcon.js';

import '../assets/css/oipPublisher.css';

class PublisherPage extends Component {
	constructor(props){
		super(props);

		this.state = {
			isFetching: false,
			isInvalidated: false,
			error: false,
			items: [],
			publisher: {}
		}

		this.stateDidUpdate = this.stateDidUpdate.bind(this);

		let _this = this;
		this.unsubscribe = this.props.store.subscribe(() => {
			_this.stateDidUpdate();
		});

		this.dispatchSearch = this.dispatchSearch.bind(this);
	}
	componentDidMount(){
		// Every time the state changes, log it
		this.dispatchSearch(this.props)
	}
	componentWillReceiveProps(nextProps){
		if (this.props.match.params.id !== nextProps.match.params.id)
			this.dispatchSearch(nextProps)
	}
	dispatchSearch(props){
		// props.store.dispatch(fetchArtifactList(props.Core, SEARCH_PAGE_LIST, { "search-for": props.match.params.id }));
		var _this = this;
		props.Core.Index.getPublisher(props.match.params.id, (success) => {
			_this.setState({publisher: success});

			props.store.dispatch(fetchArtifactList(props.Core, SEARCH_PAGE_LIST, { "search-for": success.address }));
		}, (error) => { console.error(error) })
	}
	stateDidUpdate(){
		let newState = this.props.store.getState();

		let myNewState = newState.ArtifactLists[SEARCH_PAGE_LIST];

		if (myNewState && this.state !== myNewState){
			this.setState(myNewState);
		}
	}
	componentWillUnmount(){
		this.unsubscribe();
	}
	render() {
		let publishingSinceDate = "";

		if (this.state.publisher && this.state.publisher.timestamp)
			publishingSinceDate = moment(this.state.publisher.timestamp * 1000).calendar(null, {sameElse: "MMMM Do YYYY"});

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
										<PublisherIcon id={this.state.publisher.address} Core={this.props.Core} />
									</div>
								</div>

								<div className="col-sm-6">
									<div className="userInfo">
										<h2>{this.state.publisher.name}</h2>
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
					opts={this.state}
				/>
			</div>
		);
	}
}

export default PublisherPage;
