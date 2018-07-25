import React from 'react'
import {RANDOM_ARTIFACT_LIST} from "../actions/ArtifactLists/actions";

class ModalCoin extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            coinBalance: undefined,
            coinMainAddress: undefined
        }
    }
    // componentDidMount() {
    //     this.setState({
    //         coinBalance: this.props.acc.wallet.getCoin(this.props.coinName).getBalance(),
    //         // coinMainAddress: this.props.acc.wallet.getCoin(this.props.coinName).getAddress().getPublicAddress()
    //     })
    // }

    render() {
        return (
            <div className="col">
                <img onClick={this.props.onClick} style={this.props.height} src={this.props.imgUrl} alt={this.props.coinName}/>
            </div>
        )
    }
}

export default ModalCoin