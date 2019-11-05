const express = require('express');

const knex = require('../data/dbConfig.js');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const accounts = await knex.select('*').from('accounts');
    res.status(200).json(accounts);
  } catch (error) {
    res.status(500).json({ message: `Error retrieving accounts from the database` });
  }
});

router.post('/', async (req, res) => {
  res.status(200).json({ message: `${req.method}: Hello from the accounts resource 👋` });
});

router.put('/:id', async (req, res) => {
  res.status(200).json({ message: `${req.method}: Hello from the accounts resource 👋` });
});

router.delete('/:id', async (req, res) => {
  res.status(200).json({ message: `${req.method}: Hello from the accounts resource 👋` });
});

module.exports = router;
