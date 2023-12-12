require("dotenv").config(); // must be above the module used

const express = require("express");
const app = express();
const cors = require("cors");
const todoListRoutes = require("./routes/todoList");
const userRoutes = require("./routes/user");
// add db
const db = require("./models");
// check JWT
require("./config/passport/passport");

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/todo-list", todoListRoutes);
app.use("/users", userRoutes);

db.sequelize.sync({ force: false }).then(() => {
  app.listen(8000, () => {
    console.log(`Server is running at port 8000`);
  });
});
