const express = require('express');
const router = express.Router();

const probeController = require('./../controllers/probeController');
const piController = require('./../controllers/piController');
const pumpController = require('./../controllers/pumpController');

router.get('/probes/', probeController.index);
router.post('/probes/', probeController.add);
router.post('/probes/mock', probeController.mock);

router.get('/pump/status', pumpController.getPumpStatus);
router.post('/pump/on', pumpController.startPump);
router.post('/pump/off', pumpController.stopPump);
router.post('/pump/water', pumpController.water);

router.get('/status', piController.getSensors);

router.get('/dht', piController.getDHT);
router.get('/sensors/moisture', piController.getMoisture);

module.exports = router;