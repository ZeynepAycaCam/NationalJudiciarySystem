var express = require('express');
var router = express.Router();

var mysql_sample = require('../api/sample');

/* GET create test users. */
router.get('/citizen/:count', async function (req, res, next) {
    const status = await mysql_sample.createSampleCitizen(req.params.count || 1);
    res.send({ status });
});

/* GET create test users. */
router.get('/data/:count', async function (req, res, next) {
    const status = false;
    res.send({ status });
});

module.exports = router;