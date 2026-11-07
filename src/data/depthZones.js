export const DEPTH_ZONES = [
  { label: "Surface", from: 0 },
  { label: "Twilight Zone", from: 200 },
  { label: "Midnight Zone", from: 1000 },
  { label: "Abyss", from: 4000 },
];

export function getDepthZone(meters) {
  return DEPTH_ZONES.reduce(
    (current, zone) => (meters >= zone.from ? zone : current),
    DEPTH_ZONES[0]
  );
}