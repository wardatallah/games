(window["webpackJsonpmy-app"]=window["webpackJsonpmy-app"]||[]).push([[0],{28:function(e,t,a){},29:function(e,t,a){var n=a(59);e.exports={getMainUrl:function(){var e=n.apiHost;return n.apiPort&&(e="".concat(n.apiHost,":").concat(n.apiPort)),e},getServerURL:function(){return n.serverURL}}},44:function(e,t,a){e.exports=a(63)},49:function(e,t,a){},50:function(e,t,a){},59:function(e,t,a){e.exports={apiHost:"https://xoxo-api.herokuapp.com",apiPort:null,serverURL:"https://wardatallah.github.io/games"}},63:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),s=a(15),l=a.n(s),c=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function i(e,t){navigator.serviceWorker.register(e).then(function(e){e.onupdatefound=function(){var a=e.installing;null!=a&&(a.onstatechange=function(){"installed"===a.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}}).catch(function(e){console.error("Error during service worker registration:",e)})}a(49);var o=a(16),m=a(10),u=a(17),d=a(18),h=a(19),p=a(14),f=(a(50),function(e){function t(){return Object(o.a)(this,t),Object(u.a)(this,Object(d.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"App"},r.a.createElement("header",{className:"App-header"},r.a.createElement("p",null,"Please Select a Game"),r.a.createElement(p.b,{className:"btn btn-default",to:"/game-xoxo-main"},"XOXO Game")))}}]),t}(n.Component)),v=a(6),g=a(86),y=a(21),E=a.n(y),b=a(40),N=a(82),k=a(83),x=a(85),w=a(84),S=a(81),C=a(34),j=a(41),O=a.n(j);a(28);function R(){var e=Object(b.a)(["\n    display: block;\n    margin: 0 auto;\n"]);return R=function(){return e},e}var G=a(29),D={firstRow:[0,1,2],secondRow:[3,4,5],thirdRow:[6,7,8],firstColumn:[0,3,6],secondColumn:[1,4,7],thirdColumn:[2,5,8],firstDiameter:[0,4,8],secondDiameter:[2,4,6]},T=Object(C.css)(R());function U(e,t,a){return{first:{key:"xoxo-cell"+e,value:""},second:{key:"xoxo-cell"+t,value:""},third:{key:"xoxo-cell"+a,value:""}}}function P(e){return"1"===e.decision?r.a.createElement("p",{className:"decision"},"Waiting for opponent response"):W()}function W(){var e="".concat(G.getServerURL());return r.a.createElement("a",{href:e,className:"btn btn-default",style:{marginBottom:"5px"}},"Exit")}var _=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(u.a)(this,Object(d.a)(t).call(this,e))).playerNumber=null,a.playerName=null,a.state={data:e.data,turn:"-"===e.data.second_player?"X":"O",pending:2!==e.data.players_number,myTurn:!1,player1Score:e.data.player1_score||0,player2Score:e.data.player2_score||0,gameEnded:1===e.data.game_finished,waitingMsg:"Waiting for opponent",decisionNum:"0",otherPlayerRefused:!1},a.state.cellData=a.resetData(),a.cellClicked=a.cellClicked.bind(Object(v.a)(a)),a.checkClass=a.checkClass.bind(Object(v.a)(a)),a.rematchDecisionClicked=a.updateRematchDecision.bind(Object(v.a)(a)),a.mainUrl=G.getMainUrl(),e.data.result?a.playerNumber||(a.playerNumber=2,a.playerName=e.data.second_player):(a.updateResult(!0),a.playerNumber=1,a.playerName=e.data.first_player),a}return Object(h.a)(t,e),Object(m.a)(t,[{key:"updateRematchDecision",value:function(e){1===this.playerNumber?this.updateResult(null,e):this.updateResult(null,null,e),this.setState({decisionNum:e})}},{key:"updateResult",value:function(e,t,a){var n={result:this.state.cellData,id:this.state.data.id,gameNumber:this.state.data.game_number,nextTurn:"X"!==this.state.turn||e?"X":"O",gameEnded:this.state.gameEnded,player1Score:this.state.player1Score,player2Score:this.state.player2Score};t&&(n.rematchOne=t),a&&(n.rematchTwo=a),fetch(this.mainUrl+"/xoxo-games/update-game",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)}).then(function(e){return e.json()}).then(function(e){})}},{key:"resetData",value:function(){return[U("1","2","3"),U("4","5","6"),U("7","8","9")]}},{key:"cellClicked",value:function(e){e.preventDefault();var t=this;if(this.state.myTurn&&!this.state.gameEnded){var a=e.currentTarget.id,n=this.state.cellData,r=!1;E.a.find(n,function(e){if(e.first.key===a)r=t.setCellValue(e.first);else if(e.second.key===a)r=t.setCellValue(e.second);else{if(e.third.key!==a)return!1;r=t.setCellValue(e.third)}}),r&&(t.setState({myTurn:!1}),this.updateResult())}}},{key:"refreshData",value:function(){var e=this;(!this.state.myTurn||this.state.pending||this.state.gameEnded)&&fetch(this.mainUrl+"/xoxo-games/get-game",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify(this.state.data)}).then(function(e){return e.json()}).then(function(t){e.state.pending&&2===t.players_number&&(e.setState({pending:!1}),e.state.data.second_player=t.second_player),e.state.gameEnded&&0===t.game_finished&&e.setState({gameEnded:!1}),e.setState({myTurn:e.state.turn===t.player_turn}),t.result&&(e.setState({cellData:JSON.parse(t.result)}),e.state.gameEnded||e.checkWinner()),e.rematch(t)})}},{key:"rematch",value:function(e){1===e.rematch_player1&&1===e.rematch_player2?(this.setState({gameEnded:!1,cellData:this.resetData(),decisionNum:"0"}),this.updateResult(null,"0","0")):(1===this.playerNumber&&2===e.rematch_player2||2===this.playerNumber&&2===e.rematch_player1)&&this.setState({otherPlayerRefused:!0}),this.state.gameEnded||this.setState({decisionNum:"0",otherPlayerRefused:!1})}},{key:"checkWinner",value:function(){var e=this,t=this.state.cellData;if(!(E.a.isEmpty(t)||this.state.pending||this.state.gameEnded)){var a=[],n=0;E.a.each(t,function(e){""!==e.first.value&&(n+=1),""!==e.second.value&&(n+=1),""!==e.third.value&&(n+=1),a.push(e.first.value),a.push(e.second.value),a.push(e.third.value)});var r=E.a.keys(D);E.a.each(r,function(t){if(e.checkValues(a,D[t]))return e.colorizeWinningCells(D[t]),!1}),9===n&&(this.setState({gameEnded:!0}),this.updateResult())}}},{key:"colorizeWinningCells",value:function(e){var t=null;E.a.each(e,function(e){var a=e+1,n=document.getElementById("xoxo-cell"+a);t="X"===n.innerHTML?1:2,n.classList.add("winning-cell")});var a="player".concat(t,"Score"),n=this.state[a],r={gameEnded:!0};r[a]=n+1,this.setState(r),this.updateResult()}},{key:"checkValues",value:function(e,t){return""!==e[t[0]]&&e[t[0]]===e[t[1]]&&e[t[0]]===e[t[2]]}},{key:"componentDidMount",value:function(){var e=this;this.interval=setInterval(function(){return e.refreshData()},100),this.state.pending&&(this.intervalMsg=setInterval(function(){return e.updatingWaitingMsg()},400))}},{key:"componentWillUnmount",value:function(){clearInterval(this.interval),clearInterval(this.intervalMsg)}},{key:"setCellValue",value:function(e){return!e.value&&(e.value=this.state.turn,!0)}},{key:"checkClass",value:function(e){return e?"add-class":""}},{key:"updatingWaitingMsg",value:function(){this.state.pending&&(E.a.endsWith(this.state.waitingMsg," . . . .")?this.setState({waitingMsg:"Waiting for opponent"}):this.setState({waitingMsg:this.state.waitingMsg+" ."}))}},{key:"render",value:function(){var e=this,t=this.state.pending?{}:{display:"none"},a=this.state.pending?{display:"none"}:{display:"inline-block",width:"100%",maxWidth:"400px"},n=this.state.gameEnded?{}:{display:"none"},s=this.state.otherPlayerRefused?{}:{display:"none"},l="0"===this.state.decisionNum||this.state.otherPlayerRefused?{display:"none"}:{},c="0"!==this.state.decisionNum||this.state.otherPlayerRefused?{display:"none"}:{};return r.a.createElement("div",{className:"xoxo-game"},r.a.createElement("header",{className:"xoxo-game-header"},r.a.createElement("div",{className:"row form-group",style:{width:"100%"}},r.a.createElement("div",{className:"col-12 col-sm-3 col-xs-3"},r.a.createElement("h5",null,"Player #1"),r.a.createElement("h5",{style:{color:"#33b76e"}},this.state.data.first_player),r.a.createElement("h6",{style:{color:"#33b76e"}},this.state.player1Score)),r.a.createElement("div",{className:"col-12 col-sm-6 col-xs-6 form-group"},r.a.createElement("h5",null,"Game #"),r.a.createElement("h5",{style:{color:"#33b76e"}},this.state.data.game_number)),r.a.createElement("div",{className:"col-12 col-sm-3 col-xs-3"},r.a.createElement("h5",null,"Player #2"),r.a.createElement("h5",{style:{color:"#33b76e"}},this.state.data.second_player),r.a.createElement("h6",{style:{color:"#33b76e"}},this.state.player2Score))),r.a.createElement("div",{className:"row",style:{width:"100%"}},r.a.createElement("div",{className:"col-12 col-sm-12"},r.a.createElement("div",{className:"sweet-loading"},r.a.createElement(O.a,{css:T,sizeUnit:"px",size:30,margin:"2px",color:"#33b76e",loading:this.state.pending}),r.a.createElement("div",{style:t},r.a.createElement("h4",{style:{marginTop:"20px",color:"#33b76e"}},this.state.waitingMsg))),r.a.createElement("div",{className:"col-sm-3 col-xs-0"}),r.a.createElement("div",{className:"col-sm-6 col-xs-12 no-padding"},r.a.createElement(S.a,{style:a},r.a.createElement(N.a,null,r.a.createElement(k.a,{style:{width:"100%",overflowX:"auto"}},this.state.cellData.map(function(t){return r.a.createElement(w.a,null,r.a.createElement(x.a,{id:t.first.key,key:t.first.key,align:"center",onClick:e.cellClicked,className:""!==t.first.value?"value-added":""},t.first.value),r.a.createElement(x.a,{id:t.second.key,key:t.second.key,align:"center",onClick:e.cellClicked,className:""!==t.second.value?"value-added":""},t.second.value),r.a.createElement(x.a,{id:t.third.key,key:t.third.key,align:"center",onClick:e.cellClicked,className:""!==t.third.value?"value-added":""},t.third.value))}))))),r.a.createElement("div",{className:"col-sm-3 col-xs-0"}))),r.a.createElement("div",{className:"game-is-over",style:n},r.a.createElement("div",{style:s},r.a.createElement("div",{className:"col-12 col-sm-12"},r.a.createElement("p",{className:"decision"},"The other player doesn't want to rematch."),r.a.createElement(W,null))),r.a.createElement("div",{style:l},r.a.createElement("div",{className:"col-12 col-sm-12"},r.a.createElement(P,{decision:this.state.decisionNum}))),r.a.createElement("div",{style:c},r.a.createElement("div",{className:"row",style:{marginTop:"10px"}},r.a.createElement("div",{className:"col-12 col-sm-12"},r.a.createElement("p",{className:"decision"},"Wanna rematch?"))),r.a.createElement("div",{className:"row",style:{marginTop:"10px",marginBottom:"10px"}},r.a.createElement("div",{className:"col-6 col-xs-6"},r.a.createElement("input",{type:"button",value:"Yes",className:"btn btn-green",onClick:function(){return e.updateRematchDecision("1")}})),r.a.createElement("div",{className:"col-6 col-xs-6"},r.a.createElement("input",{type:"button",value:"No",className:"btn btn-red",onClick:function(){return e.updateRematchDecision("2")}})))))))}}]),t}(n.Component),M=a(29);function B(e){return r.a.createElement("div",{className:"form-group"},r.a.createElement("button",{id:"submit-btn",type:"submit",className:"btn btn-default"},e.notRandom?"Login":"Search"))}var L=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(u.a)(this,Object(d.a)(t).call(this,e))).state={reason:null,randomGame:!0},a.mainUrl=M.getMainUrl(),a.loginToGame=a.loginToGame.bind(Object(v.a)(a)),a.handleSwitchChange=a.handleSwitchChange.bind(Object(v.a)(a)),a}return Object(h.a)(t,e),Object(m.a)(t,[{key:"loginToGame",value:function(e){e.preventDefault();var t=this;this.setState({reason:null}),this.state.randomGame&&(this.refs.number.value=null,this.refs.pass.value=null);var a={playerName:this.refs.name.value,gameNumber:this.refs.number.value,gamePass:this.refs.pass.value};fetch(this.mainUrl+"/xoxo-games/game-login",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)}).then(function(e){return e.json()}).then(function(e){console.log(e),E.a.get(e,"failure")?t.setState({reason:e.reason}):l.a.render(r.a.createElement(_,{data:e.obj}),document.getElementById("root"))})}},{key:"handleSwitchChange",value:function(){this.setState({randomGame:!this.state.randomGame})}},{key:"render",value:function(){var e=this,t=this.state.randomGame?{display:"none"}:{},a=this.state.randomGame?{}:{display:"none"},n=!this.state.randomGame;return r.a.createElement("div",{className:"xoxo-game"},r.a.createElement("header",{className:"xoxo-game-header row"},r.a.createElement(p.b,{to:"/game-xoxo-main",className:"btn btn-default back-btn"},"Back"),r.a.createElement("div",{className:"col-12 col-sm-4"}),r.a.createElement("div",{className:"col-12 col-sm-4"},r.a.createElement("form",{onSubmit:this.loginToGame},r.a.createElement("span",{style:{display:"block",color:"red"}},this.state.reason),r.a.createElement("div",{className:"form-group"},r.a.createElement("div",{className:"form-group"},r.a.createElement("input",{required:!0,ref:"name",type:"text",className:"form-control",placeholder:"Your Name"})),r.a.createElement("label",null,"Random Game?"),r.a.createElement(g.a,{checked:this.state.randomGame,onChange:function(){return e.handleSwitchChange("randomGame")},value:"checkedB",color:"primary",inputProps:{"aria-label":"primary checkbox"}})),r.a.createElement("div",{style:t},r.a.createElement("div",{className:"form-group"},r.a.createElement("input",{required:n,ref:"number",type:"text",className:"form-control",placeholder:"Game Number"})),r.a.createElement("div",{className:"form-group"},r.a.createElement("input",{required:n,ref:"pass",type:"password",className:"form-control",placeholder:"Game Password"}))),r.a.createElement(B,{notRandom:!this.state.randomGame,randomStyle:a}))),r.a.createElement("div",{className:"col-12 col-sm-4"})))}}]),t}(n.Component),I=a(29),A=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(u.a)(this,Object(d.a)(t).call(this,e))).state={},a.mainUrl=I.getMainUrl(),a}return Object(h.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"xoxo-game"},r.a.createElement("header",{className:"xoxo-game-header row"},r.a.createElement("div",{className:"col-12 col-sm-4"}),r.a.createElement("div",{className:"col-12 col-sm-4"},r.a.createElement("form",null,r.a.createElement("div",{className:"form-group login-form"},r.a.createElement(p.b,{to:"/game-xoxo-create",className:"btn btn-default"},"Create Game"),r.a.createElement(p.b,{to:"/game-xoxo-login",className:"btn btn-default"},"Enter a Game")))),r.a.createElement("div",{className:"col-12 col-sm-4"})))}}]),t}(n.Component),J=a(29),X=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(u.a)(this,Object(d.a)(t).call(this,e))).state={privateSwitch:!1},a.mainUrl=J.getMainUrl(),a.handleSwitchChange=a.handleSwitchChange.bind(Object(v.a)(a)),a.createGame=a.createGame.bind(Object(v.a)(a)),a}return Object(h.a)(t,e),Object(m.a)(t,[{key:"handleSwitchChange",value:function(){this.setState({privateSwitch:!this.state.privateSwitch})}},{key:"createGame",value:function(e){e.preventDefault();var t={pass:this.refs.pass.value,name:this.refs.name.value};this.refs.pass.value="",this.refs.name.value="",fetch(this.mainUrl+"/xoxo-games/create-game",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}).then(function(e){return e.json()}).then(function(e){l.a.render(r.a.createElement(_,{data:e}),document.getElementById("root"))})}},{key:"render",value:function(){var e=this,t=this.state.privateSwitch?{}:{display:"none"};return r.a.createElement("div",{className:"xoxo-game"},r.a.createElement("header",{className:"xoxo-game-header row"},r.a.createElement(p.b,{to:"/game-xoxo-main",className:"btn btn-default back-btn"},"Back"),r.a.createElement("div",{className:"col-12 col-sm-4"}),r.a.createElement("div",{className:"col-12 col-sm-4"},r.a.createElement("form",{onSubmit:this.createGame},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-12 form-group"},r.a.createElement("input",{required:!0,type:"text",className:"form-control",placeholder:"Your Name",name:"name",ref:"name"})),r.a.createElement("div",{className:"col-12 form-group"},r.a.createElement("label",null,"Private?"),r.a.createElement(g.a,{checked:this.state.privateSwitch,onChange:function(){return e.handleSwitchChange("privateSwitch")},value:"checkedB",color:"primary",inputProps:{"aria-label":"primary checkbox"}})),r.a.createElement("div",{style:t},r.a.createElement("div",{className:"col-12 form-group"},r.a.createElement("input",{required:this.state.privateSwitch,type:"password",className:"form-control",placeholder:"Password",name:"pass",ref:"pass"}))),r.a.createElement("div",{className:"col-12 form-group"},r.a.createElement("button",{type:"submit",className:"btn btn-default"},"Create"))))),r.a.createElement("div",{className:"col-12 col-sm-4"})))}}]),t}(n.Component),V=(a(60),a(61),a(62),a(24)),q=r.a.createElement(p.a,{basename:"/"},r.a.createElement("div",null,r.a.createElement(V.a,{exact:!0,path:"/",component:f}),r.a.createElement(V.a,{path:"/game-xoxo-login",component:L}),r.a.createElement(V.a,{path:"/game-xoxo-main",component:A}),r.a.createElement(V.a,{path:"/game-xoxo-create",component:X})));l.a.render(q,document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("/games",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",function(){var t="".concat("/games","/service-worker.js");c?(!function(e,t){fetch(e).then(function(a){var n=a.headers.get("content-type");404===a.status||null!=n&&-1===n.indexOf("javascript")?navigator.serviceWorker.ready.then(function(e){e.unregister().then(function(){window.location.reload()})}):i(e,t)}).catch(function(){console.log("No internet connection found. App is running in offline mode.")})}(t,e),navigator.serviceWorker.ready.then(function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")})):i(t,e)})}}()}},[[44,1,2]]]);
//# sourceMappingURL=main.12d1bbd0.chunk.js.map