import React, { useState } from 'react';
import './App.css';

const OPERATORS = ['+', '-', '*', '/'];

function contains(target, pattern) {
  var value = 0;
  pattern.forEach(function (word) {
    value = value + target.includes(word);
  });
  return (value === 1)
}

String.prototype.lastIndexOfEnd = function (string) {
  var io = this.lastIndexOf(string);
  return io == -1 ? -1 : io + string.length;
}

const INITIALEXPRESSION = '0';

function App() {
  const [expression, setExpression] = useState(INITIALEXPRESSION);

  function validateInput(oldExpression, newCharacter) {
    //Validate two decimal points in the same number
    if (newCharacter === '.') {
      const position = oldExpression.lastIndexOf(newCharacter);
      if (position !== -1) {
        const tempString = oldExpression.slice(position);
        const operatorFound = contains(tempString, OPERATORS);
        if (!operatorFound) {
          return false;
        }
      }
    }
    //Choose last operator if there are 2 or more.
    if (OPERATORS.includes(newCharacter) && newCharacter !== '-') {
      const lastChar = oldExpression.charAt(oldExpression.length - 1);
      if (OPERATORS.includes(lastChar)) {
        let tempString = oldExpression;
        for (let i = tempString.length - 1; i >= 0; i += -1) {
          if (OPERATORS.includes(tempString[i])) {
            tempString = tempString.slice(0, - 1);
          } else {
            i = -1;
          }
        }
        setExpression(`${tempString}${newCharacter}`);
        return false;
      }
    }
    return true;
  }

  const buttonToggle = (event) => {
    let tempExpression = expression;
    if (expression && expression.charAt(0) === '0') {
      tempExpression = '';
    }
    if (validateInput(tempExpression, event.target.innerHTML)) {
      setExpression(`${tempExpression}${event.target.innerHTML}`);
    }
  }

  const calcResult = () => {
    const tempResult = eval(expression);
    setExpression(tempResult.toString());
  }

  const clearDisplay = () => {
    setExpression(INITIALEXPRESSION);
  }

  return (
    <div class="calcContainer">
      <div id="display">{expression}</div>
      <div class="bottonsContainer">
        <button class="operator" onClick={clearDisplay} id="clear">C</button>
        <button class="operator" onClick={buttonToggle} id="divide">/</button>
        <button class="number" onClick={buttonToggle} id="seven">7</button>
        <button class="number" onClick={buttonToggle} id="eight">8</button>
        <button class="number" onClick={buttonToggle} id="nine">9</button>
        <button class="operator" onClick={buttonToggle} id="multiply">*</button>
        <button class="number" onClick={buttonToggle} id="four">4</button>
        <button class="number" onClick={buttonToggle} id="five">5</button>
        <button class="number" onClick={buttonToggle} id="six">6</button>
        <button class="operator" onClick={buttonToggle} id="subtract">-</button>
        <button class="number" onClick={buttonToggle} id="one">1</button>
        <button class="number" onClick={buttonToggle} id="two">2</button>
        <button class="number" onClick={buttonToggle} id="three">3</button>
        <button class="operator" onClick={buttonToggle} id="add">+</button>
        <button class="number" onClick={buttonToggle} id="zero">0</button>
        <button class="number" onClick={buttonToggle} id="decimal">.</button>
        <button class="operator" onClick={calcResult} id="equals">=</button>
      </div>
    </div>
  );
}

export default App;
