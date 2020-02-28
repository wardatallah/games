import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import Switch from '@material-ui/core/Switch';
import _ from 'lodash';
import XoxoGame from './XoxoGame';
import './XoxoGame.css';

const utils =  require('../utils.js');

class XoxoLogin extends Component {
  constructor(props) {
	  super(props);
	  this.state = {
		reason: null,
		randomGame: true
	  };
	  this.mainUrl = utils.getMainUrl();
	  this.loginToGame = this.loginToGame.bind(this);
	  this.handleSwitchChange = this.handleSwitchChange.bind(this);
   };

  loginToGame(event) {
	event.preventDefault();
	const self = this;
	this.setState({reason: null});
	if (this.state.randomGame) {
		this.refs.number.value = null;
		this.refs.pass.value = null;
	}
	const data = {
	  playerName: this.refs.name.value,
	  gameNumber: this.refs.number.value,
	  gamePass: this.refs.pass.value,
	};
	fetch(this.mainUrl + '/xoxo-games/game-login', {
	 method: 'post',
	 headers: {'Content-Type':'application/json'},
	 body: JSON.stringify(data)
	}).then(function(response) {
	  return response.json();
	}).then(function(result) {
	  console.log(result);
	  if (!!_.get(result, 'failure')) {
		self.setState({
		  reason: result.reason
		});
	  } else {
		ReactDOM.render(<XoxoGame data={result.obj}/>, document.getElementById('root'));
	  }
	});
  }

  handleSwitchChange() {
	this.setState({randomGame: !this.state.randomGame});
  }
  render() {
	const notRandomStyle = !this.state.randomGame ? {} : {display: 'none'};
	const randomStyle = this.state.randomGame ? {} : {display: 'none'};
	const isRequired = this.state.randomGame ? false : true;
	return (
	  <div className="xoxo-game">
		<header className="xoxo-game-header row">
		  <Link to="/game-xoxo-main" className="btn btn-default back-btn">Back</Link>
		  <div className="col-12 col-sm-4"></div>
			<div className="col-12 col-sm-4">
			  <form onSubmit={this.loginToGame}>
				<span style={{display: 'block', color: 'red'}}>{this.state.reason}</span>
				<div className="form-group">
					  <div className="form-group">
						<input
						  required
						  ref="name"
						  type="text"
						  className="form-control"
						  placeholder="Your Name"
						/>
					  </div>
					  <label>Random Game?</label>
					  <Switch
						checked={this.state.randomGame}
						onChange={() => this.handleSwitchChange('randomGame')}
						value="checkedB"
						color="primary"
						inputProps={{ 'aria-label': 'primary checkbox' }}
					  />
				</div>
				<div style={notRandomStyle}>
				  <div className="form-group">
					<input
					  required={isRequired}
					  ref="number"
					  type="text"
					  className="form-control"
					  placeholder="Game Number"
					/>
				  </div>
				  <div className="form-group">
					<input
					  required={isRequired}
					  ref="pass"
					  type="password"
					  className="form-control"
					  placeholder="Game Password"
					/>
				  </div>
				</div>
				<SubmitButton notRandom={!this.state.randomGame} randomStyle={randomStyle}/>
			  </form>
			</div>
		  <div className="col-12 col-sm-4"></div>
	   </header>
	  </div>
	);
  }
}

function SubmitButton(props) {
	return (<div className="form-group">
			  <button
				id="submit-btn"
				type="submit"
				className="btn btn-default">
				{props.notRandom ? 'Login' : 'Search'}
				</button>
			</div>);
  }
export default XoxoLogin;
