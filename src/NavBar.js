/* NavBar.js */
import React from "react";
const NavBar = ({ onNavigate }) => {
  return (
    <nav className="navbar">
      <ul>
        <li><button onClick={() => onNavigate("landing")}>Home</button></li>
        <li><button onClick={() => onNavigate("movies")}>Movies</button></li>
        <li><button onClick={() => onNavigate("contact")}>Contact</button></li>
      </ul>
    </nav>
  );
};
export default NavBar;