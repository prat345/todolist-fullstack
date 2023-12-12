import React, { useEffect, useState } from "react";
import { Input, List, Button, Row, Col, Divider, Typography } from "antd";
import axios from "../config/axios";
import Todo from "../components/Todo";

const { Text, Link } = Typography;

export default function TodoList() {
  const [todoList, setTodoList] = useState([
    {
      task: "default",
    },
  ]);
  const [inputField, setInputField] = useState("");

  // get data from backend
  const fetchData = async () => {
    const httpResponse = await axios.get("/todo-list");
    // console.log(httpResponse);
    setTodoList(httpResponse.data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const updateTodoList = async () => {
    await axios.post("/todo-list", { task: inputField });
    fetchData();
  };
  const deleteItem = async (id) => {
    await axios.delete(`/todo-list/${id}`);
    fetchData();
  };

  return (
    <div>
      <h1>TodoList</h1>
      <Row justify="center" style={{ marginBottom: "50px" }}>
        <Divider />
        <Col>
          <Row>
            <Text type="warning">fill in new tasks</Text>
          </Row>
          <Row>
            <Col span={20}>
              <Input
                value={inputField}
                onChange={(e) => setInputField(e.target.value)}
              />
            </Col>
            <Col span={4}>
              <Button danger onClick={updateTodoList}>
                Add
              </Button>
            </Col>
          </Row>
          <Divider />
          <Row>
            <Col>
              <List
                style={{ width: "450px" }}
                header={<h4>Todolist with backend & db</h4>}
                bordered
                dataSource={todoList}
                renderItem={(obj) => (
                  <List.Item>
                    <Todo
                      todo={obj}
                      delete={deleteItem}
                      fetchData={fetchData}
                    />
                  </List.Item>
                )}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}
