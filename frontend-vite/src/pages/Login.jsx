import React from "react";
import { Button, Checkbox, Form, Input, notification } from "antd";
import axios from "../config/axios";
import localStorageService from "../services/localStorageService";
import { useNavigate } from "react-router-dom";

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
        // props.setRole("user");
        notification.success({
          message: "Login success",
        });
        navigate("/todo-list");
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
    <div>
      <h1>Login</h1>
      <div style={{ padding: "0 50px" }}>
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
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
