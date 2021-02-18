import React, { useState } from 'react';

// Attribution: Based on lecture notes from CS 4550
// Author: Nat Tuck
// Link: https://github.com/NatTuck/scratch-2021-01/blob/master/notes-4550/04-react-intro/notes.md
function Bucks() {
  const [secret, setSecret] = useState(generateCode());
  const [guesses, setGuesses] = useState([]);
  const [guess, setGuess] = useState("");
  const [gameOver, setGameOver] = useState(false);
  
  function updateGuess(ev) {
    setGuess(ev.target.value);
  }
  
  function makeGuess() {
    if (validateGuess(guess)) {
      setGuesses(guesses.concat(guess + ": " + numBucks(guess, secret) + " Bucks & " + numDoes(guess, secret) + " Does"));
      if (guess === secret || guesses.length === 7) {
        setGameOver(true);
      }
      else {
        setGuess("");
      }
    }
    else {
      setGuess("");
    }
  }
  
  function onKeyPress(ev) {
    if (ev.key === "Enter") {
      makeGuess();
    }
  }

  function newGame() {
    setSecret(generateCode());
    setGuesses([]);
    setGuess("");
    setGameOver(false);
  }
  
  function generateCode() {
    let code = "";
    while (code.length < 4) {
      let num = Math.floor(Math.random() * Math.floor(10));
      if (code.indexOf(num.toString()) === -1) {
        code = code + num;
      }
    }
    return code;
  }
  
  function validateGuess(guess) {
    if (guess.length !== 4) {
      return false;
    }
    let nums = [];
    for (let ii = 0; ii < 4; ii++) {
      let digit = parseInt(guess.charAt(ii));
      if (isNaN(digit) || nums.includes(digit)) {
        return false;
      }
      nums.push(digit);
    }
    return true;
  }

  function numBucks(guess, secret) {
    let bucks = 0;
    for (let ii = 0; ii < guess.length; ii++) {
      if (guess.charAt(ii) === secret.charAt(ii)) {
        bucks++;
      }
    }
    return bucks;
  }
  
  function numDoes(guess, secret) {
    let does = 0;
    for (let ii = 0; ii < guess.length; ii++) {
      let digit = guess.charAt(ii);
      if (secret.indexOf(digit) !== ii && secret.indexOf(digit) !== -1) {
        does++;
      }
    }
    return does;
  }

  return (
    <div>
      <h1>Bucks and Does</h1>
      <h2>How To Play:</h2>
      <p>
        Attempt to crack the secret code!<br/>
        Bucks: Each digit that is in the correct position and is in the code.<br/>
        Does: Each digit that is in the wrong position but is in the code.
      </p>
      <h2>The Rules:</h2>
      <p>
        The secret code is four digits.<br/>
        Each digit in the code is unique (0-9).<br/>
        You only have eight attempts.
      </p>
      <h2>The Code: {gameOver ? secret : "_ _ _ _"}</h2>
      <h2>{gameOver ? (guess === secret ? "You win!" : "You lose!") : ""}</h2>
      <label>
        <input
          type="text"
          value={guess}
          onChange={updateGuess}
          onKeyPress={onKeyPress}
          disabled={gameOver ? "disabled" : ""}
        />
        <button onClick={makeGuess} disabled={gameOver ? "disabled" : ""}>Try It!</button>
        <button onClick={newGame}>New Game</button>
      </label>
      <h2>Attempts ({8 - guesses.length} left):</h2>
      <div>{guesses.map((guess, key) => (<div key={key}>{guess}</div>))}</div>
      <br/><br/><br/><br/><br/><br/><br/><br/><br/>
    </div>
  );
}

export default Bucks;
