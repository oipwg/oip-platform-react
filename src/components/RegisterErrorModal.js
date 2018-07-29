import React from 'react';
import { Modal, ModalBody, ModalFooter } from 'reactstrap';

export default class RegisterErrorModal extends React.Component {
    render() {
        return (
            <Modal style={{top: "22%"}} isOpen={this.props.isOpen} toggle={this.props.toggle} className={this.props.className}>
                <ModalBody style={{margin: "auto", width: "90%"}} className="text-center">
                    <div className="row no-gutters d-flex">
                        <h5 style={{color: "grey"}}>{this.props.errMessage}</h5>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-success btn-sm" onClick={this.props.toggle}>Cool, got it</button>
                </ModalFooter>
            </Modal>
        )
    }
}