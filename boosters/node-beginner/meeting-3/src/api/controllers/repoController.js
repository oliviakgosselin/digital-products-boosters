const { Repos } = require("../../../models");
const { Op } = require("sequelize");

const getAllRepos = async (req, res) => {
  const repos = await Repos.findAll();
  res.status(200).send(repos);
};

const getRepo = async (req, res) => {
  const { repoId } = req.params;
  const repo = await Repos.findByPk(repoId);
  res.status(200).send(repo);
};
module.exports = { getAllRepos, getRepo };
