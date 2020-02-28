import React, { Component } from 'react';
import { Link } from "react-router-dom";

// import logo from './logo.svg';
import './App.css';

class App extends Component {

	render() {
		return (
			<div className="App">
				<header className="App-header">
					{/* <img src={logo} className="App-logo" alt="logo" /> */}
					<p>Please Select a Game</p>
					<Link
					className="btn btn-default"
					to="/game-xoxo-main">
						XOXO Game
					</Link>
				</header>
			</div>
		);
	}
}

export default App;
