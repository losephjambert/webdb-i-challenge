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
  const { name, budget } = req.body;
  if (!name) {
    res.status(400).json({ message: `Account name required` });
  } else if (!budget) {
    res.status(400).json({ message: `Account budget required` });
  } else if (typeof budget !== 'number') {
    res.status(400).json({ message: `Account budget must be a number` });
  } else {
    try {
      const accountExists = await (await knex.select('name').from('accounts')).find(
        n => n.name === name
      );
      if (accountExists) {
        res.status(400).json({ message: `Account with name ${name} already exists.` });
      } else {
        try {
          const newAccount = await knex.insert({ name, budget }, 'id').into('accounts');
          const account = await knex
            .select('*')
            .from('accounts')
            .where('id', '=', newAccount[0])
            .first();
          console.log(newAccount[0], account);
          res.status(200).json(account);
        } catch (error) {
          res.status(500).json({ message: `Error retrieving accounts from the database` });
        }
      }
    } catch (error) {
      res.status(500).json({ message: `Error validating unique name of account` });
    }
  }
});

router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const changes = req.body;
  try {
    const accountExists = await knex
      .select('*')
      .from('accounts')
      .where('id', '=', id)
      .first();
    if (accountExists) {
      try {
        const update = await knex('accounts')
          .where({ id })
          .update(changes);
        res.status(201).json(update);
      } catch (error) {
        res.status(500).json({ message: `Error updating account.` });
      }
    } else {
      res.status(400).json({ message: `No account with id ${id} exists` });
    }
  } catch (error) {
    res.status(500).json({ message: `Error validating account.` });
  }
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const count = await knex('accounts')
      .where({ id })
      .del();
    res.status(201).json(count);
  } catch (error) {
    res.status(500).json({ message: `Error deleting account from database` });
  }
});

module.exports = router;
