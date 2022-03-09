const express = require('express');
const {addUnidad} = require('../controllers/unidadController');

const router = express.Router();

router.post('/addUnidad', addUnidad);

module.exports = {
    routes: router
}