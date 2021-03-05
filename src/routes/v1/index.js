const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
  res.send('Welcome to InstaFeed API v1');
});

router.use('/posts', require('./posts'));

module.exports = router;