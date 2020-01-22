const { Repos } = require("../../../models");
const { Op } = require("sequelize");

const getAllRepos = async (req, res) => {
  const { userId } = req.body;
  const repos = await Repos.findAll({
    where: {
      [Op.or]: [{ isPrivate: false }, { userId }],
    },
  });
  res.status(200).send(repos);
};

const createRepo = async (req, res) => {
  const { name, userId, isPrivate } = req.body;

  try {
    const repo = await Repos.create({
      name,
      userId,
      isPrivate,
    });

    res.status(201).send({ name: repo.name });
  } catch (e) {
    res.status(400);
    console.error(e);
    res.end("Invalid request");
  }
};

const getRepo = async (req, res) => {
  const { repoId } = req.params;
  const { userId } = req.body;
  const repo = await Repos.findByPk(repoId);

  repo.userId === userId || repo.isPrivate === false
    ? res.status(200).send(repo)
    : res.status(401).end("Unauthorized");
};

module.exports = { getAllRepos, createRepo, getRepo };
