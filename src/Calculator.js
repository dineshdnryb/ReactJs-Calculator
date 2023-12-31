import { Link } from "react-router-dom";
import "./Calculator.css";
import { useReducer } from "react";
import DigitButton from './DigitButton';
import OperationButton from './OperationButton';
export const ACTIONS={
  ADD_DIGIT:'add-didgit',
  CHOOSE_OPERATION:'choose-operation',
  CLEAR:'clear',
  DELETE_DIGIT:'delete-digit',
  EVALUATE:'evaluate',
}

function reducer(state,{type,payload}){
  switch(type){
    case ACTIONS.ADD_DIGIT:
      if(state.overwrite){
        return {
          ...state,
          currentOperand:payload.digit,
          overwrite:false
        }
      }
      if( payload.digit==="0" && state.currentOperand ==="0"){
        return state;
      }
      if(payload.digit==="."  && state.currentOperand.includes(".")){
        return state;
      }
      return {
        ...state,
        currentOperand: `${state.currentOperand ||""}${payload.digit}`
       
      }
    case ACTIONS.CHOOSE_OPERATION:
      if(state.currentOperand == null && state.previousOperand == null ){
        return {}
      }
      if(state.previousOperand == null){
        return {
          ...state,
          operation:payload.operation,
          previousOperand:state.currentOperand,
          currentOperand:null,
          
        }
      }
      if(state.currentOperand ==null){
        return {
          ...state,
          operation:payload.operation
        }
      }
      return {
        ...state,
        previousOperand:evaluate(state),
        operation:payload.operation,
        currentOperand:null,
      }

    case ACTIONS.CLEAR:
      return {}
    
    case ACTIONS.EVALUATE:
      if(state.previousOperand==null || state.operation==null || state.currentOperand==null){
        return state
      }

      return {
        ...state,
        overwrite:true,
        currentOperand:evaluate(state),
        previousOperand:null,
        operation:null
      }
    case ACTIONS.DELETE_DIGIT:
      if(state.overwrite){
        return {
          ...state,
          currentOperand:null,
          overwrite:false
        }
      }
      if(state.currentOperand ==null || state.currentOperand.length===1){
        return {
          ...state,
          currentOperand:null
        }
      }
      return {
        ...state,
        currentOperand:state.currentOperand.slice(0,-1)
      }

  }

}
function evaluate({currentOperand,previousOperand,operation}){
  const prev=parseFloat(previousOperand);
  const cur=parseFloat(currentOperand);
  if(isNaN(prev)||isNaN(cur)) return ""
  let res=""
  switch(operation){
    case "*":
      res=prev*cur
      break
    case "-":      
      res=prev-cur
      break
    case "÷":
      res=prev/cur
      break
    case "+":
      res=prev+cur
      break
  }
  return res.toString();
}
const INTERGER_FORMATTER=new Intl.NumberFormat("en-us",{
  maximumFracionDigits:0,
})
function formatOperand(operand){
  if(operand==null) return

  const [integer,decimal]=operand.split(".")

  if(decimal==null){
    return INTERGER_FORMATTER.format(integer)
  } 
  return `${INTERGER_FORMATTER.format(integer)}.${decimal}`
}

function Calculator() {
  
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(reducer,{})
  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">{formatOperand(previousOperand)} {operation}</div>
        <div className="current-operand">{formatOperand(currentOperand)}</div>
      </div>
      <button className="span-tow" onClick={()=>dispatch({type:ACTIONS.CLEAR})}>AC</button>
      <button onClick={()=>dispatch({type:ACTIONS.DELETE_DIGIT})}>DEL</button>
      <OperationButton operation="÷" dispatch={dispatch}/>
      <DigitButton digit="1" dispatch={dispatch}/>
      <DigitButton digit="2" dispatch={dispatch}/>
      <DigitButton digit="3" dispatch={dispatch}/>
      <OperationButton operation="*" dispatch={dispatch}/>
      <DigitButton digit="4" dispatch={dispatch}/>
      <DigitButton digit="5" dispatch={dispatch}/>
      <DigitButton digit="6" dispatch={dispatch}/>
      <OperationButton operation="+" dispatch={dispatch}/>
      <DigitButton digit="7" dispatch={dispatch}/>
      <DigitButton digit="8" dispatch={dispatch}/>
      <DigitButton digit="9" dispatch={dispatch}/>
      <OperationButton operation="-" dispatch={dispatch}/>
      <DigitButton digit="." dispatch={dispatch}/>
      <DigitButton digit="0" dispatch={dispatch}/>
      <button className="span-tow" onClick={()=>dispatch({type:ACTIONS.EVALUATE})}>=</button>

      <Link to="Temp">
        <button>UseReducer</button>
      </Link>
    </div>
  );
}

export default Calculator;
