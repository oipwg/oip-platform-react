import React from 'react';
import { Link } from 'react-router-dom';

const UploadButton = () => {
    return (
        <Link to="/user/upload">
            <button type="button" className="upload-button btn btn-outline-danger mr-2">Upload</button>
        </Link>
    )

}

export default UploadButton