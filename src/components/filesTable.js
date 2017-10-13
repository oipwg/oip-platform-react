import React, { Component } from 'react';

class FilesTable extends Component {
	constructor(props){
		super(props);

		this.viewFile = this.viewFile.bind(this);
	}
	viewFile(file){
		this.props.setCurrentFile(file);
	}
	render() {
		let _this = this;
		return (
			<div>
				<table className="table table-sm table-striped table-bordered text-center table-hover table-responsive table-inverse" style={{width: "100%", verticalAlign: "middle"}}>
					<tbody>
						{this.props.files.map(function(file, i){
							return <tr key={i}>
										<th scope="row"><span className={"icon icon-" + file.icon} style={{margin: "auto", display: "table", marginTop: "4px"}}></span></th>
										<td style={{verticalAlign: "middle"}}>{file.subtype ? file.subtype : file.type}</td>
										<td style={{verticalAlign: "middle"}}>{file.dname ? file.dname : file.fname}</td>
										<td style={{verticalAlign: "middle", width: "230px"}}>
											<div style={{margin: "auto"}}>
												{file.disPlay ? "" : <button onClick={function(){_this.viewFile(file)}} className={file.sugPlay ? "btn btn-sm btn-outline-success" : "btn btn-sm btn-outline-info"}><span className="icon icon-controller-play"></span> {file.sugPlay ? "$" + file.sugPlay : "Free"}</button>}
												<span style={{paddingLeft: "10px"}}></span>
												{file.disBuy ? "" : <button className={file.sugBuy ? "btn btn-sm btn-outline-success" : "btn btn-sm btn-outline-info"}><span className="icon icon-download"></span> {file.sugBuy ? "$" + file.sugBuy : "Free"}</button>}
											</div>
										</td>
									</tr>
						})}
					</tbody>
				</table>
			</div>
		);
	}
}

export default FilesTable;