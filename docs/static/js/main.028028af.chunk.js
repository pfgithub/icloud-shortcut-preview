(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{13:function(t,e,a){"use strict";(function(t){var n=a(8),r=a.n(n),o=a(21),s=a(14),c=a(15),i=a(16),l=a(22),u=a(17),h=a(23),d=a(0),m=a.n(d),p=(a(35),a(4)),f=a(9),v=a.n(f),E=a(18),w=a(20);function g(t){return Promise.all([new Promise(function(e,a){var n=new XMLHttpRequest;n.open("GET","https://shortcutsweb.app/inspectshortcut?id=".concat(encodeURIComponent(t))),n.responseType="arraybuffer",n.onload=function(t){e(n.response)},n.onerror=function(t){return a(t)},n.onabort=function(t){return a(t)},n.send()}),new Promise(function(e,a){var n=new XMLHttpRequest;n.open("GET","https://shortcutsweb.app/inspectshortcut?id=".concat(encodeURIComponent(t),"&info=basic")),n.responseType="json",n.onload=function(t){e(n.response)},n.onerror=function(t){return e(void 0)},n.onabort=function(t){return e(void 0)},n.send()})])}p.maxObjectCount=9999999;var b=function(e){function a(t){var e;return Object(c.a)(this,a),(e=Object(l.a)(this,Object(u.a)(a).call(this,t))).state={data:void 0,loading:!0,shortcutData:void 0,shortcutID:void 0},e}return Object(h.a)(a,e),Object(i.a)(a,[{key:"componentDidMount",value:function(){this.setState({loading:!0});var t=new URLSearchParams(window.location.search);console.log("urlparams");var e=t.get("shortcut");if(!e)return console.log("!shortcut"),void this.setState({loading:!1});var a=e.match(/[a-z0-9]{32}/);if(!a)return console.log("!shortcutid"),void this.setState({loading:!1});this.setState({loading:!0,shortcutID:a[0]}),this.load(a[0])}},{key:"onDrop",value:function(e,a,n){var r=this,o=new FileReader;o.onabort=function(){return alert("file reading was aborted")},o.onerror=function(){return alert("file reading has failed")},o.onload=function(){var e=o.result,a=p.parseBuffer(new t(e));r.setState({data:a,loading:!1})},e.forEach(function(t){return o.readAsArrayBuffer(t)})}},{key:"load",value:function(){var e=Object(s.a)(r.a.mark(function e(a){var n,s,c,i;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,g(a);case 3:if(n=e.sent,s=Object(o.a)(n,2),c=s[0],i=s[1],c){e.next=10;break}return this.setState({loading:!1}),e.abrupt("return");case 10:this.setState({data:p.parseBuffer(new t(c)),shortcutData:i}),e.next=18;break;case 13:e.prev=13,e.t0=e.catch(0),console.log(e.t0),alert("Error while previewing shortcut: ".concat(e.t0.toString())),this.setState({loading:!1});case 18:case"end":return e.stop()}},e,this,[[0,13]])}));return function(t){return e.apply(this,arguments)}}()},{key:"render",value:function(){return this.state.data?this.state.shortcutData?m.a.createElement("div",{className:"App"},m.a.createElement(E.Helmet,null,m.a.createElement("title",null,this.state.shortcutData.name," - Preview"),m.a.createElement("link",{rel:"icon",type:"image/png",href:this.state.shortcutData.icon})),m.a.createElement("header",{className:"center"},m.a.createElement("img",{src:this.state.shortcutData.icon}),m.a.createElement("h1",{className:"shortcutName"},this.state.shortcutData.name),m.a.createElement("p",null,m.a.createElement("a",{href:this.state.shortcutData.downloadURL},"Download .shortcut")),this.state.shortcutID?m.a.createElement("p",null,m.a.createElement("a",{href:"https://www.icloud.com/shortcuts/".concat(this.state.shortcutID)},"View iCloud Page")):void 0),m.a.createElement(v.a,{data:this.state.data})):m.a.createElement("div",{className:"App"},m.a.createElement(v.a,{data:this.state.data})):this.state.loading?m.a.createElement("div",{className:"App"},m.a.createElement("div",null,"Loading...")):m.a.createElement("div",{className:"App"},m.a.createElement("div",{className:"fullCenter"},m.a.createElement("div",{className:"split"},m.a.createElement(w.a,{onDrop:this.onDrop.bind(this)},function(t){var e=t.getRootProps,a=t.getInputProps;return m.a.createElement("div",Object.assign({className:"item fullsize"},e()),m.a.createElement("div",{className:"fileupload"},m.a.createElement("input",a()),m.a.createElement("p",null,"Choose .shortcut file")))}),m.a.createElement("div",{className:"item"},"or"),m.a.createElement("div",{className:"item fullsize"},m.a.createElement("form",{method:"get"},m.a.createElement("p",null,"Enter iCloud URL"),m.a.createElement("input",{type:"text",name:"shortcut"}),m.a.createElement("button",null,"go"))))))}}]),a}(d.Component);e.a=b}).call(this,a(10).Buffer)},24:function(t,e,a){t.exports=a(308)},29:function(t,e,a){},308:function(t,e,a){"use strict";a.r(e);var n=a(0),r=a.n(n),o=a(12),s=a.n(o),c=(a(29),a(13));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(r.a.createElement(c.a,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(t){t.unregister()})},35:function(t,e,a){}},[[24,1,2]]]);
//# sourceMappingURL=main.028028af.chunk.js.map