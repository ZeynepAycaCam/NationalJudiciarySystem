var { mysql_query, mysql_table_names } = require('../mysql');
var schemas = require('../../config/schemas');

const SQL_LIST = {
    sample_user_create: "INSERT INTO " + mysql_table_names.user_table +
        " VALUES ",
    sample_citizen_create: "INSERT INTO " + mysql_table_names.citizen_table +
        " (TCKno) VALUES ",
    sample_data_create: ""
};

function sqlSampleCreateUser(TCKno) {
    return new Promise((resolve, reject) => {
        var firstName = Math.random().toString(36).substring(7);
        var lastName = Math.random().toString(36).substring(7);
        var apartmentNo = Math.floor(Math.random() * 100);
        var street = Math.random().toString(36).substring(7);
        var city = Math.random().toString(36).substring(7);
        var zipCode = Math.floor(Math.random() * 100);
        var phoneNumber = "0554" + TCKno.toString().substring(7);
        var e_mail = "example-" + TCKno.toString().substring(7) + "-user@example.com"
        var dateOfBirth = "1900-01-01";
        var password = "1234";
        var createdAt = new Date().toISOString().slice(0, 19).replace('T', ' ');
        var updatedAt = new Date().toISOString().slice(0, 19).replace('T', ' ');

        var name = firstName + " " + lastName;
        var address = apartmentNo + " - " + street + " - " + city + " - " + zipCode;

        const newUser = { TCKno, name, address, phoneNumber, e_mail, dateOfBirth, password };
        const values = Object.values(newUser);

        var count = 0;
        let newSQL = SQL_LIST.sample_user_create + "(";
        for (let val of values) {
            newSQL += "\'" + val + "\'";

            if (count != values.length - 1) {
                newSQL += ", ";
            }
            count++;
        }
        newSQL += ")";
        console.log("[User] TCKno: ", TCKno);
        resolve(newSQL);
    });
}

function sqlSampleCreateCitizen(TCKno) {
    return new Promise((resolve, reject) => {
        let newSQL = SQL_LIST.sample_citizen_create + "(" + TCKno + ")";
        console.log("[Citizen] TCKno: ", TCKno);
        resolve(newSQL);
    });
}

function createSampleCitizen(count) {
    return new Promise(async (resolve, reject) => {
        var results = [2 * count];

        for (var i = 0; i < count; i++) {
            var TCKno = 0;
            for (var i = 0; i < 11; i++) {
                do {
                    TCKno += Math.floor(Math.random() * 9) * Math.pow(10, i);
                } while (i == 0 && TCKno == 0);
            }

            const sql_user = await sqlSampleCreateUser(TCKno);
            const sql_citizen = await sqlSampleCreateCitizen(TCKno);

            if (mysql_query) {
                results[2 * i] = await mysql_query(sql_user);
                results[2 * i + 1] = await mysql_query(sql_citizen);
            }
        }

        resolve(results);
    });
}

module.exports = { createSampleCitizen };