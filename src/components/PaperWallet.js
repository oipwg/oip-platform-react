import React, { Component } from 'react';
import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';

import QRCode from 'qrcode.react';

import FloLogo from '../assets/img/flo.svg';
import FloBG from '../assets/img/florincoin-pw-bg.png';

class PaperWallet extends Component {
	constructor(props){
		super(props);

		this.drawPaperWallet = this.drawPaperWallet.bind(this);
		this.imageLoaded = this.imageLoaded.bind(this);
		this.wrapText = this.wrapText.bind(this);
		this.printCanvas = this.printCanvas.bind(this);
	}
	componentDidMount(){
		this.drawPaperWallet();
	}
	drawPaperWallet(){
		this.canvas.width = 1000;
		this.canvas.height = 430;
		this.ctx = this.canvas.getContext("2d");

		// Draw the background image
		this.bg = new Image();
		this.logo = new Image();
		// On image load
		this.bg.onload = this.imageLoaded;
		this.logo.onload = this.imageLoaded;
		// Start the load process to the bg image
		this.bg.src = this.props.bg;
		this.logo.src = this.props.logo;
	}
	wrapText(context, text, x, y, maxWidth, lineHeight) {
        var words = text.split(' ');
        var line = '';

        for(var n = 0; n < words.length; n++) {
          var testLine = line + words[n] + ' ';
          var metrics = context.measureText(testLine);
          var testWidth = metrics.width;
          if (testWidth > maxWidth && n > 0) {
            context.fillText(line, x, y);
            line = words[n] + ' ';
            y += lineHeight;
          }
          else {
            line = testLine;
          }
        }
        context.fillText(line, x, y);
      }
	imageLoaded(){
		// Check to make sure all images are now here & we have access to them.
		if (!this.bg || !this.bg.complete)
			return;
		if (!this.logo || !this.logo.complete)
			return;
		if (!this.publicKeyQR || !this.publicKeyQR._canvas){
			setTimeout(this.imageLoaded, 100);
			return;
		}

		// Set canvas to background width/height
		this.canvas.width = this.bg.naturalWidth;
		this.canvas.height = this.bg.naturalHeight;
		// Draw the background to the canvas context
		this.ctx.drawImage(this.bg, 0, 0, this.canvas.width, this.canvas.height);

		// Draw at x & y
		this.ctx.drawImage(this.logo, 82, 392, 85, 85);
		this.ctx.drawImage(this.logo, 830, 340, 50, 50);

		this.ctx.save();

		// Rotate then draw QR & Public Key
		this.ctx.translate(1020,600);
		this.ctx.rotate(-90*Math.PI/180);
		this.ctx.drawImage(this.publicKeyQR._canvas, 50, 50);
		this.ctx.font="18px Georgia";
		this.ctx.textAlign="center";
		this.ctx.fillText(this.props.public.slice(0,17), 150, 280)
		this.ctx.fillText(this.props.public.slice(17,60), 150, 310)

		this.ctx.restore();

		this.ctx.save();

		// Rotate then draw QR & Public Key
		this.ctx.translate(830,-10);
		this.ctx.rotate(90*Math.PI/180);
		this.ctx.drawImage(this.privateKeyQR._canvas, 50, 50);
		this.ctx.font="13px Georgia";
		this.ctx.textAlign="center";
		this.ctx.fillText(this.props.private.slice(0,25), 150, 280)
		this.ctx.fillText(this.props.private.slice(25,60), 150, 310)

		this.ctx.restore();

		this.ctx.save();

		this.ctx.translate(510, 360);
		this.ctx.font="15px Georgia";
		this.wrapText(this.ctx, "·  To deposit funds to this paper wallet, send cryptocurrency to its public address, anytime.", 0,0,350,18);
		this.wrapText(this.ctx, "·  Verify your balance by searching for the public address using a blockchain explorer such as " + this.props.explorer, 0,40,350,18);
		this.wrapText(this.ctx, "·  DO NOT REVEAL THE PRIVATE KEY until you are ready to import the balance on this wallet to a cryptocurrency client, exchange or online wallet.", 0,100,350,18);
		this.wrapText(this.ctx, "   Amount : __________  Date : ___________", 0,165,350,18);
		this.wrapText(this.ctx, "   Notes: _____________________________", 0,190,350,18);

		this.publicKeyQR._canvas.getContext("2d").clearRect(0, 0, this.publicKeyQR._canvas.width, this.publicKeyQR._canvas.height);
		this.privateKeyQR._canvas.getContext("2d").clearRect(0, 0, this.privateKeyQR._canvas.width, this.privateKeyQR._canvas.height);

		if (this.props.print)
			setTimeout(this.printCanvas, 100)
	}
	printCanvas(){
		var dataUrl = this.canvas.toDataURL(); //attempt to save base64 string to server using this var  
	    var windowContent = '<!DOCTYPE html>';
	    windowContent += '<html>'
	    windowContent += '<head><title>Print Paper Wallet</title></head>';
	    windowContent += '<body>'
	    windowContent += '<img src="' + dataUrl + '">';
	    windowContent += '</body>';
	    windowContent += '</html>';
	    var printWin = window.open('','','width=340,height=260');
	    printWin.document.open();
	    printWin.document.write(windowContent);
	    printWin.document.close();
	    setTimeout(function(){
		    printWin.focus();
		    printWin.print();
		    printWin.close();
		}, 200);

		if (this.props.onPrint && typeof this.props.onPrint === "function"){
			this.props.onPrint();
		}
	}
	render() {
		return (
			<div style={{width: "1000px", height: "430px", display: this.props.print ? "none" : "block"}}>
				<canvas ref={canvas => this.canvas = canvas} style={{width: "100%", height: "100%"}} />
				<QRCode ref={publicKeyQR => this.publicKeyQR = publicKeyQR} value={this.props.public} size={200} style={{display:"none"}} />
				<QRCode ref={privateKeyQR => this.privateKeyQR = privateKeyQR} value={this.props.private} size={200} style={{display:"none"}} />
			</div>
		);
	}
}
/*
<div className="paper-wallet">
	<div className="pw-div">
		<div className="pw-logo">
			<img className="pw-currency-logo" src={this.props.currency_logo} alt="currency_logo" />
		</div>
		<div className="pw-holder">
			<img className="pw-wallet-img" src={this.props.currency_bg} alt='currency_bg' />
			<div className="pw-qr-1">
				<canvas className="pw-qr-1canvas">
				</canvas>
			</div>
			<div className="pw-qr-2">
				<canvas className="pw-qr-2canvas">
				</canvas>
			</div>
			<div className="pw-pub-key">
				128CkiNaE5ZovivjXi2rdAftZNM2JupQcm
			</div>
			<div className="pw-priv-key">
				5Jo316q7RhWMA1YKyJys2uf2FCWa2EG1DnMrqktN8utAm2LtyUo
			</div>
			<div className="pw-text">
				<img src={this.props.currency_logo} alt="currency_logo" className="pw-text-img" />
				<ul className="pw-text-box">
					<li className="pw-text-1">
						To deposit funds to this paper wallet, send cryptocurrency to its public address, anytime.
					</li>
					<li className="pw-text-2">
						Verify your balance by searching for the public address using a blockchain explorer such as blockchain.info.
					</li>
					<li className="pw-text-3">
						<b className="pw-text-bold">DO NOT REVEAL THE PRIVATE KEY</b> until you are ready to import the balance on this wallet to a cryptocurrency client, exchange or online wallet.
					</li>
				</ul><b className="pw-text-bold2">Amount :</b> ___________ <b className="pw-text-bold2">Date :</b> ________________<br className="pw-text-bold3" /><b className="pw-text-bold2">Notes :</b> ______________________________________
			</div>
		</div>
	</div>
</div>
*/
export default PaperWallet;