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
    fireEvent.change(input, { target: { value: "0012345" } });

    expect(input).toHaveValue(12345);
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

  it("confirms value within range", () => {
    const mockOnChange = jest.fn();
    render(
      <NumberInput value={100} onChange={mockOnChange} min={100} max={3000} />
    );
    const input = screen.getByRole("spinbutton");
    fireEvent.change(input, { target: { value: "3200" } });
    fireEvent.blur(input);

    expect(input).toHaveValue(3000);
    expect(mockOnChange).toHaveBeenCalledWith(3000);
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

  it("increments value on ArrowUp key press", () => {
    const mockOnChange = jest.fn();
    render(<NumberInput value={100} onChange={mockOnChange} step={10} />);
    const input = screen.getByRole("spinbutton");

    fireEvent.keyDown(input, { key: "ArrowUp" });
    expect(input).toHaveValue(110);
    expect(mockOnChange).toHaveBeenCalledWith(110);
  });

  it("decrements value on ArrowDown key press", () => {
    const mockOnChange = jest.fn();
    render(<NumberInput value={100} onChange={mockOnChange} step={10} />);
    const input = screen.getByRole("spinbutton");

    fireEvent.keyDown(input, { key: "ArrowDown" });
    expect(input).toHaveValue(90);
    expect(mockOnChange).toHaveBeenCalledWith(90);
  });
});
