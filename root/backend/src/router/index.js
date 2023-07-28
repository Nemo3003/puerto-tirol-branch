//@TS-Check
const express = require('express');
const router = express.Router();


router.use('/', require('./swagger'));
router.use('/',require('./posts.router'));


module.exports = router;
