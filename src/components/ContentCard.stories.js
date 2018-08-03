import React from 'react';
import { storiesOf} from '@storybook/react';
import ContentCard from './ContentCard';
import { MemoryRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

import hydratedArt from '../demoContent';


storiesOf("Content", module)
    .addDecorator(story => (
        <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
    ))
    .add("Card", () => (
        <ContentCard artifact={hydratedArt[0]} key={0} />
    ));