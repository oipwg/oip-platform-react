import React from 'react'
import {RANDOM_ARTIFACT_LIST} from "../actions/ArtifactLists/actions";

class ModalCoin extends React.Component {
    render() {
        return (
            <div className="col">
                <img onClick={this.props.onClick} style={this.props.height} src={this.props.imgUrl} alt={this.props.coinName}/>
            </div>
        )
    }
}

export default ModalCoin