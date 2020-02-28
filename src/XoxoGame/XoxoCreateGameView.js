import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from "react-router-dom";
import Switch from '@material-ui/core/Switch';
import XoxoGame from './XoxoGame';
import './XoxoGame.css';

const utils =  require('../utils.js');

class XoxoCreateGameView extends Component {
  constructor(props) {
      super(props);
      this.state = {
        privateSwitch: false
      };
      this.mainUrl = utils.getMainUrl();
      this.handleSwitchChange = this.handleSwitchChange.bind(this);
      this.createGame = this.createGame.bind(this);
  };

  handleSwitchChange () {
    this.setState({
      privateSwitch: !this.state.privateSwitch
    });
  }

  createGame (event) {
    event.preventDefault();
    const data = {
      pass: this.refs.pass.value,
      name: this.refs.name.value
    };
    this.refs.pass.value = '';
    this.refs.name.value = '';
    fetch(this.mainUrl + '/xoxo-games/create-game', {
     method: 'post',
     headers: {'Content-Type':'application/json'},
     body: JSON.stringify(data)
    }).then(function(response) {
      return response.json();
    }).then(function(result) {
      ReactDOM.render(<XoxoGame data={result}/>, document.getElementById('root'));
    });
   }

  render() {
    const privateStyle = this.state.privateSwitch ? {} : {display: 'none'};
    return (
      <div className="xoxo-game">
        <header className="xoxo-game-header row">
          <Link to="/game-xoxo-main" className="btn btn-default back-btn">Back</Link>
          <div className="col-12 col-sm-4"></div>
            <div className="col-12 col-sm-4">
              <form onSubmit={this.createGame}>
                <div className="row">
                  <div className="col-12 form-group">
                      <input
                        required
                        type="text"
                        className="form-control"
                        placeholder="Your Name"
                        name="name"
                        ref="name"
                      />
                  </div>
                  <div className="col-12 form-group">
                      <label>Private?</label>
                      <Switch
                        checked={this.state.privateSwitch}
                        onChange={() => this.handleSwitchChange('privateSwitch')}
                        value="checkedB"
                        color="primary"
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                      />
                  </div>
                  <div style={privateStyle}>
                    <div className="col-12 form-group">
                      <input
                        required={this.state.privateSwitch}
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        name="pass"
                        ref="pass"
                      />
                    </div>
                  </div>
                  <div className="col-12 form-group">
                    <button
                      type="submit"
                      className="btn btn-default">
                        Create
                    </button>
                  </div>
                </div>
              </form>
            </div>
          <div className="col-12 col-sm-4"></div>
       </header>
      </div>
    );
  }
}

export default XoxoCreateGameView;
