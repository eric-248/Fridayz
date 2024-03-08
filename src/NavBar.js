import { Link, useNavigate } from "react-router-dom";
import logo from './Pictures/Fridayz-Smaller.png'; 
import './index.css'; // Adjust the path as needed


const Navbar = () => {
  const history = useNavigate();

  const handleClick = () => {
    history.navigate("/");
  };

  return (
    <nav className="navbar">
      <Link to="/">
        <img src= {logo} alt="Fridayz" className="logo-small" />
      </Link>
      <div className="links">
        <Link to="/profile">Profile</Link>
        <Link to="/friends">Friends</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
};

export default Navbar;
