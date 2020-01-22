const { Users, Repos } = require("../../../models");

const getAllUsers = async (req, res) => {
  const users = await Users.findAll();
  res.status(200);
  res.send(users);
};

const createUser = async (req, res) => {
  const { firstName, lastName, id } = req.body;
  try {
    const user = await Users.create({
      firstName,
      lastName,
      id,
    });
    res.status(201).send({ id: user.id });
  } catch (e) {
    res.status(400);
    console.error(e);
    res.end("Invalid request");
  }
};

const getUser = async (req, res) => {
  const { userId } = req.params;

  const user = await Users.findByPk(userId);
  res.status(200).send(user);
};

const getUsersRepo = async (req, res) => {
  const { userId } = req.params;
  const { userId: currentUserId } = req.body;
  const query = { where: { userId } };
  if (userId !== currentUserId) query.where.isPrivate = false;
  const repos = await Repos.findAll(query);
  res.status(200).send(repos);
};
module.exports = { getAllUsers, createUser, getUser, getUsersRepo };
