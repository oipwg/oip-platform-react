import React from 'react';
import { Link } from 'react-router-dom';

const UserNav = (props) => {
    return (
        <div className="dropdown">
            <button className="login-button btn btn-outline-dark dropdown-toggle" type="button" id="dropdownMenuButton"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {props.pubName}
            </button>
            <div style={{left: -73}} className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <Link className="dropdown-item d-flex align-items-center justify-content-start" to="#" ><i style={{color: 'red', width: 20}} className="fas fa-cloud-upload-alt mr-2"/>Upload</Link>
                <Link className="dropdown-item d-flex align-items-center justify-content-start" to="#"><i style={{color: 'grey', width: 20}} className="fas fa-wallet mr-2"/>Wallet</Link>
                <Link className="dropdown-item d-flex align-items-center justify-content-start" to="#"><i style={{color: 'grey', width: 20}} className="fas fa-cogs mr-2"/>Settings</Link>
                <div className="dropdown-divider"></div>
                <Link className="dropdown-item d-flex align-items-center justify-content-start" to="#"><i style={{color: 'green', width: 20}} className="fas fa-sign-out-alt mr-2"/>Logout</Link>
            </div>
        </div>

)
}

export default UserNav
{/*<button type="button" className="login-button btn btn-outline-dark">{props.pubName}</button>*/}
