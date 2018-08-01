import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types';

import NavbarSearchBar from './NavbarSearchBar'
import LoginButton from './LoginButton'
import UploadButton from './UploadButton'
import UserNav from './UserNav'

import { logoutAction } from '../actions/User/actions'

import LogoImg from '../assets/img/oip-wordmark-and-logo.png';

class Navbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchTerm: "",
            search: false
        };

        this.searchForArtifacts = this.searchForArtifacts.bind(this);
        this.updateTextInput = this.updateTextInput.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    searchForArtifacts() {
        this.setState({search: true});
        let _this = this;
        setTimeout(function () {
            _this.setState({search: false});
        }, 100)
    }

    updateTextInput(e) {
        this.setState({
            search: false,
            searchTerm: e.target.value
        });
    }

    handleKeyPress(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            this.searchForArtifacts();
        }
    }

    render() {
        return <nav className="navbar-header navbar navbar-expand-sm">
            {this.state.search ? <Redirect push to={"/search/" + this.state.searchTerm}/> : null}
                <Link className="navbar-logo navbar-brand ml-5" to="/">
                    <img style={{height: "40px"}} className="navbar-brand-img d-inline-block align-middle" src={LogoImg} alt=""/>
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <i className="fas fa-bars"></i>
                </button>

                <div id="navbarSupportedContent" className="collapse navbar-collapse">
                    <NavbarSearchBar onChange={this.updateTextInput} onKeyPress={this.handleKeyPress} onClick={this.searchForArtifacts} />
                    <div className="user-container d-flex justify-content-end">
                        {/*<UploadButton isLoggedIn={this.props.User.isLoggedIn}/>*/}
                        {this.props.User.isLoggedIn ? <UserNav logout={this.props.logoutAction} pubName={this.props.User.publisher}/> : <LoginButton/>}
                    </div>
                </div>
            </nav>
    }
}

const mapStateToProps = state => {
    return {
        User: state.User,
        Wallet: state.Wallet
    }
}
const mapDispatchToProps = {
    logoutAction
}

Navbar.propTypes = {
    User: PropTypes.object,
    Wallet: PropTypes.object,
    logoutAction: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
