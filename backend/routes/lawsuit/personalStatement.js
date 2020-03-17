var express = require('express');
var router = express.Router();

var { mysql_query, mysql_table_names, mysql_info_tables } = require('../../api/mysql');

router.get('/:lawsuitID/:trialNumber', async function (req, res, next) {
    const sql = "SELECT name, " + mysql_table_names.personalStatement_table + ".*"
        + " FROM " + mysql_table_names.personalStatement_table
        + " NATURAL JOIN " + mysql_info_tables.citizen
        + " WHERE lawsuitID = " + req.params.lawsuitID
        + " AND number = " + req.params.trialNumber + ";"

    console.log(sql);

    const result = await mysql_query(sql);

    res.status(200).send({ result });
});

module.exports = router;