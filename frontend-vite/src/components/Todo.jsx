import React, {useState} from 'react'
import { Input, List, Button, Row, Col, Divider, Typography } from 'antd'
import { DeleteOutlined, PoweroffOutlined, EditOutlined } from '@ant-design/icons'
import axios from '../config/axios'

// for TodoList2
function Todo(props) {
  const [changeInput, setChangeInput] = useState("")
  const [isEdit, setIsEdit] = useState(false)
  const updateTodoItem = async (id) => {
    await axios.put(`/todo-list/${id}`, { task: changeInput });
    props.fetchData();
    setIsEdit(false)
  };
  // const handleEdit = () => {
  //   setIsEdit(true)
  // }
  let content = 
    <Row style={{width:"100%"}}>
      <Col span={18}>
        <Row justify="start">
          <Input value={changeInput} onChange={(e) => setChangeInput(e.target.value)} />
        </Row>
      </Col>
      <Col span={6}>
        <Row justify="end">
          <Button style={{width:'80%'}} type='primary' onClick={() => updateTodoItem(props.todo.id)}>Done</Button>
        </Row>
      </Col>
    </Row>
  if (!isEdit) {
    content = 
      <Row style={{width:"100%"}}>
      <Col span={2}>
        <Row justify="start">
          {props.todo.id}
        </Row>
      </Col>
      <Col span={10}>
        <Row justify="start">
          {props.todo.task}
        </Row>
      </Col>
      <Col span={6}>
        <Row justify="end">
          <Button type='primary' icon={<EditOutlined/>} style={{backgroundColor:'orange', color:'black'}}
          onClick={() => setIsEdit(true)}>Edit</Button>
        </Row>
      </Col>
      <Col span={6}>
        <Row justify="end">
          <Button type='primary' danger icon={<DeleteOutlined />} 
          onClick={() => props.delete(props.todo.id)}>Delete</Button>
        </Row>
      </Col>
    </Row>
  }

  return (
    <div style={{width:"100%"}}>
      {content}
    </div>
  )
}

export default Todo
