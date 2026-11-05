import "./Portrait.css";

export default function Portrait() {
  return (
    <div className="portrait">
      <div className="portrait__frame">
        <img
          src="/images/portrait.png"
          alt="Mahmoud in a diving suit"
          className="portrait__img"
        />
      </div>
    </div>
  );
}
