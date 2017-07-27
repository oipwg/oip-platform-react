import React, { Component } from 'react';

import ContentCard from './contentCard.js';

class Homepage extends Component {
	render() {
		let suggestedContent = [
			{
				type: "video",
				paid: true,
				title: "Apollo 11 - When Man land...",
				length: "2:00",
				icon: "clapperboard",
				views: "13,418",
				thumbnail: "/assets/img/apollo-11-poster.jpg",
				creatorName: "NASA Archive",
				creatorImg: "/assets/img/nasa.jpg",
				description: "Apollo 11 was the spaceflight that landed the first two humans on the Moon. Mission commander Neil Armstrong and pilot Buzz Aldrin, both American, landed the lunar module Eagle on July 20, 1969, at 20:18 UTC. Armstrong became the first to step onto the lunar surface six hours later on July 21 at 02:56:15 UTC; Aldrin joined him about 20 minutes later..."
			},{
				type: "audio",
				paid: true,
				title: "Tiny Human",
				length: "4:20",
				icon: "beamed-note",
				views: "8,194",
				thumbnail: "/assets/img/album-artwork.jpg",
				creatorName: "Imogen Heap",
				creatorImg: "/assets/img/imogen-heap.jpg",
				description: ""
			},{
				type: "game",
				title: "2048",
				icon: "game-controller",
				views: "123,456",
				thumbnail: "/assets/img/2048.png",
				creatorName: "Gabriele...",
				creatorImg: "/assets/img/gabriele.jpg",
				description: "HOW TO PLAY: Use your arrow keys to move the tiles. When two tiles with the same number touch, they merge into one!"
			},{
				type: "pdf",
				title: "Bitcoin Whitepaper",
				length: "9 pages",
				icon: "clipboard",
				views: "1,208,841",
				thumbnail: "/assets/img/bitcoin-cover.jpg",
				creatorName: "Satoshi N...",
				creatorImg: "/assets/img/bitcoin.png",
				description: "Bitcoin uses peer-to-peer technology to operate with no central authority or banks; managing transactions and the issuing of bitcoins is carried out collectively by the network. Bitcoin is open-source; its design is public, nobody owns or controls Bitcoin and everyone can take part. Through many of its unique properties, Bitcoin allows exciting uses that could not be covered by any previous payment system."
			},{
				type: "text",
				paid: true,
				title: "Markdown/Text",
				icon: "text",
				views: "3,031",
				thumbnail: "/assets/img/markdown.png",
				creatorName: "OstlerDev",
				creatorImg: "/assets/img/sky.jpg",
			},{
				type: "img",
				title: "Mountain Retreat",
				icon: "image",
				views: "6,081",
				thumbnail: "/assets/img/bob-ross.jpg",
				creatorName: "Bob Ross",
				creatorImg: "/assets/img/bobr.jpg",
				description: "Robert Norman Ross was an American painter, art instructor, and television host. He was the creator and host of The Joy of Painting, an instructional television program that aired from 1983 to 1994 on ..."
			},{
				type: "code",
				paid: true,
				title: "Javascript Plugin",
				icon: "code",
				views: "13,301",
				thumbnail: "/assets/img/js.png",
				creatorName: "OstlerDev",
				creatorImg: "/assets/img/sky.jpg",
				description: "Just another JS plugin"
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
							type={content.type}
						/>
					})}
				</div>
			</div>
		);
	}
}

export default Homepage;