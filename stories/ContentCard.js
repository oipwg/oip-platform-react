import React from 'react';
import { storiesOf } from '@storybook/react';
import ContentCard from '../src/components/ContentCard';
import hydratedArt from '../src/demoContent';
import Navbar from '../src/components/Navbar';

storiesOf('ContentCard', module)
    .add('default', () => (
        <ContentCard artifact={hydratedArt}/>
    ))

storiesOf('Navbar', module)
    .add('navbar', () => (
        <Navbar />
    ))