var express = require('express');
var router = express.Router();

var { mysql_connect, mysql_query, mysql_table_names, mysql_info_tables } = require('../api/mysql');

/* GET users listing. */
router.post('/', async function (req, res, next) {
  const type = req.body.type;
  const tableName = (type === "citizen") ? mysql_table_names.citizen_table : (type === "lawyer") ? mysql_table_names.lawyer_table : (type === "judge") ? mysql_table_names.judge_table : (type === "conciliator") ? mysql_table_names.conciliator_table : null;

  if (!tableName) {
    res.status(400).send({ errno: 499, err: "Invalid user type!" });
    return;
  }

  const arr = ['name', 'TCKno', 'e_mail', 'dateOfBirth', 'phoneNumber',
    'password', 'address'];

  const sql = "INSERT INTO " + mysql_table_names.user_table
    + "( TCKno, name, address, phoneNumber, e_mail, dateOfBirth, password )"
    + " VALUES ( "
    + req.body[arr[1]] + ","
    + "\'" + req.body[arr[0]] + "\'" + ","
    + "\'" + req.body[arr[6]] + "\'" + ","
    + req.body[arr[4]] + ","
    + "\'" + req.body[arr[2]] + "\'" + ","
    + "\'" + req.body[arr[3]] + "\'" + ","
    + "\'" + req.body[arr[5]] + "\'" + " );"
  const result = await mysql_query(sql);

  if (result.errno) {
    res.status(400).send({ errno: result.errno, err: result.sqlMessage });
    return;
  }

  const sql1 = "INSERT INTO " + tableName
    + "(TCKno"
    + (tableName === mysql_table_names.judge_table ? ", courtID" : "")
    + ")"
    + " VALUES ("
    + req.body[arr[1]]
    + (tableName === mysql_table_names.judge_table ? ", " + req.body.courtID : "")
    + ");"
  console.log(sql1);
  const result2 = await mysql_query(sql1);

  if (result2.errno) {
    res.status(400).send({ errno: result2.errno, err: result2.sqlMessage });
    return;
  }

  res.status(200).send({ query: true });
});

module.exports = router;