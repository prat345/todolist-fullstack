import React from "react";
import { Button, Checkbox, Form, Input, notification } from "antd";
import axios from "../config/axios";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Register(props) {
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log("Form values: ", values);
    const body = {
      username: values.username,
      password: values.password,
      name: values.name,
    };
    axios
      .post("/users/register", body)
      .then((result) => {
        notification.success({
          message: `${values.usernamename} has been registered`,
        });
        navigate("/login");
      })
      .catch((err) => {
        notification.error({
          message: "Register failed",
        });
      });
    console.log("Success:", values);
  };

  return (
    <div className="container">
      <Helmet>
        <title>Sign Up</title>
      </Helmet>
      <h1>Sign Up</h1>
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
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your name!",
              },
            ]}
          >
            <Input />
          </Form.Item>

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
            hasFeedback
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
            label="Confirm Password"
            name="confirm"
            hasFeedback
            dependencies={["password"]}
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The password do not match!")
                  );
                },
              }),
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
