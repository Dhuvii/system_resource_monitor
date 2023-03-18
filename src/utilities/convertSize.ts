export default (
  value?: number,
  base: number = 1,
  fixed: number = 2
): number => {
  if (!value) return 0;

  return parseFloat((value / base).toFixed(fixed));
};
