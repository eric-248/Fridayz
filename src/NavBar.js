import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const history = useNavigate();

  const handleClick = () => {
    history.navigate("/");
  };

  return (
    <nav className="navbar">
      <h1 onClick={handleClick}>Fridays</h1>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/friends">Friends</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
};

export default Navbar;
