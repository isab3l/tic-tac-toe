import React from 'react';

export default function Scores({ X, O, tie }) {
  return (
    <div className="scores">
      <h3>X wins: {X} </h3>
      <h3>O wins: {O} </h3>
      <h3>Ties: {tie} </h3>
    </div>
  )
}