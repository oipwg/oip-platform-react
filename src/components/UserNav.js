import React from 'react';
import { Link } from 'react-router-dom';
import Account from 'oip-account'

class UserNav extends React.Component {
    constructor(props){
        super(props);

        this.logout = this.logout.bind(this)
    }

    logout() {
        let account = new Account();
        account.logout()
        this.props.logout()
        try {
            if (localStorage)
                localStorage.removeItem("pw")
                localStorage.removeItem("username")
        } catch (e){}
    }

    render() {
        return (
            <div>
                <div className="dropdown">
                    <button className="login-button btn btn-outline-dark border-0 dropdown-toggle" type="button" id="dropdownMenuButton"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {this.props.pubName}
                    </button>
                    <div style={{left: -26}} className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        {/*<Link className="dropdown-item d-flex align-items-center justify-content-start" to="/user/upload" ><i style={{color: 'red', width: 20}} className="fas fa-cloud-upload-alt mr-2"/>Upload</Link>*/}
                        <Link className="dropdown-item d-flex align-items-center justify-content-start" to="/user/wallet"><i style={{color: 'green', width: 20}} className="fas fa-wallet mr-2"/>Wallet</Link>
                        <Link className="dropdown-item d-flex align-items-center justify-content-start" to="/"><i style={{color: 'grey', width: 20}} className="fas fa-home mr-2"/>Home</Link>
                        <Link className="dropdown-item d-flex align-items-center justify-content-start" to="/user/settings"><i style={{color: 'grey', width: 20}} className="fas fa-cogs mr-2"/>Settings</Link>
                        <div className="dropdown-divider"></div>
                        <button className="dropdown-item d-flex align-items-center justify-content-start" onClick={this.logout}><i style={{color: 'grey', width: 20}} className="fas fa-sign-out-alt mr-2"/>Logout</button>
                    </div>
                </div>
                {/*<Link to="/user/wallet/" className="btn btn-outline-success btn-bits-bg" style={{padding:"8px"}} id="bitCountBtn"><span id='bitCount'>{this.state.User.isFetching ? "" : "$" + parseFloat(totalbalance).toFixed(2)}</span></Link>*/}
            </div>

        )
    }
}

export default UserNav
