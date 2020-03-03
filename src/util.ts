export const getRandomInt = (max: number): number => {
  return Math.floor(Math.random() * Math.floor(max));
};

export const range = (start: number, end: number): number[] => {
  return new Array(end - start + 1)
    .fill(undefined)
    .map((_, idx) => idx + start);
};
