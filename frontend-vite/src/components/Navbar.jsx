import React from "react";
import { BrowserRouter as Router, Link, NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/login" activeClassName="active">
            Log in
          </NavLink>
        </li>
        <li>
          <NavLink to="/register" activeClassName="active">
            Sign up
          </NavLink>
        </li>
        <li>
          <NavLink to="/todo-list" activeClassName="active">
            Todo List
          </NavLink>
        </li>
        <li>
          <NavLink to="/profile" activeClassName="active">
            Profile
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
