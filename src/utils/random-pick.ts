export function randomPick<T>(array: T[], limit?: number): T {
  return array[Math.floor(Math.random() * (limit ?? array.length))];
}
