import { useState } from "react";

export default function Player({ initialName, symbol, isActive , savePlayer}) {
  const [isEditing, setIsEditing] = useState(false);

  const [playerName, setPlayerName] = useState(initialName);

  function handleEditClick() {
    /* editing  is previous state value, this is recommended by react during state update
    Why are we not using simply setIsEditing(!isEditing) ?? 
    It is because React is scheduling state updates in the background which are not performed
    instantly, but at some point in the future. In most cases future is almost instantaneous,
    but sometimes it is not. So it is important We use only the below syntax for state update
    */

    /*
    Suppose we are using the below code
     setIsEditing(!isEditing)
    setIsEditing(!isEditing)
    One would expect the state to not change as it gets toggled twice, but in reality
    we can see other behaviour. It goes to Edit state, and not to saved state. with above code
    
    */
    setIsEditing((editing) => !editing);
    savePlayer(symbol, playerName);
  }

  function handleChange(event){
    setPlayerName(() => event.target.value);
  }

  //storing the jsx in a variable to toggle the editable mode

  let editablePlayerName = <span className="player-name">{playerName}</span>;

  if (isEditing) {
    editablePlayerName = <input type="text" required value={playerName}
     onChange={handleChange}/>;
     //we will automatically get the event emitted by onChange in handleChange
  }



  return (
    <li className={isActive? 'active' : undefined}>
      <span className="player">
        {editablePlayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      {!isEditing && <button onClick={handleEditClick}>Edit</button>}
      {isEditing && <button onClick={(handleEditClick)}>Save</button>}
    </li>
  );
}
