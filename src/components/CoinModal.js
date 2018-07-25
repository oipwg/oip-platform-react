import React from 'react';
import { Modal, ModalBody, ModalFooter } from 'reactstrap';
import ltc from '../assets/img/ltcflat.svg'
import btc from '../assets/img/btcflat.svg'
import flo from '../assets/img/flo.svg'


class CoinModal extends React.Component {
    render() {
        return (
            <Modal style={{top: "22%"}} isOpen={this.props.isOpen} toggle={this.props.toggleCoinModal} className={this.props.className}>
                <ModalBody style={{margin: "auto", width: "90%"}} className="text-center">
                    <div className="row no-gutters d-flex">
                        <h5 className="m-0 pt-2" style={{fontFamily: "Avenir-light", color: "grey"}}>Select coin to pay with</h5>
                    </div>
                    <hr className="" />
                    <div className="row no-gutters d-flex">
                        <div className="col">
                            <img onClick={this.props.onCoinClick} style={{height: "60px"}} src={btc} alt="bitcoin"/>
                        </div>
                        <div className="col">
                            <img onClick={this.props.onCoinClick} style={{height: "60px"}} src={flo} alt="flo"/>
                        </div>
                        <div className="col">
                            <img onClick={this.props.onCoinClick} style={{height: "60px"}} src={ltc} alt="litecoin"/>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-dark btn-sm" onClick={this.props.toggleCoinModal}>Cancel</button>
                </ModalFooter>
            </Modal>
        )
    }
}

export default CoinModal