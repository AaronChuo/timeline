import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  REGEXP_LEADING_ZEROS,
  REGEXP_ONLY_NUMBERS,
} from "../../constants/regexp";
import { clamp } from "../../utils/mathUtils";

type NumberInputProps = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  dataTestid?: string;
};

export const NumberInput: React.FC<NumberInputProps> = ({
  value,
  onChange,
  min = 0,
  max = 6000,
  step = 10,
  dataTestid = "",
}) => {
  const [inputValue, setInputValue] = useState<string>(value.toString());
  const inputRef = useRef<HTMLInputElement>(null);
  const previousValue = useRef<number>(value);
  
  const updateValue = useCallback((value: number) => {
    previousValue.current = value;
    setInputValue(value.toString());
    onChange(value);
  }, [onChange]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    // Remove leading zeros
    const newValue = e.target.value.replace(REGEXP_LEADING_ZEROS, "");

    if (REGEXP_ONLY_NUMBERS.test(newValue)) {
      setInputValue(newValue);
    }
  }, []);

  const handleConfirmChange = useCallback(() => {
    // Round value to the nearest integer
    let roundedValue = Math.round(parseInt(inputValue));

    // Reset to previous value if input is invalid
    if (isNaN(roundedValue)) {
      setInputValue(previousValue.current.toString());
      return;
    }

    // Clamp value within the limited range
    roundedValue = clamp(roundedValue, min, max);

    updateValue(roundedValue);
  }, [inputValue, min, max, updateValue]);

  const handleStepChange = useCallback((increment: number) => {
    const newValue = value + increment;
    const clampedNewValue = clamp(newValue, min, max);

    updateValue(clampedNewValue);
  }, [value, min, max, updateValue]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "Enter":
        handleConfirmChange();
        inputRef.current?.blur();
        break;
  
      case "Escape":
        setInputValue(previousValue.current.toString());
        inputRef.current?.blur();
        break;
  
      case "ArrowUp":
        handleStepChange(step);
        break;
  
      case "ArrowDown":
        handleStepChange(-step);
        break;
  
      default:
        break;
    }
  }, [handleConfirmChange, handleStepChange, step]);

  const handleFocus = useCallback(() => {
    inputRef.current?.select();
  }, []);

  useEffect(() => {
    setInputValue(value.toString());
    previousValue.current = value;
  }, [value]);

  return (
    <input
      ref={inputRef}
      type="number"
      data-testid={dataTestid}
      value={inputValue}
      min={min}
      max={max}
      step={step}
      onChange={handleInputChange}
      onBlur={handleConfirmChange}
      onFocus={handleFocus}
      onKeyDown={handleKeyDown}
      className="bg-gray-700 px-1 rounded"
    />
  );
};
