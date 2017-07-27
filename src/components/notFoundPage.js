import React, { Component } from 'react';
import videojs from 'video.js';

import '../assets/css/video-js.css';
import '../assets/css/alexandria.videojs.css';

class NotFoundPage extends Component ({ location }) {
	render() {
		return (
			<div className="container">
				<h1>404 URL not found!</h1>
				<code>{location.pathname}</code>
			</div>
		);
	}
}

export default NotFoundPage;