import { screen, fireEvent } from "@testing-library/react";
import { Ruler } from "./Ruler";
import { configureStore } from "@reduxjs/toolkit";
import { renderWithRedux } from "../../testUtils/renderWithRedux";
import { Provider } from "react-redux";
import timelineReducer, { setScrollLeft } from "../../redux/slices/timelineSlice";

describe("Ruler", () => {
  let store: any;
  let getTimelineState: any;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        timeline: timelineReducer,
      },
      preloadedState: {
        timeline: {
          time: 0,
          duration: 2000,
          scrollLeft: 0,
          scrollTop: 0,
        },
      },
    });
    getTimelineState = () => store.getState().timeline;
  });

  it("renders correctly with the initial duration", () => {
    renderWithRedux(<Ruler />, store);
    const ruler = screen.getByTestId("ruler");

    expect(ruler).toBeInTheDocument();
    expect(screen.getByTestId("ruler-bar")).toHaveStyle("width: 2000px");
  });

  it("dispatches SET_SCROLL_LEFT when scrolled", () => {
    renderWithRedux(<Ruler />, store);
    const ruler = screen.getByTestId("ruler");

    fireEvent.scroll(ruler, { target: { scrollLeft: 100 } });
    expect(getTimelineState().scrollLeft).toBe(100);
  });

  it("updates scrollLeft when context state changes", () => {
    const { rerender } = renderWithRedux(<Ruler />, store);
    const ruler = screen.getByTestId("ruler");

    expect(ruler.scrollLeft).toBe(0);

    store.dispatch(setScrollLeft(200));
    rerender(<Provider store={store}><Ruler /></Provider>);

    expect(ruler.scrollLeft).toBe(200);
  });

  it("dispatches SET_TIME on mouse down", () => {
    renderWithRedux(<Ruler />, store);
    const ruler = screen.getByTestId("ruler");

    fireEvent.mouseDown(ruler, { clientX: 120 });
    expect(getTimelineState().time).toBe(104);
  });

  it("updates time during dragging", () => {
    renderWithRedux(<Ruler />, store);
    const ruler = screen.getByTestId("ruler");

    fireEvent.mouseDown(ruler, { clientX: 300 });
    fireEvent.mouseMove(document, { clientX: 400 });

    expect(getTimelineState().time).toBe(384);
  });

  it("stops dragging on mouse up", () => {
    renderWithRedux(<Ruler />, store);
    const ruler = screen.getByTestId("ruler");

    fireEvent.mouseDown(ruler, { clientX: 300 });
    fireEvent.mouseUp(document);
    fireEvent.mouseMove(document, { clientX: 500 });

    expect(getTimelineState().time).not.toBe(500);
  });
});
