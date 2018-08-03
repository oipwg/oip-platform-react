import React, { Component } from 'react';

import SyntaxHighlighter from 'react-syntax-highlighter';
import { monokaiSublime } from 'react-syntax-highlighter/dist/styles';

class CodeContainer extends Component {
	render() {
		let codeString = "";
		return (
			<div style={{overflow: "scroll", height: "100%"}}>
				<div className="justify-content-center markdownContainer" style={{width: "80%", height: "100%", margin: "30px auto", display: "block"}}>
					<SyntaxHighlighter language='javascript' showLineNumbers={true} style={monokaiSublime}>{codeString}</SyntaxHighlighter>
				</div>
			</div>
		);
	}
}

CodeContainer.SUPPORTED_FILE_TYPES = ["a", "asm", "asp", "awk", "bat", "c", "class", "cmd", "cpp", "h", "inc", "inf", "ini", "inl", "ins", "java", "js", "jsp", "log", "sh", "txt", "xml", "json"];
//@ToDo add prop-types

export default CodeContainer;