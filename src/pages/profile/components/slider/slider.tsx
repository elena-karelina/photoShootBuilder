import { useState } from "react";
import { Col, InputNumber, InputNumberProps, Row, Slider } from "antd";

interface Props {
  onChange: (value: number) => void;
}

const DecimalStep: React.FC<Props> = ({ onChange }) => {
  const [inputValue, setInputValue] = useState(0.5);

  const onChangeSlider: InputNumberProps["onChange"] = (value) => {
    if (isNaN(value as number)) {
      return;
    }
    setInputValue(value as number);
    onChange(value as number);
  };

  return (
    <Row>
      <Col span={18}>
        <Slider
          min={0.5}
          max={24}
          onChange={onChangeSlider}
          value={typeof inputValue === "number" ? inputValue : 0}
          step={0.5}
        />
      </Col>
      <Col span={6}>
        <InputNumber
          min={0.5}
          max={24}
          style={{ marginLeft: "16px" }}
          step={0.5}
          value={inputValue}
          onChange={onChangeSlider}
        />
      </Col>
    </Row>
  );
};

export default DecimalStep;
