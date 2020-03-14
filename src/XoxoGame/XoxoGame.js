import React, { Component } from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
// import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { css } from '@emotion/core';
import GridLoader from 'react-spinners/GridLoader';

import _ from 'lodash';
import './XoxoGame.css';

const utils =  require('../utils.js');
const winningSet = {
  firstRow: [0, 1, 2],
  secondRow: [3, 4, 5],
  thirdRow: [6, 7, 8],
  firstColumn: [0, 3, 6],
  secondColumn: [1, 4, 7],
  thirdColumn: [2, 5, 8],
  firstDiameter: [0, 4, 8],
  secondDiameter: [2, 4, 6]
};

const mainGreen = '#33b76e';

const override = css`
    display: block;
    margin: 0 auto;
`;

function createData(firstCell, secondCell, thirdCell) {
  return {
    first: {
      key: 'xoxo-cell' + firstCell,
      value: ''
    },
    second: {
      key: 'xoxo-cell' + secondCell,
      value: ''
    },
    third: {
      key: 'xoxo-cell' + thirdCell,
      value: ''
    }
  };
}


// const classes = useStyles();

class XoxoGame extends Component {

  playerNumber = null;
  playerName = null;

  constructor(props) {
      super(props);
      this.state = {
        data: props.data,
        turn: props.data.second_player === '-' ? 'X' : 'O',
        pending: props.data.players_number !== 2,
        myTurn: false,
        gameEnded:  props.data.game_finished === '1' ? true : false,
        waitingMsg: 'Waiting for opponent',
        decisionNum: '0',
        otherPlayerRefused: false
      };
      this.state.cellData = this.resetData();
      this.cellClicked = this.cellClicked.bind(this);
      this.checkClass = this.checkClass.bind(this);
      this.rematchDecisionClicked = this.updateRematchDecision.bind(this);
      this.mainUrl = utils.getMainUrl();
      if (!props.data.result) {
        this.updateResult(true);
        this.playerNumber = 1;
        this.playerName = props.data.first_player;
      } else if (!this.playerNumber) {
        this.playerNumber = 2;
        this.playerName = props.data.second_player;
      }
   };

  updateRematchDecision (decisionNum) {
    if (this.playerNumber === 1) {
      this.updateResult(null, decisionNum);
    } else {
      this.updateResult(null, null, decisionNum);
    }

    this.setState({
      decisionNum: decisionNum
    });
  }

  updateResult (isNewPlayer, rematchOne, rematchTwo) {
    const data = {
      result: this.state.cellData,
      id: this.state.data.id,
      gameNumber: this.state.data.game_number,
      nextTurn: this.state.turn === 'X' && !isNewPlayer ? 'O' : 'X',
      gameEnded: this.state.gameEnded
    };

    if (!!rematchOne) {
      data.rematchOne = rematchOne;
    }
    if (!!rematchTwo) {
      data.rematchTwo = rematchTwo;
    }
    fetch(this.mainUrl + '/xoxo-games/update-game', {
     method: 'post',
     headers: {'Content-Type':'application/json'},
     body: JSON.stringify(data)
    }).then(function(response) {
      return response.json();
    }).then(function(result) {
      // ReactDOM.render(<XoxoGame data={result}/>, document.getElementById('root'));
    });
  }

  resetData() {
    return [
        createData('1', '2', '3'),
        createData('4', '5', '6'),
        createData('7', '8', '9'),
      ];
  }

  cellClicked(event) {
    event.preventDefault();
    var self = this;
    if (!this.state.myTurn || !!this.state.gameEnded) return;
    let id = event.currentTarget.id;
    let tempData = this.state.cellData;
    let cellUpdated = false;
    _.find(tempData, obj => {
      if (obj.first.key === id) {
        cellUpdated = self.setCellValue(obj.first);
      } else if (obj.second.key === id) {
        cellUpdated = self.setCellValue(obj.second);
      } else if (obj.third.key === id) {
        cellUpdated = self.setCellValue(obj.third);
      } else return false;
    });

    if (!cellUpdated) return;

    this.updateResult();
  }

