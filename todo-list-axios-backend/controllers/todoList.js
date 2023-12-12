// const { uniqueId } = require("lodash");

// let todoList = [];
const db = require("../models");

const getTodoList = async (req, res) => {
  // find todolist of each user from id
  const todoList = await db.TodoList.findAll({
    where: { user_id: req.user.id },
  });
  res.status(200).send(todoList);
};

const addTodoList = async (req, res) => {
  const newTodo = await db.TodoList.create({
    task: req.body.task,
    user_id: req.user.id,
  });
  res.status(201).send(newTodo);
};

const deleteTodoList = async (req, res) => {
  const targetId = Number(req.params.id);
  // find task to delete from user_id and task id, (user can only delete their own task)
  const targetTodo = await db.TodoList.findOne({
    where: { id: targetId, user_id: req.user.id },
  });
  if (targetTodo) {
    await targetTodo.destroy();
    res.status(204).send();
  } else {
    res.status(404).send("Task not found (no task or wrong user)");
  }
};

const updateTodoList = async (req, res) => {
  const targetId = Number(req.params.id);
  const newTask = req.body.task;

  const targetTodo = await db.TodoList.findOne({
    where: { id: targetId, user_id: req.user.id },
  });
  if (targetTodo) {
    await targetTodo.update({
      task: newTask,
    });
    res.status(200).send(`Update successful, ${newTask}`);
  } else {
    res.status(404).send("Task not found (no task or wrong user)");
  }
};

module.exports = {
  getTodoList,
  addTodoList,
  deleteTodoList,
  updateTodoList,
};
