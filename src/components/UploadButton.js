import React from 'react';
import { Link } from 'react-router-dom';

const UploadButton = (props) => {
    return (
        <Link to={props.isLoggedIn ? "/user/upload" : "/login"}>
            <button type="button" className="upload-button btn btn-outline-danger mr-2">Upload</button>
        </Link>
    )

}

export default UploadButton