  refreshData() {
    const self = this;
    fetch(this.mainUrl + '/xoxo-games/get-game', {
     method: 'post',
     headers: {'Content-Type':'application/json'},
     body: JSON.stringify(this.state.data)
    }).then(function(response) {
      return response.json();
    })
    .then(function(data) {
      if (!!self.state.pending && data.players_number === 2) {
        self.setState({
          pending: false
        });
        self.state.data.second_player = data.second_player;
      }

      self.setState({myTurn: self.state.turn === data.player_turn});

      if (!!data.result) {
        self.setState({
          cellData: JSON.parse(data.result),
          gameEnded: data.game_finished === 1
        });
        self.checkWinner();
      }
      self.rematch(data);
    });
  }

  rematch(data) {
    if (data.rematch_player1 === 1 && data.rematch_player2 === 1) {
      this.setState({
        gameEnded: false,
        cellData: this.resetData(),
        decisionNum: '0'
      });
      this.updateResult(null, '0', '0');
    } else if ((this.playerNumber === 1 && data.rematch_player2 === 2) ||
        (this.playerNumber === 2 && data.rematch_player1 === 2)) {
      this.setState({
        otherPlayerRefused: true
      });
    }

    if (!this.state.gameEnded) {
      this.setState({
        decisionNum: '0',
        otherPlayerRefused: false
      });
    }
  }

  checkWinner() {
    const self = this;
    const result = this.state.cellData;
    if (_.isEmpty(result) || this.state.pending || this.state.gameEnded) return;
    const tempData = [];
    let numberOfFilledCells = 0;
    _.each(result, function (obj) {
      if (obj.first.value !== '')
        numberOfFilledCells += 1;
      if (obj.second.value !== '')
        numberOfFilledCells += 1;
      if (obj.third.value !== '')
        numberOfFilledCells += 1;

      tempData.push(obj.first.value);
      tempData.push(obj.second.value);
      tempData.push(obj.third.value);
    });
    let gameEnded = false;

    const winningSetKeys = _.keys(winningSet);

    _.each(winningSetKeys, function (key) {
      if (self.checkValues(tempData, winningSet[key])) {
        self.colorizeWinningCells(winningSet[key]);
        gameEnded = true;
        return false;
      }
    });

    if (numberOfFilledCells === 9) {
      gameEnded = true;
    }
    this.setState({gameEnded: gameEnded});
  }

  colorizeWinningCells(array) {
    _.each(array, function (obj) {
      const num = obj + 1;
      let el = document.getElementById('xoxo-cell' + num);
      el.classList.add('winning-cell');
    });
  }

  checkValues(data, array) {
    return data[array[0]] !== '' && data[array[0]] === data[array[1]] &&
      data[array[0]] === data[array[2]];
  }

