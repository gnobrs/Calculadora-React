import Input from "./components/Input";
import Button from "./components/Button";
import { Container, Content, Row } from "./styles";
import { useState } from "react";

const App = () => {
  const [currentNumber, setCurrentNumber] = useState("0");
  const [firstNumber, setFirstNumber] = useState("0");
  const [operation, setOperation] = useState("");

  const handleAddNumber = (number) => {
    setCurrentNumber((prev) => `${prev === "0" ? "" : prev}${number}`);
  };

  const handleClear = () => {
    setCurrentNumber("0");
    setFirstNumber("0");
    setOperation("");
  };

  const handleSum = () => {
    if (firstNumber === "0") {
      setFirstNumber(String(currentNumber));
      setCurrentNumber("0");
      setOperation("+");
    } else {
      const sum = Number(firstNumber) + Number(currentNumber);
      setCurrentNumber(String(sum));
      setFirstNumber("0");
    }
  };

  const handleMinus = () => {
    if (firstNumber === "0") {
      setFirstNumber(String(currentNumber));
      setCurrentNumber("0");
      setOperation("-");
    } else {
      const red = Number(firstNumber) - Number(currentNumber);
      setCurrentNumber(String(red));
      setFirstNumber("0");
    }
  };

  const handleEquals = () => {
    if (firstNumber !== "0" && operation !== "" && currentNumber !== "0") {
      switch (operation) {
        case "+":
          handleSum();
          break;
        case "-":
          handleMinus();
          break;
        default:
          break;
      }
    }
  };

  return (
    <Container>
      <Content>
        <Input value={currentNumber} />
        <Row>
          <Button label="/" onClick={() => handleAddNumber("")} />
          <Button label="x" onClick={() => handleAddNumber("")} />
          <Button label="c" onClick={handleClear} />
          <Button label="-" onClick={handleMinus} />
        </Row>
        <Row>
          <Button label="7" onClick={() => handleAddNumber("7")} />
          <Button label="8" onClick={() => handleAddNumber("8")} />
          <Button label="9" onClick={() => handleAddNumber("9")} />
          <Button label="+" onClick={handleSum} />
        </Row>
        <Row>
          <Button label="4" onClick={() => handleAddNumber("4")} />
          <Button label="5" onClick={() => handleAddNumber("5")} />
          <Button label="6" onClick={() => handleAddNumber("6")} />
          <Button label="=" onClick={handleEquals} />
        </Row>
        <Row>
          <Button label="1" onClick={() => handleAddNumber("1")} />
          <Button label="2" onClick={() => handleAddNumber("2")} />
          <Button label="3" onClick={() => handleAddNumber("3")} />
          <Button label="0" onClick={() => handleAddNumber("0")} />
        </Row>
      </Content>
    </Container>
  );
};

export default App;
