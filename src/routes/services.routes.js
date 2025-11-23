const express = require('express');
const router = express.Router()

const { getAllServices } = require('../controllers/services.controller');

// Cuando alguién haga GET en /services
router.get('/', getAllServices);

module.exports = router