import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './XoxoGame.css';

const utils =  require('../utils.js');

class XoxoMainView extends Component {
  constructor(props) {
      super(props);
      this.state = {};
      this.mainUrl = utils.getMainUrl();

  };

  render() {
    return (
      <div className="xoxo-game">
        <header className="xoxo-game-header row">
          <div className="col-12 col-sm-4"></div>
            <div className="col-12 col-sm-4">
              <form >
                <div className="form-group login-form">
                  <Link to="/game-xoxo-create" className="btn btn-default">Create Game</Link>
                  <Link to="/game-xoxo-login" className="btn btn-default">Enter a Game</Link>
                </div>
              </form>
            </div>
          <div className="col-12 col-sm-4"></div>
       </header>
      </div>
    );
  }
}

export default XoxoMainView;
