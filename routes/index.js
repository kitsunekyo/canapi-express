const express = require('express');
const router = express.Router();
const PumpFactory = require('./../lib/pump');
const DHT11Factory = require('./../lib/dht11');

router.get('/', (req, res, next) => {
  res.render('index');
});

router.post('/pump/on', (req, res, next) => {
  const pump = new PumpFactory(27);
  pump.on();
  res.render('index');
});

router.post('/pump/off', (req, res, next) => {
  const pump = new PumpFactory(27);
  pump.off();
  res.render('index');
});

router.get('/dht', (req, res, next) => {
  const dht = new DHT11Factory();
  dht.read().then((reading) => {
    res.send(reading);
  });
});

module.exports = router;