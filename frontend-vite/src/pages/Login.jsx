import React from "react";
import { Button, Checkbox, Form, Input, notification } from "antd";
import axios from "../config/axios";
import localStorageService from "../services/localStorageService";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Login(props) {
  const navigate = useNavigate();

  const onFinish = (values) => {
    const body = {
      username: values.username,
      password: values.password,
    };
    axios
      .post("/users/login", body)
      .then((result) => {
        // console.log(result);
        // token in response > data > token
        localStorageService.setToken(result.data.token);
        props.setRole("user");
        notification.success({
          message: "Login success",
        });
        navigate("/profile");
      })
      .catch((err) => {
        console.error(err);
        notification.error({
          message: "Login failed",
        });
      });
    console.log("Success:", values);
  };

  return (
    <div className="container">
      <Helmet>
        <title>Login</title>
      </Helmet>
      <h1>Login</h1>
      <div className="md:px-5 lg:px-8">
        <Form
          name="basic"
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 18,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              span: 24,
            }}
          >
            <Button className="btn-primary" type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
