var express = require('express');
var router = express.Router();

var { mysql_connect, mysql_query, mysql_table_names, mysql_info_tables } = require('../../api/mysql');


router.post('/', async function (req, res, next) {
  if (!req.body.citizenID) {
    const sql_findCitizen = "SELECT citizenID FROM " + mysql_info_tables.citizen
      + " NATURAL JOIN " + mysql_info_tables.citizenLawyerWorksFor
      + " WHERE name = " + req.body.client + " AND lawyerID = " + req.body.lawyer + " LIMIT 1";
    const result_findCitizen = await mysql_query(sql_findCitizen);
    req.body.citizenID = result_findCitizen && result_findCitizen[0] ? result_findCitizen[0].citizenID : -1;
    res.status(400).send({ err: "Client cannot be found!" });
  }

  const courtID = req.body.courtID;

  var dateNow = new Date().toISOString().slice(0, 10);

  // INSERT Lawsuit
  const sql1 = "INSERT INTO " + mysql_table_names.lawsuit_table
    + "( status, date, claim, courtID )"
    + " VALUES ( "
    + "\'" + 'pending' + "\'" + ","
    + "\'" + dateNow + "\'" + ","
    + "\'" + req.body.claim + "\'" + ","
    + courtID + " );"
  const result1 = await mysql_query(sql1);
  console.log(sql1);
  console.log(result1);

  if (!result1.protocol41) {
    res.status(200).send({ query: false });
    return;
  }

  // SELECT Judge
  const sql2 = "SELECT barID FROM " + mysql_info_tables.judge + " WHERE courtID = " + courtID;
  const result2 = await mysql_query(sql2);
  console.log(sql2);
  console.log(result2);

  if (result2.length === 0) {
    res.status(200).send({ query: false });
    return;
  }

  const judgeIndex = Math.floor(Math.random() * result2.length);

  // INSERT Judge_Lawsuit_Assigned
  const sql3 = "INSERT INTO " + mysql_info_tables.judgeLawsuit
    + "(lawSuitID, barID)"
    + " VALUES ( "
    + result1.insertId + ","
    + result2[judgeIndex].barID + " );"
  const result3 = await mysql_query(sql3);
  console.log(sql3);
  console.log(result3);

  if (!result3.protocol41) {
    res.status(200).send({ query: false });
    return;
  }

  const barID = req.body.lawyer;

  // INSERT Lawyer_Lawsuit_Of
  const sql4 = "INSERT INTO " + mysql_info_tables.lawyerLawsuit
    + " ( barID, lawSuitID )"
    + " VALUES ( "
    + barID + ","
    + result1.insertId + " );"
  const result4 = await mysql_query(sql4);
  console.log(sql4);
  console.log(result4);

  if (!result4.protocol41) {
    res.status(200).send({ query: false });
    return;
  }

  // INSERT Citizen_Lawsuit_File
  const sql5 = "INSERT INTO " + mysql_info_tables.citizenLawsuitFile
    + " ( citizenID, lawSuitID, role ) "
    + " VALUES ( "
    + req.body.citizenID + ","
    + result1.insertId + ","
    + "\'" + 'victim' + "\'" + " );"
  const result5 = await mysql_query(sql5);
  console.log(sql5);
  console.log(result5);

  if (!result5.protocol41) {
    res.status(200).send({ query: false });
    return;
  }

  // SELECT Citizen (forWhom)
  const sql6 = "SELECT citizenID "
    + " FROM " + mysql_info_tables.citizen
    + " WHERE name = " + "\'" + req.body.forWhom + "\'" + " ;"
  const resultOfCitizenId = await mysql_query(sql6);
  console.log(sql6);
  console.log(resultOfCitizenId);

  if (resultOfCitizenId.length === 0) {
    res.status(200).send({ query: false });
    return;
  }

  // INSERT Citizen_Lawsuit_File (forWhom)
  const sql7 = "INSERT INTO " + mysql_info_tables.citizenLawsuitFile
    + " (citizenID, lawSuitID, role) "
    + " VALUES ( "
    + resultOfCitizenId[0].citizenID + ","
    + result1.insertId + ","
    + "\'" + 'suspect' + "\'" + " );"
  const result7 = await mysql_query(sql7);
  console.log(sql7);
  console.log(result7);

  if (!result7.protocol41) {
    res.status(200).send({ query: false });
    return;
  }

  res.status(200).send({ query: true });
});

module.exports = router;