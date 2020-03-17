var express = require('express');
var router = express.Router();

var { mysql_query, mysql_table_names, mysql_info_tables } = require('../api/mysql');

router.get('/court/all', async function (req, res, next) {
    const sql = "SELECT * FROM "
        + mysql_table_names.court_table + ";"

    console.log(sql);

    const result = await mysql_query(sql);
    res.send({ result });
});

router.get('/court/:courtID', async function (req, res, next) {
    const sql = "SELECT * FROM "
        + mysql_table_names.court_table
        + " WHERE courtID = " + req.params.courtID + ";"


    console.log(sql);

    const result = await mysql_query(sql);
    res.send({ result });
});

router.get('/lawyer/all', async function (req, res, next) {
    const sql = "SELECT * FROM "
        + mysql_info_tables.lawyer + ";"

    console.log(sql);

    const result = await mysql_query(sql);
    res.send({ result });
});

router.get('/lawyer/:citizenID', async function (req, res, next) {
    const sql_lawyerID = "(SELECT barID FROM "
        + mysql_info_tables.citizenLawyerWorksFor
        + " WHERE citizenID = " + req.params.citizenID + ");"

    const sql = "SELECT * FROM "
        + mysql_info_tables.lawyer + " WHERE barID IN " + sql_lawyerID;

    console.log(sql);

    const result = await mysql_query(sql);
    res.send({ result });
});

router.get('/lawyer/lawsuit/:lawsuitID', async function (req, res, next) {
    const sql = "SELECT * FROM "
        + mysql_info_tables.lawyerLawsuit
        + " NATURAL JOIN " + mysql_info_tables.lawyer
        + " WHERE lawsuitID = " + req.params.lawsuitID + ";"

    console.log(sql);

    const result = await mysql_query(sql);

    res.send({ result });
});

router.get('/conciliator/all', async function (req, res, next) {
    const sql = "SELECT * FROM "
        + mysql_info_tables.conciliator + ";"

    console.log(sql);

    const result = await mysql_query(sql);
    res.send({ result });
});

router.post('/hireLawyer/:citizenID', async function (req, res, next) {
    const sql = "INSERT INTO "
        + mysql_info_tables.citizenLawyerWorksFor
        + " (citizenID, barID)"
        + " VALUES (" + req.params.citizenID + ", " + req.body.barID + ")" + ";"

    console.log(sql);

    const result = await mysql_query(sql);

    if (result.protocol41) {
        res.status(200).send({ query: true });
    } else {
        res.status(400).send({ result });
    }
});

router.post('/lawsuit/finalize/:lawsuitID', async function (req, res, next) {
    const lawsuitID = req.params.lawsuitID;
    const decision = req.body.decision;
    const winningSide = req.body.barID;

    const sql = "UPDATE "
        + mysql_info_tables.judgeLawsuit
        + " SET decision = \'" + decision + "\',"
        + " winningSide = " + winningSide
        + " WHERE lawsuitID = " + lawsuitID + ";"

    console.log(sql);

    const result = await mysql_query(sql);

    console.log(result);

    if (result.protocol41) {
        const sql_finalize = "UPDATE " + mysql_table_names.lawsuit_table
            + " SET status = \'closed\'"
            + " WHERE lawsuitID = " + lawsuitID;

        const result_finalize = await mysql_query(sql_finalize);

        if (result_finalize.protocol41) {
            res.status(200).send({ query: true });
        } else {
            res.status(400).send({ result });
        }
    } else {
        res.status(400).send({ result });
    }
});

router.post('/lawsuit/assign/:lawsuitID', async function (req, res, next) {
    const lawsuitID = req.params.lawsuitID;
    const barID = req.body.barID;
    const conciliatorID = req.body.conciliatorID;

    const sql = "INSERT INTO "
        + mysql_info_tables.judgeConciliatorLawsuit
        + " (lawsuitID, judge_barID, conciliator_barID, result)"
        + " VALUES (" + lawsuitID + ", " + barID + ", " + conciliatorID + ", \'O\')" + ";"

    console.log(sql);

    console.log(result);

    if (result.protocol41) {
        res.status(200).send({ query: true });
    } else {
        res.status(400).send({ result });
    }
});

router.post('/lawsuit/postpone/:lawsuitID', async function (req, res, next) {
    const lawsuitID = req.params.lawsuitID;

    const sql_trial_number = "SELECT count(*) AS count FROM Trial WHERE lawsuitID = " + lawsuitID;
    const result_trial_number = await mysql_query(sql_trial_number);
    const number = result_trial_number[0].count + 1 || 1;

    const date = req.body.date;
    const sql = "INSERT INTO "
        + mysql_table_names.trial_table
        + " (lawsuitID, number, date)"
        + " VALUES (" + lawsuitID + ", " + number + ", \'" + date + "\')" + ";"

    console.log(sql);

    const result = await mysql_query(sql);

    console.log(result);

    if (result.protocol41) {
        res.status(200).send({ query: true });
    } else {
        res.status(400).send({ result });
    }
});

router.get('/reconciliation/:lawsuitID', async function (req, res, next) {
    const lawsuitID = req.params.lawsuitID;
    const sql = "SELECT "
        + mysql_info_tables.reconciliation + ".*, "
        + mysql_info_tables.citizen + ".name"
        + " FROM " + mysql_info_tables.reconciliation
        + " NATURAL JOIN " + mysql_info_tables.citizen
        + " WHERE lawsuitID = " + lawsuitID + ";"

    console.log(sql);

    const result = await mysql_query(sql);
    res.send({ result });
});

router.post('/reconciliation/:lawsuitID', async function (req, res, next) {
    const lawsuitID = req.params.lawsuitID;
    const sql = "SELECT "
        + mysql_info_tables.reconciliation + ".*, "
        + mysql_info_tables.citizen + ".name"
        + " FROM " + mysql_info_tables.reconciliation
        + " NATURAL JOIN " + mysql_info_tables.citizen
        + " WHERE lawsuitID = " + lawsuitID + ";"

    console.log(sql);

    const result_decisions = await mysql_query(sql);

    if (result_decisions.length < 2) {
        res.send({ query: false });
    }

    const user_1 = result_decisions[0];
    const user_2 = result_decisions[1];

    if (user_1.decision === "S", user_1.decision === user_2.decision) {
        const _sql = "UPDATE " + mysql_info_tables.judgeConciliatorLawsuit
            + " SET result = \'S\'"
            + " WHERE lawsuitID = " + lawsuitID;

        const result = await mysql_query(_sql);
        res.send({ query: result.protocol41 });
    } else {
        const _sql = "UPDATE " + mysql_info_tables.judgeConciliatorLawsuit
            + " SET result = \'U\'"
            + " WHERE lawsuitID = " + lawsuitID;
        const result = await mysql_query(_sql);
        res.send({ query: result.protocol41 });
    }
});

module.exports = router;