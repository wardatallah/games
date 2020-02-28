import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import './index.css';
import App from './Main/App';
import XoxoLogin from './XoxoGame/XoxoLogin';
// import XoxoGame from './XoxoGame/XoxoGame';
import XoxoMainView from './XoxoGame/XoxoMainView';
import XoxoCreateGameView from './XoxoGame/XoxoCreateGameView';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap-social/bootstrap-social.css';
// import Header from './components/HeaderComponent.js';
// import Footer from './components/FooterComponent.js';
import { HashRouter, Route } from 'react-router-dom';
const routing = (
  <HashRouter basename="/">
    <div>
      {/* <Header /> */}
      <Route exact path="/" component={App} />
      <Route path="/game-xoxo-login" component={XoxoLogin} />
      <Route path="/game-xoxo-main" component={XoxoMainView} />
      <Route path="/game-xoxo-create" component={XoxoCreateGameView} />
      {/* <Route path="/game-xoxo" component={XoxoGame} /> */}
      {/* <Footer /> */}
    </div>
  </HashRouter>
);
ReactDOM.render(routing, document.getElementById('root'));
serviceWorker.register();


// import React from 'react';
// import ReactDOM from 'react-dom';
// import './Main/App.css';
// import App from './Main/App';
// import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
