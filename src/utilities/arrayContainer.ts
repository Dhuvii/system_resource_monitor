export default function (array: number[], value: number, limit: number) {
  const length = array.length;

  if (length > limit) {
    array.shift();
  }

  array.push(value);
  return array;
}
