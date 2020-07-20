import React, { useState, useEffect, useCallback } from 'react';
import Scores from './Scores'
import Space from './Space';
import { WIN_ROWS, SCORE_STORAGE_KEY, INITIAL_SCORES } from './constants'

const checkWinner = (spaces) => {
  for (let row of WIN_ROWS) {
    if (
      spaces[row[0]] &&
      spaces[row[0]] === spaces[row[1]] &&
      spaces[row[1]] === spaces[row[2]]
    ){
      return spaces[row[0]];
    }
  }
  return null;
};

export default function Game() {
  const [spaces, setSpaces] = useState(Array(9).fill(null));
  const [move, setMove] = useState(Math.random() < 0.5 ? 'X' : 'O');
  const [status, setStatus] = useState(`${move}'s move!`);
  const [gameOver, _setGameOver] = useState(false);
  const [scores, setScores] = useState(INITIAL_SCORES);

  useEffect(() => {
    const storedScores = localStorage.getItem(SCORE_STORAGE_KEY);
    if (storedScores) {
      setScores(JSON.parse(storedScores));
    } else {
      localStorage.setItem(SCORE_STORAGE_KEY, JSON.stringify(INITIAL_SCORES));
    }
  }, []);

  useEffect(() => {
    if (gameOver) {
      localStorage.setItem(SCORE_STORAGE_KEY, JSON.stringify(scores));
    }
  }, [gameOver, scores]);

  const onGameOver =  useCallback((winner) => {
    setScores((prevScores) => ({
      ...prevScores,
      [winner]: prevScores[winner] + 1
    }));
    setStatus(winner === 'tie' ? "Tie!" : `${winner} wins!`)
    _setGameOver(true);
  }, []);

  useEffect(() => {
    const boardFull = !spaces.includes(null);
    const winner = checkWinner(spaces);

    if (winner) {
      onGameOver(winner);
    } else if (!winner && boardFull) {
      onGameOver('tie');
    } else {
      setStatus((`${move}'s move!`))
    }
  }, [spaces, move, onGameOver])

  const handleSpaceClick = (index) => {
    if (spaces[index] || gameOver) return;
    setSpaces(spaces.map((box, i) => (i === index ? move : box)));
    setMove(move === 'X' ? 'O' : 'X');
  };

  const onNewGame = () => {
    setSpaces(Array(9).fill(null));
    setMove(Math.random() < 0.5 ? 'X' : 'O');
    setStatus(`${move}'s move!`);
    _setGameOver(false);
  }

  return (
    <div className="game">
      <Scores X={scores.X} O={scores.O} tie={scores.tie}/>
      <h2>{status}</h2>
      <div className="board-row">
        <Space value={spaces[0]} onClick={() => handleSpaceClick(0)} />
        <Space value={spaces[1]} onClick={() => handleSpaceClick(1)} />
        <Space value={spaces[2]} onClick={() => handleSpaceClick(2)} />
      </div>

      <div className="board-row">
        <Space value={spaces[3]} onClick={() => handleSpaceClick(3)} />
        <Space value={spaces[4]} onClick={() => handleSpaceClick(4)} />
        <Space value={spaces[5]} onClick={() => handleSpaceClick(5)} />
      </div>

      <div className="board-row">
        <Space value={spaces[6]} onClick={() => handleSpaceClick(6)} />
        <Space value={spaces[7]} onClick={() => handleSpaceClick(7)} />
        <Space value={spaces[8]} onClick={() => handleSpaceClick(8)} />
      </div>
      {gameOver && <button onClick={onNewGame} className="new-game">New Game</button>}
    </div>

  )
}