import Player from './components/Player.jsx'
import GameBoard from './components/GameBoard.jsx';
import { useState } from 'react';

function App() {
  const [activePlayer, setActiveplayer]= useState('X');

  function handleActivePlayer(){
    setActiveplayer((curActivePlayer) => curActivePlayer === 'X' ? 'O' : 'X');
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className ="highlight-player">
        <Player initialName='Sam' symbol='X' isActive={activePlayer === 'X'}/>
        <Player initialName='Hank' symbol='O' isActive={activePlayer === 'O'}/>
        </ol>
        <GameBoard onSelectSquare={handleActivePlayer} activePlayerSymbol={activePlayer}/>
      </div>
      LOG
    </main>
  );
}

export default App;
