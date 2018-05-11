import React from 'react';

const UserNav = (props) => {
    return (
        <div className="dropdown">
            <button className="login-button btn btn-outline-dark dropdown-toggle" type="button" id="dropdownMenuButton"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {props.pubName}
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a className="dropdown-item" href="#">Action</a>
                <a className="dropdown-item" href="#">Another action</a>
                <a className="dropdown-item" href="#">Something else here</a>
            </div>
        </div>

)
}

export default UserNav
{/*<button type="button" className="login-button btn btn-outline-dark">{props.pubName}</button>*/}
