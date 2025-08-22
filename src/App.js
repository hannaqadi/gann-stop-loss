import { useState } from "react";
import styles from "./App.module.css";

const App = () => {
  const [price, setPrice] = useState()
  const [degree, setDegree] = useState()
  const [stopLoss, setStopLoss] = useState(null);
  const [formula, setFormula] = useState("plus"); // selected formula
  const Calculation = () => {
    if (price === "" || degree === "") return;
    const A = Number(price);
    const deg = Number(degree);

    let result;
    if (formula === "plus") {
      result = Math.pow(Math.sqrt(A) + deg / 360, 2);
    } else {
      result = Math.pow(Math.sqrt(A) - deg / 360, 2);
    }

    setStopLoss(Number(result.toFixed(4))); // round to 4 decimal places
  }
  return (
    <div className={styles.container}>
      <div>
        <h3>Gann stop loss</h3>
        <h4>The formula</h4>
        <p>(√A + degrees/360)² For a stop loss above A (Resistance) (When Shorting) </p>
        <p>(√A - degrees/360)² For a stop loss below A (Support) (When Going Long)</p>
        <div>
          <p>Select formula:</p>
          <div style={{ display: "flex", gap: "10px" }}>
            <button
              style={{
                backgroundColor: formula === "plus" ? "#4caf50" : "#ccc",
                color: formula === "plus" ? "white" : "black",
              }}
              onClick={() => setFormula("plus")}
            >
              (√A + degrees/360)²
            </button>
            <button
              style={{
                backgroundColor: formula === "minus" ? "#f44336" : "#ccc",
                color: formula === "minus" ? "white" : "black",
              }}
              onClick={() => setFormula("minus")}
            >
              (√A - degrees/360)²
            </button>
          </div>
          <p>Input previous days price:</p>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value === "" ? "" : Number(e.target.value))}
          />
          <p>Input degree of translation:</p>
          <input
            type="number"
            value={degree}
            onChange={(e) => setDegree(e.target.value === "" ? "" : Number(e.target.value))}
          />
        </div>
        <button onClick={Calculation}>Enter</button>
        {stopLoss ? (
          <div>
            <h4>Stop Loss Result:</h4>
            <p>Result is rounded to 4 significant figures</p>
            <p>{stopLoss}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default App;
