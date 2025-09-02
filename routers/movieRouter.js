// IMPORTO EXPRESS
const express = require('express');

// DEFINISCO LA VARIABILE ROUTER
const router = express.Router();

// IMPORTO IL FILMCONTROLLER
const movieController = require('../controllers/movieController');

// DEFINISCO LE ROTTE
router.get('/', movieController.index);
router.get('/:id', movieController.show);
router.post('/:id/reviews',movieController.storeReview)

module.exports = router;