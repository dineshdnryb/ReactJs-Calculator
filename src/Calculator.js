import { Link } from "react-router-dom";
import "./Calculator.css";
function Calculator() {
  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">55jjn4</div>
        <div className="current-operand">5555554</div>
      </div>
      <button className="span-tow">AC</button>
      <button>DEL</button>
      <button>÷</button>
      <button>1</button>
      <button>2</button>
      <button>3</button>
      <button>*</button>
      <button>4</button>
      <button>5</button>
      <button>6</button>
      <button>+</button>
      <button>7</button>
      <button>8</button>
      <button>9</button>
      <button>-</button>
      <button>.</button>
      <button>0</button>
      <button className="span-tow">=</button>

      <Link to="Temp">
        <button>UseReducer</button>
      </Link>
    </div>
  );
}

export default Calculator;
