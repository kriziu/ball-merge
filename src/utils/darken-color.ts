export function darkenColor(color: number, factor = 0.7): number {
  const r = (color >> 16) & 255;
  const g = (color >> 8) & 255;
  const b = color & 255;

  const darkenedColor =
    (Math.floor(r * factor) << 16) + (Math.floor(g * factor) << 8) + Math.floor(b * factor);

  return darkenedColor;
}
