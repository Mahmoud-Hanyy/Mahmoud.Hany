import { useSyncExternalStore } from "react";

// Include large touch tablets in landscape, plus reduced-motion desktops.
const QUERY = "(max-width: 1100px), (any-pointer: coarse), (prefers-reduced-motion: reduce)";
const subscribe = (callback) => {
  const media = window.matchMedia(QUERY);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
};
const getSnapshot = () => window.matchMedia(QUERY).matches;

export default function useLiteExperience() {
  return useSyncExternalStore(subscribe, getSnapshot, () => true);
}
