const express = require('express');

const db = require('../data/dbConfig.js');

const router = express.Router();

router.get('/', async (req, res) => {
  res.status(200).json({ message: `Hello from the accounts resource 👋` });
});

module.exports = router;
