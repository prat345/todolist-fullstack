const db = require("../models");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getUserDetail = async (req, res) => {
  const targetUser = await db.User.findOne({
    where: { id: req.user.id },
  });
  if (!targetUser) {
    res.status(400).send({ message: "Unable to find user" });
  }
  res.status(200).send(targetUser);
};

const registerUser = async (req, res) => {
  const { username, password, name } = req.body;
  const targetUser = await db.User.findOne({ where: { username: username } });
  if (targetUser) {
    res.status(400).send({ message: "Username already taken !" });
  } else {
    // password must be hashed > bcrypt, bcrypt needs salt to hash
    const salt = bcryptjs.genSaltSync(12);
    const hashedPassword = bcryptjs.hashSync(password, salt);

    await db.User.create({
      username,
      password: hashedPassword,
      name,
    });
    res.status(201).send({ message: "User has been created" });
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  const targetUser = await db.User.findOne({ where: { username: username } });
  if (!targetUser) {
    res.status(400).send({ message: "Username or password is incorrect" }); // wrong username
  } else {
    const isCorrectPassword = bcryptjs.compareSync(
      password,
      targetUser.password
    );
    if (isCorrectPassword) {
      const payload = {
        name: targetUser.name,
        id: targetUser.id,
      };
      const token = jwt.sign(payload, process.env.SECRET_OR_KEY, {
        expiresIn: 3600,
      }); // login > token available for 1 hr

      res.status(200).send({
        token: token,
        message: "Log in successful",
      });
    } else {
      res.status(400).send({ message: "Username or password is incorrect" }); // wrong password
    }
  }
};

module.exports = {
  getUserDetail,
  loginUser,
  registerUser,
};
