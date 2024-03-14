import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="not-found">
      <h2>Sorry</h2>
      <p>L, not a real page</p>
      <Link to="/">Back to homepage...</Link>
    </div>
  );
};

export default NotFound;
