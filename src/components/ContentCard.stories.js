import React from 'react';
import { storiesOf } from '@storybook/react';
import ContentCard from './ContentCard';

storiesOf("Content", module)
    .add("Card", () => (
        <ContentCard />
    ));