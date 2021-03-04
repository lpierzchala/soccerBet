const express = require('express');
const mongoose = require('mongoose');
const { auth } = require('../middlewares');

const Match = mongoose.model('Match');
/**
 * Express router to mount user related functions on.
 */
const router = express.Router();

/**
 * Route serve all matches in database
 */
router.get('/', auth, (req, res) => {
  Match.find().then((matches) => {
    res.json(matches);
  });
});

/**
 * Route for adding new match to database
 */
router.post('/add', auth, async (req, res) => {
  const { match } = req.body;
  const newMatch = new Match(match);
  try {
    await newMatch.save();
    res.status(201).send();
  } catch (error) {
    res.status(422).json(error);
  }
});

/**
 * Route for adding new match result to database
 */
router.post('/addResult', auth, async (req, res) => {
  const { match } = req.body;

  try {
    await Match.findByIdAndUpdate(match.id, { result: match.result });
    res.status(201).send();
  } catch (error) {
    res.status(422).json(error);
  }
});

module.exports = router;
