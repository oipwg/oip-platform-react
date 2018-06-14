import React from 'react';

import ContentCard from './ContentCard.js'

const ContentCardsContainer = (props) => {
    let contentLoaded = (props.content !== undefined)
    return <div className="container mt-4">
        <div className="">

            <div className="mb-4">
                <span className="card-container-title">
                    {props.title}
                </span>
            </div>

            {contentLoaded ? (props.content.isFetching ? <p>Loading...</p> : "") : null}
            {contentLoaded ? (props.content.error ? <p>Oops! Looks like something went wrong... Try refreshing!</p> : "") : null}
            {contentLoaded ? (!props.content.isFetching && props.content.items.length === 0 && !props.content.error ? <h6>No results found</h6> : (null) ) : (null)}

            <div className="row no-gutters d-flex justify-content-between">
                { contentLoaded && !props.content.error && !props.content.isFetching ? (
                    props.content.items.map((artifact, i) => {
                    return <ContentCard
                        key={i}
                        artifact={artifact}
                    />
                })) : (null) }
            </div>
        </div>
    </div>
};

export default ContentCardsContainer;