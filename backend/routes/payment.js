var express = require('express');
var router = express.Router();

var { mysql_query, mysql_table_names, mysql_info_tables } = require('../api/mysql');

router.get('/:userID', async function (req, res, next) {
    const sql = "SELECT lawsuitID, type, amount, creditor, status"
        + " FROM " + mysql_table_names.payment_table
        + " WHERE citizenID = " + "\'" + req.params.userID + "\'" + " ;"

    console.log(sql);

    const result = await mysql_query(sql);
    res.send({ result });
});

module.exports = router;