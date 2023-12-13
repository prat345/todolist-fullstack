const express = require("express");
const router = express.Router();
const todoListContollers = require("../controllers/todoList");

const passport = require("passport");
// passport check JWT token
const auth = passport.authenticate("jwt", { session: false });

// must login before accessing todo-list > every route requires token
router.get("/", auth, todoListContollers.getTodoList);
router.post("/", auth, todoListContollers.addTodoList);
router.put("/:id", auth, todoListContollers.updateTodoList);
router.delete("/:id", auth, todoListContollers.deleteTodoList);

module.exports = router;
