// https://stackoverflow.com/a/64777515/30371438
export function arrayChunker<T>(arr: T[], size: number): T[][] {
  return [...Array(Math.ceil(arr.length / size))].map((_, i) => arr.slice(size * i, size + size * i)
  );
};
