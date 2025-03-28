import { useState, useEffect } from "react";
import "./index.css";

const GRID_SIZE = 6;

export default function MineGame() {
  const [grid, setGrid] = useState([]);
  const [revealed, setRevealed] = useState([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [mineLimit, setMineLimit] = useState(10);

  useEffect(() => {
    resetGame();
  }, [mineLimit]);

  const resetGame = () => {
    let newGrid = Array(GRID_SIZE * GRID_SIZE).fill("safe");
    let minesPlaced = 0;
    while (minesPlaced < mineLimit) {
      let randIndex = Math.floor(Math.random() * newGrid.length);
      if (newGrid[randIndex] !== "mine") {
        newGrid[randIndex] = "mine";
        minesPlaced++;
      }
    }
    setGrid(newGrid);
    setRevealed(Array(GRID_SIZE * GRID_SIZE).fill(false));
    setScore(0);
  };

  const handleClick = (index) => {
    if (revealed[index]) return;

    const newRevealed = [...revealed];
    newRevealed[index] = true;
    setRevealed(newRevealed);

    if (grid[index] === "mine") {
      setScore((prev) => prev - 5);
    } else {
      setScore((prev) => prev + 10);
    }

    if (score > highScore) setHighScore(score);
  };

  return (
    <div className="game-container">
      <div className="game-guide" style={{ width: "100%" }}>
        <h2>Game Guide</h2>
        <p>✅ Click on a box to reveal it.</p>
        <p>💣 If it's a mine, you lose <strong>5 points</strong>.</p>
        <p>✅ If it's safe, you gain <strong>10 points</strong>.</p>
        <p>🎯 Reset game anytime.</p>
        <label>Mine Limit: 
          <input 
            type="number" 
            min="1" 
            max={15}
            value={mineLimit} 
            onChange={(e) => setMineLimit(Number(e.target.value))} 
          />
        </label>
      </div>
      <div className="game-main">
        <h1 className="game-title">Mine Game</h1>
        <div className="score-container">
          <p>🔢 Score: <span>{score}</span></p>
          <p>🏆 Highest Score: <span>{highScore}</span></p>
          <p>💣 Mine Limit: {mineLimit}</p>
        </div>
        <div className="grid-container">
          {grid.map((cell, index) => (
            <div
              key={index}
              onClick={() => handleClick(index)}
              className={`grid-item ${revealed[index] ? (cell === "mine" ? "mine revealed-mine" : "safe revealed-safe") : ""}`}
            >
              {revealed[index] && cell === "mine" ? "💥" : ""}
            </div>
          ))}
        </div>
        <button className="reset-button" onClick={resetGame}>🔄 Reset Game</button>
      </div>
    </div>
  );
}
