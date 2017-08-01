import React, { Component } from 'react';

class PublishContainer extends Component {
	render() {
		return (
			<div className="container">
				<section className="row text-center">
					<div className="col-sm-12" style={{marginTop: "20px"}}>
						<h4 className="m0 text-thin">Welcome to the Alexandria Publisher</h4><small>Please fill in the fields below</small>
					</div>
					<div className="container">
						<div style={{marginTop: "60px"}}>
							<div className="section publish col-lg-12">
								<div className="publish-section artifact-type">
									<h5>Select Artifact type</h5> 
									<div className="row justify-content-center" style={{marginBottom: "20px"}} id="typeCircles">
										<div className="col-2"><div className="type-circle song-icon type-circle-active"></div>Audio</div>
										<div className="col-2"><div className="type-circle video-icon"></div>Video</div>
										<div className="col-2"><div className="type-circle image-icon"></div>Image</div>
										<div className="col-2"><div className="type-circle text-icon"></div>Text</div>
										<div className="col-2"><div className="type-circle software-icon"></div>Software</div>
										<div className="col-2"><div className="type-circle web-icon"></div>Web</div>
									</div>
									<ul className="nav nav-pills" role="tablist" id="subtypePills">
										<li className="active" onClick="changeArtifactType('music')"><a href="#music" data-toggle="tab">Basic</a></li>
										<li onClick="changeArtifactType('song')"><a href="#video" data-toggle="tab">Song</a></li>
										<li onClick="changeArtifactType('album')"><a href="#video" data-toggle="tab">Album</a></li>
										<li onClick="changeArtifactType('podcast')"><a href="#podcast" data-toggle="tab">Podcast</a></li>
										<li onClick="changeArtifactType('book')"><a href="#book" data-toggle="tab">Book</a></li>
										<li onClick="changeArtifactType('movie')"><a href="#movie" data-toggle="tab">Movie</a></li>
										<li onClick="changeArtifactType('thing')"><a href="#thing" data-toggle="tab">Thing</a></li>
										<li onClick="changeArtifactType('html')"><a href="#html" data-toggle="tab">HTML</a></li>
									</ul>
								</div>
								<div className="publish-section" id='metainfo'>
									<div id='music' className="">
										<div className="row">
											<div className="col-sm-8">
												<div className="row">
													<div className="col-12">
														<h3 id="metaTitle">title</h3>
													</div>
												</div>
												<div className="row" id="metaForm">
													<div className="col-12 form-group" id="artifactTitleGroup">
														<input type="text" className="form-control" id="title" placeholder="Album Title" />
													</div>
													<div className="col-12 form-group" id="artifactArtistGroup">
														<input type="text" className="form-control" id="artistName" placeholder="Artist Name" />
													</div>
													<div className="col-6">
														<div className="form-group" id="artifactgenreGroup">
															<input type="text" className="form-control" id="genre" placeholder="Genre" />
														</div>
													</div>
													<div className="col-6">
														<div className="form-group" id="artifactDateGroup">
															<input type="number" className="form-control" id="releaseDate" placeholder="Release Year" />
														</div>
													</div>
													<div className="col-12 form-group" id="artifactTagsGroup">
														<input type="text" className="form-control" id="tags" placeholder="Tags" />
													</div>
													<div className="col-12 form-group" id="artifactRecordLabelGroup">
														<input type="text" className="form-control" id="recordLabel" placeholder="Record Label" />
													</div>
													<div className="col-12 form-group" id="artifactDescriptionGroup">
														<textarea rows="3" className="form-control" id="description" placeholder="Album Description"></textarea>
													</div>
												</div>
											</div>
											<div className="col-4">
												<center>
													<h3 id="posterTitle">Cover Art</h3>
													<div className="cover-art-square" id='poster'>
													</div>
													<label className="custom-file text-left" style={{marginTop: "10px"}}>
														<input type="file" id="posterFile" className="custom-file-input" />
														<span className="custom-file-control"></span>
													</label>
												</center>
											</div>
										</div>
									</div>
								</div>
								<div className="row" id='bitcoinAddressField'>
									<div className="col-sm-12">
										<h3>Pricing Information</h3>
										<center style={{marginTop: "15px", marginBottom: "20px"}}>
											<span style={{fontSize: "1.5em", fontWeight: "100", marginRight: "10px"}}>I want my Artifact to be:</span>
											<div className="btn-group" data-toggle="buttons">
												<label className="btn btn-outline-primary active" id='freeRadioLabel'>
													<input id='freeRadio' type="radio" name="free" autoComplete="off"  /> Free
												</label>
												<label className="btn btn-outline-success" id='paidRadioLabel'>
													<input id='paidRadio' type="radio" name="free" autoComplete="off" onClick="$('#paymentInfo').show();"  /> Paid 
												</label>
											</div>
										</center>
										<div className="row text-left" id="paymentInfo">
											<div className="col-6">
												<h5 className="text-center">Suggested Tips</h5>
												<div className="row">
													<div className="col"><input type="text" className="form-control col" id="tip1" placeholder="$0.01" /></div>
													<div className="col"><input type="text" className="form-control col" id="tip2" placeholder="$0.10" /></div>
													<div className="col"><input type="text" className="form-control col" id="tip3" placeholder="$1" /></div>
												</div>
												<h5 className="text-center" style={{marginTop: "20px"}}>Advanced</h5>
												<div className="form-group row text-right">
													<label for="example-text-input" className="col-3 col-form-label">Promoter</label>
													<div className="col-3">
														<div className="input-group">
															<input id="promoter" type="text" className="form-control" />
															<span className="input-group-addon" style={{paddingLeft: "5px", paddingRight: "5px"}}>%</span>
														</div>
													</div>
													<label for="example-text-input" className="col-3 col-form-label">Retailer</label>
													<div className="col-3">
														<div className="input-group">
															<input id="retailer" type="text" className="form-control" />
															<span className="input-group-addon" style={{paddingLeft: "5px", paddingRight: "5px"}}>%</span>
														</div>
													</div>
												</div>
											</div>
											<div className="col-6" id="bitcoinAddressGroup">
												<div className="form-group col-lg-12">
													<h5 className="text-center">Payment Addresses</h5>
														<div id="paymentAddresses">
														<div className="row" id="1">
															<div className="input-group col-11" style={{marginBottom: "5px"}}>
																<div className="input-group-btn has-danger">
																	<button type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
																		<img style={{height: "30px"}} src="/assets/img/Bitcoin.svg" alt="" />
																	</button>
																	<div className="dropdown-menu">
																		<a style={{paddingLeft: "-10px"}} className="dropdown-item" href="" onClick="PhoenixUI.changePaymentAddressType(this);return false;"><img style={{height: "30px"}} src="/assets/img/Bitcoin.svg" alt="" /> <span> Bitcoin</span></a>
																		<a style={{paddingLeft: "-10px"}} className="dropdown-item" href="" onClick="PhoenixUI.changePaymentAddressType(this);return false;"><img style={{height: "30px"}} src="/assets/img/FLOflat2.png" alt="" /> <span> Florincoin</span></a>
																		<a style={{paddingLeft: "-10px"}} className="dropdown-item" href="" onClick="PhoenixUI.changePaymentAddressType(this);return false;"><img style={{height: "30px"}} src="/assets/img/Litecoin.svg" alt="" /> <span> Litecoin</span></a>
																	</div>
																</div>
																<input type="text" className="form-control" onInput="PhoenixUI.onPaymentAddressChange(this);" />
																<span className="input-group-addon">
																	<input type="radio" name="mainAddressRadio" checked />
																</span>
															</div>
															<div className="col-1">
																<button className="btn btn-outline-success" style={{height: "80%", marginLeft: "-20px", marginTop: "3px"}} onClick="PhoenixUI.addPaymentAddress(this);">+</button>
															</div>
														</div>
													</div>
														
													<small id="emailHelp" className="form-text text-muted">Select the default payment address using the selector on the Right side.</small>
												</div>
											</div>
											<div className="col-12">
												<div className="publish-section publish-pricing" id='pricing'>
													<div className="row">
														<div className="col-sm-12">
															<p className="small">Pick the price for each file. You are allowed to enter up to one tenth of a cent.</p>
														</div>
													</div>
													<div className="row">
														<div className="col col-lg-12">
															<table className="table" id='pricingTable'>
																<thead>
																	<tr>
																		<th>File Name</th>
																		<th>Suggested Play</th>
																		<th>Minimum Play</th>
																		<th>Suggested Buy</th>
																		<th>Minimum Buy</th>
																		<th></th>
																	</tr>
																</thead>
																<tbody>
																	<tr className="text-center">
																		
																	</tr>
																</tbody>
															</table>
															<center><h3 id="pleaseAddFile">Please add a file below...</h3></center>
														</div>
													</div>
												</div>
											</div>
										</div>			
									</div>
								</div>
								
								<div className="publish-section">
									<h3 style={{marginBottom: "10px"}}>Select Files</h3>
									<div className="publish-files audio-tracks">
										<table className="table" id='mediaFilesTable' style={{marginTop: "-15px"}}>
											<thead>
												<tr>
													<th width="5%" className="text-center" style={{borderTop: "none"}}></th>
													<th width="40%" className="text-center" style={{borderTop: "none"}}>Display Name</th>
													<th width="10%" className="text-center" style={{borderTop: "none"}}>Size</th>
													<th width="30%" className="text-center" style={{borderTop: "none"}}>Type</th>
													<th width="10%" className="text-center" style={{borderTop: "none"}}></th>
												</tr>
											</thead>
											<tbody id="mediaTable">
												<tr>
													<td><span className="icon icon-beamed-note" style={{color: "#000", width: "auto", height: "100%"}}></span></td>
													<td className="text-left"> <input type="text" className="form-control" name="dispName" value="Display Name" /></td>
													<td>3.2MB</td>
													<td style={{width: "100%"}}>
														<div className="row form-control dual-selector">
															<select className="form-control col-6" id="exampleSelect1">
																<option>Audio</option>
																<option>Video</option>
																<option>Image</option>
																<option>Software</option>
																<option>Web</option>
																<option>Text</option>
															</select>
															<select className="form-control col-6" id="exampleSelect1">
																<option>Song</option>
															</select>
														</div>
													</td>
													<td><button className="btn btn-sm btn-outline-danger">x</button></td>
												</tr>
											</tbody>
										</table>
										<div className="upload-area" id="mediaDrop" style={{paddingBottom: "5px"}}>
											<span className="icon icon-upload-to-cloud" style={{color: "#000", width: "auto", height: "100%"}}></span>
										</div>
										<label className="custom-file text-left" style={{float: "right", marginTop: "-40px", marginRight: "0px"}}>
											<input type="file" name="mediaFiles" id="mediaFiles" multiple accept="audio/*" className="custom-file-input" />
											<span className="custom-file-control"></span>
										</label>
									</div>
								</div>
								 <div className="publish-section publish-submit">
									<div className="row align-items-center">
										<div className="col-4">
											<p className="small">You will be able to submit your artifact after you preview it. Be sure it looks exactly like what you desire as you will be unable to change this later.</p>
										</div>
										<div className="col-4 text-center" style={{color: "green"}}>
											Cost To Publish
											<br />
											<h1 style={{marginBottom: "0px"}} id="publishFee">Free!</h1>
										</div>
										<div className="col-4 text-right">
											<button type="button" id="previewButton" className="btn btn-outline-info">Preview</button>
										</div>
									</div>
								</div>
								<div style={{height: "30px"}}></div>
							</div>
						</div>
					</div>
				</section>
			</div>
		);
	}
}

export default PublishContainer;