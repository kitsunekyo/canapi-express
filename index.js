const express = require('express');
const router = express.Router();
const PumpFactory = require('./../lib/pump');
const PythonShell = require('python-shell');

const pump = new PumpFactory(27);

/* GET home page. */
router.get('/on', (req, res, next) => {
  pump.on();
  res.send('on');
});

router.get('/off', (req, res, next) => {
  pump.off();
  res.send('off');
});

router.get('/dht', (req, res, next) => {
  var options = {
    mode: 'text',
  };
  PythonShell.run('dht.py', options, function (err, results) {
    if (err) throw err;
    // results is an array consisting of messages collected during execution
    console.log('results: %j', results);
  });
});

module.exports = router;