var { mysql_config, mysql_table_names, mysql_info_tables } = require("./../../config/");
var mysql = require('mysql');

var connection = mysql.createConnection(mysql_config);

function mysql_connect(next) {
    return new Promise((resolve, reject) => {
        connection.connect((err) => {
            if (err) {
                console.log("MySQL is NOT connected!");
                resolve(err);
                return;
            }

            console.log("MySQL is connected!");

            if (next) {
                next();
            }

            resolve(true);
        });
    });
}

function mysql_query(sql) {
    return new Promise((resolve, reject) => {
        connection.query(sql, (err, result, fields) => {
            if (err) {
                console.log("MySQL has an error on querry!");
                resolve(err);
                return;
            }

            //console.log("Result: ", result);
            //console.log("Fields: ", fields);
            resolve(result);
        })
    });
}

module.exports = { mysql_connect, mysql_query, mysql_table_names, mysql_info_tables };