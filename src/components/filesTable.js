import React, { Component } from 'react';

class FilesTable extends Component {
	render() {
		return (
			<div>
				<table className="table table-sm table-striped table-bordered text-center table-hover table-responsive table-inverse" style={{width: "100%", verticalAlign: "middle"}}>
					<tbody>
						<tr>
							<th scope="row"><span className="icon icon-clapperboard" style={{margin: "auto", display: "table", marginTop: "4px"}}></span></th>
							<td style={{verticalAlign: "middle"}}>Trailer</td>
							<td style={{verticalAlign: "middle"}}>Super Cool Trailer!</td>
							<td style={{verticalAlign: "middle", width: "230px"}}>
								<div style={{margin: "auto"}}>
									<span>Play: </span><button className="btn btn-sm btn-outline-success">$0.001</button>
									<span style={{paddingLeft: "10px"}}>Buy: </span><button className="btn btn-sm btn-outline-success">$0.01</button>
								</div>
							</td>
						</tr>
						<tr>
							<th scope="row"><span className="icon icon-image" style={{margin: "auto", display: "table", marginTop: "4px"}}></span></th>
							<td style={{verticalAlign: "middle"}}>Thumbnail</td>
							<td style={{verticalAlign: "middle"}}>thumbnail.png</td>
							<td style={{verticalAlign: "middle", width: "230px"}}>
								<div style={{margin: "auto"}}>
									<span>View: </span><button className="btn btn-sm btn-outline-info">Free</button>
									<span style={{paddingLeft: "10px"}}>Buy: </span><button className="btn btn-sm btn-outline-success">$0.001</button>
								</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}
}

export default FilesTable;