import React, { Component } from 'react';

import ContentContainer from './contentContainer.js'
import ContentInfo from './contentInfo.js'
import ContentComments from './contentComments.js'
import ContentCard from './contentCard.js'

class ContentPage extends Component {
	render() {
		let suggestedContent = [
			{
				paid: true,
				title: "Apollo 11 - When Man land...",
				length: "2:00",
				icon: "clapperboard",
				views: "13,418",
				thumbnail: "/assets/img/apollo-11-poster.jpg",
				creatorName: "NASA Archive",
				creatorImg: "/assets/img/nasa.jpg",
			},{
				paid: true,
				title: "Tiny Human",
				length: "4:20",
				icon: "beamed-note",
				views: "8,194",
				thumbnail: "/assets/img/album-artwork.jpg",
				creatorName: "Imogen Heap",
				creatorImg: "/assets/img/imogen-heap.jpg",
			},{
				title: "2048",
				icon: "game-controller",
				views: "123,456",
				thumbnail: "/assets/img/2048.png",
				creatorName: "Gabriele...",
				creatorImg: "/assets/img/gabriele.jpg",
			},{
				title: "Bitcoin Whitepaper",
				length: "9 pages",
				icon: "clipboard",
				views: "1,208,841",
				thumbnail: "/assets/img/bitcoin-cover.jpg",
				creatorName: "Satoshi N...",
				creatorImg: "/assets/img/bitcoin.png",
			},{
				paid: true,
				title: "Markdown/Text",
				icon: "text",
				views: "3,031",
				thumbnail: "/assets/img/markdown.png",
				creatorName: "OstlerDev",
				creatorImg: "/assets/img/sky.jpg",
			},{
				title: "Mountain Retreat",
				icon: "image",
				views: "6,081",
				thumbnail: "/assets/img/bob-ross.jpg",
				creatorName: "Bob Ross",
				creatorImg: "/assets/img/bobr.jpg",
			},{
				paid: true,
				title: "Javascript Plugin",
				icon: "code",
				views: "13,301",
				thumbnail: "/assets/img/js.png",
				creatorName: "OstlerDev",
				creatorImg: "/assets/img/sky.jpg",
			}
		]
		return (
			<div>
				<ContentContainer />
				<div className="container">
					<div className="row">
						<div id="media-info" className="col-12 col-md-9" style={{marginTop: "30px"}}>
							<ContentInfo 
								title="Bitcoin Whitepaper" 
								icon="clipboard" 
								views="1,208,841" 
								creator="Satoshi Nakomoto"
								creatorImg="/assets/img/bitcoin.png"
								description="Bitcoin uses peer-to-peer technology to operate with no central authority or banks; managing transactions and the issuing of bitcoins is carried out collectively by the network. Bitcoin is open-source; its design is public, nobody owns or controls Bitcoin and everyone can take part. Through many of its unique properties, Bitcoin allows exciting uses that could not be covered by any previous payment system."
							/>
							<br />
							<ContentComments />
						</div>
						<div id='suggested' class="col-12 col-md-3" style={{marginTop: "30px"}}>
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
				</div>
			</div>
		);
	}
}

export default ContentPage;