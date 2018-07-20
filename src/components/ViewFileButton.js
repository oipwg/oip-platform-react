import React, { Component } from 'react';
import PropTypes from "prop-types";
import {connect} from 'react-redux'

class ViewFileButton extends Component {
    constructor(props){
        super(props);

        this.viewFile = this.viewFile.bind(this);
        this.createPriceString = this.createPriceString.bind(this);
    }
    viewFile(){
        this.props.setCurrentFile(this.props.artifact, this.props.activeFile);

        if (this.props.activeFile.info && this.props.activeFile.info.getSuggestedPlayCost() == 0) {
            this.props.payForFile(this.props.activeFile.key)
            return
        }

        if (this.props.activeFile.isPaid && !this.props.activeFile.hasPaid) {
            this.props.paymentInProgress(this.props.activeFile.key)
            this.props.account.Account.payForArtifactFile(this.props.artifact, this.props.activeFile.info, "view", "usd")
                .then(data => {
                    this.props.payForFile(this.props.activeFile.key)
                    console.log('Succesfully paid for artifact file: ', data)
                })
                .catch(err => {
                    this.props.paymentError(this.props.activeFile.key)
                    console.log("Error while trying to pay for artifact file: ", err)
                })
        }

    }

    createPriceString(price){
        // This function assumes the scale has already been applied, and you are passing it a float value
        var priceStr = parseFloat(price.toFixed(3));

        if (isNaN(priceStr)){
            return 0;
        }

        let priceDecimal = priceStr - parseInt(priceStr);

        if (priceDecimal.toString().length === 3){
            priceStr = priceStr.toString() + "0";
        }

        return priceStr.toString();
    }

    render() {
        let hasPaid = false;
        let owned = false;
        let paymentInProgress = false;
        let paymentError = false;

        let disallowPlay = false;
        let sugPlay = 0;

        let viewString = "";
        let viewBtnType = "outline-info";


        if (this.props.activeFile){
            if (this.props.activeFile.owned){
                owned = true;
            }
            if (this.props.activeFile.hasPaid){
                hasPaid = true;
            }
            if (this.props.activeFile.paymentInProgress){
                paymentInProgress = true;
            }
            if (this.props.activeFile.paymentError){
                paymentError = true;
            }

            if (this.props.activeFile.info) {
                if (this.props.activeFile.info.getSuggestedPlayCost()){
                    sugPlay = this.props.activeFile.info.getSuggestedPlayCost();
                }
                if (this.props.activeFile.info.getDisallowPlay()){
                    disallowPlay = this.props.activeFile.info.getDisallowPlay();
                }
            }

        }

        sugPlay = this.createPriceString(sugPlay);

        if (sugPlay === 0 || sugPlay === "0"){
            viewString = "Free";
        } else {
            viewString = "$" + sugPlay;
            viewBtnType = "outline-success";
        }

        if (hasPaid){
            viewBtnType = "outline-info";
            viewString = "View";
        }

        if (owned) {
            viewBtnType = "outline-info";
            viewString = "View";
        }

        if (paymentInProgress) {
            viewBtnType = "outline-info disabled";
            viewString = "paying...";
        }

        if (paymentError) {
            viewBtnType = "outline-danger";
            viewString = "Error!";
        }
        return (
            <div style={{display: disallowPlay ? "" : "inline-block", paddingRight: "3px"}}>
                { disallowPlay ? "" :
                    <button  className={"pad-5 btn btn-" + viewBtnType} onClick={this.viewFile} style={this.props.btnStyle} >
                        <span className="icon icon-controller-play" style={{marginRight: "5px"}}/>{viewString}
                    </button>
                }
            </div>
        )
    }
}

ViewFileButton.propTypes = {
    artifact: PropTypes.object,
    activeFile: PropTypes.object,
    setCurrentFile: PropTypes.func,
    btnStyle: PropTypes.string,
    paymentError: PropTypes.func,
    paymentInProgress: PropTypes.func,
    payForFile: PropTypes.func,
}

function mapStateToProps(state) {
    return {
        account: state.Account
    }
}

export default connect(mapStateToProps)(ViewFileButton)
