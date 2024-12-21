import { render, screen, fireEvent } from "@testing-library/react";
import { NumberInput } from "./NumberInput";

describe("NumberInput", () => {
  it("renders correctly with initial value", () => {
    render(
      <NumberInput value={100} onChange={jest.fn()} />
    );
    const input = screen.getByRole("spinbutton");

    expect(input).toHaveValue(100);
  });

  it("removes leading zeros", () => {
    render(
      <NumberInput value={0} onChange={jest.fn()} />
    );
    const input = screen.getByRole("spinbutton");

    fireEvent.change(input, { target: { value: "00123" } });
    expect(input).toHaveValue(123);
  });

  it("confirms value on blur", () => {
    const mockOnChange = jest.fn();
    render(
      <NumberInput value={100} onChange={mockOnChange} />
    );
    const input = screen.getByRole("spinbutton");

    fireEvent.change(input, { target: { value: "1000" } });
    fireEvent.blur(input);

    expect(input).toHaveValue(1000);
    expect(mockOnChange).toHaveBeenCalledWith(1000);
  });

  it("confirms value on Enter key press", () => {
    const mockOnChange = jest.fn();
    render(
      <NumberInput value={100} onChange={mockOnChange} />
    );
    const input = screen.getByRole("spinbutton");

    fireEvent.change(input, { target: { value: "600" } });
    fireEvent.keyDown(input, { key: "Enter" });

    expect(input).toHaveValue(600);
    expect(mockOnChange).toHaveBeenCalledWith(600);
  });

  it("reverts to original value on Escape key press", () => {
    const mockOnChange = jest.fn();
    render(
      <NumberInput value={100} onChange={mockOnChange} />
    );
    const input = screen.getByRole("spinbutton");

    fireEvent.change(input, { target: { value: "500" } });
    fireEvent.keyDown(input, { key: "Escape" });

    expect(input).toHaveValue(100);
  });

  it("confirms value within range", () => {
    const mockOnChange = jest.fn();
    render(
      <NumberInput value={100} onChange={mockOnChange} min={50} max={300} />
    );
    const input = screen.getByRole("spinbutton");

    fireEvent.change(input, { target: { value: "400" } });
    fireEvent.blur(input);

    expect(mockOnChange).toHaveBeenCalledWith(300);
  });

  it("reverts invalid value to previous value", () => {
    const mockOnChange = jest.fn();
    render(
      <NumberInput value={100} onChange={mockOnChange} />
    );
    const input = screen.getByRole("spinbutton");

    fireEvent.change(input, { target: { value: "abc" } });
    expect(input).toHaveClass("text-red-500");

    fireEvent.blur(input);
    expect(input).toHaveValue(100);
  });

  it("aligns value to nearest step on blur", () => {
    const mockOnChange = jest.fn();
    render(
      <NumberInput value={105} onChange={mockOnChange} step={10} />
    );
    const input = screen.getByRole("spinbutton");

    fireEvent.change(input, { target: { value: "106" } });
    fireEvent.blur(input);

    expect(mockOnChange).toHaveBeenCalledWith(110);
  });

  it("increments value on ArrowUp key press", () => {
    const mockOnChange = jest.fn();
    render(
      <NumberInput value={100} onChange={mockOnChange} step={10} />
    );
    const input = screen.getByRole("spinbutton");

    fireEvent.keyDown(input, { key: "ArrowUp" });
    expect(mockOnChange).toHaveBeenCalledWith(110);
  });

  it("decrements value on ArrowDown key press", () => {
    const mockOnChange = jest.fn();
    render(
      <NumberInput value={100} onChange={mockOnChange} step={10} />
    );
    const input = screen.getByRole("spinbutton");

    fireEvent.keyDown(input, { key: "ArrowDown" });
    expect(mockOnChange).toHaveBeenCalledWith(90);
  });
});
