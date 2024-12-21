import React, { useState, useRef, useEffect, useCallback } from "react";
import { REGEXP_LEADING_ZEROS, REGEXP_ONLY_NUMBERS } from "../../constants/regexp";
import { clamp, roundToStep } from "../../utils/mathUtils";

type NumberInputProps = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  dataTestid?: string;
};

type ValidateAndFormatReturn = {
  isValid: boolean;
  parsedValue: number;
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
  const [isInvalid, setIsInvalid] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const previousValue = useRef<number>(value);
  const isStepButtonClicked = useRef(false); // Workaround: detect clicks on the native step buttons

  const validateAndFormat = useCallback(
    (value: string): ValidateAndFormatReturn => {
      const parsedValue = parseInt(value);
      const isValid =
        REGEXP_ONLY_NUMBERS.test(value)
          && !isNaN(parsedValue)
          && parsedValue % step === 0;

      return { isValid, parsedValue };
    },
    [step]
  );
  
  // Update the value, ensuring it is clamped to the valid range
  const updateValue = useCallback((value: number) => {
    const clampedValue = clamp(value, min, max);

    previousValue.current = clampedValue;
    isStepButtonClicked.current = false;;
    onChange(clampedValue);
  }, [value, min, max, onChange]);

  // Workaround: detect clicks on the native step buttons
  const handleMouseDown = useCallback(() => {
    isStepButtonClicked.current = true;
  }, []);

  // Handle input value changes, validate input, and update for step button clicks
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    // Remove leading zeros
    const newValue = e.target.value.replace(REGEXP_LEADING_ZEROS, "");
    setInputValue(newValue);

    const { isValid, parsedValue } = validateAndFormat(newValue);
    setIsInvalid(!isValid);
    
    // Click on the native step buttons
    if (isStepButtonClicked.current) {
      updateValue(parsedValue);
    }
  }, [updateValue]);

  // Confirm changes on blur or Enter, ensuring value is valid and clamped
  const handleConfirmChange = useCallback(() => {
    const { parsedValue } = validateAndFormat(inputValue);
    setIsInvalid(false);

    // Reset to previous value if input is invalid
    if (isNaN(parsedValue)) {
      setInputValue(previousValue.current.toString());
      return;
    }

    const roundedValue = roundToStep(clamp(parsedValue, min, max), step);
    updateValue(roundedValue);
  }, [inputValue, min, max, step, updateValue]);

  // Handle keyboard interactions: Enter, Escape, and Arrow keys
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
        updateValue(previousValue.current + step);
        break;
  
      case "ArrowDown":
        updateValue(previousValue.current - step);
        break;
  
      default:
        isStepButtonClicked.current = false;
        break;
    }
  }, [step, handleConfirmChange, updateValue]);

  const handleFocus = useCallback(() => {
    inputRef.current?.select();
  }, []);

  useEffect(() => {
    setInputValue(value.toString());
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
      onChange={handleChange}
      onMouseDown={handleMouseDown}
      onBlur={handleConfirmChange}
      onFocus={handleFocus}
      onKeyDown={handleKeyDown}
      className={`bg-gray-700 px-1 rounded ${isInvalid ? "text-red-500" : ""}`}
    />
  );
};
