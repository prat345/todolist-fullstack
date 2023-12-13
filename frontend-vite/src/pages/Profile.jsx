import React from "react";
import { Button } from "antd";
import localStorageService from "../services/localStorageService";
import { useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Profile(props) {
  const navigate = useNavigate();

  const logout = () => {
    localStorageService.removeToken();
    props.setRole("guest");
    navigate("/login");
  };

  return (
    <div>
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <h1>Profile</h1>
      <p>
        <p>Name: </p>
        <p>ID: </p>
        <p>Email: </p>
      </p>
      <p>
        <Link to="/todo-list">
          <Button type="primary">Go to Todo List</Button>
        </Link>
        <Button danger onClick={logout}>
          Log out
        </Button>
      </p>
    </div>
  );
}
