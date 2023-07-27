//@TS-Check
const express = require('express');
const router = express.Router();
const openCors = require("../middleware/openCors");
router.use(express.static('static'));


router.use('/', require('./swagger'));
router.use('/postss',require('./posts'));


module.exports = router;
