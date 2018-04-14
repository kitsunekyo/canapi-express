const express = require('express');
const router = express.Router();
/*
const PumpFactory = require('./../lib/pump');
const DHT11Factory = require('./../lib/dht11');
*/

const probeController = require('./../controllers/probeController');
const piController = require('./../controllers/piController');

router.get('/probes/', probeController.index);
router.post('/probes/', probeController.add);
router.post('/probes/mock', probeController.mock);

router.post('/pump/on', piController.startPump);
router.post('/pump/off', piController.stopPump);

router.get('/status', piController.getStatus);

router.get('/dht', piController.getDHT);

module.exports = router;