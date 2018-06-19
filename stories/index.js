import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
// import Navbar from '../src/components/Navbar';
// import { Provider } from 'react-redux';
// import { store } from '../src/index.js';
import LoginButton from '../src/components/LoginButton';
import { MemoryRouter } from 'react-router-dom';

storiesOf('Button', module)
    .addDecorator(story => (
        <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
    ))
    .add('Login', () => (
        <LoginButton onClick={action('clicked')} />
    ))

// storiesOf("Navbar", module)
//     .addDecorator(story => <Provider store={store}>{story()}</Provider>)
//     .add("test", () => <Navbar />)

