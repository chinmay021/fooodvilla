import { useRouteError } from "react-router-dom";

const Error = () => {
  const err = useRouteError();
  return (
    <div className="error-container">
      <img src="https://i.imgur.com/qIufhof.png" />
      <br />
      <span>{err.status}</span>
      <h2>{err.statusText}</h2>
      <p>{err.data}</p>
    </div>
  );
};

export default Error;
