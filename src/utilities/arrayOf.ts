export default function arrayOf(numberOfElements: number) {
  return Array.from({ length: numberOfElements }, (_, i) => i + 1);
}
