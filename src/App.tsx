import React, { Component, useCallback } from "react";
import logo from "./logo.svg";
import "./App.css";
import * as bplistparser from "bplist-parser";
import ShortcutPreview from "shortcut-preview";

import Dropzone, {useDropzone, DropEvent} from "react-dropzone";


function downloadShortcut(url: string) {
	return new Promise((resolve, reject) => {
		const request = new XMLHttpRequest();
		request.open("GET", `https://shortcutsweb.app/inspectshortcut?url=${encodeURIComponent(url)}`);
		request.responseType = "arraybuffer";
		request.onload=e => {resolve(request);};
		request.send();
	});
}

// bplistparser .parserfile accepts a first argument of a buffer!!!

// request = new XMLHttpRequest();request.open("GET", "https://www.icloud.com/shortcuts/api/records/d433de99a9ef4b3aac65d46b065c4cc1");request.send();request.onreadystatechange=(e)=>console.log(request, e);
// request = new XMLHttpRequest();request.open("GET", "https://cvws.icloud-content.com/B/AVpo4RcpK-RL_6EFrBUIYin_DGXJ/filename.shortcut?o=AhmCh_eq9R__UO_LoM1SVmM0W3NHRfEnLPUdVxODbct1sYckxbJbaSAEmpZy6Dm2bQ&v=1&x=3&a=B4eNtLgXqNR2oSjBTQT2zecqN7fLA63MSQEAAANxzEk&e=1552495483&k=_&fl=&r=568d89e6-0ec3-4862-b42c-b3317468e6ce-1&ckc=com.apple.shortcuts&ckz=_defaultZone&p=33&s=mPBj-NM_0H7lAUI4wzmbvEI1HfM");request.send();request.onreadystatechange=(e)=>console.log(request, e);
// request = https://shortcutsweb.app/inspectshortcut?url=[icloud link]


class App extends Component<{}, {data: any | undefined, loading: boolean}> {
	constructor(props: Readonly<{}>) {
		super(props);
		this.state = {data: undefined, loading: true};

		this.setState({loading: true});
		const urlParams = new URLSearchParams(window.location.search);
		const shortcut = urlParams.get("shortcut");
		if(!shortcut) {
			this.setState({loading: false});
			return;
		}
		this.load(shortcut);
	}
	onDrop(acceptedFiles: File[], _rejectedFiles: File[], _event: DropEvent) {
		const reader = new FileReader();

		reader.onabort = () => alert("file reading was aborted");
		reader.onerror = () => alert("file reading has failed");
		reader.onload = () => {
			// Do whatever you want with the file contents
			const binaryStr = reader.result as ArrayBuffer;
			const result = bplistparser.parseBuffer(new Buffer(binaryStr));
			this.setState({data: result, loading: false});
		};

		acceptedFiles.forEach(file => reader.readAsArrayBuffer(file));
	}
	async load(shortcut: string) {
		try{
			const result: XMLHttpRequest = await downloadShortcut(shortcut) as XMLHttpRequest;
			console.log(result, result.response, Object.keys(result));
			this.setState({
				data: bplistparser.parseBuffer(new Buffer(result.response as ArrayBuffer))
			});
		}catch(er) {
			this.setState({loading: false});
		}
	}
	render() {
		let preview;
		if(this.state.data) {preview = <ShortcutPreview data={this.state.data} />;}
		else if(this.state.loading) {preview = <div>Loading...</div>;}
		else{preview = <div>No shortcut selected.</div>;}
		return (
			<div className="App">
				<h1>Preview of shortcut</h1>
				{preview}
				<Dropzone onDrop={this.onDrop.bind(this)}>
					{({getRootProps, getInputProps}) => (
						<section>
							<div {...getRootProps()}>
								<input {...getInputProps()} />
								<p>Click to choose .shortcut file</p>
							</div>
						</section>
					)}
				</Dropzone>
			</div>
		);
	}
}

export default App;
