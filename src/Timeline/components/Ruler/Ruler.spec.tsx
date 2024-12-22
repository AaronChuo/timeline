import { render, screen, fireEvent } from "@testing-library/react";
import { Ruler } from "./Ruler";
import { TimelineContext } from "../../context/timeline/timelineContext";

describe("Ruler", () => {
  it("renders correctly with the initial duration", () => {
    const mockState = { duration: 3000, scrollLeft: 0, scrollTop: 0, time: 0 };
    render(
      <TimelineContext.Provider value={{ state: mockState, dispatch: jest.fn() }}>
        <Ruler />
      </TimelineContext.Provider>
    );
    const ruler = screen.getByTestId("ruler");

    expect(ruler).toBeInTheDocument();
    expect(screen.getByTestId("ruler-bar")).toHaveStyle("width: 3000px");
  });

  it("dispatches SET_SCROLL_LEFT when scrolled", () => {
    const mockDispatch = jest.fn();
    const mockState = { duration: 2000, scrollLeft: 0, scrollTop: 0, time: 0 };
    render(
      <TimelineContext.Provider value={{ state: mockState, dispatch: mockDispatch }}>
        <Ruler />
      </TimelineContext.Provider>
    );
    const ruler = screen.getByTestId("ruler");

    fireEvent.scroll(ruler, { target: { scrollLeft: 100 } });
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "SET_SCROLL_LEFT",
      payload: 100,
    });
  });

  it("updates scrollLeft when context state changes", () => {
    const mockState = { duration: 2000, scrollLeft: 0, scrollTop: 0, time: 0 };
    const { rerender } = render(
      <TimelineContext.Provider value={{ state: mockState, dispatch: jest.fn() }}>
        <Ruler />
      </TimelineContext.Provider>
    );
    const ruler = screen.getByTestId("ruler");

    expect(ruler.scrollLeft).toBe(0);

    const updatedState = { duration: 2000, scrollLeft: 200, scrollTop: 0, time: 0 };
    rerender(
      <TimelineContext.Provider value={{ state: updatedState, dispatch: jest.fn() }}>
        <Ruler />
      </TimelineContext.Provider>
    );

    expect(ruler.scrollLeft).toBe(200);
  });

  it("dispatches SET_TIME on mouse down", () => {
    const mockDispatch = jest.fn();
    const mockState = { duration: 2000, scrollLeft: 0, scrollTop: 0, time: 0 };
    render(
      <TimelineContext.Provider value={{ state: mockState, dispatch: mockDispatch }}>
        <Ruler />
      </TimelineContext.Provider>
    );
    const ruler = screen.getByTestId("ruler");

    fireEvent.mouseDown(ruler, { clientX: 120 });

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "SET_TIME",
      payload: expect.any(Number),
    });
  });

  it("updates time during dragging", () => {
    const mockDispatch = jest.fn();
    const mockState = { duration: 2000, scrollLeft: 0, scrollTop: 0, time: 0 };
    render(
      <TimelineContext.Provider value={{ state: mockState, dispatch: mockDispatch }}>
        <Ruler />
      </TimelineContext.Provider>
    );
    const ruler = screen.getByTestId("ruler");

    fireEvent.mouseDown(ruler, { clientX: 300 });
    fireEvent.mouseMove(document, { clientX: 400 });

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "SET_TIME",
      payload: expect.any(Number),
    });
  });

  it("stops dragging on mouse up", () => {
    const mockDispatch = jest.fn();
    const mockState = { duration: 2000, scrollLeft: 0, scrollTop: 0, time: 0 };
    render(
      <TimelineContext.Provider value={{ state: mockState, dispatch: mockDispatch }}>
        <Ruler />
      </TimelineContext.Provider>
    );
    const ruler = screen.getByTestId("ruler");

    fireEvent.mouseDown(ruler, { clientX: 300 });
    fireEvent.mouseUp(document);
    fireEvent.mouseMove(document, { clientX: 500 });

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "SET_TIME",
      payload: 284,
    });
    expect(mockDispatch).not.toHaveBeenCalledWith({
      type: "SET_TIME",
      payload: 500,
    });
  });
});
