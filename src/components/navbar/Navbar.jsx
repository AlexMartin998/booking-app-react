import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks';

import './navbar.css';

export const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  return (
    <div className="navbar">
      <div className="navContainer">
        <span className="logo">
          <Link to="/">lamabooking</Link>
        </span>

        {user?.uid ? (
          <div className="navItems">
            <span>{user?.username}</span>
            <button onClick={() => logout()} className="navButton">
              Log Out
            </button>
          </div>
        ) : (
          <div className="navItems">
            <button className="navButton">Register</button>
            <button onClick={() => navigate('/login')} className="navButton">
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
