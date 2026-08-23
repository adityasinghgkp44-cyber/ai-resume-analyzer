import "./Loading.css";

function Loading({
  text = "Loading...",
  fullScreen = true,
}) {
  return (
    <div
      className={
        fullScreen
          ? "loading-screen"
          : "loading-container"
      }
    >
      <div className="loading-spinner"></div>

      <h2>{text}</h2>
    </div>
  );
}

export default Loading;