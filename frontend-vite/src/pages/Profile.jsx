import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "antd";
import localStorageService from "../services/localStorageService";
import { useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { PersonCircle } from "react-bootstrap-icons";
import axios from "axios";
export default function Profile(props) {
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  useEffect(() => {
    axios.get("/users").then((response) => {
      // console.log(response);
      setUser(response.data);
    });
  }, []);

  const logout = () => {
    localStorageService.removeToken();
    props.setRole("guest");
    navigate("/login");
  };

  return (
    <div className="container">
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <h1>Profile</h1>
      <div className="flex flex-wrap justify-center items-center py-5">
        <PersonCircle className="text-8xl text-gray-400" />
        <div className="flex flex-col text-start ps-8">
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>User ID:</strong> {user.id}
          </p>
          <p>
            <strong>Username:</strong> {user.username}
          </p>
        </div>
      </div>
      <p>
        <Row className="justify-center">
          <Col span={6} className="mx-2">
            <Link to="/todo-list">
              <Button className="btn-primary w-full m-0" type="primary">
                Go to Todo
              </Button>
            </Link>
          </Col>
          <Col span={6} className="mx-2">
            <Button danger onClick={logout} className="w-full m-0">
              Log out
            </Button>
          </Col>
        </Row>
      </p>
    </div>
  );
}
