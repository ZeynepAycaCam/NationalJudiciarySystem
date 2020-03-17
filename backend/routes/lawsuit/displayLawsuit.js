var express = require('express');
var router = express.Router();

var { mysql_query, mysql_table_names, mysql_info_tables } = require('../../api/mysql');

const mysql_lawtsuit_attributes = {
    citizen: "citizenID",
    lawyer: "lawyer_barID",
    judge: "judge_barID",
    conciliator: "conciliator_barID"
};

const mysql_lawsuit_tables = {
    citizen: mysql_info_tables.citizen_lawsuit,
    lawyer: mysql_info_tables.citizen_lawsuit,
    judge: mysql_info_tables.citizen_lawsuit,
    conciliator: mysql_info_tables.lawsuit_conciliator,
}

router.get('/detail/:type/:userID/:lawsuitID', async function (req, res, next) {
    const sql = [];
    const aditionalInfo = {};

    if (req.params.type === 'citizen') {
        sql[req.params.type] = "SELECT * FROM " + mysql_table_names.lawsuit_table
            + " NATURAL JOIN " + mysql_info_tables.citizenLawsuitFile
            + " WHERE citizenID = " + req.params.userID + " AND lawsuitID = " + req.params.lawsuitID + ";";
    }

    if (req.params.type === 'lawyer') {
        sql[req.params.type] = "SELECT * FROM " + mysql_table_names.lawsuit_table
            + " NATURAL JOIN " + mysql_info_tables.citizenLawsuitFile
            + " WHERE lawsuitID = " + req.params.lawsuitID + ";";
    }

    if (req.params.type === 'judge') {
        const sql_judge_conciliator = "SELECT * FROM " + mysql_info_tables.judgeConciliatorLawsuit + " WHERE lawsuitID = " + req.params.lawsuitID;
        const result_judge_conciliator = await mysql_query(sql_judge_conciliator);

        if (result_judge_conciliator.length > 0) {
            aditionalInfo.conciliatorID = result_judge_conciliator[0].conciliator_barID;
            aditionalInfo.conciliatorResult = result_judge_conciliator[0].result;
        }

        sql[req.params.type] = "SELECT * FROM " + mysql_table_names.lawsuit_table
            + " NATURAL JOIN " + mysql_info_tables.citizenLawsuitFile
            + " WHERE lawsuitID = " + req.params.lawsuitID + ";";
    }

    if (req.params.type === 'conciliator') {

    }

    console.log(sql[req.params.type]);

    const result_lawsuit = await mysql_query(sql[req.params.type]);

    const result = [];

    result_lawsuit.map(key => {
        result.push({
            ...aditionalInfo,
            ...key
        });
    });

    res.status(200).send({ result });
});

router.get('/trials/:lawsuitID/:trialID', async function (req, res, next) {
    const sql = "SELECT * FROM " + mysql_table_names.trial_table + " WHERE lawsuitID =" + req.params.lawsuitID
        + " AND number = " + req.params.trialID + ";";

    console.log(sql);

    const result = await mysql_query(sql);
    res.status(200).send({ result });
});

router.get('/trials/:lawsuitID', async function (req, res, next) {
    const sql = "SELECT * FROM " + mysql_table_names.trial_table + " WHERE lawsuitID =" + req.params.lawsuitID + ";";

    console.log(sql);

    const result = await mysql_query(sql);
    res.status(200).send({ result });
});

router.get('/type/:type/:userID', async function (req, res, next) {
    const aditionalInfo = {};

    if (req.params.type === "citizen") {
        const sql_aditionalInfo = "SELECT lawsuitID, role FROM " + mysql_info_tables.citizenLawsuitFile + " WHERE citizenID = " + req.params.userID;
        aditionalInfo.roles = await mysql_query(sql_aditionalInfo);
        console.log(aditionalInfo);
    }

    const sql_lawsutID = "(SELECT lawsuitID"
        + " FROM " + mysql_lawsuit_tables[req.params.type]
        + " WHERE " + mysql_lawtsuit_attributes[req.params.type] + " = " + "\'" + req.params.userID + "\'" + ")"

    const sql = "SELECT *"
        + " FROM " + mysql_table_names.lawsuit_table
        + " WHERE lawsuitID IN " + sql_lawsutID + ";";

    console.log(sql);

    const result_lawsuit = await mysql_query(sql);

    const result = [];

    result_lawsuit.map(key => {
        const role = aditionalInfo.roles ? aditionalInfo.roles.map(info => { return key.lawsuitID === info.lawsuitID ? info.role : null }) : null;
        result.push({
            role: role ? role[0] : null,
            ...key
        });
    });

    res.status(200).send({ result });
});

module.exports = router;