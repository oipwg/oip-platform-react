import React from 'react';

const NavbarSearchbar = (props) => {
    return (
        <div className="oip-searchbar mx-auto mr-auto">
            <form className="form-inline">
                <div className="input-group my-2">
                    <input type="text" className="form-control outline-dark"
                           placeholder="Search..."
                           onChange={props.onChange} onKeyPress={props.onKeyPress}/>
                    <span className="input-group-btn">
                        <button className="btn btn-outline-dark" type="button" onClick={props.onClick}>Search</button>
                    </span>
                </div>
            </form>
        </div>
    )
}

export default NavbarSearchbar
