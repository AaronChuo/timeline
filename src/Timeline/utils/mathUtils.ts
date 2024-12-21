export const clamp = (value: number, min: number, max: number): number => {
  return Math.max(
    min,
    Math.min(max, value)
  );
};

export const roundToStep = (value: number, step: number) => {
  return Math.round(value / step) * step;
};
