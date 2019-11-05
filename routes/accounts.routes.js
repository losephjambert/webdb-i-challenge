const express = require('express');

const db = require('../data/dbConfig.js');

const router = express.Router();

router.get('/', async (req, res) => {
  res.status(200).json({ message: `${req.method}: Hello from the accounts resource 👋` });
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
