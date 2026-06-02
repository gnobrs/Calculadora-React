import Input from "./components/Input";
import Button from "./components/Button";
import { Container, Content, Row } from "./styles";
import { useState } from "react";

const App = () => {
  const [currentDisplay, setCurrentDisplay] = useState("0");
  // const [firstNumber, setFirstNumber] = useState("0");
  // const [operation, setOperation] = useState("");

  const handleAddToDisplay = (text) => {
    setCurrentDisplay((prev) => `${prev === "0" ? "" : prev}${text}`);
  };

  const handleClear = () => {
    setCurrentDisplay("0");
    // setFirstNumber("0");
    // setOperation("");
  };

  // const handleSum = () => {
  //   if (firstNumber === "0") {
  //     setFirstNumber(String(currentNumber));
  //     setCurrentNumber("0");
  //     setOperation("+");
  //   } else {
  //     const sum = Number(firstNumber) + Number(currentNumber);
  //     setCurrentNumber(String(sum));
  //     setFirstNumber("0");
  //   }
  // };

  // const handleMinus = () => {
  //   if (firstNumber === "0") {
  //     setFirstNumber(String(currentNumber));
  //     setCurrentNumber("0");
  //     setOperation("-");
  //   } else {
  //     const red = Number(firstNumber) - Number(currentNumber);
  //     setCurrentNumber(String(red));
  //     setFirstNumber("0");
  //   }
  // };

  const handleEquals = () => {
    // if (firstNumber !== "0" && operation !== "" && currentDisplay !== "0") {
    //   switch (operation) {
    //     case "+":
    //       handleSum();
    //       break;
    //     case "-":
    //       handleMinus();
    //       break;
    //     default:
    //       break;
    //   }
    // }
    const regex = /\d+(?:\.\d+)?|[+\-x/]/g;

    let tokens = currentDisplay.match(regex) || [];

    let rpn = [];
    let operacoes = [];

    const prioridade = {
      "+": 1,
      "-": 1,
      x: 2,
      "/": 2,
    };

    tokens.forEach((token) => {
      if (!isNaN(token)) {
        rpn.push(parseFloat(token));
      } else {
        while (
          operacoes.length &&
          prioridade[operacoes[operacoes.length - 1]] >= prioridade[token]
        ) {
          rpn.push(operacoes.pop());
        }
        operacoes.push(token);
      }
    });

    while (operacoes.length) {
      rpn.push(operacoes.pop());
    }

    let resultado = [];

    rpn.forEach((token) => {
      if (typeof token === "number") {
        resultado.push(token);
      } else {
        const b = resultado.pop();
        const a = resultado.pop();

        switch (token) {
          case "+":
            resultado.push(a + b);
            break;
          case "-":
            resultado.push(a - b);
            break;
          case "x" || "X":
            resultado.push(a * b);
            break;
          case "/":
            resultado.push(a / b);
            break;
          default:
            break;
        }
      }
    });

    if (!isNaN(resultado[0])) {
      handleClear();
      setCurrentDisplay(resultado[0]);
    }
  };

  return (
    <Container>
      <Content>
        <Input value={currentDisplay} />
        <Row>
          <Button label="/" onClick={() => handleAddToDisplay("/")} />
          <Button label="x" onClick={() => handleAddToDisplay("x")} />
          <Button label="c" onClick={handleClear} />
          <Button label="-" onClick={() => handleAddToDisplay("-")} />
        </Row>
        <Row>
          <Button label="7" onClick={() => handleAddToDisplay("7")} />
          <Button label="8" onClick={() => handleAddToDisplay("8")} />
          <Button label="9" onClick={() => handleAddToDisplay("9")} />
          <Button label="+" onClick={() => handleAddToDisplay("+")} />
        </Row>
        <Row>
          <Button label="4" onClick={() => handleAddToDisplay("4")} />
          <Button label="5" onClick={() => handleAddToDisplay("5")} />
          <Button label="6" onClick={() => handleAddToDisplay("6")} />
          <Button label="=" onClick={handleEquals} />
        </Row>
        <Row>
          <Button label="1" onClick={() => handleAddToDisplay("1")} />
          <Button label="2" onClick={() => handleAddToDisplay("2")} />
          <Button label="3" onClick={() => handleAddToDisplay("3")} />
          <Button label="0" onClick={() => handleAddToDisplay("0")} />
        </Row>
      </Content>
    </Container>
  );
};

export default App;
