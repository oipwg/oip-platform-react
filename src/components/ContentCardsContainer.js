import React, { Component } from 'react';

import ContentCard from './contentCard.js'

const ContentCardsContainer = (props) => {
    return <div className="content-cards-container">
        <div className="card-container">

            <div className="content-cards-title-container">
                <span className="card-container-title">
                    {props.title}
                </span>
            </div>

            {props.opts.isFetching ? <p>Loading...</p> : ""}
            {props.opts.error ? <p>Oops! Looks like something went wrong...</p> : ""}

            <div className="row no-gutters d-flex justify-content-between">
                { props.opts.items.map((artifact, i) => {
                    return <ContentCard
                        key={i}
                        artifact={artifact}
                        Core={props.Core}
                    />
                })}
            </div>
        </div>
    </div>
};

export default ContentCardsContainer;