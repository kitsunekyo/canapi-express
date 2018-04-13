const express = require('express');
const router = express.Router();
/*
const PumpFactory = require('./../lib/pump');
const DHT11Factory = require('./../lib/dht11');
*/

const probeController = require('./../controllers/probeController');
const piController = require('./../controllers/piController');

router.get('/probe/', probeController.index);
router.post('/probe/', probeController.add);

router.post('/pump/on', piController.startPump);
router.post('/pump/off', piController.stopPump);

router.get('/dht', piController.getDHT);

module.exports = router;