import Player from './components/Player.jsx'

function App() {
  return (
    <main>
      <div id="game-container">
        <ol id="players">
        <Player initialName='Sam' symbol='X'/>
        <Player initialName='Hank' symbol='O'/>
        </ol>
        GAME BOARD
      </div>
      LOG
    </main>
  );
}

export default App;
