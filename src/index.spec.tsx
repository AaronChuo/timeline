import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App initial render", () => {
  it("renders PlayControls", () => {
    render(<App />);
    expect(screen.getByText("Current")).toBeInTheDocument();
    expect(screen.getByText("Duration")).toBeInTheDocument();
  });

  it("renders Playhead", () => {
    render(<App />);
    const playhead = screen.getByTestId("playhead");
    expect(playhead).toBeInTheDocument();
  });

  it("renders TrackList", () => {
    render(<App />);
    const trackList = screen.getByTestId("track-list");
    expect(trackList).toBeInTheDocument();
  });

  it("renders KeyframeList", () => {
    render(<App />);
    const keyframeList = screen.getByTestId("keyframe-list");
    expect(keyframeList).toBeInTheDocument();
  });

  it("renders Ruler", () => {
    render(<App />);
    const ruler = screen.getByTestId("ruler");
    expect(ruler).toBeInTheDocument();
    const rulerBar = screen.getByTestId("ruler-bar");
    expect(rulerBar).toBeInTheDocument();
  });
});
