import React from 'react';

export default function Space({ value, onClick }) {
  return (
    <button className="board__space" onClick={onClick}>{value}</button>
  );
}
