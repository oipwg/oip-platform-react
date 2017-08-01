import React, { Component } from 'react';

import MyArtifactListComponent from './myArtifactListComponent.js'

class MyArtifactsContainer extends Component {
	render() {
		let suggestedContent = [
			{
				key: 1,
				type: "video",
				paid: true,
				title: "Apollo 11 - When Man land...",
				length: "2:00",
				icon: "clapperboard",
				views: "13,418",
				bits: "12,749",
				thumbnail: "/assets/img/apollo-11-poster.jpg",
				creatorName: "NASA Archive",
				creatorImg: "/assets/img/nasa.jpg",
				description: "Apollo 11 was the spaceflight that landed the first two humans on the Moon. Mission commander Neil Armstrong and pilot Buzz Aldrin, both American, landed the lunar module Eagle on July 20, 1969, at 20:18 UTC. Armstrong became the first to step onto the lunar surface six hours later on July 21 at 02:56:15 UTC; Aldrin joined him about 20 minutes later..."
			},{
				key: 2,
				type: "audio",
				paid: true,
				title: "Tiny Human",
				length: "4:20",
				icon: "beamed-note",
				views: "8,194",
				bits: "8,165",
				thumbnail: "/assets/img/album-artwork.jpg",
				creatorName: "Imogen Heap",
				creatorImg: "/assets/img/imogen-heap.jpg",
				description: ""
			},{
				key: 3,
				type: "game",
				title: "2048",
				icon: "game-controller",
				views: "123,456",
				thumbnail: "/assets/img/2048.png",
				creatorName: "Gabriele...",
				creatorImg: "/assets/img/gabriele.jpg",
				description: "HOW TO PLAY: Use your arrow keys to move the tiles. When two tiles with the same number touch, they merge into one!"
			},{
				key: 4,
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
				key: 5,
				type: "text",
				paid: true,
				title: "Markdown/Text",
				icon: "text",
				views: "3,031",
				bits: "3,026",
				thumbnail: "/assets/img/markdown.png",
				creatorName: "OstlerDev",
				creatorImg: "/assets/img/sky.jpg",
			},{
				key: 6,
				type: "img",
				title: "Mountain Retreat",
				icon: "image",
				views: "6,081",
				thumbnail: "/assets/img/bob-ross.jpg",
				creatorName: "Bob Ross",
				creatorImg: "/assets/img/bobr.jpg",
				description: "Robert Norman Ross was an American painter, art instructor, and television host. He was the creator and host of The Joy of Painting, an instructional television program that aired from 1983 to 1994 on ..."
			},{
				key: 7,
				type: "code",
				paid: true,
				title: "Javascript Plugin",
				icon: "code",
				views: "13,301",
				bits: "12,992",
				thumbnail: "/assets/img/js.png",
				creatorName: "OstlerDev",
				creatorImg: "/assets/img/sky.jpg",
				description: "Just another JS plugin"
			}
		]

		return (
			<div className="container">
				<h1>My Artifacts</h1>
				<hr />
				{suggestedContent.map(function(artifact, i){
					return <MyArtifactListComponent artifact={artifact} />
				})}
			</div>
		);
	}
}

export default MyArtifactsContainer;