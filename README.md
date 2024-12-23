# Phase Timeline Challenge

## Demo
The **Timeline** is a feature-rich component designed for managing and visualizing sequences of tasks on a time-based ruler. It includes synchronized scrolling, dynamic position updates, and interactive controls for time and duration adjustments.

https://github.com/user-attachments/assets/6f9cc399-c0e4-4e44-8a36-ad9d03f1395c

## Overview

![component-overview](./readme-assets/component-overview.jpg)

## Features
- **Playhead**: 
  - Moves dynamically with the timeline.
  - Visible only within the timeline's viewable area.
  - Updates position based on user input or dragging.

- **Ruler**:
  - Scales dynamically based on the duration.
  - Synchronizes scrolling with Keyframe List.
  - Allows users to click and drag to adjust the time.

- **Keyframe List**:
  - Displays segments visually representing the timeline duration.
  - Synchronizes vertical scrolling with the Track List.

- **Track List**:
  - Shows tracks aligned with the keyframes.
  - Synchronizes vertical scrolling with the Keyframe List.
 
## Directory Structure
**Redux version**
```
Timeline/
├── src/
│   ├── Timeline/
│   │   ├── components/
│   │   │   ├── PlayControls/
│   │   │   ├── Playhead/
│   │   │   ├── Ruler/
│   │   │   ├── KeyframeList/
│   │   │   ├── TrackList/
│   │   │   ├── Segment/
│   │   │   └── Timeline.tsx
│   │   ├── constants/
│   │   ├── redux/
│   │   │   ├── selectors/
│   │   │   ├── slices/
│   │   │   └── store.ts
│   │   │   └── types.ts
│   │   ├── testUtils/
│   │   ├── utils/
│   │   └── index.tsx
│   └── App.tsx
├── public/
├── README.md
└── package.json
```

**Context + Reducer version**
```
Timeline/
├── src/
│   ├── Timeline/
│   │   ├── components/
│   │   │   ├── PlayControls/
│   │   │   ├── Playhead/
│   │   │   ├── Ruler/
│   │   │   ├── KeyframeList/
│   │   │   ├── TrackList/
│   │   │   ├── Segment/
│   │   │   └── Timeline.tsx
│   │   ├── constants/
│   │   ├── context/
│   │   │   ├── timeline/
│   │   │   │   │── timelineContext.ts
│   │   │   │   │── timelineReducer.ts
│   │   │   │   │── timelineProvider.tsx
│   │   │   │   │── types.ts
│   │   ├── utils/
│   │   └── index.tsx
│   └── App.tsx
├── public/
├── README.md
└── package.json
```
 
## Tech Stack
- **React**: Component-based architecture for building UI.
- **Tailwind CSS**: For styling and layout.
- **Jest** and **React Testing Library**: Unit and integration testing.
- **Redux / Context API + Reducer**: For state management.
- **TypeScript**: For type safety and improved developer experience.

## Setup

### Prerequisites
- Node.js (>=14.x)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/timeline.git
   ```

2. Navigate to the project directory:
   ```bash
   cd timeline
   ```

3. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

### Development
Run the development server:
```bash
npm start
# or
yarn start
```
The app will be available at `http://localhost:3000`.

### Build
To create a production build:
```bash
npm run build
# or
yarn build
```

### Testing
Run all test cases:
```bash
npm test
# or
yarn test
```

## User Behavior Requirements

### 1. Number Input Field

#### Interface

| Prop       | Type               | Description                                      |
| ---------- | ------------------ | ------------------------------------------------ |
| `value`    | `number`           | The current value of the input field             |
| `onChange` | `(number) => void` | The callback to be called when the value changes |

#### Behavior

https://github.com/user-attachments/assets/8dd5ef2b-6b57-43dc-91b3-0d322d148781

- [x] The displayed value updates immediately while typing, but `onChange` is not triggered until input is confirmed
- [x] Clicking outside the input field removes focus and changes the value
- [x] Clicking on the native step buttons immediately changes the value
- [x] Pressing up arrow or down arrow keys immediately changes the value
- [x] Entire text is selected when the input field gains focus
- [x] Entire text is selected after using the native step buttons
- [x] Entire text is selected after using the up arrow or down arrow keys
- [x] Pressing Enter confirms the new value and removes focus
- [x] Pressing Escape reverts to the original value and removes focus
- [x] Leading zeros are automatically removed
- [x] Negative values are automatically adjusted to the minimum allowed value
- [x] Decimal values are automatically rounded to the nearest integer
- [x] Invalid inputs (non-numeric) revert to the previous valid value

### 2. Play Controls Behavior

https://github.com/user-attachments/assets/9a669854-e0c5-4950-8364-10fe0b40d16b

- [x] Current Time is always between `0ms` and the Duration
- [x] Current Time adjusts if it exceeds the newly set Duration
- [x] Duration is always between `100ms` and `6000ms`
- [x] Current Time and Duration are always multiples of `10ms`
- [x] Current Time and Duration are always positive integers
- [x] Playhead position updates only after specific actions on Current Time input (losing focus, pressing Enter, using arrow keys, or clicking up/down buttons)

### 3. Ruler Behavior

https://github.com/user-attachments/assets/42190ade-f708-45a1-8168-2be779c66390

- [x] Clicking or dragging on the Ruler updates the Current Time and Playhead position
- [x] Horizontal scrolling of the Ruler is synchronized with the Keyframe List
- [x] Ruler length visually represents the total Duration (`1ms = 1px`)
- [x] Ruler length updates only after specific actions on Duration input (losing focus, pressing Enter, using arrow keys, or clicking up/down buttons)

### 4. Track List Behavior

https://github.com/user-attachments/assets/94b5e2c8-ef32-488e-97e4-d53036bbf2f7

- [x] Vertical scrolling of the Track List is synchronized with the Keyframe List

### 5. Keyframe List Behavior

https://github.com/user-attachments/assets/99826161-f821-4e4d-b9a8-b59c16d9894e

- [x] Vertical scrolling is synchronized with the Track List
- [x] Horizontal scrolling is synchronized with the Ruler
- [x] Segment length visually represents the total Duration (`1ms = 1px`)
- [x] Segment length updates only after specific actions on Duration input (losing focus, pressing Enter, using arrow keys, or clicking up/down buttons)

### 6. Playhead Behavior

https://github.com/user-attachments/assets/3940cd0d-dd9d-4331-9172-592462ad65d3

- [x] Playhead moves in sync with the Ruler and Keyframe List during horizontal scrolling
- [x] Playhead maintains its relative position during horizontal scrolling
- [x] Playhead is visible only when within the Timeline's visible area, using the `hidden` attribute when completely out of view

Good luck with the Phase Timeline Component!
