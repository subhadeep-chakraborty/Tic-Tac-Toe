import Player from './components/Player.jsx'
import GameBoard from './components/GameBoard.jsx';
import { useState } from 'react';
import Log from './components/Log.jsx';
import GameOver from './components/GameOver.jsx'
import {WINNING_COMBINATIONS} from './winning-combinations.js'

const initialGameBoard =[
  [null,null,null],
  [null,null,null],
  [null,null,null]
]


function deriveActivePlayer(gameTurns){
  let currPlayerSymbol = 'X';
  if(gameTurns.length && gameTurns[0].player === 'X'){
    currPlayerSymbol = 'O';
  }
  return currPlayerSymbol;
}


function App() {
  // const [activePlayer, setActiveplayer]= useState('X');
  const [gameTurns, setGameTurns] =useState([]);
  const activePlayer = deriveActivePlayer(gameTurns);

  let gameBoard = [...initialGameBoard.map(array =>[ ...array])]; //deep copy 
  for(const turn of gameTurns){
      const {square , player} = turn;
      const {row, col} = square;
      gameBoard[row][col]= player;
  }
  let winner =null;
  
  for(const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && 
      firstSquareSymbol === thirdSquareSymbol){
        winner = firstSquareSymbol;
      }
  }
  const hasDraw = gameTurns.length === 9 && !winner;

  function handleActivePlayer(rowIndex, colIndex){
   
    setGameTurns(prevTurns => {
     const activePlayer = deriveActivePlayer(prevTurns);
      const updatedTurns =[
        {square: {row:rowIndex, col:colIndex},  player: activePlayer}, 
        ...prevTurns
      ];
      return updatedTurns; 
    });
  }

  function handleRestart(){
    setGameTurns([]);
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className ="highlight-player">
        <Player initialName='Sam' symbol='X' isActive={activePlayer === 'X'}/>
        <Player initialName='Hank' symbol='O' isActive={activePlayer === 'O'}/>
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner}  restart={handleRestart}/>}
        <GameBoard onSelectSquare={handleActivePlayer} board={gameBoard}/>
      </div>
      <Log turns={gameTurns}/>
    </main>
  );
}

export default App;
