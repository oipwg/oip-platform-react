import React, {Component} from 'react';
import {ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';

import {logout} from '../actions';

import {
    Link,
    Redirect
} from 'react-router-dom'

import LogoImg from '../assets/img/oip-basic.svg';
import AvatarImg from '../assets/img/sky.jpg';

class Navbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dropdownOpen: false,
            dropdown2Open: false,
            navDropdownOpen: false,
            User: {},
            Wallet: {
                florincoin: {balance: 0, usd: 0},
                bitcoin: {balance: 0, usd: 0},
                litecoin: {balance: 0, usd: 0}
            },
            searchTerm: "",
            search: false
        };

        this.toggle = this.toggle.bind(this);
        this.toggle2 = this.toggle2.bind(this);
        this.searchForArtifacts = this.searchForArtifacts.bind(this);
        this.updateTextInput = this.updateTextInput.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.onNavbarToggleClick = this.onNavbarToggleClick.bind(this);
        this.logout = this.logout.bind(this);
        this.stateDidUpdate = this.stateDidUpdate.bind(this);

        let _this = this;

        this.unsubscribe = this.props.store.subscribe(() => {
            _this.stateDidUpdate();
        });
    }

    stateDidUpdate() {
        let newState = this.props.store.getState();

        let User = newState.User;
        let Wallet = newState.Wallet;

        this.setState({
            User,
            Wallet
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    componentDidMount() {
        this.stateDidUpdate();
    }

    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    toggle2() {
        this.setState({
            dropdown2Open: !this.state.dropdown2Open
        });
    }

    searchForArtifacts() {
        this.setState({search: true});
        let _this = this;
        setTimeout(function () {
            _this.setState({search: false});
        }, 100)
    }

    updateTextInput(e) {
        this.setState({search: false, searchTerm: this.refs.search.value});
    }

    handleKeyPress(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            this.searchForArtifacts();
        }
    }

    logout() {
        console.log("LOGOUT");
        try {
            this.props.store.dispatch(logout("test"));
        } catch (e) {
            console.error(e);
        }
    }

    onNavbarToggleClick() {
        this.setState({
            navDropdownOpen: !this.state.navDropdownOpen
        })
    }

    render() {
        let totalbalance = 0;

        if (this.state && this.state.Wallet) {
            let flobalance = 0, btcbalance = 0, ltcbalance = 0;

            if (this.state.Wallet.florincoin && this.state.Wallet.florincoin.usd)
                flobalance = parseFloat(this.state.Wallet.florincoin.usd);
            if (this.state.Wallet.bitcoin && this.state.Wallet.bitcoin.usd)
                btcbalance = parseFloat(this.state.Wallet.bitcoin.usd);
            if (this.state.Wallet.litecoin && this.state.Wallet.litecoin.usd)
                ltcbalance = parseFloat(this.state.Wallet.litecoin.usd);

            totalbalance = flobalance + btcbalance + ltcbalance;
        }

        return <div>

            {this.state.search ? <Redirect push to={"/search/" + this.state.searchTerm}/> : ""}

            <nav className="navbar navbar-header navbar-expand-xl fixed-top">

                <Link className="navbar-brand navbar-logo" to="/">
                    <img className="d-inline-block align-middle navbar-brand-img" src={LogoImg} alt=""/>
                </Link>

                <div id="navbarToggle" className="collapse navbar-collapse">

                    <div className="oip-searchbar mx-auto mr-auto">
                        <form className="form-inline">
                            <div className="input-group">
                                <input ref="search" type="text" className="form-control outline-dark"
                                       placeholder="Search..."
                                       onInput={this.updateTextInput} onKeyPress={this.handleKeyPress}/>
                                <span className="input-group-btn">
                                    <button className="btn btn-outline-dark" type="button" onClick={this.searchForArtifacts}>Search</button>
                                </span>
                            </div>
                        </form>
                    </div>

                    <div className="user-container">
                        <Link to="/user/upload">
                            <button type="button" className="upload-button btn btn-outline-warning">Upload</button>
                        </Link>
                        <Link to="/login">
                            <button type="button" className="login-button btn btn-outline-dark">Login</button>
                        </Link>
                    </div>
                </div>


            </nav>
        </div>;
    }
}

export default Navbar;
