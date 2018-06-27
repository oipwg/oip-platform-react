import React from 'react';
import { Link } from 'react-router-dom';

const LoginButton = () => {
    return (
        <Link to="/login">
            <button type="button" className="login-button btn btn-outline-dark border-0">Login</button>
        </Link>
        )
}

export default LoginButton