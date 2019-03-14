import React, { Component, useCallback } from "react";
import logo from "./logo.svg";
import "./App.css";
import * as bplistparser from "bplist-parser";
import ShortcutPreview from "shortcut-preview";

import {Helmet} from "react-helmet";
import Dropzone, {useDropzone, DropEvent} from "react-dropzone";

type ShortcutData = {result: boolean, name: string, icon: string, downloadURL: string};

function downloadShortcut(id: string): Promise<[ArrayBuffer | undefined, ShortcutData | undefined]> {
	// @ts-ignore
	return Promise.all([
		new Promise((resolve, reject) => {
			const request = new XMLHttpRequest();
			request.open("GET", `https://shortcutsweb.app/inspectshortcut?id=${encodeURIComponent(id)}`);
			request.responseType = "arraybuffer";
			request.onload = e => {resolve(request.response as ArrayBuffer);};
			request.onerror = e => reject(e);
			request.onabort = e => reject(e);
			request.send();
		}), new Promise((resolve, reject) => {
			const request = new XMLHttpRequest();
			request.open("GET", `https://shortcutsweb.app/inspectshortcut?id=${encodeURIComponent(id)}&info=basic`);
			request.responseType = "json";
			request.onload=e => {resolve(request.response as ShortcutData);};
			request.onerror=e => resolve(undefined);
			request.onabort=e => resolve(undefined);
			request.send();
		})
	]);
}

// bplistparser .parserfile accepts a first argument of a buffer!!!

// request = new XMLHttpRequest();request.open("GET", "https://www.icloud.com/shortcuts/api/records/d433de99a9ef4b3aac65d46b065c4cc1");request.send();request.onreadystatechange=(e)=>console.log(request, e);
// request = new XMLHttpRequest();request.open("GET", "https://cvws.icloud-content.com/B/AVpo4RcpK-RL_6EFrBUIYin_DGXJ/filename.shortcut?o=AhmCh_eq9R__UO_LoM1SVmM0W3NHRfEnLPUdVxODbct1sYckxbJbaSAEmpZy6Dm2bQ&v=1&x=3&a=B4eNtLgXqNR2oSjBTQT2zecqN7fLA63MSQEAAANxzEk&e=1552495483&k=_&fl=&r=568d89e6-0ec3-4862-b42c-b3317468e6ce-1&ckc=com.apple.shortcuts&ckz=_defaultZone&p=33&s=mPBj-NM_0H7lAUI4wzmbvEI1HfM");request.send();request.onreadystatechange=(e)=>console.log(request, e);
// request = https://shortcutsweb.app/inspectshortcut?url=[icloud link]


class App extends Component<{}, {data: any | undefined, loading: boolean, shortcutData: ShortcutData | undefined, shortcutID: string | undefined}> {
	constructor(props: Readonly<{}>) {
		super(props);
		this.state = {data: undefined, loading: true, shortcutData: undefined, shortcutID: undefined};
	}
	componentDidMount() {
		this.setState({loading: true});
		const urlParams = new URLSearchParams(window.location.search);
		console.log("urlparams");
		const shortcut = urlParams.get("shortcut");
		if(!shortcut) {
			console.log("!shortcut");
			this.setState({loading: false});
			return;
		}
		const shortcutID = shortcut.match(/[a-z0-9]{32}/);
		if(!shortcutID) {
			console.log("!shortcutid");
			this.setState({loading: false});
			return;
		}
		this.setState({loading: true, shortcutID: shortcutID[0]});
		this.load(shortcutID[0]);
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
			const [result, shortcutData]: [ArrayBuffer | undefined, ShortcutData | undefined] = await downloadShortcut(shortcut);
			if(!result) {
				this.setState({loading: false});
				return;
			}
			this.setState({
				data: bplistparser.parseBuffer(new Buffer(result)),
				shortcutData: shortcutData
			});
		}catch(er) {
			this.setState({loading: false});
		}
	}
	render() {
		if(this.state.data) {
			if(this.state.shortcutData) {
				return <div className="App">
					<Helmet>
						<title>{this.state.shortcutData.name} - Preview</title>
						<link rel="icon" type="image/png" href={this.state.shortcutData.icon} />
					</Helmet>
					<header className="center">
						<img src={this.state.shortcutData.icon}/><h1 className="shortcutName">{this.state.shortcutData.name}</h1>
						<p><a href={this.state.shortcutData.downloadURL}>Download .shortcut</a></p>
						{this.state.shortcutID ? <p><a href={`https://www.icloud.com/shortcuts/${this.state.shortcutID}`}>View iCloud Page</a></p> : undefined}
					</header>
					<ShortcutPreview data={this.state.data} />
				</div>;
			}
			return <div className="App">
				<ShortcutPreview data={this.state.data} />
			</div>;
		}
		else if(this.state.loading) {
			return <div className="App">
				<div>Loading...</div>
			</div>;
		}
		return <div className="App">
			<div className="fullCenter">
				<div className="split">
					<Dropzone onDrop={this.onDrop.bind(this)}>
						{({getRootProps, getInputProps}) => (
							<div className="item fullsize" {...getRootProps()}>
								<div className="fileupload">
									<input {...getInputProps()} />
									<p>Choose .shortcut file</p>
								</div>
							</div>
						)}
					</Dropzone>
					<div className="item">or</div>
					<div className="item fullsize">
						<form method="get">
							<p>Enter iCloud URL</p>
							<input type="text" name="shortcut" />
							<button>go</button>
						</form>
					</div>
				</div>
			</div>
		</div>;
	}
}

export default App;