  componentDidMount() {
    this.interval = setInterval(() => this.refreshData(), 150);
    if (this.state.pending) {
      this.intervalMsg = setInterval(() => this.updatingWaitingMsg(), 150);
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    clearInterval(this.intervalMsg);
  }

  setCellValue(cell) {
    if (!cell.value) {
      // let cellEl = document.getElementById(cell.key);
      // cellEl.innerHTML = this.state.turn;
      // cellEl.classList.add('value-added');
      cell.value = this.state.turn;
      return true;
    } else {
      return false;
    }
  }

  checkClass(value) {
    return !!value ? 'add-class' : '';
  }

  updatingWaitingMsg() {
    if (_.endsWith(this.state.waitingMsg, ' . . . .')) {
      this.setState({
          waitingMsg: 'Waiting for opponent'
      });
    } else {
      this.setState({
          waitingMsg: this.state.waitingMsg + ' .'
      });
    }
  }

  render() {
    const gamePendingStyle = this.state.pending ? {} : {display: 'none'};
    const gameFull = !this.state.pending ? {display: 'inline-block', width: '100%', maxWidth: '400px'} : {display: 'none'};
    const gameEndedStyle = this.state.gameEnded ? {} : {display: 'none'};
    const playerRefusedToRematchStyle = !!this.state.otherPlayerRefused ? {} : {display: 'none'};
    const decisionMadeStyle = this.state.decisionNum !== '0' ? {} : {display: 'none'};
    const rematchModalStyle = this.state.decisionNum !== '0' || this.state.otherPlayerRefused ? {display: 'none'} : {};
    return (
      <div className="xoxo-game">
        <header className="xoxo-game-header">
          <div className="row form-group" style={{width: '100%'}}>
            <div className="col-12 col-sm-3 col-xs-3">
              <h5>Player #1</h5>
              <h5 style={{color: mainGreen}}>{this.state.data.first_player}</h5>
            </div>
            <div className="col-12 col-sm-6 col-xs-6 form-group">
              <h5>Game #</h5>
              <h5 style={{color: mainGreen}}>{this.state.data.game_number}</h5>
            </div>
            <div className="col-12 col-sm-3 col-xs-3">
              <h5>Player #2</h5>
              <h5 style={{color: mainGreen}}>{this.state.data.second_player}</h5>
            </div>
          </div>
          <div className="row" style={{width: '100%'}}>
            <div className="col-12 col-sm-12">
              <div className='sweet-loading'>
                <GridLoader
                  css={override}
                  sizeUnit={"px"}
                  size={30}
                  margin={'2px'}
                  color={mainGreen}
                  loading={this.state.pending}
                />
                <div style={gamePendingStyle}>
                  <h4 style={{marginTop: '20px', color: mainGreen}}>{this.state.waitingMsg}</h4>
                </div>
              </div>
              <div className="col-sm-3 col-xs-0"></div>
              <div className="col-sm-6 col-xs-12 no-padding">
                <Paper style={gameFull}>
                  <Table>
                    <TableBody style={{ width: '100%',
                      overflowX: 'auto' }}>
                      {this.state.cellData.map(row => (
                        <TableRow>
                          <TableCell id={row.first.key} key={row.first.key} align="center" onClick={this.cellClicked} className={row.first.value !== '' ? 'value-added' : ''}>{row.first.value}</TableCell>
                          <TableCell id={row.second.key} key={row.second.key} align="center" onClick={this.cellClicked} className={row.second.value !== '' ? 'value-added' : ''}>{row.second.value}</TableCell>
                          <TableCell id={row.third.key} key={row.third.key} align="center" onClick={this.cellClicked} className={row.third.value !== '' ? 'value-added' : ''}>{row.third.value}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Paper>
              </div>
              <div className="col-sm-3 col-xs-0"></div>
            </div>
          </div>
          <div className="game-is-over" style={gameEndedStyle}>
            <div style={playerRefusedToRematchStyle}>
              <div className="col-12 col-sm-12">
                <p>The other player doesn't want to rematch.</p>
                <ExitDiv/>
              </div>
            </div>
            <div style={decisionMadeStyle}>
              <div className="col-12 col-sm-12">
                <DecisionDiv decision={this.state.decisionNum}/>
              </div>
            </div>

            <div style={rematchModalStyle}>
              <div className="row" style={{marginTop: '10px'}}>
                <div className="col-12 col-sm-12">
                  Wanna rematch?
                </div>
              </div>
              <div className="row" style={{marginTop: '20px'}}>
                <div className="col-6 col-xs-6">
                  <input type="button" value="Yes" className="btn btn-green" onClick={() => this.updateRematchDecision('1')}/>
                </div>
                <div className="col-6 col-xs-6">
                  <input type="button" value="No" className="btn btn-red" onClick={() => this.updateRematchDecision('2')}/>
                </div>
              </div>
            </div>
          </div>
       </header>
      </div>
    );
  }
}

function DecisionDiv(props) {
  if (props.decision === '1')
    return ('Waiting for opponent response');
  else
    return ExitDiv();
}

function ExitDiv() {
  const exitLink = `${utils.getServerURL()}/game-xoxo-main`;
  return (<a href={exitLink} className="btn btn-default">Exit</a>);
}

export default XoxoGame;
