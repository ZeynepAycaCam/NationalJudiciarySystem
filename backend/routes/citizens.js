var express = require('express');
var router = express.Router();

var { mysql_connect, mysql_query, mysql_table_names, mysql_info_tables } = require('../api/mysql');

/* GET users listing. */
router.get('/', async function (req, res, next) {
  const health = await mysql_connect();
  res.send({ mysql: health });
});

/* GET all users. */
router.get('/all', async function (req, res, next) {
  const sql = "SELECT * FROM " + mysql_info_tables.citizen;
  const result = await mysql_query(sql);
  res.send({ result });
});

/* GET any user via id param. */
router.get('/:TCKno', async function (req, res, next) {
  const sql = "SELECT * FROM " + mysql_info_tables.citizen + " WHERE TCKno=" + req.param('TCKno');
  const result = await mysql_query(sql);
  res.send({ result });
});

module.exports = router;
