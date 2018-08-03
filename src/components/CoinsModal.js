import React from 'react';
import { Modal, ModalBody, ModalFooter } from 'reactstrap';
import ModalCoin from './ModalCoin';

import ltc from '../assets/img/ltcflat.svg'
import btc from '../assets/img/btcflat.svg'
import flo from '../assets/img/flo.svg'


class CoinsModal extends React.Component {
    render() {
        return (
            <Modal style={{top: "22%"}} isOpen={this.props.isOpen} toggle={this.props.toggleCoinModal} className={this.props.className}>
                <ModalBody style={{margin: "auto", width: "90%"}} className="text-center">
                    <div className="row no-gutters d-flex">
                        <h5 className="m-0 pt-2" style={{fontFamily: "Avenir-light", color: "grey"}}>Select coin to pay with</h5>
                    </div>
                    <hr className="" />
                    <div className="row no-gutters d-flex">
                        <ModalCoin onClick={this.props.onCoinClick} acc={this.props.acc} height={coinHeight} imgUrl={btc} coinName="bitcoin"/>
                        <ModalCoin onClick={this.props.onCoinClick} acc={this.props.acc} height={coinHeight} imgUrl={flo} coinName="flo"/>
                        <ModalCoin onClick={this.props.onCoinClick} acc={this.props.acc} height={coinHeight} imgUrl={ltc} coinName="litecoin"/>

                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-dark btn-sm" onClick={this.props.toggleCoinModal}>Cancel</button>
                </ModalFooter>
            </Modal>
        )
    }
}

export default CoinsModal

const coinHeight = {
    height: "60px"
}