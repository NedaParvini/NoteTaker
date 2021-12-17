const path = require('path');
const router = require('express').Router();

//Create an express router and keep all the routes//


router.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '../public/notes.html'))
);
router.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '../public/index.html'))
);
module.exports = router;