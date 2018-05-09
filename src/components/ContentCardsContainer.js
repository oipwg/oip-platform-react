import React, { Component } from 'react';

import ContentCard from './contentCard.js'

const ContentCardsContainer = (props) => {
	return (
        <div className="content-cards-container container">
            <h4 >{props.title}</h4>
            {props.opts.isFetching ? <p>Loading...</p> : ""}
            {props.opts.error ? <p>Oops! Looks like something went wrong...</p> : ""}
            <div className="row">
                {(props.opts.items && props.opts.items.length > 0) ? props.opts.items.map((artifact, i) => {
                    return <ContentCard
                        key = {i}
                        artifact = {artifact}
                        Core = {props.Core}
                    />
                }) : ""}
            </div>
        </div>
	)
};

export default ContentCardsContainer;