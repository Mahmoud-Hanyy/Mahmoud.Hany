import "./DepthGauge.css";
import { getDepthZone } from "../../data/depthZones";

export default function DepthGauge({ meters, progress }) {
  const zone = getDepthZone(meters);

  return (
    <aside className="depth-gauge" aria-hidden="true">
      <div className="depth-gauge__track">
        <div
          className="depth-gauge__fill"
          style={{ height: `${progress * 100}%` }}
        />
        <div
          className="depth-gauge__marker"
          style={{ top: `${progress * 100}%` }}
        />
      </div>
      <div className="depth-gauge__readout">
        <span className="depth-gauge__meters">{meters}m</span>
        <span className="depth-gauge__zone">{zone.label}</span>
      </div>
    </aside>
  );
}
