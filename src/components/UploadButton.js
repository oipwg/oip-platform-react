import React from 'react';
import { Link } from 'react-router-dom';

const UploadButton = (props) => {
    return (
        <Link to={props.isLoggedIn ? "/user/upload" : "/login"}>
            <button type="button" className="upload-button btn btn-outline-danger border-0 ml-2 mr-1">Upload</button>
        </Link>
    )

}

export default UploadButton