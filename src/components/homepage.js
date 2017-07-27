import React, { Component } from 'react';

import ContentCard from './contentCard.js';

class Homepage extends Component {
	render() {
		let suggestedContent = [
			{
				paid: true,
				title: "Apollo 11 - When Man land...",
				length: "2:00",
				icon: "clapperboard",
				views: "13,418",
				thumbnail: "assets/img/apollo-11-poster.jpg",
				creatorName: "NASA Archive",
				creatorImg: "assets/img/nasa.jpg",
			},{
				paid: true,
				title: "Tiny Human",
				length: "4:20",
				icon: "beamed-note",
				views: "8,194",
				thumbnail: "assets/img/album-artwork.jpg",
				creatorName: "Imogen Heap",
				creatorImg: "assets/img/imogen-heap.jpg",
			},{
				title: "2048",
				icon: "game-controller",
				views: "123,456",
				thumbnail: "assets/img/2048.png",
				creatorName: "Gabriele...",
				creatorImg: "assets/img/gabriele.jpg",
			},{
				title: "Bitcoin Whitepaper",
				length: "9 pages",
				icon: "clipboard",
				views: "1,208,841",
				thumbnail: "assets/img/bitcoin-cover.jpg",
				creatorName: "Satoshi N...",
				creatorImg: "assets/img/bitcoin.png",
			},{
				paid: true,
				title: "Markdown/Text",
				icon: "text",
				views: "3,031",
				thumbnail: "assets/img/markdown.png",
				creatorName: "OstlerDev",
				creatorImg: "assets/img/sky.jpg",
			},{
				title: "Mountain Retreat",
				icon: "image",
				views: "6,081",
				thumbnail: "assets/img/bob-ross.jpg",
				creatorName: "Bob Ross",
				creatorImg: "assets/img/bobr.jpg",
			},{
				paid: true,
				title: "Javascript Plugin",
				icon: "code",
				views: "13,301",
				thumbnail: "assets/img/js.png",
				creatorName: "OstlerDev",
				creatorImg: "assets/img/sky.jpg",
			}
		]
		return (
			<div className="container" style={{marginTop: "100px", marginBottom:"200px"}}>
				<h4 style={{marginBottom: "25px"}}>Suggested Content</h4>
				<div className="row">
					{suggestedContent.map(function(content, i){
						return <ContentCard 
							paid={content.paid}
							title={content.title}
							length={content.length}
							icon={content.icon}
							views={content.views}
							thumbnail={content.thumbnail}
							creatorName={content.creatorName}
							creatorImg={content.creatorImg}
						/>
					})}
				</div>
			</div>
		);
	}
}

export default Homepage;