import React from 'react';
import { storiesOf } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';

import LoginButton from './LoginButton';
import 'bootstrap/dist/css/bootstrap.css';

storiesOf('Button', module)
    .addDecorator(story => (
        <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
    ))
    .add('Login', () => (
        <LoginButton />
    ))
