import React from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { AiFillHome } from 'react-icons/ai';
import { IoMdDocument } from 'react-icons/io';
import { FaUser, FaPowerOff } from 'react-icons/fa';
import './Sidebar.scss';

const Sidebar = () => {
  const history = useHistory();
  const handleLogout = () => {
    localStorage.removeItem('user');
    history.replace('/');
  };
  return (
    <section className="sidebar">
      <nav>
        <ul className="sidebar__navigation">
          <li>
            <Link to="/dashboard" className="sidebar__navigation__link">
              <AiFillHome /> <span>Jobs</span>
            </Link>
          </li>
          <li>
            <Link to="/dashboard" className="sidebar__navigation__link">
              <IoMdDocument /> <span>Applications</span>
            </Link>
          </li>
          <li>
            <Link to="/profile" className="sidebar__navigation__link">
              <FaUser /> <span>Profile</span>
            </Link>
          </li>
          <li>
            <Link
              to="/"
              onClick={handleLogout}
              className="sidebar__navigation__link"
            >
              <FaPowerOff /> <span>Logout</span>
            </Link>
          </li>
        </ul>
      </nav>
    </section>
  );
};

export default Sidebar;
